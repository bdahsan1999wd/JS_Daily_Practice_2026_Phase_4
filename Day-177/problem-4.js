// Problem-04: aggregateMultiRolePermissions()

// Logic: Merges authorization footprints across layered security permissions. It standardizes overlapping lists into non-duplicate vectors while tracking original role footprints.

const aggregateMultiRolePermissions = (rolePermissions, userRoles) => {

    // --- STEP 1: INITIAL STRUCTURAL CHECKS ---
    if (typeof rolePermissions !== "object" || rolePermissions === null || Array.isArray(rolePermissions)) {
        return "Invalid Input";
    }
    if (!Array.isArray(userRoles) || userRoles.length === 0) {
        return "Invalid Input";
    }

    const combinedPermissions = [];
    const permissionSources = {};

    // --- STEP 2: SAFE BOUNDARY RESOLUTIONS ---
    for (let i = 0; i < userRoles.length; i++) {
        const currentRole = userRoles[i];
        if (typeof currentRole !== "string" || !Object.prototype.hasOwnProperty.call(rolePermissions, currentRole)) {
            return "Invalid Input";
        }

        const currentPermissions = rolePermissions[currentRole];
        if (!Array.isArray(currentPermissions)) return "Invalid Input";

        // --- STEP 3: DATA MAP CONVERSIONS (UNIQUE MERGE TRACKER) ---
        for (let j = 0; j < currentPermissions.length; j++) {
            const permission = currentPermissions[j];
            if (typeof permission !== "string" || permission === "") return "Invalid Input";

            // Push to combined list if not already indexed
            if (!combinedPermissions.includes(permission)) {
                combinedPermissions.push(permission);
            }

            // Map and aggregate origin roles for each permission item
            if (!permissionSources[permission]) {
                permissionSources[permission] = [];
            }
            if (!permissionSources[permission].includes(currentRole)) {
                permissionSources[permission].push(currentRole);
            }
        }
    }

    const totalUniquePermissions = combinedPermissions.length;

    // --- STEP 4: EMIT LOG BLUEPRINT PACKAGES ---
    return {
        combinedPermissions,
        permissionSources,
        totalUniquePermissions
    };
};

// --- EXAMPLE USAGE ---
console.log(aggregateMultiRolePermissions(
    { EDITOR: ["READ", "WRITE"], REVIEWER: ["READ", "COMMENT"], PUBLISHER: ["PUBLISH"] },
    ["EDITOR", "REVIEWER"]
));