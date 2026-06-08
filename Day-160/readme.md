# 🎓 JS DAILY PRACTICE – DAY-160

📅 **Goal:** CRM – Customer Relationship System (Object-Based Data Modeling)
🎯 **Focus:** Object Nesting • Destructuring • Spread Operator • Immutability • Deep vs Shallow Copy

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 👤 Customer Record Builder

⚠️ **Function Name:** `buildCustomerRecord()`

| Input      | `personalInfo` (object), `businessInfo` (object), `accountInfo` (object) |
| :--------- | :----------------------------------------------------------------------- |
| **Output** | object                                                                   |

**Rules:**

`personalInfo` object:

- `firstName` (string, non-empty)
- `lastName` (string, non-empty)
- `email` (string, must contain "@")

`businessInfo` object:

- `companyName` (string, non-empty)
- `industry` (string, non-empty)
- `annualRevenue` (number, ≥ 0)

`accountInfo` object:

- `accountType` (string: "BASIC", "PREMIUM", or "ENTERPRISE")
- `creditLimit` (number, ≥ 0)

**Build Rules:**

- Use **spread operator** to merge all three into one customer record
- Add computed field: `fullName = firstName + " " + lastName`
- Add computed field: `customerTier` based on `annualRevenue`:
  - ≥ 10,000,000 → "PLATINUM"
  - 1,000,000 – 9,999,999 → "GOLD"
  - 100,000 – 999,999 → "SILVER"
  - < 100,000 → "STANDARD"
- Add field: `registeredAt = "2025-01-01"` (fixed string)

| Challenge 📢 | Return single merged customer object with all fields from the three inputs plus `fullName`, `customerTier`, `registeredAt`. If invalid input → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `buildCustomerRecord(
  { firstName: "Tanvir", lastName: "Ahmed", email: "tanvir@biz.com" },
  { companyName: "TechCorp BD", industry: "Software", annualRevenue: 5000000 },
  { accountType: "PREMIUM", creditLimit: 500000 }
)` ➔

  `{
  firstName: "Tanvir",
  lastName: "Ahmed",
  email: "tanvir@biz.com",
  companyName: "TechCorp BD",
  industry: "Software",
  annualRevenue: 5000000,
  accountType: "PREMIUM",
  creditLimit: 500000,
  fullName: "Tanvir Ahmed",
  customerTier: "GOLD",
  registeredAt: "2025-01-01"
}`

---

## 🧩 PROBLEM–02: ✏️ Customer Record Updater

⚠️ **Function Name:** `updateCustomerRecord()`

| Input      | `existingCustomer` (object), `updates` (object) |
| :--------- | :---------------------------------------------- |
| **Output** | object                                          |

**Rules:**

`existingCustomer` must have at minimum:

- `customerId` (string, non-empty)
- `fullName` (string, non-empty)
- `email` (string, must contain "@")
- `annualRevenue` (number, ≥ 0)
- `creditLimit` (number, ≥ 0)

`updates` object:

- May contain any subset of: `email`, `annualRevenue`, `creditLimit`, `accountType`, `industry`
- Must be a non-empty object (at least 1 key)

**Update Rules:**

- Use **spread operator** to merge: original customer + updates
- Do NOT mutate the original `existingCustomer` object
- If `updates` contains `email`, validate it still contains "@"
- If `updates` contains `annualRevenue`, validate it is still ≥ 0
- If `updates` contains `creditLimit`, validate it is still ≥ 0
- Recompute `customerTier` based on final `annualRevenue`:
  - ≥ 10,000,000 → "PLATINUM"
  - 1,000,000 – 9,999,999 → "GOLD"
  - 100,000 – 999,999 → "SILVER"
  - < 100,000 → "STANDARD"
- Add field: `lastUpdated = "2025-01-01"` (fixed string)

| Challenge 📢 | Return new updated customer object (original stays unchanged). If any updated field is invalid → `"Invalid Input"`. If input is invalid → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `updateCustomerRecord(
  { customerId: "C001", fullName: "Rina Begum", email: "rina@biz.com", annualRevenue: 80000, creditLimit: 100000 },
  { annualRevenue: 1500000, creditLimit: 300000 }
)` ➔

  `{
  customerId: "C001",
  fullName: "Rina Begum",
  email: "rina@biz.com",
  annualRevenue: 1500000,
  creditLimit: 300000,
  customerTier: "GOLD",
  lastUpdated: "2025-01-01"
}`

---

## 🧩 PROBLEM–03: 🔍 Customer Record Extractor

⚠️ **Function Name:** `extractCustomerSections()`

| Input      | `customerRecord` (object) |
| :--------- | :------------------------ |
| **Output** | object                    |

**Rules:**

`customerRecord` must contain:

- `customerId` (string)
- `fullName` (string)
- `email` (string)
- `companyName` (string)
- `industry` (string)
- `annualRevenue` (number)
- `accountType` (string)
- `creditLimit` (number)
- `customerTier` (string)
- `registeredAt` (string)

**Extraction Rules:**

- Use **destructuring** to split the flat record into 3 nested sections:
  - `personal` → `{ customerId, fullName, email }`
  - `business` → `{ companyName, industry, annualRevenue }`
  - `account` → `{ accountType, creditLimit, customerTier }`
- Add field `crmSummary`:
  - `joinedOn = registeredAt`
  - `isHighValue = annualRevenue >= 1000000`

| Challenge 📢 | Return `{ personal, business, account, crmSummary }`. If any required field is missing → `"Invalid Input"` |
| :----------- | :--------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `extractCustomerSections({
  customerId: "C002",
  fullName: "Arif Hossain",
  email: "arif@corp.com",
  companyName: "BuildIt Ltd",
  industry: "Construction",
  annualRevenue: 2500000,
  accountType: "ENTERPRISE",
  creditLimit: 1000000,
  customerTier: "GOLD",
  registeredAt: "2025-01-01"
})` ➔

  `{
  personal: { customerId: "C002", fullName: "Arif Hossain", email: "arif@corp.com" },
  business: { companyName: "BuildIt Ltd", industry: "Construction", annualRevenue: 2500000 },
  account: { accountType: "ENTERPRISE", creditLimit: 1000000, customerTier: "GOLD" },
  crmSummary: { joinedOn: "2025-01-01", isHighValue: true }
}`

---

## 🧩 PROBLEM–04: 📋 Customer Deep Cloner

⚠️ **Function Name:** `deepCloneCustomer()`

| Input      | `customerRecord` (object) |
| :--------- | :------------------------ |
| **Output** | object                    |

**Rules:**

`customerRecord` must contain:

- `customerId` (string)
- `fullName` (string)
- `address` (object with: `city` (string), `country` (string))
- `purchaseHistory` (array of strings)

**Clone Rules:**

- Create a **deep copy** using `JSON.parse(JSON.stringify())`
- After cloning, add field to clone: `cloneTag = "CLONED"`
- Modify clone's `address.city = "Unknown"` — original's `address.city` must stay unchanged
- Push `"cloned-entry"` into clone's `purchaseHistory` — original's `purchaseHistory` must stay unchanged
- Return **both** original and clone to prove deep copy worked

| Challenge 📢 | Return `{ original, clone }` where clone has modified `address.city`, updated `purchaseHistory`, and `cloneTag: "CLONED"` — original must be fully unchanged. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `deepCloneCustomer({
  customerId: "C003",
  fullName: "Nadia Islam",
  address: { city: "Sylhet", country: "Bangladesh" },
  purchaseHistory: ["INV-001", "INV-002"]
})` ➔

  `{
  original: {
    customerId: "C003",
    fullName: "Nadia Islam",
    address: { city: "Sylhet", country: "Bangladesh" },
    purchaseHistory: ["INV-001", "INV-002"]
  },
  clone: {
    customerId: "C003",
    fullName: "Nadia Islam",
    address: { city: "Unknown", country: "Bangladesh" },
    purchaseHistory: ["INV-001", "INV-002", "cloned-entry"],
    cloneTag: "CLONED"
  }
}`

---

## 🧩 PROBLEM–05: 🏆 Customer Engagement Scorer

⚠️ **Function Name:** `scoreCustomerEngagement()`

| Input      | `customerRecord` (object) |
| :--------- | :------------------------ |
| **Output** | object                    |

**Rules:**

`customerRecord` may or may not contain these fields:

- `fullName` (string)
- `email` (string)
- `phone` (string)
- `companyName` (string)
- `industry` (string)
- `annualRevenue` (number, counts if > 0)
- `accountType` (string)
- `creditLimit` (number, counts if > 0)
- `address` (object, counts if non-null)
- `purchaseHistory` (array, counts if non-empty)

**Scoring Rules:**

| Field             | Points |
| :---------------- | :----- |
| `fullName`        | 15     |
| `email`           | 15     |
| `phone`           | 10     |
| `companyName`     | 10     |
| `industry`        | 10     |
| `annualRevenue`   | 10     |
| `accountType`     | 10     |
| `creditLimit`     | 5      |
| `address`         | 10     |
| `purchaseHistory` | 5      |

- `totalScore` = sum of points for present + valid fields
- `maxScore` = 100

**Engagement Level:**

| totalScore | level                |
| :--------- | :------------------- |
| 100        | "FULLY ENGAGED"      |
| 70 – 99    | "HIGHLY ENGAGED"     |
| 40 – 69    | "MODERATELY ENGAGED" |
| < 40       | "LOW ENGAGEMENT"     |

- `missingFields` → array of field names that are absent or invalid

| Challenge 📢 | Return `{ totalScore, maxScore: 100, level, missingFields }`. If `customerRecord` is not an object or is null → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `scoreCustomerEngagement({
  fullName: "Kamrul Hassan",
  email: "kamrul@corp.com",
  phone: "01611223344",
  companyName: "GreenTech",
  industry: "Agriculture",
  annualRevenue: 750000,
  accountType: "PREMIUM",
  creditLimit: 0,
  address: { city: "Rajshahi", country: "Bangladesh" },
  purchaseHistory: []
})` ➔

  `{
  totalScore: 90,
  maxScore: 100,
  level: "HIGHLY ENGAGED",
  missingFields: ["creditLimit", "purchaseHistory"]
}`

---
