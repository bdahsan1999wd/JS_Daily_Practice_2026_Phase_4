# 🎓 JS DAILY PRACTICE – DAY-173

📅 **Goal:** User Registration System (Auth & Security Simulation)
🎯 **Focus:** Credential Validation • Password Rules • Duplicate Detection • Account Setup Logic

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 📝 Registration Form Validator

⚠️ **Function Name:** `validateRegistrationForm()`

| Input      | `formData` (object) |
| :--------- | :------------------ |
| **Output** | object              |

**Rules:**

`formData` object:

- `username` (string)
- `email` (string)
- `password` (string)
- `confirmPassword` (string)
- `age` (number)

**Validation Checks (run ALL checks, collect ALL errors):**

- `username`: must be 4–20 characters, only letters/numbers/underscore → else error: `"Username must be 4-20 characters (letters, numbers, underscore only)"`
- `email`: must contain `"@"` and `"."` after the `"@"` → else error: `"Invalid email format"`
- `password`: must be ≥ 8 characters, contain at least 1 uppercase, 1 lowercase, 1 digit → else error: `"Password must be 8+ characters with uppercase, lowercase, and a digit"`
- `confirmPassword`: must exactly match `password` → else error: `"Passwords do not match"`
- `age`: must be a number ≥ 13 → else error: `"Must be at least 13 years old"`

**Output Rules:**

- `isValid` → `true` only if ZERO errors found
- `errors` → array of all error messages that apply (empty array if valid)

| Challenge 📢 | Return `{ isValid, errors }`. If `formData` is not an object → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `validateRegistrationForm({
  username: "raf",
  email: "rafmail.com",
  password: "abc12345",
  confirmPassword: "abc12345",
  age: 12
})` ➔

  `{
  isValid: false,
  errors: [
    "Username must be 4-20 characters (letters, numbers, underscore only)",
    "Invalid email format",
    "Password must be 8+ characters with uppercase, lowercase, and a digit",
    "Must be at least 13 years old"
  ]
}`

---

## 🧩 PROBLEM–02: 🔍 Duplicate Account Checker

⚠️ **Function Name:** `checkDuplicateAccount()`

| Input      | `existingUsers` (array of objects), `newUser` (object) |
| :--------- | :----------------------------------------------------- |
| **Output** | object                                                 |

**Rules:**

Each existing user object:

- `username` (string)
- `email` (string)

`newUser` object:

- `username` (string, non-empty)
- `email` (string, non-empty)

**Duplicate Check Rules:**

- Check `username` match — case-insensitive
- Check `email` match — case-insensitive
- `usernameTaken` → true if any existing user has the same username (case-insensitive)
- `emailTaken` → true if any existing user has the same email (case-insensitive)
- `canRegister` → true only if BOTH `usernameTaken` and `emailTaken` are false

| Challenge 📢 | Return `{ usernameTaken, emailTaken, canRegister }`. If `existingUsers` is not an array → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `checkDuplicateAccount([
  { username: "Rakib123", email: "rakib@mail.com" },
  { username: "TaniaB", email: "tania@mail.com" }
], { username: "rakib123", email: "newrakib@mail.com" })` ➔

  `{
  usernameTaken: true,
  emailTaken: false,
  canRegister: false
}`

---

## 🧩 PROBLEM–03: 🔐 Password Strength Scorer

⚠️ **Function Name:** `scorePasswordStrength()`

| Input      | `password` (string) |
| :--------- | :------------------ |
| **Output** | object              |

**Rules:**

`password` must be a non-empty string

**Scoring Rules (each criterion met adds points):**

| Criterion                              | Points                            |
| :------------------------------------- | :-------------------------------- |
| Length ≥ 8                             | 20                                |
| Length ≥ 12                            | 10 (additional, on top of the 20) |
| Contains uppercase letter              | 20                                |
| Contains lowercase letter              | 20                                |
| Contains digit                         | 15                                |
| Contains special character (!@#$%^&\*) | 15                                |

- `totalScore` = sum of all matched criteria (max 100)

**Strength Level:**

| totalScore | level         |
| :--------- | :------------ |
| ≥ 80       | "VERY STRONG" |
| 60 – 79    | "STRONG"      |
| 40 – 59    | "MODERATE"    |
| 20 – 39    | "WEAK"        |
| < 20       | "VERY WEAK"   |

| Challenge 📢 | Return `{ totalScore, level }`. If `password` is not a string or is empty → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `scorePasswordStrength("Rahim@2025")` ➔

  `{
  totalScore: 90,
  level: "VERY STRONG"
}`

---

## 🧩 PROBLEM–04: 🆔 Account ID Generator

⚠️ **Function Name:** `generateAccountId()`

| Input      | `userData` (object), `existingIds` (array of strings) |
| :--------- | :---------------------------------------------------- |
| **Output** | object                                                |

**Rules:**

`userData` object:

- `username` (string, non-empty)
- `registrationYear` (number, integer, 2000–2025)
- `accountType` (string: "FREE", "PREMIUM", "ENTERPRISE")

`existingIds` — array of strings (previously generated IDs, may be empty)

**ID Generation Rules:**

- Build base ID using first 3 letters of `username` (uppercase) + last 2 digits of `registrationYear` + type code:
  - "FREE" → "F"
  - "PREMIUM" → "P"
  - "ENTERPRISE" → "E"
  - Format: `` `${first3Letters}${last2YearDigits}${typeCode}` ``
  - If `username` has fewer than 3 letters, pad with "X" (e.g. "Al" → "ALX")
- If base ID already exists in `existingIds`, append `-1`, `-2`, etc. until unique
- `isDuplicateResolved` → true if a suffix had to be added, false if base ID was already unique

| Challenge 📢 | Return `{ accountId, isDuplicateResolved }`. If invalid input → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `generateAccountId(
  { username: "Karim", registrationYear: 2024, accountType: "PREMIUM" },
  ["KAR24P", "KAR24P-1"]
)` ➔

  `{
  accountId: "KAR24P-2",
  isDuplicateResolved: true
}`

---

## 🧩 PROBLEM–05: 📋 Bulk Registration Processor

⚠️ **Function Name:** `processBulkRegistrations()`

| Input      | `registrationRequests` (array of objects) |
| :--------- | :---------------------------------------- |
| **Output** | object                                    |

**Rules:**

Each registration request object:

- `username` (string)
- `email` (string)
- `password` (string)
- `age` (number)

**Processing Rules (apply to each request):**

A request is **APPROVED** only if ALL conditions are true:

1. `username` length is 4–20 characters
2. `email` contains `"@"`
3. `password` length ≥ 8
4. `age` ≥ 13

Otherwise it is **REJECTED**, with a reason (the FIRST failing condition, checked in order above):

- Condition 1 fails → `"Invalid username length"`
- Condition 2 fails → `"Invalid email"`
- Condition 3 fails → `"Password too short"`
- Condition 4 fails → `"Underage"`

**Summary Rules:**

- `approved` → array of `username` values that passed
- `rejected` → array of `{ username, reason }` for failed ones
- `approvalRate` → percentage of approved out of total (rounded to 2 decimal places)

| Challenge 📢 | Return `{ approved, rejected, approvalRate }`. If `registrationRequests` is not a non-empty array → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `processBulkRegistrations([
  { username: "Tania01", email: "tania@mail.com", password: "pass1234", age: 22 },
  { username: "Bo", email: "bomail.com", password: "12345", age: 19 },
  { username: "Hasan99", email: "hasan@mail.com", password: "short", age: 10 }
])` ➔

  `{
  approved: ["Tania01"],
  rejected: [
    { username: "Bo", reason: "Invalid username length" },
    { username: "Hasan99", reason: "Password too short" }
  ],
  approvalRate: 33.33
}`

---
