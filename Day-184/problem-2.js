// PROBLEM-02: suspendUser()

// Logic: Suspends a user, but blocks it if they're already suspended, or if they've been deleted entirely.

const suspendUser = (users, userId, suspensionReason) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(users)) return "Invalid Input";
    if (typeof userId !== "string" || userId === "") return "Invalid Input";
    if (typeof suspensionReason !== "string" || suspensionReason === "") return "Invalid Input";
    for (let i = 0; i < users.length; i++) {
        const u = users[i];
        if (!u || typeof u !== "object") return "Invalid Input";
        if (typeof u.userId !== "string") return "Invalid Input";
        if (typeof u.status !== "string") return "Invalid Input";
    }

    // --- STEP 2: LOCATE THE TARGET USER ---
    const targetUser = users.find(u => u.userId === userId);
    if (!targetUser) {
        return { suspended: false, reason: "User not found", users };
    }

    // --- STEP 3: STATUS-BASED REJECTION CHECKS ---
    if (targetUser.status === "SUSPENDED") {
        return { suspended: false, reason: "User is already suspended", users };
    }
    if (targetUser.status === "DELETED") {
        return { suspended: false, reason: "Cannot suspend a deleted user", users };
    }

    // --- STEP 4: APPLY SUSPENSION (IMMUTABLY) ---
    const updatedUsers = users.map(u =>
        u.userId === userId ? { ...u, status: "SUSPENDED", suspensionReason } : u
    );

    // --- STEP 5: RETURN SUCCESS RESULT ---
    return { suspended: true, users: updatedUsers };
};

// --- EXAMPLE USAGE ---
console.log(suspendUser(
    [{ userId: "U1", username: "rafi_k", email: "rafi@mail.com", status: "ACTIVE" }],
    "U1",
    "Violation of community guidelines"
));