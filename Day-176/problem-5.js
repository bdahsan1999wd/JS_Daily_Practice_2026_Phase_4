// Problem-05: generateSessionAnalytics()

// Logic: Batches operational context records into a data dashboard. It compiles aggregations, isolates extreme parameters, and derives proportional distribution metrics flawlessly.

const generateSessionAnalytics = (sessionLogs) => {

    // --- STEP 1: INITIAL STRUCTURAL CHECKS ---
    if (!Array.isArray(sessionLogs) || sessionLogs.length === 0) {
        return "Invalid Input";
    }

    // --- STEP 2: SAFE BOUNDARY RESOLUTIONS ---
    const totalSessions = sessionLogs.length;
    let totalDuration = 0;
    let suspiciousCount = 0;

    const deviceBreakdown = {
        MOBILE: 0,
        DESKTOP: 0,
        TABLET: 0
    };

    let longestSession = null;

    for (let i = 0; i < totalSessions; i++) {
        const log = sessionLogs[i];
        if (!log || typeof log !== "object" || typeof log.userId !== "string" || typeof log.isSuspicious !== "boolean") {
            return "Invalid Input";
        }
        if (typeof log.durationMinutes !== "number" || isNaN(log.durationMinutes) || log.durationMinutes < 0) return "Invalid Input";
        if (log.deviceType !== "MOBILE" && log.deviceType !== "DESKTOP" && log.deviceType !== "TABLET") return "Invalid Input";

        // Tally foundational counters
        totalDuration += log.durationMinutes;
        if (log.isSuspicious === true) suspiciousCount++;

        // Track breakdown configurations safely
        deviceBreakdown[log.deviceType]++;

        // Resolve peak metrics via explicit comparisons
        if (longestSession === null || log.durationMinutes > longestSession.durationMinutes) {
            longestSession = log;
        }
    }

    // --- STEP 3: DATA MAP CONVERSIONS (PEAK METRIC COMPILATIONS) ---
    const avgDuration = parseFloat((totalDuration / totalSessions).toFixed(2));
    const suspiciousRate = parseFloat(((suspiciousCount / totalSessions) * 100).toFixed(2));

    // Evaluate peak layout categories across the breakdown mapping
    let mostUsedDevice = "";
    let maxDeviceCount = -1;

    for (const deviceKey in deviceBreakdown) {
        if (deviceBreakdown[deviceKey] > maxDeviceCount) {
            maxDeviceCount = deviceBreakdown[deviceKey];
            mostUsedDevice = deviceKey;
        }
    }

    // --- STEP 4: EMIT LOG BLUEPRINT PACKAGES ---
    return {
        totalSessions,
        avgDuration,
        deviceBreakdown,
        suspiciousCount,
        suspiciousRate,
        longestSession,
        mostUsedDevice
    };
};

// --- EXAMPLE USAGE ---
console.log(generateSessionAnalytics([
    { userId: "U1", deviceType: "MOBILE", durationMinutes: 45, isSuspicious: false },
    { userId: "U2", deviceType: "MOBILE", durationMinutes: 90, isSuspicious: true },
    { userId: "U3", deviceType: "DESKTOP", durationMinutes: 30, isSuspicious: false }
]));