# 🎓 JS DAILY PRACTICE – DAY-197

📅 **Goal:** Pricing Rule Engine (Rule Engine & Decision System Design)
🎯 **Focus:** Multi-Condition Decision Trees • Scoring Systems • Priority-Based Logic • Rule-Based Output Generation

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 🏷️ Dynamic Discount Eligibility Gate

⚠️ **Function Name:** `checkDiscountEligibility()`

| Input      | `customer` (object), `cart` (object) |
| :--------- | :----------------------------------- |
| **Output** | object                               |

**Rules:**

`customer` object:

- `membershipTier` (string: "NONE", "SILVER", "GOLD", "PLATINUM")
- `accountAgeMonths` (number, ≥ 0)

`cart` object:

- `subtotal` (number, > 0)
- `itemCount` (number, integer, ≥ 1)

**Decision Tree Rules (check in this exact order, stop at first failure):**

1. `subtotal >= 500` → else reject: `"Minimum purchase amount not met"`
2. `accountAgeMonths >= 1` → else reject: `"Account too new for discounts"`
3. `membershipTier !== "NONE"` → else reject: `"No active membership"`

**Output Rules:**

- `eligible` → true only if all checks pass
- `rejectionReason` → failure message, or `null`

| Challenge 📢 | Return `{ eligible, rejectionReason }`. If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------- |

**Sample Input & Output:**

- `checkDiscountEligibility(
  { membershipTier: "GOLD", accountAgeMonths: 6 },
  { subtotal: 300, itemCount: 2 }
)` ➔

  `{
  eligible: false,
  rejectionReason: "Minimum purchase amount not met"
}`

---

## 🧩 PROBLEM–02: 💲 Tiered Discount Calculator

⚠️ **Function Name:** `calculateTieredDiscount()`

| Input      | `membershipTier` (string), `subtotal` (number), `isHolidaySale` (boolean) |
| :--------- | :------------------------------------------------------------------------ |
| **Output** | object                                                                    |

**Rules:**

`membershipTier` must be one of: `"SILVER"`, `"GOLD"`, `"PLATINUM"`
`subtotal` must be a number, > 0
`isHolidaySale` (boolean)

**Discount Rules:**

- Base discount by tier:
  - "SILVER" → 5%
  - "GOLD" → 10%
  - "PLATINUM" → 15%
- Volume bonus (additive, based on subtotal):
  - `subtotal >= 5000` → +5%
  - `subtotal >= 2000 AND < 5000` → +3%
  - `subtotal < 2000` → +0%
- Holiday bonus: if `isHolidaySale === true` → +5% (additive)
- `totalDiscountPercent` = base + volume bonus + holiday bonus, **capped at 30%** maximum
- `discountAmount = subtotal × totalDiscountPercent / 100` (rounded to 2 decimal places)
- `finalPrice = subtotal - discountAmount` (rounded to 2 decimal places)

| Challenge 📢 | Return `{ totalDiscountPercent, discountAmount, finalPrice }`. If invalid input → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `calculateTieredDiscount("PLATINUM", 6000, true)` ➔

  `{
  totalDiscountPercent: 25,
  discountAmount: 1500.00,
  finalPrice: 4500.00
}`

---

## 🧩 PROBLEM–03: 📦 Bulk Pricing Tier Calculator

⚠️ **Function Name:** `calculateBulkPricing()`

| Input      | `unitPrice` (number), `quantity` (number) |
| :--------- | :---------------------------------------- |
| **Output** | object                                    |

**Rules:**

`unitPrice` must be a number, > 0
`quantity` must be a number, integer, ≥ 1

**Bulk Pricing Tiers (per-unit discount based on quantity):**

| Quantity Range | Per-Unit Discount |
| :------------- | :---------------- |
| ≥ 100          | 20%               |
| 50 – 99        | 15%               |
| 20 – 49        | 10%               |
| 10 – 19        | 5%                |
| < 10           | 0%                |

- `discountedUnitPrice = unitPrice × (1 - discountPercent/100)` (rounded to 2 decimal places)
- `totalCost = discountedUnitPrice × quantity` (rounded to 2 decimal places)
- `totalSavings = (unitPrice × quantity) - totalCost` (rounded to 2 decimal places)

| Challenge 📢 | Return `{ discountedUnitPrice, totalCost, totalSavings }`. If invalid input → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `calculateBulkPricing(100, 60)` ➔

  `{
  discountedUnitPrice: 85.00,
  totalCost: 5100.00,
  totalSavings: 900.00
}`

---

## 🧩 PROBLEM–04: 🎟️ Coupon Stack Resolver

⚠️ **Function Name:** `resolveCouponStack()`

| Input      | `subtotal` (number), `coupons` (array of objects) |
| :--------- | :------------------------------------------------ |
| **Output** | object                                            |

**Rules:**

`subtotal` must be a number, > 0
`coupons` — array of coupon objects (may be empty), each:

- `code` (string)
- `type` (string: "PERCENT" or "FIXED")
- `value` (number, > 0)
- `stackable` (boolean)

**Stacking Rules:**

- If ANY coupon has `stackable: false`, ONLY apply the single coupon among the non-stackable ones that gives the BIGGEST discount (compute each non-stackable coupon's discount value individually, compare, pick best) — ignore all other coupons entirely
- If ALL coupons are `stackable: true` (or `coupons` is empty), apply ALL of them in sequence (in array order): each `PERCENT` coupon applies to the CURRENT running price (not original), each `FIXED` coupon subtracts a flat amount from the current running price
- Price cannot go below 0 — if a fixed discount would exceed remaining price, cap at 0
- `appliedCoupons` → array of `code` values that were actually applied
- `finalPrice` → the resulting price after all applicable discounts (rounded to 2 decimal places)

| Challenge 📢 | Return `{ appliedCoupons, finalPrice }`. If invalid input → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------- |

**Sample Input & Output:**

- `resolveCouponStack(1000, [
  { code: "SAVE10", type: "PERCENT", value: 10, stackable: false },
  { code: "FLAT200", type: "FIXED", value: 200, stackable: false }
])` ➔

  `{
  appliedCoupons: ["FLAT200"],
  finalPrice: 800.00
}`

---

## 🧩 PROBLEM–05: 🏗️ Full Checkout Pricing Pipeline

⚠️ **Function Name:** `runCheckoutPricingPipeline()`

| Input      | `customer` (object), `cart` (object), `isHolidaySale` (boolean) |
| :--------- | :-------------------------------------------------------------- |
| **Output** | object                                                          |

**Rules:**

This problem composes Problems 1 and 2 into one checkout pipeline.

`customer` object: same as Problem 1, plus `membershipTier` also used in Problem 2 (must NOT be "NONE" to reach pricing step)
`cart` object: `{ subtotal (number, >0), itemCount (number, integer, ≥1) }`
`isHolidaySale` (boolean)

**Pipeline Rules:**

1. Run equivalent of `checkDiscountEligibility()` first
   - If NOT eligible → STOP, return rejection
2. If eligible, run equivalent of `calculateTieredDiscount()` using `customer.membershipTier`, `cart.subtotal`, `isHolidaySale`

| Challenge 📢 | If rejected: return `{ discountApplied: false, reason, finalPrice: cart.subtotal }`. If approved: return `{ discountApplied: true, totalDiscountPercent, finalPrice }`. If invalid input → `"Invalid Input"` |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `runCheckoutPricingPipeline(
  { membershipTier: "SILVER", accountAgeMonths: 3 },
  { subtotal: 2500, itemCount: 4 },
  false
)` ➔

  `{
  discountApplied: true,
  totalDiscountPercent: 8,
  finalPrice: 2300.00
}`

---
