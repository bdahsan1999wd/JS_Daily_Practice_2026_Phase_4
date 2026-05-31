// 🧩 PROBLEM–04: generateClassReport()

// Logic: This function performs full analytics on a class of students. It calculates the class average, identifies the top and bottom scorers, builds a grade distribution table, and computes the pass rate (students who scored grade C or above, i.e., finalScore ≥ 45).

function generateClassReport(students) {

    // --- STEP 1: VALIDATION ---
    // Need a non-empty array to generate any meaningful report.
    if (!Array.isArray(students) || students.length === 0) {
        return "Invalid Input";
    }

    // --- STEP 2: CALCULATE CLASS AVERAGE ---
    // Sum all finalScores using .reduce(), then divide by count.
    // .toFixed(2) rounds to 2 decimal places.
    // parseFloat() removes trailing zeros (e.g., "60.00" → 60).
    const totalScore = students.reduce((sum, student) => sum + student.finalScore, 0);
    const classAverage = parseFloat((totalScore / students.length).toFixed(2));

    // --- STEP 3: FIND HIGHEST SCORER ---
    // .reduce() compares each student to the running "highest".
    // Returns the full student object with the max finalScore.
    const highest = students.reduce((best, current) =>
        current.finalScore > best.finalScore ? current : best
    );

    // --- STEP 4: FIND LOWEST SCORER ---
    // Same logic as above but looks for the minimum instead.
    const lowest = students.reduce((worst, current) =>
        current.finalScore < worst.finalScore ? current : worst
    );

    // --- STEP 5: BUILD GRADE DISTRIBUTION ---
    // Count how many students fall into each grade bucket.
    // "Aplus" is used as the key because "A+" is not a valid
    // JS identifier without quotes.
    const gradeDistribution = { Aplus: 0, A: 0, B: 0, C: 0, F: 0 };
    let passCount = 0; // tracks students with grade C or above

    students.forEach(student => {
        if (student.finalScore >= 90) {
            gradeDistribution.Aplus++;
        } else if (student.finalScore >= 75) {
            gradeDistribution.A++;
        } else if (student.finalScore >= 60) {
            gradeDistribution.B++;
        } else if (student.finalScore >= 45) {
            gradeDistribution.C++;
        } else {
            gradeDistribution.F++;
        }

        // Pass = finalScore ≥ 45 (grade C or better)
        if (student.finalScore >= 45) {
            passCount++;
        }
    });

    // --- STEP 6: CALCULATE PASS RATE ---
    // Express the pass count as a percentage of total students.
    // Round to 2 decimal places for clean display.
    const passRate = parseFloat(((passCount / students.length) * 100).toFixed(2));

    // --- STEP 7: RETURN FULL ANALYTICS OBJECT ---
    return {
        classAverage,
        highest: { name: highest.name, finalScore: highest.finalScore },
        lowest: { name: lowest.name, finalScore: lowest.finalScore },
        gradeDistribution,
        passRate
    };
}

// --- EXAMPLE USAGE ---
console.log(generateClassReport([
    { name: "A", finalScore: 80 },
    { name: "B", finalScore: 60 },
    { name: "C", finalScore: 40 }
]));