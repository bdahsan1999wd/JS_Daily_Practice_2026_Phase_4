// 🧩 PROBLEM–05: scoreProfileCompleteness()

// Logic: This function runs a programmatic scoring evaluation across dynamic profile structures, calculating values for non-empty fields and returning completeness level metrics.

function scoreProfileCompleteness(userProfile) {

    // --- STEP 1: VALIDATION ---
    // Rejects null elements or incorrect base data tracking parameters immediately.
    if (!userProfile || typeof userProfile !== "object" || Array.isArray(userProfile)) {
        return "Invalid Input";
    }

    // --- STEP 2: PROFILE WEIGHT SCALE MATRIX ---
    const ruleBook = [
        { key: "fullName", weight: 20 },
        { key: "email", weight: 20 },
        { key: "phone", weight: 15 },
        { key: "address", weight: 15 },
        { key: "profilePicture", weight: 10 },
        { key: "bio", weight: 10 },
        { key: "language", weight: 5 },
        { key: "theme", weight: 5 }
    ];

    let totalScore = 0;
    const maxScore = 100;
    const missingFields = [];

    // --- STEP 3: ITERATIVE WEIGHT ASSESSMENT ---
    ruleBook.forEach(item => {
        const value = userProfile[item.key];
        let isValidAndPresent = false;

        // Check if value is initialized and matches field-specific content guidelines.
        if (userProfile.hasOwnProperty(item.key) && value !== undefined && value !== null) {
            if (typeof value === "string" && value.trim() !== "") {
                isValidAndPresent = true;
            } else if (typeof value === "object" && !Array.isArray(value) && Object.keys(value).length > 0) {
                isValidAndPresent = true;
            } else if (typeof value === "number" || typeof value === "boolean") {
                isValidAndPresent = true;
            }
        }

        // Apply weights or add to tracking structures based on validation results.
        if (isValidAndPresent) {
            totalScore += item.weight;
        } else {
            missingFields.push(item.key);
        }
    });

    // --- STEP 4: CATEGORIZE LEVEL BOUNDARIES ---
    let level = "INCOMPLETE";
    if (totalScore === 100) {
        level = "COMPLETE";
    } else if (totalScore >= 70) {
        level = "ALMOST DONE";
    } else if (totalScore >= 40) {
        level = "HALF DONE";
    }

    return {
        totalScore,
        maxScore,
        level,
        missingFields
    };
}

// --- EXAMPLE USAGE ---
console.log(
    scoreProfileCompleteness({
        fullName: "Tania Begum",
        email: "tania@mail.com",
        phone: "01912345678",
        address: { city: "Chittagong", country: "Bangladesh" },
        profilePicture: "",
        bio: "",
        language: "Bangla",
        theme: "light"
    })
);

console.log(
    scoreProfileCompleteness("invalid structural data model type argument")
);