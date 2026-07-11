// PROBLEM-05: buildBIExecutiveSummary()

// Logic: The Module-6 CAPSTONE blends financial health (profit margin) and customer sentiment (average rating) into ONE composite business health score, weighted 60/40.

const buildBIExecutiveSummary = (salesData, expenseData, customerData) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(salesData) || salesData.length === 0) return "Invalid Input";
    if (!Array.isArray(expenseData) || expenseData.length === 0) return "Invalid Input";
    if (!Array.isArray(customerData) || customerData.length === 0) return "Invalid Input";

    for (let i = 0; i < salesData.length; i++) {
        if (!salesData[i] || typeof salesData[i] !== "object") return "Invalid Input";
        if (typeof salesData[i].amount !== "number" || salesData[i].amount <= 0) return "Invalid Input";
    }
    for (let i = 0; i < expenseData.length; i++) {
        if (!expenseData[i] || typeof expenseData[i] !== "object") return "Invalid Input";
        if (typeof expenseData[i].amount !== "number" || expenseData[i].amount <= 0) return "Invalid Input";
    }
    for (let i = 0; i < customerData.length; i++) {
        const c = customerData[i];
        if (!c || typeof c !== "object") return "Invalid Input";
        if (typeof c.rating !== "number" || !Number.isInteger(c.rating) || c.rating < 1 || c.rating > 5) return "Invalid Input";
    }

    // --- STEP 2: REVENUE, EXPENSES, NET PROFIT ---
    const totalRevenue = salesData.reduce((sum, s) => sum + s.amount, 0);
    const totalExpenses = expenseData.reduce((sum, e) => sum + e.amount, 0);
    const netProfit = totalRevenue - totalExpenses;

    // --- STEP 3: PROFIT MARGIN PERCENT ---
    const profitMarginPercent = Number(((netProfit / totalRevenue) * 100).toFixed(2));

    // --- STEP 4: AVERAGE CUSTOMER RATING ---
    const averageCustomerRating = Number(
        (customerData.reduce((sum, c) => sum + c.rating, 0) / customerData.length).toFixed(2)
    );

    // --- STEP 5: COMPOSITE BUSINESS HEALTH SCORE (60% financial, 40% customer) ---
    // profit margin is capped to [0,100] so a loss doesn't drag the score
    // negative, and a huge margin doesn't inflate it past 100
    const cappedMargin = Math.max(0, Math.min(100, profitMarginPercent));
    const ratingScaledTo100 = (averageCustomerRating / 5) * 100;
    const businessHealthScore = Number(((cappedMargin * 0.6) + (ratingScaledTo100 * 0.4)).toFixed(2));

    // --- STEP 6: OVERALL VERDICT ---
    let overallVerdict;
    if (businessHealthScore >= 80) overallVerdict = "EXCELLENT";
    else if (businessHealthScore >= 60) overallVerdict = "GOOD";
    else if (businessHealthScore >= 40) overallVerdict = "NEEDS_IMPROVEMENT";
    else overallVerdict = "CRITICAL";

    // --- STEP 7: RETURN FINAL RESULT ---
    return { netProfit, profitMarginPercent, averageCustomerRating, businessHealthScore, overallVerdict };
};

// --- EXAMPLE USAGE ---
console.log(buildBIExecutiveSummary(
    [{ amount: 60000 }, { amount: 40000 }],
    [{ amount: 30000 }, { amount: 20000 }],
    [{ rating: 5 }, { rating: 4 }, { rating: 4 }]
));