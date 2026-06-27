// Problem-03: cleanExpiredOtps()

// Logic: Iterates over record arrays to detect dead data flags. It extracts target identifiers into cleanup lists while packaging functional instances cleanly.

const cleanExpiredOtps = (otpRecords, currentTimeSeconds) => {

    // --- STEP 1: INITIAL STRUCTURAL CHECKS ---
    if (!Array.isArray(otpRecords) || otpRecords.length === 0) {
        return "Invalid Input";
    }
    if (typeof currentTimeSeconds !== "number" || isNaN(currentTimeSeconds) || currentTimeSeconds < 0) {
        return "Invalid Input";
    }

    const cleanedRecords = [];
    const validRecords = [];

    // --- STEP 2: SAFE BOUNDARY RESOLUTIONS (CLEANUP RUN ENGINE) ---
    for (let i = 0; i < otpRecords.length; i++) {
        const record = otpRecords[i];
        if (!record || typeof record !== "object" || typeof record.userId !== "string") {
            return "Invalid Input";
        }
        if (typeof record.otpCode !== "string" || typeof record.expiresAtSeconds !== "number") return "Invalid Input";
        if (typeof record.isUsed !== "boolean" || isNaN(record.expiresAtSeconds)) return "Invalid Input";

        // Criteria rule mapping assessment
        const isExpired = currentTimeSeconds >= record.expiresAtSeconds;
        const isConsumed = record.isUsed === true;

        // --- STEP 3: DATA MAP CONVERSIONS ---
        if (isExpired || isConsumed) {
            cleanedRecords.push(record.userId);
        } else {
            validRecords.push(record);
        }
    }

    const totalCount = otpRecords.length;
    const cleanedCount = cleanedRecords.length;
    const cleanupSummary = `${cleanedCount} of ${totalCount} OTP record(s) cleaned.`;

    // --- STEP 4: EMIT LOG BLUEPRINT PACKAGES ---
    return {
        cleanedRecords,
        validRecords,
        cleanupSummary
    };
};

// --- EXAMPLE USAGE ---
console.log(cleanExpiredOtps([
    { userId: "U1", otpCode: "111111", expiresAtSeconds: 500, isUsed: false },
    { userId: "U2", otpCode: "222222", expiresAtSeconds: 900, isUsed: true },
    { userId: "U3", otpCode: "333333", expiresAtSeconds: 900, isUsed: false }
], 700));