# 🎓 JS DAILY PRACTICE – DAY-180

📅 **Goal:** Inventory System (Multi-Function System Design — Mini Backend Simulation)
🎯 **Focus:** Function Composition • Modular Design • Multi-Layer Architecture • Data Flow Simulation

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.
- This day's problems work TOGETHER as a system — later problems may reuse the data shape produced by earlier ones.

---

## 🧩 PROBLEM–01: ➕ addProduct()

⚠️ **Function Name:** `addProduct()`

| Input      | `inventory` (array of objects), `newProduct` (object) |
| :--------- | :---------------------------------------------------- |
| **Output** | object                                                |

**Rules:**

`inventory` — array of existing product objects (may be empty), each with:

- `productId` (string)
- `name` (string)
- `quantity` (number)
- `unitPrice` (number)

`newProduct` object:

- `productId` (string, non-empty)
- `name` (string, non-empty)
- `quantity` (number, integer, ≥ 0)
- `unitPrice` (number, > 0)

**Add Rules:**

- Do NOT mutate `inventory` — return a new array
- If `productId` already exists in `inventory` → reject: `"Product ID already exists"`
- Otherwise, append `newProduct` to a new array (spread)
- `totalProducts` → count after addition

| Challenge 📢 | If duplicate: return `{ added: false, reason: "Product ID already exists", inventory }` (original inventory unchanged). If added: return `{ added: true, inventory: updatedInventory, totalProducts }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `addProduct(
  [{ productId: "P1", name: "Pen", quantity: 100, unitPrice: 5 }],
  { productId: "P2", name: "Notebook", quantity: 50, unitPrice: 25 }
)` ➔

  `{
  added: true,
  inventory: [
    { productId: "P1", name: "Pen", quantity: 100, unitPrice: 5 },
    { productId: "P2", name: "Notebook", quantity: 50, unitPrice: 25 }
  ],
  totalProducts: 2
}`

---

## 🧩 PROBLEM–02: ➖ removeProduct()

⚠️ **Function Name:** `removeProduct()`

| Input      | `inventory` (array of objects), `productId` (string) |
| :--------- | :--------------------------------------------------- |
| **Output** | object                                               |

**Rules:**

`inventory` — array of product objects (same shape as Problem 01)
`productId` must be non-empty string

**Remove Rules:**

- Do NOT mutate `inventory` — return a new array
- If `productId` does NOT exist in `inventory` → reject: `"Product not found"`
- Otherwise, filter it out
- `totalProducts` → count after removal

| Challenge 📢 | If not found: return `{ removed: false, reason: "Product not found", inventory }` (unchanged). If removed: return `{ removed: true, inventory: updatedInventory, totalProducts }`. If invalid input → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `removeProduct(
  [
    { productId: "P1", name: "Pen", quantity: 100, unitPrice: 5 },
    { productId: "P2", name: "Notebook", quantity: 50, unitPrice: 25 }
  ],
  "P1"
)` ➔

  `{
  removed: true,
  inventory: [
    { productId: "P2", name: "Notebook", quantity: 50, unitPrice: 25 }
  ],
  totalProducts: 1
}`

---

## 🧩 PROBLEM–03: 🔄 updateStock()

⚠️ **Function Name:** `updateStock()`

| Input      | `inventory` (array of objects), `productId` (string), `quantityChange` (number) |
| :--------- | :------------------------------------------------------------------------------ |
| **Output** | object                                                                          |

**Rules:**

`inventory` — array of product objects
`productId` must exist in `inventory` → else reject: `"Product not found"`
`quantityChange` (number, integer) — can be positive (restock) or negative (sale/deduction)

**Update Rules:**

- Do NOT mutate `inventory`
- Find the product, compute `newQuantity = currentQuantity + quantityChange`
- If `newQuantity < 0` → reject: `"Insufficient stock for this operation"` (do not apply the change)
- Otherwise, apply: update that product's `quantity` to `newQuantity`, return new inventory array
- `operationType`:
  - `quantityChange > 0` → `"RESTOCK"`
  - `quantityChange < 0` → `"DEDUCTION"`
  - `quantityChange === 0` → `"NO_CHANGE"`

| Challenge 📢 | If rejected: return `{ updated: false, reason, inventory }` (unchanged). If updated: return `{ updated: true, inventory: updatedInventory, operationType, newQuantity }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `updateStock(
  [{ productId: "P2", name: "Notebook", quantity: 50, unitPrice: 25 }],
  "P2",
  -60
)` ➔

  `{
  updated: false,
  reason: "Insufficient stock for this operation",
  inventory: [
    { productId: "P2", name: "Notebook", quantity: 50, unitPrice: 25 }
  ]
}`

---

## 🧩 PROBLEM–04: 🚨 lowStockAlert()

⚠️ **Function Name:** `lowStockAlert()`

| Input      | `inventory` (array of objects), `threshold` (number) |
| :--------- | :--------------------------------------------------- |
| **Output** | object                                               |

**Rules:**

`inventory` — array of product objects (`productId`, `name`, `quantity`, `unitPrice`)
`threshold` must be a number ≥ 0

**Alert Rules:**

- `criticalStock` → products where `quantity === 0` (full objects)
- `lowStock` → products where `0 < quantity <= threshold` (full objects)
- `healthyStock` → products where `quantity > threshold` (full objects)
- `alertMessage`:
  - If `criticalStock.length > 0` → `` `URGENT: ${criticalStock.length} product(s) out of stock!` ``
  - Else if `lowStock.length > 0` → `` `WARNING: ${lowStock.length} product(s) running low.` ``
  - Else → `"All stock levels healthy."`

| Challenge 📢 | Return `{ criticalStock, lowStock, healthyStock, alertMessage }`. If `inventory` is not an array → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `lowStockAlert([
  { productId: "P1", name: "Pen", quantity: 0, unitPrice: 5 },
  { productId: "P2", name: "Notebook", quantity: 8, unitPrice: 25 },
  { productId: "P3", name: "Stapler", quantity: 40, unitPrice: 80 }
], 10)` ➔

  `{
  criticalStock: [{ productId: "P1", name: "Pen", quantity: 0, unitPrice: 5 }],
  lowStock: [{ productId: "P2", name: "Notebook", quantity: 8, unitPrice: 25 }],
  healthyStock: [{ productId: "P3", name: "Stapler", quantity: 40, unitPrice: 80 }],
  alertMessage: "URGENT: 1 product(s) out of stock!"
}`

---

## 🧩 PROBLEM–05: 🏗️ runInventoryWorkflow()

⚠️ **Function Name:** `runInventoryWorkflow()`

| Input      | `initialInventory` (array of objects), `operations` (array of objects) |
| :--------- | :--------------------------------------------------------------------- |
| **Output** | object                                                                 |

**Rules:**

This problem composes the previous 4 functions into one workflow (function composition).

`initialInventory` — starting array of products
`operations` — array of operation objects, each one of:

- `{ type: "ADD", product: {...} }`
- `{ type: "REMOVE", productId: "..." }`
- `{ type: "UPDATE_STOCK", productId: "...", quantityChange: number }`

Must process operations IN ORDER, each acting on the result of the previous one.

**Workflow Rules:**

- Use the SAME logic as `addProduct()`, `removeProduct()`, `updateStock()` internally (re-implement inline or describe equivalent logic)
- Track each operation's outcome (success or failure with reason) in a log
- If an operation fails, it does NOT change inventory, but processing continues to the next operation
- After all operations: run the equivalent of `lowStockAlert()` logic with `threshold = 10` on the final inventory

| Challenge 📢 | Return `{ finalInventory, operationLog, finalAlertMessage }` where `operationLog` is an array of `{ type, success, reason }` for each operation (reason is `null` if successful). If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `runInventoryWorkflow(
  [{ productId: "P1", name: "Pen", quantity: 20, unitPrice: 5 }],
  [
    { type: "ADD", product: { productId: "P2", name: "Notebook", quantity: 5, unitPrice: 25 } },
    { type: "UPDATE_STOCK", productId: "P1", quantityChange: -15 },
    { type: "REMOVE", productId: "P3" }
  ]
)` ➔

  `{
  finalInventory: [
    { productId: "P1", name: "Pen", quantity: 5, unitPrice: 5 },
    { productId: "P2", name: "Notebook", quantity: 5, unitPrice: 25 }
  ],
  operationLog: [
    { type: "ADD", success: true, reason: null },
    { type: "UPDATE_STOCK", success: true, reason: null },
    { type: "REMOVE", success: false, reason: "Product not found" }
  ],
  finalAlertMessage: "WARNING: 2 product(s) running low."
}`

---
