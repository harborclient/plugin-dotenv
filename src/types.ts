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
}
