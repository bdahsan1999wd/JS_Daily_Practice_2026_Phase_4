// PROBLEM-03: calculateSalesStatistics()

// Logic: Computes standard descriptive statistics — mean, median, variance, standard deviation, and range — for a list of sales amounts.

const calculateSalesStatistics = (salesAmounts) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(salesAmounts) || salesAmounts.length === 0) return "Invalid Input";
    for (let i = 0; i < salesAmounts.length; i++) {
        if (typeof salesAmounts[i] !== "number" || salesAmounts[i] <= 0) return "Invalid Input";
    }

    // --- STEP 2: MEAN ---
    const count = salesAmounts.length;
    const sum = salesAmounts.reduce((acc, val) => acc + val, 0);
    const mean = Number((sum / count).toFixed(2));

    // --- STEP 3: MEDIAN ---
    // sort a COPY (never mutate the original array)
    const sorted = [...salesAmounts].sort((a, b) => a - b);
    const midIndex = Math.floor(sorted.length / 2);
    let median;
    if (sorted.length % 2 === 0) {
        // even count -> average of the two middle values
        median = (sorted[midIndex - 1] + sorted[midIndex]) / 2;
    } else {
        // odd count -> the single middle value
        median = sorted[midIndex];
    }

    // --- STEP 4: VARIANCE ---
    // use the UNROUNDED mean here for accuracy, only round the final variance value
    const rawMean = sum / count;
    const squaredDiffsSum = salesAmounts.reduce((acc, val) => acc + Math.pow(val - rawMean, 2), 0);
    const variance = Number((squaredDiffsSum / count).toFixed(2));

    // --- STEP 5: STANDARD DEVIATION (square root of variance) ---
    const standardDeviation = Number(Math.sqrt(variance).toFixed(2));

    // --- STEP 6: RANGE (max - min) ---
    const range = Math.max(...salesAmounts) - Math.min(...salesAmounts);

    // --- STEP 7: RETURN RESULT ---
    return { mean, median, variance, standardDeviation, range };
};

// --- EXAMPLE USAGE ---
console.log(calculateSalesStatistics([100, 200, 300, 400, 500]));