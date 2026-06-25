import { parse } from "dotenv";

/**
 * Parses `.env` file content into a flat key/value map.
 *
 * @param content - UTF-8 `.env` file contents.
 */
export function parseDotenvContent(content: string): Record<string, string> {
  return parse(content);
}
