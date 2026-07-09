// PROBLEM-05: buildExpenseHealthReport()

// Logic: Checks how much of revenue is eaten by expenses, splits out non-essential spending as a cost-cutting opportunity list, and grades overall financial health.

const buildExpenseHealthReport = (expenses, revenue) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(expenses) || expenses.length === 0) return "Invalid Input";
    if (typeof revenue !== "number" || revenue <= 0) return "Invalid Input";
    for (let i = 0; i < expenses.length; i++) {
        const e = expenses[i];
        if (!e || typeof e !== "object") return "Invalid Input";
        if (typeof e.category !== "string") return "Invalid Input";
        if (typeof e.amount !== "number" || e.amount <= 0) return "Invalid Input";
        if (typeof e.isEssential !== "boolean") return "Invalid Input";
    }

    // --- STEP 2: SUM TOTALS ---
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const essentialExpenses = expenses.filter(e => e.isEssential === true).reduce((sum, e) => sum + e.amount, 0);
    const nonEssentialExpenses = expenses.filter(e => e.isEssential === false).reduce((sum, e) => sum + e.amount, 0);

    // --- STEP 3: COMPUTE THE TWO KEY RATIOS ---
    const expenseToRevenueRatio = Number(((totalExpenses / revenue) * 100).toFixed(2));
    const nonEssentialPercent = Number(((nonEssentialExpenses / totalExpenses) * 100).toFixed(2));

    // --- STEP 4: CLASSIFY FINANCIAL HEALTH ---
    let financialHealth;
    if (expenseToRevenueRatio <= 60) financialHealth = "HEALTHY";
    else if (expenseToRevenueRatio <= 85) financialHealth = "CAUTION";
    else financialHealth = "CRITICAL";

    // --- STEP 5: BUILD COST-CUTTING OPPORTUNITY LIST ---
    // only non-essential expenses qualify, sorted biggest-first so the
    // most impactful cuts are listed at the top
    const costCuttingOpportunity = expenses
        .filter(e => e.isEssential === false)
        .sort((a, b) => b.amount - a.amount)
        .map(e => e.category);

    // --- STEP 6: BUILD THE REPORT SUMMARY SENTENCE ---
    const reportSummary = `Expenses are ${expenseToRevenueRatio}% of revenue (${financialHealth}). ${nonEssentialPercent}% of spending is non-essential.`;

    // --- STEP 7: RETURN FINAL RESULT ---
    return { expenseToRevenueRatio, financialHealth, costCuttingOpportunity, reportSummary };
};

// --- EXAMPLE USAGE ---
console.log(buildExpenseHealthReport([
    { category: "Rent", amount: 30000, isEssential: true },
    { category: "Entertainment Budget", amount: 8000, isEssential: false },
    { category: "Office Snacks", amount: 2000, isEssential: false }
], 80000));