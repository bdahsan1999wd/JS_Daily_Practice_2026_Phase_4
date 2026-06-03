// 🧩 PROBLEM–01: processExamScores()

// Logic: This function processes an array of student objects, calculates their total score, average, highest, and lowest scores, maps them to a grade scale, and returns a structural profile for each student.

function processExamScores(students) {

    // --- STEP 1: VALIDATION ---
    // Ensure students is a non-empty array.
    if (!Array.isArray(students) || students.length === 0) {
        return "Invalid Input";
    }

    // Validate properties inside every element of the array.
    for (const student of students) {
        if (
            !student ||
            typeof student.name !== "string" ||
            !Array.isArray(student.scores) || student.scores.length === 0
        ) {
            return "Invalid Input";
        }

        // Ensure every single score is a number between 0 and 100.
        for (const score of student.scores) {
            if (typeof score !== "number" || score < 0 || score > 100) {
                return "Invalid Input";
            }
        }
    }

    // --- STEP 2: CALCULATE METRICS AND GRADES ---
    return students.map(student => {
        const { name, scores } = student;

        const totalScore = scores.reduce((sum, score) => sum + score, 0);
        const average = Number((totalScore / scores.length).toFixed(2));
        const highest = Math.max(...scores);
        const lowest = Math.min(...scores);

        // Map numeric average against the requested letter grade scale.
        let grade = "F";
        if (average >= 90) {
            grade = "A+";
        } else if (average >= 75) {
            grade = "A";
        } else if (average >= 60) {
            grade = "B";
        } else if (average >= 45) {
            grade = "C";
        }

        // --- STEP 3: RETURN RESULT OBJECT ---
        return {
            name,
            totalScore,
            average,
            highest,
            lowest,
            grade
        };
    });
}

// --- EXAMPLE USAGE ---
console.log(
    processExamScores([
        { name: "Rafi", scores: [80, 90, 70] },
        { name: "Mitu", scores: [50, 40, 45] }
    ])
);

console.log(
    processExamScores("invalid input type")
);