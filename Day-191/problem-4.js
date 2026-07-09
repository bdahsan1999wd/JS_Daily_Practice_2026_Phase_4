// PROBLEM-04: detectExpenseTrend()

// Logic: Tracks month-to-month % changes in expenses, then judges whether spending is escalating, shrinking, or stable — and projects what next month's expense might look like.

const detectExpenseTrend = (monthlyExpenses) => {

    // --- STEP 1: VALIDATION ---
    // need at least 3 months -> at least 2 consecutive changes to average
    if (!Array.isArray(monthlyExpenses) || monthlyExpenses.length < 3) return "Invalid Input";
    for (let i = 0; i < monthlyExpenses.length; i++) {
        const m = monthlyExpenses[i];
        if (!m || typeof m !== "object") return "Invalid Input";
        if (typeof m.month !== "string") return "Invalid Input";
        if (typeof m.totalAmount !== "number" || m.totalAmount <= 0) return "Invalid Input";
    }

    // --- STEP 2: COMPUTE CONSECUTIVE PERCENT CHANGES ---
    const changePercents = [];
    for (let i = 0; i < monthlyExpenses.length - 1; i++) {
        const current = monthlyExpenses[i].totalAmount;
        const next = monthlyExpenses[i + 1].totalAmount;
        changePercents.push(Number((((next - current) / current) * 100).toFixed(2)));
    }

    // --- STEP 3: AVERAGE MONTHLY CHANGE ---
    const averageMonthlyChange = Number(
        (changePercents.reduce((sum, c) => sum + c, 0) / changePercents.length).toFixed(2)
    );

    // --- STEP 4: ESCALATION FLAG (more than 5% growth on average) ---
    const isEscalating = averageMonthlyChange > 5;

    // --- STEP 5: PROJECT NEXT MONTH USING THE AVERAGE GROWTH RATE ---
    const lastMonthAmount = monthlyExpenses[monthlyExpenses.length - 1].totalAmount;
    const projectedNextMonth = Number((lastMonthAmount * (1 + averageMonthlyChange / 100)).toFixed(2));

    // --- STEP 6: TREND ALERT MESSAGE ---
    let trendAlert;
    if (isEscalating) {
        trendAlert = "WARNING: Expenses are escalating rapidly";
    } else if (averageMonthlyChange < -5) {
        trendAlert = "NOTICE: Expenses are decreasing significantly";
    } else {
        trendAlert = "Expenses are relatively stable";
    }

    // --- STEP 7: RETURN RESULT ---
    return { averageMonthlyChange, isEscalating, projectedNextMonth, trendAlert };
};

// --- EXAMPLE USAGE ---
console.log(detectExpenseTrend([
    { month: "Jan", totalAmount: 50000 },
    { month: "Feb", totalAmount: 55000 },
    { month: "Mar", totalAmount: 60500 }
]));