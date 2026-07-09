# 🎓 JS DAILY PRACTICE – DAY-191

📅 **Goal:** Expense Analysis System (Reporting & Analytics Engine)
🎯 **Focus:** Data Aggregation • KPI Calculation • Statistical Summary Generation

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 🧾 Expense Category Aggregator

⚠️ **Function Name:** `aggregateExpensesByCategory()`

| Input      | `expenses` (array of objects) |
| :--------- | :---------------------------- |
| **Output** | object                        |

**Rules:**

`expenses` — non-empty array, each entry:

- `category` (string: e.g. "Rent", "Utilities", "Salaries", "Marketing")
- `amount` (number, > 0)

**Aggregation Rules:**

- Group by `category`, sum `amount` per category
- `totalExpenses` → sum of all amounts
- `categoryBreakdown` → object: each key is category, value is `{ amount, percentOfTotal }`
  - `percentOfTotal = (categoryAmount / totalExpenses) × 100` (rounded to 2 decimal places)
- `largestCategory` → category name with highest total amount

| Challenge 📢 | Return `{ totalExpenses, categoryBreakdown, largestCategory }`. If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `aggregateExpensesByCategory([
  { category: "Rent", amount: 40000 },
  { category: "Salaries", amount: 100000 },
  { category: "Utilities", amount: 10000 }
])` ➔

  `{
  totalExpenses: 150000,
  categoryBreakdown: {
    Rent: { amount: 40000, percentOfTotal: 26.67 },
    Salaries: { amount: 100000, percentOfTotal: 66.67 },
    Utilities: { amount: 10000, percentOfTotal: 6.67 }
  },
  largestCategory: "Salaries"
}`

---

## 🧩 PROBLEM–02: 💸 Budget Variance Analyzer

⚠️ **Function Name:** `analyzeBudgetVariance()`

| Input      | `budgetedExpenses` (object), `actualExpenses` (object) |
| :--------- | :----------------------------------------------------- |
| **Output** | object                                                 |

**Rules:**

`budgetedExpenses` object — each key is a category, value is budgeted amount (number, > 0)
`actualExpenses` object — each key is a category, value is actual spent amount (number, ≥ 0)

Both objects must have the SAME set of category keys → else `"Invalid Input"`

**Variance Rules:**

- For each category: `variance = actual - budgeted`
- `variancePercent = (variance / budgeted) × 100` (rounded to 2 decimal places)
- `status`:
  - `variance > 0` → `"OVER_BUDGET"`
  - `variance < 0` → `"UNDER_BUDGET"`
  - `variance === 0` → `"ON_BUDGET"`
- `categoryVariance` → object: each key is category, value is `{ budgeted, actual, variance, variancePercent, status }`
- `totalOverBudgetAmount` → sum of POSITIVE variances only (categories that overspent)
- `overBudgetCategories` → array of category names with status `"OVER_BUDGET"`

| Challenge 📢 | Return `{ categoryVariance, totalOverBudgetAmount, overBudgetCategories }`. If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `analyzeBudgetVariance(
  { Marketing: 20000, Travel: 5000 },
  { Marketing: 25000, Travel: 4000 }
)` ➔

  `{
  categoryVariance: {
    Marketing: { budgeted: 20000, actual: 25000, variance: 5000, variancePercent: 25.00, status: "OVER_BUDGET" },
    Travel: { budgeted: 5000, actual: 4000, variance: -1000, variancePercent: -20.00, status: "UNDER_BUDGET" }
  },
  totalOverBudgetAmount: 5000,
  overBudgetCategories: ["Marketing"]
}`

---

## 🧩 PROBLEM–03: 📊 Fixed vs Variable Cost Splitter

⚠️ **Function Name:** `splitFixedVariableCosts()`

| Input      | `expenses` (array of objects), `revenueForPeriod` (number) |
| :--------- | :--------------------------------------------------------- |
| **Output** | object                                                     |

**Rules:**

`expenses` — non-empty array, each entry:

- `category` (string)
- `amount` (number, > 0)
- `costType` (string: "FIXED" or "VARIABLE")

`revenueForPeriod` must be a number, > 0

**Cost Split Rules:**

- `totalFixedCosts` → sum of amounts where `costType === "FIXED"`
- `totalVariableCosts` → sum of amounts where `costType === "VARIABLE"`
- `totalCosts` → sum of both
- `breakEvenPoint` → `totalFixedCosts / (1 - (totalVariableCosts / revenueForPeriod))` (rounded to 2 decimal places) — this represents the revenue needed to cover all costs
- `contributionMarginPercent` → `((revenueForPeriod - totalVariableCosts) / revenueForPeriod) × 100` (rounded to 2 decimal places)
- `operatingMargin` → `((revenueForPeriod - totalCosts) / revenueForPeriod) × 100` (rounded to 2 decimal places)

| Challenge 📢 | Return `{ totalFixedCosts, totalVariableCosts, contributionMarginPercent, operatingMargin, breakEvenPoint }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `splitFixedVariableCosts([
  { category: "Rent", amount: 20000, costType: "FIXED" },
  { category: "Salaries", amount: 30000, costType: "FIXED" },
  { category: "Materials", amount: 15000, costType: "VARIABLE" }
], 100000)` ➔

  `{
  totalFixedCosts: 50000,
  totalVariableCosts: 15000,
  contributionMarginPercent: 85.00,
  operatingMargin: 35.00,
  breakEvenPoint: 58823.53
}`

---

## 🧩 PROBLEM–04: 📉 Expense Trend Detector

⚠️ **Function Name:** `detectExpenseTrend()`

| Input      | `monthlyExpenses` (array of objects) |
| :--------- | :----------------------------------- |
| **Output** | object                               |

**Rules:**

`monthlyExpenses` — non-empty array, ORDERED chronologically, ≥ 3 entries, each:

- `month` (string)
- `totalAmount` (number, > 0)

**Trend Rules:**

- Compute consecutive percent changes: `changePercent[i] = ((totalAmount[i+1] - totalAmount[i]) / totalAmount[i]) × 100` (rounded to 2 decimal places)
- `averageMonthlyChange` → mean of all `changePercent` values (rounded to 2 decimal places)
- `isEscalating` → true if `averageMonthlyChange > 5` (expenses growing more than 5% per month on average)
- `projectedNextMonth` → `lastMonthAmount × (1 + averageMonthlyChange/100)` (rounded to 2 decimal places)
- `trendAlert`:
  - `isEscalating` → `"WARNING: Expenses are escalating rapidly"`
  - `averageMonthlyChange < -5` → `"NOTICE: Expenses are decreasing significantly"`
  - otherwise → `"Expenses are relatively stable"`

| Challenge 📢 | Return `{ averageMonthlyChange, isEscalating, projectedNextMonth, trendAlert }`. If fewer than 3 entries or invalid input → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `detectExpenseTrend([
  { month: "Jan", totalAmount: 50000 },
  { month: "Feb", totalAmount: 55000 },
  { month: "Mar", totalAmount: 60500 }
])` ➔

  `{
  averageMonthlyChange: 10.00,
  isEscalating: true,
  projectedNextMonth: 66550.00,
  trendAlert: "WARNING: Expenses are escalating rapidly"
}`

---

## 🧩 PROBLEM–05: 📋 Comprehensive Expense Health Report

⚠️ **Function Name:** `buildExpenseHealthReport()`

| Input      | `expenses` (array of objects), `revenue` (number) |
| :--------- | :------------------------------------------------ |
| **Output** | object                                            |

**Rules:**

`expenses` — non-empty array, each entry: `{ category (string), amount (number, >0), isEssential (boolean) }`
`revenue` must be a number, > 0

**Report Rules:**

- `totalExpenses` → sum of all amounts
- `essentialExpenses` → sum of amounts where `isEssential === true`
- `nonEssentialExpenses` → sum of amounts where `isEssential === false`
- `expenseToRevenueRatio` → `(totalExpenses / revenue) × 100` (rounded to 2 decimal places)
- `nonEssentialPercent` → `(nonEssentialExpenses / totalExpenses) × 100` (rounded to 2 decimal places)
- `financialHealth`:
  - `expenseToRevenueRatio <= 60` → `"HEALTHY"`
  - `expenseToRevenueRatio <= 85` → `"CAUTION"`
  - `expenseToRevenueRatio > 85` → `"CRITICAL"`
- `costCuttingOpportunity` → array of category names where `isEssential === false`, sorted by `amount` descending
- `reportSummary` → `` `Expenses are ${expenseToRevenueRatio}% of revenue (${financialHealth}). ${nonEssentialPercent}% of spending is non-essential.` ``

| Challenge 📢 | Return `{ expenseToRevenueRatio, financialHealth, costCuttingOpportunity, reportSummary }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `buildExpenseHealthReport([
  { category: "Rent", amount: 30000, isEssential: true },
  { category: "Entertainment Budget", amount: 8000, isEssential: false },
  { category: "Office Snacks", amount: 2000, isEssential: false }
], 80000)` ➔

  `{
  expenseToRevenueRatio: 50.00,
  financialHealth: "HEALTHY",
  costCuttingOpportunity: ["Entertainment Budget", "Office Snacks"],
  reportSummary: "Expenses are 50% of revenue (HEALTHY). 25% of spending is non-essential."
}`

---
