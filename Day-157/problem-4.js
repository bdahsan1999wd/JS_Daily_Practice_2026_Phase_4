// 🧩 PROBLEM–04: checkTournamentQualification()

// Logic: This function processes an array of player metrics to establish alignment across strict qualification boundaries using .every() and .some() structural evaluations.

function checkTournamentQualification(players) {

    // --- STEP 1: VALIDATION ---
    // Enforce array compliance parameters.
    if (!Array.isArray(players) || players.length === 0) {
        return "Invalid Input";
    }

    for (const player of players) {
        if (
            !player ||
            typeof player.playerName !== "string" ||
            typeof player.totalScore !== "number" || player.totalScore < 0 ||
            typeof player.matchesPlayed !== "number" || !Number.isInteger(player.matchesPlayed) || player.matchesPlayed < 1 ||
            typeof player.penaltyPoints !== "number" || player.penaltyPoints < 0
        ) {
            return "Invalid Input";
        }
    }

    // --- STEP 2: CONDITION LOGIC SPLITTING ---
    const eligibleCondition = p => p.totalScore >= 200 && p.matchesPlayed >= 5 && p.penaltyPoints <= 20;

    const allQualified = players.every(eligibleCondition);
    const anyDisqualified = players.some(p => !eligibleCondition(p));

    const qualifiedPlayers = [];
    const disqualifiedPlayers = [];

    // Map identities based on boolean rule results.
    players.forEach(player => {
        if (eligibleCondition(player)) {
            qualifiedPlayers.push(player.playerName);
        } else {
            disqualifiedPlayers.push(player.playerName);
        }
    });

    // --- STEP 3: DISPATCH STATUS ARTIFACT ---
    return {
        allQualified,
        anyDisqualified,
        qualifiedPlayers,
        disqualifiedPlayers
    };
}

// --- EXAMPLE USAGE ---
console.log(
    checkTournamentQualification([
        { playerName: "Dara", totalScore: 250, matchesPlayed: 6, penaltyPoints: 10 },
        { playerName: "Emil", totalScore: 180, matchesPlayed: 5, penaltyPoints: 5 },
        { playerName: "Fion", totalScore: 300, matchesPlayed: 4, penaltyPoints: 25 }
    ])
);

console.log(
    checkTournamentQualification([{ invalidItem: true }])
);