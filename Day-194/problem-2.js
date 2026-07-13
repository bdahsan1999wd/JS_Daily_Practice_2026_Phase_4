// PROBLEM-02: calculateLoanRiskScore()

// Logic: Additive scoring system — different applicant attributes each contribute points toward a 0-100 "lower risk" score.

const calculateLoanRiskScore = (applicant) => {

    // --- STEP 1: VALIDATION ---
    if (typeof applicant !== "object" || applicant === null || Array.isArray(applicant)) {
        return "Invalid Input";
    }
    const { creditScore, debtToIncomeRatio, employmentYears, hasCollateral, previousDefaults } = applicant;
    if (typeof creditScore !== "number" || creditScore < 300 || creditScore > 850) return "Invalid Input";
    if (typeof debtToIncomeRatio !== "number" || debtToIncomeRatio < 0 || debtToIncomeRatio > 1) return "Invalid Input";
    if (typeof employmentYears !== "number" || employmentYears < 0) return "Invalid Input";
    if (typeof hasCollateral !== "boolean") return "Invalid Input";
    if (typeof previousDefaults !== "number" || !Number.isInteger(previousDefaults) || previousDefaults < 0) return "Invalid Input";

    // --- STEP 2: ADDITIVE SCORING - EACH FACTOR ADDS ITS OWN POINTS ---
    let riskScore = 0;

    // credit score tier (only ONE bracket applies, using else-if chain)
    if (creditScore >= 750) riskScore += 30;
    else if (creditScore >= 650) riskScore += 20; // covers 650-749
    else if (creditScore >= 600) riskScore += 10; // covers 600-649

    // debt-to-income tier
    if (debtToIncomeRatio <= 0.2) riskScore += 20;
    else if (debtToIncomeRatio <= 0.4) riskScore += 10; // covers >0.2 to 0.4

    // employment history tier
    if (employmentYears >= 5) riskScore += 20;
    else if (employmentYears >= 2) riskScore += 10; // covers 2 to <5

    // collateral bonus
    if (hasCollateral === true) riskScore += 20;

    // clean history bonus
    if (previousDefaults === 0) riskScore += 10;

    // cap at 100 even if somehow the math overshoots
    riskScore = Math.min(riskScore, 100);

    // --- STEP 3: CATEGORIZE THE FINAL SCORE ---
    let category;
    if (riskScore >= 80) category = "LOW_RISK";
    else if (riskScore >= 50) category = "MEDIUM_RISK";
    else category = "HIGH_RISK";

    // --- STEP 4: RETURN RESULT ---
    return { riskScore, category };
};

// --- EXAMPLE USAGE ---
console.log(calculateLoanRiskScore({
    creditScore: 720,
    debtToIncomeRatio: 0.15,
    employmentYears: 6,
    hasCollateral: true,
    previousDefaults: 0
}));