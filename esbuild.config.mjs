import { createRequire } from "node:module";
import esbuild from "esbuild";

const require = createRequire(import.meta.url);

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
    jsxImportSource: "@harborclient/sdk",
    external: ["react", "react-dom"],
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    plugins: [
      {
        name: "react-jsx-runtime-redirect",
        setup(build) {
          build.onResolve({ filter: /^react\/jsx-runtime$/ }, () => ({
            path: require.resolve("@harborclient/sdk/jsx-runtime"),
          }));
          build.onResolve({ filter: /^react\/jsx-dev-runtime$/ }, () => ({
            path: require.resolve("@harborclient/sdk/jsx-dev-runtime"),
          }));
        },
      },
      {
        name: "node-builtins-stub",
        setup(build) {
          for (const moduleName of NODE_STUB_MODULES) {
            build.onResolve({ filter: new RegExp(`^${moduleName}$`) }, () => ({
              path: moduleName,
              namespace: "node-stub",
            }));
          }

          build.onLoad({ filter: /.*/, namespace: "node-stub" }, () => ({
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
