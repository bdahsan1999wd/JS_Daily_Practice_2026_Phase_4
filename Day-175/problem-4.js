// Problem-4 : managePasswordExpiry()

// Logic: Evaluates operational age parameters relative to custom sliding targets. It segments individual items across distinctive state vectors and aggregates distribution rates smoothly.

const managePasswordExpiry = (accounts, currentDay) => {

    // --- STEP 1: INITIAL STRUCTURAL CHECKS ---
    if (!Array.isArray(accounts) || typeof currentDay !== "number" || currentDay < 0 || isNaN(currentDay)) {
        return "Invalid Input";
    }

    const expiredAccounts = [];
    const expiringSoonAccounts = [];
    const activeAccounts = [];

    // --- STEP 2: SAFE BOUNDARY RESOLUTIONS (ROW ENGINE) ---
    for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i];
        if (typeof account !== "object" || account === null || typeof account.username !== "string") {
            return "Invalid Input";
        }
        if (typeof account.passwordSetDay !== "number" || account.passwordSetDay < 0 || isNaN(account.passwordSetDay)) return "Invalid Input";
        if (typeof account.expiryPolicyDays !== "number" || account.expiryPolicyDays <= 0 || isNaN(account.expiryPolicyDays)) return "Invalid Input";

        const daysSinceSet = currentDay - account.passwordSetDay;
        const daysUntilExpiry = account.expiryPolicyDays - daysSinceSet;

        // --- STEP 3: DATA MAP CONVERSIONS (CATEGORIZATION ARRAY MAP) ---
        if (daysUntilExpiry <= 0) {
            expiredAccounts.push(account.username);
        } else if (daysUntilExpiry <= 7) {
            expiringSoonAccounts.push(account.username);
        } else {
            activeAccounts.push(account.username);
        }
    }

    const totalAccounts = accounts.length;
    // Calculate final metrics preventing empty sets arithmetic crash
    const expiryRate = totalAccounts === 0 ? 0.00 : parseFloat(((expiredAccounts.length / totalAccounts) * 100).toFixed(2));

    // --- STEP 4: EMIT LOG BLUEPRINT PACKAGES ---
    return {
        expiredAccounts,
        expiringSoonAccounts,
        activeAccounts,
        expiryRate
    };
};

// --- EXAMPLE USAGE ---
console.log(managePasswordExpiry([
    { username: "alam", passwordSetDay: 0, expiryPolicyDays: 90 },
    { username: "bina", passwordSetDay: 10, expiryPolicyDays: 30 },
    { username: "cyrus", passwordSetDay: 50, expiryPolicyDays: 60 }
], 100));