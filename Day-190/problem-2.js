// PROBLEM-02: calculateMRRGrowth()

// Logic: Computes monthly recurring revenue (MRR) for each month (existing + new - churned), then tracks how that total grows from one month to the next.

const calculateMRRGrowth = (monthlyMRR) => {

    // --- STEP 1: VALIDATION ---
    // need at least 2 months to compute even ONE growth percent
    if (!Array.isArray(monthlyMRR) || monthlyMRR.length < 2) return "Invalid Input";
    for (let i = 0; i < monthlyMRR.length; i++) {
        const m = monthlyMRR[i];
        if (!m || typeof m !== "object") return "Invalid Input";
        if (typeof m.month !== "string") return "Invalid Input";
        if (typeof m.newMRR !== "number" || m.newMRR < 0) return "Invalid Input";
        if (typeof m.churnedMRR !== "number" || m.churnedMRR < 0) return "Invalid Input";
        if (typeof m.existingMRR !== "number" || m.existingMRR < 0) return "Invalid Input";
    }

    // --- STEP 2: COMPUTE totalMRR & netNewMRR FOR EACH MONTH ---
    const monthlyBreakdown = monthlyMRR.map(m => {
        const totalMRR = m.existingMRR + m.newMRR - m.churnedMRR;
        const netNewMRR = m.newMRR - m.churnedMRR;
        return { month: m.month, totalMRR, netNewMRR };
    });

    // --- STEP 3: COMPUTE MONTH-OVER-MONTH GROWTH (starting from the 2nd month) ---
    const growthPercents = [];
    for (let i = 1; i < monthlyBreakdown.length; i++) {
        const current = monthlyBreakdown[i].totalMRR;
        const previous = monthlyBreakdown[i - 1].totalMRR;
        if (previous === 0) {
            growthPercents.push(null); // avoid division by zero
        } else {
            growthPercents.push(Number((((current - previous) / previous) * 100).toFixed(2)));
        }
    }

    // --- STEP 4: AVERAGE GROWTH RATE (skip any nulls) ---
    const validGrowths = growthPercents.filter(g => g !== null);
    let averageGrowthRate;
    if (validGrowths.length === 0) {
        averageGrowthRate = null; // every month had a zero-previous edge case
    } else {
        averageGrowthRate = Number((validGrowths.reduce((sum, g) => sum + g, 0) / validGrowths.length).toFixed(2));
    }

    // --- STEP 5: RETURN RESULT ---
    return { monthlyBreakdown, averageGrowthRate };
};

// --- EXAMPLE USAGE ---
console.log(calculateMRRGrowth([
    { month: "Jan", newMRR: 5000, churnedMRR: 1000, existingMRR: 20000 },
    { month: "Feb", newMRR: 6000, churnedMRR: 2000, existingMRR: 24000 }
]));