// PROBLEM-08: decideMatchmaking()

// Logic: 3 compatibility checks between EXACTLY 2 players skill gap, region match, and connection quality before a match grade gets assigned.

const decideMatchmaking = (players) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(players) || players.length !== 2) return "Invalid Input";
    for (let i = 0; i < players.length; i++) {
        const p = players[i];
        if (!p || typeof p !== "object") return "Invalid Input";
        if (typeof p.playerName !== "string") return "Invalid Input";
        if (typeof p.skillRating !== "number" || p.skillRating < 0) return "Invalid Input";
        if (typeof p.region !== "string") return "Invalid Input";
        if (typeof p.pingMs !== "number" || p.pingMs < 0) return "Invalid Input";
    }

    const [p1, p2] = players;

    // --- STEP 2: 3 COMPATIBILITY CHECKS - STOP AT FIRST FAILURE ---
    const skillRatingDifference = Math.abs(p1.skillRating - p2.skillRating);
    if (skillRatingDifference > 200) {
        return { matched: false, reason: "Skill gap too large" };
    }
    if (p1.region !== p2.region) {
        return { matched: false, reason: "Region mismatch" };
    }
    if (p1.pingMs > 150 || p2.pingMs > 150) {
        return { matched: false, reason: "Connection quality too poor for one or both players" };
    }

    // --- STEP 3: MATCHED - GRADE THE MATCH QUALITY ---
    let matchQuality;
    if (skillRatingDifference <= 50) matchQuality = "EXCELLENT";
    else if (skillRatingDifference <= 120) matchQuality = "GOOD";
    else matchQuality = "ACCEPTABLE";

    // --- STEP 4: RETURN RESULT ---
    return { matched: true, matchQuality };
};

// --- EXAMPLE USAGE ---
if (require.main === module) {
    console.log(decideMatchmaking([
        { playerName: "Shuvo", skillRating: 1500, region: "ASIA", pingMs: 40 },
        { playerName: "Rakin", skillRating: 1580, region: "ASIA", pingMs: 60 }
    ]));
}

module.exports = { decideMatchmaking };