# 🎓 JS DAILY PRACTICE – DAY-170

📅 **Goal:** Content Formatting Engine (ES6+ Modern JavaScript)
🎯 **Focus:** Arrow Functions • Template Literals • Optional Chaining (?.) • Nullish Coalescing (??) • Rest & Spread

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 🏷️ Dynamic Badge Generator

⚠️ **Function Name:** `generateBadges()`

| Input      | `...items` (rest parameter — multiple objects) |
| :--------- | :--------------------------------------------- |
| **Output** | array of strings                               |

**Rules:**

Each item object (fields may be missing — use `?.` and `??`):

- `label` (string) — fallback: `"Unknown"`
- `value` (number) — fallback: `0`
- `meta?.unit` (string) — fallback: `""`
- `meta?.highlight` (boolean) — fallback: `false`

**Badge Format Rules:**

- Use **rest parameter** to collect all items
- Must receive at least 1 item
- Use **arrow function** with `.map()`
- If `highlight === true`:
  - `` `★ ${label}: ${value}${unit}` ``
- If `highlight === false`:
  - `` `${label}: ${value}${unit}` ``

| Challenge 📢 | Return array of badge strings. If no items provided → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------- |

**Sample Input & Output:**

- `generateBadges(
  { label: "Score", value: 95, meta: { unit: "%", highlight: true } },
  { label: "Rank", value: 3, meta: { unit: "" , highlight: false } },
  { label: "Streak", meta: { highlight: true } }
)` ➔

  `["★ Score: 95%", "Rank: 3", "★ Streak: 0"]`

---

## 🧩 PROBLEM–02: 📝 Smart Template Filler

⚠️ **Function Name:** `fillTemplate()`

| Input      | `template` (string), `variables` (object) |
| :--------- | :---------------------------------------- |
| **Output** | string                                    |

**Rules:**

`template` — a string containing placeholders in the format `{{key}}`
e.g. `"Hello {{name}}, your order {{orderId}} is {{status}}."`

`variables` — object where keys match the placeholder names
Some keys may be missing — use `??` with fallback `"N/A"`

**Fill Rules:**

- Use **arrow function**
- Find all `{{key}}` patterns in the template
- Replace each `{{key}}` with `variables[key] ?? "N/A"`
- Do NOT use `.replace()` with a regex — use `.split()` and `.join()` for each key
- If a placeholder exists in template but key is missing from variables → replace with `"N/A"`

| Challenge 📢 | Return the fully filled string. If `template` is not a non-empty string or `variables` is not an object → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `fillTemplate(
  "Dear {{name}}, your invoice #{{invoiceId}} of ৳{{amount}} is {{status}}.",
  { name: "Tamim", invoiceId: "INV-441", amount: 7500 }
)` ➔

  `"Dear Tamim, your invoice #INV-441 of ৳7500 is N/A."`

---

## 🧩 PROBLEM–03: 📊 Table Row Formatter

⚠️ **Function Name:** `formatTableRows()`

| Input      | `columns` (array of strings), `rows` (array of objects) |
| :--------- | :------------------------------------------------------ |
| **Output** | array of strings                                        |

**Rules:**

`columns` — array of column names (non-empty, min 1 column)
`rows` — array of objects where each key matches a column name
(some values may be missing — use `?.` and `??` with fallback `"—"`)

**Format Rules:**

- Use **arrow function** with `.map()`
- For each row, build a formatted string using **template literals**
- Format: each column value joined by `|`:
  - e.g. columns = ["Name", "Score", "Grade"]
  - row = { Name: "Rina", Score: 88 } (Grade missing)
  - output: `` `Rina | 88 | —` ``
- Also produce a **header row** as the first element:
  - columns joined by `|`: `"Name | Score | Grade"`

| Challenge 📢 | Return array where first element is the header row string, followed by one formatted string per data row. If invalid → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `formatTableRows(
  ["Product", "Price", "Stock"],
  [
    { Product: "Laptop", Price: 75000, Stock: 12 },
    { Product: "Mouse", Price: 850 },
    { Product: "Keyboard" }
  ]
)` ➔

  `[
  "Product | Price | Stock",
  "Laptop | 75000 | 12",
  "Mouse | 850 | —",
  "Keyboard | — | —"
]`

---

## 🧩 PROBLEM–04: 🔗 URL Builder

⚠️ **Function Name:** `buildUrls()`

| Input      | `baseUrl` (string), `routes` (array of objects) |
| :--------- | :---------------------------------------------- |
| **Output** | array of objects                                |

**Rules:**

`baseUrl` must be a non-empty string starting with `"http"`

Each route object (some fields may be missing — use `?.` and `??`):

- `path` (string) — fallback: `"/"`
- `params?.id` (number or string) — if present, append `/${id}` to path
- `query?.limit` (number) — if present, append `?limit=${limit}` to full path
- `query?.page` (number) — if present (and limit also present), append `&page=${page}`; if only page (no limit), append `?page=${page}`
- `meta?.label` (string) — fallback: `"Unnamed Route"`

**URL Build Rules:**

- Use **arrow function** with `.map()`
- Use `?.` and `??` for safe access
- Build `fullUrl` using template literals step by step:
  1. Start with `baseUrl + path`
  2. If `params?.id` exists → append `/${id}`
  3. Build query string from `query?.limit` and `query?.page`
  4. Append query string if any

| Challenge 📢 | Return array with `{ label, fullUrl }` for each route. If `baseUrl` is invalid → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `buildUrls("https://api.myapp.com", [
  { path: "/users", params: { id: 42 }, query: { limit: 10, page: 2 }, meta: { label: "User Detail" } },
  { path: "/products", query: { limit: 20 }, meta: { label: "Product List" } },
  { path: "/orders" }
])` ➔

  `[
  { label: "User Detail", fullUrl: "https://api.myapp.com/users/42?limit=10&page=2" },
  { label: "Product List", fullUrl: "https://api.myapp.com/products?limit=20" },
  { label: "Unnamed Route", fullUrl: "https://api.myapp.com/orders" }
]`

---

## 🧩 PROBLEM–05: 🗂️ Multi-Section Content Merger

⚠️ **Function Name:** `mergeContentSections()`

| Input      | `layout` (string), `...sections` (rest parameter — multiple objects) |
| :--------- | :------------------------------------------------------------------- |
| **Output** | object                                                               |

**Rules:**

`layout` must be one of: `"BLOG"`, `"REPORT"`, `"EMAIL"`

Each section object (fields may be missing — use `?.` and `??`):

- `sectionType` (string) — fallback: `"BODY"`
- `title` (string) — fallback: `"Untitled"`
- `content` (string) — fallback: `"No content provided."`
- `meta?.wordCount` (number) — fallback: `0`
- `meta?.author` (string) — fallback: `"Anonymous"`

Must receive at least 1 section.

**Merge Rules:**

- Use **rest parameter** to collect sections
- Use **arrow functions** throughout
- Use `?.` and `??` for all fallbacks
- Format each section using template literal based on `layout`:
  - `"BLOG"`: `` `## ${title}\n${content}\n— ${author}` ``
  - `"REPORT"`: `` `[${sectionType}] ${title}: ${content}` ``
  - `"EMAIL"`: `` `<b>${title}</b><br>${content}` ``
- Compute:
  - `totalWordCount` → sum of all `meta?.wordCount ?? 0`
  - `sectionCount` → number of sections
  - `formattedSections` → array of formatted strings

| Challenge 📢 | Return `{ layout, sectionCount, totalWordCount, formattedSections }`. If invalid → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `mergeContentSections(
  "BLOG",
  { sectionType: "INTRO", title: "Why JS?", content: "JS is everywhere.", meta: { wordCount: 3, author: "Karim" } },
  { sectionType: "BODY", title: "ES6 Features", content: "Arrow functions are great.", meta: { wordCount: 4 } }
)` ➔

  `{
  layout: "BLOG",
  sectionCount: 2,
  totalWordCount: 7,
  formattedSections: [
    "## Why JS?\nJS is everywhere.\n— Karim",
    "## ES6 Features\nArrow functions are great.\n— Anonymous"
  ]
}`

---
