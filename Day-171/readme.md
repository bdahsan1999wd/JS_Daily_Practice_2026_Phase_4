# 🎓 JS DAILY PRACTICE – DAY-171

📅 **Goal:** Data Pipeline Formatter (ES6+ Modern JavaScript)
🎯 **Focus:** Arrow Functions • Template Literals • Optional Chaining (?.) • Nullish Coalescing (??) • Rest & Spread

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 🔄 Data Normalizer

⚠️ **Function Name:** `normalizeDataFields()`

| Input      | `records` (array of objects), `fieldMap` (object) |
| :--------- | :------------------------------------------------ |
| **Output** | array of objects                                  |

**Rules:**

`records` — non-empty array of objects (fields may be missing — use `??`)
`fieldMap` — non-empty object where:

- key = old field name
- value = new field name to rename it to

**Normalization Rules:**

- Use **arrow function** with `.map()`
- For each record, rename fields according to `fieldMap`
- Fields NOT in `fieldMap` stay unchanged
- If a field in `fieldMap` does not exist in the record → include it in output with value `null`
- Use `??` when reading field values

| Challenge 📢 | Return array of normalized objects. If invalid → `"Invalid Input"` |
| :----------- | :----------------------------------------------------------------- |

**Sample Input & Output:**

- `normalizeDataFields([
  { fname: "Rafi", lname: "Islam", age: 25 },
  { fname: "Mou", age: 30 }
], { fname: "firstName", lname: "lastName" })` ➔

  `[
  { firstName: "Rafi", lastName: "Islam", age: 25 },
  { firstName: "Mou", lastName: null, age: 30 }
]`

---

## 🧩 PROBLEM–02: 🧮 Formula Evaluator

⚠️ **Function Name:** `evaluateFormulas()`

| Input      | `dataset` (array of objects), `formulas` (object) |
| :--------- | :------------------------------------------------ |
| **Output** | array of objects                                  |

**Rules:**

`dataset` — non-empty array of objects, each with numeric fields
`formulas` — object where:

- key = name of the computed field to add
- value = **arrow function** that takes a record and returns a computed value

**Evaluation Rules:**

- Use **arrow function** with `.map()`
- For each record, apply every formula from `formulas`
- Add each computed result as a new field to the record (do NOT mutate original — use spread)
- Use `?.` when accessing nested fields inside formulas
- Round all computed numeric values to 2 decimal places

| Challenge 📢 | Return array where each record has original fields plus all computed formula fields. If invalid → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `evaluateFormulas([
  { baseSalary: 50000, bonusPercent: 10, taxPercent: 15 },
  { baseSalary: 80000, bonusPercent: 5, taxPercent: 20 }
], {
  bonusAmount: r => parseFloat((r.baseSalary * r.bonusPercent / 100).toFixed(2)),
  netSalary: r => parseFloat(((r.baseSalary + r.baseSalary * r.bonusPercent / 100) * (1 - r.taxPercent / 100)).toFixed(2))
})` ➔

  `[
  { baseSalary: 50000, bonusPercent: 10, taxPercent: 15, bonusAmount: 5000.00, netSalary: 46750.00 },
  { baseSalary: 80000, bonusPercent: 5, taxPercent: 20, bonusAmount: 4000.00, netSalary: 67200.00 }
]`

---

## 🧩 PROBLEM–03: 🗃️ Record Grouper & Labeler

⚠️ **Function Name:** `groupAndLabelRecords()`

| Input      | `records` (array of objects), `groupByKey` (string), `labelTemplate` (string) |
| :--------- | :---------------------------------------------------------------------------- |
| **Output** | object                                                                        |

**Rules:**

`records` — non-empty array of objects (fields may be missing — use `?.` and `??`)
`groupByKey` — the field name to group records by (must exist as a key)
`labelTemplate` — a string with `{{count}}` and `{{key}}` placeholders

**Group & Label Rules:**

- Use **arrow function** with `.reduce()` to group
- Group records by value of `groupByKey`
- For each group, build a `label` by replacing `{{count}}` and `{{key}}` in `labelTemplate`:
  - `{{count}}` → number of records in the group
  - `{{key}}` → the group key value
- Return object where each key is a group value, and value is:
  - `{ label, count, records[] }`

| Challenge 📢 | Return grouped object. If invalid → `"Invalid Input"` |
| :----------- | :---------------------------------------------------- |

**Sample Input & Output:**

- `groupAndLabelRecords([
  { name: "Alam", dept: "IT" },
  { name: "Bina", dept: "HR" },
  { name: "Cyrus", dept: "IT" },
  { name: "Dina", dept: "HR" }
], "dept", "{{count}} employee(s) in {{key}}")` ➔

  `{
  IT: {
    label: "2 employee(s) in IT",
    count: 2,
    records: [{ name: "Alam", dept: "IT" }, { name: "Cyrus", dept: "IT" }]
  },
  HR: {
    label: "2 employee(s) in HR",
    count: 2,
    records: [{ name: "Bina", dept: "HR" }, { name: "Dina", dept: "HR" }]
  }
}`

---

## 🧩 PROBLEM–04: 🔀 Pipeline Processor

⚠️ **Function Name:** `runPipeline()`

| Input      | `data` (array), `...steps` (rest parameter — multiple arrow functions) |
| :--------- | :--------------------------------------------------------------------- |
| **Output** | object                                                                 |

**Rules:**

`data` — non-empty array of any values
`...steps` — rest parameter, each step is an **arrow function** that takes an array and returns a transformed array
Must have at least 1 step

**Pipeline Rules:**

- Use **rest parameter** to collect steps
- Run each step sequentially — output of one step is input of next
- Track intermediate results after each step
- Final output = result after all steps applied

| Challenge 📢 | Return `{ originalCount, finalCount, stepsApplied, result }`. If invalid → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `runPipeline(
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  data => data.filter(n => n % 2 === 0),
  data => data.map(n => n * 3),
  data => data.filter(n => n > 10)
)` ➔

  `{
  originalCount: 10,
  finalCount: 4,
  stepsApplied: 3,
  result: [12, 18, 24, 30]
}`

---

## 🧩 PROBLEM–05: 📤 Export Formatter

⚠️ **Function Name:** `formatForExport()`

| Input      | `records` (array of objects), `exportConfig` (object) |
| :--------- | :---------------------------------------------------- |
| **Output** | object                                                |

**Rules:**

`records` — non-empty array of objects (fields may be missing — use `?.` and `??`)

`exportConfig` object:

- `format` (string: `"CSV"`, `"JSON"`, `"MARKDOWN"`)
- `fields` (array of strings — which fields to include)
- `title` (string) — fallback: `"Export"`

**Export Rules:**

- Use **arrow functions** throughout
- Use `?.` and `??` for missing field values (fallback: `"N/A"`)
- Pick only fields listed in `exportConfig.fields` from each record
- Format output based on `format`:

  **CSV:**
  - First line: field names joined by `,`
  - Each row: values joined by `,`
  - Return as single string with `\n` between lines

  **JSON:**
  - Return array of objects with only selected fields
  - Each missing field value → `"N/A"`

  **MARKDOWN:**
  - Header row: `| field1 | field2 | ... |`
  - Separator row: `| --- | --- | ... |`
  - Each data row: `| val1 | val2 | ... |`
  - Return as single string with `\n` between lines

- Add to return object: `{ format, title, recordCount, exportedData }`

| Challenge 📢 | Return `{ format, title, recordCount, exportedData }`. If invalid → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `formatForExport([
  { name: "Arif", dept: "IT", salary: 60000 },
  { name: "Bela", salary: 45000 },
  { name: "Cyrus", dept: "HR" }
], { format: "CSV", fields: ["name", "dept", "salary"], title: "Staff Report" })` ➔

  `{
  format: "CSV",
  title: "Staff Report",
  recordCount: 3,
  exportedData: "name,dept,salary\nArif,IT,60000\nBela,N/A,45000\nCyrus,HR,N/A"
}`

---
