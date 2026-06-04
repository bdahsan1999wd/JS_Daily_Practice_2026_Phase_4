// 🧩 PROBLEM–03: generateMonthlySummary()

// Logic: This function evaluates global revenue matrix elements, establishes statistical means, catches extreme margins, and breaks down aggregates via categorized dictionaries.

function generateMonthlySummary(salesRecords) {

    // --- STEP 1: VALIDATION ---
    // Ensure collection parameter is populated correctly.
    if (!Array.isArray(salesRecords) || salesRecords.length === 0) {
        return "Invalid Input";
    }

    for (const record of salesRecords) {
        if (
            !record ||
            typeof record.salesperson !== "string" ||
            typeof record.region !== "string" ||
            typeof record.totalSales !== "number" || record.totalSales < 0 ||
            typeof record.month !== "string"
        ) {
            return "Invalid Input";
        }
    }

    // --- STEP 2: ALLOCATE COMPILATION DICTIONARIES ---
    let totalRevenue = 0;
    let topSalesperson = salesRecords[0];
    let worstSalesperson = salesRecords[0];

    const regionWiseRevenue = {};
    const monthWiseRevenue = {};

    // --- STEP 3: PERFORM MATRIX REDUCTION LOOP ---
    salesRecords.forEach(record => {
        const sales = record.totalSales;
        totalRevenue += sales;

        // Perform maximum/minimum parameter check boundary sweeps
        if (sales > topSalesperson.totalSales) topSalesperson = record;
        if (sales < worstSalesperson.totalSales) worstSalesperson = record;

        // Build dynamic region aggregates
        if (!regionWiseRevenue[record.region]) regionWiseRevenue[record.region] = 0;
        regionWiseRevenue[record.region] += sales;

        // Build dynamic month aggregates
        if (!monthWiseRevenue[record.month]) monthWiseRevenue[record.month] = 0;
        monthWiseRevenue[record.month] += sales;
    });

    // Format all segmented sub-objects to 2 decimal places
    for (const r in regionWiseRevenue) regionWiseRevenue[r] = Number(regionWiseRevenue[r].toFixed(2));
    for (const m in monthWiseRevenue) monthWiseRevenue[m] = Number(monthWiseRevenue[m].toFixed(2));

    // --- STEP 4: DELIVER REPORT INTERFACE ---
    return {
        totalRevenue: Number(totalRevenue.toFixed(2)),
        averageSales: Number((totalRevenue / salesRecords.length).toFixed(2)),
        topSalesperson: { ...topSalesperson },
        worstSalesperson: { ...worstSalesperson },
        regionWiseRevenue,
        monthWiseRevenue
    };
}

// --- EXAMPLE USAGE ---
console.log(
    generateMonthlySummary([
        { salesperson: "Arif", region: "North", totalSales: 200000, month: "January" },
        { salesperson: "Bela", region: "South", totalSales: 150000, month: "January" },
        { salesperson: "Cena", region: "North", totalSales: 350000, month: "February" }
    ])
);

console.log(
    generateMonthlySummary(null)
);