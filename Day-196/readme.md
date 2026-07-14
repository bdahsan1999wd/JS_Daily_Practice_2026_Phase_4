# 🎓 JS DAILY PRACTICE – DAY-196

📅 **Goal:** Risk Assessment System (Rule Engine & Decision System Design)
🎯 **Focus:** Multi-Condition Decision Trees • Scoring Systems • Priority-Based Logic • Rule-Based Output Generation

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 🏥 Insurance Risk Gate

⚠️ **Function Name:** `checkInsuranceEligibility()`

| Input      | `applicant` (object) |
| :--------- | :------------------- |
| **Output** | object               |

**Rules:**

`applicant` object:

- `age` (number, 0–120)
- `hasPreexistingCondition` (boolean)
- `smokerStatus` (boolean)
- `bmi` (number, > 0)

**Decision Tree Rules (check in this exact order, stop at first failure):**

1. `age` must be 18–65 → else reject: `"Age outside insurable range"`
2. `bmi` must be `<= 40` → else reject: `"BMI exceeds insurable threshold"`
3. If `hasPreexistingCondition === true` AND `smokerStatus === true` → reject: `"Combined high-risk factors disqualify applicant"` (this combination specifically is disqualifying, neither alone is)

**Output Rules:**

- `eligible` → true only if all checks pass
- `rejectionReason` → failure message, or `null` if eligible

| Challenge 📢 | Return `{ eligible, rejectionReason }`. If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------- |

**Sample Input & Output:**

- `checkInsuranceEligibility({
  age: 45,
  hasPreexistingCondition: true,
  smokerStatus: true,
  bmi: 28
})` ➔

  `{
  eligible: false,
  rejectionReason: "Combined high-risk factors disqualify applicant"
}`

---

## 🧩 PROBLEM–02: 📊 Health Risk Score Calculator

⚠️ **Function Name:** `calculateHealthRiskScore()`

| Input      | `applicant` (object) |
| :--------- | :------------------- |
| **Output** | object               |

**Rules:**

`applicant` object:

- `age` (number, ≥ 0)
- `bmi` (number, > 0)
- `smokerStatus` (boolean)
- `exerciseFrequencyPerWeek` (number, integer, ≥ 0)
- `familyHistoryOfIllness` (boolean)

**Scoring Rules (additive risk points — HIGHER score means MORE risk this time):**

| Condition                                | Points |
| :--------------------------------------- | :----- |
| `age >= 60`                              | 25     |
| `age >= 40 AND < 60`                     | 15     |
| `bmi >= 30`                              | 20     |
| `bmi >= 25 AND < 30`                     | 10     |
| `smokerStatus === true`                  | 25     |
| `exerciseFrequencyPerWeek === 0`         | 15     |
| `exerciseFrequencyPerWeek >= 1 AND <= 2` | 5      |
| `familyHistoryOfIllness === true`        | 15     |

- `riskScore` = sum of matched points (max 100)

**Risk Tier:**

| riskScore | tier          | premiumMultiplier |
| :-------- | :------------ | :---------------- |
| ≥ 60      | "HIGH_RISK"   | 2.5               |
| 30 – 59   | "MEDIUM_RISK" | 1.5               |
| < 30      | "LOW_RISK"    | 1.0               |

| Challenge 📢 | Return `{ riskScore, tier, premiumMultiplier }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `calculateHealthRiskScore({
  age: 45,
  bmi: 27,
  smokerStatus: false,
  exerciseFrequencyPerWeek: 1,
  familyHistoryOfIllness: true
})` ➔

  `{
  riskScore: 45,
  tier: "MEDIUM_RISK",
  premiumMultiplier: 1.5
}`

---

## 🧩 PROBLEM–03: 💰 Premium Calculator

⚠️ **Function Name:** `calculateInsurancePremium()`

| Input      | `basePremium` (number), `premiumMultiplier` (number), `coverageAmount` (number) |
| :--------- | :------------------------------------------------------------------------------ |
| **Output** | object                                                                          |

**Rules:**

`basePremium` must be a number, > 0
`premiumMultiplier` must be a number, > 0
`coverageAmount` must be a number, > 0

**Calculation Rules:**

- `adjustedPremium = basePremium × premiumMultiplier`
- `coverageRatio = coverageAmount / 1000000` (coverage measured in units of 1 million)
- `finalPremium = adjustedPremium × coverageRatio` (rounded to 2 decimal places)
- `monthlyPremium = finalPremium / 12` (rounded to 2 decimal places)
- `affordabilityTier`:
  - `monthlyPremium <= 2000` → `"AFFORDABLE"`
  - `monthlyPremium <= 5000` → `"MODERATE"`
  - `monthlyPremium > 5000` → `"EXPENSIVE"`

| Challenge 📢 | Return `{ finalPremium, monthlyPremium, affordabilityTier }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `calculateInsurancePremium(10000, 1.5, 2000000)` ➔

  `{
  finalPremium: 30000.00,
  monthlyPremium: 2500.00,
  affordabilityTier: "MODERATE"
}`

---

## 🧩 PROBLEM–04: 🚨 Portfolio Risk Concentration Analyzer

⚠️ **Function Name:** `analyzePortfolioRiskConcentration()`

| Input      | `policies` (array of objects) |
| :--------- | :---------------------------- |
| **Output** | object                        |

**Rules:**

`policies` — non-empty array, each entry:

- `policyId` (string)
- `riskTier` (string: "LOW_RISK", "MEDIUM_RISK", "HIGH_RISK")
- `coverageAmount` (number, > 0)

**Concentration Rules:**

- `tierBreakdown` → object: each key is risk tier, value is `{ count, totalCoverage }`
- `highRiskCoveragePercent` → `(HIGH_RISK totalCoverage / overall totalCoverage) × 100` (rounded to 2 decimal places)
- `portfolioHealthStatus`:
  - `highRiskCoveragePercent >= 40` → `"OVEREXPOSED"`
  - `highRiskCoveragePercent >= 20` → `"BALANCED_CAUTION"`
  - `highRiskCoveragePercent < 20` → `"WELL_DIVERSIFIED"`

| Challenge 📢 | Return `{ tierBreakdown, highRiskCoveragePercent, portfolioHealthStatus }`. If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `analyzePortfolioRiskConcentration([
  { policyId: "P1", riskTier: "HIGH_RISK", coverageAmount: 500000 },
  { policyId: "P2", riskTier: "LOW_RISK", coverageAmount: 300000 },
  { policyId: "P3", riskTier: "MEDIUM_RISK", coverageAmount: 200000 }
])` ➔

  `{
  tierBreakdown: {
    HIGH_RISK: { count: 1, totalCoverage: 500000 },
    LOW_RISK: { count: 1, totalCoverage: 300000 },
    MEDIUM_RISK: { count: 1, totalCoverage: 200000 }
  },
  highRiskCoveragePercent: 50.00,
  portfolioHealthStatus: "OVEREXPOSED"
}`

---

## 🧩 PROBLEM–05: 🏗️ Full Insurance Underwriting Pipeline

⚠️ **Function Name:** `runUnderwritingPipeline()`

| Input      | `applicant` (object), `basePremium` (number), `coverageAmount` (number) |
| :--------- | :---------------------------------------------------------------------- |
| **Output** | object                                                                  |

**Rules:**

This problem composes Problems 1, 2, and 3 into one underwriting pipeline.

`applicant` object combines fields from Problems 1 and 2:

- `age` (number, 0–120)
- `hasPreexistingCondition` (boolean)
- `smokerStatus` (boolean)
- `bmi` (number, > 0)
- `exerciseFrequencyPerWeek` (number, integer, ≥ 0)
- `familyHistoryOfIllness` (boolean)

`basePremium`, `coverageAmount` — same as Problem 3

**Pipeline Rules:**

1. Run equivalent of `checkInsuranceEligibility()` first
   - If NOT eligible → STOP, return rejection
2. If eligible, run equivalent of `calculateHealthRiskScore()` to get `riskScore`, `tier`, `premiumMultiplier`
3. Run equivalent of `calculateInsurancePremium()` using `basePremium`, `premiumMultiplier`, `coverageAmount`

| Challenge 📢 | If rejected: return `{ approved: false, reason }`. If approved: return `{ approved: true, riskTier, monthlyPremium, affordabilityTier }`. If invalid input → `"Invalid Input"` |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `runUnderwritingPipeline(
  { age: 35, hasPreexistingCondition: false, smokerStatus: false, bmi: 22, exerciseFrequencyPerWeek: 4, familyHistoryOfIllness: false },
  8000,
  1000000
)` ➔

  `{
  approved: true,
  riskTier: "LOW_RISK",
  monthlyPremium: 666.67,
  affordabilityTier: "AFFORDABLE"
}`

---
