// PROBLEM-01: revenueReport()

// Logic: Summarizes total/average revenue from sales data, and breaks it down into groups (by region or by month).

const revenueReport = (salesData, groupBy) => {

    // --- STEP 1: VALIDATION ---
    // 1a) salesData must be a non-empty array
    if (!Array.isArray(salesData) || salesData.length === 0) return "Invalid Input";
    // 1b) groupBy must be one of the 2 allowed grouping fields
    if (groupBy !== "region" && groupBy !== "month") return "Invalid Input";
    // 1c) validate the shape of every sales record
    for (let i = 0; i < salesData.length; i++) {
        const s = salesData[i];
        if (!s || typeof s !== "object") return "Invalid Input";
        if (typeof s.orderId !== "string") return "Invalid Input";
        if (typeof s.amount !== "number" || s.amount <= 0) return "Invalid Input";
        if (typeof s.region !== "string") return "Invalid Input";
        if (typeof s.month !== "string") return "Invalid Input";
    }

    // --- STEP 2: TOTAL REVENUE & TRANSACTION COUNT ---
    const totalRevenue = salesData.reduce((sum, s) => sum + s.amount, 0);
    const transactionCount = salesData.length;

    // --- STEP 3: AVERAGE ORDER VALUE ---
    const averageOrderValue = Number((totalRevenue / transactionCount).toFixed(2));

    // --- STEP 4: BUILD BREAKDOWN GROUPED BY THE CHOSEN FIELD ---
    // dynamically use either "region" or "month" as the grouping key
    const breakdown = {};
    for (let i = 0; i < salesData.length; i++) {
        const key = salesData[i][groupBy];
        breakdown[key] = (breakdown[key] ?? 0) + salesData[i].amount;
    }

    // --- STEP 5: RETURN RESULT ---
    return { totalRevenue, transactionCount, averageOrderValue, breakdown };
};

// --- EXAMPLE USAGE ---
console.log(revenueReport([
    { orderId: "O1", amount: 500, region: "Dhaka", month: "Jan" },
    { orderId: "O2", amount: 300, region: "Khulna", month: "Jan" },
    { orderId: "O3", amount: 700, region: "Dhaka", month: "Feb" }
], "region"));