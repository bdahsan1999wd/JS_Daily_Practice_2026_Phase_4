# 🎓 JS DAILY PRACTICE – DAY-156

📅 **Goal:** Sales Report Generator (Advanced Array Processing Engine)
🎯 **Focus:** map() • filter() • reduce() • find() • some() / every() • sort()

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 💵 Sales Commission Calculator

⚠️ **Function Name:** `calculateSalesCommission()`

| Input      | `salesRecords` (array of objects) |
| :--------- | :-------------------------------- |
| **Output** | array of objects                  |

**Rules:**

Each sales record object:

- `salesperson` (string)
- `region` (string)
- `totalSales` (number, ≥ 0)

**Commission Slab:**

| Total Sales       | Commission Rate |
| :---------------- | :-------------- |
| > 500,000         | 15%             |
| 200,001 – 500,000 | 10%             |
| 100,001 – 200,000 | 7%              |
| 50,001 – 100,000  | 5%              |
| ≤ 50,000          | 2%              |

- `commissionAmount = totalSales × commissionRate`
- `takeHome = totalSales + commissionAmount`

| Challenge 📢 | Return array with `salesperson`, `region`, `totalSales`, `commissionRate` (as percentage number e.g. 10), `commissionAmount`, `takeHome` — monetary values rounded to 2 decimal places. If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `calculateSalesCommission([
  { salesperson: "Rafiq", region: "North", totalSales: 250000 },
  { salesperson: "Mili", region: "South", totalSales: 45000 }
])` ➔

  `[
  { salesperson: "Rafiq", region: "North", totalSales: 250000, commissionRate: 10, commissionAmount: 25000, takeHome: 275000 },
  { salesperson: "Mili", region: "South", totalSales: 45000, commissionRate: 2, commissionAmount: 900, takeHome: 45900 }
]`

---

## 🧩 PROBLEM–02: 🔍 Regional Sales Filter

⚠️ **Function Name:** `filterSalesByRegionAndTarget()`

| Input      | `salesRecords` (array of objects), `region` (string), `targetAmount` (number) |
| :--------- | :---------------------------------------------------------------------------- |
| **Output** | array of objects                                                              |

**Rules:**

Each sales record object:

- `salesperson` (string)
- `region` (string)
- `totalSales` (number, ≥ 0)
- `month` (string, e.g. "January")

**Filter Rules:**

- `region` must be a non-empty string
- `targetAmount` must be a number ≥ 0
- Filter by matching `region` (case-insensitive)
- From filtered list, keep only records where `totalSales ≥ targetAmount`
- Sort result by `totalSales` descending

| Challenge 📢 | Return filtered array with all original fields. If no match → return `[]`. If invalid input → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `filterSalesByRegionAndTarget([
  { salesperson: "Alam", region: "North", totalSales: 300000, month: "January" },
  { salesperson: "Bina", region: "North", totalSales: 80000, month: "February" },
  { salesperson: "Cyrus", region: "South", totalSales: 500000, month: "January" }
], "north", 100000)` ➔

  `[
  { salesperson: "Alam", region: "North", totalSales: 300000, month: "January" }
]`

---

## 🧩 PROBLEM–03: 📊 Monthly Sales Summary

⚠️ **Function Name:** `generateMonthlySummary()`

| Input      | `salesRecords` (array of objects) |
| :--------- | :-------------------------------- |
| **Output** | object                            |

**Rules:**

Each sales record object:

- `salesperson` (string)
- `region` (string)
- `totalSales` (number, ≥ 0)
- `month` (string)

**Requirements:**

- `totalRevenue` → sum of all `totalSales`
- `averageSales` → mean of all `totalSales` (rounded to 2 decimal places)
- `topSalesperson` → record with highest `totalSales`
- `worstSalesperson` → record with lowest `totalSales`
- `regionWiseRevenue` → object: each key = region, value = sum of `totalSales` for that region
- `monthWiseRevenue` → object: each key = month, value = sum of `totalSales` for that month

All monetary values rounded to 2 decimal places.

| Challenge 📢 | Return full summary object. If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------- |

**Sample Input & Output:**

- `generateMonthlySummary([
  { salesperson: "Arif", region: "North", totalSales: 200000, month: "January" },
  { salesperson: "Bela", region: "South", totalSales: 150000, month: "January" },
  { salesperson: "Cena", region: "North", totalSales: 350000, month: "February" }
])` ➔

  `{
  totalRevenue: 700000,
  averageSales: 233333.33,
  topSalesperson: { salesperson: "Cena", region: "North", totalSales: 350000, month: "February" },
  worstSalesperson: { salesperson: "Bela", region: "South", totalSales: 150000, month: "January" },
  regionWiseRevenue: { North: 550000, South: 150000 },
  monthWiseRevenue: { January: 350000, February: 350000 }
}`

---

## 🧩 PROBLEM–04: ✅ Sales Target Validator

⚠️ **Function Name:** `validateSalesTargets()`

| Input      | `salesRecords` (array of objects) |
| :--------- | :-------------------------------- |
| **Output** | object                            |

**Rules:**

Each sales record object:

- `salesperson` (string)
- `totalSales` (number, ≥ 0)
- `salesTarget` (number, > 0)
- `region` (string)

**Validation Rules:**

- `allTargetsMet` → `every()` — true if ALL salespersons have `totalSales ≥ salesTarget`
- `anyTargetMissed` → `some()` — true if ANY salesperson has `totalSales < salesTarget`
- `targetMetList` → array of `salesperson` names where `totalSales ≥ salesTarget`
- `targetMissedList` → array of `salesperson` names where `totalSales < salesTarget`

| Challenge 📢 | Return `{ allTargetsMet, anyTargetMissed, targetMetList, targetMissedList }`. If invalid input → `"Invalid Input"` |
| :----------- | :----------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `validateSalesTargets([
  { salesperson: "Dina", totalSales: 300000, salesTarget: 250000, region: "East" },
  { salesperson: "Elan", totalSales: 100000, salesTarget: 200000, region: "West" },
  { salesperson: "Fara", totalSales: 400000, salesTarget: 400000, region: "North" }
])` ➔

  `{
  allTargetsMet: false,
  anyTargetMissed: true,
  targetMetList: ["Dina", "Fara"],
  targetMissedList: ["Elan"]
}`

---

## 🧩 PROBLEM–05: 🏆 Sales Leaderboard Engine

⚠️ **Function Name:** `generateSalesLeaderboard()`

| Input      | `salesRecords` (array of objects) |
| :--------- | :-------------------------------- |
| **Output** | array of objects                  |

**Rules:**

Each sales record object:

- `salesperson` (string)
- `region` (string)
- `totalSales` (number, ≥ 0)
- `dealsCount` (number, integer, ≥ 0)

**Ranking Rules:**

- Rank by `totalSales` descending
- If tie → higher `dealsCount` wins
- If still tie → same rank (shared rank)

**Performance Title:**

| Total Sales       | Title           |
| :---------------- | :-------------- |
| > 500,000         | "STAR SELLER"   |
| 200,001 – 500,000 | "TOP PERFORMER" |
| 100,001 – 200,000 | "ACHIEVER"      |
| 50,001 – 100,000  | "CONTENDER"     |
| ≤ 50,000          | "TRAINEE"       |

| Challenge 📢 | Return array with `salesperson`, `region`, `totalSales`, `rank`, `title`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `generateSalesLeaderboard([
  { salesperson: "Gani", region: "North", totalSales: 600000, dealsCount: 30 },
  { salesperson: "Hana", region: "East", totalSales: 180000, dealsCount: 15 },
  { salesperson: "Ivan", region: "West", totalSales: 180000, dealsCount: 20 }
])` ➔

  `[
  { salesperson: "Gani", region: "North", totalSales: 600000, rank: 1, title: "STAR SELLER" },
  { salesperson: "Ivan", region: "West", totalSales: 180000, rank: 2, title: "ACHIEVER" },
  { salesperson: "Hana", region: "East", totalSales: 180000, rank: 3, title: "ACHIEVER" }
]`

---
