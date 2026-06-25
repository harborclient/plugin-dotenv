import esbuild from "esbuild";

/**
 * Node built-ins that dotenv imports but are unused by {@link parse} at runtime.
 */
const NODE_STUB_MODULES = ["path", "os", "crypto", "fs"];

/**
 * Builds the renderer plugin bundle for HarborClient.
 */
async function buildRenderer(watch = false) {
  const context = await esbuild.context({
    entryPoints: ["src/renderer.tsx"],
    outfile: "dist/renderer.js",
    bundle: true,
    format: "esm",
    platform: "browser",
    jsx: "automatic",
    jsxImportSource: "@harborclient/plugin-api",
    external: ["react", "react-dom"],
    plugins: [
      {
        name: "node-builtins-stub",
        setup(build) {
          for (const moduleName of NODE_STUB_MODULES) {
            build.onResolve({ filter: new RegExp(`^${moduleName}$`) }, () => ({
              path: moduleName,
              namespace: "node-stub",
            }));
          }

          build.onLoad({ filter: /.*/, namespace: "node-stub" }, (args) => ({
            contents: "export default {};",
            loader: "js",
          }));
        },
      },
    ],
  });

  if (watch) {
    await context.watch();
    return;
  }

  await context.rebuild();
  await context.dispose();
}

const watch = process.argv.includes("--watch");
await buildRenderer(watch);
