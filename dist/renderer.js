var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node-stub:fs
var fs_exports = {};
__export(fs_exports, {
  default: () => fs_default
});
var fs_default;
var init_fs = __esm({
  "node-stub:fs"() {
    fs_default = {};
  }
});

// node-stub:path
var path_exports = {};
__export(path_exports, {
  default: () => path_default
});
var path_default;
var init_path = __esm({
  "node-stub:path"() {
    path_default = {};
  }
});

// node-stub:os
var os_exports = {};
__export(os_exports, {
  default: () => os_default
});
var os_default;
var init_os = __esm({
  "node-stub:os"() {
    os_default = {};
  }
});

// node-stub:crypto
var crypto_exports = {};
__export(crypto_exports, {
  default: () => crypto_default
});
var crypto_default;
var init_crypto = __esm({
  "node-stub:crypto"() {
    crypto_default = {};
  }
});

// node_modules/.pnpm/dotenv@16.6.1/node_modules/dotenv/package.json
var require_package = __commonJS({
  "node_modules/.pnpm/dotenv@16.6.1/node_modules/dotenv/package.json"(exports, module) {
    module.exports = {
      name: "dotenv",
      version: "16.6.1",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          types: "./lib/main.d.ts",
          require: "./lib/main.js",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        pretest: "npm run lint && npm run dts-check",
        test: "tap run --allow-empty-coverage --disable-coverage --timeout=60000",
        "test:coverage": "tap run --show-full-coverage --timeout=60000 --coverage-report=text --coverage-report=lcov",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      homepage: "https://github.com/motdotla/dotenv#readme",
      funding: "https://dotenvx.com",
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@types/node": "^18.11.3",
        decache: "^4.6.2",
        sinon: "^14.0.1",
        standard: "^17.0.0",
        "standard-version": "^9.5.0",
        tap: "^19.2.0",
        typescript: "^4.8.4"
      },
      engines: {
        node: ">=12"
      },
      browser: {
        fs: false
      }
    };
  }
});

// node_modules/.pnpm/dotenv@16.6.1/node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/.pnpm/dotenv@16.6.1/node_modules/dotenv/lib/main.js"(exports, module) {
    var fs = (init_fs(), __toCommonJS(fs_exports));
    var path = (init_path(), __toCommonJS(path_exports));
    var os = (init_os(), __toCommonJS(os_exports));
    var crypto = (init_crypto(), __toCommonJS(crypto_exports));
    var packageJson = require_package();
    var version = packageJson.version;
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse2(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _parseVault(options) {
      options = options || {};
      const vaultPath = _vaultPath(options);
      options.path = vaultPath;
      const result = DotenvModule.configDotenv(options);
      if (!result.parsed) {
        const err = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
        err.code = "MISSING_DATA";
        throw err;
      }
      const keys = _dotenvKey(options).split(",");
      const length = keys.length;
      let decrypted;
      for (let i = 0; i < length; i++) {
        try {
          const key = keys[i].trim();
          const attrs = _instructions(result, key);
          decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
          break;
        } catch (error) {
          if (i + 1 >= length) {
            throw error;
          }
        }
      }
      return DotenvModule.parse(decrypted);
    }
    function _warn(message) {
      console.log(`[dotenv@${version}][WARN] ${message}`);
    }
    function _debug(message) {
      console.log(`[dotenv@${version}][DEBUG] ${message}`);
    }
    function _log(message) {
      console.log(`[dotenv@${version}] ${message}`);
    }
    function _dotenvKey(options) {
      if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
        return options.DOTENV_KEY;
      }
      if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
        return process.env.DOTENV_KEY;
      }
      return "";
    }
    function _instructions(result, dotenvKey) {
      let uri;
      try {
        uri = new URL(dotenvKey);
      } catch (error) {
        if (error.code === "ERR_INVALID_URL") {
          const err = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        }
        throw error;
      }
      const key = uri.password;
      if (!key) {
        const err = new Error("INVALID_DOTENV_KEY: Missing key part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environment = uri.searchParams.get("environment");
      if (!environment) {
        const err = new Error("INVALID_DOTENV_KEY: Missing environment part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
      const ciphertext = result.parsed[environmentKey];
      if (!ciphertext) {
        const err = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
        err.code = "NOT_FOUND_DOTENV_ENVIRONMENT";
        throw err;
      }
      return { ciphertext, key };
    }
    function _vaultPath(options) {
      let possibleVaultPath = null;
      if (options && options.path && options.path.length > 0) {
        if (Array.isArray(options.path)) {
          for (const filepath of options.path) {
            if (fs.existsSync(filepath)) {
              possibleVaultPath = filepath.endsWith(".vault") ? filepath : `${filepath}.vault`;
            }
          }
        } else {
          possibleVaultPath = options.path.endsWith(".vault") ? options.path : `${options.path}.vault`;
        }
      } else {
        possibleVaultPath = path.resolve(process.cwd(), ".env.vault");
      }
      if (fs.existsSync(possibleVaultPath)) {
        return possibleVaultPath;
      }
      return null;
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    function _configVault(options) {
      const debug = Boolean(options && options.debug);
      const quiet = options && "quiet" in options ? options.quiet : true;
      if (debug || !quiet) {
        _log("Loading env from encrypted .env.vault");
      }
      const parsed = DotenvModule._parseVault(options);
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsed, options);
      return { parsed };
    }
    function configDotenv(options) {
      const dotenvPath = path.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      const debug = Boolean(options && options.debug);
      const quiet = options && "quiet" in options ? options.quiet : true;
      if (options && options.encoding) {
        encoding = options.encoding;
      } else {
        if (debug) {
          _debug("No encoding is specified. UTF-8 is used by default");
        }
      }
      let optionPaths = [dotenvPath];
      if (options && options.path) {
        if (!Array.isArray(options.path)) {
          optionPaths = [_resolveHome(options.path)];
        } else {
          optionPaths = [];
          for (const filepath of options.path) {
            optionPaths.push(_resolveHome(filepath));
          }
        }
      }
      let lastError;
      const parsedAll = {};
      for (const path2 of optionPaths) {
        try {
          const parsed = DotenvModule.parse(fs.readFileSync(path2, { encoding }));
          DotenvModule.populate(parsedAll, parsed, options);
        } catch (e) {
          if (debug) {
            _debug(`Failed to load ${path2} ${e.message}`);
          }
          lastError = e;
        }
      }
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsedAll, options);
      if (debug || !quiet) {
        const keysCount = Object.keys(parsedAll).length;
        const shortPaths = [];
        for (const filePath of optionPaths) {
          try {
            const relative = path.relative(process.cwd(), filePath);
            shortPaths.push(relative);
          } catch (e) {
            if (debug) {
              _debug(`Failed to load ${filePath} ${e.message}`);
            }
            lastError = e;
          }
        }
        _log(`injecting env (${keysCount}) from ${shortPaths.join(",")}`);
      }
      if (lastError) {
        return { parsed: parsedAll, error: lastError };
      } else {
        return { parsed: parsedAll };
      }
    }
    function config(options) {
      if (_dotenvKey(options).length === 0) {
        return DotenvModule.configDotenv(options);
      }
      const vaultPath = _vaultPath(options);
      if (!vaultPath) {
        _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`);
        return DotenvModule.configDotenv(options);
      }
      return DotenvModule._configVault(options);
    }
    function decrypt(encrypted, keyStr) {
      const key = Buffer.from(keyStr.slice(-64), "hex");
      let ciphertext = Buffer.from(encrypted, "base64");
      const nonce = ciphertext.subarray(0, 12);
      const authTag = ciphertext.subarray(-16);
      ciphertext = ciphertext.subarray(12, -16);
      try {
        const aesgcm = crypto.createDecipheriv("aes-256-gcm", key, nonce);
        aesgcm.setAuthTag(authTag);
        return `${aesgcm.update(ciphertext)}${aesgcm.final()}`;
      } catch (error) {
        const isRange = error instanceof RangeError;
        const invalidKeyLength = error.message === "Invalid key length";
        const decryptionFailed = error.message === "Unsupported state or unable to authenticate data";
        if (isRange || invalidKeyLength) {
          const err = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        } else if (decryptionFailed) {
          const err = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
          err.code = "DECRYPTION_FAILED";
          throw err;
        } else {
          throw error;
        }
      }
    }
    function populate(processEnv, parsed, options = {}) {
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      if (typeof parsed !== "object") {
        const err = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
        err.code = "OBJECT_REQUIRED";
        throw err;
      }
      for (const key of Object.keys(parsed)) {
        if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
          if (override === true) {
            processEnv[key] = parsed[key];
          }
          if (debug) {
            if (override === true) {
              _debug(`"${key}" is already defined and WAS overwritten`);
            } else {
              _debug(`"${key}" is already defined and was NOT overwritten`);
            }
          }
        } else {
          processEnv[key] = parsed[key];
        }
      }
    }
    var DotenvModule = {
      configDotenv,
      _configVault,
      _parseVault,
      config,
      decrypt,
      parse: parse2,
      populate
    };
    module.exports.configDotenv = DotenvModule.configDotenv;
    module.exports._configVault = DotenvModule._configVault;
    module.exports._parseVault = DotenvModule._parseVault;
    module.exports.config = DotenvModule.config;
    module.exports.decrypt = DotenvModule.decrypt;
    module.exports.parse = DotenvModule.parse;
    module.exports.populate = DotenvModule.populate;
    module.exports = DotenvModule;
  }
});

// node_modules/.pnpm/@harborclient+sdk@0.4.3_react@19.2.7/node_modules/@harborclient/sdk/dist/runtime/reactHost.js
var hostReact = null;
function setHostReact(react) {
  hostReact = react;
}
function requireHostReact() {
  if (hostReact == null) {
    throw new Error(
      "Plugin React host is not installed. Call installReact(hc.react) at the start of activate()."
    );
  }
  return hostReact;
}

// node_modules/.pnpm/@harborclient+sdk@0.4.3_react@19.2.7/node_modules/@harborclient/sdk/dist/runtime/index.js
function installReact(react) {
  setHostReact(react);
}

// node_modules/.pnpm/@harborclient+sdk@0.4.3_react@19.2.7/node_modules/@harborclient/sdk/dist/runtime/react.js
function hook(name) {
  const react = requireHostReact();
  const fn = react[name];
  if (typeof fn !== "function") {
    throw new Error(`React hook "${String(name)}" is not available on hc.react.`);
  }
  return fn;
}
function useState(initialState) {
  return hook("useState")(initialState);
}
function useEffect(effect, deps) {
  return hook("useEffect")(effect, deps);
}
function useMemo(factory, deps) {
  return hook("useMemo")(factory, deps);
}

// src/storage/defaults.ts
var DEFAULT_SETTINGS = {
  keyPrefixFilter: "",
  keyPrefixStrip: "",
  keyTransform: "none"
};
var SETTINGS_STORAGE_KEY = "settings";

// src/sync/parseDotenv.ts
var import_dotenv = __toESM(require_main(), 1);
function parseDotenvContent(content) {
  return (0, import_dotenv.parse)(content);
}

// src/sync/toPluginVariables.ts
function toPluginVariables(entries) {
  return Object.entries(entries).map(([key, value]) => ({
    key,
    value,
    defaultValue: "",
    share: false
  }));
}

// src/sync/transformKeys.ts
function toSnakeCase(key) {
  return key.replace(/([a-z0-9])([A-Z])/g, "$1_$2").replace(/[^a-zA-Z0-9]+/g, "_").replace(/^_+|_+$/g, "").toLowerCase();
}
function transformDotenvEntries(entries, settings) {
  const result = {};
  for (const [rawKey, value] of Object.entries(entries)) {
    if (settings.keyPrefixFilter && !rawKey.startsWith(settings.keyPrefixFilter)) {
      continue;
    }
    let key = rawKey;
    if (settings.keyPrefixStrip && key.startsWith(settings.keyPrefixStrip)) {
      key = key.slice(settings.keyPrefixStrip.length);
    }
    if (settings.keyTransform === "lowercase") {
      key = key.toLowerCase();
    } else if (settings.keyTransform === "snake_case") {
      key = toSnakeCase(key);
    }
    key = key.trim();
    if (!key) {
      continue;
    }
    result[key] = value;
  }
  return result;
}

// src/sync/pipeline.ts
async function processDotenvContent(content, settings) {
  const parsed = parseDotenvContent(content);
  const transformed = transformDotenvEntries(parsed, settings);
  const variables = toPluginVariables(transformed);
  return { variables };
}

// node_modules/.pnpm/@harborclient+sdk@0.4.3_react@19.2.7/node_modules/@harborclient/sdk/dist/runtime/jsx-runtime.js
var Fragment = Symbol.for("@harborclient/sdk.Fragment");
function build(type, props, key) {
  const react = requireHostReact();
  const elementType = type === Fragment ? react.Fragment : type;
  const { children, ...rest } = props ?? {};
  if (key !== void 0) {
    rest.key = key;
  }
  return react.createElement(elementType, rest, children);
}
var jsx = build;
var jsxs = build;

// src/components/ImportEnvView.tsx
function suggestEnvironmentName(dotenvPath) {
  const parts = dotenvPath.split(/[/\\]/);
  const fileName = parts[parts.length - 1] ?? "env";
  const stem = fileName.replace(/^\.env\.?/, "").replace(/^\.env$/, "");
  if (stem) {
    return stem;
  }
  return "Local env";
}
function formatImportError(error) {
  const message = error instanceof Error ? error.message : String(error);
  if (message.includes("not allowlisted")) {
    return `${message} Re-select the .env file with Browse to restore access.`;
  }
  return message;
}
function ImportEnvView({ hc }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [dotenvPath, setDotenvPath] = useState("");
  const [variables, setVariables] = useState([]);
  const [environmentName, setEnvironmentName] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const [loadingFile, setLoadingFile] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createdName, setCreatedName] = useState(null);
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const stored = await hc.storage.get(SETTINGS_STORAGE_KEY) ?? DEFAULT_SETTINGS;
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
  async function handleBrowse() {
    setError(null);
    setStatus(null);
    setCreatedName(null);
    setLoadingFile(true);
    try {
      const selected = await hc.fs.pickFile({
        title: "Select .env file",
        filters: [{ name: "Env files", extensions: ["env"] }]
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
  async function handleCreate(event) {
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
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl space-y-6", children: [
    /* @__PURE__ */ jsx("p", { className: "text-[14px] text-muted", children: "Import variables from a `.env` file into a new HarborClient environment. Adjust key filters in Settings \u2192 Dotenv Sync before importing." }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxs("label", { className: "block space-y-1", children: [
        /* @__PURE__ */ jsx("span", { className: "text-[14px]", id: "dotenv-path-label", children: "`.env` file" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "dotenv-path",
              className: "min-w-0 flex-1 rounded border border-control bg-control px-3 py-2 text-[14px]",
              value: dotenvPath,
              readOnly: true,
              "aria-labelledby": "dotenv-path-label"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "rounded border border-control px-3 py-2 text-[14px] disabled:opacity-60",
              onClick: () => void handleBrowse(),
              disabled: loadingFile || creating,
              children: loadingFile ? "Loading\u2026" : "Browse"
            }
          )
        ] })
      ] }),
      variables.length > 0 ? /* @__PURE__ */ jsxs("p", { className: "text-[14px] text-muted", role: "status", children: [
        variables.length,
        " variable",
        variables.length === 1 ? "" : "s",
        " ready to import: ",
        variables.map((row) => row.key).join(", ")
      ] }) : null,
      /* @__PURE__ */ jsx(
        "form",
        {
          className: "space-y-6",
          onSubmit: (event) => void handleCreate(event),
          children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ jsxs("label", { className: "block space-y-1", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[14px]", id: "environment-name-label", children: "Environment name" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "environment-name",
                  className: "w-full rounded border border-control bg-control px-3 py-2 text-[14px]",
                  value: environmentName,
                  onChange: (event) => setEnvironmentName(event.target.value),
                  placeholder: suggestedName || "Local env",
                  required: true,
                  "aria-required": "true",
                  "aria-labelledby": "environment-name-label",
                  disabled: creating || Boolean(createdName)
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                className: "rounded bg-accent px-4 py-2 text-[14px] text-on-accent disabled:opacity-60",
                disabled: creating || loadingFile || variables.length === 0 || Boolean(createdName),
                children: creating ? "Creating\u2026" : "Create environment"
              }
            )
          ] })
        }
      ),
      status ? /* @__PURE__ */ jsx("p", { className: "text-[14px] text-muted", role: "status", "aria-live": "polite", children: status }) : null,
      error ? /* @__PURE__ */ jsx("p", { className: "text-[14px] text-danger", role: "alert", children: error }) : null
    ] })
  ] });
}

// src/components/SettingsPanel.tsx
function SettingsPanel({ hc }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const stored = await hc.storage.get(SETTINGS_STORAGE_KEY) ?? DEFAULT_SETTINGS;
      if (!cancelled) {
        setSettings(stored);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [hc]);
  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      await hc.storage.set(SETTINGS_STORAGE_KEY, settings);
      setSaved(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : String(submitError)
      );
    } finally {
      setSaving(false);
    }
  }
  return /* @__PURE__ */ jsxs(
    "form",
    {
      className: "max-w-xl space-y-4",
      onSubmit: (event) => void handleSubmit(event),
      children: [
        /* @__PURE__ */ jsx("p", { className: "text-[14px] text-muted", children: "Configure how `.env` keys are mapped into HarborClient environments when you use File \u2192 Import .env." }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
          /* @__PURE__ */ jsxs("label", { className: "block space-y-1", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[14px]", children: "Key prefix filter" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                className: "w-full rounded border border-control bg-control px-3 py-2 text-[14px]",
                value: settings.keyPrefixFilter,
                onChange: (event) => setSettings((current) => ({
                  ...current,
                  keyPrefixFilter: event.target.value
                })),
                placeholder: "Only sync keys starting with this prefix"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "block space-y-1", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[14px]", children: "Key prefix strip" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                className: "w-full rounded border border-control bg-control px-3 py-2 text-[14px]",
                value: settings.keyPrefixStrip,
                onChange: (event) => setSettings((current) => ({
                  ...current,
                  keyPrefixStrip: event.target.value
                })),
                placeholder: "Remove this prefix before mapping keys"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "block space-y-1", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[14px]", children: "Key transform" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                className: "w-full rounded border border-control bg-control px-3 py-2 text-[14px]",
                value: settings.keyTransform,
                onChange: (event) => setSettings((current) => ({
                  ...current,
                  keyTransform: event.target.value
                })),
                children: [
                  /* @__PURE__ */ jsx("option", { value: "none", children: "None" }),
                  /* @__PURE__ */ jsx("option", { value: "lowercase", children: "Lowercase" }),
                  /* @__PURE__ */ jsx("option", { value: "snake_case", children: "snake_case" })
                ]
              }
            )
          ] }),
          error ? /* @__PURE__ */ jsx("p", { className: "text-[14px] text-danger", role: "alert", children: error }) : null,
          saved ? /* @__PURE__ */ jsx("p", { className: "text-[14px] text-muted", role: "status", children: "Settings saved." }) : null,
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "rounded bg-accent px-4 py-2 text-[14px] text-on-accent disabled:opacity-60",
              disabled: saving,
              children: saving ? "Saving\u2026" : "Save settings"
            }
          )
        ] })
      ]
    }
  );
}

// src/renderer.tsx
function activate(hc) {
  installReact(hc.react);
  function SettingsPanelHost() {
    return /* @__PURE__ */ jsx(SettingsPanel, { hc });
  }
  function ImportEnvViewHost() {
    return /* @__PURE__ */ jsx(ImportEnvView, { hc });
  }
  hc.subscriptions.push(
    hc.ui.registerSettingsSection({
      id: "defaults",
      title: "Dotenv Sync",
      Component: SettingsPanelHost
    }),
    hc.ui.registerMainView({
      id: "import",
      title: "Import .env",
      Component: ImportEnvViewHost
    }),
    hc.ui.registerMenuItem({
      menu: "file",
      command: "import",
      label: "Import .env",
      group: "import"
    }),
    hc.commands.register("import", () => {
      void hc.commands.execute(
        "harborclient:openMainView",
        hc.pluginId,
        "import"
      );
    })
  );
}
function deactivate() {
}
export {
  activate,
  deactivate
};
