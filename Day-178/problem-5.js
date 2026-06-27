// Problem-05: generateOtpHealthReport()

// Logic: Parses structural telemetry arrays into an analytics overview. It tracks distinct distribution channels, maps performance benchmarks, and computes extreme failure offsets.

const generateOtpHealthReport = (otpLogs) => {

    // --- STEP 1: INITIAL STRUCTURAL CHECKS ---
    if (!Array.isArray(otpLogs) || otpLogs.length === 0) {
        return "Invalid Input";
    }

    const totalOtpsSent = otpLogs.length;
    let verifiedCount = 0;
    let expiredCount = 0;
    let sumAttempts = 0;

    const channelPerformance = {};
    const channelSequence = []; // Safeguard operational insertion order for tie-breaking

    // --- STEP 2: SAFE BOUNDARY RESOLUTIONS (DATA BATCH COMPILATION) ---
    for (let i = 0; i < totalOtpsSent; i++) {
        const log = otpLogs[i];
        if (!log || typeof log !== "object" || typeof log.userId !== "string" || typeof log.channel !== "string") {
            return "Invalid Input";
        }
        if (typeof log.wasVerified !== "boolean" || typeof log.attemptsUsed !== "number" || typeof log.expiredBeforeUse !== "boolean") {
            return "Invalid Input";
        }
        if (isNaN(log.attemptsUsed) || log.attemptsUsed < 0) return "Invalid Input";

        // Aggregate overall count metrics
        if (log.wasVerified === true) verifiedCount++;
        if (log.expiredBeforeUse === true) expiredCount++;
        sumAttempts += log.attemptsUsed;

        // Populate inline performance registries by channel strings
        if (!channelPerformance[log.channel]) {
            channelPerformance[log.channel] = { total: 0, verified: 0, successRate: 0.00 };
            channelSequence.push(log.channel);
        }

        channelPerformance[log.channel].total++;
        if (log.wasVerified === true) {
            channelPerformance[log.channel].verified++;
        }
    }

    // --- STEP 3: DATA MAP CONVERSIONS (METRIC CONVERSION RATIOS) ---
    const verificationSuccessRate = parseFloat(((verifiedCount / totalOtpsSent) * 100).toFixed(2));
    const avgAttemptsUsed = parseFloat((sumAttempts / totalOtpsSent).toFixed(2));

    // Refine inline parameter properties across dynamic networks
    for (const channelKey in channelPerformance) {
        const chanObj = channelPerformance[channelKey];
        chanObj.successRate = parseFloat(((chanObj.verified / chanObj.total) * 100).toFixed(2));
    }

    // Isolate worst performing network channel with strict fallback rules
    let worstPerformingChannel = null;
    let minSuccessRate = Infinity;
    let maxTotalForTie = -1;

    for (let k = 0; k < channelSequence.length; k++) {
        const currentChan = channelSequence[k];
        const currentMetrics = channelPerformance[currentChan];

        if (currentMetrics.successRate < minSuccessRate) {
            minSuccessRate = currentMetrics.successRate;
            maxTotalForTie = currentMetrics.total;
            worstPerformingChannel = currentChan;
        } else if (currentMetrics.successRate === minSuccessRate) {
            // Tie-break 1: Pick the node exhibiting greater volume footprint
            if (currentMetrics.total > maxTotalForTie) {
                maxTotalForTie = currentMetrics.total;
                worstPerformingChannel = currentChan;
            }
            // Tie-break 2: Retain first indexed node if volumes balance out
        }
    }

    // --- STEP 4: EMIT LOG BLUEPRINT PACKAGES ---
    return {
        totalOtpsSent,
        verifiedCount,
        expiredCount,
        verificationSuccessRate,
        avgAttemptsUsed,
        channelPerformance,
        worstPerformingChannel
    };
};

// --- EXAMPLE USAGE ---
console.log(generateOtpHealthReport([
    { userId: "U1", channel: "SMS", wasVerified: true, attemptsUsed: 1, expiredBeforeUse: false },
    { userId: "U2", channel: "SMS", wasVerified: false, attemptsUsed: 3, expiredBeforeUse: true },
    { userId: "U3", channel: "EMAIL", wasVerified: true, attemptsUsed: 1, expiredBeforeUse: false }
]));