import type { PluginVariableInput } from "@harborclient/plugin-api";

/**
 * Converts transformed `.env` entries into HarborClient variable rows.
 *
 * @param entries - Transformed key/value pairs from a `.env` file.
 */
export function toPluginVariables(
  entries: Record<string, string>
): PluginVariableInput[] {
  return Object.entries(entries).map(([key, value]) => ({
    key,
    value,
    defaultValue: "",
    share: false,
  }));
}
