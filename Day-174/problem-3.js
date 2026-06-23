// problem-03: generateSessionToken()

// Logic: Transforms verified claims and configuration lifespans into structured crypto strings. It resolves authorization tiers using mapped character codes and computes metric durations for application runtime states.

const generateSessionToken = (userInfo, sessionDurationMinutes) => {

    // --- STEP 1: INITIAL STRUCTURAL CHECKS ---
    if (typeof userInfo !== "object" || userInfo === null || Array.isArray(userInfo)) {
        return "Invalid Input";
    }
    if (typeof sessionDurationMinutes !== "number" || isNaN(sessionDurationMinutes) || sessionDurationMinutes < 5 || sessionDurationMinutes > 1440) {
        return "Invalid Input";
    }

    const { userId, role } = userInfo;
    if (typeof userId !== "string" || userId === "" || (role !== "USER" && role !== "ADMIN" && role !== "MODERATOR")) {
        return "Invalid Input";
    }

    // --- STEP 2: SAFE BOUNDARY RESOLUTIONS ---
    // Enforcing systemic compression mappings for role prefixes
    let roleCode = "U";
    let permissionLevel = 1;

    if (role === "ADMIN") {
        roleCode = "A";
        permissionLevel = 3;
    } else if (role === "MODERATOR") {
        roleCode = "M";
        permissionLevel = 2;
    }

    // --- STEP 3: DATA MAP CONVERSIONS ---
    const token = `TKN-${userId}-${roleCode}-${sessionDurationMinutes}`;
    const expiresInSeconds = sessionDurationMinutes * 60;
    const isLongSession = sessionDurationMinutes > 60;

    // --- STEP 4: EMIT LOG BLUEPRINT PACKAGES ---
    return {
        token,
        expiresInSeconds,
        permissionLevel,
        isLongSession
    };
};

// --- EXAMPLE USAGE ---
console.log(generateSessionToken({ userId: "U-789", role: "MODERATOR" }, 120));