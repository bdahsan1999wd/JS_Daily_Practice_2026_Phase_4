# 🎓 JS DAILY PRACTICE – DAY-158

📅 **Goal:** User Profile Management System (Object-Based Data Modeling)
🎯 **Focus:** Object Nesting • Destructuring • Spread Operator • Immutability • Deep vs Shallow Copy

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 🧩 Profile Builder

⚠️ **Function Name:** `buildUserProfile()`

| Input      | `basicInfo` (object), `contactInfo` (object), `preferences` (object) |
| :--------- | :------------------------------------------------------------------- |
| **Output** | object                                                               |

**Rules:**

`basicInfo` object:

- `firstName` (string)
- `lastName` (string)
- `age` (number, 18–100)

`contactInfo` object:

- `email` (string, must contain "@")
- `phone` (string, must be exactly 11 characters)

`preferences` object:

- `language` (string)
- `theme` (string: "light" or "dark")
- `notifications` (boolean)

**Build Rules:**

- Use **spread operator** to merge all three into one profile object
- Add computed field: `fullName = firstName + " " + lastName`
- Add computed field: `isAdult = age >= 18` (always true given validation, but include it)
- Add field: `createdAt = "2025-01-01"` (fixed string, no Date object needed)

| Challenge 📢 | Return single merged profile object with all fields from the three inputs plus `fullName`, `isAdult`, `createdAt`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `buildUserProfile(
  { firstName: "Rahim", lastName: "Mia", age: 25 },
  { email: "rahim@mail.com", phone: "01712345678" },
  { language: "Bangla", theme: "dark", notifications: true }
)` ➔

  `{
  firstName: "Rahim",
  lastName: "Mia",
  age: 25,
  email: "rahim@mail.com",
  phone: "01712345678",
  language: "Bangla",
  theme: "dark",
  notifications: true,
  fullName: "Rahim Mia",
  isAdult: true,
  createdAt: "2025-01-01"
}`

---

## 🧩 PROBLEM–02: ✏️ Profile Updater

⚠️ **Function Name:** `updateUserProfile()`

| Input      | `existingProfile` (object), `updates` (object) |
| :--------- | :--------------------------------------------- |
| **Output** | object                                         |

**Rules:**

`existingProfile` must have at minimum:

- `userId` (string, non-empty)
- `fullName` (string)
- `email` (string, must contain "@")
- `age` (number, 18–100)

`updates` object:

- May contain any subset of: `fullName`, `email`, `age`, `phone`, `theme`
- `updates` must be a non-empty object (at least 1 key)

**Update Rules:**

- Use **spread operator** to merge: original profile + updates
- Do NOT mutate the original `existingProfile` object
- If `updates` contains `age`, validate it is still 18–100
- If `updates` contains `email`, validate it still contains "@"
- Add field: `lastUpdated = "2025-01-01"` (fixed string)

| Challenge 📢 | Return new updated profile object (original stays unchanged). If any updated field is invalid → `"Invalid Input"`. If input is invalid → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `updateUserProfile(
  { userId: "U001", fullName: "Karim Das", email: "karim@mail.com", age: 30 },
  { email: "karim_new@mail.com", age: 31 }
)` ➔

  `{
  userId: "U001",
  fullName: "Karim Das",
  email: "karim_new@mail.com",
  age: 31,
  lastUpdated: "2025-01-01"
}`

---

## 🧩 PROBLEM–03: 🔍 Profile Extractor

⚠️ **Function Name:** `extractProfileSections()`

| Input      | `userProfile` (object) |
| :--------- | :--------------------- |
| **Output** | object                 |

**Rules:**

`userProfile` must contain:

- `userId` (string)
- `fullName` (string)
- `age` (number)
- `email` (string)
- `phone` (string)
- `language` (string)
- `theme` (string)
- `notifications` (boolean)
- `createdAt` (string)

**Extraction Rules:**

- Use **destructuring** to split the flat profile into 3 nested sections:
  - `identity` → `{ userId, fullName, age }`
  - `contact` → `{ email, phone }`
  - `settings` → `{ language, theme, notifications }`
- Add field `profileSummary`:
  - `joinedOn = createdAt`
  - `totalFields = 9` (fixed — count of all input fields)

| Challenge 📢 | Return `{ identity, contact, settings, profileSummary }`. If any required field is missing → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `extractProfileSections({
  userId: "U001",
  fullName: "Nila Roy",
  age: 28,
  email: "nila@mail.com",
  phone: "01812345678",
  language: "English",
  theme: "light",
  notifications: false,
  createdAt: "2025-01-01"
})` ➔

  `{
  identity: { userId: "U001", fullName: "Nila Roy", age: 28 },
  contact: { email: "nila@mail.com", phone: "01812345678" },
  settings: { language: "English", theme: "light", notifications: false },
  profileSummary: { joinedOn: "2025-01-01", totalFields: 9 }
}`

---

## 🧩 PROBLEM–04: 📋 Profile Deep Cloner

⚠️ **Function Name:** `deepCloneProfile()`

| Input      | `userProfile` (object) |
| :--------- | :--------------------- |
| **Output** | object                 |

**Rules:**

`userProfile` must contain:

- `userId` (string)
- `fullName` (string)
- `address` (object with: `city` (string), `country` (string))
- `scores` (array of numbers)

**Clone Rules:**

- Create a **deep copy** — changes to the clone must NOT affect the original
- Use `JSON.parse(JSON.stringify())` for deep copy
- After cloning, add a new field to the clone: `cloneTag = "CLONED"`
- Modify clone's `address.city = "Unknown"` — original's city must stay unchanged
- Return **both** original and clone to prove deep copy worked

| Challenge 📢 | Return `{ original, clone }` where `clone.address.city = "Unknown"` and `original.address.city` is unchanged. `clone` must also have `cloneTag: "CLONED"`. If invalid input → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `deepCloneProfile({
  userId: "U002",
  fullName: "Sami Khan",
  address: { city: "Dhaka", country: "Bangladesh" },
  scores: [85, 90, 78]
})` ➔

  `{
  original: {
    userId: "U002",
    fullName: "Sami Khan",
    address: { city: "Dhaka", country: "Bangladesh" },
    scores: [85, 90, 78]
  },
  clone: {
    userId: "U002",
    fullName: "Sami Khan",
    address: { city: "Unknown", country: "Bangladesh" },
    scores: [85, 90, 78],
    cloneTag: "CLONED"
  }
}`

---

## 🧩 PROBLEM–05: 🏆 Profile Completeness Scorer

⚠️ **Function Name:** `scoreProfileCompleteness()`

| Input      | `userProfile` (object) |
| :--------- | :--------------------- |
| **Output** | object                 |

**Rules:**

`userProfile` may or may not contain these fields:

- `fullName` (string)
- `email` (string)
- `phone` (string)
- `address` (object)
- `profilePicture` (string)
- `bio` (string)
- `language` (string)
- `theme` (string)

**Scoring Rules:**

Each field present and non-empty → worth these points:

| Field            | Points |
| :--------------- | :----- |
| `fullName`       | 20     |
| `email`          | 20     |
| `phone`          | 15     |
| `address`        | 15     |
| `profilePicture` | 10     |
| `bio`            | 10     |
| `language`       | 5      |
| `theme`          | 5      |

- `totalScore` = sum of points for present + non-empty fields
- `maxScore` = 100

**Completion Level:**

| totalScore | level         |
| :--------- | :------------ |
| 100        | "COMPLETE"    |
| 70 – 99    | "ALMOST DONE" |
| 40 – 69    | "HALF DONE"   |
| < 40       | "INCOMPLETE"  |

- `missingFields` → array of field names that are absent or empty

| Challenge 📢 | Return `{ totalScore, maxScore: 100, level, missingFields }`. If `userProfile` is not an object or is null → `"Invalid Input"` |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `scoreProfileCompleteness({
  fullName: "Tania Begum",
  email: "tania@mail.com",
  phone: "01912345678",
  address: { city: "Chittagong", country: "Bangladesh" },
  profilePicture: "",
  bio: "",
  language: "Bangla",
  theme: "light"
})` ➔

  `{
  totalScore: 80,
  maxScore: 100,
  level: "ALMOST DONE",
  missingFields: ["profilePicture", "bio"]
}`

---
