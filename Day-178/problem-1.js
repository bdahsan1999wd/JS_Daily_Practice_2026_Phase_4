// Problem-01: requestOtp()

// Logic: Checks sliding window request frequency to mitigate brute flood attempts. It isolates active records dynamically, enforces fallback boundaries, and computes deterministic tokens safely.

const requestOtp = (userInfo, recentOtpRequests) => {

    // --- STEP 1: INITIAL STRUCTURAL CHECKS ---
    if (typeof userInfo !== "object" || userInfo === null || Array.isArray(userInfo)) {
        return "Invalid Input";
    }
    if (!Array.isArray(recentOtpRequests)) {
        return "Invalid Input";
    }

    const { userId, channel, currentTimeSeconds } = userInfo;
    if (typeof userId !== "string" || userId === "") return "Invalid Input";
    if (channel !== "SMS" && channel !== "EMAIL") return "Invalid Input";
    if (typeof currentTimeSeconds !== "number" || isNaN(currentTimeSeconds) || currentTimeSeconds < 0) {
        return "Invalid Input";
    }

    // --- STEP 2: SAFE BOUNDARY RESOLUTIONS (WINDOW ENGINE) ---
    let validWindowRequestCount = 0;

    for (let i = 0; i < recentOtpRequests.length; i++) {
        const entry = recentOtpRequests[i];
        if (!entry || typeof entry !== "object" || typeof entry.userId !== "string") {
            return "Invalid Input";
        }
        if (typeof entry.requestedAtSeconds !== "number" || isNaN(entry.requestedAtSeconds)) {
            return "Invalid Input";
        }

        if (entry.userId === userId) {
            const timeDifference = currentTimeSeconds - entry.requestedAtSeconds;
            if (timeDifference >= 0 && timeDifference <= 300) {
                validWindowRequestCount++;
            }
        }
    }

    // --- STEP 3: DATA MAP CONVERSIONS (RATE LIMIT ROUTER) ---
    if (validWindowRequestCount >= 3) {
        return {
            requestAllowed: false,
            message: "OTP request limit reached. Please try again later."
        };
    }

    // Run deterministic token string calculations as per requirements
    const otpFormulaBase = userId.length * 111111;
    const otpCode = String(otpFormulaBase).padStart(6, "0").slice(-6);
    const expiresAtSeconds = currentTimeSeconds + 120;
    const deliveryMessage = `OTP sent via ${channel} to user ${userId}`;

    // --- STEP 4: EMIT LOG BLUEPRINT PACKAGES ---
    return {
        requestAllowed: true,
        otpCode,
        expiresAtSeconds,
        deliveryMessage
    };
};

// --- EXAMPLE USAGE ---
console.log(requestOtp(
    { userId: "U12345", channel: "SMS", currentTimeSeconds: 1000 },
    [
        { userId: "U12345", requestedAtSeconds: 800 },
        { userId: "U12345", requestedAtSeconds: 900 }
    ]
));