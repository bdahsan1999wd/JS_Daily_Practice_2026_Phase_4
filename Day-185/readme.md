# 🎓 JS DAILY PRACTICE – DAY-185

📅 **Goal:** Library Management System (Multi-Function System Design — Mini Backend Simulation)
🎯 **Focus:** Function Composition • Modular Design • Multi-Layer Architecture • Data Flow Simulation

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.
- This day's problems work TOGETHER as a system — later problems may reuse the data shape produced by earlier ones.

---

## 🧩 PROBLEM–01: ➕ addBookCopy()

⚠️ **Function Name:** `addBookCopy()`

| Input      | `catalog` (array of objects), `newBook` (object) |
| :--------- | :----------------------------------------------- |
| **Output** | object                                           |

**Rules:**

`catalog` — array of existing book objects (may be empty), each with:

- `isbn` (string)
- `title` (string)
- `totalCopies` (number, integer, ≥ 1)
- `availableCopies` (number, integer, ≥ 0)

`newBook` object:

- `isbn` (string, non-empty)
- `title` (string, non-empty)
- `totalCopies` (number, integer, ≥ 1)

**Add Rules:**

- Do NOT mutate `catalog`
- If `isbn` already exists in `catalog` → instead of rejecting, INCREASE that book's `totalCopies` AND `availableCopies` by `newBook.totalCopies` (this represents adding more copies of an existing book) — `actionType = "COPIES_ADDED"`
- If `isbn` does NOT exist → add as new catalog entry with `availableCopies = totalCopies` — `actionType = "NEW_BOOK_ADDED"`

| Challenge 📢 | Return `{ catalog: updatedCatalog, actionType }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `addBookCopy(
  [{ isbn: "978-1", title: "Clean Code", totalCopies: 3, availableCopies: 1 }],
  { isbn: "978-1", title: "Clean Code", totalCopies: 2 }
)` ➔

  `{
  catalog: [
    { isbn: "978-1", title: "Clean Code", totalCopies: 5, availableCopies: 3 }
  ],
  actionType: "COPIES_ADDED"
}`

---

## 🧩 PROBLEM–02: 📤 checkoutBook()

⚠️ **Function Name:** `checkoutBook()`

| Input      | `catalog` (array of objects), `isbn` (string), `memberId` (string), `borrowedBooks` (array of objects) |
| :--------- | :----------------------------------------------------------------------------------------------------- |
| **Output** | object                                                                                                 |

**Rules:**

`catalog` — array of book objects (with `isbn`, `availableCopies`, etc.)
`isbn` must exist in `catalog` → else reject: `"Book not found"`
`memberId` must be non-empty string
`borrowedBooks` — array of `{ memberId, isbn }` pairs representing currently borrowed books by all members

**Checkout Rules (check in order):**

1. Book must exist → else `"Book not found"`
2. `availableCopies > 0` → else `"No copies available"`
3. Member borrow limit = 3 books max — count entries in `borrowedBooks` matching `memberId` → if already ≥ 3 → `"Member has reached borrowing limit"`
4. Member cannot borrow the SAME isbn twice — check if `borrowedBooks` already has `{ memberId, isbn }` matching → else `"Member already has this book checked out"`

**On success:**

- Decrease `availableCopies` by 1 (do NOT mutate `catalog`)
- Add `{ memberId, isbn }` to a new `borrowedBooks` array (do NOT mutate original)

| Challenge 📢 | If rejected: return `{ checkedOut: false, reason, catalog, borrowedBooks }` (both unchanged). If success: return `{ checkedOut: true, catalog: updatedCatalog, borrowedBooks: updatedBorrowedBooks }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `checkoutBook(
  [{ isbn: "978-1", title: "Clean Code", totalCopies: 5, availableCopies: 3 }],
  "978-1",
  "M-101",
  [{ memberId: "M-101", isbn: "978-2" }]
)` ➔

  `{
  checkedOut: true,
  catalog: [
    { isbn: "978-1", title: "Clean Code", totalCopies: 5, availableCopies: 2 }
  ],
  borrowedBooks: [
    { memberId: "M-101", isbn: "978-2" },
    { memberId: "M-101", isbn: "978-1" }
  ]
}`

---

## 🧩 PROBLEM–03: 📥 returnBook()

⚠️ **Function Name:** `returnBook()`

| Input      | `catalog` (array of objects), `borrowedBooks` (array of objects), `memberId` (string), `isbn` (string) |
| :--------- | :----------------------------------------------------------------------------------------------------- |
| **Output** | object                                                                                                 |

**Rules:**

`catalog` — array of book objects
`borrowedBooks` — array of `{ memberId, isbn }` pairs

**Return Rules:**

- If `{ memberId, isbn }` pair does NOT exist in `borrowedBooks` → reject: `"No matching checkout record found"`
- If `isbn` does not exist in `catalog` → reject: `"Book not found in catalog"`
- Otherwise:
  - Remove that ONE matching entry from `borrowedBooks` (if duplicates somehow exist, remove only the first match)
  - Increase that book's `availableCopies` by 1 in `catalog` (do not exceed `totalCopies` — if it would, cap at `totalCopies`)

| Challenge 📢 | If rejected: return `{ returned: false, reason, catalog, borrowedBooks }` (unchanged). If success: return `{ returned: true, catalog: updatedCatalog, borrowedBooks: updatedBorrowedBooks }`. If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `returnBook(
  [{ isbn: "978-1", title: "Clean Code", totalCopies: 5, availableCopies: 2 }],
  [{ memberId: "M-101", isbn: "978-2" }, { memberId: "M-101", isbn: "978-1" }],
  "M-101",
  "978-1"
)` ➔

  `{
  returned: true,
  catalog: [
    { isbn: "978-1", title: "Clean Code", totalCopies: 5, availableCopies: 3 }
  ],
  borrowedBooks: [
    { memberId: "M-101", isbn: "978-2" }
  ]
}`

---

## 🧩 PROBLEM–04: 📊 libraryStatusReport()

⚠️ **Function Name:** `libraryStatusReport()`

| Input      | `catalog` (array of objects), `borrowedBooks` (array of objects) |
| :--------- | :--------------------------------------------------------------- |
| **Output** | object                                                           |

**Rules:**

`catalog` — non-empty array of book objects (`isbn`, `title`, `totalCopies`, `availableCopies`)
`borrowedBooks` — array (may be empty) of `{ memberId, isbn }`

**Report Rules:**

- `totalBooks` → count of distinct catalog entries
- `totalCopiesInSystem` → sum of `totalCopies` across catalog
- `totalCheckedOut` → length of `borrowedBooks`
- `utilizationRate` → `(totalCheckedOut / totalCopiesInSystem) × 100` (rounded to 2 decimal places)
- `fullyBorrowedBooks` → array of `title` values where `availableCopies === 0`
- `mostBorrowedBook` → the `isbn` that appears most often in `borrowedBooks` (if `borrowedBooks` is empty → `null`; if tie, pick whichever appears first)

| Challenge 📢 | Return `{ totalBooks, totalCopiesInSystem, totalCheckedOut, utilizationRate, fullyBorrowedBooks, mostBorrowedBook }`. If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `libraryStatusReport(
  [
    { isbn: "978-1", title: "Clean Code", totalCopies: 5, availableCopies: 3 },
    { isbn: "978-2", title: "Atomic Habits", totalCopies: 2, availableCopies: 0 }
  ],
  [
    { memberId: "M1", isbn: "978-1" },
    { memberId: "M2", isbn: "978-2" },
    { memberId: "M3", isbn: "978-2" }
  ]
)` ➔

  `{
  totalBooks: 2,
  totalCopiesInSystem: 7,
  totalCheckedOut: 3,
  utilizationRate: 42.86,
  fullyBorrowedBooks: ["Atomic Habits"],
  mostBorrowedBook: "978-2"
}`

---

## 🧩 PROBLEM–05: 🏗️ runLibraryWorkflow()

⚠️ **Function Name:** `runLibraryWorkflow()`

| Input      | `initialCatalog` (array of objects), `initialBorrowedBooks` (array of objects), `operations` (array of objects) |
| :--------- | :-------------------------------------------------------------------------------------------------------------- |
| **Output** | object                                                                                                          |

**Rules:**

This problem composes the previous functions into one workflow.

`operations` — array of operation objects, each one of:

- `{ type: "CHECKOUT", isbn: "...", memberId: "..." }`
- `{ type: "RETURN", isbn: "...", memberId: "..." }`

Must process operations IN ORDER, each acting on the result of the previous one.

**Workflow Rules:**

- Apply same logic as `checkoutBook()` and `returnBook()` internally
- Track each operation's outcome in a log: `{ type, success, reason }` (reason `null` if success)
- Failed operations do not change catalog/borrowedBooks; processing continues
- After all operations: run the equivalent of `libraryStatusReport()` logic on the final state

| Challenge 📢 | Return `{ finalCatalog, finalBorrowedBooks, operationLog, statusReport }`. If invalid input → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `runLibraryWorkflow(
  [{ isbn: "978-1", title: "Clean Code", totalCopies: 2, availableCopies: 2 }],
  [],
  [
    { type: "CHECKOUT", isbn: "978-1", memberId: "M-1" },
    { type: "CHECKOUT", isbn: "978-1", memberId: "M-1" },
    { type: "RETURN", isbn: "978-1", memberId: "M-1" }
  ]
)` ➔

  `{
  finalCatalog: [
    { isbn: "978-1", title: "Clean Code", totalCopies: 2, availableCopies: 2 }
  ],
  finalBorrowedBooks: [],
  operationLog: [
    { type: "CHECKOUT", success: true, reason: null },
    { type: "CHECKOUT", success: false, reason: "Member already has this book checked out" },
    { type: "RETURN", success: true, reason: null }
  ],
  statusReport: {
    totalBooks: 1,
    totalCopiesInSystem: 2,
    totalCheckedOut: 0,
    utilizationRate: 0.00,
    fullyBorrowedBooks: [],
    mostBorrowedBook: null
  }
}`

---
