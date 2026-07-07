// PROBLEM-04: trackKPITrend()

// Logic: Looks at the differences between consecutive KPI values to classify the overall trend — consistently up, consistently down, all over the place (volatile), or roughly flat (stable).

const trackKPITrend = (kpiHistory) => {

    // --- STEP 1: VALIDATION ---
    // need at least 3 entries -> at least 2 diffs to detect a real trend
    if (!Array.isArray(kpiHistory) || kpiHistory.length < 3) return "Invalid Input";
    for (let i = 0; i < kpiHistory.length; i++) {
        const k = kpiHistory[i];
        if (!k || typeof k !== "object") return "Invalid Input";
        if (typeof k.period !== "string") return "Invalid Input";
        if (typeof k.value !== "number" || k.value < 0) return "Invalid Input";
    }

    // --- STEP 2: COMPUTE CONSECUTIVE DIFFERENCES ---
    const diffs = [];
    for (let i = 0; i < kpiHistory.length - 1; i++) {
        diffs.push(kpiHistory[i + 1].value - kpiHistory[i].value);
    }

    // --- STEP 3: CLASSIFY THE PATTERN OF DIFFS ---
    const isConsistentlyImproving = diffs.every(d => d > 0);
    const isConsistentlyDeclining = diffs.every(d => d < 0);
    const hasPositive = diffs.some(d => d > 0);
    const hasNegative = diffs.some(d => d < 0);
    // volatile means we saw BOTH an increase AND a decrease somewhere
    const isVolatile = hasPositive && hasNegative;

    // --- STEP 4: DETERMINE OVERALL DIRECTION ---
    let overallDirection;
    if (isConsistentlyImproving) overallDirection = "IMPROVING";
    else if (isConsistentlyDeclining) overallDirection = "DECLINING";
    else if (isVolatile) overallDirection = "VOLATILE";
    else overallDirection = "STABLE"; // covers all-zero diffs, or zero mixed with only ONE direction

    // --- STEP 5: AVERAGE CHANGE ACROSS ALL DIFFS ---
    const averageChange = Number((diffs.reduce((sum, d) => sum + d, 0) / diffs.length).toFixed(2));

    // --- STEP 6: RETURN RESULT ---
    return { overallDirection, averageChange };
};

// --- EXAMPLE USAGE ---
console.log(trackKPITrend([
    { period: "Week1", value: 50 },
    { period: "Week2", value: 65 },
    { period: "Week3", value: 80 }
]));