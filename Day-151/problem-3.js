// 🧩 PROBLEM–03: detectAtRiskStudents()

// Logic: This function scans a list of students and flags any student who meets at least ONE of the at risk conditions. A student only needs to fail one condition to be at risk this is a logical OR check, not AND.

function detectAtRiskStudents(students) {

    // --- STEP 1: VALIDATION ---
    // Must receive a non-empty array.
    if (!Array.isArray(students) || students.length === 0) {
        return "Invalid Input";
    }

    // --- STEP 2: INITIALIZE RESULT BUCKETS ---
    // We will push student names into one of two arrays
    // depending on whether they are at risk or not.
    const atRiskStudents = [];
    const safeStudents = [];

    // --- STEP 3: EVALUATE EACH STUDENT ---
    students.forEach(student => {

        // --- STEP 3a: AT-RISK CONDITIONS (any one is enough) ---
        // Condition A: Final score is critically low (below F threshold)
        // Condition B: Attendance is dangerously low (below 70%)
        // Condition C: Behavior is very poor (below 40)
        const isAtRisk =
            student.finalScore < 45 ||
            student.attendance < 70 ||
            student.behaviorScore < 40;

        // --- STEP 3b: CATEGORIZE ---
        // Push only the student's name (not the full object)
        // into the appropriate bucket.
        if (isAtRisk) {
            atRiskStudents.push(student.name);
        } else {
            safeStudents.push(student.name);
        }
    });

    // --- STEP 4: RETURN RESULT OBJECT ---
    return { atRiskStudents, safeStudents };
}

// --- EXAMPLE USAGE ---
console.log(detectAtRiskStudents([
    { name: "X", finalScore: 40, attendance: 80, behaviorScore: 60 },
    { name: "Y", finalScore: 70, attendance: 90, behaviorScore: 85 }
]));