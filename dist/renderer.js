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
    var crypto2 = (init_crypto(), __toCommonJS(crypto_exports));
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
        const aesgcm = crypto2.createDecipheriv("aes-256-gcm", key, nonce);
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

// node_modules/.pnpm/@harborclient+plugin-api@0.4.1_react@19.2.7/node_modules/@harborclient/plugin-api/dist/runtime/reactHost.js
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

// node_modules/.pnpm/@harborclient+plugin-api@0.4.1_react@19.2.7/node_modules/@harborclient/plugin-api/dist/runtime/index.js
function installReact(react) {
  setHostReact(react);
}

// node_modules/.pnpm/@harborclient+plugin-api@0.4.1_react@19.2.7/node_modules/@harborclient/plugin-api/dist/runtime/react.js
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
  keyTransform: "none",
  pollIntervalMs: 3e3,
  keepInSyncDefault: true
};
var SETTINGS_STORAGE_KEY = "settings";
var LINKS_STORAGE_KEY = "links";
function collectionPathStorageKey(collectionId) {
  return `collection:${collectionId}`;
}

// src/sync/contentHash.ts
async function hashContent(content) {
  const buffer = new TextEncoder().encode(content);
  const digest = await crypto.subtle.digest("SHA-256", buffer);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

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
  const hash = await hashContent(content);
  return { variables, hash };
}

// src/link/LinkSyncManager.ts
var RESYNC_DEBOUNCE_MS = 300;
var LinkSyncManager = class {
  #hc;
  #listeners = /* @__PURE__ */ new Set();
  #errors = /* @__PURE__ */ new Map();
  #pathWatchers = /* @__PURE__ */ new Map();
  #debounceTimers = /* @__PURE__ */ new Map();
  #links = [];
  #settings = DEFAULT_SETTINGS;
  #started = false;
  /**
   * @param hc - Renderer plugin context from the HarborClient host.
   */
  constructor(hc) {
    this.#hc = hc;
  }
  /**
   * Loads persisted settings and links, then starts active watchers.
   */
  async start() {
    if (this.#started) {
      return;
    }
    this.#started = true;
    this.#settings = await this.#hc.storage.get(
      SETTINGS_STORAGE_KEY
    ) ?? {
      ...DEFAULT_SETTINGS
    };
    this.#links = await this.#hc.storage.get(LINKS_STORAGE_KEY) ?? [];
    await this.#refreshWatchers();
  }
  /**
   * Returns all persisted dotenv links.
   */
  getLinks() {
    return [...this.#links];
  }
  /**
   * Returns the link for one collection, if any.
   *
   * @param collectionId - Collection database id.
   */
  getLinkForCollection(collectionId) {
    return this.#links.find((link) => link.collectionId === collectionId);
  }
  /**
   * Returns the latest sync error for one collection link.
   *
   * @param collectionId - Collection database id.
   */
  getLinkError(collectionId) {
    return this.#errors.get(collectionId) ?? null;
  }
  /**
   * Subscribes to link or error changes for UI refresh.
   *
   * @param listener - Called when link state changes.
   */
  subscribe(listener) {
    this.#listeners.add(listener);
    return {
      dispose: () => {
        this.#listeners.delete(listener);
      }
    };
  }
  /**
   * Loads current global settings from plugin storage.
   */
  async getSettings() {
    return await this.#hc.storage.get(SETTINGS_STORAGE_KEY) ?? {
      ...DEFAULT_SETTINGS
    };
  }
  /**
   * Persists updated global settings and refreshes active watchers.
   *
   * @param settings - Updated global settings.
   */
  async saveSettings(settings) {
    this.#settings = settings;
    await this.#hc.storage.set(SETTINGS_STORAGE_KEY, settings);
    await this.#refreshWatchers();
    this.#notify();
  }
  /**
   * Syncs one collection `.env` file into its linked or new environment.
   *
   * @param collectionId - Collection database id.
   * @param dotenvPath - Absolute `.env` file path.
   * @param options - Sync behavior overrides.
   */
  async syncCollection(collectionId, dotenvPath, options = {}) {
    const content = await this.#hc.fs.readFile(dotenvPath);
    const settings = await this.getSettings();
    const { variables, hash } = await processDotenvContent(content, settings);
    if (variables.length === 0) {
      throw new Error("No variables matched the current Dotenv Sync filters.");
    }
    const existing = this.getLinkForCollection(collectionId);
    if (options.createNew || !existing) {
      const environmentName = options.environmentName?.trim();
      if (!environmentName) {
        throw new Error("Environment name is required.");
      }
      const created = await this.#hc.host.createEnvironmentWithVariables(
        environmentName,
        variables
      );
      const link = {
        collectionId,
        dotenvPath,
        environmentId: created.id,
        environmentName: created.name,
        lastSyncedHash: hash,
        lastSyncedAt: (/* @__PURE__ */ new Date()).toISOString(),
        keepInSync: settings.keepInSyncDefault
      };
      this.#upsertLink(link);
      this.#errors.delete(collectionId);
      await this.#persistLinks();
      await this.#refreshWatchers();
      this.#notify();
      return link;
    }
    if (!options.force && existing.lastSyncedHash === hash) {
      return existing;
    }
    await this.#hc.host.updateEnvironmentVariables(
      existing.environmentId,
      variables
    );
    const updated = {
      ...existing,
      dotenvPath,
      lastSyncedHash: hash,
      lastSyncedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    this.#upsertLink(updated);
    this.#errors.delete(collectionId);
    await this.#persistLinks();
    await this.#refreshWatchers();
    this.#notify();
    return updated;
  }
  /**
   * Updates the keep-in-sync flag for one collection link.
   *
   * @param collectionId - Collection database id.
   * @param keepInSync - Whether automatic syncing should stay enabled.
   */
  async setKeepInSync(collectionId, keepInSync) {
    const link = this.getLinkForCollection(collectionId);
    if (!link) {
      return;
    }
    this.#upsertLink({ ...link, keepInSync });
    await this.#persistLinks();
    await this.#refreshWatchers();
    this.#notify();
  }
  /**
   * Removes one collection link and stops watching its `.env` file.
   *
   * @param collectionId - Collection database id.
   */
  async unlink(collectionId) {
    this.#links = this.#links.filter(
      (link) => link.collectionId !== collectionId
    );
    this.#errors.delete(collectionId);
    await this.#persistLinks();
    await this.#refreshWatchers();
    this.#notify();
  }
  /**
   * Stops all watchers and clears pending debounce timers.
   */
  dispose() {
    for (const timer of this.#debounceTimers.values()) {
      clearTimeout(timer);
    }
    this.#debounceTimers.clear();
    for (const record of this.#pathWatchers.values()) {
      record.disposable?.dispose();
      if (record.pollId) {
        clearInterval(record.pollId);
      }
    }
    this.#pathWatchers.clear();
    this.#listeners.clear();
    this.#started = false;
  }
  /**
   * Rebuilds filesystem watchers and polling timers for active links.
   */
  async #refreshWatchers() {
    for (const record of this.#pathWatchers.values()) {
      record.disposable?.dispose();
      if (record.pollId) {
        clearInterval(record.pollId);
      }
    }
    this.#pathWatchers.clear();
    const activePaths = /* @__PURE__ */ new Map();
    for (const link of this.#links) {
      if (!link.keepInSync) {
        continue;
      }
      const group = activePaths.get(link.dotenvPath) ?? [];
      group.push(link);
      activePaths.set(link.dotenvPath, group);
    }
    for (const [dotenvPath, links] of activePaths) {
      let disposable = null;
      try {
        disposable = this.#hc.fs.watchFile(dotenvPath, () => {
          for (const link of links) {
            this.#scheduleResync(link.collectionId, link.dotenvPath);
          }
        });
      } catch {
        disposable = null;
      }
      const pollId = disposable === null ? setInterval(() => {
        for (const link of links) {
          void this.#resyncLink(link.collectionId, link.dotenvPath).catch(
            (error) => {
              this.#setError(
                link.collectionId,
                error instanceof Error ? error.message : String(error)
              );
            }
          );
        }
      }, Math.max(this.#settings.pollIntervalMs, 1e3)) : null;
      this.#pathWatchers.set(dotenvPath, { disposable, pollId });
    }
  }
  /**
   * Debounces automatic re-sync requests for one collection link.
   *
   * @param collectionId - Collection database id.
   * @param dotenvPath - Linked `.env` file path.
   */
  #scheduleResync(collectionId, dotenvPath) {
    const existing = this.#debounceTimers.get(collectionId);
    if (existing) {
      clearTimeout(existing);
    }
    this.#debounceTimers.set(
      collectionId,
      setTimeout(() => {
        this.#debounceTimers.delete(collectionId);
        void this.#resyncLink(collectionId, dotenvPath).catch((error) => {
          this.#setError(
            collectionId,
            error instanceof Error ? error.message : String(error)
          );
        });
      }, RESYNC_DEBOUNCE_MS)
    );
  }
  /**
   * Re-syncs one linked collection when its `.env` file changes.
   *
   * @param collectionId - Collection database id.
   * @param dotenvPath - Linked `.env` file path.
   */
  async #resyncLink(collectionId, dotenvPath) {
    const link = this.getLinkForCollection(collectionId);
    if (!link || !link.keepInSync) {
      return;
    }
    await this.syncCollection(collectionId, dotenvPath, { force: false });
  }
  /**
   * Inserts or replaces one link in the in-memory list.
   *
   * @param link - Updated link record.
   */
  #upsertLink(link) {
    const index = this.#links.findIndex(
      (entry) => entry.collectionId === link.collectionId
    );
    if (index >= 0) {
      this.#links[index] = link;
      return;
    }
    this.#links.push(link);
  }
  /**
   * Persists the current link list to plugin storage.
   */
  async #persistLinks() {
    await this.#hc.storage.set(LINKS_STORAGE_KEY, this.#links);
  }
  /**
   * Stores a sync error for one collection and notifies listeners.
   *
   * @param collectionId - Collection database id.
   * @param message - Error message to display in the collection tab.
   */
  #setError(collectionId, message) {
    this.#errors.set(collectionId, message);
    this.#notify();
  }
  /**
   * Notifies subscribed UI components that link state changed.
   */
  #notify() {
    for (const listener of this.#listeners) {
      listener();
    }
  }
};
var activeManager = null;
function setLinkSyncManager(manager) {
  activeManager = manager;
}
function getLinkSyncManager() {
  return activeManager;
}

// node_modules/.pnpm/@harborclient+plugin-api@0.4.1_react@19.2.7/node_modules/@harborclient/plugin-api/dist/runtime/jsx-runtime.js
var Fragment = Symbol.for("@harborclient/plugin-api.Fragment");
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

// src/components/CollectionDotenvTab.tsx
function suggestEnvironmentName(dotenvPath) {
  const parts = dotenvPath.split(/[/\\]/);
  const fileName = parts[parts.length - 1] ?? "env";
  const stem = fileName.replace(/^\.env\.?/, "").replace(/^\.env$/, "");
  if (stem) {
    return stem;
  }
  return "Local env";
}
function formatSyncedAt(value) {
  if (!value) {
    return "Never";
  }
  return new Date(value).toLocaleString();
}
function formatSyncError(error) {
  const message = error instanceof Error ? error.message : String(error);
  if (message.includes("not allowlisted")) {
    return `${message} Re-select the .env file with Browse to restore access.`;
  }
  return message;
}
function CollectionDotenvTab({ hc, context }) {
  const manager = getLinkSyncManager();
  const [dotenvPath, setDotenvPath] = useState("");
  const [link, setLink] = useState();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [environmentName, setEnvironmentName] = useState("");
  const [keepInSync, setKeepInSync] = useState(true);
  const readOnly = context.readOnly;
  const collectionId = context.collectionId;
  useEffect(() => {
    let cancelled = false;
    async function refreshState() {
      const storedPath = (await hc.storage.get(
        collectionPathStorageKey(collectionId)
      ))?.dotenvPath ?? "";
      const currentLink = manager?.getLinkForCollection(collectionId);
      const linkError = manager?.getLinkError(collectionId) ?? null;
      if (cancelled) {
        return;
      }
      setDotenvPath(storedPath);
      setLink(currentLink);
      setKeepInSync(currentLink?.keepInSync ?? true);
      setError(linkError);
    }
    void refreshState();
    const subscription = manager?.subscribe(() => {
      void refreshState();
    });
    return () => {
      cancelled = true;
      subscription?.dispose();
    };
  }, [hc, collectionId, manager]);
  const suggestedName = useMemo(
    () => suggestEnvironmentName(dotenvPath),
    [dotenvPath]
  );
  async function persistPath(path) {
    await hc.storage.set(collectionPathStorageKey(collectionId), {
      dotenvPath: path
    });
    setDotenvPath(path);
  }
  async function handleBrowse() {
    setError(null);
    setStatus(null);
    try {
      const selected = await hc.fs.pickFile({
        title: "Select .env file",
        filters: [{ name: "Env files", extensions: ["env"] }]
      });
      if (selected.length === 0) {
        return;
      }
      await persistPath(selected[0]);
      setEnvironmentName(suggestEnvironmentName(selected[0]));
    } catch (browseError) {
      setError(formatSyncError(browseError));
    }
  }
  async function runSync(createNew) {
    if (!dotenvPath.trim()) {
      setError("Select a .env file before syncing.");
      return;
    }
    if (!manager) {
      setError("Dotenv Sync is not ready yet.");
      return;
    }
    setSyncing(true);
    setError(null);
    setStatus(null);
    try {
      const nextLink = await manager.syncCollection(collectionId, dotenvPath, {
        createNew,
        environmentName: createNew ? environmentName : void 0,
        force: !createNew
      });
      setLink(nextLink);
      setKeepInSync(nextLink.keepInSync);
      setShowNamePrompt(false);
      setStatus(
        createNew ? `Created environment "${nextLink.environmentName}".` : `Synced ${nextLink.environmentName}.`
      );
      hc.ui.showToast(
        createNew ? "Environment created from .env" : "Environment synced from .env"
      );
    } catch (syncError) {
      setError(formatSyncError(syncError));
    } finally {
      setSyncing(false);
    }
  }
  function handleSyncNow() {
    if (link) {
      void runSync(false);
      return;
    }
    setEnvironmentName((current) => current || suggestedName);
    setShowNamePrompt(true);
  }
  async function handleCreateSubmit(event) {
    event.preventDefault();
    await runSync(true);
  }
  async function handleKeepInSyncChange(enabled) {
    setKeepInSync(enabled);
    if (!manager || !link) {
      return;
    }
    try {
      await manager.setKeepInSync(collectionId, enabled);
      setStatus(enabled ? "Automatic sync enabled." : "Automatic sync paused.");
    } catch (toggleError) {
      setError(
        toggleError instanceof Error ? toggleError.message : String(toggleError)
      );
      setKeepInSync(!enabled);
    }
  }
  async function handleUnlink() {
    if (!manager) {
      return;
    }
    setError(null);
    setStatus(null);
    try {
      await manager.unlink(collectionId);
      setLink(void 0);
      setShowNamePrompt(false);
      setStatus("Link removed. The environment was kept.");
    } catch (unlinkError) {
      setError(
        unlinkError instanceof Error ? unlinkError.message : String(unlinkError)
      );
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: "max-w-2xl space-y-4", children: [
    /* @__PURE__ */ jsx("p", { className: "text-[14px] text-muted", children: "Link a `.env` file to a HarborClient environment. Changes to the file can be synced automatically while the plugin is enabled." }),
    /* @__PURE__ */ jsxs("label", { className: "block space-y-1", children: [
      /* @__PURE__ */ jsx("span", { className: "text-[14px]", children: "`.env` file" }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            className: "min-w-0 flex-1 rounded border border-control bg-control px-3 py-2 text-[14px]",
            value: dotenvPath,
            readOnly: true,
            "aria-label": ".env file path"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "rounded border border-control px-3 py-2 text-[14px] disabled:opacity-60",
            onClick: () => void handleBrowse(),
            disabled: readOnly,
            children: "Browse"
          }
        )
      ] })
    ] }),
    link ? /* @__PURE__ */ jsxs("div", { className: "space-y-2 rounded border border-control p-3", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-[14px]", children: [
        "Linked environment: ",
        /* @__PURE__ */ jsx("strong", { children: link.environmentName })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-[14px] text-muted", role: "status", children: [
        "Last synced: ",
        formatSyncedAt(link.lastSyncedAt)
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-[14px]", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            checked: keepInSync,
            disabled: readOnly,
            onChange: (event) => void handleKeepInSyncChange(event.target.checked)
          }
        ),
        "Keep in sync"
      ] })
    ] }) : null,
    showNamePrompt ? /* @__PURE__ */ jsxs(
      "form",
      {
        className: "space-y-3 rounded border border-control p-3",
        onSubmit: (event) => void handleCreateSubmit(event),
        children: [
          /* @__PURE__ */ jsxs("label", { className: "block space-y-1", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[14px]", children: "Environment name" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                className: "w-full rounded border border-control bg-control px-3 py-2 text-[14px]",
                value: environmentName,
                onChange: (event) => setEnvironmentName(event.target.value),
                required: true,
                "aria-required": "true"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                className: "rounded bg-accent px-4 py-2 text-[14px] text-on-accent disabled:opacity-60",
                disabled: syncing || readOnly,
                children: syncing ? "Creating\u2026" : "Create environment"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "rounded border border-control px-4 py-2 text-[14px]",
                onClick: () => setShowNamePrompt(false),
                disabled: syncing,
                children: "Cancel"
              }
            )
          ] })
        ]
      }
    ) : null,
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "rounded bg-accent px-4 py-2 text-[14px] text-on-accent disabled:opacity-60",
          onClick: handleSyncNow,
          disabled: readOnly || syncing || !dotenvPath,
          children: syncing ? "Syncing\u2026" : link ? "Sync now" : "Sync now"
        }
      ),
      link ? /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "rounded border border-control px-4 py-2 text-[14px] disabled:opacity-60",
          onClick: () => void handleUnlink(),
          disabled: readOnly || syncing,
          children: "Unlink"
        }
      ) : null
    ] }),
    status ? /* @__PURE__ */ jsx("p", { className: "text-[14px] text-muted", role: "status", "aria-live": "polite", children: status }) : null,
    error ? /* @__PURE__ */ jsx("p", { className: "text-[14px] text-danger", role: "alert", children: error }) : null
  ] });
}

// src/components/SettingsPanel.tsx
function SettingsPanel({ hc }) {
  const manager = getLinkSyncManager();
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
      const nextSettings = {
        ...settings,
        pollIntervalMs: Math.max(settings.pollIntervalMs, 1e3)
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
  return /* @__PURE__ */ jsxs(
    "form",
    {
      className: "max-w-xl space-y-4",
      onSubmit: (event) => void handleSubmit(event),
      children: [
        /* @__PURE__ */ jsx("p", { className: "text-[14px] text-muted", children: "Configure how `.env` keys are mapped into HarborClient environments." }),
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
        /* @__PURE__ */ jsxs("label", { className: "block space-y-1", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[14px]", children: "Poll interval (ms)" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              className: "w-full rounded border border-control bg-control px-3 py-2 text-[14px]",
              type: "number",
              min: 1e3,
              step: 500,
              value: settings.pollIntervalMs,
              onChange: (event) => setSettings((current) => ({
                ...current,
                pollIntervalMs: Number(event.target.value) || DEFAULT_SETTINGS.pollIntervalMs
              }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-[14px]", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: settings.keepInSyncDefault,
              onChange: (event) => setSettings((current) => ({
                ...current,
                keepInSyncDefault: event.target.checked
              }))
            }
          ),
          "Keep new links in sync automatically"
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
      ]
    }
  );
}

// src/renderer.tsx
function activate(hc) {
  installReact(hc.react);
  const linkSync = new LinkSyncManager(hc);
  setLinkSyncManager(linkSync);
  function SettingsPanelHost() {
    return /* @__PURE__ */ jsx(SettingsPanel, { hc });
  }
  function CollectionDotenvTabHost({
    context
  }) {
    return /* @__PURE__ */ jsx(CollectionDotenvTab, { hc, context });
  }
  hc.subscriptions.push(
    hc.ui.registerSettingsSection({
      id: "defaults",
      title: "Dotenv Sync",
      Component: SettingsPanelHost
    }),
    hc.ui.registerCollectionSettingsTab({
      id: "dotenv",
      title: "Dotenv",
      order: 50,
      Component: CollectionDotenvTabHost
    }),
    {
      dispose: () => {
        linkSync.dispose();
        setLinkSyncManager(null);
      }
    }
  );
  void linkSync.start();
}
function deactivate() {
  setLinkSyncManager(null);
}
export {
  activate,
  deactivate
};
