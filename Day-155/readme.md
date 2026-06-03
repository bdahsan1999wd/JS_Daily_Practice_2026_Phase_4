# 🎓 JS DAILY PRACTICE – DAY-155

📅 **Goal:** Exam Performance Dashboard (Advanced Array Processing Engine)
🎯 **Focus:** map() • filter() • reduce() • find() • some() / every() • sort()

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 📝 Exam Score Processor

⚠️ **Function Name:** `processExamScores()`

| Input      | `students` (array of objects) |
| :--------- | :---------------------------- |
| **Output** | array of objects              |

**Rules:**

Each student object:

- `name` (string)
- `scores` (array of numbers, each 0–100, minimum 1 score)

**Calculation:**

- `totalScore = sum of all scores`
- `average = totalScore / scores.length` (rounded to 2 decimal places)
- `highest = Math.max(...scores)`
- `lowest = Math.min(...scores)`

**Grade System:**

| Average    | Grade |
| :--------- | :---- |
| ≥ 90       | "A+"  |
| 75 – 89.99 | "A"   |
| 60 – 74.99 | "B"   |
| 45 – 59.99 | "C"   |
| < 45       | "F"   |

| Challenge 📢 | Return array with `name`, `totalScore`, `average`, `highest`, `lowest`, `grade`. If invalid input → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `processExamScores([
  { name: "Rafi", scores: [80, 90, 70] },
  { name: "Mitu", scores: [50, 40, 45] }
])` ➔

  `[
  { name: "Rafi", totalScore: 240, average: 80.00, highest: 90, lowest: 70, grade: "A" },
  { name: "Mitu", totalScore: 135, average: 45.00, highest: 50, lowest: 40, grade: "C" }
]`

---

## 🧩 PROBLEM–02: 🔍 Performance Filter Engine

⚠️ **Function Name:** `filterByGrade()`

| Input      | `students` (array of objects), `grade` (string) |
| :--------- | :---------------------------------------------- |
| **Output** | array of objects                                |

**Rules:**

Each student object:

- `name` (string)
- `average` (number, 0–100)
- `grade` (string: "A+", "A", "B", "C", "F")
- `subject` (string)

**Filter Rules:**

- `grade` input must be one of: `"A+"`, `"A"`, `"B"`, `"C"`, `"F"` — case-sensitive
- Return only students matching the given `grade`
- Sort result by `average` descending

| Challenge 📢 | Return filtered array with all original fields. If no match → return `[]`. If invalid input → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `filterByGrade([
  { name: "Arif", average: 88, grade: "A", subject: "Math" },
  { name: "Sona", average: 76, grade: "A", subject: "Science" },
  { name: "Rana", average: 55, grade: "C", subject: "English" }
], "A")` ➔

  `[
  { name: "Arif", average: 88, grade: "A", subject: "Math" },
  { name: "Sona", average: 76, grade: "A", subject: "Science" }
]`

---

## 🧩 PROBLEM–03: 📊 Class Exam Report Generator

⚠️ **Function Name:** `generateExamReport()`

| Input      | `students` (array of objects) |
| :--------- | :---------------------------- |
| **Output** | object                        |

**Rules:**

Each student object:

- `name` (string)
- `subject` (string)
- `average` (number, 0–100)
- `grade` (string: "A+", "A", "B", "C", "F")

**Requirements:**

- `totalStudents` → count of all students
- `classAverage` → mean of all `average` values (rounded to 2 decimal places)
- `topScorer` → student with highest `average`
- `lowestScorer` → student with lowest `average`
- `gradeDistribution` → `{ Aplus, A, B, C, F }` — count of students per grade
- `passRate` → percentage of students with grade NOT "F" (rounded to 2 decimal places)
- `subjectWiseAverage` → object: each key = subject, value = mean `average` of students in that subject (rounded to 2 decimal places)

| Challenge 📢 | Return full report object. If invalid input → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------- |

**Sample Input & Output:**

- `generateExamReport([
  { name: "A", subject: "Math", average: 92, grade: "A+" },
  { name: "B", subject: "Math", average: 78, grade: "A" },
  { name: "C", subject: "Science", average: 40, grade: "F" }
])` ➔

  `{
  totalStudents: 3,
  classAverage: 70.00,
  topScorer: { name: "A", subject: "Math", average: 92, grade: "A+" },
  lowestScorer: { name: "C", subject: "Science", average: 40, grade: "F" },
  gradeDistribution: { Aplus: 1, A: 1, B: 0, C: 0, F: 1 },
  passRate: 66.67,
  subjectWiseAverage: { Math: 85.00, Science: 40.00 }
}`

---

## 🧩 PROBLEM–04: ✅ Exam Eligibility Checker

⚠️ **Function Name:** `checkExamEligibility()`

| Input      | `students` (array of objects) |
| :--------- | :---------------------------- |
| **Output** | object                        |

**Rules:**

Each student object:

- `name` (string)
- `average` (number, 0–100)
- `attendance` (number, 0–100)
- `assignmentsSubmitted` (number, 0–10)
- `totalAssignments` (number, 10, fixed)

**Eligibility Rules:**

- A student is eligible if ALL three conditions are true:
  1. `average ≥ 40`
  2. `attendance ≥ 75`
  3. `assignmentsSubmitted >= 8`

- `allEligible` → `every()` — true if ALL students are eligible
- `anyIneligible` → `some()` — true if ANY student is NOT eligible
- `eligibleStudents` → array of `name` values where all 3 conditions are true
- `ineligibleStudents` → array of `name` values where any condition fails

| Challenge 📢 | Return `{ allEligible, anyIneligible, eligibleStudents, ineligibleStudents }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `checkExamEligibility([
  { name: "Kamal", average: 65, attendance: 80, assignmentsSubmitted: 9, totalAssignments: 10 },
  { name: "Jamal", average: 35, attendance: 90, assignmentsSubmitted: 10, totalAssignments: 10 },
  { name: "Tamal", average: 70, attendance: 70, assignmentsSubmitted: 8, totalAssignments: 10 }
])` ➔

  `{
  allEligible: false,
  anyIneligible: true,
  eligibleStudents: ["Kamal"],
  ineligibleStudents: ["Jamal", "Tamal"]
}`

---

## 🧩 PROBLEM–05: 🏆 Exam Leaderboard Engine

⚠️ **Function Name:** `generateExamLeaderboard()`

| Input      | `students` (array of objects) |
| :--------- | :---------------------------- |
| **Output** | array of objects              |

**Rules:**

Each student object:

- `name` (string)
- `subject` (string)
- `average` (number, 0–100)
- `totalScore` (number, ≥ 0)

**Ranking Rules:**

- Rank by `average` descending
- If tie → higher `totalScore` wins
- If still tie → same rank (shared rank)

**Performance Badge:**

| Average    | Badge         |
| :--------- | :------------ |
| ≥ 90       | "DISTINCTION" |
| 75 – 89.99 | "MERIT"       |
| 60 – 74.99 | "PASS"        |
| 45 – 59.99 | "AVERAGE"     |
| < 45       | "NEEDS WORK"  |

| Challenge 📢 | Return array with `name`, `subject`, `average`, `rank`, `badge`. If invalid input → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `generateExamLeaderboard([
  { name: "Sara", subject: "Math", average: 92, totalScore: 460 },
  { name: "Noor", subject: "Science", average: 78, totalScore: 390 },
  { name: "Hira", subject: "English", average: 78, totalScore: 400 }
])` ➔

  `[
  { name: "Sara", subject: "Math", average: 92, rank: 1, badge: "DISTINCTION" },
  { name: "Hira", subject: "English", average: 78, rank: 2, badge: "MERIT" },
  { name: "Noor", subject: "Science", average: 78, rank: 3, badge: "MERIT" }
]`

---
