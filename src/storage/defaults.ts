import type { DotenvSettings } from "../types";

/**
 * Default global Dotenv Sync settings.
 */
export const DEFAULT_SETTINGS: DotenvSettings = {
  keyPrefixFilter: "",
  keyPrefixStrip: "",
  keyTransform: "none",
  pollIntervalMs: 3000,
  keepInSyncDefault: true,
};

/**
 * Storage key for global plugin settings.
 */
export const SETTINGS_STORAGE_KEY = "settings";

/**
 * Storage key for persisted dotenv links.
 */
export const LINKS_STORAGE_KEY = "links";

/**
 * Builds the per-collection storage key for a selected `.env` path.
 *
 * @param collectionId - Collection database id.
 */
export function collectionPathStorageKey(collectionId: number): string {
  return `collection:${collectionId}`;
}
