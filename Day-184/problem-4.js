// PROBLEM-04: userStatusSummary()

// Logic: Counts users by status, computes what fraction are ACTIVE, and grades the overall account "health" based on that rate.

const userStatusSummary = (users) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(users) || users.length === 0) return "Invalid Input";
    for (let i = 0; i < users.length; i++) {
        const u = users[i];
        if (!u || typeof u !== "object") return "Invalid Input";
        if (typeof u.userId !== "string") return "Invalid Input";
        if (typeof u.username !== "string") return "Invalid Input";
        if (!["ACTIVE", "SUSPENDED", "DELETED"].includes(u.status)) return "Invalid Input";
    }

    // --- STEP 2: COUNT USERS BY STATUS ---
    const totalUsers = users.length;
    const activeCount = users.filter(u => u.status === "ACTIVE").length;
    const suspendedCount = users.filter(u => u.status === "SUSPENDED").length;
    const deletedCount = users.filter(u => u.status === "DELETED").length;

    // --- STEP 3: COMPUTE ACTIVE RATE (%) ---
    const activeRate = Number(((activeCount / totalUsers) * 100).toFixed(2));

    // --- STEP 4: DETERMINE OVERALL HEALTH LEVEL ---
    let statusHealthLevel;
    if (activeRate >= 90) statusHealthLevel = "EXCELLENT";
    else if (activeRate >= 70) statusHealthLevel = "GOOD";
    else if (activeRate >= 50) statusHealthLevel = "FAIR";
    else statusHealthLevel = "POOR";

    // --- STEP 5: RETURN RESULT ---
    return { totalUsers, activeCount, suspendedCount, deletedCount, activeRate, statusHealthLevel };
};

// --- EXAMPLE USAGE ---
console.log(userStatusSummary([
    { userId: "U1", username: "rafi_k", status: "ACTIVE" },
    { userId: "U2", username: "mina_h", status: "ACTIVE" },
    { userId: "U3", username: "kabir_j", status: "SUSPENDED" },
    { userId: "U4", username: "lina_p", status: "DELETED" }
]));