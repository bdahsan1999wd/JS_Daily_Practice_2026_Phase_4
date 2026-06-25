// Problem-01: createSession()

// Logic: Manages synchronous creation sequences under strict storage limits. It scans existing records to aggregate specific target intersections, enforcing fallback rules before formatting structural unique codes.

const createSession = (userId, deviceInfo, activeSessions) => {

    // --- STEP 1: INITIAL STRUCTURAL CHECKS ---
    if (typeof userId !== "string" || userId === "") {
        return "Invalid Input";
    }
    if (typeof deviceInfo !== "object" || deviceInfo === null || Array.isArray(deviceInfo)) {
        return "Invalid Input";
    }
    if (!Array.isArray(activeSessions)) {
        return "Invalid Input";
    }

    const { deviceType, ipAddress } = deviceInfo;
    if (deviceType !== "MOBILE" && deviceType !== "DESKTOP" && deviceType !== "TABLET") return "Invalid Input";
    if (typeof ipAddress !== "string" || ipAddress === "") return "Invalid Input";

    // --- STEP 2: SAFE BOUNDARY RESOLUTIONS (CONCURRENCY CHECKS) ---
    let existingUserSessionCount = 0;

    for (let i = 0; i < activeSessions.length; i++) {
        const session = activeSessions[i];
        if (session && typeof session === "object" && session.userId === userId) {
            existingUserSessionCount++;
        }
    }

    // --- STEP 3: DATA MAP CONVERSIONS ---
    if (existingUserSessionCount >= 3) {
        return {
            createdSuccessfully: false,
            message: "Session limit reached. Maximum 3 concurrent sessions allowed."
        };
    }

    const sessionId = `SES-${userId}-${activeSessions.length + 1}`;
    const currentSessionCount = existingUserSessionCount + 1;

    // --- STEP 4: EMIT LOG BLUEPRINT PACKAGES ---
    return {
        createdSuccessfully: true,
        sessionId,
        currentSessionCount
    };
};

// --- EXAMPLE USAGE ---
console.log(createSession(
    "U-501",
    { deviceType: "MOBILE", ipAddress: "10.0.0.5" },
    [
        { userId: "U-501", sessionId: "SES-A", deviceType: "DESKTOP" },
        { userId: "U-501", sessionId: "SES-B", deviceType: "TABLET" },
        { userId: "U-900", sessionId: "SES-C", deviceType: "MOBILE" }
    ]
));