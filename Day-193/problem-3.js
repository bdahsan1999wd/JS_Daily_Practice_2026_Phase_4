// PROBLEM-03: findMetricCorrelation()

// Logic: A simplified directional correlation — just checks whether two metrics tend to rise/fall TOGETHER across consecutive periods, without doing full Pearson correlation math.

const findMetricCorrelation = (dataPoints) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(dataPoints) || dataPoints.length < 3) return "Invalid Input";
    for (let i = 0; i < dataPoints.length; i++) {
        const d = dataPoints[i];
        if (!d || typeof d !== "object") return "Invalid Input";
        if (typeof d.period !== "string") return "Invalid Input";
        if (typeof d.metricA !== "number") return "Invalid Input";
        if (typeof d.metricB !== "number") return "Invalid Input";
    }

    // --- STEP 2: COMPARE DIRECTION OF CHANGE FOR EACH CONSECUTIVE PAIR ---
    let sameDirectionCount = 0;
    let oppositeDirectionCount = 0;

    for (let i = 0; i < dataPoints.length - 1; i++) {
        const deltaA = dataPoints[i + 1].metricA - dataPoints[i].metricA;
        const deltaB = dataPoints[i + 1].metricB - dataPoints[i].metricB;

        // both went up, or both went down => moving in the SAME direction
        const sameDirection = (deltaA > 0 && deltaB > 0) || (deltaA < 0 && deltaB < 0);
        // one up, one down => moving in OPPOSITE directions
        const oppositeDirection = (deltaA > 0 && deltaB < 0) || (deltaA < 0 && deltaB > 0);

        if (sameDirection) sameDirectionCount++;
        else if (oppositeDirection) oppositeDirectionCount++;
        // (a zero delta in either metric counts as neither same nor opposite)
    }

    // --- STEP 3: CORRELATION STRENGTH ---
    const totalComparisons = dataPoints.length - 1;
    const correlationStrength = Number(((sameDirectionCount / totalComparisons) * 100).toFixed(2));

    // --- STEP 4: RELATIONSHIP CLASSIFICATION ---
    let relationship;
    if (correlationStrength >= 70) relationship = "STRONG_POSITIVE";
    else if (correlationStrength >= 40) relationship = "WEAK_POSITIVE";
    else relationship = "NEGATIVE_OR_NONE";

    // --- STEP 5: RETURN RESULT ---
    return { sameDirectionCount, oppositeDirectionCount, correlationStrength, relationship };
};

// --- EXAMPLE USAGE ---
console.log(findMetricCorrelation([
    { period: "P1", metricA: 100, metricB: 50 },
    { period: "P2", metricA: 120, metricB: 60 },
    { period: "P3", metricA: 110, metricB: 55 },
    { period: "P4", metricA: 130, metricB: 70 }
]));