# 🎓 JS DAILY PRACTICE – DAY-184

📅 **Goal:** User Management System (Multi-Function System Design — Mini Backend Simulation)
🎯 **Focus:** Function Composition • Modular Design • Multi-Layer Architecture • Data Flow Simulation

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.
- This day's problems work TOGETHER as a system — later problems may reuse the data shape produced by earlier ones.

---

## 🧩 PROBLEM–01: ➕ createUser()

⚠️ **Function Name:** `createUser()`

| Input      | `users` (array of objects), `newUser` (object) |
| :--------- | :--------------------------------------------- |
| **Output** | object                                         |

**Rules:**

`users` — array of existing user objects (may be empty), each with:

- `userId` (string)
- `username` (string)
- `email` (string)
- `status` (string: "ACTIVE", "SUSPENDED", "DELETED")

`newUser` object:

- `userId` (string, non-empty)
- `username` (string, non-empty)
- `email` (string, must contain "@")

**Create Rules:**

- Do NOT mutate `users` — return new array
- If `userId` already exists → reject: `"User ID already exists"`
- If `email` already exists (case-insensitive) on ANY existing user → reject: `"Email already registered"`
- Otherwise, append new user with `status: "ACTIVE"` added automatically
- `totalUsers` → count after creation

| Challenge 📢 | If rejected: return `{ created: false, reason, users }` (unchanged). If created: return `{ created: true, users: updatedUsers, totalUsers }`. If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `createUser(
  [{ userId: "U1", username: "rafi_k", email: "rafi@mail.com", status: "ACTIVE" }],
  { userId: "U2", username: "mina_h", email: "MINA@mail.com" }
)` ➔

  `{
  created: true,
  users: [
    { userId: "U1", username: "rafi_k", email: "rafi@mail.com", status: "ACTIVE" },
    { userId: "U2", username: "mina_h", email: "MINA@mail.com", status: "ACTIVE" }
  ],
  totalUsers: 2
}`

---

## 🧩 PROBLEM–02: 🚫 suspendUser()

⚠️ **Function Name:** `suspendUser()`

| Input      | `users` (array of objects), `userId` (string), `suspensionReason` (string) |
| :--------- | :------------------------------------------------------------------------- |
| **Output** | object                                                                     |

**Rules:**

`users` — array of user objects (with `userId`, `status`, etc.)
`userId` must be non-empty string
`suspensionReason` must be non-empty string

**Suspend Rules:**

- Do NOT mutate `users`
- If `userId` not found → reject: `"User not found"`
- If found user's `status` is already `"SUSPENDED"` → reject: `"User is already suspended"`
- If found user's `status` is `"DELETED"` → reject: `"Cannot suspend a deleted user"`
- Otherwise, update `status` to `"SUSPENDED"`, add `suspensionReason` field

| Challenge 📢 | If rejected: return `{ suspended: false, reason, users }` (unchanged). If suspended: return `{ suspended: true, users: updatedUsers }`. If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `suspendUser(
  [{ userId: "U1", username: "rafi_k", email: "rafi@mail.com", status: "ACTIVE" }],
  "U1",
  "Violation of community guidelines"
)` ➔

  `{
  suspended: true,
  users: [
    { userId: "U1", username: "rafi_k", email: "rafi@mail.com", status: "SUSPENDED", suspensionReason: "Violation of community guidelines" }
  ]
}`

---

## 🧩 PROBLEM–03: 🔄 reactivateUser()

⚠️ **Function Name:** `reactivateUser()`

| Input      | `users` (array of objects), `userId` (string) |
| :--------- | :-------------------------------------------- |
| **Output** | object                                        |

**Rules:**

`users` — array of user objects
`userId` must be non-empty string

**Reactivate Rules:**

- Do NOT mutate `users`
- If `userId` not found → reject: `"User not found"`
- Only `"SUSPENDED"` users can be reactivated → else reject: `"Only suspended users can be reactivated"`
- Otherwise, update `status` to `"ACTIVE"`, remove the `suspensionReason` field entirely (the field should not appear in the output object)

| Challenge 📢 | If rejected: return `{ reactivated: false, reason, users }` (unchanged). If reactivated: return `{ reactivated: true, users: updatedUsers }`. If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `reactivateUser(
  [{ userId: "U1", username: "rafi_k", email: "rafi@mail.com", status: "SUSPENDED", suspensionReason: "Violation of community guidelines" }],
  "U1"
)` ➔

  `{
  reactivated: true,
  users: [
    { userId: "U1", username: "rafi_k", email: "rafi@mail.com", status: "ACTIVE" }
  ]
}`

---

## 🧩 PROBLEM–04: 📊 userStatusSummary()

⚠️ **Function Name:** `userStatusSummary()`

| Input      | `users` (array of objects) |
| :--------- | :------------------------- |
| **Output** | object                     |

**Rules:**

`users` — non-empty array, each with `userId`, `username`, `status`

**Summary Rules:**

- `totalUsers` → total count
- `activeCount`, `suspendedCount`, `deletedCount` → counts per status
- `activeRate` → percentage of ACTIVE users (rounded to 2 decimal places)
- `statusHealthLevel`:
  - `activeRate >= 90` → `"EXCELLENT"`
  - `activeRate >= 70` → `"GOOD"`
  - `activeRate >= 50` → `"FAIR"`
  - `activeRate < 50` → `"POOR"`

| Challenge 📢 | Return `{ totalUsers, activeCount, suspendedCount, deletedCount, activeRate, statusHealthLevel }`. If invalid input → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `userStatusSummary([
  { userId: "U1", username: "rafi_k", status: "ACTIVE" },
  { userId: "U2", username: "mina_h", status: "ACTIVE" },
  { userId: "U3", username: "kabir_j", status: "SUSPENDED" },
  { userId: "U4", username: "lina_p", status: "DELETED" }
])` ➔

  `{
  totalUsers: 4,
  activeCount: 2,
  suspendedCount: 1,
  deletedCount: 1,
  activeRate: 50.00,
  statusHealthLevel: "FAIR"
}`

---

## 🧩 PROBLEM–05: 🏗️ runUserManagementWorkflow()

⚠️ **Function Name:** `runUserManagementWorkflow()`

| Input      | `initialUsers` (array of objects), `operations` (array of objects) |
| :--------- | :----------------------------------------------------------------- |
| **Output** | object                                                             |

**Rules:**

This problem composes the previous functions into one workflow.

`initialUsers` — starting array of users
`operations` — array of operation objects, each one of:

- `{ type: "CREATE", user: {...} }`
- `{ type: "SUSPEND", userId: "...", reason: "..." }`
- `{ type: "REACTIVATE", userId: "..." }`

Must process operations IN ORDER, each acting on the result of the previous one.

**Workflow Rules:**

- Apply same logic as `createUser()`, `suspendUser()`, `reactivateUser()` internally
- Track each operation's outcome in a log: `{ type, success, reason }` (reason `null` if success)
- Failed operations do not change the user list; processing continues
- After all operations: run the equivalent of `userStatusSummary()` logic on the final user list

| Challenge 📢 | Return `{ finalUsers, operationLog, statusSummary }`. If invalid input → `"Invalid Input"` |
| :----------- | :----------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `runUserManagementWorkflow(
  [{ userId: "U1", username: "rafi_k", email: "rafi@mail.com", status: "ACTIVE" }],
  [
    { type: "CREATE", user: { userId: "U2", username: "mina_h", email: "mina@mail.com" } },
    { type: "SUSPEND", userId: "U1", reason: "Spam reports" },
    { type: "REACTIVATE", userId: "U2" }
  ]
)` ➔

  `{
  finalUsers: [
    { userId: "U1", username: "rafi_k", email: "rafi@mail.com", status: "SUSPENDED", suspensionReason: "Spam reports" },
    { userId: "U2", username: "mina_h", email: "mina@mail.com", status: "ACTIVE" }
  ],
  operationLog: [
    { type: "CREATE", success: true, reason: null },
    { type: "SUSPEND", success: true, reason: null },
    { type: "REACTIVATE", success: false, reason: "Only suspended users can be reactivated" }
  ],
  statusSummary: { totalUsers: 2, activeCount: 1, suspendedCount: 1, deletedCount: 0, activeRate: 50.00, statusHealthLevel: "FAIR" }
}`

---
