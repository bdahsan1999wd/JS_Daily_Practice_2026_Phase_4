// PROBLEM-02: calculatePerformanceBonus()

// Logic: A base bonus multiplier (from performance rating) gets adjusted up or down based on how well the COMPANY performed that year good company performance amplifies the bonus, a loss-making year cuts it in half.

const calculatePerformanceBonus = (baseSalary, performanceRating, companyProfitGrowthPercent) => {

    // --- STEP 1: VALIDATION ---
    if (typeof baseSalary !== "number" || baseSalary <= 0) return "Invalid Input";
    if (typeof performanceRating !== "number" || performanceRating < 0 || performanceRating > 5) return "Invalid Input";
    if (typeof companyProfitGrowthPercent !== "number" || isNaN(companyProfitGrowthPercent)) return "Invalid Input";

    // --- STEP 2: BASE MULTIPLIER FROM PERFORMANCE RATING ---
    let baseMultiplier;
    if (performanceRating >= 4.5) baseMultiplier = 0.25;
    else if (performanceRating >= 3.5) baseMultiplier = 0.15;
    else if (performanceRating >= 2.5) baseMultiplier = 0.08;
    else baseMultiplier = 0; // included for completeness even though eligibility filters this out

    // --- STEP 3: COMPANY PERFORMANCE ADJUSTMENT ---
    let companyAdjustment;
    if (companyProfitGrowthPercent >= 10) companyAdjustment = 1.2;   // 20% boost
    else if (companyProfitGrowthPercent >= 0) companyAdjustment = 1.0; // no change
    else companyAdjustment = 0.5; // 50% cut for a losing year

    // --- STEP 4: FINAL MULTIPLIER ---
    // round to 4 decimals here to preserve precision before the final money rounding
    const finalMultiplier = Number((baseMultiplier * companyAdjustment).toFixed(4));

    // --- STEP 5: BONUS AMOUNT ---
    const bonusAmount = Number((baseSalary * finalMultiplier).toFixed(2));

    // --- STEP 6: RETURN RESULT ---
    return { finalMultiplier, bonusAmount };
};

// --- EXAMPLE USAGE ---
console.log(calculatePerformanceBonus(60000, 4.0, 12));