import type { KeyTransform } from "./sync/transformKeys";

/**
 * Global Dotenv Sync settings persisted in plugin storage.
 */
export interface DotenvSettings {
  /**
   * When set, only keys starting with this prefix are synced.
   */
  keyPrefixFilter: string;

  /**
   * Prefix removed from each key before transform (for example `API_`).
   */
  keyPrefixStrip: string;

  /**
   * Optional key normalization applied after prefix stripping.
   */
  keyTransform: KeyTransform;

  /**
   * Poll interval in milliseconds when filesystem watch is unavailable.
   */
  pollIntervalMs: number;

  /**
   * Default value for the keep-in-sync toggle on new links.
   */
  keepInSyncDefault: boolean;
}

/**
 * Link between a collection `.env` file and a HarborClient environment.
 */
export interface DotenvLink {
  /**
   * Collection that owns this link.
   */
  collectionId: number;

  /**
   * Absolute path to the linked `.env` file.
   */
  dotenvPath: string;

  /**
   * Linked environment database id.
   */
  environmentId: number;

  /**
   * Display name of the linked environment.
   */
  environmentName: string;

  /**
   * Hash of the last successfully synced file content.
   */
  lastSyncedHash: string | null;

  /**
   * ISO timestamp of the last successful sync.
   */
  lastSyncedAt: string | null;

  /**
   * When true, file changes are watched or polled automatically.
   */
  keepInSync: boolean;
}
