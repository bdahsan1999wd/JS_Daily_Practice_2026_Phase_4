# 🎓 JS DAILY PRACTICE – DAY-190

📅 **Goal:** Revenue Tracking System (Reporting & Analytics Engine)
🎯 **Focus:** Data Aggregation • KPI Calculation • Statistical Summary Generation

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 💵 Revenue Stream Aggregator

⚠️ **Function Name:** `aggregateRevenueStreams()`

| Input      | `revenueEntries` (array of objects) |
| :--------- | :---------------------------------- |
| **Output** | object                              |

**Rules:**

`revenueEntries` — non-empty array, each entry:

- `streamName` (string: e.g. "Subscriptions", "Ads", "OneTimeSales")
- `amount` (number, > 0)
- `isRecurring` (boolean)

**Aggregation Rules:**

- Group by `streamName`, sum `amount` per stream
- `totalRevenue` → sum of all amounts
- `recurringRevenue` → sum of amounts where `isRecurring === true`
- `oneTimeRevenue` → sum of amounts where `isRecurring === false`
- `recurringPercent` → `(recurringRevenue / totalRevenue) × 100` (rounded to 2 decimal places)
- `streamBreakdown` → object: each key is stream name, value is total amount for that stream

| Challenge 📢 | Return `{ totalRevenue, recurringRevenue, oneTimeRevenue, recurringPercent, streamBreakdown }`. If invalid input → `"Invalid Input"` |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `aggregateRevenueStreams([
  { streamName: "Subscriptions", amount: 50000, isRecurring: true },
  { streamName: "Ads", amount: 20000, isRecurring: true },
  { streamName: "OneTimeSales", amount: 30000, isRecurring: false }
])` ➔

  `{
  totalRevenue: 100000,
  recurringRevenue: 70000,
  oneTimeRevenue: 30000,
  recurringPercent: 70.00,
  streamBreakdown: { Subscriptions: 50000, Ads: 20000, OneTimeSales: 30000 }
}`

---

## 🧩 PROBLEM–02: 📈 MRR Growth Calculator

⚠️ **Function Name:** `calculateMRRGrowth()`

| Input      | `monthlyMRR` (array of objects) |
| :--------- | :------------------------------ |
| **Output** | object                          |

**Rules:**

`monthlyMRR` — non-empty array, ORDERED chronologically, ≥ 2 entries, each:

- `month` (string)
- `newMRR` (number, ≥ 0) — revenue from new customers this month
- `churnedMRR` (number, ≥ 0) — revenue lost from cancellations this month
- `existingMRR` (number, ≥ 0) — revenue carried over from existing customers

**Growth Rules:**

- For each month: `totalMRR = existingMRR + newMRR - churnedMRR`
- `netNewMRR = newMRR - churnedMRR`
- `monthlyBreakdown` → array of `{ month, totalMRR, netNewMRR }`
- `monthOverMonthGrowthPercent` for each month from the 2nd onward: `((totalMRR_current - totalMRR_previous) / totalMRR_previous) × 100` (rounded to 2 decimal places; if previous is 0 → `null`)
- `averageGrowthRate` → mean of all computed growth percents that are NOT null (rounded to 2 decimal places; if all are null → `null`)

| Challenge 📢 | Return `{ monthlyBreakdown, averageGrowthRate }`. If fewer than 2 entries or invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `calculateMRRGrowth([
  { month: "Jan", newMRR: 5000, churnedMRR: 1000, existingMRR: 20000 },
  { month: "Feb", newMRR: 6000, churnedMRR: 2000, existingMRR: 24000 }
])` ➔

  `{
  monthlyBreakdown: [
    { month: "Jan", totalMRR: 24000, netNewMRR: 4000 },
    { month: "Feb", totalMRR: 28000, netNewMRR: 4000 }
  ],
  averageGrowthRate: 16.67
}`

---

## 🧩 PROBLEM–03: 🧮 Revenue Concentration Analyzer

⚠️ **Function Name:** `analyzeRevenueConcentration()`

| Input      | `customerRevenue` (array of objects) |
| :--------- | :----------------------------------- |
| **Output** | object                               |

**Rules:**

`customerRevenue` — non-empty array, each entry:

- `customerName` (string)
- `revenue` (number, > 0)

**Concentration Rules:**

- `totalRevenue` → sum of all `revenue`
- Sort customers by `revenue` descending
- `top3Revenue` → sum of the top 3 customers' revenue (if fewer than 3 customers exist, sum all of them)
- `top3ConcentrationPercent` → `(top3Revenue / totalRevenue) × 100` (rounded to 2 decimal places)
- `concentrationRisk`:
  - `top3ConcentrationPercent >= 70` → `"HIGH_RISK"`
  - `top3ConcentrationPercent >= 40` → `"MODERATE_RISK"`
  - `top3ConcentrationPercent < 40` → `"LOW_RISK"`
- `topCustomers` → array of the top 3 (or fewer) customer names, in descending revenue order

| Challenge 📢 | Return `{ totalRevenue, top3ConcentrationPercent, concentrationRisk, topCustomers }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `analyzeRevenueConcentration([
  { customerName: "BigCorp", revenue: 50000 },
  { customerName: "MidCo", revenue: 20000 },
  { customerName: "SmallBiz", revenue: 10000 },
  { customerName: "TinyShop", revenue: 5000 }
])` ➔

  `{
  totalRevenue: 85000,
  top3ConcentrationPercent: 94.12,
  concentrationRisk: "HIGH_RISK",
  topCustomers: ["BigCorp", "MidCo", "SmallBiz"]
}`

---

## 🧩 PROBLEM–04: 💔 Churn Impact Calculator

⚠️ **Function Name:** `calculateChurnImpact()`

| Input      | `customers` (array of objects) |
| :--------- | :----------------------------- |
| **Output** | object                         |

**Rules:**

`customers` — non-empty array, each entry:

- `customerName` (string)
- `monthlyRevenue` (number, > 0)
- `status` (string: "ACTIVE" or "CHURNED")

**Churn Rules:**

- `totalCustomers` → total count
- `churnedCustomers` → count where `status === "CHURNED"`
- `churnRate` → `(churnedCustomers / totalCustomers) × 100` (rounded to 2 decimal places)
- `revenueLostToChurn` → sum of `monthlyRevenue` for CHURNED customers
- `remainingActiveRevenue` → sum of `monthlyRevenue` for ACTIVE customers
- `revenueChurnRate` → `(revenueLostToChurn / (revenueLostToChurn + remainingActiveRevenue)) × 100` (rounded to 2 decimal places)
- `churnSeverity`:
  - `revenueChurnRate >= 20` → `"SEVERE"`
  - `revenueChurnRate >= 10` → `"CONCERNING"`
  - `revenueChurnRate < 10` → `"NORMAL"`

| Challenge 📢 | Return `{ churnRate, revenueLostToChurn, revenueChurnRate, churnSeverity }`. If invalid input → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `calculateChurnImpact([
  { customerName: "A", monthlyRevenue: 1000, status: "ACTIVE" },
  { customerName: "B", monthlyRevenue: 500, status: "CHURNED" },
  { customerName: "C", monthlyRevenue: 1500, status: "ACTIVE" },
  { customerName: "D", monthlyRevenue: 300, status: "CHURNED" }
])` ➔

  `{
  churnRate: 50.00,
  revenueLostToChurn: 800,
  revenueChurnRate: 24.24,
  churnSeverity: "SEVERE"
}`

---

## 🧩 PROBLEM–05: 📋 Comprehensive Revenue Health Report

⚠️ **Function Name:** `buildRevenueHealthReport()`

| Input      | `currentMonthRevenue` (array of objects), `previousMonthRevenue` (array of objects) |
| :--------- | :---------------------------------------------------------------------------------- |
| **Output** | object                                                                              |

**Rules:**

Both arrays — non-empty, each entry: `{ customerName (string), revenue (number, >0) }`

**Report Rules:**

- `currentTotal` → sum of `currentMonthRevenue` amounts
- `previousTotal` → sum of `previousMonthRevenue` amounts
- `growthPercent` → `((currentTotal - previousTotal) / previousTotal) × 100` (rounded to 2 decimal places)
- `newCustomers` → array of customer names present in `currentMonthRevenue` but NOT in `previousMonthRevenue`
- `lostCustomers` → array of customer names present in `previousMonthRevenue` but NOT in `currentMonthRevenue`
- `retainedCustomers` → array of customer names present in BOTH
- `retentionRate` → `(retainedCustomers.length / previousMonthRevenue distinct customer count) × 100` (rounded to 2 decimal places)
- `healthStatus`:
  - `growthPercent >= 10 AND retentionRate >= 80` → `"THRIVING"`
  - `growthPercent >= 0 AND retentionRate >= 60` → `"STABLE"`
  - otherwise → `"AT_RISK"`

| Challenge 📢 | Return `{ currentTotal, previousTotal, growthPercent, newCustomers, lostCustomers, retentionRate, healthStatus }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `buildRevenueHealthReport(
  [{ customerName: "A", revenue: 1000 }, { customerName: "B", revenue: 2000 }, { customerName: "C", revenue: 500 }],
  [{ customerName: "A", revenue: 900 }, { customerName: "B", revenue: 1800 }, { customerName: "D", revenue: 700 }]
)` ➔

  `{
  currentTotal: 3500,
  previousTotal: 3400,
  growthPercent: 2.94,
  newCustomers: ["C"],
  lostCustomers: ["D"],
  retentionRate: 66.67,
  healthStatus: "STABLE"
}`

---
