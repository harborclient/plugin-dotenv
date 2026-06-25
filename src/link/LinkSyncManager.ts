import type { PluginContext } from "@harborclient/plugin-api";
import type { Disposable } from "@harborclient/plugin-api";
import {
  DEFAULT_SETTINGS,
  LINKS_STORAGE_KEY,
  SETTINGS_STORAGE_KEY,
} from "../storage/defaults";
import { processDotenvContent } from "../sync/pipeline";
import type { DotenvLink, DotenvSettings } from "../types";

const RESYNC_DEBOUNCE_MS = 300;

type LinkListener = () => void;

/**
 * Options for syncing one collection `.env` link.
 */
export interface SyncCollectionOptions {
  /**
   * When true, creates a new environment using `environmentName`.
   */
  createNew?: boolean;

  /**
   * Name for a newly created environment.
   */
  environmentName?: string;

  /**
   * When true, re-sync even if the file hash has not changed.
   */
  force?: boolean;
}

/**
 * Keeps linked environments mirrored to `.env` files via watch or polling.
 */
export class LinkSyncManager {
  readonly #hc: PluginContext;
  readonly #listeners = new Set<LinkListener>();
  readonly #errors = new Map<number, string>();
  readonly #pathWatchers = new Map<
    string,
    {
      disposable: Disposable | null;
      pollId: ReturnType<typeof setInterval> | null;
    }
  >();
  readonly #debounceTimers = new Map<number, ReturnType<typeof setTimeout>>();
  #links: DotenvLink[] = [];
  #settings: DotenvSettings = DEFAULT_SETTINGS;
  #started = false;

  /**
   * @param hc - Renderer plugin context from the HarborClient host.
   */
  constructor(hc: PluginContext) {
    this.#hc = hc;
  }

  /**
   * Loads persisted settings and links, then starts active watchers.
   */
  async start(): Promise<void> {
    if (this.#started) {
      return;
    }
    this.#started = true;
    this.#settings = (await this.#hc.storage.get<DotenvSettings>(
      SETTINGS_STORAGE_KEY
    )) ?? {
      ...DEFAULT_SETTINGS,
    };
    this.#links =
      (await this.#hc.storage.get<DotenvLink[]>(LINKS_STORAGE_KEY)) ?? [];
    await this.#refreshWatchers();
  }

  /**
   * Returns all persisted dotenv links.
   */
  getLinks(): DotenvLink[] {
    return [...this.#links];
  }

  /**
   * Returns the link for one collection, if any.
   *
   * @param collectionId - Collection database id.
   */
  getLinkForCollection(collectionId: number): DotenvLink | undefined {
    return this.#links.find((link) => link.collectionId === collectionId);
  }

  /**
   * Returns the latest sync error for one collection link.
   *
   * @param collectionId - Collection database id.
   */
  getLinkError(collectionId: number): string | null {
    return this.#errors.get(collectionId) ?? null;
  }

  /**
   * Subscribes to link or error changes for UI refresh.
   *
   * @param listener - Called when link state changes.
   */
  subscribe(listener: LinkListener): Disposable {
    this.#listeners.add(listener);
    return {
      dispose: () => {
        this.#listeners.delete(listener);
      },
    };
  }

  /**
   * Loads current global settings from plugin storage.
   */
  async getSettings(): Promise<DotenvSettings> {
    return (
      (await this.#hc.storage.get<DotenvSettings>(SETTINGS_STORAGE_KEY)) ?? {
        ...DEFAULT_SETTINGS,
      }
    );
  }

  /**
   * Persists updated global settings and refreshes active watchers.
   *
   * @param settings - Updated global settings.
   */
  async saveSettings(settings: DotenvSettings): Promise<void> {
    this.#settings = settings;
    await this.#hc.storage.set(SETTINGS_STORAGE_KEY, settings);
    await this.#refreshWatchers();
    this.#notify();
  }

  /**
   * Syncs one collection `.env` file into its linked or new environment.
   *
   * @param collectionId - Collection database id.
   * @param dotenvPath - Absolute `.env` file path.
   * @param options - Sync behavior overrides.
   */
  async syncCollection(
    collectionId: number,
    dotenvPath: string,
    options: SyncCollectionOptions = {}
  ): Promise<DotenvLink> {
    const content = await this.#hc.fs.readFile(dotenvPath);
    const settings = await this.getSettings();
    const { variables, hash } = await processDotenvContent(content, settings);

    if (variables.length === 0) {
      throw new Error("No variables matched the current Dotenv Sync filters.");
    }

    const existing = this.getLinkForCollection(collectionId);
    if (options.createNew || !existing) {
      const environmentName = options.environmentName?.trim();
      if (!environmentName) {
        throw new Error("Environment name is required.");
      }

      const created = await this.#hc.host.createEnvironmentWithVariables(
        environmentName,
        variables
      );
      const link: DotenvLink = {
        collectionId,
        dotenvPath,
        environmentId: created.id,
        environmentName: created.name,
        lastSyncedHash: hash,
        lastSyncedAt: new Date().toISOString(),
        keepInSync: settings.keepInSyncDefault,
      };
      this.#upsertLink(link);
      this.#errors.delete(collectionId);
      await this.#persistLinks();
      await this.#refreshWatchers();
      this.#notify();
      return link;
    }

    if (!options.force && existing.lastSyncedHash === hash) {
      return existing;
    }

    await this.#hc.host.updateEnvironmentVariables(
      existing.environmentId,
      variables
    );
    const updated: DotenvLink = {
      ...existing,
      dotenvPath,
      lastSyncedHash: hash,
      lastSyncedAt: new Date().toISOString(),
    };
    this.#upsertLink(updated);
    this.#errors.delete(collectionId);
    await this.#persistLinks();
    await this.#refreshWatchers();
    this.#notify();
    return updated;
  }

  /**
   * Updates the keep-in-sync flag for one collection link.
   *
   * @param collectionId - Collection database id.
   * @param keepInSync - Whether automatic syncing should stay enabled.
   */
  async setKeepInSync(
    collectionId: number,
    keepInSync: boolean
  ): Promise<void> {
    const link = this.getLinkForCollection(collectionId);
    if (!link) {
      return;
    }
    this.#upsertLink({ ...link, keepInSync });
    await this.#persistLinks();
    await this.#refreshWatchers();
    this.#notify();
  }

  /**
   * Removes one collection link and stops watching its `.env` file.
   *
   * @param collectionId - Collection database id.
   */
  async unlink(collectionId: number): Promise<void> {
    this.#links = this.#links.filter(
      (link) => link.collectionId !== collectionId
    );
    this.#errors.delete(collectionId);
    await this.#persistLinks();
    await this.#refreshWatchers();
    this.#notify();
  }

  /**
   * Stops all watchers and clears pending debounce timers.
   */
  dispose(): void {
    for (const timer of this.#debounceTimers.values()) {
      clearTimeout(timer);
    }
    this.#debounceTimers.clear();

    for (const record of this.#pathWatchers.values()) {
      record.disposable?.dispose();
      if (record.pollId) {
        clearInterval(record.pollId);
      }
    }
    this.#pathWatchers.clear();
    this.#listeners.clear();
    this.#started = false;
  }

  /**
   * Rebuilds filesystem watchers and polling timers for active links.
   */
  async #refreshWatchers(): Promise<void> {
    for (const record of this.#pathWatchers.values()) {
      record.disposable?.dispose();
      if (record.pollId) {
        clearInterval(record.pollId);
      }
    }
    this.#pathWatchers.clear();

    const activePaths = new Map<string, DotenvLink[]>();
    for (const link of this.#links) {
      if (!link.keepInSync) {
        continue;
      }
      const group = activePaths.get(link.dotenvPath) ?? [];
      group.push(link);
      activePaths.set(link.dotenvPath, group);
    }

    for (const [dotenvPath, links] of activePaths) {
      let disposable: Disposable | null = null;
      try {
        disposable = this.#hc.fs.watchFile(dotenvPath, () => {
          for (const link of links) {
            this.#scheduleResync(link.collectionId, link.dotenvPath);
          }
        });
      } catch {
        disposable = null;
      }

      const pollId =
        disposable === null
          ? setInterval(() => {
              for (const link of links) {
                void this.#resyncLink(link.collectionId, link.dotenvPath).catch(
                  (error) => {
                    this.#setError(
                      link.collectionId,
                      error instanceof Error ? error.message : String(error)
                    );
                  }
                );
              }
            }, Math.max(this.#settings.pollIntervalMs, 1000))
          : null;

      this.#pathWatchers.set(dotenvPath, { disposable, pollId });
    }
  }

  /**
   * Debounces automatic re-sync requests for one collection link.
   *
   * @param collectionId - Collection database id.
   * @param dotenvPath - Linked `.env` file path.
   */
  #scheduleResync(collectionId: number, dotenvPath: string): void {
    const existing = this.#debounceTimers.get(collectionId);
    if (existing) {
      clearTimeout(existing);
    }
    this.#debounceTimers.set(
      collectionId,
      setTimeout(() => {
        this.#debounceTimers.delete(collectionId);
        void this.#resyncLink(collectionId, dotenvPath).catch((error) => {
          this.#setError(
            collectionId,
            error instanceof Error ? error.message : String(error)
          );
        });
      }, RESYNC_DEBOUNCE_MS)
    );
  }

  /**
   * Re-syncs one linked collection when its `.env` file changes.
   *
   * @param collectionId - Collection database id.
   * @param dotenvPath - Linked `.env` file path.
   */
  async #resyncLink(collectionId: number, dotenvPath: string): Promise<void> {
    const link = this.getLinkForCollection(collectionId);
    if (!link || !link.keepInSync) {
      return;
    }
    await this.syncCollection(collectionId, dotenvPath, { force: false });
  }

  /**
   * Inserts or replaces one link in the in-memory list.
   *
   * @param link - Updated link record.
   */
  #upsertLink(link: DotenvLink): void {
    const index = this.#links.findIndex(
      (entry) => entry.collectionId === link.collectionId
    );
    if (index >= 0) {
      this.#links[index] = link;
      return;
    }
    this.#links.push(link);
  }

  /**
   * Persists the current link list to plugin storage.
   */
  async #persistLinks(): Promise<void> {
    await this.#hc.storage.set(LINKS_STORAGE_KEY, this.#links);
  }

  /**
   * Stores a sync error for one collection and notifies listeners.
   *
   * @param collectionId - Collection database id.
   * @param message - Error message to display in the collection tab.
   */
  #setError(collectionId: number, message: string): void {
    this.#errors.set(collectionId, message);
    this.#notify();
  }

  /**
   * Notifies subscribed UI components that link state changed.
   */
  #notify(): void {
    for (const listener of this.#listeners) {
      listener();
    }
  }
}

let activeManager: LinkSyncManager | null = null;

/**
 * Stores the active link manager for UI components.
 *
 * @param manager - Link manager started during plugin activation.
 */
export function setLinkSyncManager(manager: LinkSyncManager | null): void {
  activeManager = manager;
}

/**
 * Returns the active link manager when the plugin is enabled.
 */
export function getLinkSyncManager(): LinkSyncManager | null {
  return activeManager;
}
