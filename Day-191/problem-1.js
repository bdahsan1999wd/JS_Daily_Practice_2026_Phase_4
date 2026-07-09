// PROBLEM-01: aggregateExpensesByCategory()

// Logic: Sums expenses per category, shows what % of total spending each category represents, and finds the single biggest one.

const aggregateExpensesByCategory = (expenses) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(expenses) || expenses.length === 0) return "Invalid Input";
    for (let i = 0; i < expenses.length; i++) {
        const e = expenses[i];
        if (!e || typeof e !== "object") return "Invalid Input";
        if (typeof e.category !== "string" || e.category === "") return "Invalid Input";
        if (typeof e.amount !== "number" || e.amount <= 0) return "Invalid Input";
    }

    // --- STEP 2: SUM AMOUNT PER CATEGORY (AND OVERALL TOTAL) IN ONE PASS ---
    const categoryTotals = {};
    let totalExpenses = 0;
    for (let i = 0; i < expenses.length; i++) {
        const { category, amount } = expenses[i];
        categoryTotals[category] = (categoryTotals[category] ?? 0) + amount;
        totalExpenses += amount;
    }

    // --- STEP 3: BUILD THE BREAKDOWN WITH percentOfTotal ---
    const categoryBreakdown = {};
    for (const cat in categoryTotals) {
        const amount = categoryTotals[cat];
        const percentOfTotal = Number(((amount / totalExpenses) * 100).toFixed(2));
        categoryBreakdown[cat] = { amount, percentOfTotal };
    }

    // --- STEP 4: FIND THE LARGEST CATEGORY ---
    let largestCategory = null;
    let largestAmount = -1;
    for (const cat in categoryTotals) {
        if (categoryTotals[cat] > largestAmount) {
            largestAmount = categoryTotals[cat];
            largestCategory = cat;
        }
    }

    // --- STEP 5: RETURN RESULT ---
    return { totalExpenses, categoryBreakdown, largestCategory };
};

// --- EXAMPLE USAGE ---
console.log(aggregateExpensesByCategory([
    { category: "Rent", amount: 40000 },
    { category: "Salaries", amount: 100000 },
    { category: "Utilities", amount: 10000 }
]));