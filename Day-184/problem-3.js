// PROBLEM-03: reactivateUser()

// Logic: Reactivates a suspended user back to ACTIVE and the suspensionReason field must be COMPLETELY removed from the object (not just set to null/undefined, the key itself should not exist anymore).

const reactivateUser = (users, userId) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(users)) return "Invalid Input";
    if (typeof userId !== "string" || userId === "") return "Invalid Input";
    for (let i = 0; i < users.length; i++) {
        const u = users[i];
        if (!u || typeof u !== "object") return "Invalid Input";
        if (typeof u.userId !== "string") return "Invalid Input";
        if (typeof u.status !== "string") return "Invalid Input";
    }

    // --- STEP 2: LOCATE THE TARGET USER ---
    const targetUser = users.find(u => u.userId === userId);
    if (!targetUser) {
        return { reactivated: false, reason: "User not found", users };
    }

    // --- STEP 3: ELIGIBILITY CHECK (must be SUSPENDED) ---
    if (targetUser.status !== "SUSPENDED") {
        return { reactivated: false, reason: "Only suspended users can be reactivated", users };
    }

    // --- STEP 4: REACTIVATE & FULLY DROP suspensionReason (IMMUTABLY) ---
    // KEY TRICK: destructure `suspensionReason` OUT into its own variable,
    // and collect everything else into `rest`. Since `rest` never had
    // suspensionReason in the first place, spreading {...rest} produces
    // a brand new object where that key simply doesn't exist at all
    // this is different from setting it to undefined/null.
    const updatedUsers = users.map(u => {
        if (u.userId !== userId) return u;
        const { suspensionReason, ...rest } = u;
        return { ...rest, status: "ACTIVE" };
    });

    // --- STEP 5: RETURN SUCCESS RESULT ---
    return { reactivated: true, users: updatedUsers };
};

// --- EXAMPLE USAGE ---
console.log(reactivateUser(
    [{ userId: "U1", username: "rafi_k", email: "rafi@mail.com", status: "SUSPENDED", suspensionReason: "Violation of community guidelines" }],
    "U1"
));