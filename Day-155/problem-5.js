// 🧩 PROBLEM–05: generateExamLeaderboard()

// Logic: This function sorts student items recursively via average performance ties, breaks matching ranks using overall points, and appends unique badge ratings.

function generateExamLeaderboard(students) {

    // --- STEP 1: VALIDATION ---
    // Ensure students is a non-empty array.
    if (!Array.isArray(students) || students.length === 0) {
        return "Invalid Input";
    }

    for (const student of students) {
        if (
            !student ||
            typeof student.name !== "string" ||
            typeof student.subject !== "string" ||
            typeof student.average !== "number" || student.average < 0 || student.average > 100 ||
            typeof student.totalScore !== "number" || student.totalScore < 0
        ) {
            return "Invalid Input";
        }
    }

    // --- STEP 2: CONVERT SCHEMAS AND ATTACH BADGES ---
    const processedStudents = students.map(student => {
        let badge = "NEEDS WORK";

        if (student.average >= 90) {
            badge = "DISTINCTION";
        } else if (student.average >= 75) {
            badge = "MERIT";
        } else if (student.average >= 60) {
            badge = "PASS";
        } else if (student.average >= 45) {
            badge = "AVERAGE";
        }

        return {
            name: student.name,
            subject: student.subject,
            average: student.average,
            totalScore: student.totalScore, // Saved temporarily to control tie sorting conditions
            badge
        };
    });

    // --- STEP 3: PERFORM PRIMARY & SECONDARY CONCURRENT SORT ---
    processedStudents.sort((a, b) => {
        if (b.average !== a.average) {
            return b.average - a.average;
        }
        return b.totalScore - a.totalScore;
    });

    // --- STEP 4: GENERATE PLACEMENT SCORES WITH TIED COMPLIANCE ---
    let currentRank = 1;
    for (let i = 0; i < processedStudents.length; i++) {
        if (i > 0) {
            const currentItem = processedStudents[i];
            const previousItem = processedStudents[i - 1];

            if (currentItem.average !== previousItem.average || currentItem.totalScore !== previousItem.totalScore) {
                currentRank = i + 1;
            }
        }
        processedStudents[i].rank = currentRank;
        delete processedStudents[i].totalScore; // Scrub tracking helper properties out of output signature
    }

    return processedStudents;
}

// --- EXAMPLE USAGE ---
console.log(
    generateExamLeaderboard([
        { name: "Sara", subject: "Math", average: 92, totalScore: 460 },
        { name: "Noor", subject: "Science", average: 78, totalScore: 390 },
        { name: "Hira", subject: "English", average: 78, totalScore: 400 }
    ])
);

console.log(
    generateExamLeaderboard([])
);