// 🧩 PROBLEM–04: validateSalesTargets()

// Logic: This function tracks performance fulfillment, verifying compliance limits using every some testing methodologies and mapping identities to discrete status lists.

function validateSalesTargets(salesRecords) {

    // --- STEP 1: VALIDATION ---
    // Ensure array data types match expectations before executing array methods.
    if (!Array.isArray(salesRecords) || salesRecords.length === 0) {
        return "Invalid Input";
    }

    for (const record of salesRecords) {
        if (
            !record ||
            typeof record.salesperson !== "string" ||
            typeof record.totalSales !== "number" || record.totalSales < 0 ||
            typeof record.salesTarget !== "number" || record.salesTarget <= 0 ||
            typeof record.region !== "string"
        ) {
            return "Invalid Input";
        }
    }

    // --- STEP 2: ARRAY PREDICATE LOGIC EVALUATION ---
    const allTargetsMet = salesRecords.every(r => r.totalSales >= r.salesTarget);
    const anyTargetMissed = salesRecords.some(r => r.totalSales < r.salesTarget);

    const targetMetList = [];
    const targetMissedList = [];

    // Split records systematically into distinct target buckets
    salesRecords.forEach(r => {
        if (r.totalSales >= r.salesTarget) {
            targetMetList.push(r.salesperson);
        } else {
            targetMissedList.push(r.salesperson);
        }
    });

    // --- STEP 3: DISPATCH STATUS ARTIFACT ---
    return {
        allTargetsMet,
        anyTargetMissed,
        targetMetList,
        targetMissedList
    };
}

// --- EXAMPLE USAGE ---
console.log(
    validateSalesTargets([
        { salesperson: "Dina", totalSales: 300000, salesTarget: 250000, region: "East" },
        { salesperson: "Elan", totalSales: 100000, salesTarget: 200000, region: "West" },
        { salesperson: "Fara", totalSales: 400000, salesTarget: 400000, region: "North" }
    ])
);

console.log(
    validateSalesTargets([{ brokenObj: true }])
);