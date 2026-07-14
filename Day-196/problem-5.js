// PROBLEM-05: runUnderwritingPipeline()

// Logic: The "orchestrator" chains checkInsuranceEligibility() → calculateHealthRiskScore() → calculateInsurancePremium() into ONE pipeline. If eligibility fails at stage 1, the pipeline stops immediately no risk scoring or premium math for a rejected applicant.

const runUnderwritingPipeline = (applicant, basePremium, coverageAmount) => {

    // --- STEP 1: VALIDATION ---
    if (typeof applicant !== "object" || applicant === null || Array.isArray(applicant)) return "Invalid Input";
    const {
        age, hasPreexistingCondition, smokerStatus, bmi,
        exerciseFrequencyPerWeek, familyHistoryOfIllness
    } = applicant;

    if (typeof age !== "number" || age < 0 || age > 120) return "Invalid Input";
    if (typeof hasPreexistingCondition !== "boolean") return "Invalid Input";
    if (typeof smokerStatus !== "boolean") return "Invalid Input";
    if (typeof bmi !== "number" || bmi <= 0) return "Invalid Input";
    if (typeof exerciseFrequencyPerWeek !== "number" || !Number.isInteger(exerciseFrequencyPerWeek) || exerciseFrequencyPerWeek < 0) return "Invalid Input";
    if (typeof familyHistoryOfIllness !== "boolean") return "Invalid Input";

    if (typeof basePremium !== "number" || basePremium <= 0) return "Invalid Input";
    if (typeof coverageAmount !== "number" || coverageAmount <= 0) return "Invalid Input";

    // --- STEP 2: PIPELINE STAGE 1 - ELIGIBILITY GATE (equivalent of checkInsuranceEligibility) ---
    // STOP IMMEDIATELY if any gate fails
    if (age < 18 || age > 65) {
        return { approved: false, reason: "Age outside insurable range" };
    }
    if (bmi > 40) {
        return { approved: false, reason: "BMI exceeds insurable threshold" };
    }
    if (hasPreexistingCondition === true && smokerStatus === true) {
        return { approved: false, reason: "Combined high-risk factors disqualify applicant" };
    }

    // --- STEP 3: PIPELINE STAGE 2 - HEALTH RISK SCORE (equivalent of calculateHealthRiskScore) ---
    // only reached if the applicant PASSED stage 1
    let riskScore = 0;

    if (age >= 60) riskScore += 25;
    else if (age >= 40) riskScore += 15;

    if (bmi >= 30) riskScore += 20;
    else if (bmi >= 25) riskScore += 10;

    if (smokerStatus === true) riskScore += 25;

    if (exerciseFrequencyPerWeek === 0) riskScore += 15;
    else if (exerciseFrequencyPerWeek <= 2) riskScore += 5;

    if (familyHistoryOfIllness === true) riskScore += 15;

    riskScore = Math.min(riskScore, 100);

    let riskTier, premiumMultiplier;
    if (riskScore >= 60) {
        riskTier = "HIGH_RISK"; premiumMultiplier = 2.5;
    } else if (riskScore >= 30) {
        riskTier = "MEDIUM_RISK"; premiumMultiplier = 1.5;
    } else {
        riskTier = "LOW_RISK"; premiumMultiplier = 1.0;
    }

    // --- STEP 4: PIPELINE STAGE 3 - PREMIUM CALCULATION (equivalent of calculateInsurancePremium) ---
    const adjustedPremium = basePremium * premiumMultiplier;
    const coverageRatio = coverageAmount / 1000000;
    const finalPremium = Number((adjustedPremium * coverageRatio).toFixed(2));
    const monthlyPremium = Number((finalPremium / 12).toFixed(2));

    let affordabilityTier;
    if (monthlyPremium <= 2000) affordabilityTier = "AFFORDABLE";
    else if (monthlyPremium <= 5000) affordabilityTier = "MODERATE";
    else affordabilityTier = "EXPENSIVE";

    // --- STEP 5: RETURN FINAL APPROVED RESULT ---
    return { approved: true, riskTier, monthlyPremium, affordabilityTier };
};

// --- EXAMPLE USAGE ---
console.log(runUnderwritingPipeline(
    { age: 35, hasPreexistingCondition: false, smokerStatus: false, bmi: 22, exerciseFrequencyPerWeek: 4, familyHistoryOfIllness: false },
    8000,
    1000000
));