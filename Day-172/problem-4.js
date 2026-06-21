// 🧩 PROBLEM–04: detectBehaviorPatterns()

// Logic: Aggregates runtime records to compute average application usage patterns. It derives metric scales, uses conditional checks to define levels, handles records via array filtering, and outlines bounce ratios using explicit template strings.

const detectBehaviorPatterns = (sessions) => {

    // --- STEP 1: INITIAL STRUCTURAL VALIDATIONS ---
    if (!Array.isArray(sessions) || sessions.length === 0) {
        return "Invalid Input";
    }

    const totalSessions = sessions.length;
    let integratedDurationSum = 0;
    let integratedActionsSum = 0;
    let absoluteBounceCount = 0;

    // --- STEP 2: LOOP AND HARVEST HISTORICAL RUNTIME AGGREGATIONS ---
    for (let i = 0; i < totalSessions; i++) {
        const item = sessions[i];

        if (!item || typeof item !== "object" || Array.isArray(item)) {
            return "Invalid Input";
        }

        // Pull object parameters safely while establishing core fallbacks
        const duration = item.meta?.duration ?? 0;
        const actionsCount = item.meta?.actionsCount ?? 0;
        const bounced = item.meta?.bounced ?? false;

        if (
            typeof duration !== "number" || isNaN(duration) || duration < 0 ||
            typeof actionsCount !== "number" || isNaN(actionsCount) || actionsCount < 0 ||
            typeof bounced !== "boolean"
        ) {
            return "Invalid Input";
        }

        integratedDurationSum += duration;
        integratedActionsSum += actionsCount;
        if (bounced === true) {
            absoluteBounceCount += 1;
        }
    }

    // --- STEP 3: COMPUTE FRACTIONAL RATIO MEAN OUTCOMES ---
    const avgDuration = parseFloat((integratedDurationSum / totalSessions).toFixed(2));
    const avgActionsPerSession = parseFloat((integratedActionsSum / totalSessions).toFixed(2));
    const bounceRate = parseFloat(((absoluteBounceCount / totalSessions) * 100).toFixed(2));

    // --- STEP 4: ISOLATE TARGET PROFILE SUBSETS ---
    const mostActiveSessions = sessions.filter(session => {
        const count = session.meta?.actionsCount ?? 0;
        return count > avgActionsPerSession;
    });

    // Define qualitative performance levels based on interaction counts
    let engagementLevel = "LOW";
    if (avgActionsPerSession >= 10) {
        engagementLevel = "HIGH";
    } else if (avgActionsPerSession >= 5) {
        engagementLevel = "MEDIUM";
    }

    const patternSummary = `${totalSessions} session(s) analyzed. Engagement: ${engagementLevel}. Bounce rate: ${bounceRate}%.`;

    // --- STEP 5: OUTPUT COMPILED METRIC REPORTS ---
    return {
        totalSessions,
        avgDuration,
        avgActionsPerSession,
        bounceRate,
        mostActiveSessions,
        engagementLevel,
        patternSummary
    };
};

// --- EXAMPLE USAGE ---
console.log(detectBehaviorPatterns([
    { sessionId: "S1", meta: { duration: 10, actionsCount: 12, bounced: false } },
    { sessionId: "S2", meta: { duration: 3, actionsCount: 2, bounced: true } },
    { sessionId: "S3", meta: { duration: 7, actionsCount: 8, bounced: false } }
]));