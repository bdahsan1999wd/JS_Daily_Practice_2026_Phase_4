// Problem-01: checkPermissionGate()

// Logic: Validates operational user access against security matrices. It handles missing definitions gracefully, intercepts role matches, and constructs deterministic authorization outputs.

const checkPermissionGate = (rolePermissions, userRole, requiredPermission) => {

    // --- STEP 1: INITIAL STRUCTURAL CHECKS ---
    if (typeof rolePermissions !== "object" || rolePermissions === null || Array.isArray(rolePermissions)) {
        return "Invalid Input";
    }
    if (typeof userRole !== "string" || typeof requiredPermission !== "string" || requiredPermission === "") {
        return "Invalid Input";
    }

    // --- STEP 2: SAFE BOUNDARY RESOLUTIONS ---
    let hasAccess = false;
    let accessMessage = "";

    // Explicit checking of role existence within the provided configuration matrix
    if (!Object.prototype.hasOwnProperty.call(rolePermissions, userRole)) {
        accessMessage = "Role not found";
        return {
            hasAccess,
            accessMessage
        };
    }

    const permissionsArray = rolePermissions[userRole];
    if (!Array.isArray(permissionsArray)) {
        return "Invalid Input";
    }

    // --- STEP 3: DATA MAP CONVERSIONS ---
    for (let i = 0; i < permissionsArray.length; i++) {
        if (permissionsArray[i] === requiredPermission) {
            hasAccess = true;
            break;
        }
    }

    accessMessage = hasAccess
        ? `Access granted: ${userRole} can ${requiredPermission}`
        : `Access denied: ${userRole} cannot ${requiredPermission}`;

    // --- STEP 4: EMIT LOG BLUEPRINT PACKAGES ---
    return {
        hasAccess,
        accessMessage
    };
};

// --- EXAMPLE USAGE ---
console.log(checkPermissionGate(
    { ADMIN: ["READ", "WRITE", "DELETE"], EDITOR: ["READ", "WRITE"], VIEWER: ["READ"] },
    "EDITOR",
    "DELETE"
));