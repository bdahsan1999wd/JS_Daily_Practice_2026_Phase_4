# 🎓 JS DAILY PRACTICE – DAY-183

📅 **Goal:** Student Management System (Multi-Function System Design — Mini Backend Simulation)
🎯 **Focus:** Function Composition • Modular Design • Multi-Layer Architecture • Data Flow Simulation

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.
- This day's problems work TOGETHER as a system — later problems may reuse the data shape produced by earlier ones.

---

## 🧩 PROBLEM–01: ➕ addStudent()

⚠️ **Function Name:** `addStudent()`

| Input      | `students` (array of objects), `newStudent` (object) |
| :--------- | :--------------------------------------------------- |
| **Output** | object                                               |

**Rules:**

`students` — array of existing student objects (may be empty), each with:

- `studentId` (string)
- `name` (string)
- `marks` (object: `{ math, english, science }`, each 0–100)

`newStudent` object:

- `studentId` (string, non-empty)
- `name` (string, non-empty)
- `marks` (object: `{ math, english, science }`, each 0–100)

**Add Rules:**

- Do NOT mutate `students` — return new array
- If `studentId` already exists → reject: `"Student ID already exists"`
- Otherwise, append `newStudent` to a new array (spread)
- `totalStudents` → count after addition

| Challenge 📢 | If duplicate: return `{ added: false, reason: "Student ID already exists", students }` (unchanged). If added: return `{ added: true, students: updatedStudents, totalStudents }`. If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `addStudent(
  [],
  { studentId: "S1", name: "Tamim", marks: { math: 80, english: 75, science: 85 } }
)` ➔

  `{
  added: true,
  students: [
    { studentId: "S1", name: "Tamim", marks: { math: 80, english: 75, science: 85 } }
  ],
  totalStudents: 1
}`

---

## 🧩 PROBLEM–02: ✏️ updateMarks()

⚠️ **Function Name:** `updateMarks()`

| Input      | `students` (array of objects), `studentId` (string), `newMarks` (object) |
| :--------- | :----------------------------------------------------------------------- |
| **Output** | object                                                                   |

**Rules:**

`students` — array of student objects (same shape as Problem 01)
`studentId` must exist in `students` → else reject: `"Student not found"`
`newMarks` object — may contain any subset of `math`, `english`, `science`, each must be 0–100 if provided

**Update Rules:**

- Do NOT mutate `students`
- Find the student, merge `newMarks` into existing `marks` using spread (only provided subjects change)
- If any provided mark is out of 0–100 range → reject: `"Marks must be between 0 and 100"`
- Otherwise, return updated students array

| Challenge 📢 | If rejected: return `{ updated: false, reason, students }` (unchanged). If updated: return `{ updated: true, students: updatedStudents, newMarksApplied: newMarks }`. If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `updateMarks(
  [{ studentId: "S1", name: "Tamim", marks: { math: 80, english: 75, science: 85 } }],
  "S1",
  { math: 92 }
)` ➔

  `{
  updated: true,
  students: [
    { studentId: "S1", name: "Tamim", marks: { math: 92, english: 75, science: 85 } }
  ],
  newMarksApplied: { math: 92 }
}`

---

## 🧩 PROBLEM–03: 🧮 calculateGPA()

⚠️ **Function Name:** `calculateGPA()`

| Input      | `marks` (object: `{ math, english, science }`) |
| :--------- | :--------------------------------------------- |
| **Output** | object                                         |

**Rules:**

`marks` object — each subject 0–100

**GPA Calculation Rules:**

- Convert each subject mark to a grade point using:
  - ≥ 90 → 4.00
  - 80 – 89 → 3.75
  - 70 – 79 → 3.50
  - 60 – 69 → 3.00
  - 50 – 59 → 2.50
  - 40 – 49 → 2.00
  - < 40 → 0.00
- `gpa = average of the 3 grade points` (rounded to 2 decimal places)
- `classification`:
  - `gpa >= 3.75` → `"FIRST CLASS"`
  - `gpa >= 3.00` → `"SECOND CLASS"`
  - `gpa >= 2.00` → `"THIRD CLASS"`
  - `gpa < 2.00` → `"FAIL"`

| Challenge 📢 | Return `{ gpa, classification }`. If `marks` is invalid → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------- |

**Sample Input & Output:**

- `calculateGPA({ math: 92, english: 75, science: 85 })` ➔

  `{
  gpa: 3.75,
  classification: "FIRST CLASS"
}`

---

## 🧩 PROBLEM–04: 🏆 rankStudents()

⚠️ **Function Name:** `rankStudents()`

| Input      | `students` (array of objects) |
| :--------- | :---------------------------- |
| **Output** | array of objects              |

**Rules:**

`students` — non-empty array, each with `studentId`, `name`, `marks` (object: `{ math, english, science }`)

**Ranking Rules:**

- For each student, compute `gpa` using the SAME grade-point logic as Problem-03 (average of 3 subject grade points, rounded to 2 decimal places)
- Rank by `gpa` descending
- If tie → higher total raw marks (`math+english+science`) wins
- If still tie → same rank (shared rank)

| Challenge 📢 | Return array with `{ studentId, name, gpa, rank }`. If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `rankStudents([
  { studentId: "S1", name: "Tamim", marks: { math: 92, english: 75, science: 85 } },
  { studentId: "S2", name: "Nadia", marks: { math: 80, english: 90, science: 70 } }
])` ➔

  `[
  { studentId: "S1", name: "Tamim", gpa: 3.75, rank: 1 },
  { studentId: "S2", name: "Nadia", gpa: 3.75, rank: 2 }
]`

---

## 🧩 PROBLEM–05: 🏗️ runStudentManagementWorkflow()

⚠️ **Function Name:** `runStudentManagementWorkflow()`

| Input      | `initialStudents` (array of objects), `operations` (array of objects) |
| :--------- | :-------------------------------------------------------------------- |
| **Output** | object                                                                |

**Rules:**

This problem composes the previous functions into one workflow.

`initialStudents` — starting array of students
`operations` — array of operation objects, each one of:

- `{ type: "ADD", student: {...} }`
- `{ type: "UPDATE_MARKS", studentId: "...", newMarks: {...} }`

Must process operations IN ORDER, each acting on the result of the previous one.

**Workflow Rules:**

- Apply the same logic as `addStudent()` and `updateMarks()` internally
- Track each operation's outcome in a log: `{ type, success, reason }` (reason `null` if success)
- Failed operations do not change the student list; processing continues
- After all operations: run the equivalent of `rankStudents()` logic on the final student list

| Challenge 📢 | Return `{ finalStudents, operationLog, leaderboard }` where `leaderboard` is the ranked result. If invalid input → `"Invalid Input"` |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `runStudentManagementWorkflow(
  [{ studentId: "S1", name: "Tamim", marks: { math: 60, english: 60, science: 60 } }],
  [
    { type: "ADD", student: { studentId: "S2", name: "Nadia", marks: { math: 90, english: 90, science: 90 } } },
    { type: "UPDATE_MARKS", studentId: "S1", newMarks: { math: 95 } },
    { type: "UPDATE_MARKS", studentId: "S9", newMarks: { math: 50 } }
  ]
)` ➔

  `{
  finalStudents: [
    { studentId: "S1", name: "Tamim", marks: { math: 95, english: 60, science: 60 } },
    { studentId: "S2", name: "Nadia", marks: { math: 90, english: 90, science: 90 } }
  ],
  operationLog: [
    { type: "ADD", success: true, reason: null },
    { type: "UPDATE_MARKS", success: true, reason: null },
    { type: "UPDATE_MARKS", success: false, reason: "Student not found" }
  ],
  leaderboard: [
    { studentId: "S2", name: "Nadia", gpa: 4, rank: 1 },
    { studentId: "S1", name: "Tamim", gpa: 3, rank: 2 }
  ]
}`

---
