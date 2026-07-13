// PROBLEM-05: runLoanDecisionPipeline()

// Logic: The "orchestrator" — chains checkLoanEligibility() → calculateLoanRiskScore() → determineLoanTerms() into ONE pipeline. If the FIRST step rejects the applicant, the pipeline stops immediately (no point scoring risk or terms for someone who's already ineligible).

const runLoanDecisionPipeline = (applicant) => {

    // --- STEP 1: VALIDATION ---
    if (typeof applicant !== "object" || applicant === null || Array.isArray(applicant)) {
        return "Invalid Input";
    }
    const {
        creditScore, monthlyIncome, existingDebt, employmentYears,
        hasCollateral, previousDefaults, requestedAmount
    } = applicant;

    if (typeof creditScore !== "number" || creditScore < 300 || creditScore > 850) return "Invalid Input";
    if (typeof monthlyIncome !== "number" || monthlyIncome <= 0) return "Invalid Input";
    if (typeof existingDebt !== "number" || existingDebt < 0) return "Invalid Input";
    if (typeof employmentYears !== "number" || employmentYears < 0) return "Invalid Input";
    if (typeof hasCollateral !== "boolean") return "Invalid Input";
    if (typeof previousDefaults !== "number" || !Number.isInteger(previousDefaults) || previousDefaults < 0) return "Invalid Input";
    if (typeof requestedAmount !== "number" || requestedAmount <= 0) return "Invalid Input";

    // --- STEP 2: PIPELINE STAGE 1 - ELIGIBILITY GATE (equivalent of checkLoanEligibility) ---
    const debtToIncomeRatio = Number((existingDebt / monthlyIncome).toFixed(2));

    // STOP IMMEDIATELY if any gate fails — no risk scoring or terms needed
    if (creditScore < 600) {
        return { approved: false, reason: "Credit score too low" };
    }
    if (debtToIncomeRatio > 0.4) {
        return { approved: false, reason: "Debt-to-income ratio too high" };
    }
    if (employmentYears < 1) {
        return { approved: false, reason: "Insufficient employment history" };
    }

    // --- STEP 3: PIPELINE STAGE 2 - RISK SCORING (equivalent of calculateLoanRiskScore) ---
    // only reached if the applicant PASSED stage 1
    let riskScore = 0;

    if (creditScore >= 750) riskScore += 30;
    else if (creditScore >= 650) riskScore += 20;
    else if (creditScore >= 600) riskScore += 10;

    if (debtToIncomeRatio <= 0.2) riskScore += 20;
    else if (debtToIncomeRatio <= 0.4) riskScore += 10;

    if (employmentYears >= 5) riskScore += 20;
    else if (employmentYears >= 2) riskScore += 10;

    if (hasCollateral === true) riskScore += 20;

    if (previousDefaults === 0) riskScore += 10;

    riskScore = Math.min(riskScore, 100);

    let riskCategory;
    if (riskScore >= 80) riskCategory = "LOW_RISK";
    else if (riskScore >= 50) riskCategory = "MEDIUM_RISK";
    else riskCategory = "HIGH_RISK";

    // --- STEP 4: PIPELINE STAGE 3 - LOAN TERMS (equivalent of determineLoanTerms) ---
    let maxLoanMultiplier;
    let interestRate;

    if (riskCategory === "LOW_RISK") {
        maxLoanMultiplier = 10;
        interestRate = 8;
    } else if (riskCategory === "MEDIUM_RISK") {
        maxLoanMultiplier = 6;
        interestRate = 12;
    } else {
        maxLoanMultiplier = 3;
        interestRate = 18;
    }

    const maxApprovedAmount = monthlyIncome * maxLoanMultiplier;
    const approvedAmount = Math.min(requestedAmount, maxApprovedAmount);

    // --- STEP 5: COMBINE EVERYTHING INTO THE FINAL APPROVED DECISION ---
    return { approved: true, riskCategory, approvedAmount, interestRate };
};

// --- EXAMPLE USAGE ---
console.log(runLoanDecisionPipeline({
    creditScore: 720,
    monthlyIncome: 60000,
    existingDebt: 10000,
    employmentYears: 6,
    hasCollateral: true,
    previousDefaults: 0,
    requestedAmount: 500000
}));