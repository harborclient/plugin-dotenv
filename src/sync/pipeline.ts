import type { Variable } from "@harborclient/sdk";
import type { DotenvSettings } from "../types";
import { parseDotenvContent } from "./parseDotenv";
import { toPluginVariables } from "./toPluginVariables";
import { transformDotenvEntries } from "./transformKeys";

/**
 * Result of parsing and transforming one `.env` file.
 */
export interface DotenvPipelineResult {
  /**
   * Variable rows ready for HarborClient environment APIs.
   */
  variables: Variable[];
}

/**
 * Parses and transforms `.env` file content.
 *
 * @param content - UTF-8 `.env` file contents.
 * @param settings - Global transform settings.
 */
export async function processDotenvContent(
  content: string,
  settings: Pick<
    DotenvSettings,
    "keyPrefixFilter" | "keyPrefixStrip" | "keyTransform"
  >,
): Promise<DotenvPipelineResult> {
  const parsed = parseDotenvContent(content);
  const transformed = transformDotenvEntries(parsed, settings);
  const variables = toPluginVariables(transformed);
  return { variables };
}
