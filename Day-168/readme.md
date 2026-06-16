# 🎓 JS DAILY PRACTICE – DAY-168

📅 **Goal:** Theme & Settings Manager (ES6+ Modern JavaScript)
🎯 **Focus:** Arrow Functions • Template Literals • Optional Chaining (?.) • Nullish Coalescing (??) • Rest & Spread

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 🎨 Theme Profile Builder

⚠️ **Function Name:** `buildThemeProfile()`

| Input      | `userInfo` (object), `themeSettings` (object) |
| :--------- | :-------------------------------------------- |
| **Output** | object                                        |

**Rules:**

`userInfo` object (some fields may be missing — use `?.` and `??`):

- `userId` (string) — fallback: `"GUEST"`
- `username` (string) — fallback: `"Anonymous"`
- `preferences?.colorScheme` (string) — fallback: `"default"`
- `preferences?.fontSize` (number) — fallback: `14`

`themeSettings` object:

- `mode` (string: `"light"` or `"dark"`)
- `primaryColor` (string, non-empty)
- `borderRadius` (number, 0–20)
- `animationsEnabled` (boolean)

**Build Rules:**

- Use **spread operator** to merge both objects
- Use `?.` and `??` for safe access and fallbacks
- Add computed field: `themeId` using template literal:
  - `` `${userId}-${mode}-theme` ``
- Add computed field: `accessibilityMode`:
  - `fontSize >= 18` AND `animationsEnabled === false` → `"HIGH_ACCESSIBILITY"`
  - `fontSize >= 18` OR `animationsEnabled === false` → `"PARTIAL_ACCESSIBILITY"`
  - otherwise → `"STANDARD"`

| Challenge 📢 | Return merged theme profile with all fields plus `themeId`, `accessibilityMode`. If `themeSettings.mode` is not "light" or "dark", or `borderRadius` is out of range → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `buildThemeProfile(
  { userId: "U-101", username: "Rakib", preferences: { colorScheme: "blue", fontSize: 20 } },
  { mode: "dark", primaryColor: "#1A1A2E", borderRadius: 8, animationsEnabled: false }
)` ➔

  `{
  userId: "U-101",
  username: "Rakib",
  colorScheme: "blue",
  fontSize: 20,
  mode: "dark",
  primaryColor: "#1A1A2E",
  borderRadius: 8,
  animationsEnabled: false,
  themeId: "U-101-dark-theme",
  accessibilityMode: "HIGH_ACCESSIBILITY"
}`

---

## 🧩 PROBLEM–02: 🔧 Settings Patcher

⚠️ **Function Name:** `patchUserSettings()`

| Input      | `currentSettings` (object), `...patches` (rest parameter) |
| :--------- | :-------------------------------------------------------- |
| **Output** | object                                                    |

**Rules:**

`currentSettings` must contain:

- `userId` (string, non-empty)
- `language` (string, non-empty)
- `timezone` (string, non-empty)
- `currency` (string, non-empty)
- `notificationsEnabled` (boolean)
- `autoSave` (boolean)

`...patches` — rest parameter, at least 1 patch object required
Each patch may partially override any field in `currentSettings`

**Patch Rules:**

- Use **rest parameter** to collect all patches
- Use **spread** to apply patches left to right
- Do NOT mutate `currentSettings`
- Track which fields were actually changed across all patches:
  - `changedFields` → array of unique field names that differ from `currentSettings`
- Add field: `patchCount = patches.length`
- Add computed `settingsSummary` using template literal:
  - `` `User ${userId} settings updated. ${changedFields.length} field(s) changed.` ``

| Challenge 📢 | Return final patched settings with `changedFields`, `patchCount`, `settingsSummary`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `patchUserSettings(
  { userId: "U-202", language: "English", timezone: "Asia/Dhaka", currency: "BDT", notificationsEnabled: true, autoSave: false },
  { language: "Bangla", autoSave: true },
  { currency: "USD", timezone: "Asia/Dhaka" }
)` ➔

  `{
  userId: "U-202",
  language: "Bangla",
  timezone: "Asia/Dhaka",
  currency: "USD",
  notificationsEnabled: true,
  autoSave: true,
  changedFields: ["language", "autoSave", "currency"],
  patchCount: 2,
  settingsSummary: "User U-202 settings updated. 3 field(s) changed."
}`

---

## 🧩 PROBLEM–03: 🌗 Theme Switcher Engine

⚠️ **Function Name:** `switchTheme()`

| Input      | `currentTheme` (object), `targetMode` (string) |
| :--------- | :--------------------------------------------- |
| **Output** | object                                         |

**Rules:**

`currentTheme` must contain:

- `themeId` (string, non-empty)
- `mode` (string: `"light"` or `"dark"`)
- `primaryColor` (string, non-empty)
- `backgroundColor` (string, non-empty)
- `textColor` (string, non-empty)
- `switchHistory` (array of strings)

`targetMode` must be `"light"` or `"dark"` and must be different from current `mode`

**Switch Rules:**

- Do NOT mutate `currentTheme` — use deep copy via `JSON.parse(JSON.stringify())`
- Update `mode` to `targetMode`
- Auto-update colors based on `targetMode` using arrow function:
  - `"dark"` → `primaryColor: "#BB86FC"`, `backgroundColor: "#121212"`, `textColor: "#FFFFFF"`
  - `"light"` → `primaryColor: "#6200EE"`, `backgroundColor: "#FFFFFF"`, `textColor: "#000000"`
- Update `themeId` using template literal: `` `${userId}-${targetMode}-theme` `` — extract `userId` from existing `themeId` (it's the part before the first `-`)
- Push to `switchHistory`: `` `Switched from ${oldMode} to ${targetMode}` ``
- Add field: `switchedAt = "2025-01-01"`
- Return `{ previous, current }` to prove original unchanged

| Challenge 📢 | Return `{ previous, current }`. If invalid → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------- |

**Sample Input & Output:**

- `switchTheme(
  {
    themeId: "U101-light-theme",
    mode: "light",
    primaryColor: "#6200EE",
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
    switchHistory: ["Initialized light theme"]
  },
  "dark"
)` ➔

  `{
  previous: {
    themeId: "U101-light-theme",
    mode: "light",
    primaryColor: "#6200EE",
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
    switchHistory: ["Initialized light theme"]
  },
  current: {
    themeId: "U101-dark-theme",
    mode: "dark",
    primaryColor: "#BB86FC",
    backgroundColor: "#121212",
    textColor: "#FFFFFF",
    switchHistory: ["Initialized light theme", "Switched from light to dark"],
    switchedAt: "2025-01-01"
  }
}`

---

## 🧩 PROBLEM–04: 📋 Settings Snapshot Comparator

⚠️ **Function Name:** `compareSettingsSnapshots()`

| Input      | `snapshots` (array of objects) |
| :--------- | :----------------------------- |
| **Output** | object                         |

**Rules:**

Each snapshot object (some fields may be missing — use `?.` and `??`):

- `snapshotId` (string)
- `savedAt` (string)
- `settings?.theme` (string) — fallback: `"default"`
- `settings?.language` (string) — fallback: `"English"`
- `settings?.fontSize` (number) — fallback: `14`
- `settings?.notifications` (boolean) — fallback: `true`

Must receive exactly 2 snapshots — if not → `"Invalid Input"`

**Comparison Rules:**

- Use **arrow functions** and `?.` + `??` throughout
- Compare the two snapshots field by field (theme, language, fontSize, notifications)
- Build:
  - `matchingFields` → array of field names where both snapshots have same value
  - `differingFields` → array of objects `{ field, snapshot1Value, snapshot2Value }`
  - `isSameSettings` → `true` if all 4 fields match
  - `comparisonSummary` using template literal:
    - `` `Snapshot ${snap1.snapshotId} vs ${snap2.snapshotId}: ${differingFields.length} difference(s) found.` ``

| Challenge 📢 | Return `{ matchingFields, differingFields, isSameSettings, comparisonSummary }`. If invalid → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `compareSettingsSnapshots([
  { snapshotId: "S1", savedAt: "2025-01-01", settings: { theme: "dark", language: "English", fontSize: 16, notifications: true } },
  { snapshotId: "S2", savedAt: "2025-01-15", settings: { theme: "dark", language: "Bangla", notifications: false } }
])` ➔

  `{
  matchingFields: ["theme"],
  differingFields: [
    { field: "language", snapshot1Value: "English", snapshot2Value: "Bangla" },
    { field: "fontSize", snapshot1Value: 16, snapshot2Value: 14 },
    { field: "notifications", snapshot1Value: true, snapshot2Value: false }
  ],
  isSameSettings: false,
  comparisonSummary: "Snapshot S1 vs S2: 3 difference(s) found."
}`

---

## 🧩 PROBLEM–05: 🏷️ Bulk Theme Label Generator

⚠️ **Function Name:** `generateThemeLabels()`

| Input      | `themes` (array of objects), `labelFormat` (string) |
| :--------- | :-------------------------------------------------- |
| **Output** | array of objects                                    |

**Rules:**

Each theme object (some fields may be missing — use `?.` and `??`):

- `themeId` (string) — fallback: `"unknown-id"`
- `mode` (string) — fallback: `"light"`
- `meta?.createdBy` (string) — fallback: `"system"`
- `meta?.version` (string) — fallback: `"1.0"`

`labelFormat` must be one of:

- `"SHORT"` → label: `` `[${mode}] ${themeId}` ``
- `"FULL"` → label: `` `Theme: ${themeId} | Mode: ${mode} | By: ${createdBy} | v${version}` ``
- `"BADGE"` → label: `` `🎨 ${mode.toUpperCase()} — ${themeId}` ``

**Generation Rules:**

- Use **arrow function** with `.map()`
- Use `?.` and `??` for all fallbacks
- Apply the correct template literal based on `labelFormat`
- Add field: `labelFormat` (the format used) to each output object

| Challenge 📢 | Return array with `{ themeId, mode, label, labelFormat }` for each theme. If `labelFormat` is invalid or `themes` is not a non-empty array → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `generateThemeLabels([
  { themeId: "U1-dark-theme", mode: "dark", meta: { createdBy: "Rafiq", version: "2.0" } },
  { themeId: "U2-light-theme", meta: { version: "1.5" } }
], "FULL")` ➔

  `[
  { themeId: "U1-dark-theme", mode: "dark", label: "Theme: U1-dark-theme | Mode: dark | By: Rafiq | v2.0", labelFormat: "FULL" },
  { themeId: "U2-light-theme", mode: "light", label: "Theme: U2-light-theme | Mode: light | By: system | v1.5", labelFormat: "FULL" }
]`

---
