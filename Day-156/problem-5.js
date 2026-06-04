// 🧩 PROBLEM–05: generateSalesLeaderboard()

// Logic: This function transforms performance indicators to yield tiered status titles, uses composite conditions to break descending sorting ties, and numbers rank scores.

function generateSalesLeaderboard(salesRecords) {

    // --- STEP 1: VALIDATION ---
    // Enforce base layer structural checks on top-level input parameters.
    if (!Array.isArray(salesRecords) || salesRecords.length === 0) {
        return "Invalid Input";
    }

    for (const record of salesRecords) {
        if (
            !record ||
            typeof record.salesperson !== "string" ||
            typeof record.region !== "string" ||
            typeof record.totalSales !== "number" || record.totalSales < 0 ||
            typeof record.dealsCount !== "number" || !Number.isInteger(record.dealsCount) || record.dealsCount < 0
        ) {
            return "Invalid Input";
        }
    }

    // --- STEP 2: EXPAND SCHEMAS WITH TITLES ---
    const processedRecords = salesRecords.map(record => {
        let title = "TRAINEE";

        if (record.totalSales > 500000) {
            title = "STAR SELLER";
        } else if (record.totalSales >= 200001) {
            title = "TOP PERFORMER";
        } else if (record.totalSales >= 100001) {
            title = "ACHIEVER";
        } else if (record.totalSales >= 50001) {
            title = "CONTENDER";
        }

        return {
            salesperson: record.salesperson,
            region: record.region,
            totalSales: Number(record.totalSales.toFixed(2)),
            dealsCount: record.dealsCount, // Kept temporarily to compute tie sorting logic
            title
        };
    });

    // --- STEP 3: DOUBLE SORT ON TOTAL SALES & VOLUME COUNTS ---
    processedRecords.sort((a, b) => {
        if (b.totalSales !== a.totalSales) {
            return b.totalSales - a.totalSales;
        }
        return b.dealsCount - a.dealsCount;
    });

    // --- STEP 4: ASSIGN RANKINGS STABILIZING EQUAL ENTRIES ---
    let assignedRank = 1;
    for (let i = 0; i < processedRecords.length; i++) {
        if (i > 0) {
            const current = processedRecords[i];
            const previous = processedRecords[i - 1];

            // If primary total sales or tiebreaker volume parameters differ, step up the ranking group
            if (current.totalSales !== previous.totalSales || current.dealsCount !== previous.dealsCount) {
                assignedRank = i + 1;
            }
        }
        processedRecords[i].rank = assignedRank;
        delete processedRecords[i].dealsCount; // Prune tracking helpers from output matrix
    }

    return processedRecords;
}

// --- EXAMPLE USAGE ---
console.log(
    generateSalesLeaderboard([
        { salesperson: "Gani", region: "North", totalSales: 600000, dealsCount: 30 },
        { salesperson: "Hana", region: "East", totalSales: 180000, dealsCount: 15 },
        { salesperson: "Ivan", region: "West", totalSales: 180000, dealsCount: 20 }
    ])
);

console.log(
    generateSalesLeaderboard([])
);