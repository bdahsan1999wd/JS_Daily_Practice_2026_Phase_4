# 🎓 JS DAILY PRACTICE – DAY-193

📅 **Goal:** Comprehensive Business Intelligence Dashboard (Reporting & Analytics Engine)
🎯 **Focus:** Data Aggregation • KPI Calculation • Statistical Summary Generation

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 📦 Product Profitability Analyzer

⚠️ **Function Name:** `analyzeProductProfitability()`

| Input      | `products` (array of objects) |
| :--------- | :--------------------------------- |
| **Output** | object                              |

**Rules:**

`products` — non-empty array, each entry:
- `productName` (string)
- `unitsSold` (number, integer, ≥ 0)
- `sellingPrice` (number, > 0)
- `costPrice` (number, > 0)

**Profitability Rules:**

- For each product: `revenue = unitsSold × sellingPrice`, `cost = unitsSold × costPrice`, `profit = revenue - cost`
- `profitMarginPercent = (profit / revenue) × 100` (rounded to 2 decimal places; if `revenue` is 0 → `0`)
- `productBreakdown` → array of `{ productName, revenue, profit, profitMarginPercent }`
- `mostProfitableProduct` → product with highest `profit`
- `leastProfitableProduct` → product with lowest `profit`
- `overallProfitMargin` → `(sum of all profit / sum of all revenue) × 100` (rounded to 2 decimal places)

| Challenge 📢 | Return `{ productBreakdown, mostProfitableProduct, leastProfitableProduct, overallProfitMargin }`. If invalid input → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `analyzeProductProfitability([
  { productName: "Mug", unitsSold: 100, sellingPrice: 200, costPrice: 120 },
  { productName: "Plate", unitsSold: 50, sellingPrice: 300, costPrice: 250 }
])` ➔

  **Manual Verify:**
  - Mug: revenue=100×200=20000, cost=100×120=12000, profit=20000-12000=8000, margin=8000/20000×100=40.00
  - Plate: revenue=50×300=15000, cost=50×250=12500, profit=15000-12500=2500, margin=2500/15000×100=16.67
  - mostProfitableProduct = Mug(8000), leastProfitableProduct = Plate(2500)
  - overallProfitMargin = (8000+2500)/(20000+15000)×100 = 10500/35000×100 = 30.00

  `{
  productBreakdown: [
    { productName: "Mug", revenue: 20000, profit: 8000, profitMarginPercent: 40.00 },
    { productName: "Plate", revenue: 15000, profit: 2500, profitMarginPercent: 16.67 }
  ],
  mostProfitableProduct: "Mug",
  leastProfitableProduct: "Plate",
  overallProfitMargin: 30.00
}`

---

## 🧩 PROBLEM–02: 🎯 Multi-KPI Scorecard Generator

⚠️ **Function Name:** `generateKPIScorecard()`

| Input      | `kpis` (array of objects) |
| :--------- | :----------------------------- |
| **Output** | object                          |

**Rules:**

`kpis` — non-empty array, each entry:
- `kpiName` (string)
- `actualValue` (number)
- `targetValue` (number, ≠ 0)
- `weight` (number, 0–1) — importance weight for this KPI

The sum of all `weight` values must equal 1 (within 0.01 tolerance) → else `"Invalid Input"`

**Scorecard Rules:**

- For each KPI: `achievementPercent = (actualValue / targetValue) × 100` (rounded to 2 decimal places) — cap at 100 for scoring purposes only (a KPI can't contribute more than its full weight, even if overachieved): use `Math.min(achievementPercent, 100)` for the weighted contribution
- `weightedScore = (cappedAchievementPercent / 100) × weight × 100` (rounded to 2 decimal places) — this is the points this KPI contributes out of 100
- `totalScore` → sum of all `weightedScore` values (rounded to 2 decimal places)
- `scorecardGrade`:
  - `totalScore >= 90` → `"A"`
  - `totalScore >= 75` → `"B"`
  - `totalScore >= 60` → `"C"`
  - `totalScore < 60` → `"D"`

| Challenge 📢 | Return `{ kpiDetails, totalScore, scorecardGrade }` where `kpiDetails` is array of `{ kpiName, achievementPercent, weightedScore }`. If invalid input or weights don't sum to 1 → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `generateKPIScorecard([
  { kpiName: "Revenue", actualValue: 120000, targetValue: 100000, weight: 0.5 },
  { kpiName: "CustomerSatisfaction", actualValue: 80, targetValue: 100, weight: 0.5 }
])` ➔

  **Manual Verify:**
  - weights sum = 0.5+0.5=1.0 ✓
  - Revenue: achievementPercent=120000/100000×100=120.00, capped=min(120,100)=100, weightedScore=(100/100)×0.5×100=50.00
  - CustomerSatisfaction: achievementPercent=80/100×100=80.00, capped=80 (no cap needed), weightedScore=(80/100)×0.5×100=40.00
  - totalScore = 50.00+40.00=90.00
  - 90.00 ≥90 → "A"

  `{
  kpiDetails: [
    { kpiName: "Revenue", achievementPercent: 120.00, weightedScore: 50.00 },
    { kpiName: "CustomerSatisfaction", achievementPercent: 80.00, weightedScore: 40.00 }
  ],
  totalScore: 90.00,
  scorecardGrade: "A"
}`

---

## 🧩 PROBLEM–03: 🔗 Correlation Pattern Finder

⚠️ **Function Name:** `findMetricCorrelation()`

| Input      | `dataPoints` (array of objects) |
| :--------- | :----------------------------------- |
| **Output** | object                                |

**Rules:**

`dataPoints` — non-empty array, ≥ 3 entries, each:
- `period` (string)
- `metricA` (number)
- `metricB` (number)

**Correlation Rules (simplified directional correlation, not full Pearson):**

- For each consecutive pair, determine if `metricA` and `metricB` moved in the SAME direction (both increased or both decreased) or OPPOSITE direction
- `sameDirectionCount` → count of consecutive pairs where both moved the same direction
- `oppositeDirectionCount` → count of consecutive pairs where they moved opposite directions
- `totalComparisons` → `dataPoints.length - 1`
- `correlationStrength` → `(sameDirectionCount / totalComparisons) × 100` (rounded to 2 decimal places)
- `relationship`:
  - `correlationStrength >= 70` → `"STRONG_POSITIVE"`
  - `correlationStrength >= 40` → `"WEAK_POSITIVE"`
  - `correlationStrength < 40` → `"NEGATIVE_OR_NONE"`

| Challenge 📢 | Return `{ sameDirectionCount, oppositeDirectionCount, correlationStrength, relationship }`. If fewer than 3 entries or invalid input → `"Invalid Input"` |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `findMetricCorrelation([
  { period: "P1", metricA: 100, metricB: 50 },
  { period: "P2", metricA: 120, metricB: 60 },
  { period: "P3", metricA: 110, metricB: 55 },
  { period: "P4", metricA: 130, metricB: 70 }
])` ➔

  **Manual Verify:**
  - P1→P2: metricA 100→120(+), metricB 50→60(+) → SAME direction
  - P2→P3: metricA 120→110(-), metricB 60→55(-) → SAME direction
  - P3→P4: metricA 110→130(+), metricB 55→70(+) → SAME direction
  - sameDirectionCount=3, oppositeDirectionCount=0, totalComparisons=3
  - correlationStrength = 3/3×100=100.00
  - 100.00 ≥70 → "STRONG_POSITIVE"

  `{
  sameDirectionCount: 3,
  oppositeDirectionCount: 0,
  correlationStrength: 100.00,
  relationship: "STRONG_POSITIVE"
}`

---

## 🧩 PROBLEM–04: 🚦 Anomaly Detector

⚠️ **Function Name:** `detectAnomalies()`

| Input      | `dataSeries` (array of numbers), `sensitivityMultiplier` (number) |
| :--------- | :------------------------------------------------------------------------ |
| **Output** | object                                                                      |

**Rules:**

`dataSeries` — non-empty array of numbers, ≥ 4 entries
`sensitivityMultiplier` must be a number, > 0 (typically 1.5–3)

**Anomaly Detection Rules (using standard deviation method):**

- `mean` → average of `dataSeries` (rounded to 2 decimal places)
- `standardDeviation` → `Math.sqrt(sum((x-mean)^2)/count)` (rounded to 2 decimal places)
- `upperBound = mean + (sensitivityMultiplier × standardDeviation)`
- `lowerBound = mean - (sensitivityMultiplier × standardDeviation)`
- `anomalies` → array of `{ index, value }` for values that fall OUTSIDE `[lowerBound, upperBound]`
- `anomalyRate` → `(anomalies.length / dataSeries.length) × 100` (rounded to 2 decimal places)

| Challenge 📢 | Return `{ mean, standardDeviation, anomalies, anomalyRate }`. If fewer than 4 entries or invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `detectAnomalies([10, 12, 11, 13, 50, 9], 2)` ➔

  **Manual Verify:**
  - mean = (10+12+11+13+50+9)/6 = 105/6 = 17.50
  - variance = [(10-17.5)²+(12-17.5)²+(11-17.5)²+(13-17.5)²+(50-17.5)²+(9-17.5)²]/6
    = [56.25+30.25+42.25+20.25+1056.25+72.25]/6 = 1277.5/6 = 212.92
  - standardDeviation = sqrt(212.92) = 14.59
  - upperBound = 17.50+(2×14.59) = 17.50+29.18 = 46.68
  - lowerBound = 17.50-29.18 = -11.68
  - Check each: 10✓,12✓,11✓,13✓,50(>46.68→ANOMALY at index4),9✓
  - anomalies = [{index:4, value:50}]
  - anomalyRate = 1/6×100 = 16.67

  `{
  mean: 17.50,
  standardDeviation: 14.59,
  anomalies: [{ index: 4, value: 50 }],
  anomalyRate: 16.67
}`

---

## 🧩 PROBLEM–05: 📋 Executive Business Intelligence Summary

⚠️ **Function Name:** `buildBIExecutiveSummary()`

| Input      | `salesData` (array of objects), `expenseData` (array of objects), `customerData` (array of objects) |
| :--------- | :----------------------------------------------------------------------------------------------------------- |

**Output:** object

**Rules:**

This is the Module-6 capstone — composing multiple analytical dimensions.

`salesData` — non-empty array: `{ amount (number, >0) }`
`expenseData` — non-empty array: `{ amount (number, >0) }`
`customerData` — non-empty array: `{ rating (number, integer, 1-5) }`

**Summary Composition Rules:**

- `totalRevenue` → sum of `salesData` amounts
- `totalExpenses` → sum of `expenseData` amounts
- `netProfit = totalRevenue - totalExpenses`
- `profitMarginPercent = (netProfit / totalRevenue) × 100` (rounded to 2 decimal places)
- `averageCustomerRating` → mean of `customerData` ratings (rounded to 2 decimal places)
- `businessHealthScore` → composite: `(profitMarginPercent capped between 0-100, weight 60%) + (averageCustomerRating/5×100, weight 40%)`:
  - `cappedMargin = Math.max(0, Math.min(100, profitMarginPercent))`
  - `businessHealthScore = (cappedMargin × 0.6) + ((averageCustomerRating/5×100) × 0.4)` (rounded to 2 decimal places)
- `overallVerdict`:
  - `businessHealthScore >= 80` → `"EXCELLENT"`
  - `businessHealthScore >= 60` → `"GOOD"`
  - `businessHealthScore >= 40` → `"NEEDS_IMPROVEMENT"`
  - `businessHealthScore < 40` → `"CRITICAL"`

| Challenge 📢 | Return `{ netProfit, profitMarginPercent, averageCustomerRating, businessHealthScore, overallVerdict }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `buildBIExecutiveSummary(
  [{ amount: 60000 }, { amount: 40000 }],
  [{ amount: 30000 }, { amount: 20000 }],
  [{ rating: 5 }, { rating: 4 }, { rating: 4 }]
)` ➔

  **Manual Verify:**
  - totalRevenue = 60000+40000=100000
  - totalExpenses = 30000+20000=50000
  - netProfit = 100000-50000=50000
  - profitMarginPercent = 50000/100000×100=50.00
  - averageCustomerRating = (5+4+4)/3=4.33
  - cappedMargin = max(0,min(100,50.00))=50.00
  - businessHealthScore = (50.00×0.6)+((4.33/5×100)×0.4) = 30.00+(86.6×0.4) = 30.00+34.64 = 64.64
  - 64.64 ≥60 → "GOOD"

  `{
  netProfit: 50000,
  profitMarginPercent: 50.00,
  averageCustomerRating: 4.33,
  businessHealthScore: 64.64,
  overallVerdict: "GOOD"
}`

---