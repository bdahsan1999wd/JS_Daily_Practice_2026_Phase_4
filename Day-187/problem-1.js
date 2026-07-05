// PROBLEM-01: aggregateDailySales()

// Logic: Groups transactions by date, computes per-day totals/counts, and identifies which day had the best vs worst total sales.

const aggregateDailySales = (transactions) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(transactions) || transactions.length === 0) return "Invalid Input";
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // enforces "YYYY-MM-DD" shape
    for (let i = 0; i < transactions.length; i++) {
        const t = transactions[i];
        if (!t || typeof t !== "object") return "Invalid Input";
        if (typeof t.date !== "string" || !dateRegex.test(t.date)) return "Invalid Input";
        if (typeof t.amount !== "number" || t.amount <= 0) return "Invalid Input";
    }

    // --- STEP 2: GROUP TRANSACTIONS BY DATE ---
    const dailyBreakdown = {};
    for (let i = 0; i < transactions.length; i++) {
        const { date, amount } = transactions[i];
        if (!dailyBreakdown[date]) {
            dailyBreakdown[date] = { totalSales: 0, transactionCount: 0 };
        }
        dailyBreakdown[date].totalSales += amount;
        dailyBreakdown[date].transactionCount += 1;
    }

    // --- STEP 3: FIND THE BEST AND WORST DAY BY totalSales ---
    let bestDay = null;
    let worstDay = null;
    for (const date in dailyBreakdown) {
        if (bestDay === null || dailyBreakdown[date].totalSales > dailyBreakdown[bestDay].totalSales) {
            bestDay = date;
        }
        if (worstDay === null || dailyBreakdown[date].totalSales < dailyBreakdown[worstDay].totalSales) {
            worstDay = date;
        }
    }

    // --- STEP 4: RETURN RESULT ---
    return { dailyBreakdown, bestDay, worstDay };
};

// --- EXAMPLE USAGE ---
console.log(aggregateDailySales([
    { date: "2025-01-01", amount: 500 },
    { date: "2025-01-01", amount: 300 },
    { date: "2025-01-02", amount: 200 }
]));