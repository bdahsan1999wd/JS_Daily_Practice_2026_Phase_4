// PROBLEM-02: calculateHealthRiskScore()

// Logic: Additive scoring each lifestyle/health factor adds risk points, which determine a tier AND a premium multiplier.

const calculateHealthRiskScore = (applicant) => {

    // --- STEP 1: VALIDATION ---
    if (typeof applicant !== "object" || applicant === null || Array.isArray(applicant)) {
        return "Invalid Input";
    }
    const { age, bmi, smokerStatus, exerciseFrequencyPerWeek, familyHistoryOfIllness } = applicant;
    if (typeof age !== "number" || age < 0) return "Invalid Input";
    if (typeof bmi !== "number" || bmi <= 0) return "Invalid Input";
    if (typeof smokerStatus !== "boolean") return "Invalid Input";
    if (typeof exerciseFrequencyPerWeek !== "number" || !Number.isInteger(exerciseFrequencyPerWeek) || exerciseFrequencyPerWeek < 0) return "Invalid Input";
    if (typeof familyHistoryOfIllness !== "boolean") return "Invalid Input";

    // --- STEP 2: ADDITIVE RISK SCORING ---
    let riskScore = 0;

    // age bracket
    if (age >= 60) riskScore += 25;
    else if (age >= 40) riskScore += 15; // 40-59

    // BMI bracket
    if (bmi >= 30) riskScore += 20;
    else if (bmi >= 25) riskScore += 10; // 25-29.99

    // smoking flag
    if (smokerStatus === true) riskScore += 25;

    // exercise frequency bracket
    if (exerciseFrequencyPerWeek === 0) riskScore += 15;
    else if (exerciseFrequencyPerWeek <= 2) riskScore += 5; // 1-2

    // family history flag
    if (familyHistoryOfIllness === true) riskScore += 15;

    // cap at 100 even if every factor stacks
    riskScore = Math.min(riskScore, 100);

    // --- STEP 3: RISK TIER & PREMIUM MULTIPLIER LOOKUP ---
    let tier, premiumMultiplier;
    if (riskScore >= 60) {
        tier = "HIGH_RISK"; premiumMultiplier = 2.5;
    } else if (riskScore >= 30) {
        tier = "MEDIUM_RISK"; premiumMultiplier = 1.5;
    } else {
        tier = "LOW_RISK"; premiumMultiplier = 1.0;
    }

    // --- STEP 4: RETURN RESULT ---
    return { riskScore, tier, premiumMultiplier };
};

// --- EXAMPLE USAGE ---
console.log(calculateHealthRiskScore({
    age: 45,
    bmi: 27,
    smokerStatus: false,
    exerciseFrequencyPerWeek: 1,
    familyHistoryOfIllness: true
}));