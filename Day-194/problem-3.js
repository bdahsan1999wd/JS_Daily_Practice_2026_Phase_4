// PROBLEM-03: determineLoanTerms()

// Logic: Risk category decides BOTH how big a loan can be approved (as a multiple of monthly income) AND what interest rate applies. The requested amount gets capped if it's too high.

const determineLoanTerms = (riskCategory, requestedAmount, monthlyIncome) => {

    // --- STEP 1: VALIDATION ---
    if (!["LOW_RISK", "MEDIUM_RISK", "HIGH_RISK"].includes(riskCategory)) return "Invalid Input";
    if (typeof requestedAmount !== "number" || requestedAmount <= 0) return "Invalid Input";
    if (typeof monthlyIncome !== "number" || monthlyIncome <= 0) return "Invalid Input";

    // --- STEP 2: LOOK UP MULTIPLIER & INTEREST RATE FOR THIS RISK CATEGORY ---
    let maxLoanMultiplier;
    let interestRate;

    if (riskCategory === "LOW_RISK") {
        maxLoanMultiplier = 10;
        interestRate = 8;
    } else if (riskCategory === "MEDIUM_RISK") {
        maxLoanMultiplier = 6;
        interestRate = 12;
    } else { // HIGH_RISK
        maxLoanMultiplier = 3;
        interestRate = 18;
    }

    // --- STEP 3: COMPUTE THE MAX ALLOWED LOAN, THEN CAP THE REQUEST AGAINST IT ---
    const maxApprovedAmount = monthlyIncome * maxLoanMultiplier;
    const approvedAmount = Math.min(requestedAmount, maxApprovedAmount);

    // --- STEP 4: FLAG WHETHER THE ORIGINAL REQUEST GOT REDUCED ---
    const wasAmountReduced = requestedAmount > maxApprovedAmount;

    // --- STEP 5: RETURN RESULT ---
    return { approvedAmount, interestRate, wasAmountReduced };
};

// --- EXAMPLE USAGE ---
console.log(determineLoanTerms("MEDIUM_RISK", 400000, 50000));