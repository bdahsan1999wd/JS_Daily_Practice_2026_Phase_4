// PROBLEM-01: checkBonusEligibility()

// Logic: A decision-tree gate — checks 4 conditions IN ORDER, stops at the FIRST one that fails.

const checkBonusEligibility = (employee) => {

    // --- STEP 1: VALIDATION ---
    if (typeof employee !== "object" || employee === null || Array.isArray(employee)) {
        return "Invalid Input";
    }
    const { monthsEmployed, performanceRating, disciplinaryActions, attendanceRate } = employee;
    if (typeof monthsEmployed !== "number" || monthsEmployed < 0) return "Invalid Input";
    if (typeof performanceRating !== "number" || performanceRating < 0 || performanceRating > 5) return "Invalid Input";
    if (typeof disciplinaryActions !== "number" || !Number.isInteger(disciplinaryActions) || disciplinaryActions < 0) return "Invalid Input";
    if (typeof attendanceRate !== "number" || attendanceRate < 0 || attendanceRate > 100) return "Invalid Input";

    // --- STEP 2: DECISION TREE - CHECK IN ORDER, STOP AT FIRST FAILURE ---
    // Check #1: minimum tenure
    if (monthsEmployed < 6) {
        return { eligible: false, rejectionReason: "Minimum tenure not met" };
    }
    // Check #2: clean disciplinary record required
    if (disciplinaryActions !== 0) {
        return { eligible: false, rejectionReason: "Disciplinary record disqualifies bonus" };
    }
    // Check #3: minimum attendance
    if (attendanceRate < 80) {
        return { eligible: false, rejectionReason: "Attendance below required threshold" };
    }
    // Check #4: minimum performance rating
    if (performanceRating < 2.5) {
        return { eligible: false, rejectionReason: "Performance rating too low" };
    }

    // --- STEP 3: ALL CHECKS PASSED ---
    return { eligible: true, rejectionReason: null };
};

// --- EXAMPLE USAGE ---
console.log(checkBonusEligibility({
    monthsEmployed: 12,
    performanceRating: 4.0,
    disciplinaryActions: 1,
    attendanceRate: 95
}));