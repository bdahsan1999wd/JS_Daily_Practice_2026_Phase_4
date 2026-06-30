# 🎓 JS DAILY PRACTICE – DAY-182

📅 **Goal:** Analytics System (Multi-Function System Design — Mini Backend Simulation)
🎯 **Focus:** Function Composition • Modular Design • Multi-Layer Architecture • Data Flow Simulation

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.
- This day's problems work TOGETHER as a system — later problems may reuse the data shape produced by earlier ones.

---

## 🧩 PROBLEM–01: 💰 revenueReport()

⚠️ **Function Name:** `revenueReport()`

| Input      | `salesData` (array of objects), `groupBy` (string) |
| :--------- | :------------------------------------------------- |
| **Output** | object                                             |

**Rules:**

`salesData` — non-empty array, each entry:

- `orderId` (string)
- `amount` (number, > 0)
- `region` (string)
- `month` (string)

`groupBy` must be `"region"` or `"month"`

**Report Rules:**

- `totalRevenue` → sum of all `amount`
- `transactionCount` → total count
- `averageOrderValue` → `totalRevenue / transactionCount` (rounded to 2 decimal places)
- `breakdown` → object: each key is the unique value of the `groupBy` field, value is the sum of `amount` for that group

| Challenge 📢 | Return `{ totalRevenue, transactionCount, averageOrderValue, breakdown }`. If invalid input → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `revenueReport([
  { orderId: "O1", amount: 500, region: "Dhaka", month: "Jan" },
  { orderId: "O2", amount: 300, region: "Khulna", month: "Jan" },
  { orderId: "O3", amount: 700, region: "Dhaka", month: "Feb" }
], "region")` ➔

  `{
  totalRevenue: 1500,
  transactionCount: 3,
  averageOrderValue: 500.00,
  breakdown: { Dhaka: 1200, Khulna: 300 }
}`

---

## 🧩 PROBLEM–02: 🏆 topSellingProduct()

⚠️ **Function Name:** `topSellingProduct()`

| Input      | `orderItems` (array of objects), `metric` (string) |
| :--------- | :------------------------------------------------- |
| **Output** | object                                             |

**Rules:**

`orderItems` — non-empty array, each entry:

- `productName` (string)
- `qtySold` (number, integer, ≥ 0)
- `revenue` (number, ≥ 0)

`metric` must be `"qty"` or `"revenue"`

**Ranking Rules:**

- Aggregate all entries by `productName` — sum `qtySold` and `revenue` for duplicate product names
- Rank aggregated products by the chosen `metric` (descending)
- `topProduct` → the product object with the highest value of `metric` (after aggregation): `{ productName, totalQtySold, totalRevenue }`
- `rankedList` → full array of aggregated products sorted descending by `metric`, each `{ productName, totalQtySold, totalRevenue }`

| Challenge 📢 | Return `{ topProduct, rankedList }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------ |

**Sample Input & Output:**

- `topSellingProduct([
  { productName: "Mug", qtySold: 10, revenue: 2000 },
  { productName: "Plate", qtySold: 5, revenue: 2500 },
  { productName: "Mug", qtySold: 8, revenue: 1600 }
], "qty")` ➔

  `{
  topProduct: { productName: "Mug", totalQtySold: 18, totalRevenue: 3600 },
  rankedList: [
    { productName: "Mug", totalQtySold: 18, totalRevenue: 3600 },
    { productName: "Plate", totalQtySold: 5, totalRevenue: 2500 }
  ]
}`

---

## 🧩 PROBLEM–03: 👑 bestCustomer()

⚠️ **Function Name:** `bestCustomer()`

| Input      | `customerOrders` (array of objects) |
| :--------- | :---------------------------------- |
| **Output** | object                              |

**Rules:**

`customerOrders` — non-empty array, each entry:

- `customerName` (string)
- `orderAmount` (number, > 0)

**Best Customer Rules:**

- Aggregate by `customerName`: `totalSpent` (sum of `orderAmount`), `orderCount` (number of orders)
- `bestCustomer` → customer with the highest `totalSpent`: `{ customerName, totalSpent, orderCount, avgOrderValue }`
  - `avgOrderValue = totalSpent / orderCount` (rounded to 2 decimal places)
- `loyaltyTier` for the best customer based on `orderCount`:
  - ≥ 5 → `"VIP"`
  - 2 – 4 → `"REGULAR"`
  - 1 → `"NEW"`

| Challenge 📢 | Return `{ bestCustomer, loyaltyTier }` where `bestCustomer` includes `loyaltyTier`'s base fields. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `bestCustomer([
  { customerName: "Tania", orderAmount: 500 },
  { customerName: "Tania", orderAmount: 300 },
  { customerName: "Rafi", orderAmount: 1000 }
])` ➔

  `{
  bestCustomer: { customerName: "Rafi", totalSpent: 1000, orderCount: 1, avgOrderValue: 1000.00 },
  loyaltyTier: "NEW"
}`

---

## 🧩 PROBLEM–04: 📊 trendAnalyzer()

⚠️ **Function Name:** `trendAnalyzer()`

| Input      | `monthlyRevenue` (array of objects) |
| :--------- | :---------------------------------- |
| **Output** | object                              |

**Rules:**

`monthlyRevenue` — non-empty array, ORDERED chronologically, each entry:

- `month` (string)
- `revenue` (number, ≥ 0)

Must have at least 2 entries to compute trend.

**Trend Rules:**

- For each month (starting from the 2nd), compute `growthPercent` compared to the PREVIOUS month:
  - `growthPercent = ((current - previous) / previous) × 100` (rounded to 2 decimal places)
  - If `previous === 0` → `growthPercent = null` (avoid division by zero), and treat trend for that entry as `"N/A"`
- `monthlyGrowth` → array of `{ month, growthPercent }` (first month excluded, since it has no previous)
- `overallTrend`:
  - Compare LAST month's revenue to FIRST month's revenue
  - `last > first` → `"UPWARD"`
  - `last < first` → `"DOWNWARD"`
  - `last === first` → `"STABLE"`

| Challenge 📢 | Return `{ monthlyGrowth, overallTrend }`. If fewer than 2 entries or invalid input → `"Invalid Input"` |
| :----------- | :----------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `trendAnalyzer([
  { month: "Jan", revenue: 10000 },
  { month: "Feb", revenue: 12000 },
  { month: "Mar", revenue: 9000 }
])` ➔

  `{
  monthlyGrowth: [
    { month: "Feb", growthPercent: 20.00 },
    { month: "Mar", growthPercent: -25.00 }
  ],
  overallTrend: "DOWNWARD"
}`

---

## 🧩 PROBLEM–05: 🏗️ runAnalyticsDashboard()

⚠️ **Function Name:** `runAnalyticsDashboard()`

| Input      | `salesData` (array of objects), `customerOrders` (array of objects), `monthlyRevenue` (array of objects) |
| :--------- | :------------------------------------------------------------------------------------------------------- |
| **Output** | object                                                                                                   |

**Rules:**

This problem composes the previous functions into one dashboard.

`salesData` — same shape as Problem-01 (use `groupBy = "region"`)
`customerOrders` — same shape as Problem-03
`monthlyRevenue` — same shape as Problem-04

All three inputs must be valid non-empty arrays (monthlyRevenue needs ≥ 2 entries) — if any fails validation → `"Invalid Input"`

**Dashboard Composition Rules:**

- Run the equivalent of `revenueReport()` logic on `salesData` (grouped by region) → call this `revenue`
- Run the equivalent of `bestCustomer()` logic on `customerOrders` → call this `topCustomer`
- Run the equivalent of `trendAnalyzer()` logic on `monthlyRevenue` → call this `trend`
- Build `executiveSummary` using these results:
  - `` `Total revenue: ${revenue.totalRevenue}. Top customer: ${topCustomer.bestCustomer.customerName} (${topCustomer.loyaltyTier}). Trend: ${trend.overallTrend}.` ``

| Challenge 📢 | Return `{ revenue, topCustomer, trend, executiveSummary }`. If invalid input → `"Invalid Input"` |
| :----------- | :----------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `runAnalyticsDashboard(
  [
    { orderId: "O1", amount: 500, region: "Dhaka", month: "Jan" },
    { orderId: "O2", amount: 700, region: "Khulna", month: "Feb" }
  ],
  [
    { customerName: "Tania", orderAmount: 500 },
    { customerName: "Tania", orderAmount: 300 },
    { customerName: "Tania", orderAmount: 400 }
  ],
  [
    { month: "Jan", revenue: 10000 },
    { month: "Feb", revenue: 11000 }
  ]
)` ➔

  `{
  revenue: {
    totalRevenue: 1200,
    transactionCount: 2,
    averageOrderValue: 600.00,
    breakdown: { Dhaka: 500, Khulna: 700 }
  },
  topCustomer: {
    bestCustomer: { customerName: "Tania", totalSpent: 1200, orderCount: 3, avgOrderValue: 400.00 },
    loyaltyTier: "REGULAR"
  },
  trend: {
    monthlyGrowth: [{ month: "Feb", growthPercent: 10.00 }],
    overallTrend: "UPWARD"
  },
  executiveSummary: "Total revenue: 1200. Top customer: Tania (REGULAR). Trend: UPWARD."
}`

---
