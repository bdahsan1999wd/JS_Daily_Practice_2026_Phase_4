// PROBLEM-05: generateSecurityPostureReport()

// Logic: Aggregates security stats across all users into one report: MFA adoption %, stale passwords, high-risk users, admin gaps, and an overall letter grade for the organization's security.

const generateSecurityPostureReport = (userSecurityData) => {

    // --- STEP 1: VALIDATION ---
    // 1a) must be a non-empty array
    if (!Array.isArray(userSecurityData) || userSecurityData.length === 0) {
        return "Invalid Input";
    }
    // 1b) validate every user record's shape and ranges
    for (let i = 0; i < userSecurityData.length; i++) {
        const u = userSecurityData[i];
        if (!u || typeof u !== "object") return "Invalid Input";
        if (typeof u.userId !== "string" || u.userId === "") return "Invalid Input";
        if (typeof u.hasMFAEnabled !== "boolean") return "Invalid Input";
        if (typeof u.passwordAgeDays !== "number" || u.passwordAgeDays < 0) return "Invalid Input";
        if (typeof u.lastLoginRiskScore !== "number" || u.lastLoginRiskScore < 0 || u.lastLoginRiskScore > 100) return "Invalid Input";
        if (!["USER", "ADMIN"].includes(u.roleType)) return "Invalid Input";
    }

    // --- STEP 2: BASIC COUNTS ---
    const totalUsers = userSecurityData.length;

    const mfaEnabledCount = userSecurityData.filter(u => u.hasMFAEnabled === true).length;
    // round MFA adoption rate to 2 decimal places
    const mfaAdoptionRate = Number(((mfaEnabledCount / totalUsers) * 100).toFixed(2));

    // --- STEP 3: USERS WITH STALE PASSWORDS (older than 90 days) ---
    const usersWithStalePasswords = userSecurityData
        .filter(u => u.passwordAgeDays > 90)
        .map(u => u.userId);

    // --- STEP 4: HIGH RISK USERS (last login risk score >= 70) ---
    const highRiskUsers = userSecurityData
        .filter(u => u.lastLoginRiskScore >= 70)
        .map(u => u.userId);

    // --- STEP 5: ADMIN SECURITY GAPS (admin account without MFA enabled) ---
    // This is treated as the MOST CRITICAL gap — an unprotected admin account.
    const adminSecurityGaps = userSecurityData
        .filter(u => u.roleType === "ADMIN" && u.hasMFAEnabled === false)
        .map(u => u.userId);

    // --- STEP 6: OVERALL SECURITY GRADE ---
    let overallSecurityGrade;
    if (adminSecurityGaps.length > 0) {
        overallSecurityGrade = "F"; // any unprotected admin = automatic fail
    } else if (mfaAdoptionRate >= 80 && highRiskUsers.length === 0) {
        overallSecurityGrade = "A";
    } else if (mfaAdoptionRate >= 60) {
        overallSecurityGrade = "B";
    } else if (mfaAdoptionRate >= 40) {
        overallSecurityGrade = "C";
    } else {
        overallSecurityGrade = "D";
    }

    // --- STEP 7: RETURN FINAL RESULT ---
    return {
        totalUsers,
        mfaAdoptionRate,
        usersWithStalePasswords,
        highRiskUsers,
        adminSecurityGaps,
        overallSecurityGrade
    };
};

// --- EXAMPLE USAGE ---
console.log(generateSecurityPostureReport([
    { userId: "U1", hasMFAEnabled: true, passwordAgeDays: 100, lastLoginRiskScore: 20, roleType: "USER" },
    { userId: "U2", hasMFAEnabled: false, passwordAgeDays: 30, lastLoginRiskScore: 80, roleType: "ADMIN" },
    { userId: "U3", hasMFAEnabled: true, passwordAgeDays: 10, lastLoginRiskScore: 15, roleType: "USER" }
]));