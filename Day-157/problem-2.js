// 🧩 PROBLEM–02: filterLeaderboard()

// Logic: This function handles deep filtration parameters by isolating targeted matching games (case-insensitive) and retaining entries that surpass minimum scores, sorting them descendingly by performance.

function filterLeaderboard(players, game, minScore) {

    // --- STEP 1: VALIDATION ---
    // Enforce type checks for base layer configuration elements.
    if (
        !Array.isArray(players) || players.length === 0 ||
        typeof game !== "string" || game.trim() === "" ||
        typeof minScore !== "number" || minScore < 0
    ) {
        return "Invalid Input";
    }

    // Loop check for explicit individual element verification.
    for (const player of players) {
        if (
            !player ||
            typeof player.playerName !== "string" ||
            typeof player.game !== "string" ||
            typeof player.totalScore !== "number" || player.totalScore < 0 ||
            typeof player.country !== "string"
        ) {
            return "Invalid Input";
        }
    }

    // --- STEP 2: STRUCTURAL SCREENING AND SORTING ---
    const lowerCaseGame = game.toLowerCase();

    return players
        .filter(player => player.game.toLowerCase() === lowerCaseGame && player.totalScore >= minScore)
        .sort((a, b) => b.totalScore - a.totalScore);
}

// --- EXAMPLE USAGE ---
console.log(
    filterLeaderboard([
        { playerName: "Arko", game: "Football", totalScore: 480, country: "BD" },
        { playerName: "Mira", game: "Football", totalScore: 210, country: "IN" },
        { playerName: "Zara", game: "Cricket", totalScore: 600, country: "BD" }
    ], "football", 300)
);

console.log(
    filterLeaderboard([], "Tennis", -10)
);