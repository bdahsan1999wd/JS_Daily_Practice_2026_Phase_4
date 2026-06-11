// 🧩 PROBLEM–05: scoreOrderCompleteness()

// Logic: This function sequentially audits user record data density by verifying values against structural tracking blueprints, tabulating completeness scores, and pointing out omissions.

function scoreOrderCompleteness(orderRecord) {

    // --- STEP 1: GENERIC TYPE STRUCTURAL VALIDATION ---
    if (!orderRecord || typeof orderRecord !== "object" || Array.isArray(orderRecord)) {
        return "Invalid Input";
    }

    // --- STEP 2: PROFILE SCHEMA PROPERTY MATRIX CONFIGURATION ---
    const scoreMatrix = [
        { key: "orderId", score: 15, verify: v => typeof v === "string" && v.trim() !== "" },
        { key: "customerId", score: 10, verify: v => typeof v === "string" && v.trim() !== "" },
        { key: "customerName", score: 10, verify: v => typeof v === "string" && v.trim() !== "" },
        { key: "email", score: 10, verify: v => typeof v === "string" && v.includes("@") },
        { key: "items", score: 15, verify: v => Array.isArray(v) && v.length > 0 },
        { key: "totalAmount", score: 15, verify: v => typeof v === "number" && v > 0 },
        { key: "deliveryCharge", score: 5, verify: v => typeof v === "number" && v >= 0 },
        { key: "deliveryCity", score: 10, verify: v => typeof v === "string" && v.trim() !== "" },
        { key: "deliveryMethod", score: 5, verify: v => typeof v === "string" && v.trim() !== "" },
        { key: "status", score: 5, verify: v => typeof v === "string" && v.trim() !== "" }
    ];

    let totalScore = 0;
    const maxScore = 100;
    const missingFields = [];

    // --- STEP 3: PERFORM RECORD PROPERTY EVALUATION RUN ---
    scoreMatrix.forEach(criterion => {
        const value = orderRecord[criterion.key];

        if (orderRecord.hasOwnProperty(criterion.key) && value !== undefined && value !== null && criterion.verify(value)) {
            totalScore += criterion.score;
        } else {
            missingFields.push(criterion.key);
        }
    });

    // --- STEP 4: DETERMINE ENUMERATION TRACK LEVEL ---
    let level = "POORLY RECORDED";
    if (totalScore === 100) {
        level = "FULLY RECORDED";
    } else if (totalScore >= 70) {
        level = "MOSTLY RECORDED";
    } else if (totalScore >= 40) {
        level = "PARTIALLY RECORDED";
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
    scoreOrderCompleteness({
        orderId: "ORD-005",
        customerId: "C003",
        customerName: "Tanzia Sultana",
        email: "tanzia@mail.com",
        items: ["Sofa", "Table"],
        totalAmount: 45000,
        deliveryCharge: 0,
        deliveryCity: "Rajshahi",
        deliveryMethod: "",
        status: ""
    })
);

console.log(scoreOrderCompleteness(null));