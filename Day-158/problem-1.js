// 🧩 PROBLEM–01: buildUserProfile()

// Logic: This function merges multiple shallow configurations into a comprehensive object utilizing the spread operator, computing contextual attributes inline.

function buildUserProfile(basicInfo, contactInfo, preferences) {

    // --- STEP 1: VALIDATION ---
    // Ensure that all three parameters are valid, populated objects.
    if (
        !basicInfo || typeof basicInfo !== "object" || Array.isArray(basicInfo) ||
        !contactInfo || typeof contactInfo !== "object" || Array.isArray(contactInfo) ||
        !preferences || typeof preferences !== "object" || Array.isArray(preferences)
    ) {
        return "Invalid Input";
    }

    // Validate basicInfo attributes
    if (
        typeof basicInfo.firstName !== "string" || basicInfo.firstName.trim() === "" ||
        typeof basicInfo.lastName !== "string" || basicInfo.lastName.trim() === "" ||
        typeof basicInfo.age !== "number" || basicInfo.age < 18 || basicInfo.age > 100
    ) {
        return "Invalid Input";
    }

    // Validate contactInfo attributes
    if (
        typeof contactInfo.email !== "string" || !contactInfo.email.includes("@") ||
        typeof contactInfo.phone !== "string" || contactInfo.phone.length !== 11
    ) {
        return "Invalid Input";
    }

    // Validate preferences attributes
    if (
        typeof preferences.language !== "string" || preferences.language.trim() === "" ||
        typeof preferences.theme !== "string" || (preferences.theme !== "light" && preferences.theme !== "dark") ||
        typeof preferences.notifications !== "boolean"
    ) {
        return "Invalid Input";
    }

    // --- STEP 2: OBJECT MERGING & COMPUTATION ---
    // Combine fields safely without mutating source references.
    const mergedProfile = {
        ...basicInfo,
        ...contactInfo,
        ...preferences,
        fullName: basicInfo.firstName + " " + basicInfo.lastName,
        isAdult: basicInfo.age >= 18,
        createdAt: "2025-01-01"
    };

    return mergedProfile;
}

// --- EXAMPLE USAGE ---
console.log(
    buildUserProfile(
        { firstName: "Rahim", lastName: "Mia", age: 25 },
        { email: "rahim@mail.com", phone: "01712345678" },
        { language: "Bangla", theme: "dark", notifications: true }
    )
);

console.log(
    buildUserProfile({}, null, {})
);