# 🎓 JS DAILY PRACTICE – DAY-188

📅 **Goal:** Performance Dashboard (Reporting & Analytics Engine)
🎯 **Focus:** Data Aggregation • KPI Calculation • Statistical Summary Generation

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 👤 Employee Performance Aggregator

⚠️ **Function Name:** `aggregateEmployeePerformance()`

| Input      | `taskRecords` (array of objects) |
| :--------- | :------------------------------- |
| **Output** | object                           |

**Rules:**

`taskRecords` — non-empty array, each entry:

- `employeeName` (string)
- `tasksCompleted` (number, integer, ≥ 0)
- `hoursWorked` (number, > 0)

**Aggregation Rules:**

- Group by `employeeName`, sum `tasksCompleted` and `hoursWorked` across multiple entries for the same employee
- For each employee, compute `productivityRate = totalTasksCompleted / totalHoursWorked` (rounded to 2 decimal places)
- `employeeBreakdown` → object: each key is employee name, value is `{ totalTasksCompleted, totalHoursWorked, productivityRate }`
- `topPerformer` → employee name with highest `productivityRate`

| Challenge 📢 | Return `{ employeeBreakdown, topPerformer }`. If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `aggregateEmployeePerformance([
  { employeeName: "Rakib", tasksCompleted: 10, hoursWorked: 5 },
  { employeeName: "Rakib", tasksCompleted: 5, hoursWorked: 3 },
  { employeeName: "Sumi", tasksCompleted: 8, hoursWorked: 4 }
])` ➔

  `{
  employeeBreakdown: {
    Rakib: { totalTasksCompleted: 15, totalHoursWorked: 8, productivityRate: 1.88 },
    Sumi: { totalTasksCompleted: 8, totalHoursWorked: 4, productivityRate: 2.00 }
  },
  topPerformer: "Sumi"
}`

---

## 🧩 PROBLEM–02: 🎯 Goal Completion Tracker

⚠️ **Function Name:** `trackGoalCompletion()`

| Input      | `goals` (array of objects) |
| :--------- | :------------------------- |
| **Output** | object                     |

**Rules:**

`goals` — non-empty array, each entry:

- `goalName` (string)
- `targetValue` (number, > 0)
- `currentValue` (number, ≥ 0)

**Tracking Rules:**

- For each goal, compute `completionPercent = (currentValue / targetValue) × 100` (rounded to 2 decimal places, capped display at actual value — no capping needed in math, just compute)
- `status`:
  - `completionPercent >= 100` → `"COMPLETED"`
  - `completionPercent >= 50` → `"IN_PROGRESS"`
  - `completionPercent < 50` → `"AT_RISK"`
- `overallCompletionRate` → average of all `completionPercent` values (rounded to 2 decimal places)
- `completedGoalsCount` → count of goals with status `"COMPLETED"`
- `atRiskGoals` → array of `goalName` values with status `"AT_RISK"`

| Challenge 📢 | Return `{ goalDetails, overallCompletionRate, completedGoalsCount, atRiskGoals }` where `goalDetails` is an array of `{ goalName, completionPercent, status }`. If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `trackGoalCompletion([
  { goalName: "Sales Target", targetValue: 100000, currentValue: 120000 },
  { goalName: "New Customers", targetValue: 50, currentValue: 20 },
  { goalName: "Support Tickets", targetValue: 200, currentValue: 150 }
])` ➔

  `{
  goalDetails: [
    { goalName: "Sales Target", completionPercent: 120.00, status: "COMPLETED" },
    { goalName: "New Customers", completionPercent: 40.00, status: "AT_RISK" },
    { goalName: "Support Tickets", completionPercent: 75.00, status: "IN_PROGRESS" }
  ],
  overallCompletionRate: 78.33,
  completedGoalsCount: 1,
  atRiskGoals: ["New Customers"]
}`

---

## 🧩 PROBLEM–03: 📐 Team Performance Index

⚠️ **Function Name:** `calculateTeamPerformanceIndex()`

| Input      | `teamMembers` (array of objects), `weights` (object) |
| :--------- | :--------------------------------------------------- |
| **Output** | object                                               |

**Rules:**

`teamMembers` — non-empty array, each entry:

- `name` (string)
- `qualityScore` (number, 0–100)
- `speedScore` (number, 0–100)
- `collaborationScore` (number, 0–100)

`weights` object:

- `quality` (number, 0–1)
- `speed` (number, 0–1)
- `collaboration` (number, 0–1)
- The three weights must sum to exactly `1` (within floating tolerance of 0.01) → else `"Invalid Input"`

**Index Rules:**

- For each member: `performanceIndex = (qualityScore × weights.quality) + (speedScore × weights.speed) + (collaborationScore × weights.collaboration)` (rounded to 2 decimal places)
- `teamAverageIndex` → mean of all `performanceIndex` values (rounded to 2 decimal places)
- `rankedMembers` → array sorted by `performanceIndex` descending: `{ name, performanceIndex }`

| Challenge 📢 | Return `{ rankedMembers, teamAverageIndex }`. If invalid input or weights don't sum to 1 → `"Invalid Input"` |
| :----------- | :----------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `calculateTeamPerformanceIndex([
  { name: "Tonny", qualityScore: 90, speedScore: 70, collaborationScore: 80 },
  { name: "Bidisha", qualityScore: 75, speedScore: 95, collaborationScore: 70 }
], { quality: 0.5, speed: 0.3, collaboration: 0.2 })` ➔

  `{
  rankedMembers: [
    { name: "Tonny", performanceIndex: 82.00 },
    { name: "Bidisha", performanceIndex: 80.00 }
  ],
  teamAverageIndex: 81.00
}`

---

## 🧩 PROBLEM–04: 📊 KPI Trend Tracker

⚠️ **Function Name:** `trackKPITrend()`

| Input      | `kpiHistory` (array of objects) |
| :--------- | :------------------------------ |
| **Output** | object                          |

**Rules:**

`kpiHistory` — non-empty array, ORDERED chronologically, each entry:

- `period` (string, e.g. "Week1")
- `value` (number, ≥ 0)

Must have at least 3 entries to detect a trend.

**Trend Detection Rules:**

- Compute the difference between each consecutive pair: `diffs[i] = value[i+1] - value[i]`
- `isConsistentlyImproving` → true if ALL diffs are > 0
- `isConsistentlyDeclining` → true if ALL diffs are < 0
- `isVolatile` → true if diffs have BOTH positive and negative values
- `overallDirection`:
  - `isConsistentlyImproving` → `"IMPROVING"`
  - `isConsistentlyDeclining` → `"DECLINING"`
  - `isVolatile` → `"VOLATILE"`
  - otherwise (all diffs are 0, or mix of 0 and one direction) → `"STABLE"`
- `averageChange` → mean of all diffs (rounded to 2 decimal places)

| Challenge 📢 | Return `{ overallDirection, averageChange }`. If fewer than 3 entries or invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `trackKPITrend([
  { period: "Week1", value: 50 },
  { period: "Week2", value: 65 },
  { period: "Week3", value: 80 }
])` ➔

  `{
  overallDirection: "IMPROVING",
  averageChange: 15.00
}`

---

## 🧩 PROBLEM–05: 📋 Executive Performance Summary

⚠️ **Function Name:** `buildExecutivePerformanceSummary()`

| Input      | `departmentData` (array of objects) |
| :--------- | :---------------------------------- |
| **Output** | object                              |

**Rules:**

`departmentData` — non-empty array, each entry:

- `department` (string)
- `targetKPI` (number, > 0)
- `actualKPI` (number, ≥ 0)
- `employeeCount` (number, integer, > 0)

**Summary Rules:**

- For each department: `achievementPercent = (actualKPI / targetKPI) × 100` (rounded to 2 decimal places)
- `companyWideAchievement` → average of all departments' `achievementPercent` (rounded to 2 decimal places)
- `totalEmployees` → sum of `employeeCount` across all departments
- `bestDepartment` → department with highest `achievementPercent`
- `worstDepartment` → department with lowest `achievementPercent`
- `departmentsNeedingAttention` → array of department names where `achievementPercent < 70`
- `executiveGrade`:
  - `companyWideAchievement >= 90` → `"A"`
  - `companyWideAchievement >= 75` → `"B"`
  - `companyWideAchievement >= 60` → `"C"`
  - `companyWideAchievement < 60` → `"D"`

| Challenge 📢 | Return `{ companyWideAchievement, totalEmployees, bestDepartment, worstDepartment, departmentsNeedingAttention, executiveGrade }`. If invalid input → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `buildExecutivePerformanceSummary([
  { department: "Sales", targetKPI: 100000, actualKPI: 95000, employeeCount: 10 },
  { department: "Support", targetKPI: 500, actualKPI: 300, employeeCount: 5 },
  { department: "Engineering", targetKPI: 50, actualKPI: 48, employeeCount: 15 }
])` ➔

  `{
  companyWideAchievement: 83.67,
  totalEmployees: 30,
  bestDepartment: "Engineering",
  worstDepartment: "Support",
  departmentsNeedingAttention: ["Support"],
  executiveGrade: "B"
}`

---
