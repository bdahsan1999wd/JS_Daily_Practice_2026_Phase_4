// Problem-03: evaluateDeviceTrust()

// Logic: Cross-references dynamic machine signatures against localized trust profiles. It measures usage age intervals, routes flags into structured classifications, and attaches diagnostic textual context.

const evaluateDeviceTrust = (knownDevices, currentDevice) => {

    // --- STEP 1: INITIAL STRUCTURAL CHECKS ---
    if (!Array.isArray(knownDevices)) {
        return "Invalid Input";
    }
    if (typeof currentDevice !== "object" || currentDevice === null || Array.isArray(currentDevice)) {
        return "Invalid Input";
    }

    const { deviceId, currentDay } = currentDevice;
    if (typeof deviceId !== "string" || deviceId === "" || typeof currentDay !== "number" || isNaN(currentDay) || currentDay < 0) {
        return "Invalid Input";
    }

    // --- STEP 2: SAFE BOUNDARY RESOLUTIONS (SEARCH MATCH) ---
    let matchedDevice = null;
    for (let i = 0; i < knownDevices.length; i++) {
        const device = knownDevices[i];
        if (device && typeof device === "object" && device.deviceId === deviceId) {
            matchedDevice = device;
            break;
        }
    }

    let trustLevel = "";
    let requiresVerification = true;
    let reason = "";

    // --- STEP 3: DATA MAP CONVERSIONS (TRUST ENGINE RULE CODES) ---
    if (!matchedDevice) {
        trustLevel = "UNKNOWN";
        requiresVerification = true;
        reason = "New device not recognized";
    } else {
        if (typeof matchedDevice.loginCount !== "number" || isNaN(matchedDevice.loginCount) || matchedDevice.loginCount < 0) return "Invalid Input";
        if (typeof matchedDevice.lastUsedDay !== "number" || isNaN(matchedDevice.lastUsedDay) || matchedDevice.lastUsedDay < 0) return "Invalid Input";

        const daysSinceLastUse = currentDay - matchedDevice.lastUsedDay;

        if (matchedDevice.loginCount >= 10 && daysSinceLastUse <= 30) {
            trustLevel = "TRUSTED";
            requiresVerification = false;
            reason = "Frequently used, recently active device";
        } else if (matchedDevice.loginCount >= 10 && daysSinceLastUse > 30) {
            trustLevel = "STALE";
            requiresVerification = true;
            reason = "Trusted device but not used recently";
        } else {
            trustLevel = "NEW";
            requiresVerification = true;
            reason = "Device not used enough to establish trust";
        }
    }

    // --- STEP 4: EMIT LOG BLUEPRINT PACKAGES ---
    return {
        trustLevel,
        requiresVerification,
        reason
    };
};

// --- EXAMPLE USAGE ---
console.log(evaluateDeviceTrust([
    { deviceId: "DEV-A1", loginCount: 15, lastUsedDay: 50 },
    { deviceId: "DEV-B2", loginCount: 3, lastUsedDay: 95 }
], { deviceId: "DEV-A1", currentDay: 100 }));