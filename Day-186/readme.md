# 🎓 JS DAILY PRACTICE – DAY-186

📅 **Goal:** Restaurant Table Booking System (Multi-Function System Design — Mini Backend Simulation)
🎯 **Focus:** Function Composition • Modular Design • Multi-Layer Architecture • Data Flow Simulation

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.
- This day's problems work TOGETHER as a system — later problems may reuse the data shape produced by earlier ones.

---

## 🧩 PROBLEM–01: 🪑 registerTable()

⚠️ **Function Name:** `registerTable()`

| Input      | `tables` (array of objects), `newTable` (object) |
| :--------- | :----------------------------------------------- |
| **Output** | object                                           |

**Rules:**

`tables` — array of existing table objects (may be empty), each with:

- `tableId` (string)
- `capacity` (number, integer, ≥ 1)
- `location` (string: "INDOOR" or "OUTDOOR")

`newTable` object:

- `tableId` (string, non-empty)
- `capacity` (number, integer, 1–12)
- `location` (string: "INDOOR" or "OUTDOOR")

**Register Rules:**

- Do NOT mutate `tables`
- If `tableId` already exists → reject: `"Table ID already exists"`
- Otherwise add new table with `status: "AVAILABLE"` field added automatically

| Challenge 📢 | If rejected: return `{ registered: false, reason, tables }` (unchanged). If registered: return `{ registered: true, tables: updatedTables, totalTables }`. If invalid input → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `registerTable(
  [],
  { tableId: "T1", capacity: 4, location: "INDOOR" }
)` ➔

  `{
  registered: true,
  tables: [
    { tableId: "T1", capacity: 4, location: "INDOOR", status: "AVAILABLE" }
  ],
  totalTables: 1
}`

---

## 🧩 PROBLEM–02: 📅 bookTable()

⚠️ **Function Name:** `bookTable()`

| Input      | `tables` (array of objects), `bookingRequest` (object) |
| :--------- | :----------------------------------------------------- |
| **Output** | object                                                 |

**Rules:**

`tables` — array of table objects (with `tableId`, `capacity`, `status`)
`bookingRequest` object:

- `tableId` (string, non-empty)
- `partySize` (number, integer, ≥ 1)
- `customerName` (string, non-empty)

**Booking Rules (check in order):**

1. `tableId` must exist → else `"Table not found"`
2. Table's `status` must be `"AVAILABLE"` → else `"Table is not available"`
3. `partySize` must be ≤ table's `capacity` → else `"Party size exceeds table capacity"`

**On success:**

- Update table's `status` to `"OCCUPIED"`, add `currentBooking: { customerName, partySize }`

| Challenge 📢 | If rejected: return `{ booked: false, reason, tables }` (unchanged). If success: return `{ booked: true, tables: updatedTables }`. If invalid input → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `bookTable(
  [{ tableId: "T1", capacity: 4, location: "INDOOR", status: "AVAILABLE" }],
  { tableId: "T1", partySize: 3, customerName: "Rumana" }
)` ➔

  `{
  booked: true,
  tables: [
    { tableId: "T1", capacity: 4, location: "INDOOR", status: "OCCUPIED", currentBooking: { customerName: "Rumana", partySize: 3 } }
  ]
}`

---

## 🧩 PROBLEM–03: 🧹 vacateTable()

⚠️ **Function Name:** `vacateTable()`

| Input      | `tables` (array of objects), `tableId` (string) |
| :--------- | :---------------------------------------------- |
| **Output** | object                                          |

**Rules:**

`tables` — array of table objects
`tableId` must be non-empty string

**Vacate Rules:**

- Do NOT mutate `tables`
- If `tableId` not found → reject: `"Table not found"`
- If found table's `status` is `"AVAILABLE"` → reject: `"Table is already vacant"`
- Otherwise, set `status` to `"AVAILABLE"`, remove `currentBooking` field entirely

| Challenge 📢 | If rejected: return `{ vacated: false, reason, tables }` (unchanged). If success: return `{ vacated: true, tables: updatedTables }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `vacateTable(
  [{ tableId: "T1", capacity: 4, location: "INDOOR", status: "OCCUPIED", currentBooking: { customerName: "Rumana", partySize: 3 } }],
  "T1"
)` ➔

  `{
  vacated: true,
  tables: [
    { tableId: "T1", capacity: 4, location: "INDOOR", status: "AVAILABLE" }
  ]
}`

---

## 🧩 PROBLEM–04: 🔍 findBestTableMatch()

⚠️ **Function Name:** `findBestTableMatch()`

| Input      | `tables` (array of objects), `partySize` (number), `preferredLocation` (string or null) |
| :--------- | :-------------------------------------------------------------------------------------- |
| **Output** | object                                                                                  |

**Rules:**

`tables` — non-empty array of table objects (`tableId`, `capacity`, `location`, `status`)
`partySize` must be a number ≥ 1
`preferredLocation` — `"INDOOR"`, `"OUTDOOR"`, or `null` (no preference)

**Matching Rules:**

- Only consider tables where `status === "AVAILABLE"` AND `capacity >= partySize`
- If `preferredLocation` is provided, FIRST try to find a match within that location
- Among matching candidates, pick the one with the **smallest capacity** (to avoid wasting a big table on a small party) — if tie, pick whichever appears first
- If no table matches the preferred location, fall back to searching ALL locations using the same smallest-capacity rule
- If still no match found at all → `{ found: false, message: "No available table can accommodate this party size." }`

| Challenge 📢 | If found: return `{ found: true, table: matchedTableObject }`. If not found: return `{ found: false, message }`. If invalid input → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `findBestTableMatch([
  { tableId: "T1", capacity: 6, location: "INDOOR", status: "AVAILABLE" },
  { tableId: "T2", capacity: 4, location: "OUTDOOR", status: "AVAILABLE" },
  { tableId: "T3", capacity: 2, location: "INDOOR", status: "AVAILABLE" }
], 2, "OUTDOOR")` ➔

  `{
  found: true,
  table: { tableId: "T2", capacity: 4, location: "OUTDOOR", status: "AVAILABLE" }
}`

---

## 🧩 PROBLEM–05: 🏗️ runRestaurantWorkflow()

⚠️ **Function Name:** `runRestaurantWorkflow()`

| Input      | `initialTables` (array of objects), `operations` (array of objects) |
| :--------- | :------------------------------------------------------------------ |
| **Output** | object                                                              |

**Rules:**

This problem composes ALL previous functions into one final workflow (the Module-5 capstone).

`operations` — array of operation objects, each one of:

- `{ type: "REGISTER", table: {...} }`
- `{ type: "BOOK", bookingRequest: {...} }`
- `{ type: "VACATE", tableId: "..." }`
- `{ type: "FIND_MATCH", partySize: number, preferredLocation: string or null }`

Must process operations IN ORDER, each acting on the result of the previous one.

**Workflow Rules:**

- Apply same logic as `registerTable()`, `bookTable()`, `vacateTable()`, `findBestTableMatch()` internally
- Track each operation's outcome in a log: `{ type, success, reason }` (for `FIND_MATCH`, `success` is the `found` value, and `reason` is `null` on success or the message on failure)
- Failed operations do not change table state; processing continues
- `FIND_MATCH` operations do NOT change table state regardless of outcome — they are read-only queries
- After all operations: compute final `occupancyRate = (occupiedTables / totalTables) × 100` (rounded to 2 decimal places)

| Challenge 📢 | Return `{ finalTables, operationLog, occupancyRate }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `runRestaurantWorkflow(
  [{ tableId: "T1", capacity: 4, location: "INDOOR", status: "AVAILABLE" }],
  [
    { type: "REGISTER", table: { tableId: "T2", capacity: 2, location: "OUTDOOR" } },
    { type: "BOOK", bookingRequest: { tableId: "T1", partySize: 3, customerName: "Arman" } },
    { type: "FIND_MATCH", partySize: 2, preferredLocation: null },
    { type: "VACATE", tableId: "T2" }
  ]
)` ➔

  `{
  finalTables: [
    { tableId: "T1", capacity: 4, location: "INDOOR", status: "OCCUPIED", currentBooking: { customerName: "Arman", partySize: 3 } },
    { tableId: "T2", capacity: 2, location: "OUTDOOR", status: "AVAILABLE" }
  ],
  operationLog: [
    { type: "REGISTER", success: true, reason: null },
    { type: "BOOK", success: true, reason: null },
    { type: "FIND_MATCH", success: true, reason: null },
    { type: "VACATE", success: false, reason: "Table is already vacant" }
  ],
  occupancyRate: 50.00
}`

---
