// PROBLEM-01: checkLoanEligibility()

// Logic: A decision-tree gate — checks 3 conditions IN ORDER and stops at the FIRST one that fails. The debtToIncomeRatio is always computed and returned, whether the applicant passes or fails.

const checkLoanEligibility = (applicant) => {

    // --- STEP 1: VALIDATION ---
    if (typeof applicant !== "object" || applicant === null || Array.isArray(applicant)) {
        return "Invalid Input";
    }
    const { creditScore, monthlyIncome, existingDebt, employmentYears } = applicant;
    if (typeof creditScore !== "number" || creditScore < 300 || creditScore > 850) return "Invalid Input";
    if (typeof monthlyIncome !== "number" || monthlyIncome <= 0) return "Invalid Input";
    if (typeof existingDebt !== "number" || existingDebt < 0) return "Invalid Input";
    if (typeof employmentYears !== "number" || employmentYears < 0) return "Invalid Input";

    // --- STEP 2: ALWAYS COMPUTE debtToIncomeRatio (needed regardless of outcome) ---
    const debtToIncomeRatio = Number((existingDebt / monthlyIncome).toFixed(2));

    // --- STEP 3: DECISION TREE - CHECK EACH CONDITION IN ORDER, STOP AT FIRST FAILURE ---
    // Check #1: credit score gate
    if (creditScore < 600) {
        return { eligible: false, rejectionReason: "Credit score too low", debtToIncomeRatio };
    }
    // Check #2: debt-to-income ratio gate
    if (debtToIncomeRatio > 0.4) {
        return { eligible: false, rejectionReason: "Debt-to-income ratio too high", debtToIncomeRatio };
    }
    // Check #3: employment history gate
    if (employmentYears < 1) {
        return { eligible: false, rejectionReason: "Insufficient employment history", debtToIncomeRatio };
    }

    // --- STEP 4: ALL 3 CHECKS PASSED ---
    return { eligible: true, rejectionReason: null, debtToIncomeRatio };
};

// --- EXAMPLE USAGE ---
console.log(checkLoanEligibility({
    creditScore: 650,
    monthlyIncome: 50000,
    existingDebt: 25000,
    employmentYears: 2
}));