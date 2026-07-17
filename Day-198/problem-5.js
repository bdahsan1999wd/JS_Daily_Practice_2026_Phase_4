// PROBLEM-05: runBonusDecisionPipeline()

// Logic: The "orchestrator" — chains checkBonusEligibility() into calculatePerformanceBonus(). If eligibility fails, the pipeline stops immediately and returns bonusAmount: 0 (no bonus math needed for an ineligible employee).

const runBonusDecisionPipeline = (employee, companyProfitGrowthPercent) => {

    // --- STEP 1: VALIDATION ---
    if (typeof employee !== "object" || employee === null || Array.isArray(employee)) return "Invalid Input";
    const { monthsEmployed, performanceRating, disciplinaryActions, attendanceRate, baseSalary } = employee;

    if (typeof monthsEmployed !== "number" || monthsEmployed < 0) return "Invalid Input";
    if (typeof performanceRating !== "number" || performanceRating < 0 || performanceRating > 5) return "Invalid Input";
    if (typeof disciplinaryActions !== "number" || !Number.isInteger(disciplinaryActions) || disciplinaryActions < 0) return "Invalid Input";
    if (typeof attendanceRate !== "number" || attendanceRate < 0 || attendanceRate > 100) return "Invalid Input";
    if (typeof baseSalary !== "number" || baseSalary <= 0) return "Invalid Input";
    if (typeof companyProfitGrowthPercent !== "number" || isNaN(companyProfitGrowthPercent)) return "Invalid Input";

    // --- STEP 2: PIPELINE STAGE 1 - ELIGIBILITY GATE (equivalent of checkBonusEligibility) ---
    // STOP IMMEDIATELY if any gate fails — no bonus math needed
    if (monthsEmployed < 6) {
        return { bonusAwarded: false, reason: "Minimum tenure not met", bonusAmount: 0 };
    }
    if (disciplinaryActions !== 0) {
        return { bonusAwarded: false, reason: "Disciplinary record disqualifies bonus", bonusAmount: 0 };
    }
    if (attendanceRate < 80) {
        return { bonusAwarded: false, reason: "Attendance below required threshold", bonusAmount: 0 };
    }
    if (performanceRating < 2.5) {
        return { bonusAwarded: false, reason: "Performance rating too low", bonusAmount: 0 };
    }

    // --- STEP 3: PIPELINE STAGE 2 - PERFORMANCE BONUS (equivalent of calculatePerformanceBonus) ---
    // only reached if the employee PASSED stage 1
    let baseMultiplier;
    if (performanceRating >= 4.5) baseMultiplier = 0.25;
    else if (performanceRating >= 3.5) baseMultiplier = 0.15;
    else if (performanceRating >= 2.5) baseMultiplier = 0.08;
    else baseMultiplier = 0;

    let companyAdjustment;
    if (companyProfitGrowthPercent >= 10) companyAdjustment = 1.2;
    else if (companyProfitGrowthPercent >= 0) companyAdjustment = 1.0;
    else companyAdjustment = 0.5;

    const finalMultiplier = Number((baseMultiplier * companyAdjustment).toFixed(4));
    const bonusAmount = Number((baseSalary * finalMultiplier).toFixed(2));

    // --- STEP 4: RETURN FINAL AWARDED RESULT ---
    return { bonusAwarded: true, bonusAmount };
};

// --- EXAMPLE USAGE ---
console.log(runBonusDecisionPipeline({
    monthsEmployed: 18,
    performanceRating: 4.7,
    disciplinaryActions: 0,
    attendanceRate: 92,
    baseSalary: 75000
}, 15));