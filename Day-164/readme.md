# 🎓 JS DAILY PRACTICE – DAY-164

📅 **Goal:** Library Book Management System (Object-Based Data Modeling)
🎯 **Focus:** Object Nesting • Destructuring • Spread Operator • Immutability • Deep vs Shallow Copy

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 📚 Book Record Builder

⚠️ **Function Name:** `buildBookRecord()`

| Input      | `bookInfo` (object), `publishingInfo` (object), `libraryInfo` (object) |
| :--------- | :--------------------------------------------------------------------- |
| **Output** | object                                                                 |

**Rules:**

`bookInfo` object:

- `title` (string, non-empty)
- `author` (string, non-empty)
- `genre` (string, non-empty)
- `totalPages` (number, integer, > 0)

`publishingInfo` object:

- `publisher` (string, non-empty)
- `publishYear` (number, integer, 1900–2025)
- `edition` (number, integer, ≥ 1)

`libraryInfo` object:

- `bookId` (string, non-empty)
- `totalCopies` (number, integer, ≥ 1)
- `availableCopies` (number, integer, ≥ 0)

**Build Rules:**

- Use **spread operator** to merge all three into one book record
- Add computed field: `isAvailable = availableCopies > 0`
- Add computed field: `borrowedCopies = totalCopies - availableCopies`
- Add computed field: `bookAge = 2025 - publishYear`
- Add computed field: `ageCategory` based on `bookAge`:
  - ≥ 50 → "CLASSIC"
  - 20 – 49 → "ESTABLISHED"
  - 5 – 19 → "MODERN"
  - < 5 → "NEW RELEASE"
- Add field: `addedAt = "2025-01-01"` (fixed string)

| Challenge 📢 | Return single merged book object with all fields from the three inputs plus `isAvailable`, `borrowedCopies`, `bookAge`, `ageCategory`, `addedAt`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `buildBookRecord(
  { title: "Clean Code", author: "Robert C. Martin", genre: "Technology", totalPages: 431 },
  { publisher: "Prentice Hall", publishYear: 2008, edition: 1 },
  { bookId: "BK-001", totalCopies: 5, availableCopies: 3 }
)` ➔

  `{
  title: "Clean Code",
  author: "Robert C. Martin",
  genre: "Technology",
  totalPages: 431,
  publisher: "Prentice Hall",
  publishYear: 2008,
  edition: 1,
  bookId: "BK-001",
  totalCopies: 5,
  availableCopies: 3,
  isAvailable: true,
  borrowedCopies: 2,
  bookAge: 17,
  ageCategory: "MODERN",
  addedAt: "2025-01-01"
}`

---

## 🧩 PROBLEM–02: ✏️ Book Record Updater

⚠️ **Function Name:** `updateBookRecord()`

| Input      | `existingBook` (object), `updates` (object) |
| :--------- | :------------------------------------------ |
| **Output** | object                                      |

**Rules:**

`existingBook` must have at minimum:

- `bookId` (string, non-empty)
- `title` (string, non-empty)
- `totalCopies` (number, integer, ≥ 1)
- `availableCopies` (number, integer, ≥ 0)
- `publishYear` (number, integer, 1900–2025)

`updates` object:

- May contain any subset of: `totalCopies`, `availableCopies`, `edition`, `publisher`, `genre`
- Must be a non-empty object (at least 1 key)

**Update Rules:**

- Use **spread operator** to merge: original book + updates
- Do NOT mutate the original `existingBook` object
- If `updates` contains `totalCopies`, validate it is still ≥ 1
- If `updates` contains `availableCopies`, validate it is still ≥ 0
- Also validate: final `availableCopies` must not exceed final `totalCopies` → if it does, return `"Invalid Input"`
- Recompute `isAvailable = final availableCopies > 0`
- Recompute `borrowedCopies = final totalCopies - final availableCopies`
- Add field: `lastUpdated = "2025-01-01"` (fixed string)

| Challenge 📢 | Return new updated book object (original stays unchanged). If any updated field is invalid → `"Invalid Input"`. If input is invalid → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `updateBookRecord(
  { bookId: "BK-002", title: "The Pragmatic Programmer", totalCopies: 4, availableCopies: 4, publishYear: 1999 },
  { totalCopies: 6, availableCopies: 2 }
)` ➔

  `{
  bookId: "BK-002",
  title: "The Pragmatic Programmer",
  totalCopies: 6,
  availableCopies: 2,
  publishYear: 1999,
  isAvailable: true,
  borrowedCopies: 4,
  lastUpdated: "2025-01-01"
}`

---

## 🧩 PROBLEM–03: 🔍 Book Record Extractor

⚠️ **Function Name:** `extractBookSections()`

| Input      | `bookRecord` (object) |
| :--------- | :-------------------- |
| **Output** | object                |

**Rules:**

`bookRecord` must contain:

- `bookId` (string)
- `title` (string)
- `author` (string)
- `genre` (string)
- `publisher` (string)
- `publishYear` (number)
- `edition` (number)
- `totalCopies` (number)
- `availableCopies` (number)
- `borrowedCopies` (number)
- `ageCategory` (string)
- `addedAt` (string)

**Extraction Rules:**

- Use **destructuring** to split the flat record into 3 nested sections:
  - `bookDetails` → `{ bookId, title, author, genre }`
  - `publishingDetails` → `{ publisher, publishYear, edition, ageCategory }`
  - `copyDetails` → `{ totalCopies, availableCopies, borrowedCopies }`
- Add field `librarySummary`:
  - `registeredOn = addedAt`
  - `isFullyAvailable = borrowedCopies === 0`
  - `isFullyBorrowed = availableCopies === 0`

| Challenge 📢 | Return `{ bookDetails, publishingDetails, copyDetails, librarySummary }`. If any required field is missing → `"Invalid Input"` |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `extractBookSections({
  bookId: "BK-003",
  title: "Atomic Habits",
  author: "James Clear",
  genre: "Self-Help",
  publisher: "Avery",
  publishYear: 2018,
  edition: 2,
  totalCopies: 3,
  availableCopies: 0,
  borrowedCopies: 3,
  ageCategory: "MODERN",
  addedAt: "2025-01-01"
})` ➔

  `{
  bookDetails: { bookId: "BK-003", title: "Atomic Habits", author: "James Clear", genre: "Self-Help" },
  publishingDetails: { publisher: "Avery", publishYear: 2018, edition: 2, ageCategory: "MODERN" },
  copyDetails: { totalCopies: 3, availableCopies: 0, borrowedCopies: 3 },
  librarySummary: { registeredOn: "2025-01-01", isFullyAvailable: false, isFullyBorrowed: true }
}`

---

## 🧩 PROBLEM–04: 📋 Book Deep Cloner

⚠️ **Function Name:** `deepCloneBook()`

| Input      | `bookRecord` (object) |
| :--------- | :-------------------- |
| **Output** | object                |

**Rules:**

`bookRecord` must contain:

- `bookId` (string)
- `title` (string)
- `locationInfo` (object with: `shelf` (string), `floor` (string))
- `tags` (array of strings)

**Clone Rules:**

- Create a **deep copy** using `JSON.parse(JSON.stringify())`
- After cloning, add field to clone: `cloneTag = "CLONED"`
- Modify clone's `locationInfo.shelf = "Unknown"` — original's `locationInfo.shelf` must stay unchanged
- Push `"cloned-tag"` into clone's `tags` — original's `tags` must stay unchanged
- Return **both** original and clone to prove deep copy worked

| Challenge 📢 | Return `{ original, clone }` where clone has modified `locationInfo.shelf`, updated `tags`, and `cloneTag: "CLONED"` — original must be fully unchanged. If invalid input → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `deepCloneBook({
  bookId: "BK-004",
  title: "The Alchemist",
  locationInfo: { shelf: "A-12", floor: "Ground" },
  tags: ["fiction", "philosophy"]
})` ➔

  `{
  original: {
    bookId: "BK-004",
    title: "The Alchemist",
    locationInfo: { shelf: "A-12", floor: "Ground" },
    tags: ["fiction", "philosophy"]
  },
  clone: {
    bookId: "BK-004",
    title: "The Alchemist",
    locationInfo: { shelf: "Unknown", floor: "Ground" },
    tags: ["fiction", "philosophy", "cloned-tag"],
    cloneTag: "CLONED"
  }
}`

---

## 🧩 PROBLEM–05: 🏆 Book Record Completeness Scorer

⚠️ **Function Name:** `scoreBookRecord()`

| Input      | `bookRecord` (object) |
| :--------- | :-------------------- |
| **Output** | object                |

**Rules:**

`bookRecord` may or may not contain these fields:

- `title` (string, non-empty)
- `author` (string, non-empty)
- `genre` (string, non-empty)
- `publisher` (string, non-empty)
- `publishYear` (number, counts if 1900–2025)
- `edition` (number, counts if ≥ 1)
- `totalCopies` (number, counts if ≥ 1)
- `availableCopies` (number, counts if ≥ 0 and key exists)
- `tags` (array, counts if non-empty)
- `description` (string, non-empty)

**Scoring Rules:**

| Field             | Points |
| :---------------- | :----- |
| `title`           | 20     |
| `author`          | 20     |
| `genre`           | 10     |
| `publisher`       | 10     |
| `publishYear`     | 10     |
| `edition`         | 5      |
| `totalCopies`     | 10     |
| `availableCopies` | 5      |
| `tags`            | 5      |
| `description`     | 5      |

- `totalScore` = sum of points for present + valid fields
- `maxScore` = 100

**Catalog Status:**

| totalScore | status              |
| :--------- | :------------------ |
| 100        | "FULLY CATALOGUED"  |
| 70 – 99    | "WELL CATALOGUED"   |
| 40 – 69    | "BASIC CATALOGUED"  |
| < 40       | "POORLY CATALOGUED" |

- `missingFields` → array of field names that are absent or invalid

| Challenge 📢 | Return `{ totalScore, maxScore: 100, status, missingFields }`. If `bookRecord` is not an object or is null → `"Invalid Input"` |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `scoreBookRecord({
  title: "Deep Work",
  author: "Cal Newport",
  genre: "Productivity",
  publisher: "Grand Central",
  publishYear: 2016,
  edition: 1,
  totalCopies: 4,
  availableCopies: 2,
  tags: [],
  description: ""
})` ➔

  `{
  totalScore: 90,
  maxScore: 100,
  status: "WELL CATALOGUED",
  missingFields: ["tags", "description"]
}`

---
