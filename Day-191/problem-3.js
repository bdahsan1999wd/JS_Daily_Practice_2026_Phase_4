// PROBLEM-03: splitFixedVariableCosts()

// Logic: Splits costs into fixed vs variable, then computes classic finance metrics — contribution margin, operating margin, and the break-even revenue point.

const splitFixedVariableCosts = (expenses, revenueForPeriod) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(expenses) || expenses.length === 0) return "Invalid Input";
    if (typeof revenueForPeriod !== "number" || revenueForPeriod <= 0) return "Invalid Input";
    for (let i = 0; i < expenses.length; i++) {
        const e = expenses[i];
        if (!e || typeof e !== "object") return "Invalid Input";
        if (typeof e.category !== "string") return "Invalid Input";
        if (typeof e.amount !== "number" || e.amount <= 0) return "Invalid Input";
        if (!["FIXED", "VARIABLE"].includes(e.costType)) return "Invalid Input";
    }

    // --- STEP 2: SUM FIXED VS VARIABLE COSTS SEPARATELY ---
    const totalFixedCosts = expenses.filter(e => e.costType === "FIXED").reduce((sum, e) => sum + e.amount, 0);
    const totalVariableCosts = expenses.filter(e => e.costType === "VARIABLE").reduce((sum, e) => sum + e.amount, 0);
    const totalCosts = totalFixedCosts + totalVariableCosts;

    // --- STEP 3: BREAK-EVEN POINT ---
    // the revenue level at which fixed costs are fully covered by the
    // "contribution" left over after variable costs
    const breakEvenPoint = Number((totalFixedCosts / (1 - (totalVariableCosts / revenueForPeriod))).toFixed(2));

    // --- STEP 4: CONTRIBUTION MARGIN % ---
    // how much of each revenue dollar is left after covering variable costs
    const contributionMarginPercent = Number((((revenueForPeriod - totalVariableCosts) / revenueForPeriod) * 100).toFixed(2));

    // --- STEP 5: OPERATING MARGIN % ---
    // how much of each revenue dollar is left after covering ALL costs
    const operatingMargin = Number((((revenueForPeriod - totalCosts) / revenueForPeriod) * 100).toFixed(2));

    // --- STEP 6: RETURN RESULT ---
    return { totalFixedCosts, totalVariableCosts, contributionMarginPercent, operatingMargin, breakEvenPoint };
};

// --- EXAMPLE USAGE ---
console.log(splitFixedVariableCosts([
    { category: "Rent", amount: 20000, costType: "FIXED" },
    { category: "Salaries", amount: 30000, costType: "FIXED" },
    { category: "Materials", amount: 15000, costType: "VARIABLE" }
], 100000));