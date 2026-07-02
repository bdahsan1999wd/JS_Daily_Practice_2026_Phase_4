// PROBLEM-05: runStudentManagementWorkflow()

// Logic: The "orchestrator" — composes addStudent() and updateMarks() into a sequential pipeline, then runs rankStudents() logic on the final student list to build a leaderboard.

const runStudentManagementWorkflow = (initialStudents, operations) => {

    // --- HELPER FUNCTION: Convert score to grade points ---
    const toGradePoint = (score) => {
        if (score >= 90) return 4.00;
        if (score >= 80) return 3.75;
        if (score >= 70) return 3.50;
        if (score >= 60) return 3.00;
        if (score >= 50) return 2.50;
        if (score >= 40) return 2.00;
        return 0.00; // Fail
    };

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(initialStudents)) return "Invalid Input";
    if (!Array.isArray(operations)) return "Invalid Input";

    const isValidMarks = (marks) => {
        if (typeof marks !== "object" || marks === null || Array.isArray(marks)) return false;
        const { math, english, science } = marks;
        for (const val of [math, english, science]) {
            if (typeof val !== "number" || val < 0 || val > 100) return false;
        }
        return true;
    };

    for (let i = 0; i < initialStudents.length; i++) {
        const s = initialStudents[i];
        if (!s || typeof s !== "object") return "Invalid Input";
        if (typeof s.studentId !== "string") return "Invalid Input";
        if (typeof s.name !== "string") return "Invalid Input";
        if (!isValidMarks(s.marks)) return "Invalid Input";
    }
    for (let i = 0; i < operations.length; i++) {
        const op = operations[i];
        if (!op || typeof op !== "object") return "Invalid Input";
        if (!["ADD", "UPDATE_MARKS"].includes(op.type)) return "Invalid Input";
    }

    // --- STEP 2: PROCESS OPERATIONS SEQUENTIALLY ---
    // `currentStudents` carries forward — each operation reads from it
    // and (if successful) produces the next version for the next step
    let currentStudents = initialStudents;
    const operationLog = [];

    for (let i = 0; i < operations.length; i++) {
        const op = operations[i];

        if (op.type === "ADD") {
            // --- inline equivalent of addStudent() logic ---
            const newStudent = op.student;
            const isDuplicate = currentStudents.some(s => s.studentId === newStudent?.studentId);

            if (isDuplicate) {
                operationLog.push({ type: "ADD", success: false, reason: "Student ID already exists" });
            } else {
                currentStudents = [...currentStudents, newStudent];
                operationLog.push({ type: "ADD", success: true, reason: null });
            }

        } else if (op.type === "UPDATE_MARKS") {
            // --- inline equivalent of updateMarks() logic ---
            const targetStudent = currentStudents.find(s => s.studentId === op.studentId);

            if (!targetStudent) {
                operationLog.push({ type: "UPDATE_MARKS", success: false, reason: "Student not found" });
            } else {
                const allowedSubjects = ["math", "english", "science"];
                let marksOutOfRange = false;
                for (const key in op.newMarks) {
                    if (!allowedSubjects.includes(key)) continue;
                    const val = op.newMarks[key];
                    if (typeof val !== "number" || val < 0 || val > 100) {
                        marksOutOfRange = true;
                        break;
                    }
                }

                if (marksOutOfRange) {
                    operationLog.push({ type: "UPDATE_MARKS", success: false, reason: "Marks must be between 0 and 100" });
                } else {
                    currentStudents = currentStudents.map(s =>
                        s.studentId === op.studentId
                            ? { ...s, marks: { ...s.marks, ...op.newMarks } }
                            : s
                    );
                    operationLog.push({ type: "UPDATE_MARKS", success: true, reason: null });
                }
            }
        }
    }

    // --- STEP 3: BUILD LEADERBOARD (inline equivalent of rankStudents) ---
    const withGpa = currentStudents.map(s => {
        const { math, english, science } = s.marks;
        const gpa = Number(((toGradePoint(math) + toGradePoint(english) + toGradePoint(science)) / 3).toFixed(2));
        const rawTotal = math + english + science;
        return { studentId: s.studentId, name: s.name, gpa, rawTotal };
    });

    withGpa.sort((a, b) => {
        if (b.gpa !== a.gpa) return b.gpa - a.gpa;
        return b.rawTotal - a.rawTotal;
    });

    const leaderboard = [];
    for (let i = 0; i < withGpa.length; i++) {
        if (i === 0) {
            leaderboard.push({ studentId: withGpa[i].studentId, name: withGpa[i].name, gpa: withGpa[i].gpa, rank: 1 });
        } else {
            const prev = withGpa[i - 1];
            const curr = withGpa[i];
            const isFullTie = (curr.gpa === prev.gpa) && (curr.rawTotal === prev.rawTotal);
            const rank = isFullTie ? leaderboard[i - 1].rank : i + 1;
            leaderboard.push({ studentId: curr.studentId, name: curr.name, gpa: curr.gpa, rank });
        }
    }

    // --- STEP 4: RETURN FINAL RESULT ---
    return { finalStudents: currentStudents, operationLog, leaderboard };
};


// --- EXAMPLE USAGE ---
console.log(runStudentManagementWorkflow(
    [{ studentId: "S1", name: "Tamim", marks: { math: 60, english: 60, science: 60 } }],
    [
        { type: "ADD", student: { studentId: "S2", name: "Nadia", marks: { math: 90, english: 90, science: 90 } } },
        { type: "UPDATE_MARKS", studentId: "S1", newMarks: { math: 95 } },
        { type: "UPDATE_MARKS", studentId: "S9", newMarks: { math: 50 } }
    ]
));