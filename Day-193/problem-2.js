// PROBLEM-02: generateKPIScorecard()

// Logic: Each KPI's achievement % gets scaled by its importance weight into a 0-100 point contribution. Overachieving a KPI is capped — you can't earn MORE than its full weight, even past 100%.

const generateKPIScorecard = (kpis) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(kpis) || kpis.length === 0) return "Invalid Input";
    for (let i = 0; i < kpis.length; i++) {
        const k = kpis[i];
        if (!k || typeof k !== "object") return "Invalid Input";
        if (typeof k.kpiName !== "string") return "Invalid Input";
        if (typeof k.actualValue !== "number") return "Invalid Input";
        if (typeof k.targetValue !== "number" || k.targetValue === 0) return "Invalid Input";
        if (typeof k.weight !== "number" || k.weight < 0 || k.weight > 1) return "Invalid Input";
    }

    // --- STEP 2: WEIGHTS MUST SUM TO 1 (WITHIN FLOATING TOLERANCE) ---
    const weightSum = kpis.reduce((sum, k) => sum + k.weight, 0);
    if (Math.abs(weightSum - 1) > 0.01) {
        return "Invalid Input";
    }

    // --- STEP 3: COMPUTE achievementPercent AND weightedScore PER KPI ---
    const kpiDetails = kpis.map(k => {
        const achievementPercent = Number(((k.actualValue / k.targetValue) * 100).toFixed(2));
        // the cap ONLY applies to the weighted-score math, NOT to the
        // displayed achievementPercent (which can show values over 100)
        const cappedAchievementPercent = Math.min(achievementPercent, 100);
        const weightedScore = Number(((cappedAchievementPercent / 100) * k.weight * 100).toFixed(2));
        return { kpiName: k.kpiName, achievementPercent, weightedScore };
    });

    // --- STEP 4: TOTAL SCORE (sum of all weighted contributions) ---
    const totalScore = Number(kpiDetails.reduce((sum, k) => sum + k.weightedScore, 0).toFixed(2));

    // --- STEP 5: SCORECARD GRADE ---
    let scorecardGrade;
    if (totalScore >= 90) scorecardGrade = "A";
    else if (totalScore >= 75) scorecardGrade = "B";
    else if (totalScore >= 60) scorecardGrade = "C";
    else scorecardGrade = "D";

    // --- STEP 6: RETURN RESULT ---
    return { kpiDetails, totalScore, scorecardGrade };
};

// --- EXAMPLE USAGE ---
console.log(generateKPIScorecard([
    { kpiName: "Revenue", actualValue: 120000, targetValue: 100000, weight: 0.5 },
    { kpiName: "CustomerSatisfaction", actualValue: 80, targetValue: 100, weight: 0.5 }
]));