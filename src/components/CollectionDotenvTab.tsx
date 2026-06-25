import { useEffect, useMemo, useState } from "@harborclient/plugin-api/react";
import type {
  CollectionSettingsTabContext,
  PluginContext,
} from "@harborclient/plugin-api";
import { collectionPathStorageKey } from "../storage/defaults";
import { getLinkSyncManager } from "../link/LinkSyncManager";
import type { DotenvLink } from "../types";

interface Props {
  /**
   * Renderer plugin context from the HarborClient host.
   */
  hc: PluginContext;

  /**
   * Collection settings tab context from the HarborClient host.
   */
  context: CollectionSettingsTabContext;
}

/**
 * Suggests an environment name from a `.env` file path.
 *
 * @param dotenvPath - Absolute `.env` file path.
 */
function suggestEnvironmentName(dotenvPath: string): string {
  const parts = dotenvPath.split(/[/\\]/);
  const fileName = parts[parts.length - 1] ?? "env";
  const stem = fileName.replace(/^\.env\.?/, "").replace(/^\.env$/, "");
  if (stem) {
    return stem;
  }
  return "Local env";
}

/**
 * Formats an ISO timestamp for display in the collection tab.
 *
 * @param value - ISO timestamp or null when never synced.
 */
function formatSyncedAt(value: string | null): string {
  if (!value) {
    return "Never";
  }
  return new Date(value).toLocaleString();
}

/**
 * Formats sync and filesystem errors, including guidance for stale allowlist failures.
 *
 * @param error - Failure from sync, browse, or filesystem APIs.
 */
function formatSyncError(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  if (message.includes("not allowlisted")) {
    return `${message} Re-select the .env file with Browse to restore access.`;
  }
  return message;
}

/**
 * Per-collection Dotenv settings and sync controls.
 */
export function CollectionDotenvTab({ hc, context }: Props) {
  const manager = getLinkSyncManager();
  const [dotenvPath, setDotenvPath] = useState("");
  const [link, setLink] = useState<DotenvLink | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [environmentName, setEnvironmentName] = useState("");
  const [keepInSync, setKeepInSync] = useState(true);

  const readOnly = context.readOnly;
  const collectionId = context.collectionId;

  /**
   * Loads the stored `.env` path and link state for this collection.
   */
  useEffect(() => {
    let cancelled = false;

    /**
     * Refreshes local UI state from storage and the link manager.
     */
    async function refreshState(): Promise<void> {
      const storedPath =
        (
          await hc.storage.get<{ dotenvPath: string | null }>(
            collectionPathStorageKey(collectionId)
          )
        )?.dotenvPath ?? "";
      const currentLink = manager?.getLinkForCollection(collectionId);
      const linkError = manager?.getLinkError(collectionId) ?? null;
      if (cancelled) {
        return;
      }
      setDotenvPath(storedPath);
      setLink(currentLink);
      setKeepInSync(currentLink?.keepInSync ?? true);
      setError(linkError);
    }

    void refreshState();
    const subscription = manager?.subscribe(() => {
      void refreshState();
    });

    return () => {
      cancelled = true;
      subscription?.dispose();
    };
  }, [hc, collectionId, manager]);

  const suggestedName = useMemo(
    () => suggestEnvironmentName(dotenvPath),
    [dotenvPath]
  );

  /**
   * Persists the selected `.env` path for this collection.
   *
   * @param path - Absolute `.env` file path.
   */
  async function persistPath(path: string): Promise<void> {
    await hc.storage.set(collectionPathStorageKey(collectionId), {
      dotenvPath: path,
    });
    setDotenvPath(path);
  }

  /**
   * Opens a native file picker for a `.env` file.
   */
  async function handleBrowse(): Promise<void> {
    setError(null);
    setStatus(null);
    try {
      const selected = await hc.fs.pickFile({
        title: "Select .env file",
        filters: [{ name: "Env files", extensions: ["env"] }],
      });
      if (selected.length === 0) {
        return;
      }
      await persistPath(selected[0]);
      setEnvironmentName(suggestEnvironmentName(selected[0]));
    } catch (browseError) {
      setError(formatSyncError(browseError));
    }
  }

  /**
   * Runs an initial or manual sync for this collection.
   *
   * @param createNew - Whether a new environment should be created.
   */
  async function runSync(createNew: boolean): Promise<void> {
    if (!dotenvPath.trim()) {
      setError("Select a .env file before syncing.");
      return;
    }
    if (!manager) {
      setError("Dotenv Sync is not ready yet.");
      return;
    }

    setSyncing(true);
    setError(null);
    setStatus(null);
    try {
      const nextLink = await manager.syncCollection(collectionId, dotenvPath, {
        createNew,
        environmentName: createNew ? environmentName : undefined,
        force: !createNew,
      });
      setLink(nextLink);
      setKeepInSync(nextLink.keepInSync);
      setShowNamePrompt(false);
      setStatus(
        createNew
          ? `Created environment "${nextLink.environmentName}".`
          : `Synced ${nextLink.environmentName}.`
      );
      hc.ui.showToast(
        createNew
          ? "Environment created from .env"
          : "Environment synced from .env"
      );
    } catch (syncError) {
      setError(formatSyncError(syncError));
    } finally {
      setSyncing(false);
    }
  }

  /**
   * Starts the first sync flow or re-syncs an existing linked environment.
   */
  function handleSyncNow(): void {
    if (link) {
      void runSync(false);
      return;
    }
    setEnvironmentName((current) => current || suggestedName);
    setShowNamePrompt(true);
  }

  /**
   * Confirms environment creation during the first sync.
   *
   * @param event - Name prompt form submit event.
   */
  async function handleCreateSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    await runSync(true);
  }

  /**
   * Updates the keep-in-sync flag for this collection link.
   *
   * @param enabled - Whether automatic syncing should remain enabled.
   */
  async function handleKeepInSyncChange(enabled: boolean): Promise<void> {
    setKeepInSync(enabled);
    if (!manager || !link) {
      return;
    }
    try {
      await manager.setKeepInSync(collectionId, enabled);
      setStatus(enabled ? "Automatic sync enabled." : "Automatic sync paused.");
    } catch (toggleError) {
      setError(
        toggleError instanceof Error ? toggleError.message : String(toggleError)
      );
      setKeepInSync(!enabled);
    }
  }

  /**
   * Removes the collection link without deleting the environment.
   */
  async function handleUnlink(): Promise<void> {
    if (!manager) {
      return;
    }
    setError(null);
    setStatus(null);
    try {
      await manager.unlink(collectionId);
      setLink(undefined);
      setShowNamePrompt(false);
      setStatus("Link removed. The environment was kept.");
    } catch (unlinkError) {
      setError(
        unlinkError instanceof Error ? unlinkError.message : String(unlinkError)
      );
    }
  }

  return (
    <div className="max-w-2xl space-y-4">
      <p className="text-[14px] text-muted">
        Link a `.env` file to a HarborClient environment. Changes to the file
        can be synced automatically while the plugin is enabled.
      </p>

      <label className="block space-y-1">
        <span className="text-[14px]">`.env` file</span>
        <div className="flex gap-2">
          <input
            className="min-w-0 flex-1 rounded border border-control bg-control px-3 py-2 text-[14px]"
            value={dotenvPath}
            readOnly
            aria-label=".env file path"
          />
          <button
            type="button"
            className="rounded border border-control px-3 py-2 text-[14px] disabled:opacity-60"
            onClick={() => void handleBrowse()}
            disabled={readOnly}
          >
            Browse
          </button>
        </div>
      </label>

      {link ? (
        <div className="space-y-2 rounded border border-control p-3">
          <p className="text-[14px]">
            Linked environment: <strong>{link.environmentName}</strong>
          </p>
          <p className="text-[14px] text-muted" role="status">
            Last synced: {formatSyncedAt(link.lastSyncedAt)}
          </p>
          <label className="flex items-center gap-2 text-[14px]">
            <input
              type="checkbox"
              checked={keepInSync}
              disabled={readOnly}
              onChange={(event) =>
                void handleKeepInSyncChange(event.target.checked)
              }
            />
            Keep in sync
          </label>
        </div>
      ) : null}

      {showNamePrompt ? (
        <form
          className="space-y-3 rounded border border-control p-3"
          onSubmit={(event) => void handleCreateSubmit(event)}
        >
          <label className="block space-y-1">
            <span className="text-[14px]">Environment name</span>
            <input
              className="w-full rounded border border-control bg-control px-3 py-2 text-[14px]"
              value={environmentName}
              onChange={(event) => setEnvironmentName(event.target.value)}
              required
              aria-required="true"
            />
          </label>
          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded bg-accent px-4 py-2 text-[14px] text-on-accent disabled:opacity-60"
              disabled={syncing || readOnly}
            >
              {syncing ? "Creating…" : "Create environment"}
            </button>
            <button
              type="button"
              className="rounded border border-control px-4 py-2 text-[14px]"
              onClick={() => setShowNamePrompt(false)}
              disabled={syncing}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded bg-accent px-4 py-2 text-[14px] text-on-accent disabled:opacity-60"
          onClick={handleSyncNow}
          disabled={readOnly || syncing || !dotenvPath}
        >
          {syncing ? "Syncing…" : link ? "Sync now" : "Sync now"}
        </button>
        {link ? (
          <button
            type="button"
            className="rounded border border-control px-4 py-2 text-[14px] disabled:opacity-60"
            onClick={() => void handleUnlink()}
            disabled={readOnly || syncing}
          >
            Unlink
          </button>
        ) : null}
      </div>

      {status ? (
        <p className="text-[14px] text-muted" role="status" aria-live="polite">
          {status}
        </p>
      ) : null}
      {error ? (
        <p className="text-[14px] text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
