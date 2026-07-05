// PROBLEM-05: buildMonthlyReport()

// Logic: Pulls everything together into one comprehensive report — revenue, target achievement, top category, and a letter grade.

const buildMonthlyReport = (salesRecords, monthlyTarget) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(salesRecords) || salesRecords.length === 0) return "Invalid Input";
    if (typeof monthlyTarget !== "number" || monthlyTarget <= 0) return "Invalid Input";
    for (let i = 0; i < salesRecords.length; i++) {
        const r = salesRecords[i];
        if (!r || typeof r !== "object") return "Invalid Input";
        if (typeof r.date !== "string") return "Invalid Input";
        if (typeof r.category !== "string") return "Invalid Input";
        if (typeof r.amount !== "number" || r.amount <= 0) return "Invalid Input";
    }

    // --- STEP 2: TOTAL REVENUE & TRANSACTION COUNT ---
    const totalRevenue = salesRecords.reduce((sum, r) => sum + r.amount, 0);
    const totalTransactions = salesRecords.length;

    // --- STEP 3: AVERAGE TRANSACTION VALUE ---
    const averageTransactionValue = Number((totalRevenue / totalTransactions).toFixed(2));

    // --- STEP 4: TARGET ACHIEVEMENT PERCENT ---
    const targetAchievementPercent = Number(((totalRevenue / monthlyTarget) * 100).toFixed(2));

    // --- STEP 5: FIND TOP CATEGORY (highest total sales) ---
    const categoryTotals = {};
    for (let i = 0; i < salesRecords.length; i++) {
        const { category, amount } = salesRecords[i];
        categoryTotals[category] = (categoryTotals[category] ?? 0) + amount;
    }
    let topCategory = null;
    let topCategoryAmount = -1;
    for (const cat in categoryTotals) {
        if (categoryTotals[cat] > topCategoryAmount) {
            topCategoryAmount = categoryTotals[cat];
            topCategory = cat;
        }
    }

    // --- STEP 6: DETERMINE PERFORMANCE GRADE ---
    let performanceGrade;
    if (targetAchievementPercent >= 100) performanceGrade = "A";
    else if (targetAchievementPercent >= 80) performanceGrade = "B";
    else if (targetAchievementPercent >= 60) performanceGrade = "C";
    else performanceGrade = "D";

    // --- STEP 7: BUILD THE REPORT SUMMARY SENTENCE ---
    const reportSummary = `Total revenue ${totalRevenue} from ${totalTransactions} transaction(s). Target achievement: ${targetAchievementPercent}% (Grade ${performanceGrade}). Top category: ${topCategory}.`;

    // --- STEP 8: RETURN FINAL RESULT ---
    return {
        totalRevenue,
        totalTransactions,
        averageTransactionValue,
        targetAchievementPercent,
        topCategory,
        performanceGrade,
        reportSummary
    };
};

// --- EXAMPLE USAGE ---
console.log(buildMonthlyReport([
    { date: "2025-01-01", category: "Electronics", amount: 50000 },
    { date: "2025-01-02", category: "Clothing", amount: 20000 },
    { date: "2025-01-03", category: "Electronics", amount: 30000 }
], 90000));