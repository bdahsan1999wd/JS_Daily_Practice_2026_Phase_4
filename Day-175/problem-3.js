// Problem-3 : checkPasswordHistory()

// Logic: Extracts localized segment windows from history arrays to isolate token recycling risks. It handles floating history bounds and evaluates matches before constructing feedback metrics.

const checkPasswordHistory = (passwordHistory, newPasswordHash, maxHistoryCheck) => {

    // --- STEP 1: INITIAL STRUCTURAL CHECKS ---
    if (!Array.isArray(passwordHistory) || typeof newPasswordHash !== "string" || newPasswordHash === "") {
        return "Invalid Input";
    }
    if (typeof maxHistoryCheck !== "number" || maxHistoryCheck < 1 || !Number.isInteger(maxHistoryCheck)) {
        return "Invalid Input";
    }

    // --- STEP 2: SAFE BOUNDARY RESOLUTIONS ---
    const historyLength = passwordHistory.length;
    // Calculate safe starting slice ranges avoiding underflow thresholds
    const targetSliceCount = historyLength < maxHistoryCheck ? historyLength : maxHistoryCheck;
    const startIndex = historyLength - targetSliceCount;

    let isReused = false;
    let checkedCount = 0;

    // --- STEP 3: DATA MAP CONVERSIONS (SLIDING HISTORY SCAN) ---
    for (let i = startIndex; i < historyLength; i++) {
        checkedCount++;
        if (passwordHistory[i] === newPasswordHash) {
            isReused = true;
        }
    }

    const message = isReused
        ? `Password was used within your last ${checkedCount} password(s). Please choose a new one.`
        : "Password is unique within checked history.";

    // --- STEP 4: EMIT LOG BLUEPRINT PACKAGES ---
    return {
        isReused,
        checkedCount,
        message
    };
};

// --- EXAMPLE USAGE ---
console.log(checkPasswordHistory(
    ["hash_A", "hash_B", "hash_C", "hash_D"],
    "hash_B",
    3
));