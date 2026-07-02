// PROBLEM-04: rankStudents()

// Logic: Ranks all students by GPA (descending). If GPA ties, the higher raw mark total wins. If BOTH still tie, students share the same rank (with the next distinct rank skipping ahead standard "competition ranking" behaviour).

// --- HELPER FUNCTION: Convert marks to grade points ---
const toGradePoint = (mark) => {
    if (mark >= 90) return 4.00;
    if (mark >= 80) return 3.75;
    if (mark >= 70) return 3.50;
    if (mark >= 60) return 3.00;
    if (mark >= 50) return 2.50;
    if (mark >= 40) return 2.00;
    return 0.00; // Fail
};

const rankStudents = (students) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(students) || students.length === 0) return "Invalid Input";
    for (let i = 0; i < students.length; i++) {
        const s = students[i];
        if (!s || typeof s !== "object") return "Invalid Input";
        if (typeof s.studentId !== "string") return "Invalid Input";
        if (typeof s.name !== "string") return "Invalid Input";
        if (typeof s.marks !== "object" || s.marks === null) return "Invalid Input";
        const { math, english, science } = s.marks;
        for (const val of [math, english, science]) {
            if (typeof val !== "number" || val < 0 || val > 100) return "Invalid Input";
        }
    }

    // --- STEP 2: COMPUTE GPA + RAW TOTAL FOR EVERY STUDENT ---
    const withGpa = students.map(s => {
        const { math, english, science } = s.marks;
        const gpa = Number(((toGradePoint(math) + toGradePoint(english) + toGradePoint(science)) / 3).toFixed(2));
        const rawTotal = math + english + science; // used only as a tie-breaker
        return { studentId: s.studentId, name: s.name, gpa, rawTotal };
    });

    // --- STEP 3: SORT — GPA DESCENDING, THEN RAW TOTAL DESCENDING ---
    withGpa.sort((a, b) => {
        if (b.gpa !== a.gpa) return b.gpa - a.gpa;
        return b.rawTotal - a.rawTotal;
    });

    // --- STEP 4: ASSIGN RANKS ---
    // a student shares the PREVIOUS student's rank only if BOTH
    // their gpa AND rawTotal are identical (a true full tie)
    const result = [];
    for (let i = 0; i < withGpa.length; i++) {
        if (i === 0) {
            result.push({ studentId: withGpa[i].studentId, name: withGpa[i].name, gpa: withGpa[i].gpa, rank: 1 });
        } else {
            const prev = withGpa[i - 1];
            const curr = withGpa[i];
            const isFullTie = (curr.gpa === prev.gpa) && (curr.rawTotal === prev.rawTotal);
            const rank = isFullTie ? result[i - 1].rank : i + 1;
            result.push({ studentId: curr.studentId, name: curr.name, gpa: curr.gpa, rank });
        }
    }

    // --- STEP 5: RETURN RESULT ---
    return result;
};

// --- EXAMPLE USAGE ---
console.log(rankStudents([
    { studentId: "S1", name: "Tamim", marks: { math: 92, english: 75, science: 85 } },
    { studentId: "S2", name: "Nadia", marks: { math: 80, english: 90, science: 70 } }
]));