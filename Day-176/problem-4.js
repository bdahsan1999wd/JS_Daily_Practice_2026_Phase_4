// Problem-04: terminateSessions()

// Logic: Cleans transaction states using combinatorial target keys. It maps logical criteria intersections explicitly, filtering matching sessions into decoupled termination pipelines safely.

const terminateSessions = (allSessions, terminationCriteria) => {

    // --- STEP 1: INITIAL STRUCTURAL CHECKS ---
    if (!Array.isArray(allSessions)) {
        return "Invalid Input";
    }
    if (typeof terminationCriteria !== "object" || terminationCriteria === null || Array.isArray(terminationCriteria)) {
        return "Invalid Input";
    }

    const { userId, deviceType, onlySuspicious } = terminationCriteria;

    // Enforce that at least one criteria component must be operational
    if (userId === undefined && deviceType === undefined && onlySuspicious === undefined) return "Invalid Input";
    if (userId === null && deviceType === null && (onlySuspicious === false || onlySuspicious === null)) {
        return "Invalid Input";
    }

    // --- STEP 2: SAFE BOUNDARY RESOLUTIONS ---
    const terminatedSessions = [];
    const remainingSessions = [];

    // --- STEP 3: DATA MAP CONVERSIONS (INTERSECTION FILTERING) ---
    for (let i = 0; i < allSessions.length; i++) {
        const session = allSessions[i];
        if (!session || typeof session !== "object" || typeof session.sessionId !== "string") {
            return "Invalid Input";
        }

        let matchesUserId = true;
        let matchesDeviceType = true;
        let matchesSuspicious = true;

        if (typeof userId === "string") {
            matchesUserId = session.userId === userId;
        }
        if (typeof deviceType === "string") {
            matchesDeviceType = session.deviceType === deviceType;
        }
        if (typeof onlySuspicious === "boolean" && onlySuspicious === true) {
            matchesSuspicious = session.isSuspicious === true;
        }

        // An aggregate intersection demands adherence across all active criteria slots
        if (matchesUserId && matchesDeviceType && matchesSuspicious) {
            terminatedSessions.push(session.sessionId);
        } else {
            remainingSessions.push(session.sessionId);
        }
    }

    const totalCount = allSessions.length;
    const terminatedCount = terminatedSessions.length;
    const terminationSummary = `${terminatedCount} of ${totalCount} session(s) terminated.`;

    // --- STEP 4: EMIT LOG BLUEPRINT PACKAGES ---
    return {
        terminatedSessions,
        remainingSessions,
        terminationSummary
    };
};

// --- EXAMPLE USAGE ---
console.log(terminateSessions([
    { sessionId: "S1", userId: "U1", deviceType: "MOBILE", isSuspicious: true },
    { sessionId: "S2", userId: "U1", deviceType: "DESKTOP", isSuspicious: false },
    { sessionId: "S3", userId: "U2", deviceType: "MOBILE", isSuspicious: true }
], { userId: "U1", deviceType: null, onlySuspicious: true }));