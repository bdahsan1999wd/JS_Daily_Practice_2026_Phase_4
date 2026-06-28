// PROBLEM-01: validateMFA()

// Logic: Checks which required auth factors were actually passed, and assigns a security level based on how many succeeded.

const validateMFA = (factorsRequired, factorsProvided) => {

    // --- STEP 1: VALIDATION ---
    // a. factorsRequired must be a non-empty array
    if (!Array.isArray(factorsRequired) || factorsRequired.length === 0) {
        return "Invalid Input";
    }
    // b. factorsProvided must be a plain object (not array, not null)
    if (typeof factorsProvided !== "object" || factorsProvided === null || Array.isArray(factorsProvided)) {
        return "Invalid Input";
    }
    // c. every entry in factorsRequired must be one of the 4 allowed factor types
    const allowedFactors = ["PASSWORD", "OTP", "BIOMETRIC", "SECURITY_QUESTION"];
    for (let i = 0; i < factorsRequired.length; i++) {
        if (typeof factorsRequired[i] !== "string" || !allowedFactors.includes(factorsRequired[i])) {
            return "Invalid Input";
        }
    }

    // --- STEP 2: CHECK EACH REQUIRED FACTOR ---
    // Loop through every required factor and see if it was actually
    // provided as `true`. Use `??` so a missing key safely falls back
    // to `false` instead of throwing/undefined issues.
    const passedFactors = [];
    const failedFactors = [];

    for (let i = 0; i < factorsRequired.length; i++) {
        const factor = factorsRequired[i];
        const passed = factorsProvided[factor] ?? false;

        if (passed === true) {
            passedFactors.push(factor);
        } else {
            failedFactors.push(factor);
        }
    }

    // --- STEP 3: OVERALL MFA SUCCESS ---
    // Success only if there are ZERO failed factors (all required ones passed)
    const mfaSuccess = failedFactors.length === 0;

    // --- STEP 4: SECURITY LEVEL CLASSIFICATION ---
    let securityLevel;
    if (mfaSuccess && passedFactors.length >= 3) {
        securityLevel = "HIGH";       // all passed + strong factor count
    } else if (mfaSuccess && passedFactors.length < 3) {
        securityLevel = "MEDIUM";     // all passed but fewer factors used
    } else {
        securityLevel = "LOW";        // something failed
    }

    // --- STEP 5: RETURN FINAL RESULT ---
    return { passedFactors, failedFactors, mfaSuccess, securityLevel };
};

// --- EXAMPLE USAGE ---
console.log(validateMFA(
    ["PASSWORD", "OTP", "BIOMETRIC"],
    { PASSWORD: true, OTP: true, BIOMETRIC: false }
));