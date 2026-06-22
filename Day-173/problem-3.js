// Problem-3: scorePasswordStrength()

// Logic: Examines arbitrary text payloads using granular regex criteria, tallying point tiers conditionally. It processes accumulative point counts and routes them into explicit, structured security classifications.

const scorePasswordStrength = (password) => {

    // --- STEP 1: INITIAL STRUCTURAL CHECKS ---
    if (typeof password !== "string" || password === "") {
        return "Invalid Input";
    }

    // --- STEP 2: SAFE BOUNDARY RESOLUTIONS (SCORING ENGINE) ---
    let totalScore = 0;

    // Length Metrics
    if (password.length >= 8) totalScore += 20;
    if (password.length >= 12) totalScore += 10; // Extra tier bonus

    // Character Pool Complexity Verification
    if (/[A-Z]/.test(password)) totalScore += 20;
    if (/[a-z]/.test(password)) totalScore += 20;
    if (/[0-9]/.test(password)) totalScore += 15;
    if (/[!@#$%^&*]/.test(password)) totalScore += 15;

    // --- STEP 3: DATA MAP CONVERSIONS (LEVEL MAPPING) ---
    let level = "";
    if (totalScore >= 80) {
        level = "VERY STRONG";
    } else if (totalScore >= 60) {
        level = "STRONG";
    } else if (totalScore >= 40) {
        level = "MODERATE";
    } else if (totalScore >= 20) {
        level = "WEAK";
    } else {
        level = "VERY WEAK";
    }

    // --- STEP 4: EMIT LOG BLUEPRINT PACKAGES ---
    return {
        totalScore,
        level
    };
};

// --- EXAMPLE USAGE ---
console.log(scorePasswordStrength("Rahim@2025"));