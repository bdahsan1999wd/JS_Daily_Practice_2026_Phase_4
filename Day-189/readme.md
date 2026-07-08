# 🎓 JS DAILY PRACTICE – DAY-189

📅 **Goal:** Attendance Summary System (Reporting & Analytics Engine)
🎯 **Focus:** Data Aggregation • KPI Calculation • Statistical Summary Generation

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 📅 Individual Attendance Aggregator

⚠️ **Function Name:** `aggregateIndividualAttendance()`

| Input      | `attendanceLogs` (array of objects) |
| :--------- | :---------------------------------- |
| **Output** | object                              |

**Rules:**

`attendanceLogs` — non-empty array, each entry:

- `employeeName` (string)
- `status` (string: "PRESENT", "ABSENT", "LATE", "HALF_DAY")

**Aggregation Rules:**

- Group by `employeeName`
- For each employee, count occurrences of each status
- `totalDays` → total log entries for that employee
- `attendanceRate` → `((PRESENT count + LATE count + HALF_DAY count) / totalDays) × 100` (rounded to 2 decimal places) — ABSENT does not count toward attendance
- `attendanceBreakdown` → object: each key is employee name, value is `{ totalDays, present, absent, late, halfDay, attendanceRate }`

| Challenge 📢 | Return `attendanceBreakdown`. If invalid input → `"Invalid Input"` |
| :----------- | :----------------------------------------------------------------- |

**Sample Input & Output:**

- `aggregateIndividualAttendance([
  { employeeName: "Mahin", status: "PRESENT" },
  { employeeName: "Mahin", status: "ABSENT" },
  { employeeName: "Mahin", status: "LATE" },
  { employeeName: "Tania", status: "PRESENT" }
])` ➔

  `{
  Mahin: { totalDays: 3, present: 1, absent: 1, late: 1, halfDay: 0, attendanceRate: 66.67 },
  Tania: { totalDays: 1, present: 1, absent: 0, late: 0, halfDay: 0, attendanceRate: 100.00 }
}`

---

## 🧩 PROBLEM–02: ⚠️ Chronic Absenteeism Detector

⚠️ **Function Name:** `detectChronicAbsenteeism()`

| Input      | `attendanceLogs` (array of objects), `absenceThresholdPercent` (number) |
| :--------- | :---------------------------------------------------------------------- |
| **Output** | object                                                                  |

**Rules:**

`attendanceLogs` — non-empty array, each entry: `{ employeeName (string), status (string) }`
`absenceThresholdPercent` must be a number, 0–100

**Detection Rules:**

- Group by `employeeName`, compute `totalDays` and `absentDays` (count where status === "ABSENT")
- `absenceRate = (absentDays / totalDays) × 100` (rounded to 2 decimal places)
- `isChronicAbsentee` → true if `absenceRate >= absenceThresholdPercent`
- `chronicAbsentees` → array of employee names where `isChronicAbsentee` is true, each as `{ employeeName, absenceRate }`
- `overallAbsenceRate` → `(total absent across everyone / total logs) × 100` (rounded to 2 decimal places)

| Challenge 📢 | Return `{ chronicAbsentees, overallAbsenceRate }`. If invalid input → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `detectChronicAbsenteeism([
  { employeeName: "Rumi", status: "ABSENT" },
  { employeeName: "Rumi", status: "ABSENT" },
  { employeeName: "Rumi", status: "PRESENT" },
  { employeeName: "Karim", status: "PRESENT" },
  { employeeName: "Karim", status: "PRESENT" }
], 50)` ➔

  `{
  chronicAbsentees: [
    { employeeName: "Rumi", absenceRate: 66.67 }
  ],
  overallAbsenceRate: 40.00
}`

---

## 🧩 PROBLEM–03: 🏢 Department Attendance Comparison

⚠️ **Function Name:** `compareDepartmentAttendance()`

| Input      | `attendanceLogs` (array of objects) |
| :--------- | :---------------------------------- |
| **Output** | object                              |

**Rules:**

`attendanceLogs` — non-empty array, each entry:

- `department` (string)
- `status` (string: "PRESENT", "ABSENT", "LATE", "HALF_DAY")

**Comparison Rules:**

- Group by `department`
- For each department, compute `attendanceRate = ((PRESENT+LATE+HALF_DAY) / total) × 100` (rounded to 2 decimal places)
- `departmentRanking` → array sorted by `attendanceRate` descending: `{ department, attendanceRate }`
- `bestDepartment` → department name with highest rate
- `worstDepartment` → department name with lowest rate
- `companyAverageRate` → mean of all department `attendanceRate` values (rounded to 2 decimal places) — average of department RATES, not pooled raw data

| Challenge 📢 | Return `{ departmentRanking, bestDepartment, worstDepartment, companyAverageRate }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `compareDepartmentAttendance([
  { department: "Sales", status: "PRESENT" },
  { department: "Sales", status: "ABSENT" },
  { department: "IT", status: "PRESENT" },
  { department: "IT", status: "PRESENT" }
])` ➔

  `{
  departmentRanking: [
    { department: "IT", attendanceRate: 100.00 },
    { department: "Sales", attendanceRate: 50.00 }
  ],
  bestDepartment: "IT",
  worstDepartment: "Sales",
  companyAverageRate: 75.00
}`

---

## 🧩 PROBLEM–04: 📆 Weekly Pattern Analyzer

⚠️ **Function Name:** `analyzeWeeklyAttendancePattern()`

| Input      | `attendanceLogs` (array of objects) |
| :--------- | :---------------------------------- |
| **Output** | object                              |

**Rules:**

`attendanceLogs` — non-empty array, each entry:

- `dayOfWeek` (string: "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun")
- `status` (string: "PRESENT", "ABSENT", "LATE", "HALF_DAY")

**Pattern Rules:**

- Group by `dayOfWeek`
- For each day, compute `absenceRate = (absentCount / totalCount) × 100` (rounded to 2 decimal places)
- `worstAttendanceDay` → day with HIGHEST `absenceRate` (the day people skip most)
- `bestAttendanceDay` → day with LOWEST `absenceRate`
- `dayBreakdown` → object: each key is day, value is `{ totalCount, absentCount, absenceRate }`

| Challenge 📢 | Return `{ dayBreakdown, worstAttendanceDay, bestAttendanceDay }`. If invalid input → `"Invalid Input"` |
| :----------- | :----------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `analyzeWeeklyAttendancePattern([
  { dayOfWeek: "Mon", status: "PRESENT" },
  { dayOfWeek: "Mon", status: "ABSENT" },
  { dayOfWeek: "Fri", status: "ABSENT" },
  { dayOfWeek: "Fri", status: "ABSENT" }
])` ➔

  `{
  dayBreakdown: {
    Mon: { totalCount: 2, absentCount: 1, absenceRate: 50.00 },
    Fri: { totalCount: 2, absentCount: 2, absenceRate: 100.00 }
  },
  worstAttendanceDay: "Fri",
  bestAttendanceDay: "Mon"
}`

---

## 🧩 PROBLEM–05: 📋 Comprehensive Attendance Report

⚠️ **Function Name:** `buildAttendanceReport()`

| Input      | `attendanceLogs` (array of objects), `requiredAttendancePercent` (number) |
| :--------- | :------------------------------------------------------------------------ |
| **Output** | object                                                                    |

**Rules:**

`attendanceLogs` — non-empty array, each entry: `{ employeeName (string), status (string) }`
`requiredAttendancePercent` must be a number, 0–100

**Report Rules:**

- Group by `employeeName`, compute `attendanceRate = ((PRESENT+LATE+HALF_DAY)/total)×100` (rounded to 2 decimal places) per employee
- `compliantEmployees` → array of employee names where `attendanceRate >= requiredAttendancePercent`
- `nonCompliantEmployees` → array of `{ employeeName, attendanceRate, shortfall }` where `attendanceRate < requiredAttendancePercent`
  - `shortfall = requiredAttendancePercent - attendanceRate` (rounded to 2 decimal places)
- `companyComplianceRate` → `(compliantEmployees.length / totalEmployeeCount) × 100` (rounded to 2 decimal places)
- `reportSummary` → `` `${compliantEmployees.length} of ${totalEmployeeCount} employee(s) meet the ${requiredAttendancePercent}% attendance requirement.` ``

| Challenge 📢 | Return `{ compliantEmployees, nonCompliantEmployees, companyComplianceRate, reportSummary }`. If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `buildAttendanceReport([
  { employeeName: "Faria", status: "PRESENT" },
  { employeeName: "Faria", status: "PRESENT" },
  { employeeName: "Jamil", status: "ABSENT" },
  { employeeName: "Jamil", status: "PRESENT" }
], 90)` ➔

  `{
  compliantEmployees: ["Faria"],
  nonCompliantEmployees: [
    { employeeName: "Jamil", attendanceRate: 50.00, shortfall: 40.00 }
  ],
  companyComplianceRate: 50.00,
  reportSummary: "1 of 2 employee(s) meet the 90% attendance requirement."
}`

---
