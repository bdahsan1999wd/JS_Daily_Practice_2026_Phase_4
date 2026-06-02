# 🎓 JS DAILY PRACTICE – DAY-154

📅 **Goal:** Shopping Cart Pricing Engine (Advanced Array Processing Engine)
🎯 **Focus:** map() • filter() • reduce() • find() • some() / every() • sort()

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 🛒 Cart Item Price Calculator

⚠️ **Function Name:** `calculateCartItems()`

| Input      | `cartItems` (array of objects) |
| :--------- | :----------------------------- |
| **Output** | array of objects               |

**Rules:**

Each cart item object:

- `name` (string)
- `price` (number, > 0)
- `quantity` (number, integer, ≥ 1)
- `discountPercent` (number, 0–100)

**Calculation:**

- `originalTotal = price × quantity`
- `discountAmount = originalTotal × discountPercent / 100`
- `finalTotal = originalTotal - discountAmount`

| Challenge 📢 | Return array with `name`, `originalTotal`, `discountAmount`, `finalTotal` — all rounded to 2 decimal places. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `calculateCartItems([
  { name: "Shirt", price: 500, quantity: 3, discountPercent: 10 },
  { name: "Shoes", price: 2000, quantity: 1, discountPercent: 0 }
])` ➔

  `[
  { name: "Shirt", originalTotal: 1500, discountAmount: 150, finalTotal: 1350 },
  { name: "Shoes", originalTotal: 2000, discountAmount: 0, finalTotal: 2000 }
]`

---

## 🧩 PROBLEM–02: 🔍 Cart Filter & Sorter

⚠️ **Function Name:** `filterCartByCategory()`

| Input      | `cartItems` (array of objects), `category` (string) |
| :--------- | :-------------------------------------------------- |
| **Output** | array of objects                                    |

**Rules:**

Each cart item object:

- `name` (string)
- `category` (string)
- `price` (number, > 0)
- `quantity` (number, integer, ≥ 1)
- `discountPercent` (number, 0–100)

**Filter Rules:**

- Filter by `category` (case-insensitive)
- From filtered list, keep only items where `quantity ≥ 2`
- Sort result by `price` descending

| Challenge 📢 | Return filtered array with all original fields. If no match → return `[]`. If invalid input → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `filterCartByCategory([
  { name: "T-Shirt", category: "Clothing", price: 800, quantity: 3, discountPercent: 5 },
  { name: "Jeans", category: "Clothing", price: 1500, quantity: 1, discountPercent: 10 },
  { name: "Laptop", category: "Electronics", price: 70000, quantity: 2, discountPercent: 0 }
], "clothing")` ➔

  `[
  { name: "T-Shirt", category: "Clothing", price: 800, quantity: 3, discountPercent: 5 }
]`

---

## 🧩 PROBLEM–03: 📊 Cart Summary Engine

⚠️ **Function Name:** `generateCartSummary()`

| Input      | `cartItems` (array of objects) |
| :--------- | :----------------------------- |
| **Output** | object                         |

**Rules:**

Each cart item object:

- `name` (string)
- `category` (string)
- `price` (number, > 0)
- `quantity` (number, integer, ≥ 1)
- `discountPercent` (number, 0–100)

**Requirements:**

- `totalItems` → total count of unique products (length of array)
- `totalQuantity` → sum of all `quantity` values
- `subtotal` → sum of `price × quantity` for all items (before discount)
- `totalDiscount` → sum of `price × quantity × discountPercent / 100` for all items
- `grandTotal` → `subtotal − totalDiscount`
- `mostExpensiveItem` → item with highest `price` (single item price, not total)
- `categoryWiseTotal` → object: each key = category, value = sum of `price × quantity` for that category (before discount)

All monetary values rounded to 2 decimal places.

| Challenge 📢 | Return full summary object. If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------- |

**Sample Input & Output:**

- `generateCartSummary([
  { name: "Bag", category: "Accessories", price: 1200, quantity: 2, discountPercent: 10 },
  { name: "Watch", category: "Accessories", price: 5000, quantity: 1, discountPercent: 5 },
  { name: "Phone", category: "Electronics", price: 30000, quantity: 1, discountPercent: 0 }
])` ➔

  `{
  totalItems: 3,
  totalQuantity: 4,
  subtotal: 37400,
  totalDiscount: 490,
  grandTotal: 36910,
  mostExpensiveItem: { name: "Phone", category: "Electronics", price: 30000, quantity: 1, discountPercent: 0 },
  categoryWiseTotal: { Accessories: 7400, Electronics: 30000 }
}`

---

## 🧩 PROBLEM–04: ✅ Cart Validity Checker

⚠️ **Function Name:** `validateCart()`

| Input      | `cartItems` (array of objects) |
| :--------- | :----------------------------- |
| **Output** | object                         |

**Rules:**

Each cart item object:

- `name` (string)
- `price` (number, > 0)
- `quantity` (number, integer, ≥ 1)
- `stock` (number, ≥ 0)
- `discountPercent` (number, 0–100)

**Validation Rules:**

- `isCartValid` → `every()` — true if ALL items have `quantity ≤ stock`
- `hasOutOfStockItem` → `some()` — true if ANY item has `stock === 0`
- `hasOverOrderedItem` → `some()` — true if ANY item has `quantity > stock AND stock > 0`
- `problematicItems` → array of `name` values where `quantity > stock`

| Challenge 📢 | Return `{ isCartValid, hasOutOfStockItem, hasOverOrderedItem, problematicItems }`. If invalid input → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `validateCart([
  { name: "Cap", price: 300, quantity: 5, stock: 3, discountPercent: 0 },
  { name: "Belt", price: 700, quantity: 2, stock: 0, discountPercent: 5 },
  { name: "Sock", price: 150, quantity: 3, stock: 10, discountPercent: 0 }
])` ➔

  `{
  isCartValid: false,
  hasOutOfStockItem: true,
  hasOverOrderedItem: true,
  problematicItems: ["Cap", "Belt"]
}`

---

## 🧩 PROBLEM–05: 🏆 Cart Item Ranking Engine

⚠️ **Function Name:** `rankCartItems()`

| Input      | `cartItems` (array of objects) |
| :--------- | :----------------------------- |
| **Output** | array of objects               |

**Rules:**

Each cart item object:

- `name` (string)
- `category` (string)
- `price` (number, > 0)
- `quantity` (number, integer, ≥ 1)
- `discountPercent` (number, 0–100)

**Ranking Rules:**

- `itemTotal = price × quantity`
- Rank by `itemTotal` descending
- If tie → higher `price` wins
- If still tie → same rank (shared rank)

**Spending Tier:**

| itemTotal       | Tier      |
| :-------------- | :-------- |
| > 50,000        | "PREMIUM" |
| 10,001 – 50,000 | "HIGH"    |
| 3,001 – 10,000  | "MEDIUM"  |
| ≤ 3,000         | "LOW"     |

| Challenge 📢 | Return array with `name`, `category`, `itemTotal`, `rank`, `spendingTier`. If invalid input → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `rankCartItems([
  { name: "TV", category: "Electronics", price: 40000, quantity: 2, discountPercent: 0 },
  { name: "Chair", category: "Furniture", price: 8000, quantity: 1, discountPercent: 5 },
  { name: "Pen", category: "Stationery", price: 50, quantity: 4, discountPercent: 0 }
])` ➔

  `[
  { name: "TV", category: "Electronics", itemTotal: 80000, rank: 1, spendingTier: "PREMIUM" },
  { name: "Chair", category: "Furniture", itemTotal: 8000, rank: 2, spendingTier: "MEDIUM" },
  { name: "Pen", category: "Stationery", itemTotal: 200, rank: 3, spendingTier: "LOW" }
]`

---
