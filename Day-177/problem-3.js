// Problem-03: detectPrivilegeEscalation()

// Logic: Enforces asymmetric operational safety boundaries between active accounts. It screens relative capability scores to isolate elevation attempts across administrative actions.

const detectPrivilegeEscalation = (roleRanks, actingUser, targetAction) => {

    // --- STEP 1: INITIAL STRUCTURAL CHECKS ---
    if (typeof roleRanks !== "object" || roleRanks === null || Array.isArray(roleRanks)) {
        return "Invalid Input";
    }
    if (typeof actingUser !== "object" || actingUser === null || Array.isArray(actingUser)) {
        return "Invalid Input";
    }
    if (typeof targetAction !== "object" || targetAction === null || Array.isArray(targetAction)) {
        return "Invalid Input";
    }

    const { username, role } = actingUser;
    const { actionType, targetRole } = targetAction;

    if (typeof username !== "string" || username === "" || typeof role !== "string") return "Invalid Input";
    if (actionType !== "ASSIGN_ROLE" && actionType !== "MODIFY_USER") return "Invalid Input";
    if (typeof targetRole !== "string") return "Invalid Input";

    // Confirm both role specifications hold legitimate numeric ranks
    if (typeof roleRanks[role] !== "number" || typeof roleRanks[targetRole] !== "number") {
        return "Invalid Input";
    }

    // --- STEP 2: SAFE BOUNDARY RESOLUTIONS ---
    const actingRank = roleRanks[role];
    const targetRank = roleRanks[targetRole];

    // Strictly greater-than configuration enforcement
    const allowed = actingRank > targetRank;
    const isEscalationAttempt = !allowed;

    // --- STEP 3: DATA MAP CONVERSIONS ---
    const message = allowed
        ? `${username} (${role}) can perform ${actionType} on role ${targetRole}`
        : `BLOCKED: ${username} (${role}) cannot perform ${actionType} on equal/higher role ${targetRole}`;

    // --- STEP 4: EMIT LOG BLUEPRINT PACKAGES ---
    return {
        isEscalationAttempt,
        allowed,
        message
    };
};

// --- EXAMPLE USAGE ---
console.log(detectPrivilegeEscalation(
    { VIEWER: 1, EDITOR: 2, MANAGER: 3, ADMIN: 4 },
    { username: "rashed", role: "EDITOR" },
    { actionType: "ASSIGN_ROLE", targetRole: "MANAGER" }
));