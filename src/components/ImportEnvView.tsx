import { useEffect, useMemo, useState } from "@harborclient/plugin-api/react";
import type {
  PluginContext,
  PluginVariableInput,
} from "@harborclient/plugin-api";
import { DEFAULT_SETTINGS, SETTINGS_STORAGE_KEY } from "../storage/defaults";
import { processDotenvContent } from "../sync/pipeline";
import type { DotenvSettings } from "../types";

interface Props {
  /**
   * Renderer plugin context from the HarborClient host.
   */
  hc: PluginContext;
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
 * Formats import and filesystem errors, including guidance for stale allowlist failures.
 *
 * @param error - Failure from browse, read, or environment APIs.
 */
function formatImportError(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  if (message.includes("not allowlisted")) {
    return `${message} Re-select the .env file with Browse to restore access.`;
  }
  return message;
}

/**
 * Full-area view for one-shot `.env` import into a new environment.
 */
export function ImportEnvView({ hc }: Props) {
  const [settings, setSettings] = useState<DotenvSettings>(DEFAULT_SETTINGS);
  const [dotenvPath, setDotenvPath] = useState("");
  const [variables, setVariables] = useState<PluginVariableInput[]>([]);
  const [environmentName, setEnvironmentName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loadingFile, setLoadingFile] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createdName, setCreatedName] = useState<string | null>(null);

  /**
   * Loads persisted transform settings when the import view mounts.
   */
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const stored =
        (await hc.storage.get<DotenvSettings>(SETTINGS_STORAGE_KEY)) ??
        DEFAULT_SETTINGS;
      if (!cancelled) {
        setSettings(stored);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [hc]);

  const suggestedName = useMemo(
    () => suggestEnvironmentName(dotenvPath),
    [dotenvPath]
  );

  /**
   * Opens a native file picker and parses the selected `.env` file.
   */
  async function handleBrowse(): Promise<void> {
    setError(null);
    setStatus(null);
    setCreatedName(null);
    setLoadingFile(true);
    try {
      const selected = await hc.fs.pickFile({
        title: "Select .env file",
        filters: [{ name: "Env files", extensions: ["env"] }],
      });
      if (selected.length === 0) {
        return;
      }
      const path = selected[0];
      const content = await hc.fs.readFile(path);
      const { variables: parsed } = await processDotenvContent(
        content,
        settings
      );
      if (parsed.length === 0) {
        throw new Error(
          "No variables matched the current Dotenv Sync filters."
        );
      }
      setDotenvPath(path);
      setVariables(parsed);
      setEnvironmentName(suggestEnvironmentName(path));
    } catch (browseError) {
      setDotenvPath("");
      setVariables([]);
      setError(formatImportError(browseError));
    } finally {
      setLoadingFile(false);
    }
  }

  /**
   * Creates a new environment from the parsed `.env` variables.
   *
   * @param event - Import form submit event.
   */
  async function handleCreate(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const name = environmentName.trim();
    if (!name) {
      setError("Environment name is required.");
      return;
    }
    if (variables.length === 0) {
      setError("Select a .env file before creating an environment.");
      return;
    }

    setCreating(true);
    setError(null);
    setStatus(null);
    setCreatedName(null);
    try {
      const created = await hc.host.createEnvironmentWithVariables(
        name,
        variables
      );
      setCreatedName(created.name);
      setStatus(
        `Created environment "${created.name}" with ${variables.length} variables.`
      );
      hc.ui.showToast(`Environment "${created.name}" created from .env`);
    } catch (createError) {
      setError(formatImportError(createError));
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <p className="text-[14px] text-muted">
        Import variables from a `.env` file into a new HarborClient environment.
        Adjust key filters in Settings → Dotenv Sync before importing.
      </p>

      <div className="flex flex-col gap-4">
        <label className="block space-y-1">
          <span className="text-[14px]" id="dotenv-path-label">
            `.env` file
          </span>
          <div className="flex gap-2">
            <input
              id="dotenv-path"
              className="min-w-0 flex-1 rounded border border-control bg-control px-3 py-2 text-[14px]"
              value={dotenvPath}
              readOnly
              aria-labelledby="dotenv-path-label"
            />
            <button
              type="button"
              className="rounded border border-control px-3 py-2 text-[14px] disabled:opacity-60"
              onClick={() => void handleBrowse()}
              disabled={loadingFile || creating}
            >
              {loadingFile ? "Loading…" : "Browse"}
            </button>
          </div>
        </label>

        {variables.length > 0 ? (
          <p className="text-[14px] text-muted" role="status">
            {variables.length} variable{variables.length === 1 ? "" : "s"} ready
            to import: {variables.map((row) => row.key).join(", ")}
          </p>
        ) : null}

        <form
          className="space-y-6"
          onSubmit={(event) => void handleCreate(event)}
        >
          <div className="flex flex-col gap-4">
            <label className="block space-y-1">
              <span className="text-[14px]" id="environment-name-label">
                Environment name
              </span>
              <input
                id="environment-name"
                className="w-full rounded border border-control bg-control px-3 py-2 text-[14px]"
                value={environmentName}
                onChange={(event) => setEnvironmentName(event.target.value)}
                placeholder={suggestedName || "Local env"}
                required
                aria-required="true"
                aria-labelledby="environment-name-label"
                disabled={creating || Boolean(createdName)}
              />
            </label>

            <button
              type="submit"
              className="rounded bg-accent px-4 py-2 text-[14px] text-on-accent disabled:opacity-60"
              disabled={
                creating ||
                loadingFile ||
                variables.length === 0 ||
                Boolean(createdName)
              }
            >
              {creating ? "Creating…" : "Create environment"}
            </button>
          </div>
        </form>

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
    </div>
  );
}
