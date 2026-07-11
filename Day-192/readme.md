# 🎓 JS DAILY PRACTICE – DAY-192

📅 **Goal:** Customer Feedback Analytics System (Reporting & Analytics Engine)
🎯 **Focus:** Data Aggregation • KPI Calculation • Statistical Summary Generation

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: ⭐ Rating Distribution Aggregator

⚠️ **Function Name:** `aggregateRatingDistribution()`

| Input      | `feedbackEntries` (array of objects) |
| :--------- | :----------------------------------- |
| **Output** | object                               |

**Rules:**

`feedbackEntries` — non-empty array, each entry:

- `customerName` (string)
- `rating` (number, integer, 1–5)

**Aggregation Rules:**

- `ratingCounts` → object: `{ "1": count, "2": count, "3": count, "4": count, "5": count }` (include all 5 keys even if count is 0)
- `averageRating` → mean of all ratings (rounded to 2 decimal places)
- `totalResponses` → total count
- `satisfactionRate` → percentage of ratings that are 4 or 5 (rounded to 2 decimal places)

| Challenge 📢 | Return `{ ratingCounts, averageRating, totalResponses, satisfactionRate }`. If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `aggregateRatingDistribution([
  { customerName: "A", rating: 5 },
  { customerName: "B", rating: 4 },
  { customerName: "C", rating: 2 },
  { customerName: "D", rating: 5 }
])` ➔

  `{
  ratingCounts: { "1": 0, "2": 1, "3": 0, "4": 1, "5": 2 },
  averageRating: 4.00,
  totalResponses: 4,
  satisfactionRate: 75.00
}`

---

## 🧩 PROBLEM–02: 📊 NPS (Net Promoter Score) Calculator

⚠️ **Function Name:** `calculateNPS()`

| Input      | `surveyResponses` (array of objects) |
| :--------- | :----------------------------------- |
| **Output** | object                               |

**Rules:**

`surveyResponses` — non-empty array, each entry:

- `customerName` (string)
- `score` (number, integer, 0–10) — "How likely are you to recommend us?"

**NPS Classification Rules:**

- `score` 0–6 → "DETRACTOR"
- `score` 7–8 → "PASSIVE"
- `score` 9–10 → "PROMOTER"

**NPS Calculation:**

- `promoterPercent = (promoterCount / total) × 100`
- `detractorPercent = (detractorCount / total) × 100`
- `npsScore = promoterPercent - detractorPercent` (rounded to 2 decimal places) — passives are not counted in either
- `npsCategory`:
  - `npsScore >= 50` → `"EXCELLENT"`
  - `npsScore >= 0` → `"GOOD"`
  - `npsScore < 0` → `"POOR"`

| Challenge 📢 | Return `{ promoterCount, passiveCount, detractorCount, npsScore, npsCategory }`. If invalid input → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `calculateNPS([
  { customerName: "A", score: 10 },
  { customerName: "B", score: 9 },
  { customerName: "C", score: 5 },
  { customerName: "D", score: 7 }
])` ➔

  `{
  promoterCount: 2,
  passiveCount: 1,
  detractorCount: 1,
  npsScore: 25.00,
  npsCategory: "GOOD"
}`

---

## 🧩 PROBLEM–03: 🏷️ Feedback Topic Frequency Analyzer

⚠️ **Function Name:** `analyzeFeedbackTopics()`

| Input      | `feedbackEntries` (array of objects) |
| :--------- | :----------------------------------- |
| **Output** | object                               |

**Rules:**

`feedbackEntries` — non-empty array, each entry:

- `customerName` (string)
- `topics` (array of strings — e.g. `["shipping", "quality"]`) — tags mentioned in this feedback, may be empty array
- `sentiment` (string: "POSITIVE", "NEUTRAL", "NEGATIVE")

**Analysis Rules:**

- Flatten all `topics` arrays and count frequency of each unique topic across ALL feedback entries
- `topicFrequency` → object: each key is topic, value is count of how many feedback entries mentioned it
- `mostMentionedTopic` → topic with highest frequency (if no topics at all → `null`)
- For the `mostMentionedTopic`, compute its `negativeSentimentPercent` → percentage of feedback entries mentioning that topic where `sentiment === "NEGATIVE"` (rounded to 2 decimal places; if `mostMentionedTopic` is `null`, this is also `null`)

| Challenge 📢 | Return `{ topicFrequency, mostMentionedTopic, negativeSentimentPercent }`. If invalid input → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `analyzeFeedbackTopics([
  { customerName: "A", topics: ["shipping", "quality"], sentiment: "NEGATIVE" },
  { customerName: "B", topics: ["shipping"], sentiment: "POSITIVE" },
  { customerName: "C", topics: ["shipping", "price"], sentiment: "NEGATIVE" }
])` ➔

  `{
  topicFrequency: { shipping: 3, quality: 1, price: 1 },
  mostMentionedTopic: "shipping",
  negativeSentimentPercent: 66.67
}`

---

## 🧩 PROBLEM–04: 📈 Satisfaction Trend Tracker

⚠️ **Function Name:** `trackSatisfactionTrend()`

| Input      | `monthlyRatings` (array of objects) |
| :--------- | :---------------------------------- |
| **Output** | object                              |

**Rules:**

`monthlyRatings` — non-empty array, ORDERED chronologically, ≥ 2 entries, each:

- `month` (string)
- `averageRating` (number, 1.0–5.0)

**Trend Rules:**

- For each month from the 2nd onward: `change = currentRating - previousRating` (rounded to 2 decimal places)
- `monthlyChanges` → array of `{ month, change }`
- `overallChange = lastMonthRating - firstMonthRating` (rounded to 2 decimal places)
- `trendDirection`:
  - `overallChange > 0.1` → `"IMPROVING"`
  - `overallChange < -0.1` → `"DECLINING"`
  - otherwise → `"STABLE"`
- `lowestMonth` → the month with the lowest `averageRating`

| Challenge 📢 | Return `{ monthlyChanges, overallChange, trendDirection, lowestMonth }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `trackSatisfactionTrend([
  { month: "Jan", averageRating: 4.2 },
  { month: "Feb", averageRating: 3.8 },
  { month: "Mar", averageRating: 4.5 }
])` ➔

  `{
  monthlyChanges: [
    { month: "Feb", change: -0.40 },
    { month: "Mar", change: 0.70 }
  ],
  overallChange: 0.30,
  trendDirection: "IMPROVING",
  lowestMonth: "Feb"
}`

---

## 🧩 PROBLEM–05: 📋 Comprehensive Customer Experience Report

⚠️ **Function Name:** `buildCustomerExperienceReport()`

| Input      | `feedbackEntries` (array of objects) |
| :--------- | :----------------------------------- |
| **Output** | object                               |

**Rules:**

`feedbackEntries` — non-empty array, each entry:

- `customerName` (string)
- `rating` (number, integer, 1–5)
- `npsScore` (number, integer, 0–10)
- `resolvedComplaint` (boolean)

**Report Rules:**

- `averageRating` → mean of `rating` (rounded to 2 decimal places)
- `averageNPS` → mean of `npsScore` (rounded to 2 decimal places)
- `complaintResolutionRate` → percentage where `resolvedComplaint === true` (rounded to 2 decimal places)
- `overallExperienceScore` → weighted: `(averageRating/5 × 40) + (averageNPS/10 × 40) + (complaintResolutionRate/100 × 20)` (rounded to 2 decimal places) — this normalizes all 3 metrics to a 100-point scale
- `experienceGrade`:
  - `overallExperienceScore >= 85` → `"A"`
  - `overallExperienceScore >= 70` → `"B"`
  - `overallExperienceScore >= 50` → `"C"`
  - `overallExperienceScore < 50` → `"D"`
- `reportSummary` → `` `Overall experience score: ${overallExperienceScore}/100 (Grade ${experienceGrade}). Average rating: ${averageRating}/5. Complaint resolution: ${complaintResolutionRate}%.` ``

| Challenge 📢 | Return `{ overallExperienceScore, experienceGrade, reportSummary }`. If invalid input → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `buildCustomerExperienceReport([
  { customerName: "A", rating: 5, npsScore: 9, resolvedComplaint: true },
  { customerName: "B", rating: 4, npsScore: 7, resolvedComplaint: true },
  { customerName: "C", rating: 3, npsScore: 5, resolvedComplaint: false }
])` ➔

  `{
  overallExperienceScore: 73.33,
  experienceGrade: "B",
  reportSummary: "Overall experience score: 73.33/100 (Grade B). Average rating: 4/5. Complaint resolution: 66.67%."
}`

---
