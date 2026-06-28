# 🎓 JS DAILY PRACTICE – DAY-179

📅 **Goal:** Comprehensive Security Audit System (Auth & Security Simulation)
🎯 **Focus:** Multi-Factor Verification • Risk Scoring • Breach Detection • Account Recovery Flow

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 🔐 Multi-Factor Authentication Validator

⚠️ **Function Name:** `validateMFA()`

| Input      | `factorsRequired` (array of strings), `factorsProvided` (object) |
| :--------- | :------------------------------------------------------------------ |
| **Output** | object                                                               |

**Rules:**

`factorsRequired` — array of required factor types, subset of: `"PASSWORD"`, `"OTP"`, `"BIOMETRIC"`, `"SECURITY_QUESTION"`. Must be non-empty.

`factorsProvided` object — each key is a factor type, value is boolean (`true` = passed that factor, `false`/missing = not passed)

**MFA Validation Rules:**

- For each factor in `factorsRequired`, check if `factorsProvided[factor] === true`
- `passedFactors` → array of factor names that passed
- `failedFactors` → array of factor names from `factorsRequired` that did NOT pass (false or missing — use `??` with fallback `false`)
- `mfaSuccess` → true only if ALL required factors passed
- `securityLevel` based on count of `passedFactors`:
  - all required passed AND count ≥ 3 → `"HIGH"`
  - all required passed AND count < 3 → `"MEDIUM"`
  - not all passed → `"LOW"`

| Challenge 📢 | Return `{ passedFactors, failedFactors, mfaSuccess, securityLevel }`. If invalid input → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `validateMFA(
  ["PASSWORD", "OTP", "BIOMETRIC"],
  { PASSWORD: true, OTP: true, BIOMETRIC: false }
)` ➔

  `{
  passedFactors: ["PASSWORD", "OTP"],
  failedFactors: ["BIOMETRIC"],
  mfaSuccess: false,
  securityLevel: "LOW"
}`

---

## 🧩 PROBLEM–02: 🎯 Login Risk Score Calculator

⚠️ **Function Name:** `calculateLoginRiskScore()`

| Input      | `loginAttempt` (object) |
| :--------- | :------------------------ |
| **Output** | object                    |

**Rules:**

`loginAttempt` object (some fields may be missing — use `?.` and `??`):
- `isNewDevice` (boolean) — fallback: `false`
- `isNewLocation` (boolean) — fallback: `false`
- `isVpnDetected` (boolean) — fallback: `false`
- `failedAttemptsToday` (number) — fallback: `0`
- `loginHour` (number, 0–23) — fallback: `12`

**Risk Scoring Rules (additive points):**

| Condition                              | Points |
| :-------------------------------------- | :----- |
| `isNewDevice === true`                  | 25     |
| `isNewLocation === true`                | 20     |
| `isVpnDetected === true`                | 15     |
| `failedAttemptsToday >= 3`              | 30     |
| `loginHour < 6 OR loginHour >= 23`      | 10     |

- `riskScore` = sum of matched points (max 100)

**Risk Level:**

| riskScore   | level        |
| :---------- | :----------- |
| ≥ 70        | "CRITICAL"   |
| 40 – 69     | "HIGH"       |
| 15 – 39     | "MODERATE"   |
| < 15        | "LOW"         |

- `requiresAdditionalVerification` → true if `riskScore >= 40`

| Challenge 📢 | Return `{ riskScore, level, requiresAdditionalVerification }`. If `loginAttempt` is not an object → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `calculateLoginRiskScore({
  isNewDevice: true,
  isNewLocation: true,
  isVpnDetected: false,
  failedAttemptsToday: 1,
  loginHour: 2
})` ➔

  `{
  riskScore: 55,
  level: "HIGH",
  requiresAdditionalVerification: true
}`

---

## 🧩 PROBLEM–03: 🚨 Breach Pattern Detector

⚠️ **Function Name:** `detectBreachPatterns()`

| Input      | `loginAttempts` (array of objects) |
| :--------- | :------------------------------------ |
| **Output** | object                                |

**Rules:**

Each login attempt object:
- `username` (string)
- `ipAddress` (string)
- `success` (boolean)
- `timestampMinutes` (number)

`loginAttempts` must be a non-empty array

**Breach Pattern Detection Rules:**

- **Pattern A — Credential Stuffing**: same `ipAddress` attempting logins for **3 or more DIFFERENT usernames** → flag that IP
- **Pattern B — Brute Force**: same `username` with **5 or more FAILED attempts** (success === false) → flag that username
- **Pattern C — Rapid Fire**: same `username` with **3 or more attempts within any 5-minute (timestampMinutes diff ≤ 5) window** → flag that username

Build:
- `suspiciousIPs` → array of IPs matching Pattern A
- `bruteForceUsernames` → array of usernames matching Pattern B
- `rapidFireUsernames` → array of usernames matching Pattern C (check: sort that user's timestamps, see if any 3 consecutive sorted timestamps span ≤5 minutes)
- `overallThreatLevel`:
  - any Pattern A or B detected → `"SEVERE"`
  - only Pattern C detected (no A or B) → `"ELEVATED"`
  - none detected → `"NORMAL"`

| Challenge 📢 | Return `{ suspiciousIPs, bruteForceUsernames, rapidFireUsernames, overallThreatLevel }`. If invalid input → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `detectBreachPatterns([
  { username: "u1", ipAddress: "1.1.1.1", success: false, timestampMinutes: 10 },
  { username: "u2", ipAddress: "1.1.1.1", success: false, timestampMinutes: 11 },
  { username: "u3", ipAddress: "1.1.1.1", success: false, timestampMinutes: 12 },
  { username: "u4", ipAddress: "2.2.2.2", success: true, timestampMinutes: 50 }
])` ➔

  `{
  suspiciousIPs: ["1.1.1.1"],
  bruteForceUsernames: [],
  rapidFireUsernames: [],
  overallThreatLevel: "SEVERE"
}`

---

## 🧩 PROBLEM–04: 🔄 Account Recovery Flow Orchestrator

⚠️ **Function Name:** `orchestrateAccountRecovery()`

| Input      | `recoveryRequest` (object), `verificationResults` (object) |
| :--------- | :------------------------------------------------------------- |
| **Output** | object                                                          |

**Rules:**

`recoveryRequest` object:
- `userId` (string, non-empty)
- `accountRiskLevel` (string: "LOW", "MEDIUM", "HIGH")

`verificationResults` object (some fields may be missing — use `??`):
- `emailVerified` (boolean) — fallback: `false`
- `phoneVerified` (boolean) — fallback: `false`
- `securityQuestionsVerified` (boolean) — fallback: `false`
- `supportAgentApproved` (boolean) — fallback: `false`

**Recovery Requirements by Risk Level:**

- `"LOW"` risk: requires `emailVerified` OR `phoneVerified` (at least 1)
- `"MEDIUM"` risk: requires `emailVerified` AND `phoneVerified`
- `"HIGH"` risk: requires `emailVerified` AND `phoneVerified` AND (`securityQuestionsVerified` OR `supportAgentApproved`)

**Orchestration Rules:**

- `recoveryApproved` → true if requirements for the account's `accountRiskLevel` are met
- `missingSteps` → array describing which verification steps are still needed (use these exact labels where relevant: `"email verification"`, `"phone verification"`, `"security questions or support approval"`)
- `nextAction`:
  - If approved → `"Proceed with password reset"`
  - If not approved → `"Complete remaining verification steps"`

| Challenge 📢 | Return `{ recoveryApproved, missingSteps, nextAction }`. If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `orchestrateAccountRecovery(
  { userId: "U-900", accountRiskLevel: "HIGH" },
  { emailVerified: true, phoneVerified: true, securityQuestionsVerified: false, supportAgentApproved: false }
)` ➔

  `{
  recoveryApproved: false,
  missingSteps: ["security questions or support approval"],
  nextAction: "Complete remaining verification steps"
}`

---

## 🧩 PROBLEM–05: 📋 Full Security Posture Report

⚠️ **Function Name:** `generateSecurityPostureReport()`

| Input      | `userSecurityData` (array of objects) |
| :--------- | :--------------------------------------- |
| **Output** | object                                    |

**Rules:**

Each user security data object:
- `userId` (string)
- `hasMFAEnabled` (boolean)
- `passwordAgeDays` (number, ≥ 0)
- `lastLoginRiskScore` (number, 0–100)
- `roleType` (string: "USER", "ADMIN")

`userSecurityData` must be a non-empty array

**Report Rules:**

- `totalUsers` → total count
- `mfaAdoptionRate` → percentage with `hasMFAEnabled === true` (rounded to 2 decimal places)
- `usersWithStalePasswords` → array of `userId` where `passwordAgeDays > 90`
- `highRiskUsers` → array of `userId` where `lastLoginRiskScore >= 70`
- `adminSecurityGaps` → array of `userId` where `roleType === "ADMIN"` AND `hasMFAEnabled === false` (admins without MFA are a critical gap)
- `overallSecurityGrade`:
  - `adminSecurityGaps.length > 0` → `"F"` (critical — any admin without MFA fails immediately)
  - `mfaAdoptionRate >= 80 AND highRiskUsers.length === 0` → `"A"`
  - `mfaAdoptionRate >= 60` → `"B"`
  - `mfaAdoptionRate >= 40` → `"C"`
  - otherwise → `"D"`

| Challenge 📢 | Return `{ totalUsers, mfaAdoptionRate, usersWithStalePasswords, highRiskUsers, adminSecurityGaps, overallSecurityGrade }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `generateSecurityPostureReport([
  { userId: "U1", hasMFAEnabled: true, passwordAgeDays: 100, lastLoginRiskScore: 20, roleType: "USER" },
  { userId: "U2", hasMFAEnabled: false, passwordAgeDays: 30, lastLoginRiskScore: 80, roleType: "ADMIN" },
  { userId: "U3", hasMFAEnabled: true, passwordAgeDays: 10, lastLoginRiskScore: 15, roleType: "USER" }
])` ➔

  `{
  totalUsers: 3,
  mfaAdoptionRate: 66.67,
  usersWithStalePasswords: ["U1"],
  highRiskUsers: ["U2"],
  adminSecurityGaps: ["U2"],
  overallSecurityGrade: "F"
}`

---