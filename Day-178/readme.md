# 🎓 JS DAILY PRACTICE – DAY-178

📅 **Goal:** OTP Generator & Verifier (Auth & Security Simulation)
🎯 **Focus:** OTP Lifecycle • Expiry Logic • Retry Limits • Multi-Channel Delivery Simulation

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 🔢 OTP Request Handler

⚠️ **Function Name:** `requestOtp()`

| Input      | `userInfo` (object), `recentOtpRequests` (array of objects) |
| :--------- | :---------------------------------------------------------- |
| **Output** | object                                                      |

**Rules:**

`userInfo` object:

- `userId` (string, non-empty)
- `channel` (string: "SMS" or "EMAIL")
- `currentTimeSeconds` (number, ≥ 0)

`recentOtpRequests` — array of past OTP request objects for ALL users:

- `userId` (string)
- `requestedAtSeconds` (number)

**Rate Limit Rules:**

- A user can request at most **3 OTPs within any 300-second (5-minute) window**
- Filter `recentOtpRequests` for this `userId` where `(currentTimeSeconds - requestedAtSeconds) <= 300`
- If count of such requests is already ≥ 3 → reject: `"OTP request limit reached. Please try again later."`
- Otherwise, generate OTP:
  - `otpCode` = a fixed deterministic 6-digit string built from userId length and channel: use formula `String(userId.length * 111111).padStart(6, "0").slice(-6)` (this keeps it deterministic for testing)
  - `expiresAtSeconds = currentTimeSeconds + 120` (valid for 2 minutes)
  - `deliveryMessage` using template literal: `` `OTP sent via ${channel} to user ${userId}` ``

| Challenge 📢 | If rate-limited: return `{ requestAllowed: false, message }`. If allowed: return `{ requestAllowed: true, otpCode, expiresAtSeconds, deliveryMessage }`. If invalid input → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `requestOtp(
  { userId: "U12345", channel: "SMS", currentTimeSeconds: 1000 },
  [
    { userId: "U12345", requestedAtSeconds: 800 },
    { userId: "U12345", requestedAtSeconds: 900 }
  ]
)` ➔

  `{
  requestAllowed: true,
  otpCode: "666666",
  expiresAtSeconds: 1120,
  deliveryMessage: "OTP sent via SMS to user U12345"
}`

---

## 🧩 PROBLEM–02: ✅ OTP Verification Engine

⚠️ **Function Name:** `verifyOtp()`

| Input      | `storedOtp` (object), `submittedOtp` (object) |
| :--------- | :-------------------------------------------- |
| **Output** | object                                        |

**Rules:**

`storedOtp` object:

- `otpCode` (string, non-empty)
- `expiresAtSeconds` (number, ≥ 0)
- `attemptsUsed` (number, ≥ 0)
- `maxAttempts` (number, > 0)

`submittedOtp` object:

- `code` (string, non-empty)
- `currentTimeSeconds` (number, ≥ 0)

**Verification Rules (check in this exact order, stop at first failure):**

1. `attemptsUsed >= maxAttempts` → fail: `"Maximum attempts exceeded. Request a new OTP."`
2. `currentTimeSeconds >= expiresAtSeconds` → fail: `"OTP has expired. Request a new OTP."`
3. `submittedOtp.code !== storedOtp.otpCode` → fail: `"Incorrect OTP code."`, AND increment `attemptsUsed` by 1 in the response
4. All pass → success: `"OTP verified successfully."`

| Challenge 📢 | Return `{ verified, message, attemptsUsed }` — `attemptsUsed` reflects the value AFTER this attempt (incremented only on incorrect code, not on expiry/max-attempts failures). If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `verifyOtp(
  { otpCode: "445566", expiresAtSeconds: 1200, attemptsUsed: 1, maxAttempts: 3 },
  { code: "112233", currentTimeSeconds: 1100 }
)` ➔

  `{
  verified: false,
  message: "Incorrect OTP code.",
  attemptsUsed: 2
}`

---

## 🧩 PROBLEM–03: ⏳ OTP Expiry Batch Cleaner

⚠️ **Function Name:** `cleanExpiredOtps()`

| Input      | `otpRecords` (array of objects), `currentTimeSeconds` (number) |
| :--------- | :------------------------------------------------------------- |
| **Output** | object                                                         |

**Rules:**

Each OTP record:

- `userId` (string)
- `otpCode` (string)
- `expiresAtSeconds` (number)
- `isUsed` (boolean)

`otpRecords` must be a non-empty array

**Cleanup Rules:**

- A record should be REMOVED (cleaned) if EITHER:
  - `currentTimeSeconds >= expiresAtSeconds` (expired), OR
  - `isUsed === true` (already consumed)
- `cleanedRecords` → array of `userId` values for removed records
- `validRecords` → array of full record objects that remain (not expired, not used)
- `cleanupSummary` → `` `${cleanedCount} of ${totalCount} OTP record(s) cleaned.` ``

| Challenge 📢 | Return `{ cleanedRecords, validRecords, cleanupSummary }`. If invalid input → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `cleanExpiredOtps([
  { userId: "U1", otpCode: "111111", expiresAtSeconds: 500, isUsed: false },
  { userId: "U2", otpCode: "222222", expiresAtSeconds: 900, isUsed: true },
  { userId: "U3", otpCode: "333333", expiresAtSeconds: 900, isUsed: false }
], 700)` ➔

  `{
  cleanedRecords: ["U1", "U2"],
  validRecords: [
    { userId: "U3", otpCode: "333333", expiresAtSeconds: 900, isUsed: false }
  ],
  cleanupSummary: "2 of 3 OTP record(s) cleaned."
}`

---

## 🧩 PROBLEM–04: 📡 Multi-Channel OTP Dispatcher

⚠️ **Function Name:** `dispatchMultiChannelOtp()`

| Input      | `userPreferences` (object), `otpCode` (string), `channelStatus` (object) |
| :--------- | :----------------------------------------------------------------------- |
| **Output** | object                                                                   |

**Rules:**

`userPreferences` object:

- `userId` (string, non-empty)
- `preferredChannels` (array of strings, ordered by priority) — e.g. `["SMS", "EMAIL", "PUSH"]`

`otpCode` must be non-empty string

`channelStatus` object — each key is a channel name, value is boolean (true = channel is operational, false = down)
e.g. `{ SMS: false, EMAIL: true, PUSH: true }`

**Dispatch Rules:**

- Go through `preferredChannels` IN ORDER
- Find the FIRST channel that is operational (`channelStatus[channel] === true`)
- If found: `dispatched = true`, `usedChannel` = that channel, `message` = `` `OTP delivered via ${usedChannel}` ``
- If NONE of the preferred channels are operational: `dispatched = false`, `usedChannel = null`, `message = "All preferred channels are currently unavailable."`
- `channelsAttempted` → array of channel names that were checked before success (or all of them, if none worked) — i.e., channels checked up to AND INCLUDING the working one

| Challenge 📢 | Return `{ dispatched, usedChannel, message, channelsAttempted }`. If invalid input → `"Invalid Input"` |
| :----------- | :----------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `dispatchMultiChannelOtp(
  { userId: "U-700", preferredChannels: ["SMS", "EMAIL", "PUSH"] },
  "998877",
  { SMS: false, EMAIL: true, PUSH: true }
)` ➔

  `{
  dispatched: true,
  usedChannel: "EMAIL",
  message: "OTP delivered via EMAIL",
  channelsAttempted: ["SMS", "EMAIL"]
}`

---

## 🧩 PROBLEM–05: 📊 OTP System Health Reporter

⚠️ **Function Name:** `generateOtpHealthReport()`

| Input      | `otpLogs` (array of objects) |
| :--------- | :--------------------------- |
| **Output** | object                       |

**Rules:**

Each OTP log entry:

- `userId` (string)
- `channel` (string: "SMS", "EMAIL", "PUSH")
- `wasVerified` (boolean)
- `attemptsUsed` (number, ≥ 0)
- `expiredBeforeUse` (boolean)

`otpLogs` must be a non-empty array

**Health Report Rules:**

- `totalOtpsSent` → total count
- `verifiedCount` → count where `wasVerified === true`
- `expiredCount` → count where `expiredBeforeUse === true`
- `verificationSuccessRate` → percentage of verified out of total (rounded to 2 decimal places)
- `avgAttemptsUsed` → mean of `attemptsUsed` across all logs (rounded to 2 decimal places)
- `channelPerformance` → object: for each channel, `{ total, verified, successRate }`
- `worstPerformingChannel` → the channel name with the LOWEST `successRate` (if tie, pick the one with more total OTPs sent; if still tie, pick whichever appears first)

| Challenge 📢 | Return `{ totalOtpsSent, verifiedCount, expiredCount, verificationSuccessRate, avgAttemptsUsed, channelPerformance, worstPerformingChannel }`. If invalid input → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `generateOtpHealthReport([
  { userId: "U1", channel: "SMS", wasVerified: true, attemptsUsed: 1, expiredBeforeUse: false },
  { userId: "U2", channel: "SMS", wasVerified: false, attemptsUsed: 3, expiredBeforeUse: true },
  { userId: "U3", channel: "EMAIL", wasVerified: true, attemptsUsed: 1, expiredBeforeUse: false }
])` ➔

  `{
  totalOtpsSent: 3,
  verifiedCount: 2,
  expiredCount: 1,
  verificationSuccessRate: 66.67,
  avgAttemptsUsed: 1.67,
  channelPerformance: {
    SMS: { total: 2, verified: 1, successRate: 50.00 },
    EMAIL: { total: 1, verified: 1, successRate: 100.00 }
  },
  worstPerformingChannel: "SMS"
}`

---
