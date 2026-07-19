# 🎓 JS DAILY PRACTICE – DAY-200 🎉

📅 **Goal:** Comprehensive Multi-Domain Decision Engine (Rule Engine & Decision System Design)
🎯 **Focus:** Multi-Condition Decision Trees • Scoring Systems • Priority-Based Logic • Rule-Based Output Generation

🏁 **PHASE-4 GRAND FINALE — 10 Problems — Day 151 to Day 200 Complete!**

| #   | Function                             | Domain                                      |
| --- | ------------------------------------ | ------------------------------------------- |
| 01  | `decideScholarshipAward()`           | Education                                   |
| 02  | `decideRentalApplication()`          | Real Estate                                 |
| 03  | `decideClaimSettlement()`            | Insurance                                   |
| 04  | `allocateServiceTiers()`             | Customer Service                            |
| 05  | `runUniversalDecisionOrchestrator()` | Multi-domain (3-way)                        |
| 06  | `decideVisaApplication()`            | Immigration                                 |
| 07  | `decideConstructionPermit()`         | Civil/Government                            |
| 08  | `decideMatchmaking()`                | Gaming                                      |
| 09  | `recommendShippingMethod()`          | Logistics                                   |
| 10  | `processCrossDomainBatch()`          | **Multi-domain (7-way, ultimate capstone)** |

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 🎓 Scholarship Award Decision Engine

⚠️ **Function Name:** `decideScholarshipAward()`

| Input      | `student` (object) |
| :--------- | :----------------- |
| **Output** | object             |

**Rules:**

`student` object:

- `cgpa` (number, 0.00–4.00)
- `familyIncomeAnnual` (number, ≥ 0)
- `extracurricularScore` (number, 0–100)
- `disciplinaryFlags` (number, integer, ≥ 0)

**Decision Tree Rules (check in order, stop at first failure):**

1. `disciplinaryFlags === 0` → else reject: `"Disciplinary flags disqualify candidate"`
2. `cgpa >= 2.5` → else reject: `"CGPA below minimum requirement"`

**Scoring (if passed gate checks):**

- `academicPoints` = `cgpa × 20` (max 80 since cgpa max is 4.00)
- `needPoints` based on `familyIncomeAnnual`:
  - `< 200000` → 20
  - `200000 – 500000` → 10
  - `> 500000` → 0
- `extracurricularPoints` = `extracurricularScore × 0.1` (max 10)
- `totalScore = academicPoints + needPoints + extracurricularPoints` (rounded to 2 decimal places)

**Award Tier:**

| totalScore | tier               | awardPercent |
| :--------- | :----------------- | :----------- |
| ≥ 85       | "FULL_SCHOLARSHIP" | 100          |
| 70 – 84    | "PARTIAL_75"       | 75           |
| 55 – 69    | "PARTIAL_50"       | 50           |
| 40 – 54    | "PARTIAL_25"       | 25           |
| < 40       | "NOT_AWARDED"      | 0            |

| Challenge 📢 | If rejected: return `{ awarded: false, reason }`. If passed: return `{ awarded: true, totalScore, tier, awardPercent }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `decideScholarshipAward({
  cgpa: 3.8,
  familyIncomeAnnual: 150000,
  extracurricularScore: 70,
  disciplinaryFlags: 0
})` ➔

  `{
  awarded: true,
  totalScore: 103.00,
  tier: "FULL_SCHOLARSHIP",
  awardPercent: 100
}`

---

## 🧩 PROBLEM–02: 🏠 Rental Application Decision Engine

⚠️ **Function Name:** `decideRentalApplication()`

| Input      | `applicant` (object), `monthlyRent` (number) |
| :--------- | :------------------------------------------- |
| **Output** | object                                       |

**Rules:**

`applicant` object:

- `monthlyIncome` (number, > 0)
- `creditScore` (number, 300–850)
- `hasEvictionHistory` (boolean)
- `hasPets` (boolean)

`monthlyRent` must be a number, > 0

**Decision Tree Rules (check in order, stop at first failure):**

1. `hasEvictionHistory === false` → else reject: `"Eviction history disqualifies applicant"`
2. `rentToIncomeRatio = monthlyRent / monthlyIncome` must be `<= 0.35` → else reject: `"Income insufficient for this rent amount"`
3. `creditScore >= 580` → else reject: `"Credit score below minimum"`

**Output Rules (if passed):**

- `approved = true`
- `securityDepositMultiplier`:
  - `creditScore >= 720` → 1 (one month's rent)
  - `creditScore >= 650 AND < 720` → 1.5
  - `creditScore >= 580 AND < 650` → 2
- `petDeposit` → `5000` if `hasPets === true`, else `0`
- `totalDepositRequired = (monthlyRent × securityDepositMultiplier) + petDeposit` (rounded to 2 decimal places)

| Challenge 📢 | If rejected: return `{ approved: false, reason }`. If approved: return `{ approved: true, totalDepositRequired }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `decideRentalApplication({
  monthlyIncome: 60000,
  creditScore: 700,
  hasEvictionHistory: false,
  hasPets: true
}, 18000)` ➔

  `{
  approved: true,
  totalDepositRequired: 32000.00
}`

---

## 🧩 PROBLEM–03: 🚗 Auto Insurance Claim Decision Engine

⚠️ **Function Name:** `decideClaimSettlement()`

| Input      | `claim` (object) |
| :--------- | :--------------- |
| **Output** | object           |

**Rules:**

`claim` object:

- `policyActive` (boolean)
- `damageEstimate` (number, > 0)
- `policyLimit` (number, > 0)
- `deductible` (number, ≥ 0)
- `atFaultPercent` (number, 0–100) — percentage of fault attributed to the policyholder
- `previousClaimsThisYear` (number, integer, ≥ 0)

**Decision Tree Rules (check in order, stop at first failure):**

1. `policyActive === true` → else reject: `"Policy is not active"`
2. `previousClaimsThisYear < 3` → else reject: `"Maximum claims per year exceeded"`

**Settlement Calculation (if passed):**

- `faultAdjustedDamage = damageEstimate × ((100 - atFaultPercent) / 100)` (rounded to 2 decimal places) — insurer pays based on the OTHER party's fault share
- `afterDeductible = Math.max(0, faultAdjustedDamage - deductible)` (rounded to 2 decimal places)
- `payoutAmount = Math.min(afterDeductible, policyLimit)` (rounded to 2 decimal places)
- `wasCapped` → true if `afterDeductible > policyLimit`

| Challenge 📢 | If rejected: return `{ settled: false, reason }`. If settled: return `{ settled: true, payoutAmount, wasCapped }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `decideClaimSettlement({
  policyActive: true,
  damageEstimate: 100000,
  policyLimit: 80000,
  deductible: 5000,
  atFaultPercent: 20,
  previousClaimsThisYear: 1
})` ➔

  `{
  settled: true,
  payoutAmount: 75000.00,
  wasCapped: false
}`

---

## 🧩 PROBLEM–04: 🏗️ Multi-Customer Service Tier Allocator

⚠️ **Function Name:** `allocateServiceTiers()`

| Input      | `customers` (array of objects) |
| :--------- | :----------------------------- |
| **Output** | array of objects               |

**Rules:**

`customers` — non-empty array, each entry:

- `customerName` (string)
- `lifetimeValue` (number, ≥ 0)
- `accountAgeYears` (number, ≥ 0)
- `supportTicketsThisYear` (number, integer, ≥ 0)

**Allocation Rules:**

- `loyaltyScore = (lifetimeValue / 1000) + (accountAgeYears × 10) - (supportTicketsThisYear × 2)` (rounded to 2 decimal places) — high-maintenance customers score lower
- Rank customers by `loyaltyScore` descending
- If tie → higher `lifetimeValue` wins
- If still tie → same rank
- `serviceTier` based on rank:
  - rank 1 → `"VIP"`
  - rank 2-3 → `"PREMIUM"`
  - rank 4+ → `"STANDARD"`

| Challenge 📢 | Return array with `{ customerName, loyaltyScore, rank, serviceTier }`. If invalid input → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `allocateServiceTiers([
  { customerName: "Nadia", lifetimeValue: 50000, accountAgeYears: 3, supportTicketsThisYear: 2 },
  { customerName: "Farhan", lifetimeValue: 80000, accountAgeYears: 1, supportTicketsThisYear: 10 }
])` ➔

  `[
  { customerName: "Nadia", loyaltyScore: 76.00, rank: 1, serviceTier: "VIP" },
  { customerName: "Farhan", loyaltyScore: 70.00, rank: 2, serviceTier: "PREMIUM" }
]`

---

## 🧩 PROBLEM–05: 🏆 Phase-4 Capstone: Universal Decision Pipeline Orchestrator

⚠️ **Function Name:** `runUniversalDecisionOrchestrator()`

| Input      | `requests` (array of objects) |
| :--------- | :---------------------------- |
| **Output** | object                        |

**Rules:**

This is the FINAL capstone problem of Phase-4, composing the concept of rule-based decision-making across MULTIPLE domains in one orchestrator — reflecting everything learned across all 7 modules (array processing, object modeling, ES6+, security, system design, analytics, and rule engines).

`requests` — non-empty array, each entry is one of:

- `{ domain: "SCHOLARSHIP", data: {...} }` — `data` shape matches Problem 01's `student` input
- `{ domain: "RENTAL", data: {...}, monthlyRent: number }` — `data` shape matches Problem 02's `applicant` input
- `{ domain: "INSURANCE_CLAIM", data: {...} }` — `data` shape matches Problem 03's `claim` input

**Orchestration Rules:**

- Process each request using the equivalent logic from Problems 01, 02, or 03 based on `domain`
- For each request, produce a result entry: `{ domain, outcome }` where `outcome` is the EXACT return value that the matching function (`decideScholarshipAward`, `decideRentalApplication`, or `decideClaimSettlement`) would have produced
- If `domain` is not one of the 3 valid values → that entry's `outcome` is `"Invalid Input"`, but processing continues for other requests
- Build a final tally:
  - `totalRequests` → count of all requests
  - `approvedCount` → count where the outcome indicates approval (`awarded === true`, `approved === true`, or `settled === true`, depending on domain)
  - `rejectedCount` → count where outcome indicates rejection (or is `"Invalid Input"`)
  - `approvalRate` → `(approvedCount / totalRequests) × 100` (rounded to 2 decimal places)

| Challenge 📢 | Return `{ results, totalRequests, approvedCount, rejectedCount, approvalRate }` where `results` is an array of `{ domain, outcome }`. If `requests` is not a non-empty array → `"Invalid Input"` |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `runUniversalDecisionOrchestrator([
  { domain: "SCHOLARSHIP", data: { cgpa: 3.8, familyIncomeAnnual: 150000, extracurricularScore: 70, disciplinaryFlags: 0 } },
  { domain: "RENTAL", data: { monthlyIncome: 60000, creditScore: 700, hasEvictionHistory: false, hasPets: true }, monthlyRent: 18000 },
  { domain: "INSURANCE_CLAIM", data: { policyActive: false, damageEstimate: 10000, policyLimit: 5000, deductible: 500, atFaultPercent: 0, previousClaimsThisYear: 0 } }
])` ➔

  `{
  results: [
    { domain: "SCHOLARSHIP", outcome: { awarded: true, totalScore: 103.00, tier: "FULL_SCHOLARSHIP", awardPercent: 100 } },
    { domain: "RENTAL", outcome: { approved: true, totalDepositRequired: 32000.00 } },
    { domain: "INSURANCE_CLAIM", outcome: { settled: false, reason: "Policy is not active" } }
  ],
  totalRequests: 3,
  approvedCount: 2,
  rejectedCount: 1,
  approvalRate: 66.67
}`

---

## 🧩 PROBLEM–06: 🛂 Visa Application Decision Engine

⚠️ **Function Name:** `decideVisaApplication()`

| Input      | `applicant` (object) |
| :--------- | :------------------- |
| **Output** | object               |

**Rules:**

`applicant` object:

- `bankBalance` (number, ≥ 0)
- `hasSponsorLetter` (boolean)
- `previousVisaRejections` (number, integer, ≥ 0)
- `travelPurpose` (string: "TOURISM", "BUSINESS", "STUDY")

**Decision Tree Rules (check in order, stop at first failure):**

1. `previousVisaRejections < 2` → else reject: `"Too many previous rejections"`
2. If `travelPurpose === "TOURISM"` → `bankBalance >= 100000 OR hasSponsorLetter === true` → else reject: `"Insufficient funds or sponsorship for tourism"`
3. If `travelPurpose === "BUSINESS"` → `hasSponsorLetter === true` → else reject: `"Business visa requires sponsor letter"`
4. If `travelPurpose === "STUDY"` → `bankBalance >= 300000` → else reject: `"Insufficient funds for study visa"`

**Output Rules:**

- `approved` → true only if all applicable checks pass
- `rejectionReason` → failure message, or `null`
- `visaValidityMonths` based on `travelPurpose` (only if approved): "TOURISM"→3, "BUSINESS"→12, "STUDY"→24

| Challenge 📢 | Return `{ approved, rejectionReason, visaValidityMonths }` (`visaValidityMonths` is `null` if not approved). If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `decideVisaApplication({
  bankBalance: 50000,
  hasSponsorLetter: true,
  previousVisaRejections: 0,
  travelPurpose: "TOURISM"
})` ➔

  `{
  approved: true,
  rejectionReason: null,
  visaValidityMonths: 3
}`

---

## 🧩 PROBLEM–07: 🏗️ Construction Permit Approval Engine

⚠️ **Function Name:** `decideConstructionPermit()`

| Input      | `application` (object) |
| :--------- | :--------------------- |
| **Output** | object                 |

**Rules:**

`application` object:

- `plotAreaSqFt` (number, > 0)
- `proposedFloors` (number, integer, ≥ 1)
- `setbackCompliant` (boolean)
- `environmentalClearance` (boolean)
- `zoneType` (string: "RESIDENTIAL", "COMMERCIAL", "INDUSTRIAL")

**Decision Tree Rules (check in order, stop at first failure):**

1. `setbackCompliant === true` → else reject: `"Setback requirements not met"`
2. `environmentalClearance === true` → else reject: `"Environmental clearance required"`
3. Max floors allowed by zone: RESIDENTIAL→4, COMMERCIAL→10, INDUSTRIAL→6
   - `proposedFloors <= maxFloorsForZone` → else reject: `"Proposed floors exceed zone limit"`

**Output Rules (if approved):**

- `permitFee = plotAreaSqFt × 5 × proposedFloors` (rounded to 2 decimal places)
- `approved = true`

| Challenge 📢 | If rejected: return `{ approved: false, reason }`. If approved: return `{ approved: true, permitFee }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `decideConstructionPermit({
  plotAreaSqFt: 2000,
  proposedFloors: 3,
  setbackCompliant: true,
  environmentalClearance: true,
  zoneType: "RESIDENTIAL"
})` ➔

  `{
  approved: true,
  permitFee: 30000.00
}`

---

## 🧩 PROBLEM–08: 🎮 Game Matchmaking Decision Engine

⚠️ **Function Name:** `decideMatchmaking()`

| Input      | `players` (array of objects) |
| :--------- | :--------------------------- |
| **Output** | object                       |

**Rules:**

`players` — array of exactly 2 objects (else `"Invalid Input"`), each:

- `playerName` (string)
- `skillRating` (number, ≥ 0)
- `region` (string)
- `pingMs` (number, ≥ 0)

**Decision Tree Rules:**

1. `skillRatingDifference = Math.abs(p1.skillRating - p2.skillRating)` must be `<= 200` → else reject: `"Skill gap too large"`
2. Both players' `region` must match → else reject: `"Region mismatch"`
3. Both players' `pingMs` must be `<= 150` → else reject: `"Connection quality too poor for one or both players"`

**Output Rules (if matched):**

- `matched = true`
- `matchQuality`:
  - `skillRatingDifference <= 50` → `"EXCELLENT"`
  - `skillRatingDifference <= 120` → `"GOOD"`
  - `skillRatingDifference <= 200` → `"ACCEPTABLE"`

| Challenge 📢 | If rejected: return `{ matched: false, reason }`. If matched: return `{ matched: true, matchQuality }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `decideMatchmaking([
  { playerName: "Shuvo", skillRating: 1500, region: "ASIA", pingMs: 40 },
  { playerName: "Rakin", skillRating: 1580, region: "ASIA", pingMs: 60 }
])` ➔

  `{
  matched: true,
  matchQuality: "GOOD"
}`

---

## 🧩 PROBLEM–09: 📦 Shipping Method Recommendation Engine

⚠️ **Function Name:** `recommendShippingMethod()`

| Input      | `order` (object) |
| :--------- | :--------------- |
| **Output** | object           |

**Rules:**

`order` object:

- `weightKg` (number, > 0)
- `destinationDistanceKm` (number, > 0)
- `isFragile` (boolean)
- `customerWantsExpress` (boolean)

**Decision Tree Rules (check in this exact priority order, first match wins):**

1. If `isFragile === true` AND `weightKg > 20` → `"SPECIALIZED_FREIGHT"` (heavy fragile items need special handling)
2. If `customerWantsExpress === true` AND `destinationDistanceKm <= 500` → `"EXPRESS_COURIER"`
3. If `weightKg > 50` → `"CARGO_TRUCK"`
4. If `destinationDistanceKm > 1000` → `"AIR_FREIGHT"`
5. Otherwise → `"STANDARD_COURIER"`

**Output Rules:**

- `recommendedMethod` → from the rules above
- `estimatedDays` based on method: SPECIALIZED_FREIGHT→7, EXPRESS_COURIER→1, CARGO_TRUCK→5, AIR_FREIGHT→3, STANDARD_COURIER→4

| Challenge 📢 | Return `{ recommendedMethod, estimatedDays }`. If invalid input → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `recommendShippingMethod({
  weightKg: 15,
  destinationDistanceKm: 300,
  isFragile: true,
  customerWantsExpress: true
})` ➔

  `{
  recommendedMethod: "EXPRESS_COURIER",
  estimatedDays: 1
}`

---

## 🧩 PROBLEM–10: 🏆 Phase-4 ULTIMATE CAPSTONE: Cross-Domain Batch Decision Processor

⚠️ **Function Name:** `processCrossDomainBatch()`

| Input      | `batchRequests` (array of objects) |
| :--------- | :--------------------------------- |
| **Output** | object                             |

**Rules:**

This is the ULTIMATE capstone — extending Problem 05's orchestrator to include ALL domains from this entire Day-200 set (Problems 01, 02, 03, 06, 07, 08, 09).

`batchRequests` — non-empty array, each entry: `{ domain: string, ...relevantFields }` where `domain` is one of:
`"SCHOLARSHIP"`, `"RENTAL"`, `"INSURANCE_CLAIM"`, `"VISA"`, `"CONSTRUCTION_PERMIT"`, `"MATCHMAKING"`, `"SHIPPING"`

Each domain's payload matches its respective problem's input shape from this same document (Problems 01, 02, 03, 06, 07, 08, 09 respectively — for RENTAL, fields are `data` and `monthlyRent`; for MATCHMAKING, the field is `players`; for others, the field is `data` matching that problem's primary object input; for SHIPPING the field is `data` matching `order`).

**Processing Rules:**

- For each request, run the equivalent logic from the matching problem
- Build `domainTally` → object: each key is a domain name that appeared in the batch, value is `{ total, succeeded, failed }` where "succeeded" means the equivalent of `approved`/`awarded`/`settled`/`matched` being `true`
- `grandTotalRequests` → count of all requests
- `grandSuccessRate` → `(sum of all succeeded across domains / grandTotalRequests) × 100` (rounded to 2 decimal places)
- `dominantDomain` → the domain name that appears most frequently in the batch (if tie, whichever appears first)
- Unknown domain → counts as failed, still included in tally under its (unrecognized) name with `failed` incremented

| Challenge 📢 | Return `{ domainTally, grandTotalRequests, grandSuccessRate, dominantDomain }`. If `batchRequests` is not a non-empty array → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `processCrossDomainBatch([
  { domain: "MATCHMAKING", players: [
      { playerName: "A", skillRating: 1000, region: "EU", pingMs: 30 },
      { playerName: "B", skillRating: 1050, region: "EU", pingMs: 40 }
  ]},
  { domain: "MATCHMAKING", players: [
      { playerName: "C", skillRating: 1000, region: "EU", pingMs: 30 },
      { playerName: "D", skillRating: 1500, region: "EU", pingMs: 40 }
  ]},
  { domain: "SHIPPING", data: { weightKg: 60, destinationDistanceKm: 200, isFragile: false, customerWantsExpress: false } }
])` ➔

  `{
  domainTally: {
    MATCHMAKING: { total: 2, succeeded: 1, failed: 1 },
    SHIPPING: { total: 1, succeeded: 1, failed: 0 }
  },
  grandTotalRequests: 3,
  grandSuccessRate: 66.67,
  dominantDomain: "MATCHMAKING"
}`

---
