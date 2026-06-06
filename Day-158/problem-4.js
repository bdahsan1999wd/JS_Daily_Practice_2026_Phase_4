// 🧩 PROBLEM–04: deepCloneProfile()

// Logic: This function breaks nested variable state links completely by executing deep cloning pipelines via serial serialization, ensuring updates remain isolated.

function deepCloneProfile(userProfile) {

    // --- STEP 1: VALIDATION ---
    // Validate existence parameters across multidimensional node limits.
    if (!userProfile || typeof userProfile !== "object" || Array.isArray(userProfile)) {
        return "Invalid Input";
    }

    if (
        typeof userProfile.userId !== "string" ||
        typeof userProfile.fullName !== "string" ||
        !userProfile.address || typeof userProfile.address !== "object" || Array.isArray(userProfile.address) ||
        typeof userProfile.address.city !== "string" ||
        typeof userProfile.address.country !== "string" ||
        !Array.isArray(userProfile.scores)
    ) {
        return "Invalid Input";
    }

    // --- STEP 2: SERIALIZED DEEP COPY PIPELINE ---
    // Disconnect deeply nested properties from their original memory references.
    const clone = JSON.parse(JSON.stringify(userProfile));

    // --- STEP 3: COMPOSITE VARIABLE MANIPULATION ---
    clone.cloneTag = "CLONED";
    clone.address.city = "Unknown"; // Isolated alteration

    return {
        original: userProfile,
        clone: clone
    };
}

// --- EXAMPLE USAGE ---
console.log(
    deepCloneProfile({
        userId: "U002",
        fullName: "Sami Khan",
        address: { city: "Dhaka", country: "Bangladesh" },
        scores: [85, 90, 78]
    })
);

console.log(deepCloneProfile({ userId: "U999", scores: "invalid array type configuration" }));