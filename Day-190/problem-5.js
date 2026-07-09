// PROBLEM-05: buildRevenueHealthReport()

// Logic: Compares two months of customer revenue to identify NEW customers, LOST customers, and RETAINED customers (using set operations on customer names), then grades overall account health from growth + retention together.

const buildRevenueHealthReport = (currentMonthRevenue, previousMonthRevenue) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(currentMonthRevenue) || currentMonthRevenue.length === 0) return "Invalid Input";
    if (!Array.isArray(previousMonthRevenue) || previousMonthRevenue.length === 0) return "Invalid Input";
    for (const arr of [currentMonthRevenue, previousMonthRevenue]) {
        for (let i = 0; i < arr.length; i++) {
            const c = arr[i];
            if (!c || typeof c !== "object") return "Invalid Input";
            if (typeof c.customerName !== "string") return "Invalid Input";
            if (typeof c.revenue !== "number" || c.revenue <= 0) return "Invalid Input";
        }
    }

    // --- STEP 2: TOTALS & GROWTH PERCENT ---
    const currentTotal = currentMonthRevenue.reduce((sum, c) => sum + c.revenue, 0);
    const previousTotal = previousMonthRevenue.reduce((sum, c) => sum + c.revenue, 0);
    const growthPercent = Number((((currentTotal - previousTotal) / previousTotal) * 100).toFixed(2));

    // --- STEP 3: BUILD A SET OF CUSTOMER NAMES FOR EACH PERIOD ---
    // Sets make "is this name in the other period?" lookups fast and clean
    const currentNames = new Set(currentMonthRevenue.map(c => c.customerName));
    const previousNames = new Set(previousMonthRevenue.map(c => c.customerName));

    // --- STEP 4: CLASSIFY CUSTOMERS AS NEW / LOST / RETAINED ---
    const newCustomers = [...currentNames].filter(name => !previousNames.has(name));   // in current, not in previous
    const lostCustomers = [...previousNames].filter(name => !currentNames.has(name));  // in previous, not in current
    const retainedCustomers = [...currentNames].filter(name => previousNames.has(name)); // in BOTH

    // --- STEP 5: RETENTION RATE ---
    // measured against the PREVIOUS period's distinct customer count
    const retentionRate = Number(((retainedCustomers.length / previousNames.size) * 100).toFixed(2));

    // --- STEP 6: DETERMINE HEALTH STATUS ---
    let healthStatus;
    if (growthPercent >= 10 && retentionRate >= 80) {
        healthStatus = "THRIVING";
    } else if (growthPercent >= 0 && retentionRate >= 60) {
        healthStatus = "STABLE";
    } else {
        healthStatus = "AT_RISK";
    }

    // --- STEP 7: RETURN FINAL RESULT ---
    return {
        currentTotal,
        previousTotal,
        growthPercent,
        newCustomers,
        lostCustomers,
        retentionRate,
        healthStatus
    };
};

// --- EXAMPLE USAGE ---
console.log(buildRevenueHealthReport(
    [{ customerName: "A", revenue: 1000 }, { customerName: "B", revenue: 2000 }, { customerName: "C", revenue: 500 }],
    [{ customerName: "A", revenue: 900 }, { customerName: "B", revenue: 1800 }, { customerName: "D", revenue: 700 }]
));