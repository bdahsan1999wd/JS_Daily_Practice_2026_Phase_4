# 🎓 JS DAILY PRACTICE – DAY-187

📅 **Goal:** Monthly Sales Report (Reporting & Analytics Engine)
🎯 **Focus:** Data Aggregation • KPI Calculation • Statistical Summary Generation

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 📅 Daily Sales Aggregator

⚠️ **Function Name:** `aggregateDailySales()`

| Input      | `transactions` (array of objects) |
| :--------- | :-------------------------------- |
| **Output** | object                            |

**Rules:**

`transactions` — non-empty array, each entry:

- `date` (string, format "YYYY-MM-DD")
- `amount` (number, > 0)

**Aggregation Rules:**

- Group transactions by `date`
- For each date, compute `totalSales` (sum of amounts) and `transactionCount`
- `dailyBreakdown` → object: each key is a date, value is `{ totalSales, transactionCount }`
- `bestDay` → the date with highest `totalSales`
- `worstDay` → the date with lowest `totalSales`

| Challenge 📢 | Return `{ dailyBreakdown, bestDay, worstDay }`. If invalid input → `"Invalid Input"` |
| :----------- | :----------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `aggregateDailySales([
  { date: "2025-01-01", amount: 500 },
  { date: "2025-01-01", amount: 300 },
  { date: "2025-01-02", amount: 200 }
])` ➔

  `{
  dailyBreakdown: {
    "2025-01-01": { totalSales: 800, transactionCount: 2 },
    "2025-01-02": { totalSales: 200, transactionCount: 1 }
  },
  bestDay: "2025-01-01",
  worstDay: "2025-01-02"
}`

---

## 🧩 PROBLEM–02: 📈 Category Performance KPI

⚠️ **Function Name:** `calculateCategoryKPI()`

| Input      | `salesRecords` (array of objects), `monthlyTargets` (object) |
| :--------- | :----------------------------------------------------------- |
| **Output** | object                                                       |

**Rules:**

`salesRecords` — non-empty array, each entry:

- `category` (string)
- `amount` (number, > 0)

`monthlyTargets` object — each key is a category, value is the target amount (number, > 0)

**KPI Rules:**

- For each category present in `salesRecords`, sum `amount` → `actualSales`
- `target` → from `monthlyTargets[category]` (if category not in `monthlyTargets`, use `?? 0` as fallback — meaning no target set)
- `achievementPercent` → `(actualSales / target) × 100` rounded to 2 decimal places (if `target` is 0, set `achievementPercent` to `null`)
- `kpiStatus`:
  - `achievementPercent === null` → `"NO_TARGET_SET"`
  - `achievementPercent >= 100` → `"TARGET_MET"`
  - `achievementPercent >= 75` → `"ON_TRACK"`
  - `achievementPercent < 75` → `"BEHIND"`

| Challenge 📢 | Return object where each key is a category and value is `{ actualSales, target, achievementPercent, kpiStatus }`. If invalid input → `"Invalid Input"` |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `calculateCategoryKPI([
  { category: "Electronics", amount: 50000 },
  { category: "Electronics", amount: 30000 },
  { category: "Clothing", amount: 15000 }
], { Electronics: 100000, Clothing: 20000 })` ➔

  `{
  Electronics: { actualSales: 80000, target: 100000, achievementPercent: 80.00, kpiStatus: "ON_TRACK" },
  Clothing: { actualSales: 15000, target: 20000, achievementPercent: 75.00, kpiStatus: "ON_TRACK" }
}`

---

## 🧩 PROBLEM–03: 📊 Sales Distribution Statistics

⚠️ **Function Name:** `calculateSalesStatistics()`

| Input      | `salesAmounts` (array of numbers) |
| :--------- | :-------------------------------- |
| **Output** | object                            |

**Rules:**

`salesAmounts` — non-empty array of numbers, each > 0

**Statistics Rules:**

- `mean` → average (rounded to 2 decimal places)
- `median` → middle value when sorted (if even count, average of two middle values)
- `variance` → average of squared differences from mean: `sum((x - mean)^2) / count` (rounded to 2 decimal places)
- `standardDeviation` → `Math.sqrt(variance)` (rounded to 2 decimal places)
- `range` → `max - min`

| Challenge 📢 | Return `{ mean, median, variance, standardDeviation, range }`. If invalid input → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `calculateSalesStatistics([100, 200, 300, 400, 500])` ➔

  `{
  mean: 300.00,
  median: 300,
  variance: 20000.00,
  standardDeviation: 141.42,
  range: 400
}`

---

## 🧩 PROBLEM–04: 📉 Period-over-Period Comparator

⚠️ **Function Name:** `comparePeriodSales()`

| Input      | `currentPeriod` (array of objects), `previousPeriod` (array of objects) |
| :--------- | :---------------------------------------------------------------------- |
| **Output** | object                                                                  |

**Rules:**

Both arrays — non-empty, each entry: `{ category (string), amount (number, >0) }`

**Comparison Rules:**

- `currentTotal` → sum of all `amount` in `currentPeriod`
- `previousTotal` → sum of all `amount` in `previousPeriod`
- `changeAmount = currentTotal - previousTotal`
- `changePercent = (changeAmount / previousTotal) × 100` (rounded to 2 decimal places; if `previousTotal` is 0, set to `null`)
- `trend`:
  - `changeAmount > 0` → `"GROWTH"`
  - `changeAmount < 0` → `"DECLINE"`
  - `changeAmount === 0` → `"FLAT"`
- `categoryComparison` → object: for each category present in EITHER period, `{ current, previous, change }` (use `0` for a period where the category is missing)

| Challenge 📢 | Return `{ currentTotal, previousTotal, changeAmount, changePercent, trend, categoryComparison }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `comparePeriodSales(
  [{ category: "Food", amount: 30000 }, { category: "Drinks", amount: 10000 }],
  [{ category: "Food", amount: 25000 }]
)` ➔

  `{
  currentTotal: 40000,
  previousTotal: 25000,
  changeAmount: 15000,
  changePercent: 60.00,
  trend: "GROWTH",
  categoryComparison: {
    Food: { current: 30000, previous: 25000, change: 5000 },
    Drinks: { current: 10000, previous: 0, change: 10000 }
  }
}`

---

## 🧩 PROBLEM–05: 📋 Comprehensive Monthly Report Builder

⚠️ **Function Name:** `buildMonthlyReport()`

| Input      | `salesRecords` (array of objects), `monthlyTarget` (number) |
| :--------- | :---------------------------------------------------------- |
| **Output** | object                                                      |

**Rules:**

`salesRecords` — non-empty array, each entry: `{ date (string), category (string), amount (number, >0) }`
`monthlyTarget` must be a number > 0

**Report Rules:**

- `totalRevenue` → sum of all `amount`
- `totalTransactions` → count
- `averageTransactionValue` → `totalRevenue / totalTransactions` (rounded to 2 decimal places)
- `targetAchievementPercent` → `(totalRevenue / monthlyTarget) × 100` (rounded to 2 decimal places)
- `topCategory` → category with highest total sales (sum amounts per category, find max)
- `performanceGrade`:
  - `targetAchievementPercent >= 100` → `"A"`
  - `targetAchievementPercent >= 80` → `"B"`
  - `targetAchievementPercent >= 60` → `"C"`
  - `targetAchievementPercent < 60` → `"D"`
- `reportSummary` → string: `` `Total revenue ${totalRevenue} from ${totalTransactions} transaction(s). Target achievement: ${targetAchievementPercent}% (Grade ${performanceGrade}). Top category: ${topCategory}.` ``

| Challenge 📢 | Return `{ totalRevenue, totalTransactions, averageTransactionValue, targetAchievementPercent, topCategory, performanceGrade, reportSummary }`. If invalid input → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `buildMonthlyReport([
  { date: "2025-01-01", category: "Electronics", amount: 50000 },
  { date: "2025-01-02", category: "Clothing", amount: 20000 },
  { date: "2025-01-03", category: "Electronics", amount: 30000 }
], 90000)` ➔

  `{
  totalRevenue: 100000,
  totalTransactions: 3,
  averageTransactionValue: 33333.33,
  targetAchievementPercent: 111.11,
  topCategory: "Electronics",
  performanceGrade: "A",
  reportSummary: "Total revenue 100000 from 3 transaction(s). Target achievement: 111.11% (Grade A). Top category: Electronics."
}`

---
