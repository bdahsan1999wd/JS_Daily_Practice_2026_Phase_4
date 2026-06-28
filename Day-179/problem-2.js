// PROBLEM-02: calculateLoginRiskScore()

// Logic: Adds up risk points based on suspicious login signals (new device, new location, VPN, failed attempts, odd hour) and classifies the result into a risk level.

const calculateLoginRiskScore = (loginAttempt) => {

    // --- STEP 1: VALIDATION ---
    // loginAttempt must be a plain object (not array, not null)
    if (typeof loginAttempt !== "object" || loginAttempt === null || Array.isArray(loginAttempt)) {
        return "Invalid Input";
    }

    // --- STEP 2: SAFE EXTRACTION WITH FALLBACKS ---
    // Use optional chaining (?.) + nullish coalescing (??) so missing
    // fields default safely instead of crashing the function.
    const isNewDevice = loginAttempt?.isNewDevice ?? false;
    const isNewLocation = loginAttempt?.isNewLocation ?? false;
    const isVpnDetected = loginAttempt?.isVpnDetected ?? false;
    const failedAttemptsToday = loginAttempt?.failedAttemptsToday ?? 0;
    const loginHour = loginAttempt?.loginHour ?? 12;

    // --- STEP 3: ADDITIVE RISK SCORING ---
    // Each suspicious signal adds fixed points to the running total
    let riskScore = 0;
    if (isNewDevice === true) riskScore += 25;
    if (isNewLocation === true) riskScore += 20;
    if (isVpnDetected === true) riskScore += 15;
    if (failedAttemptsToday >= 3) riskScore += 30;
    if (loginHour < 6 || loginHour >= 23) riskScore += 10; // odd/late hour login

    // cap the score so it never exceeds 100
    riskScore = Math.min(riskScore, 100);

    // --- STEP 4: RISK LEVEL CLASSIFICATION ---
    let level;
    if (riskScore >= 70) level = "CRITICAL";
    else if (riskScore >= 40) level = "HIGH";
    else if (riskScore >= 15) level = "MODERATE";
    else level = "LOW";

    // --- STEP 5: DECIDE IF EXTRA VERIFICATION IS NEEDED ---
    const requiresAdditionalVerification = riskScore >= 40;

    // --- STEP 6: RETURN FINAL RESULT ---
    return { riskScore, level, requiresAdditionalVerification };
};

// --- EXAMPLE USAGE ---
console.log(calculateLoginRiskScore({
    isNewDevice: true,
    isNewLocation: true,
    isVpnDetected: false,
    failedAttemptsToday: 1,
    loginHour: 2
}));