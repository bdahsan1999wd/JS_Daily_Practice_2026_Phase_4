// 🧩 PROBLEM–01: calculateIntelligenceIndex()

// Logic: This function processes an array of student objects and calculates a final intelligence score for each student. It applies weighted impacts based on attendance and behavior scores on top of the average marks, then assigns a letter grade based on the final score.

function calculateIntelligenceIndex(students) {

    // --- STEP 1: VALIDATION ---
    // Ensure the input is a non-empty array.
    // If not, there is nothing to process — return "Invalid Input".
    if (!Array.isArray(students) || students.length === 0) {
        return "Invalid Input";
    }

    // --- STEP 2: PROCESS EACH STUDENT ---
    // Use .map() to iterate over each student object and
    // transform it into the required output format.
    return students.map(student => {

        // --- STEP 2a: VALIDATE INDIVIDUAL STUDENT OBJECT ---
        // Each student must have a string name, a marks object
        // with numeric math/english/science, and numeric
        // attendance and behaviorScore values.
        const { name, marks, attendance, behaviorScore } = student;

        if (
            typeof name !== 'string' ||
            typeof marks !== 'object' || marks === null ||
            typeof marks.math !== 'number' ||
            typeof marks.english !== 'number' ||
            typeof marks.science !== 'number' ||
            typeof attendance !== 'number' ||
            typeof behaviorScore !== 'number'
        ) {
            return "Invalid Input";
        }

        // --- STEP 3: CALCULATE AVERAGE MARKS ---
        // Sum all three subject marks and divide by 3.
        const avgMarks = (marks.math + marks.english + marks.science) / 3;

        // --- STEP 4: DETERMINE ATTENDANCE IMPACT ---
        // Attendance affects the score positively or negatively:
        //   ≥ 90  → reward with +10
        //   75–89 → small reward of +5
        //   < 75  → penalize with -10
        let attendanceImpact;
        if (attendance >= 90) {
            attendanceImpact = 10;
        } else if (attendance >= 75) {
            attendanceImpact = 5;
        } else {
            attendanceImpact = -10;
        }

        // --- STEP 5: DETERMINE BEHAVIOR IMPACT ---
        // Behavior score affects the result similarly:
        //   ≥ 80  → reward with +10
        //   50–79 → neutral, no change (0)
        //   < 50  → penalize with -15
        let behaviorImpact;
        if (behaviorScore >= 80) {
            behaviorImpact = 10;
        } else if (behaviorScore >= 50) {
            behaviorImpact = 0;
        } else {
            behaviorImpact = -15;
        }

        // --- STEP 6: CALCULATE FINAL SCORE ---
        // Combine average marks with both impact values.
        // Math.round() prevents floating point artifacts
        // (e.g., 80.333... becomes 80).
        const finalScore = Math.round(avgMarks + attendanceImpact + behaviorImpact);

        // --- STEP 7: ASSIGN GRADE ---
        // Map the final score to a letter grade using
        // a cascading if-else from highest to lowest.
        let grade;
        if (finalScore >= 90) {
            grade = "A+";
        } else if (finalScore >= 75) {
            grade = "A";
        } else if (finalScore >= 60) {
            grade = "B";
        } else if (finalScore >= 45) {
            grade = "C";
        } else {
            grade = "F";
        }

        // --- STEP 8: RETURN RESULT OBJECT ---
        // Return only the required fields: name, finalScore, grade.
        return { name, finalScore, grade };
    });
}

// --- EXAMPLE USAGE ---
console.log(calculateIntelligenceIndex([
    { name: "Rahim", marks: { math: 80, english: 75, science: 85 }, attendance: 90, behaviorScore: 85 }
]));

console.log(calculateIntelligenceIndex("not an array"));