// Problem-05: generateAccessAuditReport()

// Logic: Parses raw transactional security events into structured profiles. It identifies peak refusal types, tallies isolated role drops, and detects recurring credential issues.

const generateAccessAuditReport = (accessLogs) => {

    // --- STEP 1: INITIAL STRUCTURAL CHECKS ---
    if (!Array.isArray(accessLogs) || accessLogs.length === 0) {
        return "Invalid Input";
    }

    // --- STEP 2: SAFE BOUNDARY RESOLUTIONS ---
    const totalRequests = accessLogs.length;
    let grantedCount = 0;
    let deniedCount = 0;

    const deniedByRole = {};
    const denialPermissionCounts = {};
    const denialPermissionOrder = []; // To preserve log sequence for tie-breaking
    const userDenialTracker = {};

    for (let i = 0; i < totalRequests; i++) {
        const log = accessLogs[i];
        if (!log || typeof log !== "object" || typeof log.username !== "string" || typeof log.role !== "string") {
            return "Invalid Input";
        }
        if (typeof log.requestedPermission !== "string" || typeof log.wasGranted !== "boolean") {
            return "Invalid Input";
        }

        if (log.wasGranted === true) {
            grantedCount++;
        } else {
            deniedCount++;

            // Tally denial instances grouped under role keys
            deniedByRole[log.role] = (deniedByRole[log.role] || 0) + 1;

            // Log denial targets to evaluate top-level exposures
            if (!denialPermissionCounts[log.requestedPermission]) {
                denialPermissionCounts[log.requestedPermission] = 0;
                denialPermissionOrder.push(log.requestedPermission);
            }
            denialPermissionCounts[log.requestedPermission]++;

            // Accumulate isolated failures against individuals
            userDenialTracker[log.username] = (userDenialTracker[log.username] || 0) + 1;
        }
    }

    // --- STEP 3: DATA MAP CONVERSIONS (METRIC RESOLUTIONS) ---
    const denialRate = parseFloat(((deniedCount / totalRequests) * 100).toFixed(2));

    // Identify the permission with the highest denial frequency (first match wins ties)
    let mostDeniedPermission = null;
    let maxDenialValue = -1;

    for (let k = 0; k < denialPermissionOrder.length; k++) {
        const targetPerm = denialPermissionOrder[k];
        if (denialPermissionCounts[targetPerm] > maxDenialValue) {
            maxDenialValue = denialPermissionCounts[targetPerm];
            mostDeniedPermission = targetPerm;
        }
    }

    // Extract user signatures passing standard validation threshold limits (denials >= 2)
    const usersWithMultipleDenials = [];
    for (const targetUser in userDenialTracker) {
        if (userDenialTracker[targetUser] >= 2) {
            usersWithMultipleDenials.push(targetUser);
        }
    }

    // --- STEP 4: EMIT LOG BLUEPRINT PACKAGES ---
    return {
        totalRequests,
        grantedCount,
        deniedCount,
        denialRate,
        deniedByRole,
        mostDeniedPermission,
        usersWithMultipleDenials
    };
};

// --- EXAMPLE USAGE ---
console.log(generateAccessAuditReport([
    { username: "tina", role: "VIEWER", requestedPermission: "DELETE", wasGranted: false },
    { username: "tina", role: "VIEWER", requestedPermission: "WRITE", wasGranted: false },
    { username: "kabir", role: "EDITOR", requestedPermission: "DELETE", wasGranted: false },
    { username: "alam", role: "ADMIN", requestedPermission: "DELETE", wasGranted: true }
]));