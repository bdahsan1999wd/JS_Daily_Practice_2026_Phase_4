// 🧩 PROBLEM–04: deepCloneStudent()

// Logic: Breaks variable memory links through complete string parsing serialization, ensuring adjustments targeting elements within arrays or nested locations remain perfectly sandboxed from changing values in the source reference record.

function deepCloneStudent(studentRecord) {

    // --- STEP 1: VALIDATION ---
    if (!studentRecord || typeof studentRecord !== "object" || Array.isArray(studentRecord)) {
        return "Invalid Input";
    }

    if (
        typeof studentRecord.studentId !== "string" ||
        typeof studentRecord.fullName !== "string" ||
        !studentRecord.permanentAddress || typeof studentRecord.permanentAddress !== "object" || Array.isArray(studentRecord.permanentAddress) ||
        typeof studentRecord.permanentAddress.district !== "string" ||
        typeof studentRecord.permanentAddress.division !== "string" ||
        !Array.isArray(studentRecord.completedCourses)
    ) {
        return "Invalid Input";
    }

    // --- STEP 2: HARD CLONE BY PARSING STRINGIFIED DATA ---
    const clonedRecord = JSON.parse(JSON.stringify(studentRecord));

    // --- STEP 3: EXECUTE MODIFICATIONS INDEPENDENTLY ON CLONE ---
    clonedRecord.cloneTag = "CLONED";
    clonedRecord.permanentAddress.district = "Unknown";
    clonedRecord.completedCourses.push("cloned-course");

    // --- STEP 4: RETURN BOTH RECORD GENERATIONS ---
    return {
        original: studentRecord,
        clone: clonedRecord
    };
}

// --- EXAMPLE USAGE ---
console.log(
    deepCloneStudent({
        studentId: "STU-004",
        fullName: "Fahim Alam",
        permanentAddress: { district: "Comilla", division: "Chattogram" },
        completedCourses: ["CSE101", "MATH201"]
    })
);

console.log(deepCloneStudent("Broken parameters shape parsing"));