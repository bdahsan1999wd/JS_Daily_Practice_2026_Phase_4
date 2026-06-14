# 🎓 JS DAILY PRACTICE – DAY-165

📅 **Goal:** Hospital Patient Record System (Object-Based Data Modeling)
🎯 **Focus:** Object Nesting • Destructuring • Spread Operator • Immutability • Deep vs Shallow Copy

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 🏥 Patient Admission Builder

⚠️ **Function Name:** `admitPatient()`

| Input      | `patientInfo` (object), `admissionInfo` (object) |
| :--------- | :----------------------------------------------- |
| **Output** | object                                           |

**Rules:**

`patientInfo` object:

- `patientId` (string, non-empty)
- `name` (string, non-empty)
- `age` (number, 0–120)
- `bloodGroup` (string: "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")

`admissionInfo` object:

- `ward` (string: "GENERAL", "ICU", "EMERGENCY", "PRIVATE")
- `diagnosis` (string, non-empty)
- `dailyCharge` (number, > 0)
- `admittedDays` (number, integer, ≥ 1)

**Build Rules:**

- Use **spread operator** to merge both objects
- Add computed field: `totalBill = dailyCharge × admittedDays`
- Add computed field: `ward Surcharge` based on `ward`:
  - "ICU" → additional 50% of `totalBill`
  - "PRIVATE" → additional 30% of `totalBill`
  - "EMERGENCY" → additional 20% of `totalBill`
  - "GENERAL" → 0
- Add computed field: `finalBill = totalBill + wardSurcharge` (rounded to 2 decimal places)
- Add computed field: `ageGroup`:
  - < 13 → "CHILD"
  - 13 – 17 → "TEEN"
  - 18 – 59 → "ADULT"
  - ≥ 60 → "SENIOR"
- Add field: `admittedAt = "2025-01-01"` (fixed string)

| Challenge 📢 | Return merged patient admission object with all input fields plus `totalBill`, `wardSurcharge`, `finalBill`, `ageGroup`, `admittedAt`. If invalid input → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `admitPatient(
  { patientId: "P-001", name: "Kamal Uddin", age: 65, bloodGroup: "B+" },
  { ward: "ICU", diagnosis: "Cardiac Arrest", dailyCharge: 5000, admittedDays: 4 }
)` ➔

  `{
  patientId: "P-001",
  name: "Kamal Uddin",
  age: 65,
  bloodGroup: "B+",
  ward: "ICU",
  diagnosis: "Cardiac Arrest",
  dailyCharge: 5000,
  admittedDays: 4,
  totalBill: 20000,
  wardSurcharge: 10000,
  finalBill: 30000.00,
  ageGroup: "SENIOR",
  admittedAt: "2025-01-01"
}`

---

## 🧩 PROBLEM–02: 💊 Prescription Updater

⚠️ **Function Name:** `updatePrescription()`

| Input      | `existingRecord` (object), `prescriptionUpdate` (object) |
| :--------- | :------------------------------------------------------- |
| **Output** | object                                                   |

**Rules:**

`existingRecord` must contain:

- `patientId` (string, non-empty)
- `name` (string, non-empty)
- `diagnosis` (string, non-empty)
- `medications` (array of strings, ≥ 0 items)
- `admittedDays` (number, integer, ≥ 1)
- `dailyCharge` (number, > 0)

`prescriptionUpdate` object:

- May contain any subset of: `diagnosis`, `admittedDays`, `dailyCharge`
- Must also contain: `newMedications` (array of strings) — new drugs to ADD to existing list
- `newMedications` must be an array (can be empty)

**Update Rules:**

- Use **spread operator** — do NOT mutate original
- If `prescriptionUpdate` contains `admittedDays`, validate it is still ≥ 1
- If `prescriptionUpdate` contains `dailyCharge`, validate it is still > 0
- Merge medications: `updatedMedications = [...existingRecord.medications, ...newMedications]`
- Recompute `totalBill = final dailyCharge × final admittedDays`
- Add field: `lastReviewed = "2025-01-01"`
- Return new record with `medications` replaced by `updatedMedications` — do NOT keep `newMedications` in output

| Challenge 📢 | Return updated patient record. Original must stay unchanged. If invalid → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `updatePrescription(
  { patientId: "P-002", name: "Rina Begum", diagnosis: "Typhoid", medications: ["Paracetamol", "ORS"], admittedDays: 3, dailyCharge: 2000 },
  { admittedDays: 5, newMedications: ["Azithromycin", "Zinc"] }
)` ➔

  `{
  patientId: "P-002",
  name: "Rina Begum",
  diagnosis: "Typhoid",
  medications: ["Paracetamol", "ORS", "Azithromycin", "Zinc"],
  admittedDays: 5,
  dailyCharge: 2000,
  totalBill: 10000,
  lastReviewed: "2025-01-01"
}`

---

## 🧩 PROBLEM–03: 🔬 Patient Report Extractor

⚠️ **Function Name:** `extractPatientReport()`

| Input      | `patientRecord` (object) |
| :--------- | :----------------------- |
| **Output** | object                   |

**Rules:**

`patientRecord` must contain:

- `patientId` (string)
- `name` (string)
- `age` (number)
- `bloodGroup` (string)
- `ward` (string)
- `diagnosis` (string)
- `medications` (array)
- `dailyCharge` (number)
- `admittedDays` (number)
- `finalBill` (number)
- `admittedAt` (string)

**Extraction Rules:**

- Use **destructuring** to split into 3 sections:
  - `identity` → `{ patientId, name, age, bloodGroup }`
  - `medical` → `{ ward, diagnosis, medications }`
  - `billing` → `{ dailyCharge, admittedDays, finalBill }`
- Add field `reportSummary`:
  - `admissionDate = admittedAt`
  - `medicationCount = medications.length`
  - `isCritical = ward === "ICU" || ward === "EMERGENCY"`

| Challenge 📢 | Return `{ identity, medical, billing, reportSummary }`. If any required field is missing → `"Invalid Input"` |
| :----------- | :----------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `extractPatientReport({
  patientId: "P-003",
  name: "Sumon Ali",
  age: 42,
  bloodGroup: "O+",
  ward: "EMERGENCY",
  diagnosis: "Appendicitis",
  medications: ["Morphine", "Amoxicillin", "IV Fluids"],
  dailyCharge: 3500,
  admittedDays: 2,
  finalBill: 8400,
  admittedAt: "2025-01-01"
})` ➔

  `{
  identity: { patientId: "P-003", name: "Sumon Ali", age: 42, bloodGroup: "O+" },
  medical: { ward: "EMERGENCY", diagnosis: "Appendicitis", medications: ["Morphine", "Amoxicillin", "IV Fluids"] },
  billing: { dailyCharge: 3500, admittedDays: 2, finalBill: 8400 },
  reportSummary: { admissionDate: "2025-01-01", medicationCount: 3, isCritical: true }
}`

---

## 🧩 PROBLEM–04: 🔁 Patient Transfer System

⚠️ **Function Name:** `transferPatient()`

| Input      | `patientRecord` (object), `newWard` (string) |
| :--------- | :------------------------------------------- |
| **Output** | object                                       |

**Rules:**

`patientRecord` must contain:

- `patientId` (string)
- `name` (string)
- `ward` (string: "GENERAL", "ICU", "EMERGENCY", "PRIVATE")
- `dailyCharge` (number, > 0)
- `admittedDays` (number, integer, ≥ 1)
- `transferHistory` (array of strings)

`newWard` must be one of: "GENERAL", "ICU", "EMERGENCY", "PRIVATE"
`newWard` must be different from current `ward` → if same, return `"Invalid Input"`

**Transfer Rules:**

- Use **deep copy** (`JSON.parse(JSON.stringify())`) — do NOT mutate original
- Update `ward` to `newWard`
- Update `dailyCharge` based on `newWard`:
  - "ICU" → 8000
  - "PRIVATE" → 5000
  - "EMERGENCY" → 6000
  - "GENERAL" → 2000
- Push to `transferHistory`: `"Transferred to " + newWard` — original's `transferHistory` must stay unchanged
- Add field: `transferredAt = "2025-01-01"`
- Return `{ original, updated }` to prove original is unchanged

| Challenge 📢 | Return `{ original, updated }`. If invalid → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------- |

**Sample Input & Output:**

- `transferPatient(
  { patientId: "P-004", name: "Fatema Khanam", ward: "GENERAL", dailyCharge: 2000, admittedDays: 3, transferHistory: ["Admitted to GENERAL"] },
  "PRIVATE"
)` ➔

  `{
  original: {
    patientId: "P-004",
    name: "Fatema Khanam",
    ward: "GENERAL",
    dailyCharge: 2000,
    admittedDays: 3,
    transferHistory: ["Admitted to GENERAL"]
  },
  updated: {
    patientId: "P-004",
    name: "Fatema Khanam",
    ward: "PRIVATE",
    dailyCharge: 5000,
    admittedDays: 3,
    transferHistory: ["Admitted to GENERAL", "Transferred to PRIVATE"],
    transferredAt: "2025-01-01"
  }
}`

---

## 🧩 PROBLEM–05: 📋 Discharge Summary Generator

⚠️ **Function Name:** `generateDischargeSummary()`

| Input      | `patientRecord` (object) |
| :--------- | :----------------------- |
| **Output** | object                   |

**Rules:**

`patientRecord` must contain:

- `patientId` (string, non-empty)
- `name` (string, non-empty)
- `age` (number, 0–120)
- `ward` (string, non-empty)
- `diagnosis` (string, non-empty)
- `medications` (array, ≥ 1 item)
- `admittedDays` (number, integer, ≥ 1)
- `dailyCharge` (number, > 0)
- `admittedAt` (string, non-empty)

**Summary Rules:**

- Use **destructuring** to extract all fields
- Compute `totalBill = dailyCharge × admittedDays`
- Compute `wardSurcharge` based on `ward`:
  - "ICU" → 50% of `totalBill`
  - "PRIVATE" → 30% of `totalBill`
  - "EMERGENCY" → 20% of `totalBill`
  - "GENERAL" → 0
- Compute `finalBill = totalBill + wardSurcharge` (rounded to 2 decimal places)
- Compute `recoveryStatus` based on `admittedDays`:
  - ≤ 3 → "SHORT STAY"
  - 4 – 7 → "MODERATE STAY"
  - 8 – 14 → "EXTENDED STAY"
  - > 14 → "LONG TERM CARE"
- Add `dischargedAt = "2025-01-01"`

| Challenge 📢 | Return `{ patientId, name, age, ward, diagnosis, medications, admittedAt, dischargedAt, admittedDays, totalBill, wardSurcharge, finalBill, recoveryStatus }`. If any required field is missing or invalid → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `generateDischargeSummary({
  patientId: "P-005",
  name: "Arif Billah",
  age: 38,
  ward: "PRIVATE",
  diagnosis: "Pneumonia",
  medications: ["Azithromycin", "Prednisolone", "Salbutamol"],
  admittedDays: 6,
  dailyCharge: 4000,
  admittedAt: "2025-01-01"
})` ➔

  `{
  patientId: "P-005",
  name: "Arif Billah",
  age: 38,
  ward: "PRIVATE",
  diagnosis: "Pneumonia",
  medications: ["Azithromycin", "Prednisolone", "Salbutamol"],
  admittedAt: "2025-01-01",
  dischargedAt: "2025-01-01",
  admittedDays: 6,
  totalBill: 24000,
  wardSurcharge: 7200,
  finalBill: 31200.00,
  recoveryStatus: "MODERATE STAY"
}`

---
