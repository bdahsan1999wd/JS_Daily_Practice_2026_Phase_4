// 🧩 PROBLEM–01: processPlayerScores()

// Logic: This function maps over an array of player metrics, reduces their list of round scores to a total sum and statistical mean average, and applies a tier system classification based on their total cumulative performance.

function processPlayerScores(players) {

    // --- STEP 1: VALIDATION ---
    // Ensure players is a valid, populated array dataset.
    if (!Array.isArray(players) || players.length === 0) {
        return "Invalid Input";
    }

    // Verify all attributes inside each individual player profile.
    for (const player of players) {
        if (
            !player ||
            typeof player.playerName !== "string" ||
            typeof player.game !== "string" ||
            !Array.isArray(player.roundScores) || player.roundScores.length === 0
        ) {
            return "Invalid Input";
        }

        // Validate that each score entry inside the list is a safe number >= 0.
        for (const score of player.roundScores) {
            if (typeof score !== "number" || score < 0) {
                return "Invalid Input";
            }
        }
    }

    // --- STEP 2: METRIC MAPPING ENGINE ---
    return players.map(player => {
        const { playerName, game, roundScores } = player;

        const totalScore = roundScores.reduce((sum, score) => sum + score, 0);
        const bestRound = Math.max(...roundScores);
        const worstRound = Math.min(...roundScores);
        const averageScore = Number((totalScore / roundScores.length).toFixed(2));

        // Evaluate target game tiers based on score thresholds.
        let tier = "BEGINNER";
        if (totalScore >= 500) {
            tier = "LEGEND";
        } else if (totalScore >= 300) {
            tier = "PRO";
        } else if (totalScore >= 150) {
            tier = "SKILLED";
        } else if (totalScore >= 50) {
            tier = "ROOKIE";
        }

        // --- STEP 3: RETURN DATA STRUCT ---
        return {
            playerName,
            game,
            totalScore,
            bestRound,
            worstRound,
            averageScore,
            tier
        };
    });
}

// --- EXAMPLE USAGE ---
console.log(
    processPlayerScores([
        { playerName: "Rony", game: "Chess", roundScores: [120, 95, 110] },
        { playerName: "Lina", game: "Chess", roundScores: [30, 10, 5] }
    ])
);

console.log(
    processPlayerScores("invalid structural types")
);