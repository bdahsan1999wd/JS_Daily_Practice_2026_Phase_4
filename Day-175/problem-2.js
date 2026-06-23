// Problem-2 : simulatePasswordReset()

// Logic: Manages state routing for dynamic validation tokens. It steps through a strict hierarchical workflow, screening timestamp lifespans and historical matching before acknowledging authorization shifts.

const simulatePasswordReset = (resetRequest) => {

    // --- STEP 1: INITIAL STRUCTURAL CHECKS ---
    if (typeof resetRequest !== "object" || resetRequest === null || Array.isArray(resetRequest)) {
        return "Invalid Input";
    }

    const { resetTokenIssuedAtSeconds, resetTokenExpirySeconds, currentTimeSeconds, newPassword, oldPassword } = resetRequest;

    if (typeof resetTokenIssuedAtSeconds !== "number" || resetTokenIssuedAtSeconds < 0 || isNaN(resetTokenIssuedAtSeconds)) return "Invalid Input";
    if (typeof resetTokenExpirySeconds !== "number" || resetTokenExpirySeconds <= 0 || isNaN(resetTokenExpirySeconds)) return "Invalid Input";
    if (typeof currentTimeSeconds !== "number" || currentTimeSeconds < 0 || isNaN(currentTimeSeconds)) return "Invalid Input";
    if (typeof newPassword !== "string" || newPassword === "" || typeof oldPassword !== "string" || oldPassword === "") return "Invalid Input";

    // --- STEP 2: SAFE BOUNDARY RESOLUTIONS (SHORT-CIRCUIT RULES) ---
    let resetSuccessful = false;
    let failureReason = null;

    const expiryBoundary = resetTokenIssuedAtSeconds + resetTokenExpirySeconds;

    if (currentTimeSeconds >= expiryBoundary) {
        failureReason = "Reset link has expired";
    } else if (newPassword === oldPassword) {
        failureReason = "New password must be different from old password";
    } else if (newPassword.length < 8) {
        failureReason = "New password too short";
    } else {
        // All constraints met safely
        resetSuccessful = true;
    }

    // --- STEP 3: DATA MAP CONVERSIONS ---
    // Enforcing strict single-reason error outputs as per specifications

    // --- STEP 4: EMIT LOG BLUEPRINT PACKAGES ---
    return {
        resetSuccessful,
        failureReason
    };
};

// --- EXAMPLE USAGE ---
console.log(simulatePasswordReset({
    resetTokenIssuedAtSeconds: 1000,
    resetTokenExpirySeconds: 600,
    currentTimeSeconds: 1500,
    newPassword: "NewPass99",
    oldPassword: "OldPass88"
}));