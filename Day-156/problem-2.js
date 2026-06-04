// 🧩 PROBLEM–02: filterSalesByRegionAndTarget()

// Logic: This function screens logs via case-insensitive geographic locations, removes data items below specified target totals, and ranks results descending.

function filterSalesByRegionAndTarget(salesRecords, region, targetAmount) {

    // --- STEP 1: VALIDATION ---
    // Ensure structural arguments match their required baseline signatures.
    if (
        !Array.isArray(salesRecords) || salesRecords.length === 0 ||
        typeof region !== "string" || region.trim() === "" ||
        typeof targetAmount !== "number" || targetAmount < 0
    ) {
        return "Invalid Input";
    }

    // Internal record attribute schema verification loop.
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

    // --- STEP 2: EXECUTE FILTER AND STRUCTURAL SORT ---
    const lowerRegion = region.toLowerCase();

    return salesRecords
        .filter(record => record.region.toLowerCase() === lowerRegion && record.totalSales >= targetAmount)
        .sort((a, b) => b.totalSales - a.totalSales);
}

// --- EXAMPLE USAGE ---
console.log(
    filterSalesByRegionAndTarget([
        { salesperson: "Alam", region: "North", totalSales: 300000, month: "January" },
        { salesperson: "Bina", region: "North", totalSales: 80000, month: "February" },
        { salesperson: "Cyrus", region: "South", totalSales: 500000, month: "January" }
    ], "north", 100000)
);

console.log(
    filterSalesByRegionAndTarget([], "South", -50)
);