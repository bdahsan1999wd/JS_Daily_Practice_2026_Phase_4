// Problem-02: resolveRoleHierarchy()

// Logic: Maps recursive inheritance links to unpack continuous parent chains. It implements maximum safe depth checks preventing circular reference crashes and extracts absolute root targets.

const resolveRoleHierarchy = (roleHierarchy, userRole) => {

    // --- STEP 1: INITIAL STRUCTURAL CHECKS ---
    if (typeof roleHierarchy !== "object" || roleHierarchy === null || Array.isArray(roleHierarchy)) {
        return "Invalid Input";
    }
    if (typeof userRole !== "string" || !Object.prototype.hasOwnProperty.call(roleHierarchy, userRole)) {
        return "Invalid Input";
    }

    // --- STEP 2: SAFE BOUNDARY RESOLUTIONS ---
    const inheritanceChain = [userRole];
    const totalRolesCount = Object.keys(roleHierarchy).length;
    let currentRole = userRole;

    // --- STEP 3: DATA MAP CONVERSIONS (INHERITANCE CHAIN RECURSION ENGINE) ---
    while (roleHierarchy[currentRole] !== null) {
        const parentRole = roleHierarchy[currentRole];

        // Guard against unregistered keys inside the structural trace
        if (parentRole === undefined || typeof parentRole !== "string") {
            return "Invalid Input";
        }

        inheritanceChain.push(parentRole);
        currentRole = parentRole;

        // Circular execution mitigation constraint
        if (inheritanceChain.length > totalRolesCount) {
            return "Invalid Input";
        }
    }

    const inheritedRolesCount = inheritanceChain.length - 1;
    const topLevelRole = inheritanceChain[inheritanceChain.length - 1];

    // --- STEP 4: EMIT LOG BLUEPRINT PACKAGES ---
    return {
        inheritanceChain,
        inheritedRolesCount,
        topLevelRole
    };
};

// --- EXAMPLE USAGE ---
console.log(resolveRoleHierarchy(
    { SUPER_ADMIN: null, ADMIN: "SUPER_ADMIN", MANAGER: "ADMIN", STAFF: "MANAGER" },
    "STAFF"
));