// PROBLEM-04: trackSatisfactionTrend()

// Logic: Tracks how average ratings change month-to-month, the overall direction across the whole period, and which single month had the worst rating.

const trackSatisfactionTrend = (monthlyRatings) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(monthlyRatings) || monthlyRatings.length < 2) return "Invalid Input";
    for (let i = 0; i < monthlyRatings.length; i++) {
        const m = monthlyRatings[i];
        if (!m || typeof m !== "object") return "Invalid Input";
        if (typeof m.month !== "string") return "Invalid Input";
        if (typeof m.averageRating !== "number" || m.averageRating < 1.0 || m.averageRating > 5.0) return "Invalid Input";
    }

    // --- STEP 2: MONTH-OVER-MONTH CHANGES (starting from the 2nd month) ---
    const monthlyChanges = [];
    for (let i = 1; i < monthlyRatings.length; i++) {
        const change = Number((monthlyRatings[i].averageRating - monthlyRatings[i - 1].averageRating).toFixed(2));
        monthlyChanges.push({ month: monthlyRatings[i].month, change });
    }

    // --- STEP 3: OVERALL CHANGE (last month vs first month) ---
    const firstRating = monthlyRatings[0].averageRating;
    const lastRating = monthlyRatings[monthlyRatings.length - 1].averageRating;
    const overallChange = Number((lastRating - firstRating).toFixed(2));

    // --- STEP 4: TREND DIRECTION (small changes count as "STABLE", not noise) ---
    let trendDirection;
    if (overallChange > 0.1) trendDirection = "IMPROVING";
    else if (overallChange < -0.1) trendDirection = "DECLINING";
    else trendDirection = "STABLE";

    // --- STEP 5: FIND THE LOWEST-RATED MONTH ---
    let lowestMonth = monthlyRatings[0].month;
    let lowestRating = monthlyRatings[0].averageRating;
    for (let i = 1; i < monthlyRatings.length; i++) {
        if (monthlyRatings[i].averageRating < lowestRating) {
            lowestRating = monthlyRatings[i].averageRating;
            lowestMonth = monthlyRatings[i].month;
        }
    }

    // --- STEP 6: RETURN RESULT ---
    return { monthlyChanges, overallChange, trendDirection, lowestMonth };
};

// --- EXAMPLE USAGE ---
console.log(trackSatisfactionTrend([
    { month: "Jan", averageRating: 4.2 },
    { month: "Feb", averageRating: 3.8 },
    { month: "Mar", averageRating: 4.5 }
]));