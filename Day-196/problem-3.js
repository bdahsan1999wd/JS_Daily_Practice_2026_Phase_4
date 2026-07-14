// PROBLEM-03: calculateInsurancePremium()

// Logic: Scales a base premium by the applicant's risk multiplier AND by how much coverage they want (in units of 1 million), then breaks that down into a monthly cost and affordability tier.

const calculateInsurancePremium = (basePremium, premiumMultiplier, coverageAmount) => {

    // --- STEP 1: VALIDATION ---
    if (typeof basePremium !== "number" || basePremium <= 0) return "Invalid Input";
    if (typeof premiumMultiplier !== "number" || premiumMultiplier <= 0) return "Invalid Input";
    if (typeof coverageAmount !== "number" || coverageAmount <= 0) return "Invalid Input";

    // --- STEP 2: ADJUST PREMIUM BY RISK MULTIPLIER ---
    const adjustedPremium = basePremium * premiumMultiplier;

    // --- STEP 3: SCALE BY COVERAGE AMOUNT (in units of 1 million) ---
    const coverageRatio = coverageAmount / 1000000;

    // --- STEP 4: FINAL ANNUAL AND MONTHLY PREMIUM ---
    const finalPremium = Number((adjustedPremium * coverageRatio).toFixed(2));
    const monthlyPremium = Number((finalPremium / 12).toFixed(2));

    // --- STEP 5: AFFORDABILITY TIER ---
    let affordabilityTier;
    if (monthlyPremium <= 2000) affordabilityTier = "AFFORDABLE";
    else if (monthlyPremium <= 5000) affordabilityTier = "MODERATE";
    else affordabilityTier = "EXPENSIVE";

    // --- STEP 6: RETURN RESULT ---
    return { finalPremium, monthlyPremium, affordabilityTier };
};

// --- EXAMPLE USAGE ---
console.log(calculateInsurancePremium(10000, 1.5, 2000000));