# 🎓 JS DAILY PRACTICE – DAY-163

📅 **Goal:** Student Registry System (Object-Based Data Modeling)
🎯 **Focus:** Object Nesting • Destructuring • Spread Operator • Immutability • Deep vs Shallow Copy

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 🎓 Student Record Builder

⚠️ **Function Name:** `buildStudentRecord()`

| Input      | `personalInfo` (object), `academicInfo` (object), `enrollmentInfo` (object) |
| :--------- | :-------------------------------------------------------------------------- |
| **Output** | object                                                                      |

**Rules:**

`personalInfo` object:

- `firstName` (string, non-empty)
- `lastName` (string, non-empty)
- `age` (number, 10–30)

`academicInfo` object:

- `department` (string, non-empty)
- `semester` (number, integer, 1–12)
- `cgpa` (number, 0.00–4.00)

`enrollmentInfo` object:

- `studentId` (string, non-empty)
- `scholarshipPercent` (number, 0–100)
- `tuitionFee` (number, > 0)

**Build Rules:**

- Use **spread operator** to merge all three into one student record
- Add computed field: `fullName = firstName + " " + lastName`
- Add computed field: `discountedFee = tuitionFee - (tuitionFee × scholarshipPercent / 100)` (rounded to 2 decimal places)
- Add computed field: `academicStanding` based on `cgpa`:
  - ≥ 3.75 → "DISTINCTION"
  - 3.00 – 3.74 → "GOOD STANDING"
  - 2.00 – 2.99 → "AVERAGE"
  - < 2.00 → "PROBATION"
- Add field: `enrolledAt = "2025-01-01"` (fixed string)

| Challenge 📢 | Return single merged student object with all fields from the three inputs plus `fullName`, `discountedFee`, `academicStanding`, `enrolledAt`. If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `buildStudentRecord(
  { firstName: "Raka", lastName: "Chowdhury", age: 20 },
  { department: "CSE", semester: 5, cgpa: 3.80 },
  { studentId: "STU-001", scholarshipPercent: 25, tuitionFee: 40000 }
)` ➔

  `{
  firstName: "Raka",
  lastName: "Chowdhury",
  age: 20,
  department: "CSE",
  semester: 5,
  cgpa: 3.80,
  studentId: "STU-001",
  scholarshipPercent: 25,
  tuitionFee: 40000,
  fullName: "Raka Chowdhury",
  discountedFee: 30000.00,
  academicStanding: "DISTINCTION",
  enrolledAt: "2025-01-01"
}`

---

## 🧩 PROBLEM–02: ✏️ Student Record Updater

⚠️ **Function Name:** `updateStudentRecord()`

| Input      | `existingStudent` (object), `updates` (object) |
| :--------- | :--------------------------------------------- |
| **Output** | object                                         |

**Rules:**

`existingStudent` must have at minimum:

- `studentId` (string, non-empty)
- `fullName` (string, non-empty)
- `cgpa` (number, 0.00–4.00)
- `scholarshipPercent` (number, 0–100)
- `tuitionFee` (number, > 0)

`updates` object:

- May contain any subset of: `cgpa`, `semester`, `scholarshipPercent`, `tuitionFee`, `department`
- Must be a non-empty object (at least 1 key)

**Update Rules:**

- Use **spread operator** to merge: original student + updates
- Do NOT mutate the original `existingStudent` object
- If `updates` contains `cgpa`, validate it is still 0.00–4.00
- If `updates` contains `scholarshipPercent`, validate it is still 0–100
- If `updates` contains `tuitionFee`, validate it is still > 0
- Recompute `discountedFee = final tuitionFee × (1 − final scholarshipPercent / 100)` (rounded to 2 decimal places)
- Recompute `academicStanding` based on final `cgpa`:
  - ≥ 3.75 → "DISTINCTION"
  - 3.00 – 3.74 → "GOOD STANDING"
  - 2.00 – 2.99 → "AVERAGE"
  - < 2.00 → "PROBATION"
- Add field: `lastUpdated = "2025-01-01"` (fixed string)

| Challenge 📢 | Return new updated student object (original stays unchanged). If any updated field is invalid → `"Invalid Input"`. If input is invalid → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `updateStudentRecord(
  { studentId: "STU-002", fullName: "Imran Hossain", cgpa: 2.80, scholarshipPercent: 10, tuitionFee: 35000 },
  { cgpa: 3.50, scholarshipPercent: 30 }
)` ➔

  `{
  studentId: "STU-002",
  fullName: "Imran Hossain",
  cgpa: 3.50,
  scholarshipPercent: 30,
  tuitionFee: 35000,
  discountedFee: 24500.00,
  academicStanding: "GOOD STANDING",
  lastUpdated: "2025-01-01"
}`

---

## 🧩 PROBLEM–03: 🔍 Student Record Extractor

⚠️ **Function Name:** `extractStudentSections()`

| Input      | `studentRecord` (object) |
| :--------- | :----------------------- |
| **Output** | object                   |

**Rules:**

`studentRecord` must contain:

- `studentId` (string)
- `fullName` (string)
- `age` (number)
- `department` (string)
- `semester` (number)
- `cgpa` (number)
- `academicStanding` (string)
- `tuitionFee` (number)
- `discountedFee` (number)
- `scholarshipPercent` (number)
- `enrolledAt` (string)

**Extraction Rules:**

- Use **destructuring** to split the flat record into 3 nested sections:
  - `personal` → `{ studentId, fullName, age }`
  - `academic` → `{ department, semester, cgpa, academicStanding }`
  - `financial` → `{ tuitionFee, discountedFee, scholarshipPercent }`
- Add field `registrySummary`:
  - `enrolledOn = enrolledAt`
  - `hasScholarship = scholarshipPercent > 0`
  - `isOnProbation = academicStanding === "PROBATION"`

| Challenge 📢 | Return `{ personal, academic, financial, registrySummary }`. If any required field is missing → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `extractStudentSections({
  studentId: "STU-003",
  fullName: "Nusrat Jahan",
  age: 22,
  department: "BBA",
  semester: 7,
  cgpa: 1.80,
  academicStanding: "PROBATION",
  tuitionFee: 30000,
  discountedFee: 30000,
  scholarshipPercent: 0,
  enrolledAt: "2025-01-01"
})` ➔

  `{
  personal: { studentId: "STU-003", fullName: "Nusrat Jahan", age: 22 },
  academic: { department: "BBA", semester: 7, cgpa: 1.80, academicStanding: "PROBATION" },
  financial: { tuitionFee: 30000, discountedFee: 30000, scholarshipPercent: 0 },
  registrySummary: { enrolledOn: "2025-01-01", hasScholarship: false, isOnProbation: true }
}`

---

## 🧩 PROBLEM–04: 📋 Student Deep Cloner

⚠️ **Function Name:** `deepCloneStudent()`

| Input      | `studentRecord` (object) |
| :--------- | :----------------------- |
| **Output** | object                   |

**Rules:**

`studentRecord` must contain:

- `studentId` (string)
- `fullName` (string)
- `permanentAddress` (object with: `district` (string), `division` (string))
- `completedCourses` (array of strings)

**Clone Rules:**

- Create a **deep copy** using `JSON.parse(JSON.stringify())`
- After cloning, add field to clone: `cloneTag = "CLONED"`
- Modify clone's `permanentAddress.district = "Unknown"` — original's `permanentAddress.district` must stay unchanged
- Push `"cloned-course"` into clone's `completedCourses` — original's `completedCourses` must stay unchanged
- Return **both** original and clone to prove deep copy worked

| Challenge 📢 | Return `{ original, clone }` where clone has modified `permanentAddress.district`, updated `completedCourses`, and `cloneTag: "CLONED"` — original must be fully unchanged. If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `deepCloneStudent({
  studentId: "STU-004",
  fullName: "Fahim Alam",
  permanentAddress: { district: "Comilla", division: "Chattogram" },
  completedCourses: ["CSE101", "MATH201"]
})` ➔

  `{
  original: {
    studentId: "STU-004",
    fullName: "Fahim Alam",
    permanentAddress: { district: "Comilla", division: "Chattogram" },
    completedCourses: ["CSE101", "MATH201"]
  },
  clone: {
    studentId: "STU-004",
    fullName: "Fahim Alam",
    permanentAddress: { district: "Unknown", division: "Chattogram" },
    completedCourses: ["CSE101", "MATH201", "cloned-course"],
    cloneTag: "CLONED"
  }
}`

---

## 🧩 PROBLEM–05: 🏆 Student Profile Completeness Scorer

⚠️ **Function Name:** `scoreStudentProfile()`

| Input      | `studentRecord` (object) |
| :--------- | :----------------------- |
| **Output** | object                   |

**Rules:**

`studentRecord` may or may not contain these fields:

- `fullName` (string, non-empty)
- `studentId` (string, non-empty)
- `department` (string, non-empty)
- `semester` (number, counts if ≥ 1)
- `cgpa` (number, counts if ≥ 0 and key exists)
- `tuitionFee` (number, counts if > 0)
- `email` (string, counts if contains "@")
- `phone` (string, non-empty)
- `permanentAddress` (object, counts if non-null)
- `completedCourses` (array, counts if non-empty)

**Scoring Rules:**

| Field              | Points |
| :----------------- | :----- |
| `fullName`         | 15     |
| `studentId`        | 15     |
| `department`       | 15     |
| `semester`         | 10     |
| `cgpa`             | 10     |
| `tuitionFee`       | 10     |
| `email`            | 10     |
| `phone`            | 5      |
| `permanentAddress` | 5      |
| `completedCourses` | 5      |

- `totalScore` = sum of points for present + valid fields
- `maxScore` = 100

**Registry Status:**

| totalScore | status                 |
| :--------- | :--------------------- |
| 100        | "FULLY REGISTERED"     |
| 70 – 99    | "MOSTLY REGISTERED"    |
| 40 – 69    | "PARTIALLY REGISTERED" |
| < 40       | "INCOMPLETE"           |

- `missingFields` → array of field names that are absent or invalid

| Challenge 📢 | Return `{ totalScore, maxScore: 100, status, missingFields }`. If `studentRecord` is not an object or is null → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `scoreStudentProfile({
  fullName: "Tasnim Akter",
  studentId: "STU-005",
  department: "EEE",
  semester: 4,
  cgpa: 3.20,
  tuitionFee: 38000,
  email: "tasnim@university.edu",
  phone: "",
  permanentAddress: null,
  completedCourses: ["EEE101", "MATH101"]
})` ➔

  `{
  totalScore: 90,
  maxScore: 100,
  status: "MOSTLY REGISTERED",
  missingFields: ["phone", "permanentAddress"]
}`

---
