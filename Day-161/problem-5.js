// 🧩 PROBLEM–05: scoreEmployeeProfile()

// Logic: This function systematically parses structural schema states using localized validation mapping parameters to assess data point health and returns incomplete trace items.

function scoreEmployeeProfile(employeeRecord) {

    // --- STEP 1: INITIAL STRUCTURAL VALIDATION ---
    if (!employeeRecord || typeof employeeRecord !== "object" || Array.isArray(employeeRecord)) {
        return "Invalid Input";
    }

    // --- STEP 2: AUDIT CRITERIA MATRIX DEFINITION ---
    const pointsConfig = [
        { key: "fullName", score: 15, check: v => typeof v === "string" && v.trim() !== "" },
        { key: "age", score: 5, check: v => typeof v === "number" && v > 0 },
        { key: "department", score: 15, check: v => typeof v === "string" && v.trim() !== "" },
        { key: "designation", score: 15, check: v => typeof v === "string" && v.trim() !== "" },
        { key: "yearsOfExperience", score: 10, check: v => typeof v === "number" && v >= 0 },
        { key: "baseSalary", score: 15, check: v => typeof v === "number" && v > 0 },
        { key: "bonusPercent", score: 5, check: v => typeof v === "number" && v >= 0 },
        { key: "email", score: 10, check: v => typeof v === "string" && v.includes("@") },
        { key: "phone", score: 5, check: v => typeof v === "string" && v.trim() !== "" },
        { key: "certifications", score: 5, check: v => Array.isArray(v) && v.length > 0 }
    ];

    let totalScore = 0;
    const maxScore = 100;
    const missingFields = [];

    // --- STEP 3: ANALYZE SYSTEM ATTRIBUTE LOGS ---
    pointsConfig.forEach(rule => {
        const value = employeeRecord[rule.key];

        if (employeeRecord.hasOwnProperty(rule.key) && value !== undefined && value !== null && rule.check(value)) {
            totalScore += rule.score;
        } else {
            missingFields.push(rule.key);
        }
    });

    // --- STEP 4: ASSIGN ENUMERATION BOUND STATUS ---
    let status = "INCOMPLETE";
    if (totalScore === 100) {
        status = "COMPLETE";
    } else if (totalScore >= 70) {
        status = "NEARLY COMPLETE";
    } else if (totalScore >= 40) {
        status = "PARTIALLY FILLED";
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
    scoreEmployeeProfile({
        fullName: "Jahid Rahman",
        age: 35,
        department: "IT",
        designation: "Team Lead",
        yearsOfExperience: 8,
        baseSalary: 90000,
        bonusPercent: 20,
        email: "jahid@company.com",
        phone: "",
        certifications: []
    })
);

console.log(scoreEmployeeProfile(null));