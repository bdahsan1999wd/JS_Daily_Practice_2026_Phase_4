// PROBLEM-02: trackGoalCompletion()

// Logic: Computes each goal's completion %, classifies its status, and rolls everything up into company-wide stats.

const trackGoalCompletion = (goals) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(goals) || goals.length === 0) return "Invalid Input";
    for (let i = 0; i < goals.length; i++) {
        const g = goals[i];
        if (!g || typeof g !== "object") return "Invalid Input";
        if (typeof g.goalName !== "string") return "Invalid Input";
        if (typeof g.targetValue !== "number" || g.targetValue <= 0) return "Invalid Input";
        if (typeof g.currentValue !== "number" || g.currentValue < 0) return "Invalid Input";
    }

    // --- STEP 2: COMPUTE PER-GOAL DETAILS ---
    const goalDetails = goals.map(g => {
        const completionPercent = Number(((g.currentValue / g.targetValue) * 100).toFixed(2));
        let status;
        if (completionPercent >= 100) status = "COMPLETED";
        else if (completionPercent >= 50) status = "IN_PROGRESS";
        else status = "AT_RISK";
        return { goalName: g.goalName, completionPercent, status };
    });

    // --- STEP 3: OVERALL COMPLETION RATE (average across all goals) ---
    const overallCompletionRate = Number(
        (goalDetails.reduce((sum, g) => sum + g.completionPercent, 0) / goalDetails.length).toFixed(2)
    );

    // --- STEP 4: COMPLETED COUNT & AT-RISK LIST ---
    const completedGoalsCount = goalDetails.filter(g => g.status === "COMPLETED").length;
    const atRiskGoals = goalDetails.filter(g => g.status === "AT_RISK").map(g => g.goalName);

    // --- STEP 5: RETURN RESULT ---
    return { goalDetails, overallCompletionRate, completedGoalsCount, atRiskGoals };
};

// --- EXAMPLE USAGE ---
console.log(trackGoalCompletion([
    { goalName: "Sales Target", targetValue: 100000, currentValue: 120000 },
    { goalName: "New Customers", targetValue: 50, currentValue: 20 },
    { goalName: "Support Tickets", targetValue: 200, currentValue: 150 }
]));