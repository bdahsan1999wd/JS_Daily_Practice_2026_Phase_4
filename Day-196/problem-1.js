// PROBLEM-01: checkInsuranceEligibility()

// Logic: A decision-tree gate checks 3 conditions IN ORDER, stops at the FIRST failure. IMPORTANT: check #3 is special having a preexisting condition ALONE is fine, being a smoker ALONE is fine, but BOTH together disqualifies the applicant.

const checkInsuranceEligibility = (applicant) => {

    // --- STEP 1: VALIDATION ---
    if (typeof applicant !== "object" || applicant === null || Array.isArray(applicant)) {
        return "Invalid Input";
    }
    const { age, hasPreexistingCondition, smokerStatus, bmi } = applicant;
    if (typeof age !== "number" || age < 0 || age > 120) return "Invalid Input";
    if (typeof hasPreexistingCondition !== "boolean") return "Invalid Input";
    if (typeof smokerStatus !== "boolean") return "Invalid Input";
    if (typeof bmi !== "number" || bmi <= 0) return "Invalid Input";

    // --- STEP 2: DECISION TREE - CHECK IN ORDER, STOP AT FIRST FAILURE ---
    // Check #1: must fall within the insurable age range
    if (age < 18 || age > 65) {
        return { eligible: false, rejectionReason: "Age outside insurable range" };
    }
    // Check #2: BMI must not exceed the threshold
    if (bmi > 40) {
        return { eligible: false, rejectionReason: "BMI exceeds insurable threshold" };
    }
    // Check #3: ONLY the COMBINATION of preexisting condition + smoking disqualifies.
    // Neither factor alone triggers this rejection.
    if (hasPreexistingCondition === true && smokerStatus === true) {
        return { eligible: false, rejectionReason: "Combined high-risk factors disqualify applicant" };
    }

    // --- STEP 3: ALL CHECKS PASSED ---
    return { eligible: true, rejectionReason: null };
};

// --- EXAMPLE USAGE ---
console.log(checkInsuranceEligibility({
    age: 45,
    hasPreexistingCondition: true,
    smokerStatus: true,
    bmi: 28
}));