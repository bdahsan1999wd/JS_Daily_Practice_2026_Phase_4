// PROBLEM-01: aggregateRevenueStreams()

// Logic: Sums revenue per stream, and splits total revenue into recurring vs one-time categories based on isRecurring flag.

const aggregateRevenueStreams = (revenueEntries) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(revenueEntries) || revenueEntries.length === 0) return "Invalid Input";
    for (let i = 0; i < revenueEntries.length; i++) {
        const e = revenueEntries[i];
        if (!e || typeof e !== "object") return "Invalid Input";
        if (typeof e.streamName !== "string" || e.streamName === "") return "Invalid Input";
        if (typeof e.amount !== "number" || e.amount <= 0) return "Invalid Input";
        if (typeof e.isRecurring !== "boolean") return "Invalid Input";
    }

    // --- STEP 2: ACCUMULATE TOTALS IN A SINGLE PASS ---
    // builds the per-stream breakdown AND the recurring/one-time split
    // at the same time, instead of looping over the array multiple times
    const streamBreakdown = {};
    let totalRevenue = 0;
    let recurringRevenue = 0;
    let oneTimeRevenue = 0;

    for (let i = 0; i < revenueEntries.length; i++) {
        const { streamName, amount, isRecurring } = revenueEntries[i];
        streamBreakdown[streamName] = (streamBreakdown[streamName] ?? 0) + amount;
        totalRevenue += amount;
        if (isRecurring) {
            recurringRevenue += amount;
        } else {
            oneTimeRevenue += amount;
        }
    }

    // --- STEP 3: COMPUTE RECURRING PERCENT ---
    const recurringPercent = Number(((recurringRevenue / totalRevenue) * 100).toFixed(2));

    // --- STEP 4: RETURN RESULT ---
    return { totalRevenue, recurringRevenue, oneTimeRevenue, recurringPercent, streamBreakdown };
};

// --- EXAMPLE USAGE ---
console.log(aggregateRevenueStreams([
    { streamName: "Subscriptions", amount: 50000, isRecurring: true },
    { streamName: "Ads", amount: 20000, isRecurring: true },
    { streamName: "OneTimeSales", amount: 30000, isRecurring: false }
]));