// 🧩 PROBLEM–05: scoreCustomerEngagement()

// Logic: Evaluates user property initialization records against strict baseline content metrics to derive an audit completeness score and trace lacking field identifiers.

function scoreCustomerEngagement(customerRecord) {

    // --- STEP 1: TYPE CHECK SAFETY RAIL ---
    if (!customerRecord || typeof customerRecord !== "object" || Array.isArray(customerRecord)) {
        return "Invalid Input";
    }

    // --- STEP 2: MATRIX RULES DEFINITION ---
    const auditMap = [
        { field: "fullName", score: 15, validate: v => typeof v === "string" && v.trim() !== "" },
        { field: "email", score: 15, validate: v => typeof v === "string" && v.includes("@") },
        { field: "phone", score: 10, validate: v => typeof v === "string" && v.trim() !== "" },
        { field: "companyName", score: 10, validate: v => typeof v === "string" && v.trim() !== "" },
        { field: "industry", score: 10, validate: v => typeof v === "string" && v.trim() !== "" },
        { field: "annualRevenue", score: 10, validate: v => typeof v === "number" && v > 0 },
        { field: "accountType", score: 10, validate: v => typeof v === "string" && v.trim() !== "" },
        { field: "creditLimit", score: 5, validate: v => typeof v === "number" && v > 0 },
        { field: "address", score: 10, validate: v => v !== null && typeof v === "object" && !Array.isArray(v) },
        { field: "purchaseHistory", score: 5, validate: v => Array.isArray(v) && v.length > 0 }
    ];

    let totalScore = 0;
    const maxScore = 100;
    const missingFields = [];

    // --- STEP 3: ANALYZE SYSTEM DENSITY ---
    auditMap.forEach(rule => {
        const itemValue = customerRecord[rule.field];

        if (customerRecord.hasOwnProperty(rule.field) && rule.validate(itemValue)) {
            totalScore += rule.score;
        } else {
            missingFields.push(rule.field);
        }
    });

    // --- STEP 4: RESOLVE QUALITY tier STATUS ---
    let level = "LOW ENGAGEMENT";
    if (totalScore === 100) {
        level = "FULLY ENGAGED";
    } else if (totalScore >= 70) {
        level = "HIGHLY ENGAGED";
    } else if (totalScore >= 40) {
        level = "MODERATELY ENGAGED";
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
    scoreCustomerEngagement({
        fullName: "Kamrul Hassan",
        email: "kamrul@corp.com",
        phone: "01611223344",
        companyName: "GreenTech",
        industry: "Agriculture",
        annualRevenue: 750000,
        accountType: "PREMIUM",
        creditLimit: 0,
        address: { city: "Rajshahi", country: "Bangladesh" },
        purchaseHistory: []
    })
);

console.log(scoreCustomerEngagement(null));