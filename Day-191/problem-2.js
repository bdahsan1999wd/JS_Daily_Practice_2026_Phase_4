// PROBLEM-02: analyzeBudgetVariance()

// Logic: Compares budgeted vs actual spend PER CATEGORY (both objects must cover the exact same set of categories), flags overspending, and totals up the over-budget amount.

const analyzeBudgetVariance = (budgetedExpenses, actualExpenses) => {

    // --- STEP 1: VALIDATION ---
    if (typeof budgetedExpenses !== "object" || budgetedExpenses === null || Array.isArray(budgetedExpenses)) return "Invalid Input";
    if (typeof actualExpenses !== "object" || actualExpenses === null || Array.isArray(actualExpenses)) return "Invalid Input";

    const budgetKeys = Object.keys(budgetedExpenses);
    const actualKeys = Object.keys(actualExpenses);
    if (budgetKeys.length === 0) return "Invalid Input";

    // --- STEP 2: BOTH OBJECTS MUST HAVE THE EXACT SAME SET OF CATEGORY KEYS ---
    if (budgetKeys.length !== actualKeys.length) return "Invalid Input";
    for (let i = 0; i < budgetKeys.length; i++) {
        if (!actualExpenses.hasOwnProperty(budgetKeys[i])) return "Invalid Input";
    }

    // --- STEP 3: VALIDATE VALUE TYPES AND RANGES ---
    for (const key of budgetKeys) {
        if (typeof budgetedExpenses[key] !== "number" || budgetedExpenses[key] <= 0) return "Invalid Input";
        if (typeof actualExpenses[key] !== "number" || actualExpenses[key] < 0) return "Invalid Input";
    }

    // --- STEP 4: COMPUTE VARIANCE FOR EACH CATEGORY ---
    const categoryVariance = {};
    let totalOverBudgetAmount = 0;
    const overBudgetCategories = [];

    for (const category of budgetKeys) {
        const budgeted = budgetedExpenses[category];
        const actual = actualExpenses[category];
        const variance = actual - budgeted;
        const variancePercent = Number(((variance / budgeted) * 100).toFixed(2));

        let status;
        if (variance > 0) status = "OVER_BUDGET";
        else if (variance < 0) status = "UNDER_BUDGET";
        else status = "ON_BUDGET";

        categoryVariance[category] = { budgeted, actual, variance, variancePercent, status };

        // only POSITIVE variances (overspending) contribute to this total
        if (variance > 0) {
            totalOverBudgetAmount += variance;
            overBudgetCategories.push(category);
        }
    }

    // --- STEP 5: RETURN RESULT ---
    return { categoryVariance, totalOverBudgetAmount, overBudgetCategories };
};

// --- EXAMPLE USAGE ---
console.log(analyzeBudgetVariance(
    { Marketing: 20000, Travel: 5000 },
    { Marketing: 25000, Travel: 4000 }
));