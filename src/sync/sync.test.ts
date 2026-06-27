import { describe, expect, it } from "vitest";
import { parseDotenvContent } from "./parseDotenv";
import { transformDotenvEntries } from "./transformKeys";
import { toPluginVariables } from "./toPluginVariables";

describe("parseDotenvContent", () => {
  it("parses standard dotenv lines and ignores comments", () => {
    expect(
      parseDotenvContent("API_URL=https://example.com\n# comment\nTOKEN=abc"),
    ).toEqual({
      API_URL: "https://example.com",
      TOKEN: "abc",
    });
  });
});

describe("transformDotenvEntries", () => {
  it("filters, strips, and snake_cases keys", () => {
    const result = transformDotenvEntries(
      {
        OTHER: "1",
        API_BASE_URL: "https://example.com",
      },
      {
        keyPrefixFilter: "API_",
        keyPrefixStrip: "API_",
        keyTransform: "snake_case",
      },
    );

    expect(result).toEqual({
      base_url: "https://example.com",
    });
  });
});

describe("toPluginVariables", () => {
  it("maps entries to plugin variable rows", () => {
    expect(toPluginVariables({ token: "abc" })).toEqual([
      { key: "token", value: "abc", defaultValue: "", share: false },
    ]);
  });
});
