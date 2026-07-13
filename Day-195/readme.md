# 🎓 JS DAILY PRACTICE – DAY-195

📅 **Goal:** Candidate Selection System (Rule Engine & Decision System Design)
🎯 **Focus:** Multi-Condition Decision Trees • Scoring Systems • Priority-Based Logic • Rule-Based Output Generation

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 📄 Resume Screening Gate

⚠️ **Function Name:** `screenResume()`

| Input      | `candidate` (object), `jobRequirements` (object) |
| :--------- | :----------------------------------------------- |
| **Output** | object                                           |

**Rules:**

`candidate` object:

- `yearsExperience` (number, ≥ 0)
- `educationLevel` (string: "HIGH_SCHOOL", "BACHELORS", "MASTERS", "PHD")
- `requiredSkillsMatched` (number, integer, ≥ 0)

`jobRequirements` object:

- `minExperience` (number, ≥ 0)
- `minEducationLevel` (string: same options as above)
- `totalRequiredSkills` (number, integer, > 0)
- `minSkillMatchPercent` (number, 0–100)

**Decision Tree Rules (check in this exact order, stop at first failure):**

- Education hierarchy: HIGH_SCHOOL=1, BACHELORS=2, MASTERS=3, PHD=4

1. `yearsExperience >= minExperience` → else reject: `"Insufficient experience"`
2. Candidate's education level rank `>=` required level rank → else reject: `"Education requirement not met"`
3. `skillMatchPercent = (requiredSkillsMatched / totalRequiredSkills) × 100` must be `>= minSkillMatchPercent` → else reject: `"Insufficient skill match"`

**Output Rules:**

- `passed` → true only if all 3 checks pass
- `rejectionReason` → failure message, or `null` if passed
- `skillMatchPercent` → always include (rounded to 2 decimal places)

| Challenge 📢 | Return `{ passed, rejectionReason, skillMatchPercent }`. If invalid input → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `screenResume(
  { yearsExperience: 3, educationLevel: "BACHELORS", requiredSkillsMatched: 6 },
  { minExperience: 2, minEducationLevel: "BACHELORS", totalRequiredSkills: 10, minSkillMatchPercent: 70 }
)` ➔

  `{
  passed: false,
  rejectionReason: "Insufficient skill match",
  skillMatchPercent: 60.00
}`

---

## 🧩 PROBLEM–02: 🎯 Candidate Scoring Matrix

⚠️ **Function Name:** `scoreCandidateProfile()`

| Input      | `candidate` (object) |
| :--------- | :------------------- |
| **Output** | object               |

**Rules:**

`candidate` object:

- `yearsExperience` (number, ≥ 0)
- `interviewScore` (number, 0–100)
- `technicalTestScore` (number, 0–100)
- `culturalFitScore` (number, 0–100)
- `hasRelevantCertification` (boolean)

**Weighted Scoring Rules:**

- `experienceScore` → capped at 100: `Math.min(yearsExperience × 10, 100)` (each year worth 10 points, max 100)
- `compositeScore = (experienceScore × 0.2) + (interviewScore × 0.3) + (technicalTestScore × 0.3) + (culturalFitScore × 0.15) + (certificationBonus × 0.05)`
  - `certificationBonus` → `100` if `hasRelevantCertification === true`, else `0`
- `compositeScore` rounded to 2 decimal places

**Recommendation Tier:**

| compositeScore | tier          |
| :------------- | :------------ |
| ≥ 85           | "STRONG_HIRE" |
| 70 – 84        | "HIRE"        |
| 55 – 69        | "MAYBE"       |
| < 55           | "NO_HIRE"     |

| Challenge 📢 | Return `{ compositeScore, tier }`. If invalid input → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------- |

**Sample Input & Output:**

- `scoreCandidateProfile({
  yearsExperience: 5,
  interviewScore: 85,
  technicalTestScore: 90,
  culturalFitScore: 80,
  hasRelevantCertification: true
})` ➔

  `{
  compositeScore: 79.50,
  tier: "HIRE"
}`

---

## 🧩 PROBLEM–03: 🏆 Interview Panel Consensus Calculator

⚠️ **Function Name:** `calculatePanelConsensus()`

| Input      | `panelScores` (array of objects) |
| :--------- | :------------------------------- |
| **Output** | object                           |

**Rules:**

`panelScores` — non-empty array, each entry:

- `interviewerName` (string)
- `score` (number, 0–100)
- `recommendation` (string: "HIRE", "NO_HIRE", "MAYBE")

**Consensus Rules:**

- `averageScore` → mean of all `score` values (rounded to 2 decimal places)
- `hireVotes`, `noHireVotes`, `maybeVotes` → counts of each recommendation
- `hasUnanimousDecision` → true if ALL interviewers gave the SAME recommendation
- `hasConflictingViews` → true if there's at least 1 "HIRE" AND at least 1 "NO_HIRE" vote (strong disagreement)
- `finalRecommendation`:
  - `hasUnanimousDecision` → that single recommendation
  - `hasConflictingViews` → `"ESCALATE_TO_SENIOR_REVIEW"`
  - otherwise (mixed but no direct conflict, e.g. HIRE+MAYBE) → majority vote (most votes wins; if tie, `"ESCALATE_TO_SENIOR_REVIEW"`)

| Challenge 📢 | Return `{ averageScore, hasUnanimousDecision, hasConflictingViews, finalRecommendation }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `calculatePanelConsensus([
  { interviewerName: "A", score: 80, recommendation: "HIRE" },
  { interviewerName: "B", score: 40, recommendation: "NO_HIRE" },
  { interviewerName: "C", score: 75, recommendation: "HIRE" }
])` ➔

  `{
  averageScore: 65.00,
  hasUnanimousDecision: false,
  hasConflictingViews: true,
  finalRecommendation: "ESCALATE_TO_SENIOR_REVIEW"
}`

---

## 🧩 PROBLEM–04: 📋 Multi-Candidate Ranking & Shortlisting

⚠️ **Function Name:** `shortlistCandidates()`

| Input      | `candidates` (array of objects), `maxShortlistSize` (number) |
| :--------- | :----------------------------------------------------------- |
| **Output** | object                                                       |

**Rules:**

`candidates` — non-empty array, each entry:

- `candidateName` (string)
- `compositeScore` (number, 0–100)
- `yearsExperience` (number, ≥ 0)

`maxShortlistSize` must be a number, integer, ≥ 1

**Shortlisting Rules:**

- Rank by `compositeScore` descending
- If tie → higher `yearsExperience` wins
- If still tie → same rank
- `shortlisted` → top candidates up to `maxShortlistSize` (if ties at the boundary cause more than `maxShortlistSize` to share that rank, include ALL of them — don't cut a tied group in half)
- `waitlisted` → all remaining candidates (full ranked list minus shortlisted)

| Challenge 📢 | Return `{ shortlisted, waitlisted }` where each is array of `{ candidateName, compositeScore, rank }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `shortlistCandidates([
  { candidateName: "Lima", compositeScore: 90, yearsExperience: 5 },
  { candidateName: "Rony", compositeScore: 85, yearsExperience: 3 },
  { candidateName: "Sami", compositeScore: 85, yearsExperience: 7 },
  { candidateName: "Tani", compositeScore: 70, yearsExperience: 2 }
], 2)` ➔

  `{
  shortlisted: [
    { candidateName: "Lima", compositeScore: 90, rank: 1 },
    { candidateName: "Sami", compositeScore: 85, rank: 2 }
  ],
  waitlisted: [
    { candidateName: "Rony", compositeScore: 85, rank: 3 },
    { candidateName: "Tani", compositeScore: 70, rank: 4 }
  ]
}`

---

## 🧩 PROBLEM–05: 🏗️ Full Candidate Decision Pipeline

⚠️ **Function Name:** `runCandidateDecisionPipeline()`

| Input      | `candidate` (object), `jobRequirements` (object) |
| :--------- | :----------------------------------------------- |
| **Output** | object                                           |

**Rules:**

This problem composes Problems 1 and 2 into one pipeline.

`candidate` object combines fields from both previous problems:

- `yearsExperience` (number, ≥ 0)
- `educationLevel` (string)
- `requiredSkillsMatched` (number, integer, ≥ 0)
- `interviewScore` (number, 0–100)
- `technicalTestScore` (number, 0–100)
- `culturalFitScore` (number, 0–100)
- `hasRelevantCertification` (boolean)

`jobRequirements` object — same shape as Problem 1

**Pipeline Rules:**

1. Run the equivalent of `screenResume()` logic first
   - If NOT passed → STOP, return rejection immediately
2. If passed, run the equivalent of `scoreCandidateProfile()` logic to get `compositeScore` and `tier`

| Challenge 📢 | If rejected at step 1: return `{ advancedToInterview: false, reason }`. If passed: return `{ advancedToInterview: true, compositeScore, tier }`. If invalid input → `"Invalid Input"` |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

**Sample Input & Output:**

- `runCandidateDecisionPipeline(
  { yearsExperience: 6, educationLevel: "MASTERS", requiredSkillsMatched: 9, interviewScore: 88, technicalTestScore: 92, culturalFitScore: 85, hasRelevantCertification: true },
  { minExperience: 3, minEducationLevel: "BACHELORS", totalRequiredSkills: 10, minSkillMatchPercent: 80 }
)` ➔

  `{
  advancedToInterview: true,
  compositeScore: 83.75,
  tier: "HIRE"
}`

---
