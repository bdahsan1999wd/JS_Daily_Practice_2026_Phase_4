// Problem-02: verifyOtp()

// Logic: Validates input strings against explicit state parameters. It screens credentials down a strict hierarchical route, managing attempts metrics correctly upon mismatch triggers.

const verifyOtp = (storedOtp, submittedOtp) => {

    // --- STEP 1: INITIAL STRUCTURAL CHECKS ---
    if (typeof storedOtp !== "object" || storedOtp === null || Array.isArray(storedOtp)) {
        return "Invalid Input";
    }
    if (typeof submittedOtp !== "object" || submittedOtp === null || Array.isArray(submittedOtp)) {
        return "Invalid Input";
    }

    const { otpCode, expiresAtSeconds, attemptsUsed, maxAttempts } = storedOtp;
    const { code, currentTimeSeconds } = submittedOtp;

    if (typeof otpCode !== "string" || otpCode === "") return "Invalid Input";
    if (typeof expiresAtSeconds !== "number" || isNaN(expiresAtSeconds) || expiresAtSeconds < 0) return "Invalid Input";
    if (typeof attemptsUsed !== "number" || isNaN(attemptsUsed) || attemptsUsed < 0) return "Invalid Input";
    if (typeof maxAttempts !== "number" || isNaN(maxAttempts) || maxAttempts <= 0) return "Invalid Input";

    if (typeof code !== "string" || code === "") return "Invalid Input";
    if (typeof currentTimeSeconds !== "number" || isNaN(currentTimeSeconds) || currentTimeSeconds < 0) return "Invalid Input";

    // --- STEP 2: SAFE BOUNDARY RESOLUTIONS (ORDERED CHECK PIPELINE) ---
    // Check 1: Exhausted attempts threshold verification
    if (attemptsUsed >= maxAttempts) {
        return {
            verified: false,
            message: "Maximum attempts exceeded. Request a new OTP.",
            attemptsUsed
        };
    }

    // Check 2: Expiry timeframe limit boundary cross verification
    if (currentTimeSeconds >= expiresAtSeconds) {
        return {
            verified: false,
            message: "OTP has expired. Request a new OTP.",
            attemptsUsed
        };
    }

    // --- STEP 3: DATA MAP CONVERSIONS (TOKEN CONFIRMATION SCAN) ---
    // Check 3: Real validation evaluation match
    if (code !== otpCode) {
        const nextAttemptsCount = attemptsUsed + 1;
        return {
            verified: false,
            message: "Incorrect OTP code.",
            attemptsUsed: nextAttemptsCount
        };
    }

    // --- STEP 4: EMIT LOG BLUEPRINT PACKAGES ---
    return {
        verified: true,
        message: "OTP verified successfully.",
        attemptsUsed
    };
};

// --- EXAMPLE USAGE ---
console.log(verifyOtp(
    { otpCode: "445566", expiresAtSeconds: 1200, attemptsUsed: 1, maxAttempts: 3 },
    { code: "112233", currentTimeSeconds: 1100 }
));