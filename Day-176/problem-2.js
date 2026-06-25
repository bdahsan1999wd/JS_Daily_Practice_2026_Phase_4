// Problem-02: checkIdleTimeout()

// Logic: Processes sequential arrays of temporal user activity. It extracts individual time limits dynamically, segments live vectors into distinctive states, and computes overall decay ratios cleanly.

const checkIdleTimeout = (sessions, currentTimeMinutes, idleLimitMinutes) => {

    // --- STEP 1: INITIAL STRUCTURAL CHECKS ---
    if (!Array.isArray(sessions) || sessions.length === 0) {
        return "Invalid Input";
    }
    if (typeof currentTimeMinutes !== "number" || isNaN(currentTimeMinutes) || currentTimeMinutes < 0) {
        return "Invalid Input";
    }
    if (typeof idleLimitMinutes !== "number" || isNaN(idleLimitMinutes) || idleLimitMinutes <= 0) {
        return "Invalid Input";
    }

    const expiredSessions = [];
    const activeSessions = [];

    // --- STEP 2: SAFE BOUNDARY RESOLUTIONS (LOOP LIFECYCLE) ---
    for (let i = 0; i < sessions.length; i++) {
        const currentSession = sessions[i];
        if (!currentSession || typeof currentSession !== "object" || typeof currentSession.sessionId !== "string") {
            return "Invalid Input";
        }
        if (typeof currentSession.lastActivityMinutes !== "number" || isNaN(currentSession.lastActivityMinutes) || currentSession.lastActivityMinutes < 0) {
            return "Invalid Input";
        }

        const idleDuration = currentTimeMinutes - currentSession.lastActivityMinutes;

        // --- STEP 3: DATA MAP CONVERSIONS ---
        if (idleDuration >= idleLimitMinutes) {
            expiredSessions.push(currentSession.sessionId);
        } else {
            activeSessions.push(currentSession.sessionId);
        }
    }

    const totalSessions = sessions.length;
    const expiryRate = parseFloat(((expiredSessions.length / totalSessions) * 100).toFixed(2));

    // --- STEP 4: EMIT LOG BLUEPRINT PACKAGES ---
    return {
        expiredSessions,
        activeSessions,
        expiryRate
    };
};

// --- EXAMPLE USAGE ---
console.log(checkIdleTimeout([
    { sessionId: "S1", lastActivityMinutes: 100 },
    { sessionId: "S2", lastActivityMinutes: 150 },
    { sessionId: "S3", lastActivityMinutes: 170 }
], 180, 30));