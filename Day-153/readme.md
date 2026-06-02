# 🎓 JS DAILY PRACTICE – DAY-153

📅 **Goal:** Product Inventory Analyzer (Advanced Array Processing Engine)
🎯 **Focus:** map() • filter() • reduce() • find() • some() / every() • sort()

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 🏷️ Product Price Transformer

⚠️ **Function Name:** `applyDiscountToProducts()`

| Input      | `products` (array of objects), `discountPercent` (number) |
| :--------- | :-------------------------------------------------------- |
| **Output** | array of objects                                          |

**Rules:**

Each product object:

- `name` (string)
- `category` (string)
- `price` (number, > 0)
- `stock` (number, ≥ 0)

**Discount Rules:**

- `discountPercent` must be between 0 and 100 (inclusive)
- `discountedPrice = price - (price × discountPercent / 100)`
- If `stock === 0` → do NOT apply discount, set `discountedPrice = price`, add flag `outOfStock: true`
- If `stock > 0` → `outOfStock: false`

| Challenge 📢 | Return array with `name`, `category`, `originalPrice`, `discountedPrice` (rounded to 2 decimal places), `outOfStock`. If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `applyDiscountToProducts([
  { name: "Laptop", category: "Electronics", price: 80000, stock: 5 },
  { name: "Pen", category: "Stationery", price: 20, stock: 0 }
], 10)` ➔
  `[
  { name: "Laptop", category: "Electronics", originalPrice: 80000, discountedPrice: 72000, outOfStock: false },
  { name: "Pen", category: "Stationery", originalPrice: 20, discountedPrice: 20, outOfStock: true }
]`

---

## 🧩 PROBLEM–02: 🔍 Smart Inventory Filter

⚠️ **Function Name:** `filterLowStockProducts()`

| Input      | `products` (array of objects), `threshold` (number) |
| :--------- | :-------------------------------------------------- |
| **Output** | object                                              |

**Rules:**

Each product object:

- `name` (string)
- `category` (string)
- `price` (number, > 0)
- `stock` (number, ≥ 0)

**Filter Rules:**

- `threshold` must be a number ≥ 0
- `lowStock` → products where `stock > 0 AND stock <= threshold`
- `outOfStock` → products where `stock === 0`
- `adequate` → products where `stock > threshold`
- Each list sorted by `stock` ascending

| Challenge 📢 | Return `{ lowStock: [], outOfStock: [], adequate: [] }` — each containing full product objects. If invalid input → `"Invalid Input"` |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `filterLowStockProducts([
  { name: "A", category: "X", price: 100, stock: 0 },
  { name: "B", category: "Y", price: 200, stock: 3 },
  { name: "C", category: "Z", price: 300, stock: 15 }
], 5)` ➔
  `{
  lowStock: [{ name: "B", category: "Y", price: 200, stock: 3 }],
  outOfStock: [{ name: "A", category: "X", price: 100, stock: 0 }],
  adequate: [{ name: "C", category: "Z", price: 300, stock: 15 }]
}`

---

## 🧩 PROBLEM–03: 📊 Inventory Value Report

⚠️ **Function Name:** `generateInventoryReport()`

| Input      | `products` (array of objects) |
| :--------- | :---------------------------- |
| **Output** | object                        |

**Rules:**

Each product object:

- `name` (string)
- `category` (string)
- `price` (number, > 0)
- `stock` (number, ≥ 0)

**Requirements:**

- `totalProducts` → count of all products
- `totalInventoryValue` → sum of `price × stock` for all products
- `averagePrice` → mean of all product prices (rounded to 2 decimal places)
- `mostValuableProduct` → product with highest `price × stock`
- `categoryWiseValue` → object where each key is a category and value is total `price × stock` for that category

| Challenge 📢 | Return full report object. If invalid input → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------- |

**Sample Input & Output:**

- `generateInventoryReport([
  { name: "A", category: "Electronics", price: 10000, stock: 3 },
  { name: "B", category: "Electronics", price: 5000, stock: 2 },
  { name: "C", category: "Furniture", price: 8000, stock: 1 }
])` ➔
  `{
  totalProducts: 3,
  totalInventoryValue: 48000,
  averagePrice: 7666.67,
  mostValuableProduct: { name: "A", category: "Electronics", price: 10000, stock: 3 },
  categoryWiseValue: { Electronics: 40000, Furniture: 8000 }
}`

---

## 🧩 PROBLEM–04: ✅ Inventory Validation Engine

⚠️ **Function Name:** `validateInventoryStatus()`

| Input      | `products` (array of objects) |
| :--------- | :---------------------------- |
| **Output** | object                        |

**Rules:**

Each product object:

- `name` (string)
- `price` (number, > 0)
- `stock` (number, ≥ 0)
- `minStockRequired` (number, ≥ 0)

**Validation Rules:**

- `isFullyStocked` → `every()` — true if ALL products have `stock >= minStockRequired`
- `hasOutOfStock` → `some()` — true if ANY product has `stock === 0`
- `hasCriticalStock` → `some()` — true if ANY product has `stock > 0 AND stock < minStockRequired`
- `criticalProducts` → array of names of products where `stock > 0 AND stock < minStockRequired`

| Challenge 📢 | Return `{ isFullyStocked, hasOutOfStock, hasCriticalStock, criticalProducts }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `validateInventoryStatus([
  { name: "X", price: 500, stock: 2, minStockRequired: 5 },
  { name: "Y", price: 300, stock: 0, minStockRequired: 3 },
  { name: "Z", price: 200, stock: 10, minStockRequired: 5 }
])` ➔
  `{
  isFullyStocked: false,
  hasOutOfStock: true,
  hasCriticalStock: true,
  criticalProducts: ["X"]
}`

---

## 🧩 PROBLEM–05: 🏆 Product Ranking Engine

⚠️ **Function Name:** `rankProductsByValue()`

| Input      | `products` (array of objects) |
| :--------- | :---------------------------- |
| **Output** | array of objects              |

**Rules:**

Each product object:

- `name` (string)
- `category` (string)
- `price` (number, > 0)
- `stock` (number, ≥ 0)

**Ranking Rules:**

- `inventoryValue = price × stock`
- Rank by `inventoryValue` descending
- If tie → higher `price` wins
- If still tie → same rank (shared rank)

**Value Tier assignment:**

| Inventory Value  | Tier      |
| :--------------- | :-------- |
| > 100,000        | "PREMIUM" |
| 50,001 – 100,000 | "HIGH"    |
| 10,001 – 50,000  | "MEDIUM"  |
| ≤ 10,000         | "LOW"     |

| Challenge 📢 | Return array with `name`, `category`, `inventoryValue`, `rank`, `valueTier`. If invalid input → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `rankProductsByValue([
  { name: "A", category: "Electronics", price: 15000, stock: 10 },
  { name: "B", category: "Furniture", price: 8000, stock: 5 },
  { name: "C", category: "Electronics", price: 5000, stock: 3 }
])` ➔
  `[
  { name: "A", category: "Electronics", inventoryValue: 150000, rank: 1, valueTier: "PREMIUM" },
  { name: "B", category: "Furniture", inventoryValue: 40000, rank: 2, valueTier: "MEDIUM" },
  { name: "C", category: "Electronics", inventoryValue: 15000, rank: 3, valueTier: "MEDIUM" }
]`

---
