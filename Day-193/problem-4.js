// PROBLEM-04: detectAnomalies()

// Logic: Classic statistical anomaly detection anything more than `sensitivityMultiplier` standard deviations away from the mean gets flagged as an anomaly.

const detectAnomalies = (dataSeries, sensitivityMultiplier) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(dataSeries) || dataSeries.length < 4) return "Invalid Input";
    for (let i = 0; i < dataSeries.length; i++) {
        if (typeof dataSeries[i] !== "number" || isNaN(dataSeries[i])) return "Invalid Input";
    }
    if (typeof sensitivityMultiplier !== "number" || sensitivityMultiplier <= 0) return "Invalid Input";

    // --- STEP 2: MEAN ---
    const count = dataSeries.length;
    const rawMean = dataSeries.reduce((sum, x) => sum + x, 0) / count;
    const mean = Number(rawMean.toFixed(2));

    // --- STEP 3: STANDARD DEVIATION ---
    // uses the UNROUNDED mean internally for accurate variance math
    const variance = dataSeries.reduce((sum, x) => sum + Math.pow(x - rawMean, 2), 0) / count;
    const standardDeviation = Number(Math.sqrt(variance).toFixed(2));

    // --- STEP 4: COMPUTE UPPER/LOWER BOUNDS ---
    const upperBound = mean + (sensitivityMultiplier * standardDeviation);
    const lowerBound = mean - (sensitivityMultiplier * standardDeviation);

    // --- STEP 5: FLAG ANY VALUE OUTSIDE [lowerBound, upperBound] ---
    const anomalies = [];
    for (let i = 0; i < dataSeries.length; i++) {
        if (dataSeries[i] > upperBound || dataSeries[i] < lowerBound) {
            anomalies.push({ index: i, value: dataSeries[i] });
        }
    }

    // --- STEP 6: ANOMALY RATE ---
    const anomalyRate = Number(((anomalies.length / dataSeries.length) * 100).toFixed(2));

    // --- STEP 7: RETURN RESULT ---
    return { mean, standardDeviation, anomalies, anomalyRate };
};

// --- EXAMPLE USAGE ---
console.log(detectAnomalies([10, 12, 11, 13, 50, 9], 2));