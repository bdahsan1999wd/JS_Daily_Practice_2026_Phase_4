# 🎓 JS DAILY PRACTICE – DAY-169

📅 **Goal:** Smart Response Builder (ES6+ Modern JavaScript)
🎯 **Focus:** Arrow Functions • Template Literals • Optional Chaining (?.) • Nullish Coalescing (??) • Rest & Spread

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 📤 API Response Builder

⚠️ **Function Name:** `buildApiResponse()`

| Input      | `statusCode` (number), `data` (any), `meta` (object) |
| :--------- | :--------------------------------------------------- |
| **Output** | object                                               |

**Rules:**

`statusCode` must be one of: `200`, `201`, `400`, `401`, `403`, `404`, `500`

`data` — any value (can be object, array, string, null)

`meta` object (some fields may be missing — use `?.` and `??`):

- `meta?.requestId` (string) — fallback: `"N/A"`
- `meta?.version` (string) — fallback: `"1.0"`
- `meta?.processingTime` (number) — fallback: `0`

**Build Rules:**

- Use `?.` and `??` for safe meta access
- Add computed field: `success = statusCode >= 200 && statusCode < 300`
- Add computed field: `statusMessage` using template literal based on `statusCode`:
  - `200` → `"OK"`
  - `201` → `"Created"`
  - `400` → `"Bad Request"`
  - `401` → `"Unauthorized"`
  - `403` → `"Forbidden"`
  - `404` → `"Not Found"`
  - `500` → `"Internal Server Error"`
- Add computed field: `responseLabel` using template literal:
  - `` `[${statusCode}] ${statusMessage} — RequestID: ${requestId}` ``

| Challenge 📢 | Return `{ statusCode, statusMessage, success, data, requestId, version, processingTime, responseLabel }`. If invalid `statusCode` → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `buildApiResponse(
  201,
  { userId: "U-001", name: "Nabil" },
  { requestId: "REQ-9921", version: "2.3", processingTime: 142 }
)` ➔

  **Manual Verify:**
  - statusCode=201 → valid ✓
  - success = 201 >= 200 && 201 < 300 = true
  - statusMessage = "Created"
  - requestId = "REQ-9921", version = "2.3", processingTime = 142
  - responseLabel = `[201] Created — RequestID: REQ-9921`

  `{
  statusCode: 201,
  statusMessage: "Created",
  success: true,
  data: { userId: "U-001", name: "Nabil" },
  requestId: "REQ-9921",
  version: "2.3",
  processingTime: 142,
  responseLabel: "[201] Created — RequestID: REQ-9921"
}`

---

## 🧩 PROBLEM–02: ❌ Error Response Generator

⚠️ **Function Name:** `buildErrorResponse()`

| Input      | `errorCode` (string), `context` (object), `...details` (rest parameter) |
| :--------- | :---------------------------------------------------------------------- |
| **Output** | object                                                                  |

**Rules:**

`errorCode` must be one of:

- `"VALIDATION_ERROR"` → httpStatus: 400
- `"AUTH_ERROR"` → httpStatus: 401
- `"PERMISSION_ERROR"` → httpStatus: 403
- `"NOT_FOUND"` → httpStatus: 404
- `"SERVER_ERROR"` → httpStatus: 500

`context` object (some fields may be missing — use `?.` and `??`):

- `context?.endpoint` (string) — fallback: `"unknown"`
- `context?.userId` (string) — fallback: `"anonymous"`

`...details` — rest parameter, each detail is a string describing what went wrong
Must have at least 1 detail string

**Build Rules:**

- Use **rest parameter** for `details`
- Use `?.` and `??` for context fields
- Add computed field: `errorMessage` using template literal:
  - `` `[${errorCode}] Error on ${endpoint} for user ${userId}` ``
- Add computed field: `detailCount = details.length`
- Add field: `timestamp = "2025-01-01"`

| Challenge 📢 | Return `{ errorCode, httpStatus, endpoint, userId, errorMessage, details, detailCount, timestamp }`. If invalid → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `buildErrorResponse(
  "VALIDATION_ERROR",
  { endpoint: "/api/register", userId: "U-055" },
  "Email is required",
  "Password too short",
  "Username already taken"
)` ➔

  **Manual Verify:**
  - errorCode = "VALIDATION_ERROR" → httpStatus = 400
  - endpoint = "/api/register", userId = "U-055"
  - errorMessage = `[VALIDATION_ERROR] Error on /api/register for user U-055`
  - details = ["Email is required", "Password too short", "Username already taken"]
  - detailCount = 3
  - timestamp = "2025-01-01"

  `{
  errorCode: "VALIDATION_ERROR",
  httpStatus: 400,
  endpoint: "/api/register",
  userId: "U-055",
  errorMessage: "[VALIDATION_ERROR] Error on /api/register for user U-055",
  details: ["Email is required", "Password too short", "Username already taken"],
  detailCount: 3,
  timestamp: "2025-01-01"
}`

---

## 🧩 PROBLEM–03: 📃 Paginated Response Builder

⚠️ **Function Name:** `buildPaginatedResponse()`

| Input      | `items` (array), `pagination` (object) |
| :--------- | :------------------------------------- |
| **Output** | object                                 |

**Rules:**

`items` must be a non-empty array

`pagination` object (some fields may be missing — use `??`):

- `currentPage` (number, ≥ 1) — fallback: `1`
- `pageSize` (number, 1–100) — fallback: `10`
- `totalItems` (number, ≥ 0) — fallback: `items.length`

**Build Rules:**

- Use `??` for all fallbacks
- Use **arrow function** for computed fields
- Compute:
  - `totalPages = Math.ceil(totalItems / pageSize)`
  - `hasNextPage = currentPage < totalPages`
  - `hasPreviousPage = currentPage > 1`
  - `startIndex = (currentPage - 1) * pageSize + 1`
  - `endIndex = Math.min(currentPage * pageSize, totalItems)`
- Add computed `paginationSummary` using template literal:
  - `` `Showing ${startIndex}–${endIndex} of ${totalItems} items (Page ${currentPage} of ${totalPages})` ``

| Challenge 📢 | Return `{ items, currentPage, pageSize, totalItems, totalPages, hasNextPage, hasPreviousPage, startIndex, endIndex, paginationSummary }`. If invalid → `"Invalid Input"` |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `buildPaginatedResponse(
  ["Item1", "Item2", "Item3", "Item4", "Item5"],
  { currentPage: 2, pageSize: 5, totalItems: 23 }
)` ➔

  **Manual Verify:**
  - totalPages = Math.ceil(23 / 5) = Math.ceil(4.6) = 5
  - hasNextPage = 2 < 5 = true
  - hasPreviousPage = 2 > 1 = true
  - startIndex = (2-1) × 5 + 1 = 6
  - endIndex = Math.min(2×5, 23) = Math.min(10, 23) = 10
  - paginationSummary = `Showing 6–10 of 23 items (Page 2 of 5)`

  `{
  items: ["Item1", "Item2", "Item3", "Item4", "Item5"],
  currentPage: 2,
  pageSize: 5,
  totalItems: 23,
  totalPages: 5,
  hasNextPage: true,
  hasPreviousPage: true,
  startIndex: 6,
  endIndex: 10,
  paginationSummary: "Showing 6–10 of 23 items (Page 2 of 5)"
}`

---

## 🧩 PROBLEM–04: 🔁 Response Transformer

⚠️ **Function Name:** `transformResponses()`

| Input      | `responses` (array of objects), `transformRules` (object) |
| :--------- | :-------------------------------------------------------- |
| **Output** | array of objects                                          |

**Rules:**

Each response object (some fields may be missing — use `?.` and `??`):

- `id` (string) — fallback: `"unknown"`
- `statusCode` (number) — fallback: `200`
- `data?.value` (any) — fallback: `null`
- `data?.label` (string) — fallback: `"Unlabeled"`

`transformRules` object:

- `addTimestamp` (boolean) — if true, add `timestamp: "2025-01-01"` to each
- `addSuccessFlag` (boolean) — if true, add `success: statusCode >= 200 && statusCode < 300`
- `labelPrefix` (string or null) — if provided, prefix each label: `` `${labelPrefix}: ${label}` ``

**Transform Rules:**

- Use **arrow function** with `.map()`
- Use `?.` and `??` for safe access
- Apply only the rules that are set to `true` or non-null
- Build formatted output for each response using template literal:
  - `formattedEntry`: `` `[${id}] ${label} → ${value}` ``

| Challenge 📢 | Return transformed array with `{ id, statusCode, value, label, formattedEntry }` plus any applied transform fields. If invalid → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `transformResponses([
  { id: "R1", statusCode: 200, data: { value: 9500, label: "Revenue" } },
  { id: "R2", statusCode: 404, data: { value: null } }
], { addTimestamp: true, addSuccessFlag: true, labelPrefix: "💰" })` ➔

  **Manual Verify:**
  - R1: value=9500, label="Revenue" → prefixed: "💰: Revenue"
    - formattedEntry = `[R1] 💰: Revenue → 9500`
    - success = 200 >= 200 && < 300 = true, timestamp = "2025-01-01"
  - R2: value=null, label = data?.label ?? "Unlabeled" = "Unlabeled" → prefixed: "💰: Unlabeled"
    - formattedEntry = `[R2] 💰: Unlabeled → null`
    - success = 404 >= 200 && < 300 = false, timestamp = "2025-01-01"

  `[
  { id: "R1", statusCode: 200, value: 9500, label: "💰: Revenue", formattedEntry: "[R1] 💰: Revenue → 9500", success: true, timestamp: "2025-01-01" },
  { id: "R2", statusCode: 404, value: null, label: "💰: Unlabeled", formattedEntry: "[R2] 💰: Unlabeled → null", success: false, timestamp: "2025-01-01" }
]`

---

## 🧩 PROBLEM–05: 📊 Response Batch Analyzer

⚠️ **Function Name:** `analyzeResponseBatch()`

| Input      | `...batches` (rest parameter — multiple arrays of response objects) |
| :--------- | :------------------------------------------------------------------ |
| **Output** | object                                                              |

**Rules:**

- Use **rest parameter** to accept multiple response batch arrays
- Must receive at least 1 non-empty batch
- Each response object (fields may be missing — use `?.` and `??`):
  - `statusCode` (number) — fallback: `200`
  - `meta?.processingTime` (number) — fallback: `0`
  - `success` (boolean) — fallback: `true`

**Analysis Rules:**

- Use **spread** to flatten all batches into one array
- Use **arrow functions** throughout
- Compute:
  - `totalResponses` → total count
  - `successCount` → count where `success === true`
  - `failureCount` → count where `success === false`
  - `successRate` → `(successCount / totalResponses × 100)` rounded to 2 decimal places
  - `avgProcessingTime` → mean of all `processingTime` values (rounded to 2 decimal places)
  - `statusBreakdown` → object: count per unique `statusCode`
  - `batchCount` → number of batches received

| Challenge 📢 | Return `{ totalResponses, successCount, failureCount, successRate, avgProcessingTime, statusBreakdown, batchCount }`. If no valid responses → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `analyzeResponseBatch(
  [
    { statusCode: 200, meta: { processingTime: 120 }, success: true },
    { statusCode: 500, meta: { processingTime: 300 }, success: false }
  ],
  [
    { statusCode: 200, meta: { processingTime: 80 }, success: true },
    { statusCode: 404, success: false }
  ]
)` ➔

  **Manual Verify:**
  - Flatten: 4 total responses
  - successCount = 2, failureCount = 2
  - successRate = 2/4 × 100 = 50.00
  - processingTimes: 120, 300, 80, 0 (404 meta missing → fallback 0)
  - avgProcessingTime = (120+300+80+0)/4 = 500/4 = 125.00
  - statusBreakdown: { 200: 2, 500: 1, 404: 1 }
  - batchCount = 2

  `{
  totalResponses: 4,
  successCount: 2,
  failureCount: 2,
  successRate: 50.00,
  avgProcessingTime: 125.00,
  statusBreakdown: { 200: 2, 500: 1, 404: 1 },
  batchCount: 2
}`

---
