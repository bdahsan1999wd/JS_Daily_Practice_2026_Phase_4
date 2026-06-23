# 🎓 JS DAILY PRACTICE – DAY-174

📅 **Goal:** Login Authentication System (Auth & Security Simulation)
🎯 **Focus:** Credential Matching • Login Attempt Tracking • Account Lockout Logic • Token Simulation

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 🔑 Login Credential Matcher

⚠️ **Function Name:** `authenticateLogin()`

| Input      | `storedUser` (object), `loginAttempt` (object) |
| :--------- | :--------------------------------------------- |
| **Output** | object                                         |

**Rules:**

`storedUser` object:

- `username` (string, non-empty)
- `passwordHash` (string, non-empty) — simulated hash (just a string)
- `isActive` (boolean)
- `isLocked` (boolean)

`loginAttempt` object:

- `username` (string, non-empty)
- `passwordHash` (string, non-empty)

**Authentication Rules (check in this exact order, stop at first failure):**

1. `username` must match `storedUser.username` exactly (case-sensitive) → else `"User not found"`
2. `storedUser.isLocked` must be `false` → else `"Account is locked"`
3. `storedUser.isActive` must be `true` → else `"Account is deactivated"`
4. `loginAttempt.passwordHash` must match `storedUser.passwordHash` exactly → else `"Incorrect password"`

**Output Rules:**

- `success` → true only if all 4 checks pass
- `message` → `"Login successful"` if success, otherwise the failure reason from above

| Challenge 📢 | Return `{ success, message }`. If either input is not an object → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `authenticateLogin(
  { username: "shawon99", passwordHash: "hash_abc123", isActive: true, isLocked: false },
  { username: "shawon99", passwordHash: "hash_wrong" }
)` ➔

  `{
  success: false,
  message: "Incorrect password"
}`

---

## 🧩 PROBLEM–02: 🚫 Login Attempt Tracker

⚠️ **Function Name:** `trackLoginAttempts()`

| Input      | `attemptHistory` (array of objects), `newAttempt` (object) |
| :--------- | :--------------------------------------------------------- |
| **Output** | object                                                     |

**Rules:**

Each entry in `attemptHistory`:

- `username` (string)
- `success` (boolean)
- `timestamp` (number, representing minutes since epoch — just treat as a simple counter)

`newAttempt` object:

- `username` (string, non-empty)
- `success` (boolean)
- `timestamp` (number)

**Tracking Rules:**

- Find all entries (from `attemptHistory`) matching `newAttempt.username`
- Count **consecutive failed attempts** ending right before this new attempt (i.e., from the most recent entries backward, stop at first success or start of list)
- Add `newAttempt` to the count logic too:
  - If `newAttempt.success === true` → `consecutiveFailures` resets to `0`
  - If `newAttempt.success === false` → `consecutiveFailures` = (consecutive failures before this attempt) + 1

**Lockout Rule:**

- If `consecutiveFailures >= 5` → `shouldLock = true`, `lockMessage = "Account locked due to 5 consecutive failed attempts"`
- Otherwise → `shouldLock = false`, `lockMessage = "Account active"`

| Challenge 📢 | Return `{ consecutiveFailures, shouldLock, lockMessage }`. If invalid input → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `trackLoginAttempts([
  { username: "nila22", success: true, timestamp: 1 },
  { username: "nila22", success: false, timestamp: 2 },
  { username: "nila22", success: false, timestamp: 3 },
  { username: "nila22", success: false, timestamp: 4 }
], { username: "nila22", success: false, timestamp: 5 })` ➔

  `{
  consecutiveFailures: 4,
  shouldLock: false,
  lockMessage: "Account active"
}`

---

## 🧩 PROBLEM–03: 🎫 Session Token Generator

⚠️ **Function Name:** `generateSessionToken()`

| Input      | `userInfo` (object), `sessionDurationMinutes` (number) |
| :--------- | :----------------------------------------------------- |
| **Output** | object                                                 |

**Rules:**

`userInfo` object:

- `userId` (string, non-empty)
- `role` (string: "USER", "ADMIN", "MODERATOR")

`sessionDurationMinutes` must be a number, 5–1440 (1 day max)

**Token Generation Rules:**

- Build `token` using format: `` `TKN-${userId}-${roleCode}-${sessionDurationMinutes}` ``
  - roleCode: "USER" → "U", "ADMIN" → "A", "MODERATOR" → "M"
- Compute `expiresInSeconds = sessionDurationMinutes × 60`
- Compute `permissionLevel` based on `role`:
  - "ADMIN" → 3
  - "MODERATOR" → 2
  - "USER" → 1
- `isLongSession` → true if `sessionDurationMinutes > 60`

| Challenge 📢 | Return `{ token, expiresInSeconds, permissionLevel, isLongSession }`. If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `generateSessionToken({ userId: "U-789", role: "MODERATOR" }, 120)` ➔

  `{
  token: "TKN-U-789-M-120",
  expiresInSeconds: 7200,
  permissionLevel: 2,
  isLongSession: true
}`

---

## 🧩 PROBLEM–04: ⏱️ Token Validity Checker

⚠️ **Function Name:** `checkTokenValidity()`

| Input      | `tokenInfo` (object), `currentTimeSeconds` (number) |
| :--------- | :-------------------------------------------------- |
| **Output** | object                                              |

**Rules:**

`tokenInfo` object:

- `token` (string, non-empty)
- `issuedAtSeconds` (number, ≥ 0)
- `expiresInSeconds` (number, > 0)

`currentTimeSeconds` must be a number ≥ 0

**Validity Rules:**

- `expiryTimeSeconds = issuedAtSeconds + expiresInSeconds`
- `isExpired = currentTimeSeconds >= expiryTimeSeconds`
- `remainingSeconds`:
  - If expired → `0`
  - If not expired → `expiryTimeSeconds - currentTimeSeconds`
- `status`:
  - If expired → `"EXPIRED"`
  - If `remainingSeconds <= 300` (5 minutes) AND not expired → `"EXPIRING_SOON"`
  - Otherwise → `"VALID"`

| Challenge 📢 | Return `{ isExpired, remainingSeconds, status }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `checkTokenValidity(
  { token: "TKN-U-100-U-30", issuedAtSeconds: 1000, expiresInSeconds: 1800 },
  2650
)` ➔

  `{
  isExpired: false,
  remainingSeconds: 150,
  status: "EXPIRING_SOON"
}`

---

## 🧩 PROBLEM–05: 📊 Login Activity Auditor

⚠️ **Function Name:** `auditLoginActivity()`

| Input      | `loginLogs` (array of objects) |
| :--------- | :----------------------------- |
| **Output** | object                         |

**Rules:**

Each log entry:

- `username` (string)
- `success` (boolean)
- `ipAddress` (string)
- `timestamp` (number)

`loginLogs` must be a non-empty array

**Audit Rules:**

- `totalAttempts` → total log count
- `successfulLogins` → count where `success === true`
- `failedLogins` → count where `success === false`
- `successRate` → percentage (rounded to 2 decimal places)
- `uniqueUsers` → count of distinct usernames
- `uniqueIPs` → count of distinct IP addresses
- `suspiciousUsers` → array of usernames who have ≥ 3 failed attempts (count failed attempts per username across the whole log)

| Challenge 📢 | Return `{ totalAttempts, successfulLogins, failedLogins, successRate, uniqueUsers, uniqueIPs, suspiciousUsers }`. If invalid input → `"Invalid Input"` |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `auditLoginActivity([
  { username: "rafi", success: false, ipAddress: "192.168.1.1", timestamp: 1 },
  { username: "rafi", success: false, ipAddress: "192.168.1.1", timestamp: 2 },
  { username: "rafi", success: false, ipAddress: "192.168.1.2", timestamp: 3 },
  { username: "mona", success: true, ipAddress: "192.168.1.3", timestamp: 4 }
])` ➔

  `{
  totalAttempts: 4,
  successfulLogins: 1,
  failedLogins: 3,
  successRate: 25.00,
  uniqueUsers: 2,
  uniqueIPs: 3,
  suspiciousUsers: ["rafi"]
}`

---
