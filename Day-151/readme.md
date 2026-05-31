# 🎓 JS DAILY PRACTICE – DAY-151

📅 **Goal:** Student Intelligence Scoring System (Multi-Layer Evaluation Engine)
🎯 **Focus:** Weighted Scoring • Rule Engine • Ranking Logic • Validation System • Decision Mapping

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 🧠 Student Intelligence Index Engine

⚠️ **Function Name:** `calculateIntelligenceIndex()`

| Input      | `students` (array of objects) |
| :--------- | :---------------------------- |
| **Output** | array of objects              |

**Rules:**

Each student object:

- `name`
- `marks: { math, english, science }`
- `attendance` (0–100)
- `behaviorScore` (0–100)

**Scoring System:**

- Average Marks = `(math + english + science) / 3`

- Attendance Impact:
  - ≥ 90 → +10
  - 75–89 → +5
  - < 75 → -10

- Behavior Impact:
  - ≥ 80 → +10
  - 50–79 → 0
  - < 50 → -15

**Final Score:**

- `finalScore = avgMarks + attendanceImpact + behaviorImpact`

**Grade System:**

- ≥ 90 → "A+"
- 75–89 → "A"
- 60–74 → "B"
- 45–59 → "C"
- < 45 → "F"

| Challenge 📢 | Return array with `name`, `finalScore`, `grade`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `calculateIntelligenceIndex([{ name: "Rahim", marks: { math: 80, english: 75, science: 85 }, attendance: 90, behaviorScore: 85 }])` ➔
  `[{ name: "Rahim", finalScore: 100, grade: "A+" }]`

---

## 🧩 PROBLEM–02: 🏆 Smart Leaderboard Engine

⚠️ **Function Name:** `generateSmartLeaderboard()`

| Input      | `students` array |
| :--------- | :--------------- |
| **Output** | array            |

**Rules:**

- Rank by `finalScore` (descending)
- If tie:
  1. Higher attendance wins
  2. Higher behaviorScore wins
  3. Same rank if still tie

| Challenge 📢 | Return array with `name`, `finalScore`, `rank` |
| :----------- | :--------------------------------------------- |

**Sample Input & Output:**

- `generateSmartLeaderboard([
{ name: "A", finalScore: 90, attendance: 95, behaviorScore: 80 },
{ name: "B", finalScore: 90, attendance: 85, behaviorScore: 90 }
])` ➔
  `[
{ name: "A", finalScore: 90, rank: 1 },
{ name: "B", finalScore: 90, rank: 2 }
]`

---

## 🧩 PROBLEM–03: ⚠️ Student Risk Detection Engine

⚠️ **Function Name:** `detectAtRiskStudents()`

| Input      | students array |
| :--------- | :------------- |
| **Output** | object         |

**Rules:**

AT_RISK if ANY:

- finalScore < 45
- attendance < 70
- behaviorScore < 40

| Challenge 📢 | Return `{ atRiskStudents: [], safeStudents: [] }` |
| :----------- | :------------------------------------------------ |

**Sample Input & Output:**

- `detectAtRiskStudents([
{ name: "X", finalScore: 40, attendance: 80, behaviorScore: 60 },
{ name: "Y", finalScore: 70, attendance: 90, behaviorScore: 85 }
])` ➔
  `{
atRiskStudents: ["X"],
safeStudents: ["Y"]
}`

---

## 🧩 PROBLEM–04: 📊 Class Performance Analytics Engine

⚠️ **Function Name:** `generateClassReport()`

| Input      | students array |
| :--------- | :------------- |
| **Output** | object         |

**Requirements:**

- classAverage (finalScore)
- highest scorer
- lowest scorer
- grade distribution:
  - A+
  - A
  - B
  - C
  - F
- passRate (≥ C grade)

| Challenge 📢 | Return full analytics object |
| :----------- | :--------------------------- |

**Sample Input & Output:**

- `generateClassReport([
{ name: "A", finalScore: 80 },
{ name: "B", finalScore: 60 },
{ name: "C", finalScore: 40 }
])` ➔
  `{
classAverage: 60,
highest: { name: "A", finalScore: 80 },
lowest: { name: "C", finalScore: 40 },
gradeDistribution: {
Aplus: 0,
A: 1,
B: 1,
C: 0,
F: 1
},
passRate: 66.67
}`

---

## 🧩 PROBLEM–05: 🔥 Promotion Decision Engine

⚠️ **Function Name:** `promotionEngine()`

| Input      | students array |
| :--------- | :------------- |
| **Output** | array          |

**Rules:**

- PROMOTED:
  - finalScore ≥ 75 AND attendance ≥ 80

- CONDITIONAL:
  - finalScore 60–74 AND behaviorScore ≥ 70

- FAILED:
  - otherwise

| Challenge 📢 | Return array with `name`, `decision` |
| :----------- | :----------------------------------- |

**Sample Input & Output:**

- `promotionEngine([
{ name: "A", finalScore: 80, attendance: 85, behaviorScore: 70 },
{ name: "B", finalScore: 65, attendance: 80, behaviorScore: 75 },
{ name: "C", finalScore: 40, attendance: 60, behaviorScore: 30 }
])` ➔
  `[
{ name: "A", decision: "PROMOTED" },
{ name: "B", decision: "CONDITIONAL" },
{ name: "C", decision: "FAILED" }
]`

---
