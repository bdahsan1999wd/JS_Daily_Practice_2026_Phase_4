# 🎓 JS DAILY PRACTICE – DAY-152

📅 **Goal:** Employee Payroll Calculation System (Advanced Array Processing Engine)
🎯 **Focus:** map() • filter() • reduce() • find() • sort()

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 💰 Net Salary Calculator

⚠️ **Function Name:** `calculateNetSalaries()`

| Input      | `employees` (array of objects) |
| :--------- | :----------------------------- |
| **Output** | array of objects               |

**Rules:**

Each employee object:

- `name`
- `baseSalary` (number, > 0)
- `hoursWorked` (number, 0–744)
- `overtimeRate` (number, > 0)

**Salary System:**

- Standard hours = 160 per month
- Overtime hours = `hoursWorked - 160` (if hoursWorked > 160, else 0)
- Overtime Pay = `overtimeHours × overtimeRate`
- Gross Salary = `baseSalary + overtimePay`

**Tax Deduction:**

| Gross Salary    | Tax Rate |
| :-------------- | :------- |
| > 80,000        | 30%      |
| 50,001 – 80,000 | 20%      |
| 30,001 – 50,000 | 10%      |
| ≤ 30,000        | 0%       |

- `netSalary = grossSalary - (grossSalary × taxRate)`

| Challenge 📢 | Return array with `name`, `grossSalary`, `netSalary`. Round both to 2 decimal places. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `calculateNetSalaries([{ name: "Karim", baseSalary: 50000, hoursWorked: 180, overtimeRate: 200 }])` ➔
  `[{ name: "Karim", grossSalary: 54000, netSalary: 43200 }]`

---

## 🧩 PROBLEM–02: 🔍 Department Filter Engine

⚠️ **Function Name:** `filterByDepartment()`

| Input      | `employees` (array of objects), `department` (string) |
| :--------- | :---------------------------------------------------- |
| **Output** | array of objects                                      |

**Rules:**

Each employee object:

- `name`
- `department`
- `salary` (number, > 0)
- `performanceScore` (0–100)

**Filter Rules:**

- Return only employees matching the given `department` (case-insensitive)
- From filtered list, return only those with `performanceScore ≥ 70`
- Sort result by `salary` descending

| Challenge 📢 | Return filtered array with `name`, `department`, `salary`, `performanceScore`. If no match found → return `[]`. If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `filterByDepartment([
  { name: "Rina", department: "HR", salary: 45000, performanceScore: 85 },
  { name: "Sami", department: "HR", salary: 52000, performanceScore: 60 },
  { name: "Tina", department: "IT", salary: 70000, performanceScore: 90 }
], "hr")` ➔
  `[{ name: "Rina", department: "HR", salary: 45000, performanceScore: 85 }]`

---

## 🧩 PROBLEM–03: 📊 Payroll Summary Engine

⚠️ **Function Name:** `generatePayrollSummary()`

| Input      | `employees` (array of objects) |
| :--------- | :----------------------------- |
| **Output** | object                         |

**Rules:**

Each employee object:

- `name`
- `salary` (number, > 0)
- `department`

**Requirements:**

- `totalPayroll` → sum of all salaries
- `averageSalary` → mean salary (rounded to 2 decimal places)
- `highestPaid` → employee object with max salary
- `lowestPaid` → employee object with min salary
- `departmentWiseTotal` → object where each key is a department name and value is the total salary of that department

| Challenge 📢 | Return full summary object. If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------- |

**Sample Input & Output:**

- `generatePayrollSummary([
  { name: "A", salary: 50000, department: "IT" },
  { name: "B", salary: 30000, department: "HR" },
  { name: "C", salary: 70000, department: "IT" }
])` ➔
  `{
  totalPayroll: 150000,
  averageSalary: 50000,
  highestPaid: { name: "C", salary: 70000, department: "IT" },
  lowestPaid: { name: "B", salary: 30000, department: "HR" },
  departmentWiseTotal: { IT: 120000, HR: 30000 }
}`

---

## 🧩 PROBLEM–04: 🏆 Top Performer Finder

⚠️ **Function Name:** `findTopPerformer()`

| Input      | `employees` (array of objects), `department` (string) |
| :--------- | :---------------------------------------------------- |
| **Output** | object                                                |

**Rules:**

Each employee object:

- `name`
- `department`
- `performanceScore` (0–100)
- `salary` (number, > 0)

**Lookup Rules:**

- Find the employee with the **highest performanceScore** in the given department
- If tie → pick the one with **higher salary**
- If department not found → return `"Department Not Found"`

| Challenge 📢 | Return single employee object with `name`, `department`, `performanceScore`, `salary`. If invalid input → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `findTopPerformer([
  { name: "Arif", department: "IT", performanceScore: 92, salary: 60000 },
  { name: "Nila", department: "IT", performanceScore: 92, salary: 75000 },
  { name: "Reza", department: "HR", performanceScore: 88, salary: 50000 }
], "IT")` ➔
  `{ name: "Nila", department: "IT", performanceScore: 92, salary: 75000 }`

---

## 🧩 PROBLEM–05: 🔥 Salary Ranking Engine

⚠️ **Function Name:** `rankEmployeesBySalary()`

| Input      | `employees` (array of objects) |
| :--------- | :----------------------------- |
| **Output** | array of objects               |

**Rules:**

Each employee object:

- `name`
- `salary` (number, > 0)
- `department`
- `performanceScore` (0–100)

**Ranking Rules:**

- Rank by `salary` descending
- If tie → higher `performanceScore` wins
- If still tie → same rank (shared rank)
- Salary Band assignment:

| Salary Range    | Band        |
| :-------------- | :---------- |
| > 80,000        | "EXECUTIVE" |
| 50,001 – 80,000 | "SENIOR"    |
| 30,001 – 50,000 | "MID"       |
| ≤ 30,000        | "JUNIOR"    |

| Challenge 📢 | Return array with `name`, `salary`, `rank`, `salaryBand`. If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `rankEmployeesBySalary([
  { name: "X", salary: 90000, department: "IT", performanceScore: 88 },
  { name: "Y", salary: 55000, department: "HR", performanceScore: 75 },
  { name: "Z", salary: 55000, department: "IT", performanceScore: 80 }
])` ➔
  `[
  { name: "X", salary: 90000, rank: 1, salaryBand: "EXECUTIVE" },
  { name: "Z", salary: 55000, rank: 2, salaryBand: "SENIOR" },
  { name: "Y", salary: 55000, rank: 3, salaryBand: "SENIOR" }
]`

---
