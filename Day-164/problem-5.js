// 🧩 PROBLEM–05: scoreBookRecord()

// Logic: Validates the properties of a record against a schema rule map, counts missing fields, and evaluates the record's final quality score.

function scoreBookRecord(bookRecord) {

    // --- STEP 1: STRUCTURAL VALIDATION ---
    if (!bookRecord || typeof bookRecord !== "object" || Array.isArray(bookRecord)) {
        return "Invalid Input";
    }

    // --- STEP 2: PROPERTIES RULE CONFIGURATION ---
    const evaluationRules = [
        { key: "title", score: 20, test: v => typeof v === "string" && v.trim() !== "" },
        { key: "author", score: 20, test: v => typeof v === "string" && v.trim() !== "" },
        { key: "genre", score: 10, test: v => typeof v === "string" && v.trim() !== "" },
        { key: "publisher", score: 10, test: v => typeof v === "string" && v.trim() !== "" },
        { key: "publishYear", score: 10, test: v => typeof v === "number" && Number.isInteger(v) && v >= 1900 && v <= 2025 },
        { key: "edition", score: 5, test: v => typeof v === "number" && Number.isInteger(v) && v >= 1 },
        { key: "totalCopies", score: 10, test: v => typeof v === "number" && Number.isInteger(v) && v >= 1 },
        { key: "availableCopies", score: 5, test: v => typeof v === "number" && Number.isInteger(v) && v >= 0 },
        { key: "tags", score: 5, test: v => Array.isArray(v) && v.length > 0 },
        { key: "description", score: 5, test: v => typeof v === "string" && v.trim() !== "" }
    ];

    let totalScore = 0;
    const maxScore = 100;
    const missingFields = [];

    // --- STEP 3: PERFORM INTEGRITY RUNS ---
    evaluationRules.forEach(rule => {
        const value = bookRecord[rule.key];

        if (bookRecord.hasOwnProperty(rule.key) && value !== undefined && value !== null && rule.test(value)) {
            totalScore += rule.score;
        } else {
            missingFields.push(rule.key);
        }
    });

    // --- STEP 4: RESOLVE CATALOG RANK STATUS ---
    let status = "POORLY CATALOGUED";
    if (totalScore === 100) {
        status = "FULLY CATALOGUED";
    } else if (totalScore >= 70) {
        status = "WELL CATALOGUED";
    } else if (totalScore >= 40) {
        status = "BASIC CATALOGUED";
    }

    return {
        totalScore,
        maxScore,
        status,
        missingFields
    };
}

// --- EXAMPLE USAGE ---
console.log(
    scoreBookRecord({
        title: "Deep Work",
        author: "Cal Newport",
        genre: "Productivity",
        publisher: "Grand Central",
        publishYear: 2016,
        edition: 1,
        totalCopies: 4,
        availableCopies: 2,
        tags: [],
        description: ""
    })
);

console.log(scoreBookRecord(null));