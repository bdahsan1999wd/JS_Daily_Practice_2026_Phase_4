// 🧩 PROBLEM–02: updateUserProfile()

// Logic: This function updates an existing record immutably using the spread operator, making sure all incremental changes comply with original validation boundaries.

function updateUserProfile(existingProfile, updates) {

    // --- STEP 1: VALIDATION ---
    // Verify that baseline inputs match expected object signatures.
    if (
        !existingProfile || typeof existingProfile !== "object" || Array.isArray(existingProfile) ||
        !updates || typeof updates !== "object" || Array.isArray(updates) ||
        Object.keys(updates).length === 0
    ) {
        return "Invalid Input";
    }

    // Enforce matching minimum conditions on structural parameters.
    if (
        typeof existingProfile.userId !== "string" || existingProfile.userId.trim() === "" ||
        typeof existingProfile.fullName !== "string" ||
        typeof existingProfile.email !== "string" || !existingProfile.email.includes("@") ||
        typeof existingProfile.age !== "number" || existingProfile.age < 18 || existingProfile.age > 100
    ) {
        return "Invalid Input";
    }

    // Validate incremental change parameters inside updates parameter block.
    if (updates.hasOwnProperty("age")) {
        if (typeof updates.age !== "number" || updates.age < 18 || updates.age > 100) {
            return "Invalid Input";
        }
    }

    if (updates.hasOwnProperty("email")) {
        if (typeof updates.email !== "string" || !updates.email.includes("@")) {
            return "Invalid Input";
        }
    }

    if (updates.hasOwnProperty("fullName") && typeof updates.fullName !== "string") {
        return "Invalid Input";
    }
    if (updates.hasOwnProperty("phone") && typeof updates.phone !== "string") {
        return "Invalid Input";
    }
    if (updates.hasOwnProperty("theme") && typeof updates.theme !== "string") {
        return "Invalid Input";
    }

    // --- STEP 2: IMMUTABLE SPREAD AND DESERIALIZATION ---
    // Make a shallow-copy merge that guarantees zero direct original modification.
    return {
        ...existingProfile,
        ...updates,
        lastUpdated: "2025-01-01"
    };
}

// --- EXAMPLE USAGE ---
const originalProfile = { userId: "U001", fullName: "Karim Das", email: "karim@mail.com", age: 30 };

console.log(updateUserProfile(originalProfile, { email: "karim_new@mail.com", age: 31 }));
console.log(updateUserProfile(originalProfile, { age: 120 }));