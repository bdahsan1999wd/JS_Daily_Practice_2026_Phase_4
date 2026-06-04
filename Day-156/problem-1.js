// 🧩 PROBLEM–01: calculateSalesCommission()

// Logic: This function maps over an array of sales records, identifies the specific commission rate using a slab matrix, evaluates payouts, and returns the enriched data sets.

function calculateSalesCommission(salesRecords) {

    // --- STEP 1: VALIDATION ---
    // Ensure salesRecords is a non-empty array data structure.
    if (!Array.isArray(salesRecords) || salesRecords.length === 0) {
        return "Invalid Input";
    }

    // Verify properties for every sales block configuration.
    for (const record of salesRecords) {
        if (
            !record ||
            typeof record.salesperson !== "string" ||
            typeof record.region !== "string" ||
            typeof record.totalSales !== "number" || record.totalSales < 0
        ) {
            return "Invalid Input";
        }
    }

    // --- STEP 2: SLAB MAP CALCULATION ---
    return salesRecords.map(record => {
        const { salesperson, region, totalSales } = record;
        let commissionRate = 2;

        // Apply progressive tier brackets based on sales scale
        if (totalSales > 500000) {
            commissionRate = 15;
        } else if (totalSales >= 200001) {
            commissionRate = 10;
        } else if (totalSales >= 100001) {
            commissionRate = 7;
        } else if (totalSales >= 50001) {
            commissionRate = 5;
        }

        const commissionAmount = (totalSales * commissionRate) / 100;
        const takeHome = totalSales + commissionAmount;

        // --- STEP 3: RETURN FORMATTED INTERACTION DATA ---
        return {
            salesperson,
            region,
            totalSales: Number(totalSales.toFixed(2)),
            commissionRate,
            commissionAmount: Number(commissionAmount.toFixed(2)),
            takeHome: Number(takeHome.toFixed(2))
        };
    });
}

// --- EXAMPLE USAGE ---
console.log(
    calculateSalesCommission([
        { salesperson: "Rafiq", region: "North", totalSales: 250000 },
        { salesperson: "Mili", region: "South", totalSales: 45000 }
    ])
);

console.log(
    calculateSalesCommission("wrong data format type")
);