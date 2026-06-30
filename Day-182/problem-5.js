// PROBLEM-05: runAnalyticsDashboard()

// Logic: The "orchestrator" runs the equivalent logic of revenueReport(), bestCustomer(), and trendAnalyzer() on their respective datasets, then stitches the 3 results together into one executive summary sentence.

const runAnalyticsDashboard = (salesData, customerOrders, monthlyRevenue) => {

    // --- STEP 1: VALIDATE ALL THREE INPUT DATASETS ---

    // 1a) salesData (same shape as Problem-01)
    if (!Array.isArray(salesData) || salesData.length === 0) return "Invalid Input";
    for (let i = 0; i < salesData.length; i++) {
        const s = salesData[i];
        if (!s || typeof s !== "object") return "Invalid Input";
        if (typeof s.orderId !== "string") return "Invalid Input";
        if (typeof s.amount !== "number" || s.amount <= 0) return "Invalid Input";
        if (typeof s.region !== "string") return "Invalid Input";
        if (typeof s.month !== "string") return "Invalid Input";
    }

    // 1b) customerOrders (same shape as Problem-03)
    if (!Array.isArray(customerOrders) || customerOrders.length === 0) return "Invalid Input";
    for (let i = 0; i < customerOrders.length; i++) {
        const c = customerOrders[i];
        if (!c || typeof c !== "object") return "Invalid Input";
        if (typeof c.customerName !== "string" || c.customerName === "") return "Invalid Input";
        if (typeof c.orderAmount !== "number" || c.orderAmount <= 0) return "Invalid Input";
    }

    // 1c) monthlyRevenue (same shape as Problem-04, needs at least 2 entries)
    if (!Array.isArray(monthlyRevenue) || monthlyRevenue.length < 2) return "Invalid Input";
    for (let i = 0; i < monthlyRevenue.length; i++) {
        const m = monthlyRevenue[i];
        if (!m || typeof m !== "object") return "Invalid Input";
        if (typeof m.month !== "string") return "Invalid Input";
        if (typeof m.revenue !== "number" || m.revenue < 0) return "Invalid Input";
    }

    // --- STEP 2: BUILD REVENUE REPORT (inline equivalent of revenueReport, groupBy="region") ---
    const totalRevenue = salesData.reduce((sum, s) => sum + s.amount, 0);
    const transactionCount = salesData.length;
    const averageOrderValue = Number((totalRevenue / transactionCount).toFixed(2));

    const breakdown = {};
    for (let i = 0; i < salesData.length; i++) {
        const key = salesData[i].region;
        breakdown[key] = (breakdown[key] ?? 0) + salesData[i].amount;
    }

    const revenue = { totalRevenue, transactionCount, averageOrderValue, breakdown };

    // --- STEP 3: BUILD BEST CUSTOMER (inline equivalent of bestCustomer) ---
    const customerAggregateMap = {};
    for (let i = 0; i < customerOrders.length; i++) {
        const { customerName, orderAmount } = customerOrders[i];
        if (!customerAggregateMap[customerName]) {
            customerAggregateMap[customerName] = { customerName, totalSpent: 0, orderCount: 0 };
        }
        customerAggregateMap[customerName].totalSpent += orderAmount;
        customerAggregateMap[customerName].orderCount += 1;
    }

    const allCustomers = Object.values(customerAggregateMap);
    let topCustomerRaw = allCustomers[0];
    for (let i = 1; i < allCustomers.length; i++) {
        if (allCustomers[i].totalSpent > topCustomerRaw.totalSpent) {
            topCustomerRaw = allCustomers[i];
        }
    }

    const avgOrderValue = Number((topCustomerRaw.totalSpent / topCustomerRaw.orderCount).toFixed(2));

    let loyaltyTier;
    if (topCustomerRaw.orderCount >= 5) loyaltyTier = "VIP";
    else if (topCustomerRaw.orderCount >= 2) loyaltyTier = "REGULAR";
    else loyaltyTier = "NEW";

    const topCustomer = {
        bestCustomer: {
            customerName: topCustomerRaw.customerName,
            totalSpent: topCustomerRaw.totalSpent,
            orderCount: topCustomerRaw.orderCount,
            avgOrderValue
        },
        loyaltyTier
    };

    // --- STEP 4: BUILD TREND ANALYSIS (inline equivalent of trendAnalyzer) ---
    const monthlyGrowth = [];
    for (let i = 1; i < monthlyRevenue.length; i++) {
        const current = monthlyRevenue[i].revenue;
        const previous = monthlyRevenue[i - 1].revenue;
        let growthPercent;
        if (previous === 0) {
            growthPercent = null;
        } else {
            growthPercent = Number((((current - previous) / previous) * 100).toFixed(2));
        }
        monthlyGrowth.push({ month: monthlyRevenue[i].month, growthPercent });
    }

    const firstRevenue = monthlyRevenue[0].revenue;
    const lastRevenue = monthlyRevenue[monthlyRevenue.length - 1].revenue;
    let overallTrend;
    if (lastRevenue > firstRevenue) overallTrend = "UPWARD";
    else if (lastRevenue < firstRevenue) overallTrend = "DOWNWARD";
    else overallTrend = "STABLE";

    const trend = { monthlyGrowth, overallTrend };

    // --- STEP 5: BUILD THE EXECUTIVE SUMMARY SENTENCE ---
    // pulls one key value out of each of the 3 results above
    const executiveSummary = `Total revenue: ${revenue.totalRevenue}. Top customer: ${topCustomer.bestCustomer.customerName} (${topCustomer.loyaltyTier}). Trend: ${trend.overallTrend}.`;

    // --- STEP 6: RETURN FINAL DASHBOARD ---
    return { revenue, topCustomer, trend, executiveSummary };
};

// --- EXAMPLE USAGE ---
console.log(runAnalyticsDashboard(
    [
        { orderId: "O1", amount: 500, region: "Dhaka", month: "Jan" },
        { orderId: "O2", amount: 700, region: "Khulna", month: "Feb" }
    ],
    [
        { customerName: "Tania", orderAmount: 500 },
        { customerName: "Tania", orderAmount: 300 },
        { customerName: "Tania", orderAmount: 400 }
    ],
    [
        { month: "Jan", revenue: 10000 },
        { month: "Feb", revenue: 11000 }
    ]
));