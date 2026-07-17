# 🎓 JS DAILY PRACTICE – DAY-199

📅 **Goal:** Healthcare Triage Decision System (Rule Engine & Decision System Design)
🎯 **Focus:** Multi-Condition Decision Trees • Scoring Systems • Priority-Based Logic • Rule-Based Output Generation

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 🚑 Emergency Severity Gate

⚠️ **Function Name:** `checkEmergencyStatus()`

| Input      | `patient` (object) |
| :--------- | :----------------- |
| **Output** | object             |

**Rules:**

`patient` object:

- `heartRate` (number, > 0)
- `oxygenSaturation` (number, 0–100)
- `consciousnessLevel` (string: "ALERT", "CONFUSED", "UNRESPONSIVE")
- `bodyTemperature` (number, in Celsius, > 0)

**Decision Tree Rules (check in this exact order — ANY single match means immediate emergency):**

1. `consciousnessLevel === "UNRESPONSIVE"` → emergency: `"Unresponsive patient"`
2. `oxygenSaturation < 90` → emergency: `"Critical oxygen saturation"`
3. `heartRate < 40 OR heartRate > 150` → emergency: `"Critical heart rate"`
4. `bodyTemperature >= 40` → emergency: `"Dangerously high fever"`

**Output Rules:**

- `isEmergency` → true if ANY condition matches (check in order, report the FIRST match only)
- `emergencyReason` → the first matching reason, or `null` if none match

| Challenge 📢 | Return `{ isEmergency, emergencyReason }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `checkEmergencyStatus({
  heartRate: 160,
  oxygenSaturation: 95,
  consciousnessLevel: "ALERT",
  bodyTemperature: 37
})` ➔

  `{
  isEmergency: true,
  emergencyReason: "Critical heart rate"
}`

---

## 🧩 PROBLEM–02: 📊 Triage Priority Scorer

⚠️ **Function Name:** `calculateTriageScore()`

| Input      | `patient` (object) |
| :--------- | :----------------- |
| **Output** | object             |

**Rules:**

`patient` object (for NON-emergency patients):

- `painLevel` (number, integer, 0–10)
- `symptomDurationHours` (number, ≥ 0)
- `age` (number, ≥ 0)
- `hasChronicCondition` (boolean)

**Scoring Rules (additive urgency points):**

| Condition                            | Points |
| :----------------------------------- | :----- |
| `painLevel >= 8`                     | 30     |
| `painLevel >= 5 AND < 8`             | 15     |
| `painLevel >= 1 AND < 5`             | 5      |
| `symptomDurationHours < 1`           | 20     |
| `symptomDurationHours >= 1 AND < 24` | 10     |
| `age >= 65 OR age <= 5`              | 15     |
| `hasChronicCondition === true`       | 10     |

- `triageScore` = sum of matched points

**Triage Category:**

| triageScore | category     | maxWaitMinutes |
| :---------- | :----------- | :------------- |
| ≥ 50        | "URGENT"     | 15             |
| 25 – 49     | "STANDARD"   | 60             |
| < 25        | "NON_URGENT" | 120            |

| Challenge 📢 | Return `{ triageScore, category, maxWaitMinutes }`. If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `calculateTriageScore({
  painLevel: 7,
  symptomDurationHours: 0.5,
  age: 70,
  hasChronicCondition: true
})` ➔

  `{
  triageScore: 60,
  category: "URGENT",
  maxWaitMinutes: 15
}`

---

## 🧩 PROBLEM–03: 🏥 Department Routing Engine

⚠️ **Function Name:** `routeToDepartment()`

| Input      | `symptoms` (array of strings), `triageCategory` (string) |
| :--------- | :------------------------------------------------------- |
| **Output** | object                                                   |

**Rules:**

`symptoms` — non-empty array of strings (lowercase keywords, e.g. `["chest pain", "shortness of breath"]`)
`triageCategory` must be one of: `"URGENT"`, `"STANDARD"`, `"NON_URGENT"`

**Routing Rules (check symptom keywords in this priority order, first match wins):**

1. If any symptom contains `"chest pain"` or `"breathing"` → route to `"CARDIOLOGY_EMERGENCY"`
2. If any symptom contains `"fracture"` or `"bleeding"` → route to `"ORTHOPEDIC_TRAUMA"`
3. If any symptom contains `"fever"` or `"infection"` → route to `"INTERNAL_MEDICINE"`
4. If none match → route based on `triageCategory`:
   - `"URGENT"` → `"GENERAL_EMERGENCY"`
   - `"STANDARD"` → `"GENERAL_PRACTICE"`
   - `"NON_URGENT"` → `"OUTPATIENT_CLINIC"`

| Challenge 📢 | Return `{ department, matchedKeyword }` (`matchedKeyword` is the symptom string that triggered keyword-based routing, or `null` if routed by `triageCategory` fallback). If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `routeToDepartment(["mild headache", "shortness of breath"], "URGENT")` ➔

  `{
  department: "GENERAL_EMERGENCY",
  matchedKeyword: null
}`

---

## 🧩 PROBLEM–04: 📋 Waiting Room Queue Manager

⚠️ **Function Name:** `manageWaitingQueue()`

| Input      | `patients` (array of objects) |
| :--------- | :---------------------------- |
| **Output** | array of objects              |

**Rules:**

`patients` — non-empty array, each entry:

- `patientName` (string)
- `triageScore` (number, ≥ 0)
- `arrivalOrder` (number, integer, ≥ 1) — lower number means arrived earlier

**Queue Rules:**

- Rank by `triageScore` descending (higher urgency seen first)
- If tie → lower `arrivalOrder` wins (first-come-first-served as tiebreaker)
- If still tie → same rank
- `estimatedCallTime` based on rank: `(rank - 1) × 10` minutes (rank 1 = called immediately at 0 minutes)

| Challenge 📢 | Return array with `{ patientName, triageScore, rank, estimatedCallTime }`. If invalid input → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `manageWaitingQueue([
  { patientName: "Rina", triageScore: 40, arrivalOrder: 2 },
  { patientName: "Sabbir", triageScore: 55, arrivalOrder: 1 },
  { patientName: "Tuli", triageScore: 40, arrivalOrder: 1 }
])` ➔

  `[
  { patientName: "Sabbir", triageScore: 55, rank: 1, estimatedCallTime: 0 },
  { patientName: "Tuli", triageScore: 40, rank: 2, estimatedCallTime: 10 },
  { patientName: "Rina", triageScore: 40, rank: 3, estimatedCallTime: 20 }
]`

---

## 🧩 PROBLEM–05: 🏗️ Full Triage Decision Pipeline

⚠️ **Function Name:** `runTriagePipeline()`

| Input      | `patient` (object), `symptoms` (array of strings) |
| :--------- | :------------------------------------------------ |
| **Output** | object                                            |

**Rules:**

This problem composes Problems 1, 2, and 3 into one full pipeline.

`patient` object combines fields from Problems 1 and 2:

- `heartRate` (number, > 0)
- `oxygenSaturation` (number, 0–100)
- `consciousnessLevel` (string)
- `bodyTemperature` (number, > 0)
- `painLevel` (number, integer, 0–10)
- `symptomDurationHours` (number, ≥ 0)
- `age` (number, ≥ 0)
- `hasChronicCondition` (boolean)

`symptoms` — same as Problem 3

**Pipeline Rules:**

1. Run equivalent of `checkEmergencyStatus()` first
   - If emergency → SKIP triage scoring entirely, route directly using emergency logic: `department = "CARDIOLOGY_EMERGENCY"` if symptoms mention chest pain/breathing, `"TRAUMA_EMERGENCY"` if fracture/bleeding mentioned, otherwise `"GENERAL_EMERGENCY"` — return immediately with `triageCategory: "EMERGENCY"`
2. If NOT emergency, run equivalent of `calculateTriageScore()` to get `category`
3. Run equivalent of `routeToDepartment()` using `symptoms` and the `category` from step 2

| Challenge 📢 | Return `{ triageCategory, department, isEmergency }`. If invalid input → `"Invalid Input"` |
| :----------- | :----------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `runTriagePipeline(
  { heartRate: 80, oxygenSaturation: 98, consciousnessLevel: "ALERT", bodyTemperature: 39.5, painLevel: 6, symptomDurationHours: 12, age: 30, hasChronicCondition: false },
  ["high fever", "body ache"]
)` ➔

  `{
  triageCategory: "STANDARD",
  department: "INTERNAL_MEDICINE",
  isEmergency: false
}`

---
