// PROBLEM-05: runUserManagementWorkflow()

// Logic: The "orchestrator" — composes createUser(), suspendUser(), and reactivateUser() into ONE sequential pipeline, then runs userStatusSummary() logic on the final user list.

const runUserManagementWorkflow = (initialUsers, operations) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(initialUsers)) return "Invalid Input";
    if (!Array.isArray(operations)) return "Invalid Input";
    for (let i = 0; i < initialUsers.length; i++) {
        const u = initialUsers[i];
        if (!u || typeof u !== "object") return "Invalid Input";
        if (typeof u.userId !== "string") return "Invalid Input";
        if (typeof u.username !== "string") return "Invalid Input";
        if (typeof u.email !== "string") return "Invalid Input";
        if (!["ACTIVE", "SUSPENDED", "DELETED"].includes(u.status)) return "Invalid Input";
    }
    for (let i = 0; i < operations.length; i++) {
        const op = operations[i];
        if (!op || typeof op !== "object") return "Invalid Input";
        if (!["CREATE", "SUSPEND", "REACTIVATE"].includes(op.type)) return "Invalid Input";
    }

    // --- STEP 2: PROCESS OPERATIONS SEQUENTIALLY ---
    // `currentUsers` is our running "state" — each operation reads from it
    // and (if successful) produces the next version for the next step.
    let currentUsers = initialUsers;
    const operationLog = [];

    for (let i = 0; i < operations.length; i++) {
        const op = operations[i];

        if (op.type === "CREATE") {
            // --- inline equivalent of createUser() logic ---
            const newUser = op.user;
            const isDuplicateId = currentUsers.some(u => u.userId === newUser?.userId);
            const isDuplicateEmail = currentUsers.some(u => u.email.toLowerCase() === newUser?.email?.toLowerCase());

            if (isDuplicateId) {
                operationLog.push({ type: "CREATE", success: false, reason: "User ID already exists" });
            } else if (isDuplicateEmail) {
                operationLog.push({ type: "CREATE", success: false, reason: "Email already registered" });
            } else {
                const createdUser = { userId: newUser.userId, username: newUser.username, email: newUser.email, status: "ACTIVE" };
                currentUsers = [...currentUsers, createdUser];
                operationLog.push({ type: "CREATE", success: true, reason: null });
            }

        } else if (op.type === "SUSPEND") {
            // --- inline equivalent of suspendUser() logic ---
            const targetUser = currentUsers.find(u => u.userId === op.userId);

            if (!targetUser) {
                operationLog.push({ type: "SUSPEND", success: false, reason: "User not found" });
            } else if (targetUser.status === "SUSPENDED") {
                operationLog.push({ type: "SUSPEND", success: false, reason: "User is already suspended" });
            } else if (targetUser.status === "DELETED") {
                operationLog.push({ type: "SUSPEND", success: false, reason: "Cannot suspend a deleted user" });
            } else {
                currentUsers = currentUsers.map(u =>
                    u.userId === op.userId ? { ...u, status: "SUSPENDED", suspensionReason: op.reason } : u
                );
                operationLog.push({ type: "SUSPEND", success: true, reason: null });
            }

        } else if (op.type === "REACTIVATE") {
            // --- inline equivalent of reactivateUser() logic ---
            const targetUser = currentUsers.find(u => u.userId === op.userId);

            if (!targetUser) {
                operationLog.push({ type: "REACTIVATE", success: false, reason: "User not found" });
            } else if (targetUser.status !== "SUSPENDED") {
                operationLog.push({ type: "REACTIVATE", success: false, reason: "Only suspended users can be reactivated" });
            } else {
                // same destructure-to-drop trick used in Problem-03
                currentUsers = currentUsers.map(u => {
                    if (u.userId !== op.userId) return u;
                    const { suspensionReason, ...rest } = u;
                    return { ...rest, status: "ACTIVE" };
                });
                operationLog.push({ type: "REACTIVATE", success: true, reason: null });
            }
        }
    }

    // --- STEP 3: BUILD STATUS SUMMARY (inline equivalent of userStatusSummary) ---
    const totalUsers = currentUsers.length;
    const activeCount = currentUsers.filter(u => u.status === "ACTIVE").length;
    const suspendedCount = currentUsers.filter(u => u.status === "SUSPENDED").length;
    const deletedCount = currentUsers.filter(u => u.status === "DELETED").length;
    const activeRate = Number(((activeCount / totalUsers) * 100).toFixed(2));

    let statusHealthLevel;
    if (activeRate >= 90) statusHealthLevel = "EXCELLENT";
    else if (activeRate >= 70) statusHealthLevel = "GOOD";
    else if (activeRate >= 50) statusHealthLevel = "FAIR";
    else statusHealthLevel = "POOR";

    const statusSummary = { totalUsers, activeCount, suspendedCount, deletedCount, activeRate, statusHealthLevel };

    // --- STEP 4: RETURN FINAL RESULT ---
    return { finalUsers: currentUsers, operationLog, statusSummary };
};

// --- EXAMPLE USAGE ---
console.log(runUserManagementWorkflow(
    [{ userId: "U1", username: "rafi_k", email: "rafi@mail.com", status: "ACTIVE" }],
    [
        { type: "CREATE", user: { userId: "U2", username: "mina_h", email: "mina@mail.com" } },
        { type: "SUSPEND", userId: "U1", reason: "Spam reports" },
        { type: "REACTIVATE", userId: "U2" }
    ]
));