# 🎓 JS DAILY PRACTICE – DAY-159

📅 **Goal:** Product Catalog System (Object-Based Data Modeling)
🎯 **Focus:** Object Nesting • Destructuring • Spread Operator • Immutability • Deep vs Shallow Copy

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 🏷️ Product Entry Builder

⚠️ **Function Name:** `buildProductEntry()`

| Input      | `basicDetails` (object), `pricingInfo` (object), `stockInfo` (object) |
| :--------- | :-------------------------------------------------------------------- |
| **Output** | object                                                                |

**Rules:**

`basicDetails` object:

- `productId` (string, non-empty)
- `productName` (string, non-empty)
- `category` (string, non-empty)
- `brand` (string, non-empty)

`pricingInfo` object:

- `originalPrice` (number, > 0)
- `discountPercent` (number, 0–100)

`stockInfo` object:

- `stock` (number, integer, ≥ 0)
- `warehouse` (string, non-empty)

**Build Rules:**

- Use **spread operator** to merge all three into one product entry
- Add computed field: `sellingPrice = originalPrice - (originalPrice × discountPercent / 100)` (rounded to 2 decimal places)
- Add computed field: `isAvailable = stock > 0`
- Add field: `listedAt = "2025-01-01"` (fixed string)

| Challenge 📢 | Return single merged product object with all fields from the three inputs plus `sellingPrice`, `isAvailable`, `listedAt`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `buildProductEntry(
  { productId: "P001", productName: "Wireless Mouse", category: "Electronics", brand: "Logitech" },
  { originalPrice: 1200, discountPercent: 10 },
  { stock: 50, warehouse: "Dhaka-Central" }
)` ➔

  **Manual Verify:**
  - Spread all three objects together
  - sellingPrice = 1200 − (1200×10/100) = 1200 − 120 = 1080.00
  - isAvailable = 50 > 0 = true
  - listedAt = "2025-01-01"

  `{
  productId: "P001",
  productName: "Wireless Mouse",
  category: "Electronics",
  brand: "Logitech",
  originalPrice: 1200,
  discountPercent: 10,
  stock: 50,
  warehouse: "Dhaka-Central",
  sellingPrice: 1080.00,
  isAvailable: true,
  listedAt: "2025-01-01"
}`

---

## 🧩 PROBLEM–02: ✏️ Product Entry Updater

⚠️ **Function Name:** `updateProductEntry()`

| Input      | `existingProduct` (object), `updates` (object) |
| :--------- | :--------------------------------------------- |
| **Output** | object                                         |

**Rules:**

`existingProduct` must have at minimum:

- `productId` (string, non-empty)
- `productName` (string, non-empty)
- `originalPrice` (number, > 0)
- `stock` (number, integer, ≥ 0)

`updates` object:

- May contain any subset of: `productName`, `originalPrice`, `discountPercent`, `stock`, `warehouse`
- Must be a non-empty object (at least 1 key)

**Update Rules:**

- Use **spread operator** to merge: original product + updates
- Do NOT mutate the original `existingProduct` object
- If `updates` contains `originalPrice`, validate it is still > 0
- If `updates` contains `discountPercent`, validate it is still 0–100
- If `updates` contains `stock`, validate it is still ≥ 0
- Recompute `isAvailable` based on final `stock` value
- Add field: `lastUpdated = "2025-01-01"` (fixed string)

| Challenge 📢 | Return new updated product object (original stays unchanged). If any updated field is invalid → `"Invalid Input"`. If input is invalid → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `updateProductEntry(
  { productId: "P002", productName: "USB Hub", originalPrice: 800, stock: 20 },
  { originalPrice: 900, stock: 0 }
)` ➔

  **Manual Verify:**
  - Spread: original + updates
  - originalPrice=900 > 0 ✓, stock=0 ≥ 0 ✓
  - isAvailable = 0 > 0 = false
  - lastUpdated = "2025-01-01"
  - Original productId, productName unchanged

  `{
  productId: "P002",
  productName: "USB Hub",
  originalPrice: 900,
  stock: 0,
  isAvailable: false,
  lastUpdated: "2025-01-01"
}`

---

## 🧩 PROBLEM–03: 🔍 Product Details Extractor

⚠️ **Function Name:** `extractProductSections()`

| Input      | `productEntry` (object) |
| :--------- | :---------------------- |
| **Output** | object                  |

**Rules:**

`productEntry` must contain:

- `productId` (string)
- `productName` (string)
- `category` (string)
- `brand` (string)
- `originalPrice` (number)
- `sellingPrice` (number)
- `discountPercent` (number)
- `stock` (number)
- `warehouse` (string)
- `isAvailable` (boolean)

**Extraction Rules:**

- Use **destructuring** to split the flat product into 3 nested sections:
  - `identity` → `{ productId, productName, category, brand }`
  - `pricing` → `{ originalPrice, sellingPrice, discountPercent }`
  - `inventory` → `{ stock, warehouse, isAvailable }`
- Add field `catalogSummary`:
  - `totalFields = 10` (fixed)
  - `hasSavings = discountPercent > 0`

| Challenge 📢 | Return `{ identity, pricing, inventory, catalogSummary }`. If any required field is missing → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `extractProductSections({
  productId: "P003",
  productName: "Mechanical Keyboard",
  category: "Electronics",
  brand: "Keychron",
  originalPrice: 5000,
  sellingPrice: 4250,
  discountPercent: 15,
  stock: 10,
  warehouse: "Chittagong-Port",
  isAvailable: true
})` ➔

  **Manual Verify:**
  - Destructure into 3 sections
  - hasSavings = 15 > 0 = true
  - totalFields = 10

  `{
  identity: { productId: "P003", productName: "Mechanical Keyboard", category: "Electronics", brand: "Keychron" },
  pricing: { originalPrice: 5000, sellingPrice: 4250, discountPercent: 15 },
  inventory: { stock: 10, warehouse: "Chittagong-Port", isAvailable: true },
  catalogSummary: { totalFields: 10, hasSavings: true }
}`

---

## 🧩 PROBLEM–04: 📋 Product Deep Cloner

⚠️ **Function Name:** `deepCloneProduct()`

| Input      | `productEntry` (object) |
| :--------- | :---------------------- |
| **Output** | object                  |

**Rules:**

`productEntry` must contain:

- `productId` (string)
- `productName` (string)
- `pricing` (object with: `originalPrice` (number), `sellingPrice` (number))
- `tags` (array of strings)

**Clone Rules:**

- Create a **deep copy** using `JSON.parse(JSON.stringify())`
- After cloning, add field to clone: `cloneTag = "CLONED"`
- Modify clone's `pricing.sellingPrice = 0` — original's `pricing.sellingPrice` must stay unchanged
- Push `"cloned-item"` into clone's `tags` array — original's `tags` must stay unchanged
- Return **both** original and clone to prove deep copy worked

| Challenge 📢 | Return `{ original, clone }` where clone has modified `pricing.sellingPrice`, updated `tags`, and `cloneTag: "CLONED"` — original must be fully unchanged. If invalid input → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `deepCloneProduct({
  productId: "P004",
  productName: "Webcam HD",
  pricing: { originalPrice: 3000, sellingPrice: 2700 },
  tags: ["camera", "HD", "USB"]
})` ➔

  **Manual Verify:**
  - Deep clone via JSON.parse(JSON.stringify(...))
  - clone.pricing.sellingPrice = 0 → original.pricing.sellingPrice stays 2700
  - clone.tags.push("cloned-item") → original.tags stays ["camera", "HD", "USB"]
  - clone.cloneTag = "CLONED"

  `{
  original: {
    productId: "P004",
    productName: "Webcam HD",
    pricing: { originalPrice: 3000, sellingPrice: 2700 },
    tags: ["camera", "HD", "USB"]
  },
  clone: {
    productId: "P004",
    productName: "Webcam HD",
    pricing: { originalPrice: 3000, sellingPrice: 0 },
    tags: ["camera", "HD", "USB", "cloned-item"],
    cloneTag: "CLONED"
  }
}`

---

## 🧩 PROBLEM–05: 🏆 Product Quality Scorer

⚠️ **Function Name:** `scoreProductQuality()`

| Input      | `productEntry` (object) |
| :--------- | :---------------------- |
| **Output** | object                  |

**Rules:**

`productEntry` may or may not contain these fields:

- `productName` (string)
- `brand` (string)
- `category` (string)
- `originalPrice` (number)
- `sellingPrice` (number)
- `stock` (number)
- `warehouse` (string)
- `tags` (array, non-empty)
- `description` (string)
- `imageUrl` (string)

**Scoring Rules:**

Each field present and non-empty → worth these points:

| Field           | Points |
| :-------------- | :----- |
| `productName`   | 20     |
| `brand`         | 15     |
| `category`      | 15     |
| `originalPrice` | 10     |
| `sellingPrice`  | 10     |
| `stock`         | 10     |
| `warehouse`     | 5      |
| `tags`          | 5      |
| `description`   | 5      |
| `imageUrl`      | 5      |

- `totalScore` = sum of points for present + non-empty fields
- `maxScore` = 100

**Quality Level:**

| totalScore | level           |
| :--------- | :-------------- |
| 100        | "FULLY LISTED"  |
| 70 – 99    | "WELL LISTED"   |
| 40 – 69    | "BASIC LISTING" |
| < 40       | "POOR LISTING"  |

- `missingFields` → array of field names that are absent or empty

| Challenge 📢 | Return `{ totalScore, maxScore: 100, level, missingFields }`. If `productEntry` is not an object or is null → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `scoreProductQuality({
  productName: "Gaming Headset",
  brand: "HyperX",
  category: "Electronics",
  originalPrice: 4500,
  sellingPrice: 4000,
  stock: 30,
  warehouse: "Dhaka-North",
  tags: ["gaming", "audio"],
  description: "",
  imageUrl: ""
})` ➔

  **Manual Verify:**
  - productName ✓ → 20
  - brand ✓ → 15
  - category ✓ → 15
  - originalPrice ✓ → 10
  - sellingPrice ✓ → 10
  - stock ✓ → 10
  - warehouse ✓ → 5
  - tags ✓ (non-empty array) → 5
  - description = "" → 0, missing
  - imageUrl = "" → 0, missing
  - totalScore = 20+15+15+10+10+10+5+5 = 90
  - level = "WELL LISTED"
  - missingFields = ["description", "imageUrl"]

  `{
  totalScore: 90,
  maxScore: 100,
  level: "WELL LISTED",
  missingFields: ["description", "imageUrl"]
}`

---
