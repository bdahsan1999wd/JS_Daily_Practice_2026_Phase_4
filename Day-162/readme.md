# 🎓 JS DAILY PRACTICE – DAY-162

📅 **Goal:** Order Tracking System (Object-Based Data Modeling)
🎯 **Focus:** Object Nesting • Destructuring • Spread Operator • Immutability • Deep vs Shallow Copy

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 📦 Order Record Builder

⚠️ **Function Name:** `buildOrderRecord()`

| Input      | `customerInfo` (object), `orderDetails` (object), `deliveryInfo` (object) |
| :--------- | :------------------------------------------------------------------------ |
| **Output** | object                                                                    |

**Rules:**

`customerInfo` object:

- `customerId` (string, non-empty)
- `customerName` (string, non-empty)
- `email` (string, must contain "@")

`orderDetails` object:

- `orderId` (string, non-empty)
- `items` (array of strings, minimum 1 item)
- `totalAmount` (number, > 0)

`deliveryInfo` object:

- `deliveryCity` (string, non-empty)
- `deliveryMethod` (string: "STANDARD", "EXPRESS", or "OVERNIGHT")

**Build Rules:**

- Use **spread operator** to merge all three into one order record
- Add computed field: `deliveryCharge` based on `deliveryMethod`:
  - "OVERNIGHT" → 500
  - "EXPRESS" → 250
  - "STANDARD" → 100
- Add computed field: `grandTotal = totalAmount + deliveryCharge`
- Add field: `orderedAt = "2025-01-01"` (fixed string)
- Add field: `status = "PENDING"` (fixed string)

| Challenge 📢 | Return single merged order object with all fields from the three inputs plus `deliveryCharge`, `grandTotal`, `orderedAt`, `status`. If invalid input → `"Invalid Input"` |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `buildOrderRecord(
  { customerId: "C001", customerName: "Farhan Hossain", email: "farhan@mail.com" },
  { orderId: "ORD-001", items: ["Laptop", "Mouse"], totalAmount: 85000 },
  { deliveryCity: "Dhaka", deliveryMethod: "EXPRESS" }
)` ➔

- orderedAt = "2025-01-01", status = "PENDING"

  `{
  customerId: "C001",
  customerName: "Farhan Hossain",
  email: "farhan@mail.com",
  orderId: "ORD-001",
  items: ["Laptop", "Mouse"],
  totalAmount: 85000,
  deliveryCity: "Dhaka",
  deliveryMethod: "EXPRESS",
  deliveryCharge: 250,
  grandTotal: 85250,
  orderedAt: "2025-01-01",
  status: "PENDING"
}`

---

## 🧩 PROBLEM–02: ✏️ Order Status Updater

⚠️ **Function Name:** `updateOrderStatus()`

| Input      | `existingOrder` (object), `updates` (object) |
| :--------- | :------------------------------------------- |
| **Output** | object                                       |

**Rules:**

`existingOrder` must have at minimum:

- `orderId` (string, non-empty)
- `customerName` (string, non-empty)
- `totalAmount` (number, > 0)
- `deliveryCharge` (number, ≥ 0)
- `status` (string, non-empty)

`updates` object:

- May contain any subset of: `status`, `deliveryCity`, `deliveryMethod`, `deliveryCharge`
- Must be a non-empty object (at least 1 key)

**Update Rules:**

- Use **spread operator** to merge: original order + updates
- Do NOT mutate the original `existingOrder` object
- If `updates` contains `status`, it must be one of: "PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"
- If `updates` contains `deliveryCharge`, validate it is still ≥ 0
- Recompute `grandTotal = totalAmount + final deliveryCharge`
- Add field: `lastUpdated = "2025-01-01"` (fixed string)

| Challenge 📢 | Return new updated order object (original stays unchanged). If any updated field is invalid → `"Invalid Input"`. If input is invalid → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `updateOrderStatus(
  { orderId: "ORD-002", customerName: "Ritu Das", totalAmount: 12000, deliveryCharge: 100, status: "PENDING" },
  { status: "SHIPPED", deliveryCharge: 250 }
)` ➔

  `{
  orderId: "ORD-002",
  customerName: "Ritu Das",
  totalAmount: 12000,
  deliveryCharge: 250,
  status: "SHIPPED",
  grandTotal: 12250,
  lastUpdated: "2025-01-01"
}`

---

## 🧩 PROBLEM–03: 🔍 Order Record Extractor

⚠️ **Function Name:** `extractOrderSections()`

| Input      | `orderRecord` (object) |
| :--------- | :--------------------- |
| **Output** | object                 |

**Rules:**

`orderRecord` must contain:

- `orderId` (string)
- `customerId` (string)
- `customerName` (string)
- `email` (string)
- `items` (array)
- `totalAmount` (number)
- `deliveryCharge` (number)
- `grandTotal` (number)
- `deliveryCity` (string)
- `deliveryMethod` (string)
- `status` (string)
- `orderedAt` (string)

**Extraction Rules:**

- Use **destructuring** to split the flat record into 3 nested sections:
  - `customer` → `{ customerId, customerName, email }`
  - `order` → `{ orderId, items, totalAmount, status }`
  - `delivery` → `{ deliveryCity, deliveryMethod, deliveryCharge, grandTotal }`
- Add field `orderSummary`:
  - `placedOn = orderedAt`
  - `itemCount = items.length`
  - `isDelivered = status === "DELIVERED"`

| Challenge 📢 | Return `{ customer, order, delivery, orderSummary }`. If any required field is missing → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `extractOrderSections({
  orderId: "ORD-003",
  customerId: "C002",
  customerName: "Sabbir Khan",
  email: "sabbir@mail.com",
  items: ["Chair", "Desk", "Lamp"],
  totalAmount: 25000,
  deliveryCharge: 500,
  grandTotal: 25500,
  deliveryCity: "Chittagong",
  deliveryMethod: "OVERNIGHT",
  status: "DELIVERED",
  orderedAt: "2025-01-01"
})` ➔

  `{
  customer: { customerId: "C002", customerName: "Sabbir Khan", email: "sabbir@mail.com" },
  order: { orderId: "ORD-003", items: ["Chair", "Desk", "Lamp"], totalAmount: 25000, status: "DELIVERED" },
  delivery: { deliveryCity: "Chittagong", deliveryMethod: "OVERNIGHT", deliveryCharge: 500, grandTotal: 25500 },
  orderSummary: { placedOn: "2025-01-01", itemCount: 3, isDelivered: true }
}`

---

## 🧩 PROBLEM–04: 📋 Order Deep Cloner

⚠️ **Function Name:** `deepCloneOrder()`

| Input      | `orderRecord` (object) |
| :--------- | :--------------------- |
| **Output** | object                 |

**Rules:**

`orderRecord` must contain:

- `orderId` (string)
- `customerName` (string)
- `deliveryAddress` (object with: `street` (string), `city` (string))
- `items` (array of strings)

**Clone Rules:**

- Create a **deep copy** using `JSON.parse(JSON.stringify())`
- After cloning, add field to clone: `cloneTag = "CLONED"`
- Modify clone's `deliveryAddress.city = "Unknown"` — original's `deliveryAddress.city` must stay unchanged
- Push `"cloned-item"` into clone's `items` — original's `items` must stay unchanged
- Return **both** original and clone to prove deep copy worked

| Challenge 📢 | Return `{ original, clone }` where clone has modified `deliveryAddress.city`, updated `items`, and `cloneTag: "CLONED"` — original must be fully unchanged. If invalid input → `"Invalid Input"` |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `deepCloneOrder({
  orderId: "ORD-004",
  customerName: "Mona Lisa",
  deliveryAddress: { street: "Road-5, Block-B", city: "Sylhet" },
  items: ["Notebook", "Pen"]
})` ➔

  `{
  original: {
    orderId: "ORD-004",
    customerName: "Mona Lisa",
    deliveryAddress: { street: "Road-5, Block-B", city: "Sylhet" },
    items: ["Notebook", "Pen"]
  },
  clone: {
    orderId: "ORD-004",
    customerName: "Mona Lisa",
    deliveryAddress: { street: "Road-5, Block-B", city: "Unknown" },
    items: ["Notebook", "Pen", "cloned-item"],
    cloneTag: "CLONED"
  }
}`

---

## 🧩 PROBLEM–05: 🏆 Order Completeness Scorer

⚠️ **Function Name:** `scoreOrderCompleteness()`

| Input      | `orderRecord` (object) |
| :--------- | :--------------------- |
| **Output** | object                 |

**Rules:**

`orderRecord` may or may not contain these fields:

- `orderId` (string, non-empty)
- `customerId` (string, non-empty)
- `customerName` (string, non-empty)
- `email` (string, counts if contains "@")
- `items` (array, counts if non-empty)
- `totalAmount` (number, counts if > 0)
- `deliveryCharge` (number, counts if ≥ 0 and key exists)
- `deliveryCity` (string, non-empty)
- `deliveryMethod` (string, non-empty)
- `status` (string, non-empty)

**Scoring Rules:**

| Field            | Points |
| :--------------- | :----- |
| `orderId`        | 15     |
| `customerId`     | 10     |
| `customerName`   | 10     |
| `email`          | 10     |
| `items`          | 15     |
| `totalAmount`    | 15     |
| `deliveryCharge` | 5      |
| `deliveryCity`   | 10     |
| `deliveryMethod` | 5      |
| `status`         | 5      |

- `totalScore` = sum of points for present + valid fields
- `maxScore` = 100

**Order Status Level:**

| totalScore | level                |
| :--------- | :------------------- |
| 100        | "FULLY RECORDED"     |
| 70 – 99    | "MOSTLY RECORDED"    |
| 40 – 69    | "PARTIALLY RECORDED" |
| < 40       | "POORLY RECORDED"    |

- `missingFields` → array of field names that are absent or invalid

| Challenge 📢 | Return `{ totalScore, maxScore: 100, level, missingFields }`. If `orderRecord` is not an object or is null → `"Invalid Input"` |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `scoreOrderCompleteness({
  orderId: "ORD-005",
  customerId: "C003",
  customerName: "Tanzia Sultana",
  email: "tanzia@mail.com",
  items: ["Sofa", "Table"],
  totalAmount: 45000,
  deliveryCharge: 0,
  deliveryCity: "Rajshahi",
  deliveryMethod: "",
  status: ""
})` ➔

  `{
  totalScore: 90,
  maxScore: 100,
  level: "MOSTLY RECORDED",
  missingFields: ["deliveryMethod", "status"]
}`

---
