// 🧩 PROBLEM–05: scoreProductQuality()

// Logic: Evaluates metadata density thresholds across custom data inputs by testing property existence and evaluating non-empty status values to output system health data levels.

function scoreProductQuality(productEntry) {

    // --- STEP 1: VALIDATION ---
    if (!productEntry || typeof productEntry !== "object" || Array.isArray(productEntry)) {
        return "Invalid Input";
    }

    // --- STEP 2: POINTS ARCHITECTURE METRIC DEFINITION ---
    const scoringRules = [
        { key: "productName", points: 20 },
        { key: "brand", points: 15 },
        { key: "category", points: 15 },
        { key: "originalPrice", points: 10 },
        { key: "sellingPrice", points: 10 },
        { key: "stock", points: 10 },
        { key: "warehouse", points: 5 },
        { key: "tags", points: 5 },
        { key: "description", points: 5 },
        { key: "imageUrl", points: 5 }
    ];

    let totalScore = 0;
    const maxScore = 100;
    const missingFields = [];

    // --- STEP 3: DENSITY ITERATION EVALUATION ---
    scoringRules.forEach(rule => {
        const value = productEntry[rule.key];
        let isValid = false;

        // Perform specific non-empty checks relative to parameter data type signatures
        if (productEntry.hasOwnProperty(rule.key) && value !== undefined && value !== null) {
            if (typeof value === "string" && value.trim() !== "") {
                isValid = true;
            } else if (typeof value === "number") {
                isValid = true;
            } else if (Array.isArray(value) && value.length > 0) {
                isValid = true;
            }
        }

        if (isValid) {
            totalScore += rule.points;
        } else {
            missingFields.push(rule.key);
        }
    });

    // --- STEP 4: DESIGNATE QUALITY LEVEL CATEGORIES ---
    let level = "POOR LISTING";
    if (totalScore === 100) {
        level = "FULLY LISTED";
    } else if (totalScore >= 70) {
        level = "WELL LISTED";
    } else if (totalScore >= 40) {
        level = "BASIC LISTING";
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
    scoreProductQuality({
        productName: "Gaming Headset",
        brand: "HyperX",
        category: "Electronics",
        originalPrice: 4500,
        sellingPrice: 4000,
        stock: 30,
        warehouse: "Dhaka-North",
        tags: ["gaming", "audio"],
        description: "",
        imageUrl: ""
    })
);

console.log(scoreProductQuality(null));