// PROBLEM-04: comparePeriodSales()

// Logic: Compares two periods' total sales and trend, then breaks the comparison down by category (covering categories that only appear in ONE of the two periods too).

const comparePeriodSales = (currentPeriod, previousPeriod) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(currentPeriod) || currentPeriod.length === 0) return "Invalid Input";
    if (!Array.isArray(previousPeriod) || previousPeriod.length === 0) return "Invalid Input";
    for (const arr of [currentPeriod, previousPeriod]) {
        for (let i = 0; i < arr.length; i++) {
            const r = arr[i];
            if (!r || typeof r !== "object") return "Invalid Input";
            if (typeof r.category !== "string") return "Invalid Input";
            if (typeof r.amount !== "number" || r.amount <= 0) return "Invalid Input";
        }
    }

    // --- STEP 2: COMPUTE TOTALS ---
    const currentTotal = currentPeriod.reduce((sum, r) => sum + r.amount, 0);
    const previousTotal = previousPeriod.reduce((sum, r) => sum + r.amount, 0);

    // --- STEP 3: CHANGE AMOUNT AND PERCENT ---
    const changeAmount = currentTotal - previousTotal;
    let changePercent;
    if (previousTotal === 0) {
        changePercent = null; // avoid division by zero
    } else {
        changePercent = Number(((changeAmount / previousTotal) * 100).toFixed(2));
    }

    // --- STEP 4: DETERMINE TREND ---
    let trend;
    if (changeAmount > 0) trend = "GROWTH";
    else if (changeAmount < 0) trend = "DECLINE";
    else trend = "FLAT";

    // --- STEP 5: PER-CATEGORY COMPARISON ---
    // sum amounts per category for EACH period separately
    const currentByCategory = {};
    for (let i = 0; i < currentPeriod.length; i++) {
        const { category, amount } = currentPeriod[i];
        currentByCategory[category] = (currentByCategory[category] ?? 0) + amount;
    }
    const previousByCategory = {};
    for (let i = 0; i < previousPeriod.length; i++) {
        const { category, amount } = previousPeriod[i];
        previousByCategory[category] = (previousByCategory[category] ?? 0) + amount;
    }

    // build the UNION of category names across both periods (no duplicates),
    // so a category that exists in only ONE period still gets a fair comparison
    const allCategories = [...new Set([...Object.keys(currentByCategory), ...Object.keys(previousByCategory)])];

    const categoryComparison = {};
    for (let i = 0; i < allCategories.length; i++) {
        const cat = allCategories[i];
        const current = currentByCategory[cat] ?? 0;  // 0 if missing from current period
        const previous = previousByCategory[cat] ?? 0; // 0 if missing from previous period
        categoryComparison[cat] = { current, previous, change: current - previous };
    }

    // --- STEP 6: RETURN RESULT ---
    return { currentTotal, previousTotal, changeAmount, changePercent, trend, categoryComparison };
};

// --- EXAMPLE USAGE ---
console.log(comparePeriodSales(
    [{ category: "Food", amount: 30000 }, { category: "Drinks", amount: 10000 }],
    [{ category: "Food", amount: 25000 }]
));