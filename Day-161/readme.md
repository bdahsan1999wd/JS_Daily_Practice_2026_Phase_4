# 🎓 JS DAILY PRACTICE – DAY-161

📅 **Goal:** Employee Database System (Object-Based Data Modeling)
🎯 **Focus:** Object Nesting • Destructuring • Spread Operator • Immutability • Deep vs Shallow Copy

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 🧑‍💼 Employee Record Builder

⚠️ **Function Name:** `buildEmployeeRecord()`

| Input      | `personalInfo` (object), `jobInfo` (object), `compensationInfo` (object) |
| :--------- | :----------------------------------------------------------------------- |
| **Output** | object                                                                   |

**Rules:**

`personalInfo` object:

- `firstName` (string, non-empty)
- `lastName` (string, non-empty)
- `age` (number, 18–60)

`jobInfo` object:

- `department` (string, non-empty)
- `designation` (string, non-empty)
- `yearsOfExperience` (number, ≥ 0)

`compensationInfo` object:

- `baseSalary` (number, > 0)
- `bonusPercent` (number, 0–100)

**Build Rules:**

- Use **spread operator** to merge all three into one employee record
- Add computed field: `fullName = firstName + " " + lastName`
- Add computed field: `bonusAmount = baseSalary × bonusPercent / 100` (rounded to 2 decimal places)
- Add computed field: `seniorityLevel` based on `yearsOfExperience`:
  - ≥ 10 → "SENIOR"
  - 5 – 9 → "MID-LEVEL"
  - 1 – 4 → "JUNIOR"
  - < 1 → "FRESHER"
- Add field: `joinedAt = "2025-01-01"` (fixed string)

| Challenge 📢 | Return single merged employee object with all fields from the three inputs plus `fullName`, `bonusAmount`, `seniorityLevel`, `joinedAt`. If invalid input → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `buildEmployeeRecord(
  { firstName: "Shakil", lastName: "Hasan", age: 32 },
  { department: "Engineering", designation: "Software Engineer", yearsOfExperience: 6 },
  { baseSalary: 80000, bonusPercent: 15 }
)` ➔

  `{
  firstName: "Shakil",
  lastName: "Hasan",
  age: 32,
  department: "Engineering",
  designation: "Software Engineer",
  yearsOfExperience: 6,
  baseSalary: 80000,
  bonusPercent: 15,
  fullName: "Shakil Hasan",
  bonusAmount: 12000.00,
  seniorityLevel: "MID-LEVEL",
  joinedAt: "2025-01-01"
}`

---

## 🧩 PROBLEM–02: ✏️ Employee Record Updater

⚠️ **Function Name:** `updateEmployeeRecord()`

| Input      | `existingEmployee` (object), `updates` (object) |
| :--------- | :---------------------------------------------- |
| **Output** | object                                          |

**Rules:**

`existingEmployee` must have at minimum:

- `employeeId` (string, non-empty)
- `fullName` (string, non-empty)
- `baseSalary` (number, > 0)
- `bonusPercent` (number, 0–100)
- `yearsOfExperience` (number, ≥ 0)

`updates` object:

- May contain any subset of: `designation`, `department`, `baseSalary`, `bonusPercent`, `yearsOfExperience`
- Must be a non-empty object (at least 1 key)

**Update Rules:**

- Use **spread operator** to merge: original employee + updates
- Do NOT mutate the original `existingEmployee` object
- If `updates` contains `baseSalary`, validate it is still > 0
- If `updates` contains `bonusPercent`, validate it is still 0–100
- If `updates` contains `yearsOfExperience`, validate it is still ≥ 0
- Recompute `bonusAmount = final baseSalary × final bonusPercent / 100` (rounded to 2 decimal places)
- Recompute `seniorityLevel` based on final `yearsOfExperience`:
  - ≥ 10 → "SENIOR"
  - 5 – 9 → "MID-LEVEL"
  - 1 – 4 → "JUNIOR"
  - < 1 → "FRESHER"
- Add field: `lastUpdated = "2025-01-01"` (fixed string)

| Challenge 📢 | Return new updated employee object (original stays unchanged). If any updated field is invalid → `"Invalid Input"`. If input is invalid → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `updateEmployeeRecord(
  { employeeId: "E001", fullName: "Mitu Akter", baseSalary: 60000, bonusPercent: 10, yearsOfExperience: 4 },
  { baseSalary: 70000, yearsOfExperience: 10 }
)` ➔

  `{
  employeeId: "E001",
  fullName: "Mitu Akter",
  baseSalary: 70000,
  bonusPercent: 10,
  yearsOfExperience: 10,
  bonusAmount: 7000.00,
  seniorityLevel: "SENIOR",
  lastUpdated: "2025-01-01"
}`

---

## 🧩 PROBLEM–03: 🔍 Employee Record Extractor

⚠️ **Function Name:** `extractEmployeeSections()`

| Input      | `employeeRecord` (object) |
| :--------- | :------------------------ |
| **Output** | object                    |

**Rules:**

`employeeRecord` must contain:

- `employeeId` (string)
- `fullName` (string)
- `age` (number)
- `department` (string)
- `designation` (string)
- `yearsOfExperience` (number)
- `baseSalary` (number)
- `bonusAmount` (number)
- `seniorityLevel` (string)
- `joinedAt` (string)

**Extraction Rules:**

- Use **destructuring** to split the flat record into 3 nested sections:
  - `personal` → `{ employeeId, fullName, age }`
  - `job` → `{ department, designation, yearsOfExperience, seniorityLevel }`
  - `compensation` → `{ baseSalary, bonusAmount }`
- Add field `hrSummary`:
  - `hiredOn = joinedAt`
  - `isExperienced = yearsOfExperience >= 5`

| Challenge 📢 | Return `{ personal, job, compensation, hrSummary }`. If any required field is missing → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `extractEmployeeSections({
  employeeId: "E002",
  fullName: "Razu Mia",
  age: 29,
  department: "Finance",
  designation: "Analyst",
  yearsOfExperience: 7,
  baseSalary: 65000,
  bonusAmount: 9750,
  seniorityLevel: "MID-LEVEL",
  joinedAt: "2025-01-01"
})` ➔

  `{
  personal: { employeeId: "E002", fullName: "Razu Mia", age: 29 },
  job: { department: "Finance", designation: "Analyst", yearsOfExperience: 7, seniorityLevel: "MID-LEVEL" },
  compensation: { baseSalary: 65000, bonusAmount: 9750 },
  hrSummary: { hiredOn: "2025-01-01", isExperienced: true }
}`

---

## 🧩 PROBLEM–04: 📋 Employee Deep Cloner

⚠️ **Function Name:** `deepCloneEmployee()`

| Input      | `employeeRecord` (object) |
| :--------- | :------------------------ |
| **Output** | object                    |

**Rules:**

`employeeRecord` must contain:

- `employeeId` (string)
- `fullName` (string)
- `officeAddress` (object with: `building` (string), `city` (string))
- `certifications` (array of strings)

**Clone Rules:**

- Create a **deep copy** using `JSON.parse(JSON.stringify())`
- After cloning, add field to clone: `cloneTag = "CLONED"`
- Modify clone's `officeAddress.city = "Unknown"` — original's `officeAddress.city` must stay unchanged
- Push `"cloned-cert"` into clone's `certifications` — original's `certifications` must stay unchanged
- Return **both** original and clone to prove deep copy worked

| Challenge 📢 | Return `{ original, clone }` where clone has modified `officeAddress.city`, updated `certifications`, and `cloneTag: "CLONED"` — original must be fully unchanged. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `deepCloneEmployee({
  employeeId: "E003",
  fullName: "Sadia Parvin",
  officeAddress: { building: "Tower-A", city: "Dhaka" },
  certifications: ["AWS", "PMP"]
})` ➔

  `{
  original: {
    employeeId: "E003",
    fullName: "Sadia Parvin",
    officeAddress: { building: "Tower-A", city: "Dhaka" },
    certifications: ["AWS", "PMP"]
  },
  clone: {
    employeeId: "E003",
    fullName: "Sadia Parvin",
    officeAddress: { building: "Tower-A", city: "Unknown" },
    certifications: ["AWS", "PMP", "cloned-cert"],
    cloneTag: "CLONED"
  }
}`

---

## 🧩 PROBLEM–05: 🏆 Employee Profile Completeness Scorer

⚠️ **Function Name:** `scoreEmployeeProfile()`

| Input      | `employeeRecord` (object) |
| :--------- | :------------------------ |
| **Output** | object                    |

**Rules:**

`employeeRecord` may or may not contain these fields:

- `fullName` (string)
- `age` (number, counts if > 0)
- `department` (string)
- `designation` (string)
- `yearsOfExperience` (number, counts if ≥ 0 and key exists)
- `baseSalary` (number, counts if > 0)
- `bonusPercent` (number, counts if ≥ 0 and key exists)
- `email` (string, counts if contains "@")
- `phone` (string, counts if non-empty)
- `certifications` (array, counts if non-empty)

**Scoring Rules:**

| Field               | Points |
| :------------------ | :----- |
| `fullName`          | 15     |
| `age`               | 5      |
| `department`        | 15     |
| `designation`       | 15     |
| `yearsOfExperience` | 10     |
| `baseSalary`        | 15     |
| `bonusPercent`      | 5      |
| `email`             | 10     |
| `phone`             | 5      |
| `certifications`    | 5      |

- `totalScore` = sum of points for present + valid fields
- `maxScore` = 100

**Profile Status:**

| totalScore | status             |
| :--------- | :----------------- |
| 100        | "COMPLETE"         |
| 70 – 99    | "NEARLY COMPLETE"  |
| 40 – 69    | "PARTIALLY FILLED" |
| < 40       | "INCOMPLETE"       |

- `missingFields` → array of field names that are absent or invalid

| Challenge 📢 | Return `{ totalScore, maxScore: 100, status, missingFields }`. If `employeeRecord` is not an object or is null → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `scoreEmployeeProfile({
  fullName: "Jahid Rahman",
  age: 35,
  department: "IT",
  designation: "Team Lead",
  yearsOfExperience: 8,
  baseSalary: 90000,
  bonusPercent: 20,
  email: "jahid@company.com",
  phone: "",
  certifications: []
})` ➔

  `{
  totalScore: 90,
  maxScore: 100,
  status: "NEARLY COMPLETE",
  missingFields: ["phone", "certifications"]
}`

---
