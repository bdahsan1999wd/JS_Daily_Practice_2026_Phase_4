// 🧩 PROBLEM–03: generateLeaderboardAnalytics()

// Logic: This function runs diagnostic matrix processing to sum up scores, establish arithmetic global means, find apex/nadir boundaries, and extract demographic distributions.

function generateLeaderboardAnalytics(players) {

    // --- STEP 1: VALIDATION ---
    // Ensure array is present and active before calculating metadata.
    if (!Array.isArray(players) || players.length === 0) {
        return "Invalid Input";
    }

    for (const player of players) {
        if (
            !player ||
            typeof player.playerName !== "string" ||
            typeof player.game !== "string" ||
            typeof player.country !== "string" ||
            typeof player.totalScore !== "number" || player.totalScore < 0
        ) {
            return "Invalid Input";
        }
    }

    // --- STEP 2: ALLOCATE COMPILATION STORES ---
    const totalPlayers = players.length;
    let sumTotalScores = 0;

    let champion = players[0];
    let lastPlace = players[0];

    const gameWiseTopScore = {};
    const countryWisePlayerCount = {};

    // --- STEP 3: PERFORM ANALYTICS ACCUMULATION ---
    players.forEach(player => {
        const score = player.totalScore;
        sumTotalScores += score;

        // Perform maximum/minimum entry evaluation checks.
        if (score > champion.totalScore) champion = player;
        if (score < lastPlace.totalScore) lastPlace = player;

        // Populate game-wise highest boundary scores dynamically.
        if (gameWiseTopScore[player.game] === undefined || score > gameWiseTopScore[player.game]) {
            gameWiseTopScore[player.game] = score;
        }

        // Count regional distribution frequencies.
        if (!countryWisePlayerCount[player.country]) {
            countryWisePlayerCount[player.country] = 0;
        }
        countryWisePlayerCount[player.country]++;
    });

    // --- STEP 4: ASSEMBLE SYSTEM REPORT MATRIX ---
    return {
        totalPlayers,
        globalAverage: Number((sumTotalScores / totalPlayers).toFixed(2)),
        champion: { ...champion },
        lastPlace: { ...lastPlace },
        gameWiseTopScore,
        countryWisePlayerCount
    };
}

// --- EXAMPLE USAGE ---
console.log(
    generateLeaderboardAnalytics([
        { playerName: "Ali", game: "Chess", country: "BD", totalScore: 400 },
        { playerName: "Ben", game: "Chess", country: "UK", totalScore: 320 },
        { playerName: "Cara", game: "Tennis", country: "BD", totalScore: 510 }
    ])
);

console.log(
    generateLeaderboardAnalytics(null)
);