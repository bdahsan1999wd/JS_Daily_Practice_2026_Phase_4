# 🎓 JS DAILY PRACTICE – DAY-176

📅 **Goal:** Session Manager (Auth & Security Simulation)
🎯 **Focus:** Session Lifecycle • Concurrent Session Limits • Idle Timeout • Device Tracking

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 🆕 Session Creator

⚠️ **Function Name:** `createSession()`

| Input      | `userId` (string), `deviceInfo` (object), `activeSessions` (array of objects) |
| :--------- | :---------------------------------------------------------------------------- |
| **Output** | object                                                                        |

**Rules:**

`userId` must be non-empty string

`deviceInfo` object:

- `deviceType` (string: "MOBILE", "DESKTOP", "TABLET")
- `ipAddress` (string, non-empty)

`activeSessions` — array of existing session objects for ALL users:

- `userId` (string)
- `sessionId` (string)
- `deviceType` (string)

**Creation Rules:**

- Maximum concurrent sessions per user = 3
- Count how many sessions in `activeSessions` already belong to `userId`
- If count is already ≥ 3 → return failure: `"Session limit reached. Maximum 3 concurrent sessions allowed."`
- Otherwise, create new session:
  - `sessionId` = `` `SES-${userId}-${activeSessions.length + 1}` ``
  - `createdSuccessfully = true`
  - `currentSessionCount` = count of this user's sessions BEFORE adding new one, + 1 (i.e., after creation)

| Challenge 📢 | If limit reached: return `{ createdSuccessfully: false, message }`. If created: return `{ createdSuccessfully: true, sessionId, currentSessionCount }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `createSession(
  "U-501",
  { deviceType: "MOBILE", ipAddress: "10.0.0.5" },
  [
    { userId: "U-501", sessionId: "SES-A", deviceType: "DESKTOP" },
    { userId: "U-501", sessionId: "SES-B", deviceType: "TABLET" },
    { userId: "U-900", sessionId: "SES-C", deviceType: "MOBILE" }
  ]
)` ➔

  `{
  createdSuccessfully: true,
  sessionId: "SES-U-501-4",
  currentSessionCount: 3
}`

---

## 🧩 PROBLEM–02: ⏰ Idle Timeout Checker

⚠️ **Function Name:** `checkIdleTimeout()`

| Input      | `sessions` (array of objects), `currentTimeMinutes` (number), `idleLimitMinutes` (number) |
| :--------- | :---------------------------------------------------------------------------------------- |
| **Output** | object                                                                                    |

**Rules:**

Each session object:

- `sessionId` (string)
- `lastActivityMinutes` (number, ≥ 0) — the time (in minutes) of last activity

`currentTimeMinutes` must be a number ≥ 0
`idleLimitMinutes` must be a number > 0

**Timeout Rules:**

- For each session: `idleDuration = currentTimeMinutes - lastActivityMinutes`
- A session is "expired" if `idleDuration >= idleLimitMinutes`
- `expiredSessions` → array of `sessionId` values that are expired
- `activeSessions` → array of `sessionId` values still active
- `expiryRate` → percentage of sessions expired (rounded to 2 decimal places)

| Challenge 📢 | Return `{ expiredSessions, activeSessions, expiryRate }`. If `sessions` is not a non-empty array → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `checkIdleTimeout([
  { sessionId: "S1", lastActivityMinutes: 100 },
  { sessionId: "S2", lastActivityMinutes: 150 },
  { sessionId: "S3", lastActivityMinutes: 170 }
], 180, 30)` ➔

  `{
  expiredSessions: ["S1", "S2"],
  activeSessions: ["S3"],
  expiryRate: 66.67
}`

---

## 🧩 PROBLEM–03: 📱 Device Trust Evaluator

⚠️ **Function Name:** `evaluateDeviceTrust()`

| Input      | `knownDevices` (array of objects), `currentDevice` (object) |
| :--------- | :---------------------------------------------------------- |
| **Output** | object                                                      |

**Rules:**

Each `knownDevices` entry:

- `deviceId` (string)
- `loginCount` (number, ≥ 0)
- `lastUsedDay` (number, ≥ 0)

`currentDevice` object:

- `deviceId` (string, non-empty)
- `currentDay` (number, ≥ 0)

**Trust Evaluation Rules:**

- Find the matching device in `knownDevices` by `deviceId`
- If NOT found → `trustLevel = "UNKNOWN"`, `requiresVerification = true`, `reason = "New device not recognized"`
- If found, compute `daysSinceLastUse = currentDevice.currentDay - matchedDevice.lastUsedDay`:
  - `loginCount >= 10` AND `daysSinceLastUse <= 30` → `trustLevel = "TRUSTED"`, `requiresVerification = false`, `reason = "Frequently used, recently active device"`
  - `loginCount >= 10` AND `daysSinceLastUse > 30` → `trustLevel = "STALE"`, `requiresVerification = true`, `reason = "Trusted device but not used recently"`
  - `loginCount < 10` → `trustLevel = "NEW"`, `requiresVerification = true`, `reason = "Device not used enough to establish trust"`

| Challenge 📢 | Return `{ trustLevel, requiresVerification, reason }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `evaluateDeviceTrust([
  { deviceId: "DEV-A1", loginCount: 15, lastUsedDay: 50 },
  { deviceId: "DEV-B2", loginCount: 3, lastUsedDay: 95 }
], { deviceId: "DEV-A1", currentDay: 100 })` ➔

  `{
  trustLevel: "STALE",
  requiresVerification: true,
  reason: "Trusted device but not used recently"
}`

---

## 🧩 PROBLEM–04: 🚪 Session Termination Handler

⚠️ **Function Name:** `terminateSessions()`

| Input      | `allSessions` (array of objects), `terminationCriteria` (object) |
| :--------- | :--------------------------------------------------------------- |
| **Output** | object                                                           |

**Rules:**

Each session object:

- `sessionId` (string)
- `userId` (string)
- `deviceType` (string)
- `isSuspicious` (boolean)

`terminationCriteria` object — specifies WHICH sessions to terminate (may contain any combination):

- `userId` (string or null) — if provided, target only this user's sessions
- `deviceType` (string or null) — if provided, target only this device type
- `onlySuspicious` (boolean) — if true, target only sessions where `isSuspicious === true`

At least ONE criteria field must be non-null/true, otherwise → `"Invalid Input"`

**Termination Rules:**

- A session is terminated if it matches ALL provided (non-null) criteria
- `terminatedSessions` → array of `sessionId` values terminated
- `remainingSessions` → array of `sessionId` values NOT terminated
- `terminationSummary` → `` `${terminatedCount} of ${totalCount} session(s) terminated.` ``

| Challenge 📢 | Return `{ terminatedSessions, remainingSessions, terminationSummary }`. If invalid input → `"Invalid Input"` |
| :----------- | :----------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `terminateSessions([
  { sessionId: "S1", userId: "U1", deviceType: "MOBILE", isSuspicious: true },
  { sessionId: "S2", userId: "U1", deviceType: "DESKTOP", isSuspicious: false },
  { sessionId: "S3", userId: "U2", deviceType: "MOBILE", isSuspicious: true }
], { userId: "U1", deviceType: null, onlySuspicious: true })` ➔

  `{
  terminatedSessions: ["S1"],
  remainingSessions: ["S2", "S3"],
  terminationSummary: "1 of 3 session(s) terminated."
}`

---

## 🧩 PROBLEM–05: 📈 Session Analytics Dashboard

⚠️ **Function Name:** `generateSessionAnalytics()`

| Input      | `sessionLogs` (array of objects) |
| :--------- | :------------------------------- |
| **Output** | object                           |

**Rules:**

Each session log object:

- `userId` (string)
- `deviceType` (string: "MOBILE", "DESKTOP", "TABLET")
- `durationMinutes` (number, ≥ 0)
- `isSuspicious` (boolean)

`sessionLogs` must be a non-empty array

**Analytics Rules:**

- `totalSessions` → total count
- `avgDuration` → mean of `durationMinutes` (rounded to 2 decimal places)
- `deviceBreakdown` → object: count per `deviceType`
- `suspiciousCount` → count where `isSuspicious === true`
- `suspiciousRate` → percentage (rounded to 2 decimal places)
- `longestSession` → the session object with the highest `durationMinutes`
- `mostUsedDevice` → the `deviceType` with the highest count in `deviceBreakdown`

| Challenge 📢 | Return `{ totalSessions, avgDuration, deviceBreakdown, suspiciousCount, suspiciousRate, longestSession, mostUsedDevice }`. If invalid input → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `generateSessionAnalytics([
  { userId: "U1", deviceType: "MOBILE", durationMinutes: 45, isSuspicious: false },
  { userId: "U2", deviceType: "MOBILE", durationMinutes: 90, isSuspicious: true },
  { userId: "U3", deviceType: "DESKTOP", durationMinutes: 30, isSuspicious: false }
])` ➔

  `{
  totalSessions: 3,
  avgDuration: 55,
  deviceBreakdown: { MOBILE: 2, DESKTOP: 1, TABLET: 0 },
  suspiciousCount: 1,
  suspiciousRate: 33.33,
  longestSession: {
    userId: 'U2',
    deviceType: 'MOBILE',
    durationMinutes: 90,
    isSuspicious: true
  },
  mostUsedDevice: 'MOBILE'
}`

---
