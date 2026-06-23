// Problem-02: trackLoginAttempts()

// Logic: Analyzes temporal user request streams to calculate cumulative security faults. It scans data backward from the tail index to compute uninterrupted sequence limits, converting threshold intersections into state lockout directives.

const trackLoginAttempts = (attemptHistory, newAttempt) => {

    // --- STEP 1: INITIAL STRUCTURAL CHECKS ---
    if (!Array.isArray(attemptHistory)) {
        return "Invalid Input";
    }
    if (typeof newAttempt !== "object" || newAttempt === null || Array.isArray(newAttempt)) {
        return "Invalid Input";
    }

    const { username: newTarget, success: newSuccess, timestamp: newTime } = newAttempt;
    if (typeof newTarget !== "string" || newTarget === "" || typeof newSuccess !== "boolean" || typeof newTime !== "number" || isNaN(newTime)) {
        return "Invalid Input";
    }

    // --- STEP 2: SAFE BOUNDARY RESOLUTIONS ---
    // Extract and structure entries targeting this specific username space safely
    const localizedHistory = [];
    for (let i = 0; i < attemptHistory.length; i++) {
        const entry = attemptHistory[i];
        if (entry && typeof entry === "object" && entry.username === newTarget && typeof entry.success === "boolean") {
            localizedHistory.push(entry);
        }
    }

    // --- STEP 3: DATA MAP CONVERSIONS (BACKWARD SCANNING) ---
    let consecutiveFailures = 0;

    if (newSuccess === false) {
        consecutiveFailures = 1; // Start counting from the incoming failure
        // Walk backward through history sequence to aggregate older failures
        for (let j = localizedHistory.length - 1; j >= 0; j--) {
            if (localizedHistory[j].success === false) {
                consecutiveFailures++;
            } else {
                break; // Uninterrupted sequence broken by historic success
            }
        }
    } else {
        consecutiveFailures = 0; // Fresh successful login completely breaks failure trails
    }

    // Evaluate absolute policy limit maps
    const shouldLock = consecutiveFailures >= 5;
    const lockMessage = shouldLock ? "Account locked due to 5 consecutive failed attempts" : "Account active";

    // --- STEP 4: EMIT LOG BLUEPRINT PACKAGES ---
    return {
        consecutiveFailures,
        shouldLock,
        lockMessage
    };
};

// --- EXAMPLE USAGE ---
console.log(trackLoginAttempts([
    { username: "nila22", success: true, timestamp: 1 },
    { username: "nila22", success: false, timestamp: 2 },
    { username: "nila22", success: false, timestamp: 3 },
    { username: "nila22", success: false, timestamp: 4 }
], { username: "nila22", success: false, timestamp: 5 }));