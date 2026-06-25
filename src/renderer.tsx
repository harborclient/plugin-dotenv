import { installReact } from "@harborclient/plugin-api";
import type {
  CollectionSettingsTabContext,
  PluginContext,
} from "@harborclient/plugin-api";
import { CollectionDotenvTab } from "./components/CollectionDotenvTab";
import { SettingsPanel } from "./components/SettingsPanel";
import { LinkSyncManager, setLinkSyncManager } from "./link/LinkSyncManager";

/**
 * Activates the Dotenv Sync plugin and registers UI contributions.
 *
 * @param hc - Renderer plugin context from the HarborClient host.
 */
export function activate(hc: PluginContext): void {
  installReact(hc.react);

  const linkSync = new LinkSyncManager(hc);
  setLinkSyncManager(linkSync);

  /**
   * Settings panel host that closes over the plugin context.
   */
  function SettingsPanelHost() {
    return <SettingsPanel hc={hc} />;
  }

  /**
   * Collection settings tab host that closes over plugin and collection context.
   */
  function CollectionDotenvTabHost({
    context,
  }: {
    context: CollectionSettingsTabContext;
  }) {
    return <CollectionDotenvTab hc={hc} context={context} />;
  }

  hc.subscriptions.push(
    hc.ui.registerSettingsSection({
      id: "defaults",
      title: "Dotenv Sync",
      Component: SettingsPanelHost,
    }),
    hc.ui.registerCollectionSettingsTab({
      id: "dotenv",
      title: "Dotenv",
      order: 50,
      Component: CollectionDotenvTabHost,
    }),
    {
      dispose: () => {
        linkSync.dispose();
        setLinkSyncManager(null);
      },
    }
  );

  void linkSync.start();
}

/**
 * Clears module state when the plugin deactivates.
 */
export function deactivate(): void {
  setLinkSyncManager(null);
}
