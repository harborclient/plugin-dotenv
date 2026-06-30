import { buildRenderer, nodeBuiltinStubsPlugin } from '@harborclient/sdk/build';

await buildRenderer({
  jsxRuntime: 'runtime',
  define: { 'process.env.NODE_ENV': '"production"' },
  plugins: [nodeBuiltinStubsPlugin(['path', 'os', 'crypto', 'fs'])],
  watch: process.argv.includes('--watch')
});
