// PROBLEM-02: decideRentalApplication()

// Logic: 3-step eligibility gate, then the security deposit scales based on credit score risk tier, plus a flat pet deposit.

const decideRentalApplication = (applicant, monthlyRent) => {

    // --- STEP 1: VALIDATION ---
    if (typeof applicant !== "object" || applicant === null || Array.isArray(applicant)) return "Invalid Input";
    const { monthlyIncome, creditScore, hasEvictionHistory, hasPets } = applicant;
    if (typeof monthlyIncome !== "number" || monthlyIncome <= 0) return "Invalid Input";
    if (typeof creditScore !== "number" || creditScore < 300 || creditScore > 850) return "Invalid Input";
    if (typeof hasEvictionHistory !== "boolean") return "Invalid Input";
    if (typeof hasPets !== "boolean") return "Invalid Input";
    if (typeof monthlyRent !== "number" || monthlyRent <= 0) return "Invalid Input";

    // --- STEP 2: GATE CHECKS - STOP AT FIRST FAILURE ---
    if (hasEvictionHistory !== false) {
        return { approved: false, reason: "Eviction history disqualifies applicant" };
    }
    const rentToIncomeRatio = monthlyRent / monthlyIncome;
    if (rentToIncomeRatio > 0.35) {
        return { approved: false, reason: "Income insufficient for this rent amount" };
    }
    if (creditScore < 580) {
        return { approved: false, reason: "Credit score below minimum" };
    }

    // --- STEP 3: SECURITY DEPOSIT MULTIPLIER BY CREDIT TIER ---
    let securityDepositMultiplier;
    if (creditScore >= 720) securityDepositMultiplier = 1;
    else if (creditScore >= 650) securityDepositMultiplier = 1.5;
    else securityDepositMultiplier = 2; // 580-649

    // --- STEP 4: PET DEPOSIT & TOTAL ---
    const petDeposit = hasPets === true ? 5000 : 0;
    const totalDepositRequired = Number(((monthlyRent * securityDepositMultiplier) + petDeposit).toFixed(2));

    // --- STEP 5: RETURN RESULT ---
    return { approved: true, totalDepositRequired };
};

// --- EXAMPLE USAGE ---
console.log(decideRentalApplication({
    monthlyIncome: 60000,
    creditScore: 700,
    hasEvictionHistory: false,
    hasPets: true
}, 18000));