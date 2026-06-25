import type { DotenvSettings } from "../types";

/**
 * Default global Dotenv Sync settings.
 */
export const DEFAULT_SETTINGS: DotenvSettings = {
  keyPrefixFilter: "",
  keyPrefixStrip: "",
  keyTransform: "none",
};

/**
 * Storage key for global plugin settings.
 */
export const SETTINGS_STORAGE_KEY = "settings";
