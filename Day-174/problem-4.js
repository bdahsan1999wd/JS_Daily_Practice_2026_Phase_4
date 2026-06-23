// Problem-04: checkTokenValidity()

// Logic: Tracks linear session expirations against dynamic checkpoints. It processes linear boundaries to isolate absolute time spaces, routing values into clear security classifications using strict evaluation rules.

const checkTokenValidity = (tokenInfo, currentTimeSeconds) => {

    // --- STEP 1: INITIAL STRUCTURAL CHECKS ---
    if (typeof tokenInfo !== "object" || tokenInfo === null || Array.isArray(tokenInfo)) {
        return "Invalid Input";
    }
    if (typeof currentTimeSeconds !== "number" || isNaN(currentTimeSeconds) || currentTimeSeconds < 0) {
        return "Invalid Input";
    }

    const { token, issuedAtSeconds, expiresInSeconds } = tokenInfo;
    if (typeof token !== "string" || token === "") return "Invalid Input";
    if (typeof issuedAtSeconds !== "number" || isNaN(issuedAtSeconds) || issuedAtSeconds < 0) return "Invalid Input";
    if (typeof expiresInSeconds !== "number" || isNaN(expiresInSeconds) || expiresInSeconds <= 0) return "Invalid Input";

    // --- STEP 2: SAFE BOUNDARY RESOLUTIONS ---
    const expiryTimeSeconds = issuedAtSeconds + expiresInSeconds;
    const isExpired = currentTimeSeconds >= expiryTimeSeconds;

    // --- STEP 3: DATA MAP CONVERSIONS ---
    const remainingSeconds = isExpired ? 0 : expiryTimeSeconds - currentTimeSeconds;

    let status = "VALID";
    if (isExpired) {
        status = "EXPIRED";
    } else if (remainingSeconds <= 300) {
        status = "EXPIRING_SOON";
    }

    // --- STEP 4: EMIT LOG BLUEPRINT PACKAGES ---
    return {
        isExpired,
        remainingSeconds,
        status
    };
};

// --- EXAMPLE USAGE ---
console.log(checkTokenValidity(
    { token: "TKN-U-100-U-30", issuedAtSeconds: 1000, expiresInSeconds: 1800 },
    2650
));