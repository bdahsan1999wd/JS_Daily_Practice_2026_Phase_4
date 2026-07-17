# 🎓 JS DAILY PRACTICE – DAY-198

📅 **Goal:** Bonus Calculation System (Rule Engine & Decision System Design)
🎯 **Focus:** Multi-Condition Decision Trees • Scoring Systems • Priority-Based Logic • Rule-Based Output Generation

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: ✅ Bonus Eligibility Gate

⚠️ **Function Name:** `checkBonusEligibility()`

| Input      | `employee` (object) |
| :--------- | :------------------ |
| **Output** | object              |

**Rules:**

`employee` object:

- `monthsEmployed` (number, ≥ 0)
- `performanceRating` (number, 0–5)
- `disciplinaryActions` (number, integer, ≥ 0)
- `attendanceRate` (number, 0–100)

**Decision Tree Rules (check in this exact order, stop at first failure):**

1. `monthsEmployed >= 6` → else reject: `"Minimum tenure not met"`
2. `disciplinaryActions === 0` → else reject: `"Disciplinary record disqualifies bonus"`
3. `attendanceRate >= 80` → else reject: `"Attendance below required threshold"`
4. `performanceRating >= 2.5` → else reject: `"Performance rating too low"`

**Output Rules:**

- `eligible` → true only if all checks pass
- `rejectionReason` → failure message, or `null`

| Challenge 📢 | Return `{ eligible, rejectionReason }`. If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------- |

**Sample Input & Output:**

- `checkBonusEligibility({
  monthsEmployed: 12,
  performanceRating: 4.0,
  disciplinaryActions: 1,
  attendanceRate: 95
})` ➔

  `{
  eligible: false,
  rejectionReason: "Disciplinary record disqualifies bonus"
}`

---

## 🧩 PROBLEM–02: 💰 Performance Bonus Calculator

⚠️ **Function Name:** `calculatePerformanceBonus()`

| Input      | `baseSalary` (number), `performanceRating` (number), `companyProfitGrowthPercent` (number) |
| :--------- | :----------------------------------------------------------------------------------------- |
| **Output** | object                                                                                     |

**Rules:**

`baseSalary` must be a number, > 0
`performanceRating` must be a number, 0–5
`companyProfitGrowthPercent` must be a number (can be negative)

**Bonus Rules:**

- Performance multiplier based on `performanceRating`:
  - `>= 4.5` → 0.25 (25% of base salary)
  - `>= 3.5 AND < 4.5` → 0.15
  - `>= 2.5 AND < 3.5` → 0.08
  - `< 2.5` → 0 (not used here since eligibility already filtered, but include for completeness)
- Company performance adjustment to the multiplier:
  - `companyProfitGrowthPercent >= 10` → multiplier × 1.2 (20% boost)
  - `companyProfitGrowthPercent >= 0 AND < 10` → multiplier × 1.0 (no change)
  - `companyProfitGrowthPercent < 0` → multiplier × 0.5 (50% cut)
- `finalMultiplier` rounded to 4 decimal places (to preserve precision before final rounding)
- `bonusAmount = baseSalary × finalMultiplier` (rounded to 2 decimal places)

| Challenge 📢 | Return `{ finalMultiplier, bonusAmount }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `calculatePerformanceBonus(60000, 4.0, 12)` ➔

  `{
  finalMultiplier: 0.18,
  bonusAmount: 10800.00
}`

---

## 🧩 PROBLEM–03: 🎯 Sales Commission Bonus Tiers

⚠️ **Function Name:** `calculateSalesBonusTier()`

| Input      | `salesAmount` (number), `targetAmount` (number) |
| :--------- | :---------------------------------------------- |
| **Output** | object                                          |

**Rules:**

`salesAmount` must be a number, ≥ 0
`targetAmount` must be a number, > 0

**Tier Rules:**

- `achievementPercent = (salesAmount / targetAmount) × 100` (rounded to 2 decimal places)
- Bonus tier based on `achievementPercent`:
  - `>= 150` → `"EXCEPTIONAL"`, bonus = 20% of `salesAmount`
  - `>= 120 AND < 150` → `"EXCELLENT"`, bonus = 12% of `salesAmount`
  - `>= 100 AND < 120` → `"TARGET_MET"`, bonus = 7% of `salesAmount`
  - `>= 80 AND < 100` → `"NEAR_TARGET"`, bonus = 3% of `salesAmount`
  - `< 80` → `"BELOW_TARGET"`, bonus = 0
- `bonusAmount` rounded to 2 decimal places

| Challenge 📢 | Return `{ achievementPercent, tier, bonusAmount }`. If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `calculateSalesBonusTier(180000, 120000)` ➔

  `{
  achievementPercent: 150.00,
  tier: "EXCEPTIONAL",
  bonusAmount: 36000.00
}`

---

## 🧩 PROBLEM–04: 🏆 Team Bonus Pool Distributor

⚠️ **Function Name:** `distributeTeamBonusPool()`

| Input      | `totalBonusPool` (number), `teamMembers` (array of objects) |
| :--------- | :---------------------------------------------------------- |
| **Output** | object                                                      |

**Rules:**

`totalBonusPool` must be a number, > 0

`teamMembers` — non-empty array, each entry:

- `employeeName` (string)
- `contributionScore` (number, > 0) — relative contribution weight

**Distribution Rules:**

- Calculate `totalContributionScore` → sum of all `contributionScore` values
- Each member's `shareOfPool = (contributionScore / totalContributionScore) × totalBonusPool` (rounded to 2 decimal places)
- Due to rounding, individual shares may not sum exactly to `totalBonusPool` — compute `roundingDifference = totalBonusPool - sum(all individual shares after rounding)` (rounded to 2 decimal places)
- Add the `roundingDifference` to whichever member has the HIGHEST `contributionScore` (to absorb the rounding error) — if tie, add to whichever appears first

| Challenge 📢 | Return `{ distribution }` — array of `{ employeeName, shareOfPool }` (the highest contributor's share already includes the rounding adjustment). If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `distributeTeamBonusPool(10000, [
  { employeeName: "Alif", contributionScore: 3 },
  { employeeName: "Bilal", contributionScore: 4 },
  { employeeName: "Chumki", contributionScore: 3 }
])` ➔

  `{
  distribution: [
    { employeeName: "Alif", shareOfPool: 3000.00 },
    { employeeName: "Bilal", shareOfPool: 4000.00 },
    { employeeName: "Chumki", shareOfPool: 3000.00 }
  ]
}`

---

## 🧩 PROBLEM–05: 🏗️ Full Bonus Decision Pipeline

⚠️ **Function Name:** `runBonusDecisionPipeline()`

| Input      | `employee` (object), `companyProfitGrowthPercent` (number) |
| :--------- | :--------------------------------------------------------- |
| **Output** | object                                                     |

**Rules:**

This problem composes Problems 1 and 2 into one bonus decision pipeline.

`employee` object combines fields from both problems:

- `monthsEmployed` (number, ≥ 0)
- `performanceRating` (number, 0–5)
- `disciplinaryActions` (number, integer, ≥ 0)
- `attendanceRate` (number, 0–100)
- `baseSalary` (number, > 0)

`companyProfitGrowthPercent` — same as Problem 2

**Pipeline Rules:**

1. Run equivalent of `checkBonusEligibility()` first
   - If NOT eligible → STOP, return rejection
2. If eligible, run equivalent of `calculatePerformanceBonus()` using `baseSalary`, `performanceRating`, `companyProfitGrowthPercent`

| Challenge 📢 | If rejected: return `{ bonusAwarded: false, reason, bonusAmount: 0 }`. If approved: return `{ bonusAwarded: true, bonusAmount }`. If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `runBonusDecisionPipeline({
  monthsEmployed: 18,
  performanceRating: 4.7,
  disciplinaryActions: 0,
  attendanceRate: 92,
  baseSalary: 75000
}, 15)` ➔

  `{
  bonusAwarded: true,
  bonusAmount: 22500.00
}`

---
