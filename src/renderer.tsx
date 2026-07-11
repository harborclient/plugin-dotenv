import type { PluginContext } from "@harborclient/sdk";
import { ImportEnvView } from "./components/ImportEnvView";
import { SettingsPanel } from "./components/SettingsPanel";

/**
 * Activates the Dotenv Sync plugin and registers UI contributions.
 *
 * @param hc - Renderer plugin context from the HarborClient host.
 */
export function activate(hc: PluginContext): void {
  /**
   * Settings panel host that closes over the plugin context.
   */
  function SettingsPanelHost() {
    return <SettingsPanel hc={hc} />;
  }

  /**
   * Full-area import view host that closes over the plugin context.
   */
  function ImportEnvViewHost() {
    return <ImportEnvView hc={hc} />;
  }

  hc.subscriptions.push(
    hc.ui.registerSettingsSection({
      id: "defaults",
      title: "Dotenv Sync",
      Component: SettingsPanelHost,
    }),
    hc.ui.registerMainView({
      id: "import",
      title: "Import .env",
      Component: ImportEnvViewHost,
    }),
    hc.ui.registerMenuItem({
      menu: "file",
      command: "import",
      label: "Import .env",
      group: "import",
    }),
    hc.commands.register("import", () => {
      void hc.commands.execute(
        "harborclient:openMainView",
        hc.pluginId,
        "import",
      );
    }),
  );
}

/**
 * Clears module state when the plugin deactivates.
 */
export function deactivate(): void {
  // No module state to clear.
}
