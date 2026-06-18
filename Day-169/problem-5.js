// 🧩 PROBLEM–05: analyzeResponseBatch()

// Logic: Flattens separated batch log arrays into one single collection via spread parameters. It reviews execution records, computes processing speeds, and counts unique response statuses.

const analyzeResponseBatch = (...batches) => {

    // --- STEP 1: HIGH-LEVEL REST PARAMETER CHECKS ---
    if (!batches || batches.length === 0) {
        return "Invalid Input";
    }

    // Confirm that every argument is a valid array
    for (let i = 0; i < batches.length; i++) {
        if (!Array.isArray(batches[i])) {
            return "Invalid Input";
        }
    }

    // --- STEP 2: FLATTEN SCATTERED FILES VIA SPREAD ---
    const totalFlatArchive = [];
    batches.forEach(individualBatch => {
        totalFlatArchive.push(...individualBatch);
    });

    if (totalFlatArchive.length === 0) {
        return "Invalid Input";
    }

    // --- STEP 3: AGGREGATE STATS PASS ---
    const totalResponses = totalFlatArchive.length;
    let successCount = 0;
    let failureCount = 0;
    let totalProcessingTime = 0;
    const statusBreakdown = {};

    for (let i = 0; i < totalResponses; i++) {
        const item = totalFlatArchive[i];

        if (!item || typeof item !== "object" || Array.isArray(item)) {
            return "Invalid Input";
        }

        // Apply path lookup operations securely using clean primitives
        const statusCode = item.statusCode ?? 200;
        const processingTime = item.meta?.processingTime ?? 0;
        const success = item.success ?? true;

        if (
            typeof statusCode !== "number" || isNaN(statusCode) ||
            typeof processingTime !== "number" || isNaN(processingTime) ||
            typeof success !== "boolean"
        ) {
            return "Invalid Input";
        }

        // Trace status occurrences
        statusBreakdown[statusCode] = (statusBreakdown[statusCode] ?? 0) + 1;

        if (success === true) {
            successCount += 1;
        } else {
            failureCount += 1;
        }

        totalProcessingTime += processingTime;
    }

    // --- STEP 4: SCALE VALUES & COMPUTE MEAN RATIOS ---
    const successRate = Number(((successCount / totalResponses) * 100).toFixed(2));
    const avgProcessingTime = Number((totalProcessingTime / totalResponses).toFixed(2));

    return {
        totalResponses,
        successCount,
        failureCount,
        successRate,
        avgProcessingTime,
        statusBreakdown,
        batchCount: batches.length
    };
};

// --- EXAMPLE USAGE ---
console.log(analyzeResponseBatch(
    [
        { statusCode: 200, meta: { processingTime: 120 }, success: true },
        { statusCode: 500, meta: { processingTime: 300 }, success: false }
    ],
    [
        { statusCode: 200, meta: { processingTime: 80 }, success: true },
        { statusCode: 404, success: false }
    ]
));