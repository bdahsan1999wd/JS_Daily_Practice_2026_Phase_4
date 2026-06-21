# 🎓 JS DAILY PRACTICE – DAY-172

📅 **Goal:** User Activity Tracker (ES6+ Modern JavaScript)
🎯 **Focus:** Arrow Functions • Template Literals • Optional Chaining (?.) • Nullish Coalescing (??) • Rest & Spread

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 🕐 Activity Logger

⚠️ **Function Name:** `logActivities()`

| Input      | `userId` (string), `sessionInfo` (object), `...actions` (rest parameter) |
| :--------- | :----------------------------------------------------------------------- |
| **Output** | object                                                                   |

**Rules:**

`userId` must be non-empty string

`sessionInfo` object (fields may be missing — use `?.` and `??`):

- `sessionInfo?.device` (string) — fallback: `"unknown"`
- `sessionInfo?.location` (string) — fallback: `"unknown"`
- `sessionInfo?.sessionId` (string) — fallback: `"NO-SESSION"`

`...actions` — rest parameter, each action is a string describing what the user did
Must have at least 1 action

**Log Rules:**

- Use **rest parameter** to collect actions
- Use `?.` and `??` for sessionInfo fields
- Build `activityLog` array using **arrow function** with `.map()` and **template literals**:
  - Each log entry: `` `[${sessionId}] ${userId} → ${action}` ``
- Compute:
  - `totalActions = actions.length`
  - `sessionSummary` using template literal:
    - `` `User ${userId} performed ${totalActions} action(s) from ${device} in ${location}.` ``

| Challenge 📢 | Return `{ userId, device, location, sessionId, totalActions, activityLog, sessionSummary }`. If invalid → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `logActivities(
  "U-301",
  { device: "Mobile", location: "Dhaka", sessionId: "SES-881" },
  "Logged in",
  "Viewed dashboard",
  "Updated profile"
)` ➔

  `{
  userId: "U-301",
  device: "Mobile",
  location: "Dhaka",
  sessionId: "SES-881",
  totalActions: 3,
  activityLog: [
    "[SES-881] U-301 → Logged in",
    "[SES-881] U-301 → Viewed dashboard",
    "[SES-881] U-301 → Updated profile"
  ],
  sessionSummary: "User U-301 performed 3 action(s) from Mobile in Dhaka."
}`

---

## 🧩 PROBLEM–02: 📈 Streak Calculator

⚠️ **Function Name:** `calculateStreak()`

| Input      | `activityRecords` (array of objects) |
| :--------- | :----------------------------------- |
| **Output** | object                               |

**Rules:**

Each activity record (fields may be missing — use `?.` and `??`):

- `day` (number, 1–365) — fallback: skip this record if missing
- `meta?.completed` (boolean) — fallback: `false`

`activityRecords` must be non-empty array, sorted by `day` ascending

**Streak Rules:**

- Use **arrow function** throughout
- Filter only records where `meta?.completed ?? false === true`
- A **streak** = consecutive days without a gap > 1
- Find:
  - `currentStreak` → length of the streak ending at the last completed day
  - `longestStreak` → maximum streak length found
  - `totalCompleted` → total count of completed days
  - `streakStatus` using template literal:
    - `` `Current streak: ${currentStreak} day(s). Best: ${longestStreak} day(s).` ``

| Challenge 📢 | Return `{ totalCompleted, currentStreak, longestStreak, streakStatus }`. If no completed records → return `{ totalCompleted: 0, currentStreak: 0, longestStreak: 0, streakStatus: "No activity recorded." }`. If invalid → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `calculateStreak([
  { day: 1, meta: { completed: true } },
  { day: 2, meta: { completed: true } },
  { day: 3, meta: { completed: false } },
  { day: 4, meta: { completed: true } },
  { day: 5, meta: { completed: true } },
  { day: 6, meta: { completed: true } }
])` ➔

  `{
  totalCompleted: 5,
  currentStreak: 3,
  longestStreak: 3,
  streakStatus: "Current streak: 3 day(s). Best: 3 day(s)."
}`

---

## 🧩 PROBLEM–03: 🗂️ Session Merger

⚠️ **Function Name:** `mergeSessions()`

| Input      | `baseSession` (object), `...additionalSessions` (rest parameter) |
| :--------- | :--------------------------------------------------------------- |
| **Output** | object                                                           |

**Rules:**

`baseSession` must contain:

- `userId` (string, non-empty)
- `startedAt` (string, non-empty)
- `actions` (array of strings)
- `pagesVisited` (array of strings)

`...additionalSessions` — rest parameter, each session object may contain:

- `actions` (array of strings) — merge into combined list
- `pagesVisited` (array of strings) — merge, keep unique pages only
- Any other fields — override using spread

Must receive at least 1 additional session

**Merge Rules:**

- Use **rest parameter** and **spread**
- Do NOT mutate `baseSession`
- Merge all `actions` arrays: `[...base.actions, ...session1.actions, ...]`
- Merge all `pagesVisited` but keep **unique** values only (no duplicates)
- Use **arrow function** for deduplication
- Compute:
  - `totalActions = merged actions count`
  - `uniquePages = unique pagesVisited count`
  - `mergedSessions = additionalSessions.length + 1` (including base)
  - `mergeSummary` using template literal:
    - `` `${mergedSessions} session(s) merged. ${totalActions} total action(s). ${uniquePages} unique page(s) visited.` ``

| Challenge 📢 | Return `{ userId, startedAt, actions, pagesVisited, totalActions, uniquePages, mergedSessions, mergeSummary }`. If invalid → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `mergeSessions(
  { userId: "U-401", startedAt: "2025-01-01", actions: ["login", "view-home"], pagesVisited: ["/home", "/profile"] },
  { actions: ["view-products", "add-to-cart"], pagesVisited: ["/products", "/home"] },
  { actions: ["checkout"], pagesVisited: ["/checkout", "/profile"] }
)` ➔

  `{
  userId: "U-401",
  startedAt: "2025-01-01",
  actions: ["login", "view-home", "view-products", "add-to-cart", "checkout"],
  pagesVisited: ["/home", "/profile", "/products", "/checkout"],
  totalActions: 5,
  uniquePages: 4,
  mergedSessions: 3,
  mergeSummary: "3 session(s) merged. 5 total action(s). 4 unique page(s) visited."
}`

---

## 🧩 PROBLEM–04: 🔎 Behavior Pattern Detector

⚠️ **Function Name:** `detectBehaviorPatterns()`

| Input      | `sessions` (array of objects) |
| :--------- | :---------------------------- |
| **Output** | object                        |

**Rules:**

Each session object (fields may be missing — use `?.` and `??`):

- `sessionId` (string) — fallback: `"unknown"`
- `meta?.duration` (number, minutes) — fallback: `0`
- `meta?.actionsCount` (number) — fallback: `0`
- `meta?.bounced` (boolean) — fallback: `false`

`sessions` must be non-empty array

**Pattern Detection Rules:**

- Use **arrow functions** throughout
- Compute:
  - `totalSessions` → count
  - `avgDuration` → mean of all durations (rounded to 2 decimal places)
  - `avgActionsPerSession` → mean of actionsCount (rounded to 2 decimal places)
  - `bounceRate` → percentage of sessions where `bounced === true` (rounded to 2 decimal places)
  - `mostActiveSessions` → sessions where `actionsCount > avgActionsPerSession` (return full session objects)
  - `engagementLevel` based on `avgActionsPerSession`:
    - ≥ 10 → `"HIGH"`
    - 5 – 9.99 → `"MEDIUM"`
    - < 5 → `"LOW"`
  - `patternSummary` using template literal:
    - `` `${totalSessions} session(s) analyzed. Engagement: ${engagementLevel}. Bounce rate: ${bounceRate}%.` ``

| Challenge 📢 | Return `{ totalSessions, avgDuration, avgActionsPerSession, bounceRate, mostActiveSessions, engagementLevel, patternSummary }`. If invalid → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `detectBehaviorPatterns([
  { sessionId: "S1", meta: { duration: 10, actionsCount: 12, bounced: false } },
  { sessionId: "S2", meta: { duration: 3, actionsCount: 2, bounced: true } },
  { sessionId: "S3", meta: { duration: 7, actionsCount: 8, bounced: false } }
])` ➔

  `{
  totalSessions: 3,
  avgDuration: 6.67,
  avgActionsPerSession: 7.33,
  bounceRate: 33.33,
  mostActiveSessions: [
    { sessionId: "S1", meta: { duration: 10, actionsCount: 12, bounced: false } },
    { sessionId: "S3", meta: { duration: 7, actionsCount: 8, bounced: false } }
  ],
  engagementLevel: "MEDIUM",
  patternSummary: "3 session(s) analyzed. Engagement: MEDIUM. Bounce rate: 33.33%."
}`

---

## 🧩 PROBLEM–05: 🏅 Activity Leaderboard Builder

⚠️ **Function Name:** `buildActivityLeaderboard()`

| Input      | `...userActivitySets` (rest parameter — multiple arrays of user activity objects) |
| :--------- | :-------------------------------------------------------------------------------- |
| **Output** | array of objects                                                                  |

**Rules:**

- Use **rest parameter** to accept multiple activity set arrays
- Must receive at least 1 non-empty set
- Each user activity object (fields may be missing — use `?.` and `??`):
  - `userId` (string) — fallback: `"unknown"`
  - `username` (string) — fallback: `"Anonymous"`
  - `stats?.totalActions` (number) — fallback: `0`
  - `stats?.streakDays` (number) — fallback: `0`
  - `stats?.completionRate` (number, 0–100) — fallback: `0`

**Leaderboard Rules:**

- Use **spread** to flatten all sets into one array
- Use **arrow functions** throughout
- Compute `activityScore` for each user:
  - `activityScore = (totalActions × 2) + (streakDays × 5) + completionRate`
- Rank by `activityScore` descending
- If tie → higher `streakDays` wins
- If still tie → same rank
- Assign `medal`:
  - rank 1 → `"🥇"`
  - rank 2 → `"🥈"`
  - rank 3 → `"🥉"`
  - rank 4+ → `"—"`
- Build `leaderboardEntry` using template literal:
  - `` `${medal} #${rank} ${username} — Score: ${activityScore}` ``

| Challenge 📢 | Return array with `{ rank, medal, userId, username, activityScore, leaderboardEntry }` sorted by rank. If invalid → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `buildActivityLeaderboard(
  [
    { userId: "U1", username: "Rafi", stats: { totalActions: 20, streakDays: 7, completionRate: 80 } },
    { userId: "U2", username: "Mila", stats: { totalActions: 15, streakDays: 10, completionRate: 90 } }
  ],
  [
    { userId: "U3", username: "Zara", stats: { totalActions: 25, streakDays: 5, completionRate: 70 } }
  ]
)` ➔

  `[
  { rank: 1, medal: "🥇", userId: "U2", username: "Mila", activityScore: 170, leaderboardEntry: "🥇 #1 Mila — Score: 170" },
  { rank: 2, medal: "🥈", userId: "U1", username: "Rafi", activityScore: 155, leaderboardEntry: "🥈 #2 Rafi — Score: 155" },
  { rank: 3, medal: "🥉", userId: "U3", username: "Zara", activityScore: 145, leaderboardEntry: "🥉 #3 Zara — Score: 145" }
]`

---
