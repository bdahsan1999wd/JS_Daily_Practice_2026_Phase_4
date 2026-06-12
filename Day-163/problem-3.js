// 🧩 PROBLEM–03: extractStudentSections()

// Logic: This function normalizes a flat object data footprint via destructuring, returning distinct nested structures while appending an isolated administrative summary block.

function extractStudentSections(studentRecord) {

    // --- STEP 1: VALIDATION ---
    // Ensure input is an object and all mandatory schema keys exist.
    if (!studentRecord || typeof studentRecord !== "object" || Array.isArray(studentRecord)) {
        return "Invalid Input";
    }

    const mandatoryKeys = [
        "studentId", "fullName", "age", "department", "semester", "cgpa",
        "academicStanding", "tuitionFee", "discountedFee", "scholarshipPercent", "enrolledAt"
    ];

    for (const key of mandatoryKeys) {
        if (!studentRecord.hasOwnProperty(key)) {
            return "Invalid Input";
        }
    }

    // --- STEP 2: FIELD EXTRACTION VIA DESTRUCTURING ---
    const {
        studentId, fullName, age,
        department, semester, cgpa, academicStanding,
        tuitionFee, discountedFee, scholarshipPercent,
        enrolledAt
    } = studentRecord;

    // --- STEP 3: ASSEMBLE ARCHITECTURAL NESTED RECORD ---
    return {
        personal: { studentId, fullName, age },
        academic: { department, semester, cgpa, academicStanding },
        financial: { tuitionFee, discountedFee, scholarshipPercent },
        registrySummary: {
            enrolledOn: enrolledAt,
            hasScholarship: scholarshipPercent > 0,
            isOnProbation: academicStanding === "PROBATION"
        }
    };
}

// --- EXAMPLE USAGE ---
console.log(
    extractStudentSections({
        studentId: "STU-003",
        fullName: "Nusrat Jahan",
        age: 22,
        department: "BBA",
        semester: 7,
        cgpa: 1.80,
        academicStanding: "PROBATION",
        tuitionFee: 30000,
        discountedFee: 30000,
        scholarshipPercent: 0,
        enrolledAt: "2025-01-01"
    })
);

console.log(extractStudentSections({ studentId: "STU-ERR" }));