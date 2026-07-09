// PROBLEM-03: analyzeRevenueConcentration()

// Logic: Checks how dependent total revenue is on just the top 3 customers — high concentration means more business risk if even one of them leaves.

const analyzeRevenueConcentration = (customerRevenue) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(customerRevenue) || customerRevenue.length === 0) return "Invalid Input";
    for (let i = 0; i < customerRevenue.length; i++) {
        const c = customerRevenue[i];
        if (!c || typeof c !== "object") return "Invalid Input";
        if (typeof c.customerName !== "string") return "Invalid Input";
        if (typeof c.revenue !== "number" || c.revenue <= 0) return "Invalid Input";
    }

    // --- STEP 2: TOTAL REVENUE ---
    const totalRevenue = customerRevenue.reduce((sum, c) => sum + c.revenue, 0);

    // --- STEP 3: SORT CUSTOMERS DESCENDING BY REVENUE (on a COPY, no mutation) ---
    const sorted = [...customerRevenue].sort((a, b) => b.revenue - a.revenue);

    // --- STEP 4: TOP 3 CUSTOMERS (slice safely handles fewer than 3 too) ---
    const topN = sorted.slice(0, 3);
    const top3Revenue = topN.reduce((sum, c) => sum + c.revenue, 0);
    const topCustomers = topN.map(c => c.customerName);

    // --- STEP 5: CONCENTRATION PERCENT ---
    const top3ConcentrationPercent = Number(((top3Revenue / totalRevenue) * 100).toFixed(2));

    // --- STEP 6: RISK CLASSIFICATION ---
    let concentrationRisk;
    if (top3ConcentrationPercent >= 70) concentrationRisk = "HIGH_RISK";
    else if (top3ConcentrationPercent >= 40) concentrationRisk = "MODERATE_RISK";
    else concentrationRisk = "LOW_RISK";

    // --- STEP 7: RETURN RESULT ---
    return { totalRevenue, top3ConcentrationPercent, concentrationRisk, topCustomers };
};

// --- EXAMPLE USAGE ---
console.log(analyzeRevenueConcentration([
    { customerName: "BigCorp", revenue: 50000 },
    { customerName: "MidCo", revenue: 20000 },
    { customerName: "SmallBiz", revenue: 10000 },
    { customerName: "TinyShop", revenue: 5000 }
]));