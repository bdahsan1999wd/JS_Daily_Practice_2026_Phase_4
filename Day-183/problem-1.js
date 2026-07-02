// PROBLEM-01: addStudent()

// Logic: Adds a new student into the system, but only if studentId doesn't already exist. Never mutates the original array.

const addStudent = (students, newStudent) => {

    // --- STEP 1: VALIDATION ---
    // 1a) students must be an array
    if (!Array.isArray(students)) return "Invalid Input";
    // 1b) newStudent must be a plain object
    if (typeof newStudent !== "object" || newStudent === null || Array.isArray(newStudent)) {
        return "Invalid Input";
    }

    // helper: checks that a marks object has math/english/science, each 0-100
    const isValidMarks = (marks) => {
        if (typeof marks !== "object" || marks === null || Array.isArray(marks)) return false;
        const { math, english, science } = marks;
        for (const val of [math, english, science]) {
            if (typeof val !== "number" || val < 0 || val > 100) return false;
        }
        return true;
    };

    // 1c) validate every existing student record
    for (let i = 0; i < students.length; i++) {
        const s = students[i];
        if (!s || typeof s !== "object") return "Invalid Input";
        if (typeof s.studentId !== "string") return "Invalid Input";
        if (typeof s.name !== "string") return "Invalid Input";
        if (!isValidMarks(s.marks)) return "Invalid Input";
    }

    // 1d) validate the new student's own fields
    const { studentId, name, marks } = newStudent;
    if (typeof studentId !== "string" || studentId === "") return "Invalid Input";
    if (typeof name !== "string" || name === "") return "Invalid Input";
    if (!isValidMarks(marks)) return "Invalid Input";

    // --- STEP 2: CHECK FOR DUPLICATE STUDENT ID ---
    const isDuplicate = students.some(s => s.studentId === studentId);
    if (isDuplicate) {
        return { added: false, reason: "Student ID already exists", students };
    }

    // --- STEP 3: ADD THE STUDENT (IMMUTABLY) ---
    const updatedStudents = [...students, newStudent];

    // --- STEP 4: RETURN SUCCESS RESULT ---
    return { added: true, students: updatedStudents, totalStudents: updatedStudents.length };
};

// --- EXAMPLE USAGE ---
console.log(addStudent(
    [],
    { studentId: "S1", name: "Tamim", marks: { math: 80, english: 75, science: 85 } }
));