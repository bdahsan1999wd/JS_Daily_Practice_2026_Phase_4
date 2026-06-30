// PROBLEM-04: trendAnalyzer()

// Logic: Compares each month's revenue against the PREVIOUS month to compute growth %, then judges the overall trend by comparing the very first and very last month.

const trendAnalyzer = (monthlyRevenue) => {

    // --- STEP 1: VALIDATION ---
    // need at least 2 entries to have a "previous" month to compare against
    if (!Array.isArray(monthlyRevenue) || monthlyRevenue.length < 2) return "Invalid Input";
    for (let i = 0; i < monthlyRevenue.length; i++) {
        const m = monthlyRevenue[i];
        if (!m || typeof m !== "object") return "Invalid Input";
        if (typeof m.month !== "string") return "Invalid Input";
        if (typeof m.revenue !== "number" || m.revenue < 0) return "Invalid Input";
    }

    // --- STEP 2: COMPUTE MONTH-OVER-MONTH GROWTH ---
    // starts from index 1 since the first month has no "previous" to compare
    const monthlyGrowth = [];
    for (let i = 1; i < monthlyRevenue.length; i++) {
        const current = monthlyRevenue[i].revenue;
        const previous = monthlyRevenue[i - 1].revenue;

        let growthPercent;
        if (previous === 0) {
            growthPercent = null; // can't divide by zero — flagged as null
        } else {
            growthPercent = Number((((current - previous) / previous) * 100).toFixed(2));
        }

        monthlyGrowth.push({ month: monthlyRevenue[i].month, growthPercent });
    }

    // --- STEP 3: DETERMINE OVERALL TREND (first month vs last month) ---
    const firstRevenue = monthlyRevenue[0].revenue;
    const lastRevenue = monthlyRevenue[monthlyRevenue.length - 1].revenue;

    let overallTrend;
    if (lastRevenue > firstRevenue) overallTrend = "UPWARD";
    else if (lastRevenue < firstRevenue) overallTrend = "DOWNWARD";
    else overallTrend = "STABLE";

    // --- STEP 4: RETURN RESULT ---
    return { monthlyGrowth, overallTrend };
};

// --- EXAMPLE USAGE ---
console.log(trendAnalyzer([
    { month: "Jan", revenue: 10000 },
    { month: "Feb", revenue: 12000 },
    { month: "Mar", revenue: 9000 }
]));