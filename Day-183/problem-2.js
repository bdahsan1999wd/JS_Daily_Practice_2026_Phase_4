// PROBLEM-02: updateMarks()

// Logic: Updates a subset of a student's subject marks (merge, not replace), validating each provided mark stays within 0-100.

const updateMarks = (students, studentId, newMarks) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(students)) return "Invalid Input";
    if (typeof studentId !== "string" || studentId === "") return "Invalid Input";
    if (typeof newMarks !== "object" || newMarks === null || Array.isArray(newMarks)) return "Invalid Input";
    for (let i = 0; i < students.length; i++) {
        const s = students[i];
        if (!s || typeof s !== "object") return "Invalid Input";
        if (typeof s.studentId !== "string") return "Invalid Input";
    }

    // --- STEP 2: LOCATE THE TARGET STUDENT ---
    const targetStudent = students.find(s => s.studentId === studentId);
    if (!targetStudent) {
        return { updated: false, reason: "Student not found", students };
    }

    // --- STEP 3: VALIDATE EVERY PROVIDED MARK IS WITHIN 0-100 ---
    const allowedSubjects = ["math", "english", "science"];
    for (const key in newMarks) {
        if (!allowedSubjects.includes(key)) return "Invalid Input"; // unknown subject
        const val = newMarks[key];
        if (typeof val !== "number" || val < 0 || val > 100) {
            return { updated: false, reason: "Marks must be between 0 and 100", students };
        }
    }

    // --- STEP 4: MERGE NEW MARKS INTO EXISTING MARKS (IMMUTABLY) ---
    // spread keeps untouched subjects as-is, only overwrites the provided ones
    const updatedStudents = students.map(s =>
        s.studentId === studentId
            ? { ...s, marks: { ...s.marks, ...newMarks } }
            : s
    );

    // --- STEP 5: RETURN SUCCESS RESULT ---
    return { updated: true, students: updatedStudents, newMarksApplied: newMarks };
};

// --- EXAMPLE USAGE ---
console.log(updateMarks(
    [{ studentId: "S1", name: "Tamim", marks: { math: 80, english: 75, science: 85 } }],
    "S1",
    { math: 92 }
));