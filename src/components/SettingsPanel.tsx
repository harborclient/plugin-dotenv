import { useEffect, useState } from "@harborclient/plugin-api/react";
import type { PluginContext } from "@harborclient/plugin-api";
import { DEFAULT_SETTINGS, SETTINGS_STORAGE_KEY } from "../storage/defaults";
import { getLinkSyncManager } from "../link/LinkSyncManager";
import type { DotenvSettings } from "../types";

interface Props {
  /**
   * Renderer plugin context from the HarborClient host.
   */
  hc: PluginContext;
}

/**
 * Global Dotenv Sync settings panel.
 */
export function SettingsPanel({ hc }: Props) {
  const manager = getLinkSyncManager();
  const [settings, setSettings] = useState<DotenvSettings>(DEFAULT_SETTINGS);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  /**
   * Loads persisted settings when the panel mounts.
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

  /**
   * Persists updated settings through the link manager.
   *
   * @param event - Settings form submit event.
   */
  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const nextSettings: DotenvSettings = {
        ...settings,
        pollIntervalMs: Math.max(settings.pollIntervalMs, 1000),
      };
      if (manager) {
        await manager.saveSettings(nextSettings);
      } else {
        await hc.storage.set(SETTINGS_STORAGE_KEY, nextSettings);
      }
      setSettings(nextSettings);
      setSaved(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : String(submitError)
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      className="max-w-xl space-y-4"
      onSubmit={(event) => void handleSubmit(event)}
    >
      <p className="text-[14px] text-muted">
        Configure how `.env` keys are mapped into HarborClient environments.
      </p>

      <label className="block space-y-1">
        <span className="text-[14px]">Key prefix filter</span>
        <input
          className="w-full rounded border border-control bg-control px-3 py-2 text-[14px]"
          value={settings.keyPrefixFilter}
          onChange={(event) =>
            setSettings((current) => ({
              ...current,
              keyPrefixFilter: event.target.value,
            }))
          }
          placeholder="Only sync keys starting with this prefix"
        />
      </label>

      <label className="block space-y-1">
        <span className="text-[14px]">Key prefix strip</span>
        <input
          className="w-full rounded border border-control bg-control px-3 py-2 text-[14px]"
          value={settings.keyPrefixStrip}
          onChange={(event) =>
            setSettings((current) => ({
              ...current,
              keyPrefixStrip: event.target.value,
            }))
          }
          placeholder="Remove this prefix before mapping keys"
        />
      </label>

      <label className="block space-y-1">
        <span className="text-[14px]">Key transform</span>
        <select
          className="w-full rounded border border-control bg-control px-3 py-2 text-[14px]"
          value={settings.keyTransform}
          onChange={(event) =>
            setSettings((current) => ({
              ...current,
              keyTransform: event.target
                .value as DotenvSettings["keyTransform"],
            }))
          }
        >
          <option value="none">None</option>
          <option value="lowercase">Lowercase</option>
          <option value="snake_case">snake_case</option>
        </select>
      </label>

      <label className="block space-y-1">
        <span className="text-[14px]">Poll interval (ms)</span>
        <input
          className="w-full rounded border border-control bg-control px-3 py-2 text-[14px]"
          type="number"
          min={1000}
          step={500}
          value={settings.pollIntervalMs}
          onChange={(event) =>
            setSettings((current) => ({
              ...current,
              pollIntervalMs:
                Number(event.target.value) || DEFAULT_SETTINGS.pollIntervalMs,
            }))
          }
        />
      </label>

      <label className="flex items-center gap-2 text-[14px]">
        <input
          type="checkbox"
          checked={settings.keepInSyncDefault}
          onChange={(event) =>
            setSettings((current) => ({
              ...current,
              keepInSyncDefault: event.target.checked,
            }))
          }
        />
        Keep new links in sync automatically
      </label>

      {error ? (
        <p className="text-[14px] text-danger" role="alert">
          {error}
        </p>
      ) : null}
      {saved ? (
        <p className="text-[14px] text-muted" role="status">
          Settings saved.
        </p>
      ) : null}

      <button
        type="submit"
        className="rounded bg-accent px-4 py-2 text-[14px] text-on-accent disabled:opacity-60"
        disabled={saving}
      >
        {saving ? "Saving…" : "Save settings"}
      </button>
    </form>
  );
}
