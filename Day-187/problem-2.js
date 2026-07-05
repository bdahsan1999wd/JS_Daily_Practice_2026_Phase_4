// PROBLEM-02: calculateCategoryKPI()

// Logic: For every category that appears in the sales data, compares actual sales against its monthly target and grades performance.

const calculateCategoryKPI = (salesRecords, monthlyTargets) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(salesRecords) || salesRecords.length === 0) return "Invalid Input";
    if (typeof monthlyTargets !== "object" || monthlyTargets === null || Array.isArray(monthlyTargets)) {
        return "Invalid Input";
    }
    for (let i = 0; i < salesRecords.length; i++) {
        const r = salesRecords[i];
        if (!r || typeof r !== "object") return "Invalid Input";
        if (typeof r.category !== "string") return "Invalid Input";
        if (typeof r.amount !== "number" || r.amount <= 0) return "Invalid Input";
    }
    for (const key in monthlyTargets) {
        if (typeof monthlyTargets[key] !== "number" || monthlyTargets[key] <= 0) return "Invalid Input";
    }

    // --- STEP 2: SUM ACTUAL SALES PER CATEGORY ---
    const actualSalesMap = {};
    for (let i = 0; i < salesRecords.length; i++) {
        const { category, amount } = salesRecords[i];
        actualSalesMap[category] = (actualSalesMap[category] ?? 0) + amount;
    }

    // --- STEP 3: BUILD KPI RESULT FOR EACH CATEGORY ---
    const result = {};
    for (const category in actualSalesMap) {
        const actualSales = actualSalesMap[category];
        // categories with no set target fall back to 0 (means "no target set")
        const target = monthlyTargets[category] ?? 0;

        let achievementPercent;
        if (target === 0) {
            achievementPercent = null; // avoid division by zero
        } else {
            achievementPercent = Number(((actualSales / target) * 100).toFixed(2));
        }

        let kpiStatus;
        if (achievementPercent === null) kpiStatus = "NO_TARGET_SET";
        else if (achievementPercent >= 100) kpiStatus = "TARGET_MET";
        else if (achievementPercent >= 75) kpiStatus = "ON_TRACK";
        else kpiStatus = "BEHIND";

        result[category] = { actualSales, target, achievementPercent, kpiStatus };
    }

    // --- STEP 4: RETURN RESULT ---
    return result;
};

// --- EXAMPLE USAGE ---
console.log(calculateCategoryKPI([
    { category: "Electronics", amount: 50000 },
    { category: "Electronics", amount: 30000 },
    { category: "Clothing", amount: 15000 }
], { Electronics: 100000, Clothing: 20000 }));