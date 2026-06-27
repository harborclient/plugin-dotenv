/**
 * Supported key normalization strategies for synced variables.
 */
export type KeyTransform = "none" | "lowercase" | "snake_case";

/**
 * Settings used when transforming parsed `.env` keys.
 */
export interface TransformSettings {
  /**
   * When set, only keys starting with this prefix are included.
   */
  keyPrefixFilter: string;

  /**
   * Prefix removed from each key before transform.
   */
  keyPrefixStrip: string;

  /**
   * Optional key normalization applied after prefix stripping.
   */
  keyTransform: KeyTransform;
}

/**
 * Converts a key to snake_case.
 *
 * @param key - Raw environment variable key.
 */
function toSnakeCase(key: string): string {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();
}

/**
 * Applies prefix filtering, stripping, and optional key transforms.
 *
 * @param entries - Parsed `.env` entries keyed by source variable name.
 * @param settings - Transform configuration from plugin settings.
 */
export function transformDotenvEntries(
  entries: Record<string, string>,
  settings: TransformSettings,
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [rawKey, value] of Object.entries(entries)) {
    if (
      settings.keyPrefixFilter &&
      !rawKey.startsWith(settings.keyPrefixFilter)
    ) {
      continue;
    }

    let key = rawKey;
    if (settings.keyPrefixStrip && key.startsWith(settings.keyPrefixStrip)) {
      key = key.slice(settings.keyPrefixStrip.length);
    }

    if (settings.keyTransform === "lowercase") {
      key = key.toLowerCase();
    } else if (settings.keyTransform === "snake_case") {
      key = toSnakeCase(key);
    }

    key = key.trim();
    if (!key) {
      continue;
    }

    result[key] = value;
  }

  return result;
}
