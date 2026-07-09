// PROBLEM-04: calculateChurnImpact()

// Logic: Measures churn from TWO angles — what fraction of customers left, vs. what fraction of REVENUE was lost (these can differ a lot if big-spending customers churn disproportionately).

const calculateChurnImpact = (customers) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(customers) || customers.length === 0) return "Invalid Input";
    for (let i = 0; i < customers.length; i++) {
        const c = customers[i];
        if (!c || typeof c !== "object") return "Invalid Input";
        if (typeof c.customerName !== "string") return "Invalid Input";
        if (typeof c.monthlyRevenue !== "number" || c.monthlyRevenue <= 0) return "Invalid Input";
        if (!["ACTIVE", "CHURNED"].includes(c.status)) return "Invalid Input";
    }

    // --- STEP 2: CUSTOMER-COUNT CHURN RATE ---
    const totalCustomers = customers.length;
    const churnedCustomers = customers.filter(c => c.status === "CHURNED").length;
    const churnRate = Number(((churnedCustomers / totalCustomers) * 100).toFixed(2));

    // --- STEP 3: SPLIT REVENUE BY STATUS ---
    const revenueLostToChurn = customers.filter(c => c.status === "CHURNED").reduce((sum, c) => sum + c.monthlyRevenue, 0);
    const remainingActiveRevenue = customers.filter(c => c.status === "ACTIVE").reduce((sum, c) => sum + c.monthlyRevenue, 0);

    // --- STEP 4: REVENUE-BASED CHURN RATE ---
    // this can be very different from the customer-COUNT churn rate above
    const revenueChurnRate = Number(((revenueLostToChurn / (revenueLostToChurn + remainingActiveRevenue)) * 100).toFixed(2));

    // --- STEP 5: SEVERITY CLASSIFICATION (based on revenue churn) ---
    let churnSeverity;
    if (revenueChurnRate >= 20) churnSeverity = "SEVERE";
    else if (revenueChurnRate >= 10) churnSeverity = "CONCERNING";
    else churnSeverity = "NORMAL";

    // --- STEP 6: RETURN RESULT ---
    return { churnRate, revenueLostToChurn, revenueChurnRate, churnSeverity };
};

// --- EXAMPLE USAGE ---
console.log(calculateChurnImpact([
    { customerName: "A", monthlyRevenue: 1000, status: "ACTIVE" },
    { customerName: "B", monthlyRevenue: 500, status: "CHURNED" },
    { customerName: "C", monthlyRevenue: 1500, status: "ACTIVE" },
    { customerName: "D", monthlyRevenue: 300, status: "CHURNED" }
]));