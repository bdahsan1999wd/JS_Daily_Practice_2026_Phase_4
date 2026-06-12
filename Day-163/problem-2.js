// 🧩 PROBLEM–02: updateStudentRecord()

// Logic: This function builds a new state object representing changes made to academic or financial variables immutably via spread mechanisms without modifying reference objects, instantly evaluating tuition balances and probation tracking statuses.

function updateStudentRecord(existingStudent, updates) {

    // --- STEP 1: VALIDATION ---
    // Ensure parameters are valid non-empty objects.
    if (
        !existingStudent || typeof existingStudent !== "object" || Array.isArray(existingStudent) ||
        !updates || typeof updates !== "object" || Array.isArray(updates) ||
        Object.keys(updates).length === 0
    ) {
        return "Invalid Input";
    }

    // Validate essential baseline fields of existingStudent profile
    if (
        typeof existingStudent.studentId !== "string" || existingStudent.studentId.trim() === "" ||
        typeof existingStudent.fullName !== "string" || existingStudent.fullName.trim() === "" ||
        typeof existingStudent.cgpa !== "number" || existingStudent.cgpa < 0.00 || existingStudent.cgpa > 4.00 ||
        typeof existingStudent.scholarshipPercent !== "number" || existingStudent.scholarshipPercent < 0 || existingStudent.scholarshipPercent > 100 ||
        typeof existingStudent.tuitionFee !== "number" || existingStudent.tuitionFee <= 0
    ) {
        return "Invalid Input";
    }

    // Validate update fields explicitly when bundled inside the updates object
    if (updates.hasOwnProperty("cgpa") && (typeof updates.cgpa !== "number" || updates.cgpa < 0.00 || updates.cgpa > 4.00)) {
        return "Invalid Input";
    }
    if (updates.hasOwnProperty("scholarshipPercent") && (typeof updates.scholarshipPercent !== "number" || updates.scholarshipPercent < 0 || updates.scholarshipPercent > 100)) {
        return "Invalid Input";
    }
    if (updates.hasOwnProperty("tuitionFee") && (typeof updates.tuitionFee !== "number" || updates.tuitionFee <= 0)) {
        return "Invalid Input";
    }
    if (updates.hasOwnProperty("semester") && (typeof updates.semester !== "number" || updates.semester < 1 || updates.semester > 12)) {
        return "Invalid Input";
    }
    if (updates.hasOwnProperty("department") && (typeof updates.department !== "string" || updates.department.trim() === "")) {
        return "Invalid Input";
    }

    // --- STEP 2: IMMUTABLE PROFILE RE-COMPOSITION ---
    const updatedStudent = {
        ...existingStudent,
        ...updates,
        lastUpdated: "2025-01-01"
    };

    // --- STEP 3: RE-EVALUATE COMPUTED VALUES ---
    updatedStudent.discountedFee = Number(
        (updatedStudent.tuitionFee * (1 - updatedStudent.scholarshipPercent / 100)).toFixed(2)
    );

    const score = updatedStudent.cgpa;
    if (score >= 3.75) {
        updatedStudent.academicStanding = "DISTINCTION";
    } else if (score >= 3.00) {
        updatedStudent.academicStanding = "GOOD STANDING";
    } else if (score >= 2.00) {
        updatedStudent.academicStanding = "AVERAGE";
    } else {
        updatedStudent.academicStanding = "PROBATION";
    }

    return updatedStudent;
}

// --- EXAMPLE USAGE ---
console.log(
    updateStudentRecord(
        { studentId: "STU-002", fullName: "Imran Hossain", cgpa: 2.80, scholarshipPercent: 10, tuitionFee: 35000 },
        { cgpa: 3.50, scholarshipPercent: 30 }
    )
);

console.log(
    updateStudentRecord(
        { studentId: "STU-002", fullName: "Imran Hossain", cgpa: 2.80, scholarshipPercent: 10, tuitionFee: 35000 },
        { cgpa: 9.99 }
    )
);