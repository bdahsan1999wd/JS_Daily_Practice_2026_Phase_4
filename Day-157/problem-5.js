// 🧩 PROBLEM–05: generateGlobalRanking()

// Logic: This function derives a net performance indicator, ranks elements using multi-layered sorting checks to settle ties fairly, and stamps specific honors corresponding to placement metrics.

function generateGlobalRanking(players) {

    // --- STEP 1: VALIDATION ---
    // Standard validation checking for array baseline configuration criteria.
    if (!Array.isArray(players) || players.length === 0) {
        return "Invalid Input";
    }

    for (const player of players) {
        if (
            !player ||
            typeof player.playerName !== "string" ||
            typeof player.country !== "string" ||
            typeof player.totalScore !== "number" || player.totalScore < 0 ||
            typeof player.matchesWon !== "number" || !Number.isInteger(player.matchesWon) || player.matchesWon < 0 ||
            typeof player.penaltyPoints !== "number" || player.penaltyPoints < 0
        ) {
            return "Invalid Input";
        }
    }

    // --- STEP 2: COMPUTE NET PERFORMANCE INDICATOR ---
    const processedLeaderboard = players.map(player => {
        const netScore = player.totalScore - player.penaltyPoints;
        return {
            playerName: player.playerName,
            country: player.country,
            netScore: Number(netScore.toFixed(2)),
            matchesWon: player.matchesWon, // Kept temporarily for nested tiebreaker conditions
        };
    });

    // --- STEP 3: STABILIZE COMPOSITE ORDER SELECTION ---
    // Primary index: netScore (descending). Secondary index: matchesWon (descending).
    processedLeaderboard.sort((a, b) => {
        if (b.netScore !== a.netScore) {
            return b.netScore - a.netScore;
        }
        return b.matchesWon - a.matchesWon;
    });

    // --- STEP 4: ASSIGN RANKINGS AND REVENUE MEDALS ---
    let activeRank = 1;
    for (let i = 0; i < processedLeaderboard.length; i++) {
        if (i > 0) {
            const current = processedLeaderboard[i];
            const previous = processedLeaderboard[i - 1];

            // Step rank value only if primary score metrics or secondary tie-breakers change.
            if (current.netScore !== previous.netScore || current.matchesWon !== previous.matchesWon) {
                activeRank = i + 1;
            }
        }

        processedLeaderboard[i].rank = activeRank;

        // Stamp matching medal accolades.
        let medal = "NONE";
        if (activeRank === 1) medal = "GOLD";
        else if (activeRank === 2) medal = "SILVER";
        else if (activeRank === 3) medal = "BRONZE";

        processedLeaderboard[i].medal = medal;

        // Clean up temporary sorting properties.
        delete processedLeaderboard[i].matchesWon;
    }

    return processedLeaderboard;
}

// --- EXAMPLE USAGE ---
console.log(
    generateGlobalRanking([
        { playerName: "Gina", country: "BD", totalScore: 500, matchesWon: 12, penaltyPoints: 20 },
        { playerName: "Hugo", country: "US", totalScore: 460, matchesWon: 15, penaltyPoints: 0 },
        { playerName: "Iris", country: "IN", totalScore: 400, matchesWon: 8, penaltyPoints: 0 },
        { playerName: "Jack", country: "UK", totalScore: 350, matchesWon: 5, penaltyPoints: 0 }
    ])
);

console.log(
    generateGlobalRanking([])
);