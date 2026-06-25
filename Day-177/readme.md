# 🎓 JS DAILY PRACTICE – DAY-177

📅 **Goal:** Role Permission System (Auth & Security Simulation)
🎯 **Focus:** Role-Based Access Control (RBAC) • Permission Inheritance • Access Gate Logic • Privilege Escalation Checks

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 🔐 Permission Gate Checker

⚠️ **Function Name:** `checkPermissionGate()`

| Input      | `rolePermissions` (object), `userRole` (string), `requiredPermission` (string) |
| :--------- | :----------------------------------------------------------------------------- |
| **Output** | object                                                                         |

**Rules:**

`rolePermissions` object — each key is a role name, value is an array of permission strings
e.g. `{ ADMIN: ["READ", "WRITE", "DELETE"], EDITOR: ["READ", "WRITE"], VIEWER: ["READ"] }`

`userRole` must exist as a key in `rolePermissions` → else fail: `"Role not found"`
`requiredPermission` must be a non-empty string

**Gate Rules:**

- Look up `rolePermissions[userRole]`
- `hasAccess` → true if `requiredPermission` exists in that role's permission array
- `accessMessage`:
  - If role not found → `"Role not found"`
  - If `hasAccess` → `` `Access granted: ${userRole} can ${requiredPermission}` ``
  - If not `hasAccess` → `` `Access denied: ${userRole} cannot ${requiredPermission}` ``

| Challenge 📢 | Return `{ hasAccess, accessMessage }`. If `rolePermissions` is not an object → `"Invalid Input"` |
| :----------- | :----------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `checkPermissionGate(
  { ADMIN: ["READ", "WRITE", "DELETE"], EDITOR: ["READ", "WRITE"], VIEWER: ["READ"] },
  "EDITOR",
  "DELETE"
)` ➔

  `{
  hasAccess: false,
  accessMessage: "Access denied: EDITOR cannot DELETE"
}`

---

## 🧩 PROBLEM–02: 🌳 Role Hierarchy Resolver

⚠️ **Function Name:** `resolveRoleHierarchy()`

| Input      | `roleHierarchy` (object), `userRole` (string) |
| :--------- | :-------------------------------------------- |
| **Output** | object                                        |

**Rules:**

`roleHierarchy` object — each key is a role, value is the role it **inherits from** (or `null` if top-level)
e.g. `{ SUPER_ADMIN: null, ADMIN: "SUPER_ADMIN", MANAGER: "ADMIN", STAFF: "MANAGER" }`

`userRole` must exist in `roleHierarchy` → else `"Invalid Input"`

**Resolution Rules:**

- Build `inheritanceChain` — array starting with `userRole`, then following the chain upward until reaching a role with `null` parent
- Example: for "STAFF" → chain = ["STAFF", "MANAGER", "ADMIN", "SUPER_ADMIN"]
- `inheritedRolesCount` → length of chain minus 1 (excludes the role itself)
- `topLevelRole` → the last role in the chain (the one with `null` parent)
- Guard against infinite loops: if chain length exceeds the number of keys in `roleHierarchy`, return `"Invalid Input"` (circular reference)

| Challenge 📢 | Return `{ inheritanceChain, inheritedRolesCount, topLevelRole }`. If invalid input or circular reference → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `resolveRoleHierarchy(
  { SUPER_ADMIN: null, ADMIN: "SUPER_ADMIN", MANAGER: "ADMIN", STAFF: "MANAGER" },
  "STAFF"
)` ➔

  `{
  inheritanceChain: ["STAFF", "MANAGER", "ADMIN", "SUPER_ADMIN"],
  inheritedRolesCount: 3,
  topLevelRole: "SUPER_ADMIN"
}`

---

## 🧩 PROBLEM–03: ⚠️ Privilege Escalation Detector

⚠️ **Function Name:** `detectPrivilegeEscalation()`

| Input      | `roleRanks` (object), `actingUser` (object), `targetAction` (object) |
| :--------- | :------------------------------------------------------------------- |
| **Output** | object                                                               |

**Rules:**

`roleRanks` object — each key is a role, value is a numeric rank (higher = more powerful)
e.g. `{ VIEWER: 1, EDITOR: 2, MANAGER: 3, ADMIN: 4 }`

`actingUser` object:

- `username` (string, non-empty)
- `role` (string, must exist in `roleRanks`)

`targetAction` object:

- `actionType` (string: "ASSIGN_ROLE" or "MODIFY_USER")
- `targetRole` (string, must exist in `roleRanks`) — the role being assigned or the role of the user being modified

**Escalation Detection Rules:**

- `actingUser.role` rank must be **strictly greater than** `targetAction.targetRole` rank to be allowed
- If `actingUser` rank ≤ `targetRole` rank → `isEscalationAttempt = true`, `allowed = false`
- If `actingUser` rank > `targetRole` rank → `isEscalationAttempt = false`, `allowed = true`
- `message`:
  - If allowed → `` `${username} (${role}) can perform ${actionType} on role ${targetRole}` ``
  - If blocked → `` `BLOCKED: ${username} (${role}) cannot perform ${actionType} on equal/higher role ${targetRole}` ``

| Challenge 📢 | Return `{ isEscalationAttempt, allowed, message }`. If invalid input or unknown role → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `detectPrivilegeEscalation(
  { VIEWER: 1, EDITOR: 2, MANAGER: 3, ADMIN: 4 },
  { username: "rashed", role: "EDITOR" },
  { actionType: "ASSIGN_ROLE", targetRole: "MANAGER" }
)` ➔

  `{
  isEscalationAttempt: true,
  allowed: false,
  message: "BLOCKED: rashed (EDITOR) cannot perform ASSIGN_ROLE on equal/higher role MANAGER"
}`

---

## 🧩 PROBLEM–04: 🧩 Multi-Role Permission Aggregator

⚠️ **Function Name:** `aggregateMultiRolePermissions()`

| Input      | `rolePermissions` (object), `userRoles` (array of strings) |
| :--------- | :--------------------------------------------------------- |
| **Output** | object                                                     |

**Rules:**

`rolePermissions` object — each key is a role, value is array of permission strings

`userRoles` — array of role names a single user holds (a user can have MULTIPLE roles)
Must be non-empty; each role must exist in `rolePermissions` (if any doesn't exist → `"Invalid Input"`)

**Aggregation Rules:**

- Combine permissions from ALL of the user's roles
- `combinedPermissions` → array of UNIQUE permissions (no duplicates) across all roles
- `permissionSources` → object: each key is a permission name, value is array of role names that grant it
- `totalUniquePermissions` → count of `combinedPermissions`

| Challenge 📢 | Return `{ combinedPermissions, permissionSources, totalUniquePermissions }`. If invalid input → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `aggregateMultiRolePermissions(
  { EDITOR: ["READ", "WRITE"], REVIEWER: ["READ", "COMMENT"], PUBLISHER: ["PUBLISH"] },
  ["EDITOR", "REVIEWER"]
)` ➔

  `{
  combinedPermissions: ["READ", "WRITE", "COMMENT"],
  permissionSources: {
    READ: ["EDITOR", "REVIEWER"],
    WRITE: ["EDITOR"],
    COMMENT: ["REVIEWER"]
  },
  totalUniquePermissions: 3
}`

---

## 🧩 PROBLEM–05: 📋 Access Audit Report Generator

⚠️ **Function Name:** `generateAccessAuditReport()`

| Input      | `accessLogs` (array of objects) |
| :--------- | :------------------------------ |
| **Output** | object                          |

**Rules:**

Each access log entry:

- `username` (string)
- `role` (string)
- `requestedPermission` (string)
- `wasGranted` (boolean)

`accessLogs` must be a non-empty array

**Audit Rules:**

- `totalRequests` → total count
- `grantedCount` → count where `wasGranted === true`
- `deniedCount` → count where `wasGranted === false`
- `denialRate` → percentage (rounded to 2 decimal places)
- `deniedByRole` → object: count of denied requests per `role` (only include roles with at least 1 denial)
- `mostDeniedPermission` → the `requestedPermission` value that appears most often among denied requests (if tie, pick the one that appears first in the log)
- `usersWithMultipleDenials` → array of usernames who have 2 or more denied requests

| Challenge 📢 | Return `{ totalRequests, grantedCount, deniedCount, denialRate, deniedByRole, mostDeniedPermission, usersWithMultipleDenials }`. If invalid input → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `generateAccessAuditReport([
  { username: "tina", role: "VIEWER", requestedPermission: "DELETE", wasGranted: false },
  { username: "tina", role: "VIEWER", requestedPermission: "WRITE", wasGranted: false },
  { username: "kabir", role: "EDITOR", requestedPermission: "DELETE", wasGranted: false },
  { username: "alam", role: "ADMIN", requestedPermission: "DELETE", wasGranted: true }
])` ➔

  `{
  totalRequests: 4,
  grantedCount: 1,
  deniedCount: 3,
  denialRate: 75.00,
  deniedByRole: { VIEWER: 2, EDITOR: 1 },
  mostDeniedPermission: "DELETE",
  usersWithMultipleDenials: ["tina"]
}`

---
