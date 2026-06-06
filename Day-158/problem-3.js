// 🧩 PROBLEM–03: extractProfileSections()

// Logic: This function acts as a restructuring adapter by extracting parameters out of a flat model schema, turning them into classified sub-objects.

function extractProfileSections(userProfile) {

    // --- STEP 1: VALIDATION ---
    // Ensure base structural properties are non-empty and initialized properly.
    if (!userProfile || typeof userProfile !== "object" || Array.isArray(userProfile)) {
        return "Invalid Input";
    }

    const requiredFields = [
        "userId", "fullName", "age", "email", "phone",
        "language", "theme", "notifications", "createdAt"
    ];

    // Guarantee that every mandatory attribute identifier exists in the mapping data.
    for (const field of requiredFields) {
        if (!userProfile.hasOwnProperty(field)) {
            return "Invalid Input";
        }
    }

    // --- STEP 2: DESTRUCTURING EXTRACTION MATRIX ---
    const {
        userId, fullName, age,
        email, phone,
        language, theme, notifications,
        createdAt
    } = userProfile;

    // --- STEP 3: CONSOLIDATED OUTPUT PACKAGING ---
    return {
        identity: { userId, fullName, age },
        contact: { email, phone },
        settings: { language, theme, notifications },
        profileSummary: {
            joinedOn: createdAt,
            totalFields: requiredFields.length
        }
    };
}

// --- EXAMPLE USAGE ---
console.log(
    extractProfileSections({
        userId: "U001",
        fullName: "Nila Roy",
        age: 28,
        email: "nila@mail.com",
        phone: "01812345678",
        language: "English",
        theme: "light",
        notifications: false,
        createdAt: "2025-01-01"
    })
);

console.log(extractProfileSections({ userId: "U99", fullName: "Broken Object Profile" }));