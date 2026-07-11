// PROBLEM-01: aggregateRatingDistribution()

// Logic: Counts how many of each star-rating (1-5) appeared, computes an average rating, and the % of customers who rated 4 or 5.

const aggregateRatingDistribution = (feedbackEntries) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(feedbackEntries) || feedbackEntries.length === 0) return "Invalid Input";
    for (let i = 0; i < feedbackEntries.length; i++) {
        const f = feedbackEntries[i];
        if (!f || typeof f !== "object") return "Invalid Input";
        if (typeof f.customerName !== "string") return "Invalid Input";
        if (typeof f.rating !== "number" || !Number.isInteger(f.rating) || f.rating < 1 || f.rating > 5) return "Invalid Input";
    }

    // --- STEP 2: COUNT EACH RATING (ALWAYS INCLUDE ALL 5 KEYS, even if 0) ---
    const ratingCounts = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 };
    for (let i = 0; i < feedbackEntries.length; i++) {
        const ratingKey = String(feedbackEntries[i].rating);
        ratingCounts[ratingKey] += 1;
    }

    // --- STEP 3: AVERAGE RATING ---
    const totalResponses = feedbackEntries.length;
    const sumRatings = feedbackEntries.reduce((sum, f) => sum + f.rating, 0);
    const averageRating = Number((sumRatings / totalResponses).toFixed(2));

    // --- STEP 4: SATISFACTION RATE (rating of 4 OR 5 counts as satisfied) ---
    const satisfiedCount = feedbackEntries.filter(f => f.rating >= 4).length;
    const satisfactionRate = Number(((satisfiedCount / totalResponses) * 100).toFixed(2));

    // --- STEP 5: RETURN RESULT ---
    return { ratingCounts, averageRating, totalResponses, satisfactionRate };
};

// --- EXAMPLE USAGE ---
console.log(aggregateRatingDistribution([
    { customerName: "A", rating: 5 },
    { customerName: "B", rating: 4 },
    { customerName: "C", rating: 2 },
    { customerName: "D", rating: 5 }
]));