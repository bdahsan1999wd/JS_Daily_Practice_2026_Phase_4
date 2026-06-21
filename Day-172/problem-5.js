// 🧩 PROBLEM–05: buildActivityLeaderboard()

// Logic: flattens multi-layered user records using spread expansion parameters. It processes custom formulas, sorts results into descending rank order, breaks ties based on user streak fields, and returns data strings mapped with badge emojis.

const buildActivityLeaderboard = (...userActivitySets) => {

    // --- STEP 1: ARCHITECTURAL REST PARAMETER VALIDATION ---
    if (!userActivitySets || userActivitySets.length === 0) {
        return "Invalid Input";
    }

    const compiledFlattenedSet = [];

    // Flatten nested user sets into a single unified array using the spread operator
    for (let i = 0; i < userActivitySets.length; i++) {
        if (!Array.isArray(userActivitySets[i])) {
            return "Invalid Input";
        }
        compiledFlattenedSet.push(...userActivitySets[i]);
    }

    if (compiledFlattenedSet.length === 0) {
        return "Invalid Input";
    }

    // --- STEP 2: TRANSFORM PARAMETERS & SCORING RUNS ---
    const processedScoreRegistry = [];

    for (let j = 0; j < compiledFlattenedSet.length; j++) {
        const record = compiledFlattenedSet[j];

        if (!record || typeof record !== "object" || Array.isArray(record)) {
            return "Invalid Input";
        }

        const userId = record.userId ?? "unknown";
        const username = record.username ?? "Anonymous";
        const totalActions = record.stats?.totalActions ?? 0;
        const streakDays = record.stats?.streakDays ?? 0;
        const completionRate = record.stats?.completionRate ?? 0;

        if (
            typeof userId !== "string" ||
            typeof username !== "string" ||
            typeof totalActions !== "number" || isNaN(totalActions) || totalActions < 0 ||
            typeof streakDays !== "number" || isNaN(streakDays) || streakDays < 0 ||
            typeof completionRate !== "number" || isNaN(completionRate) || completionRate < 0 || completionRate > 100
        ) {
            return "Invalid Input";
        }

        // Apply dynamic point multiplier allocation formulas
        const activityScore = (totalActions * 2) + (streakDays * 5) + completionRate;

        processedScoreRegistry.push({
            userId,
            username,
            streakDays,
            activityScore
        });
    }

    // --- STEP 3: DESCENT MORTALITY SORT PIPELINES ---
    processedScoreRegistry.sort((alpha, beta) => {
        if (beta.activityScore !== alpha.activityScore) {
            return beta.activityScore - alpha.activityScore;
        }
        // Secondary fallback condition: Higher consecutive user streaks break point ties
        return beta.streakDays - alpha.streakDays;
    });

    // --- STEP 4: ASSIGN RANK METRICS & FORMAT BADGES ---
    const finalLeaderboardOutput = [];
    let currentCalculatedRank = 1;

    for (let k = 0; k < processedScoreRegistry.length; k++) {
        const dynamicUser = processedScoreRegistry[k];

        // Recalculate positional ranks only if there is a divergence from the preceding item
        if (k > 0) {
            const comparisonUser = processedScoreRegistry[k - 1];

            if (
                dynamicUser.activityScore !== comparisonUser.activityScore ||
                dynamicUser.streakDays !== comparisonUser.streakDays
            ) {
                currentCalculatedRank = k + 1;
            }
        }

        // Match numeric rank milestones with symbolic badge emojis
        let medal = "—";
        if (currentCalculatedRank === 1) medal = "🥇";
        else if (currentCalculatedRank === 2) medal = "🥈";
        else if (currentCalculatedRank === 3) medal = "🥉";

        const leaderboardEntry = `${medal} #${currentCalculatedRank} ${dynamicUser.username} — Score: ${dynamicUser.activityScore}`;

        finalLeaderboardOutput.push({
            rank: currentCalculatedRank,
            medal,
            userId: dynamicUser.userId,
            username: dynamicUser.username,
            activityScore: dynamicUser.activityScore,
            leaderboardEntry
        });
    }

    return finalLeaderboardOutput;
};

// --- EXAMPLE USAGE ---
console.log(buildActivityLeaderboard(
    [
        { userId: "U1", username: "Rafi", stats: { totalActions: 20, streakDays: 7, completionRate: 80 } },
        { userId: "U2", username: "Mila", stats: { totalActions: 15, streakDays: 10, completionRate: 90 } }
    ],
    [
        { userId: "U3", username: "Zara", stats: { totalActions: 25, streakDays: 5, completionRate: 70 } }
    ]
));