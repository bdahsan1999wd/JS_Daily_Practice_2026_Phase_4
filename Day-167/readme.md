# 🎓 JS DAILY PRACTICE – DAY-167

📅 **Goal:** Dynamic Configuration Engine (ES6+ Modern JavaScript)
🎯 **Focus:** Arrow Functions • Template Literals • Optional Chaining (?.) • Nullish Coalescing (??) • Rest & Spread

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: ⚙️ App Config Builder

⚠️ **Function Name:** `buildAppConfig()`

| Input      | `baseConfig` (object), `envConfig` (object), `featureFlags` (object) |
| :--------- | :------------------------------------------------------------------- |
| **Output** | object                                                               |

**Rules:**

`baseConfig` object:

- `appName` (string, non-empty)
- `version` (string, non-empty)
- `maxRetries` (number, 1–10)

`envConfig` object (some fields may be missing — use `?.` and `??`):

- `apiUrl` (string) — fallback: `"http://localhost:3000"`
- `timeout` (number) — fallback: `5000`
- `env` (string: "development", "staging", "production") — fallback: `"development"`

`featureFlags` object (some fields may be missing — use `??`):

- `darkMode` (boolean) — fallback: `false`
- `betaFeatures` (boolean) — fallback: `false`
- `maintenanceMode` (boolean) — fallback: `false`

**Build Rules:**

- Use **spread operator** to merge all three into one config
- Use `??` for all fallback values
- Add computed field: `configId` using template literal:
  - `` `${appName}-${env}-v${version}` ``
- Add computed field: `isProduction = env === "production"`
- Add computed field: `activeFlags` — array of flag names where value is `true`

| Challenge 📢 | Return merged config object with all fields plus `configId`, `isProduction`, `activeFlags`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `buildAppConfig(
  { appName: "ShopBD", version: "2.1.0", maxRetries: 3 },
  { apiUrl: "https://api.shopbd.com", timeout: 8000, env: "production" },
  { darkMode: true, betaFeatures: false, maintenanceMode: false }
)` ➔

  `{
  appName: "ShopBD",
  version: "2.1.0",
  maxRetries: 3,
  apiUrl: "https://api.shopbd.com",
  timeout: 8000,
  env: "production",
  darkMode: true,
  betaFeatures: false,
  maintenanceMode: false,
  configId: "ShopBD-production-v2.1.0",
  isProduction: true,
  activeFlags: ["darkMode"]
}`

---

## 🧩 PROBLEM–02: 🔄 Config Overrider

⚠️ **Function Name:** `overrideConfig()`

| Input      | `currentConfig` (object), `...overrides` (rest parameter — multiple objects) |
| :--------- | :--------------------------------------------------------------------------- |
| **Output** | object                                                                       |

**Rules:**

`currentConfig` must contain:

- `appName` (string, non-empty)
- `env` (string, non-empty)
- `version` (string, non-empty)
- `timeout` (number, > 0)
- `maxRetries` (number, 1–10)

`...overrides` — rest parameter, at least 1 override object must be provided

**Override Rules:**

- Use **rest parameter** to collect overrides
- Use **spread** to apply overrides left to right on top of `currentConfig`
- If any override contains `timeout`, validate it is still > 0 — if not → `"Invalid Input"`
- If any override contains `maxRetries`, validate it is still 1–10 — if not → `"Invalid Input"`
- Recompute `configId` using template literal: `` `${final appName}-${final env}-v${final version}` ``
- Recompute `isProduction = final env === "production"`
- Add field: `overrideCount = overrides.length`
- Add field: `lastModified = "2025-01-01"`

| Challenge 📢 | Return final overridden config with `configId`, `isProduction`, `overrideCount`, `lastModified`. Original must stay unchanged. If invalid → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `overrideConfig(
  { appName: "PayApp", env: "staging", version: "1.0.0", timeout: 5000, maxRetries: 3 },
  { env: "production", timeout: 10000 },
  { version: "1.2.0", maxRetries: 5 }
)` ➔

  `{
  appName: "PayApp",
  env: "production",
  version: "1.2.0",
  timeout: 10000,
  maxRetries: 5,
  configId: "PayApp-production-v1.2.0",
  isProduction: true,
  overrideCount: 2,
  lastModified: "2025-01-01"
}`

---

## 🧩 PROBLEM–03: 🔍 Safe Config Reader

⚠️ **Function Name:** `safeReadConfig()`

| Input      | `config` (object), `keys` (array of strings) |
| :--------- | :------------------------------------------- |
| **Output** | object                                       |

**Rules:**

`config` is a deeply nested object — some paths may not exist
`keys` is an array of dot-notation key paths to read (e.g. `"database.host"`, `"server.port"`)

Each key path can be up to 3 levels deep: `"a"`, `"a.b"`, or `"a.b.c"`

**Read Rules:**

- Use **arrow function** with `.map()` or `.reduce()`
- For each key path, safely read the value using `?.` chaining
- If the value is `undefined` or `null` → use `??` to return fallback: `"NOT_CONFIGURED"`
- Build result as an object where:
  - key = the dot-notation string (e.g. `"database.host"`)
  - value = the resolved value or `"NOT_CONFIGURED"`

| Challenge 📢 | Return object with each requested key and its resolved value. If `config` is not an object or `keys` is not a non-empty array → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `safeReadConfig(
  {
    server: { host: "localhost", port: 8080 },
    database: { host: "db.server.com" },
    cache: null
  },
  ["server.host", "server.port", "database.host", "database.password", "cache.ttl", "queue.url"]
)` ➔

  `{
  "server.host": "localhost",
  "server.port": 8080,
  "database.host": "db.server.com",
  "database.password": "NOT_CONFIGURED",
  "cache.ttl": "NOT_CONFIGURED",
  "queue.url": "NOT_CONFIGURED"
}`

---

## 🧩 PROBLEM–04: 🧩 Config Diff Detector

⚠️ **Function Name:** `detectConfigDiff()`

| Input      | `oldConfig` (object), `newConfig` (object) |
| :--------- | :----------------------------------------- |
| **Output** | object                                     |

**Rules:**

Both `oldConfig` and `newConfig` are flat objects (no nesting) with the same set of keys.

**Diff Rules:**

- Use **arrow function** with `Object.keys()`
- Compare each key between old and new config
- Categorize changes:
  - `unchanged` → array of keys where value is the same
  - `changed` → array of objects `{ key, oldValue, newValue }` where value differs
  - `summary` → template literal string:
    - `` `${changed.length} change(s) detected out of ${totalKeys} config key(s).` ``

| Challenge 📢 | Return `{ unchanged, changed, summary }`. If either input is not a non-null object → `"Invalid Input"` |
| :----------- | :----------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `detectConfigDiff(
  { env: "staging", timeout: 5000, darkMode: false, version: "1.0.0" },
  { env: "production", timeout: 5000, darkMode: true, version: "1.0.0" }
)` ➔

  `{
  unchanged: ["timeout", "version"],
  changed: [
    { key: "env", oldValue: "staging", newValue: "production" },
    { key: "darkMode", oldValue: false, newValue: true }
  ],
  summary: "2 change(s) detected out of 4 config key(s)."
}`

---

## 🧩 PROBLEM–05: 📋 Multi-Environment Config Generator

⚠️ **Function Name:** `generateEnvConfigs()`

| Input      | `baseConfig` (object), `environments` (array of strings), `envOverrides` (object) |
| :--------- | :-------------------------------------------------------------------------------- |
| **Output** | object                                                                            |

**Rules:**

`baseConfig` must contain:

- `appName` (string, non-empty)
- `version` (string, non-empty)
- `timeout` (number, > 0)
- `maxRetries` (number, 1–10)

`environments` — array of strings, each must be: `"development"`, `"staging"`, or `"production"`
Must have at least 1 environment, no duplicates allowed.

`envOverrides` — object where each key is an environment name and value is a partial config object to override for that env. Some environments may have no override — use `??` with `{}` as fallback.

**Generation Rules:**

- Use **arrow function** with `.reduce()` to build result
- For each environment, use **spread** to merge:
  - `{ ...baseConfig, env: environment, ...( envOverrides[environment] ?? {} ) }`
- Add computed field for each env config:
  - `configId`: `` `${appName}-${env}-v${version}` ``
  - `isProduction`: `env === "production"`

| Challenge 📢 | Return object where each key is an environment name and value is the full config for that env. If invalid input or duplicate environments → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `generateEnvConfigs(
  { appName: "RideApp", version: "3.0.0", timeout: 5000, maxRetries: 3 },
  ["development", "production"],
  { production: { timeout: 15000, maxRetries: 5 } }
)` ➔

  `{
  development: {
    appName: "RideApp",
    version: "3.0.0",
    timeout: 5000,
    maxRetries: 3,
    env: "development",
    configId: "RideApp-development-v3.0.0",
    isProduction: false
  },
  production: {
    appName: "RideApp",
    version: "3.0.0",
    timeout: 15000,
    maxRetries: 5,
    env: "production",
    configId: "RideApp-production-v3.0.0",
    isProduction: true
  }
}`

---
