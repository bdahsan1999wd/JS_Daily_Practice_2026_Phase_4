// 🧩 PROBLEM–05: scoreStudentProfile()

// Logic: Evaluates optional and required parameters against structured type checks, calculating summary percentage levels and logging missing fields gracefully.

function scoreStudentProfile(studentRecord) {

    // --- STEP 1: VALIDATE INTERFACE OBJECT SHAPE ---
    if (!studentRecord || typeof studentRecord !== "object" || Array.isArray(studentRecord)) {
        return "Invalid Input";
    }

    // --- STEP 2: AUDIT BLUEPRINT PROPERTIES DEFINITION ---
    const scoreMap = [
        { key: "fullName", score: 15, verify: v => typeof v === "string" && v.trim() !== "" },
        { key: "studentId", score: 15, verify: v => typeof v === "string" && v.trim() !== "" },
        { key: "department", score: 15, verify: v => typeof v === "string" && v.trim() !== "" },
        { key: "semester", score: 10, verify: v => typeof v === "number" && v >= 1 },
        { key: "cgpa", score: 10, verify: v => typeof v === "number" && v >= 0 },
        { key: "tuitionFee", score: 10, verify: v => typeof v === "number" && v > 0 },
        { key: "email", score: 10, verify: v => typeof v === "string" && v.includes("@") },
        { key: "phone", score: 5, verify: v => typeof v === "string" && v.trim() !== "" },
        { key: "permanentAddress", score: 5, verify: v => v !== null && typeof v === "object" && !Array.isArray(v) },
        { key: "completedCourses", score: 5, verify: v => Array.isArray(v) && v.length > 0 }
    ];

    let totalScore = 0;
    const maxScore = 100;
    const missingFields = [];

    // --- STEP 3: CALCULATE FIELD INTEGRITY SCORING ---
    scoreMap.forEach(criterion => {
        const value = studentRecord[criterion.key];

        if (studentRecord.hasOwnProperty(criterion.key) && value !== undefined && value !== null && criterion.verify(value)) {
            totalScore += criterion.score;
        } else {
            missingFields.push(criterion.key);
        }
    });

    // --- STEP 4: PARSE MATRICULATION BOUND LEVEL STATUS ---
    let status = "INCOMPLETE";
    if (totalScore === 100) {
        status = "FULLY REGISTERED";
    } else if (totalScore >= 70) {
        status = "MOSTLY REGISTERED";
    } else if (totalScore >= 40) {
        status = "PARTIALLY REGISTERED";
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
    scoreStudentProfile({
        fullName: "Tasnim Akter",
        studentId: "STU-005",
        department: "EEE",
        semester: 4,
        cgpa: 3.20,
        tuitionFee: 38000,
        email: "tasnim@university.edu",
        phone: "",
        permanentAddress: null,
        completedCourses: ["EEE101", "MATH101"]
    })
);

console.log(scoreStudentProfile(undefined));