# 🎓 JS DAILY PRACTICE – DAY-175

📅 **Goal:** Password Validation Engine (Auth & Security Simulation)
🎯 **Focus:** Password Policy Enforcement • Reset Flow Simulation • History Checking • Expiry Rules

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 📏 Password Policy Enforcer

⚠️ **Function Name:** `enforcePasswordPolicy()`

| Input      | `password` (string), `policy` (object) |
| :--------- | :------------------------------------- |
| **Output** | object                                 |

**Rules:**

`password` must be a non-empty string

`policy` object:

- `minLength` (number, ≥ 1)
- `requireUppercase` (boolean)
- `requireLowercase` (boolean)
- `requireDigit` (boolean)
- `requireSpecialChar` (boolean) — special chars: `!@#$%^&*`
- `forbiddenWords` (array of strings) — password must not contain any of these (case-insensitive)

**Enforcement Rules (check ALL, collect ALL violations):**

- Length < `minLength` → violation: `"Password must be at least " + minLength + " characters"`
- `requireUppercase` is true and no uppercase found → violation: `"Must contain an uppercase letter"`
- `requireLowercase` is true and no lowercase found → violation: `"Must contain a lowercase letter"`
- `requireDigit` is true and no digit found → violation: `"Must contain a digit"`
- `requireSpecialChar` is true and no special char found → violation: `"Must contain a special character"`
- If password contains any `forbiddenWords` (case-insensitive substring match) → violation: `"Password contains a forbidden word: " + word` (one violation per forbidden word found)

| Challenge 📢 | Return `{ isCompliant, violations }` — `isCompliant` is true only if `violations` is empty. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `enforcePasswordPolicy("password123", {
  minLength: 10,
  requireUppercase: true,
  requireLowercase: true,
  requireDigit: true,
  requireSpecialChar: true,
  forbiddenWords: ["password", "admin"]
})` ➔

  `{
  isCompliant: false,
  violations: [
    "Must contain an uppercase letter",
    "Must contain a special character",
    "Password contains a forbidden word: password"
  ]
}`

---

## 🧩 PROBLEM–02: 🔄 Password Reset Flow Simulator

⚠️ **Function Name:** `simulatePasswordReset()`

| Input      | `resetRequest` (object) |
| :--------- | :---------------------- |
| **Output** | object                  |

**Rules:**

`resetRequest` object:

- `resetTokenIssuedAtSeconds` (number, ≥ 0)
- `resetTokenExpirySeconds` (number, > 0) — duration the token is valid for
- `currentTimeSeconds` (number, ≥ 0)
- `newPassword` (string, non-empty)
- `oldPassword` (string, non-empty)

**Reset Flow Rules (check in this exact order, stop at first failure):**

1. Token expiry check: `currentTimeSeconds` must be < (`resetTokenIssuedAtSeconds` + `resetTokenExpirySeconds`) → else fail: `"Reset link has expired"`
2. `newPassword` must NOT be exactly equal to `oldPassword` → else fail: `"New password must be different from old password"`
3. `newPassword` length must be ≥ 8 → else fail: `"New password too short"`

**Output Rules:**

- `resetSuccessful` → true only if all 3 checks pass
- `failureReason` → the failure message from above, or `null` if successful

| Challenge 📢 | Return `{ resetSuccessful, failureReason }`. If invalid input → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `simulatePasswordReset({
  resetTokenIssuedAtSeconds: 1000,
  resetTokenExpirySeconds: 600,
  currentTimeSeconds: 1500,
  newPassword: "NewPass99",
  oldPassword: "OldPass88"
})` ➔

  `{
  resetSuccessful: true,
  failureReason: null
}`

---

## 🧩 PROBLEM–03: 📜 Password History Checker

⚠️ **Function Name:** `checkPasswordHistory()`

| Input      | `passwordHistory` (array of strings), `newPasswordHash` (string), `maxHistoryCheck` (number) |
| :--------- | :------------------------------------------------------------------------------------------- |
| **Output** | object                                                                                       |

**Rules:**

`passwordHistory` — array of previously used password hashes, ordered oldest to newest (may be empty)
`newPasswordHash` must be a non-empty string
`maxHistoryCheck` must be a number ≥ 1 — only check the LAST `maxHistoryCheck` entries in history

**Check Rules:**

- Take the last `maxHistoryCheck` entries from `passwordHistory` (if history has fewer entries than `maxHistoryCheck`, check all of them)
- `isReused` → true if `newPasswordHash` matches ANY of those checked entries
- `checkedCount` → actual number of entries checked
- `message`:
  - If `isReused` → `` `Password was used within your last ${checkedCount} password(s). Please choose a new one.` ``
  - If not reused → `"Password is unique within checked history."`

| Challenge 📢 | Return `{ isReused, checkedCount, message }`. If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `checkPasswordHistory(
  ["hash_A", "hash_B", "hash_C", "hash_D"],
  "hash_B",
  3
)` ➔

  `{
  isReused: true,
  checkedCount: 3,
  message: "Password was used within your last 3 password(s). Please choose a new one."
}`

---

## 🧩 PROBLEM–04: ⏳ Password Expiry Manager

⚠️ **Function Name:** `managePasswordExpiry()`

| Input      | `accounts` (array of objects), `currentDay` (number) |
| :--------- | :--------------------------------------------------- |
| **Output** | object                                               |

**Rules:**

Each account object:

- `username` (string)
- `passwordSetDay` (number, ≥ 0) — the day number the password was set
- `expiryPolicyDays` (number, > 0) — how many days until password expires

`currentDay` must be a number ≥ 0

**Expiry Rules:**

- `daysSinceSet = currentDay - passwordSetDay`
- `daysUntilExpiry = expiryPolicyDays - daysSinceSet`
- Categorize each account:
  - `daysUntilExpiry <= 0` → `"EXPIRED"`
  - `daysUntilExpiry > 0 AND daysUntilExpiry <= 7` → `"EXPIRING_SOON"`
  - `daysUntilExpiry > 7` → `"ACTIVE"`

**Summary Rules:**

- `expiredAccounts` → array of usernames with status "EXPIRED"
- `expiringSoonAccounts` → array of usernames with status "EXPIRING_SOON"
- `activeAccounts` → array of usernames with status "ACTIVE"
- `expiryRate` → percentage of accounts that are EXPIRED (rounded to 2 decimal places)

| Challenge 📢 | Return `{ expiredAccounts, expiringSoonAccounts, activeAccounts, expiryRate }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `managePasswordExpiry([
  { username: "alam", passwordSetDay: 0, expiryPolicyDays: 90 },
  { username: "bina", passwordSetDay: 10, expiryPolicyDays: 30 },
  { username: "cyrus", passwordSetDay: 50, expiryPolicyDays: 60 }
], 100)` ➔

  `{
  expiredAccounts: ["alam", "bina"],
  expiringSoonAccounts: [],
  activeAccounts: ["cyrus"],
  expiryRate: 66.67
}`

---

## 🧩 PROBLEM–05: 🛡️ Security Question Verifier

⚠️ **Function Name:** `verifySecurityQuestions()`

| Input      | `storedAnswers` (array of objects), `submittedAnswers` (array of objects), `requiredCorrect` (number) |
| :--------- | :---------------------------------------------------------------------------------------------------- |
| **Output** | object                                                                                                |

**Rules:**

Each `storedAnswers` entry:

- `questionId` (string)
- `answerHash` (string) — case-insensitive comparison expected

Each `submittedAnswers` entry:

- `questionId` (string)
- `answerHash` (string)

`requiredCorrect` must be a number ≥ 1

**Verification Rules:**

- For each `submittedAnswers` entry, find the matching `storedAnswers` entry by `questionId`
- If no matching `questionId` found in storedAnswers → treat as incorrect (does not count)
- Compare `answerHash` case-insensitively
- `correctCount` → number of submitted answers that matched correctly
- `totalQuestions` → number of submitted answers
- `isVerified` → true if `correctCount >= requiredCorrect`
- `verificationMessage`:
  - If verified → `` `Identity verified: ${correctCount}/${totalQuestions} correct.` ``
  - If not verified → `` `Verification failed: only ${correctCount}/${totalQuestions} correct (need ${requiredCorrect}).` ``

| Challenge 📢 | Return `{ correctCount, totalQuestions, isVerified, verificationMessage }`. If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `verifySecurityQuestions(
  [
    { questionId: "Q1", answerHash: "BlueSky" },
    { questionId: "Q2", answerHash: "Rocky" },
    { questionId: "Q3", answerHash: "Dhaka" }
  ],
  [
    { questionId: "Q1", answerHash: "bluesky" },
    { questionId: "Q2", answerHash: "Max" },
    { questionId: "Q3", answerHash: "dhaka" }
  ],
  2
)` ➔

  `{
  correctCount: 2,
  totalQuestions: 3,
  isVerified: true,
  verificationMessage: "Identity verified: 2/3 correct."
}`

---
