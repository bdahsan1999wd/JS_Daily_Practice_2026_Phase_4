# 🎓 JS DAILY PRACTICE – DAY-166

📅 **Goal:** Notification Message Generator (ES6+ Modern JavaScript)
🎯 **Focus:** Arrow Functions • Template Literals • Optional Chaining (?.) • Nullish Coalescing (??) • Rest & Spread

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 🔔 Dynamic Notification Builder

⚠️ **Function Name:** `buildNotification()`

| Input      | `user` (object), `event` (string), `details` (object) |
| :--------- | :---------------------------------------------------- |
| **Output** | object                                                |

**Rules:**

`user` object (some fields may be missing — use `?.` and `??`):

- `name` (string) — fallback: `"Guest"`
- `email` (string) — fallback: `"no-email@unknown.com"`
- `preferences?.language` (string) — fallback: `"English"`

`event` must be one of: `"LOGIN"`, `"PURCHASE"`, `"ALERT"`, `"REMINDER"` (non-empty string)

`details` object (some fields may be missing):

- `amount` (number) — used if event is `"PURCHASE"`, fallback: `0`
- `message` (string) — used if event is `"ALERT"` or `"REMINDER"`, fallback: `"No message provided"`

**Build Rules:**

- Use **arrow function** syntax inside the function where applicable
- Use **template literals** to build the `notificationText`:
  - `"LOGIN"` → `` `Hello, ${name}! You have successfully logged in.` ``
  - `"PURCHASE"` → `` `Hi ${name}, your purchase of ৳${amount} has been confirmed.` ``
  - `"ALERT"` → `` `⚠️ Alert for ${name}: ${message}` ``
  - `"REMINDER"` → `` `📅 Reminder for ${name}: ${message}` ``
- Use `?.` to safely access `user.preferences?.language`
- Use `??` for all fallback values

| Challenge 📢 | Return `{ recipientName, recipientEmail, language, event, notificationText }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `buildNotification(
  { name: "Sajib", email: "sajib@mail.com", preferences: { language: "Bangla" } },
  "PURCHASE",
  { amount: 4500 }
)` ➔

  `{
  recipientName: "Sajib",
  recipientEmail: "sajib@mail.com",
  language: "Bangla",
  event: "PURCHASE",
  notificationText: "Hi Sajib, your purchase of ৳4500 has been confirmed."
}`

---

## 🧩 PROBLEM–02: 📨 Bulk Notification Dispatcher

⚠️ **Function Name:** `dispatchBulkNotifications()`

| Input      | `users` (array of objects), `eventType` (string), `defaultMessage` (string) |
| :--------- | :-------------------------------------------------------------------------- |
| **Output** | array of objects                                                            |

**Rules:**

Each user object (fields may be missing — use `?.` and `??`):

- `userId` (string) — fallback: `"UNKNOWN"`
- `name` (string) — fallback: `"Guest"`
- `contact?.email` (string) — fallback: `"no-reply@system.com"`
- `contact?.phone` (string) — fallback: `"N/A"`

`eventType` must be non-empty string
`defaultMessage` must be non-empty string

**Dispatch Rules:**

- Use **arrow function** with `.map()` to process each user
- Use **template literals** for message:
  - `` `[${eventType}] Dear ${name}, ${defaultMessage}` ``
- Use `?.` to safely access nested contact fields
- Use `??` for all fallbacks
- Add field: `dispatched = true`

| Challenge 📢 | Return array with `{ userId, name, email, phone, message, dispatched }` for each user. If invalid input → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `dispatchBulkNotifications([
  { userId: "U1", name: "Mita", contact: { email: "mita@mail.com", phone: "01711111111" } },
  { userId: "U2", contact: { email: "unknown@mail.com" } }
], "PROMO", "Get 20% off on your next order!")` ➔

  `[
  { userId: "U1", name: "Mita", email: "mita@mail.com", phone: "01711111111", message: "[PROMO] Dear Mita, Get 20% off on your next order!", dispatched: true },
  { userId: "U2", name: "Guest", email: "unknown@mail.com", phone: "N/A", message: "[PROMO] Dear Guest, Get 20% off on your next order!", dispatched: true }
]`

---

## 🧩 PROBLEM–03: 🎛️ Notification Preference Merger

⚠️ **Function Name:** `mergeNotificationPreferences()`

| Input      | `defaultPrefs` (object), `...userPrefsList` (rest parameter — multiple objects) |
| :--------- | :------------------------------------------------------------------------------ |
| **Output** | object                                                                          |

**Rules:**

`defaultPrefs` object:

- `language` (string, non-empty)
- `theme` (string: "light" or "dark")
- `emailEnabled` (boolean)
- `smsEnabled` (boolean)
- `pushEnabled` (boolean)

`...userPrefsList` — rest parameter, accepts 1 or more preference objects

- Each may partially override `defaultPrefs` fields
- Must receive at least 1 user preference object

**Merge Rules:**

- Use **rest parameter** to collect all user preference objects
- Use **spread operator** to merge: `defaultPrefs` first, then each userPref left to right (later ones override earlier)
- Final merged object = `{ ...defaultPrefs, ...userPref1, ...userPref2, ... }`
- Add computed field: `activeChannels` — array of enabled channel names:
  - Include `"EMAIL"` if final `emailEnabled === true`
  - Include `"SMS"` if final `smsEnabled === true`
  - Include `"PUSH"` if final `pushEnabled === true`
- Add field: `totalChannels = activeChannels.length`

| Challenge 📢 | Return final merged preferences object with all fields plus `activeChannels`, `totalChannels`. If invalid input → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `mergeNotificationPreferences(
  { language: "English", theme: "light", emailEnabled: true, smsEnabled: false, pushEnabled: true },
  { theme: "dark", smsEnabled: true },
  { language: "Bangla", pushEnabled: false }
)` ➔

  `{
  language: "Bangla",
  theme: "dark",
  emailEnabled: true,
  smsEnabled: true,
  pushEnabled: false,
  activeChannels: ["EMAIL", "SMS"],
  totalChannels: 2
}`

---

## 🧩 PROBLEM–04: 🔕 Notification Filter & Formatter

⚠️ **Function Name:** `filterAndFormatNotifications()`

| Input      | `notifications` (array of objects), `filters` (object) |
| :--------- | :----------------------------------------------------- |
| **Output** | array of objects                                       |

**Rules:**

Each notification object (fields may be missing — use `?.` and `??`):

- `id` (string)
- `type` (string: "INFO", "WARNING", "ERROR", "SUCCESS")
- `recipient?.name` (string) — fallback: `"Unknown"`
- `recipient?.email` (string) — fallback: `"N/A"`
- `meta?.priority` (number 1–5) — fallback: `3`
- `message` (string) — fallback: `"No message"`

`filters` object:

- `type` (string or null) — if provided, filter by this type
- `minPriority` (number or null) — if provided, keep only notifications where priority ≥ minPriority

**Format Rules:**

- Use **arrow function** with `.filter()` and `.map()`
- Use `?.` and `??` for safe access and fallbacks
- After filtering, format each notification using **template literals**:
  - `formattedMessage`: `` `[${type}] (Priority: ${priority}) → ${message}` ``
- Sort result by `priority` descending

| Challenge 📢 | Return array with `{ id, type, recipientName, recipientEmail, priority, formattedMessage }`. If invalid input → `"Invalid Input"`. If no results after filter → return `[]` |
| :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `filterAndFormatNotifications([
  { id: "N1", type: "ERROR", recipient: { name: "Rony", email: "rony@mail.com" }, meta: { priority: 5 }, message: "Server down!" },
  { id: "N2", type: "INFO", recipient: { name: "Mila" }, meta: { priority: 2 }, message: "Update available." },
  { id: "N3", type: "ERROR", message: "Disk full!" }
], { type: "ERROR", minPriority: 3 })` ➔

  `[
  { id: "N1", type: "ERROR", recipientName: "Rony", recipientEmail: "rony@mail.com", priority: 5, formattedMessage: "[ERROR] (Priority: 5) → Server down!" },
  { id: "N3", type: "ERROR", recipientName: "Unknown", recipientEmail: "N/A", priority: 3, formattedMessage: "[ERROR] (Priority: 3) → Disk full!" }
]`

---

## 🧩 PROBLEM–05: 📊 Notification Summary Reporter

⚠️ **Function Name:** `generateNotificationSummary()`

| Input      | `...notificationBatches` (rest parameter — multiple arrays) |
| :--------- | :---------------------------------------------------------- |
| **Output** | object                                                      |

**Rules:**

- Use **rest parameter** to accept multiple notification batch arrays
- Must receive at least 1 batch
- Each batch is an array of notification objects
- Each notification object has:
  - `type` (string: "INFO", "WARNING", "ERROR", "SUCCESS")
  - `dispatched` (boolean)
  - `meta?.priority` (number 1–5) — fallback: `3`

**Summary Rules:**

- Use **spread** to flatten all batches: `const allNotifications = [...batch1, ...batch2, ...]`
- Use **arrow functions** throughout
- Compute:
  - `totalNotifications` → total count across all batches
  - `totalDispatched` → count where `dispatched === true`
  - `totalFailed` → count where `dispatched === false`
  - `typeBreakdown` → object: count per type `{ INFO, WARNING, ERROR, SUCCESS }`
  - `highPriorityCount` → count where `meta?.priority ?? 3` is ≥ 4
  - `dispatchRate` → `(totalDispatched / totalNotifications × 100)` rounded to 2 decimal places

| Challenge 📢 | Return `{ totalNotifications, totalDispatched, totalFailed, typeBreakdown, highPriorityCount, dispatchRate }`. If no batches or all batches empty → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `generateNotificationSummary(
  [
    { type: "INFO", dispatched: true, meta: { priority: 2 } },
    { type: "ERROR", dispatched: false, meta: { priority: 5 } }
  ],
  [
    { type: "SUCCESS", dispatched: true, meta: { priority: 4 } },
    { type: "WARNING", dispatched: true }
  ]
)` ➔

  `{
  totalNotifications: 4,
  totalDispatched: 3,
  totalFailed: 1,
  typeBreakdown: { INFO: 1, WARNING: 1, ERROR: 1, SUCCESS: 1 },
  highPriorityCount: 2,
  dispatchRate: 75.00
}`

---
