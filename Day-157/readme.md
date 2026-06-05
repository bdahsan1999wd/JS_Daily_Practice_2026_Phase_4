# 🎓 JS DAILY PRACTICE – DAY-157

📅 **Goal:** Leaderboard Ranking System (Advanced Array Processing Engine)
🎯 **Focus:** map() • filter() • reduce() • find() • some() / every() • sort()

---

## ⚠️ General Rules

- Solve every problem using a **function**.
- **Return** the result (❌ do not use `console.log` inside the function).
- Proper **input validation** is mandatory (check types and ranges).
- If input is invalid → return `"Invalid Input"`.

---

## 🧩 PROBLEM–01: 🎮 Player Score Processor

⚠️ **Function Name:** `processPlayerScores()`

| Input      | `players` (array of objects) |
| :--------- | :--------------------------- |
| **Output** | array of objects             |

**Rules:**

Each player object:

- `playerName` (string)
- `game` (string)
- `roundScores` (array of numbers, each ≥ 0, minimum 1 round)

**Calculation:**

- `totalScore = sum of all roundScores`
- `bestRound = Math.max(...roundScores)`
- `worstRound = Math.min(...roundScores)`
- `averageScore = totalScore / roundScores.length` (rounded to 2 decimal places)

**Tier System:**

| Total Score | Tier       |
| :---------- | :--------- |
| ≥ 500       | "LEGEND"   |
| 300 – 499   | "PRO"      |
| 150 – 299   | "SKILLED"  |
| 50 – 149    | "ROOKIE"   |
| < 50        | "BEGINNER" |

| Challenge 📢 | Return array with `playerName`, `game`, `totalScore`, `bestRound`, `worstRound`, `averageScore`, `tier`. If invalid input → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `processPlayerScores([
  { playerName: "Rony", game: "Chess", roundScores: [120, 95, 110] },
  { playerName: "Lina", game: "Chess", roundScores: [30, 10, 5] }
])` ➔

  `[
  { playerName: "Rony", game: "Chess", totalScore: 325, bestRound: 120, worstRound: 95, averageScore: 108.33, tier: "PRO" },
  { playerName: "Lina", game: "Chess", totalScore: 45, bestRound: 30, worstRound: 5, averageScore: 15.00, tier: "BEGINNER" }
]`

---

## 🧩 PROBLEM–02: 🔍 Game & Tier Filter Engine

⚠️ **Function Name:** `filterLeaderboard()`

| Input      | `players` (array of objects), `game` (string), `minScore` (number) |
| :--------- | :----------------------------------------------------------------- |
| **Output** | array of objects                                                   |

**Rules:**

Each player object:

- `playerName` (string)
- `game` (string)
- `totalScore` (number, ≥ 0)
- `country` (string)

**Filter Rules:**

- `game` must be a non-empty string
- `minScore` must be a number ≥ 0
- Filter by matching `game` (case-insensitive)
- From filtered list, keep only players where `totalScore ≥ minScore`
- Sort result by `totalScore` descending

| Challenge 📢 | Return filtered array with all original fields. If no match → return `[]`. If invalid input → `"Invalid Input"` |
| :----------- | :-------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `filterLeaderboard([
  { playerName: "Arko", game: "Football", totalScore: 480, country: "BD" },
  { playerName: "Mira", game: "Football", totalScore: 210, country: "IN" },
  { playerName: "Zara", game: "Cricket", totalScore: 600, country: "BD" }
], "football", 300)` ➔

  `[
  { playerName: "Arko", game: "Football", totalScore: 480, country: "BD" }
]`

---

## 🧩 PROBLEM–03: 📊 Leaderboard Analytics Engine

⚠️ **Function Name:** `generateLeaderboardAnalytics()`

| Input      | `players` (array of objects) |
| :--------- | :--------------------------- |
| **Output** | object                       |

**Rules:**

Each player object:

- `playerName` (string)
- `game` (string)
- `country` (string)
- `totalScore` (number, ≥ 0)

**Requirements:**

- `totalPlayers` → count of all players
- `globalAverage` → mean of all `totalScore` values (rounded to 2 decimal places)
- `champion` → player with highest `totalScore`
- `lastPlace` → player with lowest `totalScore`
- `gameWiseTopScore` → object: each key = game, value = highest `totalScore` in that game
- `countryWisePlayerCount` → object: each key = country, value = number of players from that country

| Challenge 📢 | Return full analytics object. If invalid input → `"Invalid Input"` |
| :----------- | :----------------------------------------------------------------- |

**Sample Input & Output:**

- `generateLeaderboardAnalytics([
  { playerName: "Ali", game: "Chess", country: "BD", totalScore: 400 },
  { playerName: "Ben", game: "Chess", country: "UK", totalScore: 320 },
  { playerName: "Cara", game: "Tennis", country: "BD", totalScore: 510 }
])` ➔

  `{
  totalPlayers: 3,
  globalAverage: 410.00,
  champion: { playerName: "Cara", game: "Tennis", country: "BD", totalScore: 510 },
  lastPlace: { playerName: "Ben", game: "Chess", country: "UK", totalScore: 320 },
  gameWiseTopScore: { Chess: 400, Tennis: 510 },
  countryWisePlayerCount: { BD: 2, UK: 1 }
}`

---

## 🧩 PROBLEM–04: ✅ Qualification Checker

⚠️ **Function Name:** `checkTournamentQualification()`

| Input      | `players` (array of objects) |
| :--------- | :--------------------------- |
| **Output** | object                       |

**Rules:**

Each player object:

- `playerName` (string)
- `totalScore` (number, ≥ 0)
- `matchesPlayed` (number, integer, ≥ 1)
- `penaltyPoints` (number, ≥ 0)

**Qualification Rules:**

A player qualifies if ALL three conditions are true:

1. `totalScore ≥ 200`
2. `matchesPlayed ≥ 5`
3. `penaltyPoints ≤ 20`

- `allQualified` → `every()` — true if ALL players qualify
- `anyDisqualified` → `some()` — true if ANY player does NOT qualify
- `qualifiedPlayers` → array of `playerName` where all 3 conditions are true
- `disqualifiedPlayers` → array of `playerName` where any condition fails

| Challenge 📢 | Return `{ allQualified, anyDisqualified, qualifiedPlayers, disqualifiedPlayers }`. If invalid input → `"Invalid Input"` |
| :----------- | :---------------------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `checkTournamentQualification([
  { playerName: "Dara", totalScore: 250, matchesPlayed: 6, penaltyPoints: 10 },
  { playerName: "Emil", totalScore: 180, matchesPlayed: 5, penaltyPoints: 5 },
  { playerName: "Fion", totalScore: 300, matchesPlayed: 4, penaltyPoints: 25 }
])` ➔

  `{
  allQualified: false,
  anyDisqualified: true,
  qualifiedPlayers: ["Dara"],
  disqualifiedPlayers: ["Emil", "Fion"]
}`

---

## 🧩 PROBLEM–05: 🏆 Global Ranking Engine

⚠️ **Function Name:** `generateGlobalRanking()`

| Input      | `players` (array of objects) |
| :--------- | :--------------------------- |
| **Output** | array of objects             |

**Rules:**

Each player object:

- `playerName` (string)
- `country` (string)
- `totalScore` (number, ≥ 0)
- `matchesWon` (number, integer, ≥ 0)
- `penaltyPoints` (number, ≥ 0)

**Ranking Rules:**

- `netScore = totalScore - penaltyPoints`
- Rank by `netScore` descending
- If tie → higher `matchesWon` wins
- If still tie → same rank (shared rank)

**Medal System:**

| Rank | Medal    |
| :--- | :------- |
| 1    | "GOLD"   |
| 2    | "SILVER" |
| 3    | "BRONZE" |
| 4+   | "NONE"   |

| Challenge 📢 | Return array with `playerName`, `country`, `netScore`, `rank`, `medal`. If invalid input → `"Invalid Input"` |
| :----------- | :----------------------------------------------------------------------------------------------------------- |

**Sample Input & Output:**

- `generateGlobalRanking([
  { playerName: "Gina", country: "BD", totalScore: 500, matchesWon: 12, penaltyPoints: 20 },
  { playerName: "Hugo", country: "US", totalScore: 460, matchesWon: 15, penaltyPoints: 0 },
  { playerName: "Iris", country: "IN", totalScore: 400, matchesWon: 8, penaltyPoints: 0 },
  { playerName: "Jack", country: "UK", totalScore: 350, matchesWon: 5, penaltyPoints: 0 }
])` ➔

  `[
  { playerName: "Gina", country: "BD", netScore: 480, rank: 1, medal: "GOLD" },
  { playerName: "Hugo", country: "US", netScore: 460, rank: 2, medal: "SILVER" },
  { playerName: "Iris", country: "IN", netScore: 400, rank: 3, medal: "BRONZE" },
  { playerName: "Jack", country: "UK", netScore: 350, rank: 4, medal: "NONE" }
]`

---
