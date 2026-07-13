# 🎓 JS DAILY PRACTICE – DAY-194

📅 **Goal:** Loan Approval System (Rule Engine & Decision System Design)
🎯 **Focus:** Multi-Condition Decision Trees • Scoring Systems • Priority-Based Logic • Rule-Based Output Generation

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 💳 Credit Score Eligibility Gate

⚠️ **Function Name:** `checkLoanEligibility()`

| Input      | `applicant` (object) |
| :--------- | :------------------- |
| **Output** | object               |

**Rules:**

`applicant` object:

- `creditScore` (number, 300–850)
- `monthlyIncome` (number, > 0)
- `existingDebt` (number, ≥ 0)
- `employmentYears` (number, ≥ 0)

**Decision Tree Rules (check in this exact order, stop at first failure):**

1. `creditScore >= 600` → else reject: `"Credit score too low"`
2. `debtToIncomeRatio = existingDebt / monthlyIncome` must be `<= 0.4` → else reject: `"Debt-to-income ratio too high"`
3. `employmentYears >= 1` → else reject: `"Insufficient employment history"`

**Output Rules:**

- `eligible` → true only if all 3 checks pass
- `rejectionReason` → the failure message, or `null` if eligible
- `debtToIncomeRatio` → always include this computed value (rounded to 2 decimal places), regardless of pass/fail

| Challenge 📢 | Return `{ eligible, rejectionReason, debtToIncomeRatio }`. If `applicant` is invalid → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `checkLoanEligibility({
  creditScore: 650,
  monthlyIncome: 50000,
  existingDebt: 25000,
  employmentYears: 2
})` ➔

  `{
  eligible: false,
  rejectionReason: "Debt-to-income ratio too high",
  debtToIncomeRatio: 0.50
}`

---

## 🧩 PROBLEM–02: 📊 Loan Risk Scoring Engine

⚠️ **Function Name:** `calculateLoanRiskScore()`

| Input      | `applicant` (object) |
| :--------- | :------------------- |
| **Output** | object               |

**Rules:**

`applicant` object:

- `creditScore` (number, 300–850)
- `debtToIncomeRatio` (number, 0–1)
- `employmentYears` (number, ≥ 0)
- `hasCollateral` (boolean)
- `previousDefaults` (number, integer, ≥ 0)

**Scoring Rules (additive points, higher = lower risk):**

| Condition                            | Points |
| :----------------------------------- | :----- |
| `creditScore >= 750`                 | 30     |
| `creditScore >= 650 AND < 750`       | 20     |
| `creditScore >= 600 AND < 650`       | 10     |
| `debtToIncomeRatio <= 0.2`           | 20     |
| `debtToIncomeRatio > 0.2 AND <= 0.4` | 10     |
| `employmentYears >= 5`               | 20     |
| `employmentYears >= 2 AND < 5`       | 10     |
| `hasCollateral === true`             | 20     |
| `previousDefaults === 0`             | 10     |

- `riskScore` = sum of matched points (max 100)

**Risk Category:**

| riskScore | category      |
| :-------- | :------------ |
| ≥ 80      | "LOW_RISK"    |
| 50 – 79   | "MEDIUM_RISK" |
| < 50      | "HIGH_RISK"   |

| Challenge 📢 | Return `{ riskScore, category }`. If `applicant` is invalid → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `calculateLoanRiskScore({
  creditScore: 720,
  debtToIncomeRatio: 0.15,
  employmentYears: 6,
  hasCollateral: true,
  previousDefaults: 0
})` ➔

  `{
  riskScore: 90,
  category: "LOW_RISK"
}`

---

## 🧩 PROBLEM–03: 💰 Loan Amount & Interest Rate Determiner

⚠️ **Function Name:** `determineLoanTerms()`

| Input      | `riskCategory` (string), `requestedAmount` (number), `monthlyIncome` (number) |
| :--------- | :---------------------------------------------------------------------------- |
| **Output** | object                                                                        |

**Rules:**

`riskCategory` must be one of: `"LOW_RISK"`, `"MEDIUM_RISK"`, `"HIGH_RISK"`
`requestedAmount` must be a number, > 0
`monthlyIncome` must be a number, > 0

**Decision Rules:**

- `maxLoanMultiplier` based on `riskCategory`:
  - "LOW_RISK" → 10× monthly income
  - "MEDIUM_RISK" → 6× monthly income
  - "HIGH_RISK" → 3× monthly income
- `maxApprovedAmount = monthlyIncome × maxLoanMultiplier`
- `approvedAmount = Math.min(requestedAmount, maxApprovedAmount)`
- `interestRate` based on `riskCategory`:
  - "LOW_RISK" → 8%
  - "MEDIUM_RISK" → 12%
  - "HIGH_RISK" → 18%
- `wasAmountReduced` → true if `requestedAmount > maxApprovedAmount`

| Challenge 📢 | Return `{ approvedAmount, interestRate, wasAmountReduced }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `determineLoanTerms("MEDIUM_RISK", 400000, 50000)` ➔

  `{
  approvedAmount: 300000,
  interestRate: 12,
  wasAmountReduced: true
}`

---

## 🧩 PROBLEM–04: 📋 Multi-Applicant Comparison Engine

⚠️ **Function Name:** `rankLoanApplicants()`

| Input      | `applicants` (array of objects) |
| :--------- | :------------------------------ |
| **Output** | array of objects                |

**Rules:**

`applicants` — non-empty array, each entry:

- `applicantName` (string)
- `riskScore` (number, 0–100)
- `requestedAmount` (number, > 0)

**Ranking Rules:**

- Rank applicants by `riskScore` descending (lower risk = higher priority for approval)
- If tie → lower `requestedAmount` wins (smaller loans are safer to approve first)
- If still tie → same rank (shared rank)
- `priorityLevel` based on rank:
  - rank 1 → `"FIRST_PRIORITY"`
  - rank 2-3 → `"SECOND_PRIORITY"`
  - rank 4+ → `"STANDARD_QUEUE"`

| Challenge 📢 | Return array with `{ applicantName, riskScore, rank, priorityLevel }`. If invalid input → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `rankLoanApplicants([
  { applicantName: "Hasan", riskScore: 85, requestedAmount: 200000 },
  { applicantName: "Mina", riskScore: 90, requestedAmount: 150000 },
  { applicantName: "Tarek", riskScore: 85, requestedAmount: 100000 }
])` ➔

  `[
  { applicantName: "Mina", riskScore: 90, rank: 1, priorityLevel: "FIRST_PRIORITY" },
  { applicantName: "Tarek", riskScore: 85, rank: 2, priorityLevel: "SECOND_PRIORITY" },
  { applicantName: "Hasan", riskScore: 85, rank: 3, priorityLevel: "SECOND_PRIORITY" }
]`

---

## 🧩 PROBLEM–05: 🏗️ Full Loan Decision Pipeline

⚠️ **Function Name:** `runLoanDecisionPipeline()`

| Input      | `applicant` (object) |
| :--------- | :------------------- |
| **Output** | object               |

**Rules:**

This problem composes the previous 3 functions (Problems 1, 2, 3) into one decision pipeline.

`applicant` object:

- `creditScore` (number, 300–850)
- `monthlyIncome` (number, > 0)
- `existingDebt` (number, ≥ 0)
- `employmentYears` (number, ≥ 0)
- `hasCollateral` (boolean)
- `previousDefaults` (number, integer, ≥ 0)
- `requestedAmount` (number, > 0)

**Pipeline Rules:**

1. Run the equivalent of `checkLoanEligibility()` logic first (using `creditScore`, derived `debtToIncomeRatio = existingDebt/monthlyIncome`, `employmentYears`)
   - If NOT eligible → STOP, return rejection immediately
2. If eligible, run the equivalent of `calculateLoanRiskScore()` logic to get `riskScore` and `category`
3. Run the equivalent of `determineLoanTerms()` logic using the `category`, `requestedAmount`, and `monthlyIncome`
4. Combine into a final decision

| Challenge 📢 | If rejected at step 1: return `{ approved: false, reason }`. If approved: return `{ approved: true, riskCategory, approvedAmount, interestRate }`. If invalid input → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `runLoanDecisionPipeline({
  creditScore: 720,
  monthlyIncome: 60000,
  existingDebt: 10000,
  employmentYears: 6,
  hasCollateral: true,
  previousDefaults: 0,
  requestedAmount: 500000
})` ➔

  `{
  approved: true,
  riskCategory: "LOW_RISK",
  approvedAmount: 500000,
  interestRate: 8
}`

---
