# 🎓 JS DAILY PRACTICE – DAY-181

📅 **Goal:** Order Management System (Multi-Function System Design — Mini Backend Simulation)
🎯 **Focus:** Function Composition • Modular Design • Multi-Layer Architecture • Data Flow Simulation

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.
- This day's problems work TOGETHER as a system — later problems may reuse the data shape produced by earlier ones.

---

## 🧩 PROBLEM–01: 🛒 createOrder()

⚠️ **Function Name:** `createOrder()`

| Input      | `orders` (array of objects), `newOrderRequest` (object) |
| :--------- | :------------------------------------------------------ |
| **Output** | object                                                  |

**Rules:**

`orders` — array of existing order objects (may be empty), each with:

- `orderId` (string)
- `customerName` (string)
- `items` (array of objects: `{ name, price, qty }`)
- `status` (string)

`newOrderRequest` object:

- `orderId` (string, non-empty)
- `customerName` (string, non-empty)
- `items` (array of objects, each with `name` (string), `price` (number, >0), `qty` (number, integer, ≥1)) — must have ≥1 item

**Create Rules:**

- Do NOT mutate `orders` — return new array
- If `orderId` already exists → reject: `"Order ID already exists"`
- Compute `totalAmount = sum of (price × qty) for all items`
- New order object includes: `orderId`, `customerName`, `items`, `totalAmount`, `status: "PENDING"`
- Append to a new array (spread)

| Challenge 📢 | If duplicate: return `{ created: false, reason: "Order ID already exists", orders }` (unchanged). If created: return `{ created: true, orders: updatedOrders, totalAmount }`. If invalid input → `"Invalid Input"` |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `createOrder(
  [],
  { orderId: "ORD-1", customerName: "Hasib", items: [{ name: "Bag", price: 1200, qty: 2 }, { name: "Pen", price: 20, qty: 5 }] }
)` ➔

  `{
  created: true,
  orders: [
    { orderId: "ORD-1", customerName: "Hasib", items: [{ name: "Bag", price: 1200, qty: 2 }, { name: "Pen", price: 20, qty: 5 }], totalAmount: 2500, status: "PENDING" }
  ],
  totalAmount: 2500
}`

---

## 🧩 PROBLEM–02: ❌ cancelOrder()

⚠️ **Function Name:** `cancelOrder()`

| Input      | `orders` (array of objects), `orderId` (string) |
| :--------- | :---------------------------------------------- |
| **Output** | object                                          |

**Rules:**

`orders` — array of order objects (with `orderId`, `status`, etc.)
`orderId` must be non-empty string

**Cancel Rules:**

- Do NOT mutate `orders`
- If `orderId` not found → reject: `"Order not found"`
- If found order's `status` is already `"CANCELLED"` → reject: `"Order is already cancelled"`
- If found order's `status` is `"DELIVERED"` → reject: `"Cannot cancel a delivered order"`
- Otherwise, update that order's `status` to `"CANCELLED"`, return new orders array

| Challenge 📢 | If rejected: return `{ cancelled: false, reason, orders }` (unchanged). If cancelled: return `{ cancelled: true, orders: updatedOrders }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `cancelOrder(
  [
    { orderId: "ORD-1", customerName: "Hasib", totalAmount: 2500, status: "PENDING" },
    { orderId: "ORD-2", customerName: "Lina", totalAmount: 800, status: "DELIVERED" }
  ],
  "ORD-2"
)` ➔

  `{
  cancelled: false,
  reason: "Cannot cancel a delivered order",
  orders: [
    { orderId: "ORD-1", customerName: "Hasib", totalAmount: 2500, status: "PENDING" },
    { orderId: "ORD-2", customerName: "Lina", totalAmount: 800, status: "DELIVERED" }
  ]
}`

---

## 🧩 PROBLEM–03: 💸 refundOrder()

⚠️ **Function Name:** `refundOrder()`

| Input      | `orders` (array of objects), `orderId` (string), `refundReason` (string) |
| :--------- | :----------------------------------------------------------------------- |
| **Output** | object                                                                   |

**Rules:**

`orders` — array of order objects (with `orderId`, `status`, `totalAmount`)
`orderId` must be non-empty string
`refundReason` must be non-empty string

**Refund Rules:**

- Do NOT mutate `orders`
- If `orderId` not found → reject: `"Order not found"`
- Only orders with `status === "DELIVERED"` can be refunded → else reject: `"Only delivered orders can be refunded"`
- Otherwise, update that order's `status` to `"REFUNDED"`, add `refundReason` and `refundAmount` (= original `totalAmount`) to the order object

| Challenge 📢 | If rejected: return `{ refunded: false, reason, orders }` (unchanged). If refunded: return `{ refunded: true, orders: updatedOrders, refundAmount }`. If invalid input → `"Invalid Input"` |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `refundOrder(
  [{ orderId: "ORD-2", customerName: "Lina", totalAmount: 800, status: "DELIVERED" }],
  "ORD-2",
  "Item damaged on arrival"
)` ➔

  `{
  refunded: true,
  orders: [
    { orderId: "ORD-2", customerName: "Lina", totalAmount: 800, status: "REFUNDED", refundReason: "Item damaged on arrival", refundAmount: 800 }
  ],
  refundAmount: 800
}`

---

## 🧩 PROBLEM–04: 🧮 calculateOrderTotal()

⚠️ **Function Name:** `calculateOrderTotal()`

| Input      | `items` (array of objects), `discountPercent` (number), `taxPercent` (number) |
| :--------- | :---------------------------------------------------------------------------- |
| **Output** | object                                                                        |

**Rules:**

`items` — non-empty array, each `{ name (string), price (number, >0), qty (number, integer, ≥1) }`
`discountPercent` must be 0–100
`taxPercent` must be 0–100

**Calculation Rules:**

- `subtotal = sum of (price × qty)` for all items
- `discountAmount = subtotal × discountPercent / 100`
- `afterDiscount = subtotal - discountAmount`
- `taxAmount = afterDiscount × taxPercent / 100`
- `grandTotal = afterDiscount + taxAmount`

All monetary values rounded to 2 decimal places.

| Challenge 📢 | Return `{ subtotal, discountAmount, afterDiscount, taxAmount, grandTotal }`. If invalid input → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `calculateOrderTotal(
  [{ name: "Shirt", price: 1000, qty: 2 }, { name: "Belt", price: 500, qty: 1 }],
  10,
  5
)` ➔

  `{
  subtotal: 2500,
  discountAmount: 250,
  afterDiscount: 2250,
  taxAmount: 112.50,
  grandTotal: 2362.50
}`

---

## 🧩 PROBLEM–05: 🏗️ runOrderWorkflow()

⚠️ **Function Name:** `runOrderWorkflow()`

| Input      | `initialOrders` (array of objects), `operations` (array of objects) |
| :--------- | :------------------------------------------------------------------ |
| **Output** | object                                                              |

**Rules:**

This problem composes the previous functions into one workflow.

`initialOrders` — starting array of orders
`operations` — array of operation objects, each one of:

- `{ type: "CREATE", orderRequest: {...} }`
- `{ type: "CANCEL", orderId: "..." }`
- `{ type: "REFUND", orderId: "...", refundReason: "..." }`

Must process operations IN ORDER, each acting on the result of the previous one.

**Workflow Rules:**

- Apply the same logic as `createOrder()`, `cancelOrder()`, `refundOrder()` internally
- Track each operation's outcome in a log: `{ type, success, reason }` (reason `null` if success)
- Failed operations do not change the order list; processing continues
- After all operations: compute `summary`:
  - `totalOrders` → count of all orders
  - `pendingCount`, `cancelledCount`, `refundedCount`, `deliveredCount` → counts by status

| Challenge 📢 | Return `{ finalOrders, operationLog, summary }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `runOrderWorkflow(
  [{ orderId: "ORD-9", customerName: "Mina", items: [{name:"Book",price:300,qty:1}], totalAmount:300, status: "DELIVERED" }],
  [
    { type: "CREATE", orderRequest: { orderId: "ORD-10", customerName: "Rafi", items: [{ name: "Cup", price: 150, qty: 2 }] } },
    { type: "REFUND", orderId: "ORD-9", refundReason: "Wrong item" },
    { type: "CANCEL", orderId: "ORD-99" }
  ]
)` ➔

  `{
  finalOrders: [
    { orderId: "ORD-9", customerName: "Mina", items: [{name:"Book",price:300,qty:1}], totalAmount: 300, status: "REFUNDED", refundReason: "Wrong item", refundAmount: 300 },
    { orderId: "ORD-10", customerName: "Rafi", items: [{ name: "Cup", price: 150, qty: 2 }], totalAmount: 300, status: "PENDING" }
  ],
  operationLog: [
    { type: "CREATE", success: true, reason: null },
    { type: "REFUND", success: true, reason: null },
    { type: "CANCEL", success: false, reason: "Order not found" }
  ],
  summary: { totalOrders: 2, pendingCount: 1, cancelledCount: 0, refundedCount: 1, deliveredCount: 0 }
}`

---
