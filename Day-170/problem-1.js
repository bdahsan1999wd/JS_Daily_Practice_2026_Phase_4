// 🧩 PROBLEM–01: generateBadges()

// Logic: Gathers string and numerical payload records using rest parameters. It maps across items, falls back securely using nullish values for missing object fields, and wraps strings with custom highlight flags via template literals.

const generateBadges = (...items) => {

    // --- STEP 1: REST PARAMETER VALIDATION ---
    if (!items || items.length === 0) {
        return "Invalid Input";
    }

    const outputBadges = [];

    // --- STEP 2: COLLECTION PROCESSING MAP LOOP ---
    for (let i = 0; i < items.length; i++) {
        const entry = items[i];

        if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
            return "Invalid Input";
        }

        // Apply path lookup and nullish coalescing operators to establish safe scopes
        const label = entry.label ?? "Unknown";
        const value = entry.value ?? 0;
        const unit = entry.meta?.unit ?? "";
        const highlight = entry.meta?.highlight ?? false;

        // Verify primitive types of newly parsed configuration variables
        if (
            typeof label !== "string" ||
            typeof value !== "number" || isNaN(value) ||
            typeof unit !== "string" ||
            typeof highlight !== "boolean"
        ) {
            return "Invalid Input";
        }

        // --- STEP 3: TEMPLATE CONDITIONAL LITERAL PATTERNS ---
        let badgeString = "";
        if (highlight === true) {
            badgeString = `★ ${label}: ${value}${unit}`;
        } else {
            badgeString = `${label}: ${value}${unit}`;
        }

        outputBadges.push(badgeString);
    }

    return outputBadges;
};

// --- EXAMPLE USAGE ---
console.log(generateBadges(
    { label: "Score", value: 95, meta: { unit: "%", highlight: true } },
    { label: "Rank", value: 3, meta: { unit: "", highlight: false } },
    { label: "Streak", meta: { highlight: true } }
));