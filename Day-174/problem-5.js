// Problem-05: auditLoginActivity()

// Logic: Performs data aggregation across system log arrays. It captures metrics via lookups, standardizes rate values through float transformations, and filters malicious user clusters using tracking flags.

const auditLoginActivity = (loginLogs) => {

    // --- STEP 1: INITIAL STRUCTURAL CHECKS ---
    if (!Array.isArray(loginLogs) || loginLogs.length === 0) {
        return "Invalid Input";
    }

    // --- STEP 2: SAFE BOUNDARY RESOLUTIONS ---
    const totalAttempts = loginLogs.length;
    let successfulLogins = 0;
    let failedLogins = 0;

    // Tracker arrays to emulate lookup structures safely
    const uniqueUsersArray = [];
    const uniqueIPsArray = [];

    // Tracking lists for suspicious activity calculations
    const failureCountMap = {};

    for (let i = 0; i < totalAttempts; i++) {
        const log = loginLogs[i];
        if (typeof log !== "object" || log === null || typeof log.username !== "string" || typeof log.success !== "boolean" || typeof log.ipAddress !== "string") {
            return "Invalid Input";
        }

        // Increment outcome types
        if (log.success === true) {
            successfulLogins++;
        } else {
            failedLogins++;
            // Increment failure tracking map for this username
            failureCountMap[log.username] = (failureCountMap[log.username] || 0) + 1;
        }

        // Track uniqueness arrays safely
        if (!uniqueUsersArray.includes(log.username)) {
            uniqueUsersArray.push(log.username);
        }
        if (!uniqueIPsArray.includes(log.ipAddress)) {
            uniqueIPsArray.push(log.ipAddress);
        }
    }

    // --- STEP 3: DATA MAP CONVERSIONS ---
    const uniqueUsers = uniqueUsersArray.length;
    const uniqueIPs = uniqueIPsArray.length;
    const successRate = parseFloat(((successfulLogins / totalAttempts) * 100).toFixed(2));

    // Gather suspicious entities meeting criteria (failures >= 3)
    const suspiciousUsers = [];
    for (const targetedUser in failureCountMap) {
        if (failureCountMap[targetedUser] >= 3) {
            suspiciousUsers.push(targetedUser);
        }
    }

    // --- STEP 4: EMIT LOG BLUEPRINT PACKAGES ---
    return {
        totalAttempts,
        successfulLogins,
        failedLogins,
        successRate,
        uniqueUsers,
        uniqueIPs,
        suspiciousUsers
    };
};

// --- EXAMPLE USAGE ---
console.log(auditLoginActivity([
    { username: "rafi", success: false, ipAddress: "192.168.1.1", timestamp: 1 },
    { username: "rafi", success: false, ipAddress: "192.168.1.1", timestamp: 2 },
    { username: "rafi", success: false, ipAddress: "192.168.1.2", timestamp: 3 },
    { username: "mona", success: true, ipAddress: "192.168.1.3", timestamp: 4 }
]));