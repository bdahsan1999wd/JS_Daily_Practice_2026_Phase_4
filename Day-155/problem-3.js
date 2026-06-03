// 🧩 PROBLEM–03: generateExamReport()

// Logic: This function accumulates complex class metrics, grade counts, subject groupings, and cross-checks extreme highest and lowest entries across student performance items.

function generateExamReport(students) {

    // --- STEP 1: VALIDATION ---
    // Ensure students is a non-empty array.
    if (!Array.isArray(students) || students.length === 0) {
        return "Invalid Input";
    }

    const allowedGrades = ["A+", "A", "B", "C", "F"];
    for (const student of students) {
        if (
            !student ||
            typeof student.name !== "string" ||
            typeof student.subject !== "string" ||
            typeof student.average !== "number" || student.average < 0 || student.average > 100 ||
            typeof student.grade !== "string" || !allowedGrades.includes(student.grade)
        ) {
            return "Invalid Input";
        }
    }

    // --- STEP 2: INITIALIZE DATA METRIC CONTAINERS ---
    const totalStudents = students.length;
    let sumOfAllAverages = 0;
    let nonFailingCount = 0;

    let topScorer = students[0];
    let lowestScorer = students[0];

    const gradeDistribution = { "Aplus": 0, "A": 0, "B": 0, "C": 0, "F": 0 };
    const subjectTrackingMap = {};

    // --- STEP 3: ACCUMULATE METRIC VALUES ---
    students.forEach(student => {
        sumOfAllAverages += student.average;

        // Process top and bottom boundaries.
        if (student.average > topScorer.average) topScorer = student;
        if (student.average < lowestScorer.average) lowestScorer = student;

        // Process grade counting mapping keys.
        if (student.grade === "A+") gradeDistribution["Aplus"]++;
        else if (student.grade === "A") gradeDistribution["A"]++;
        else if (student.grade === "B") gradeDistribution["B"]++;
        else if (student.grade === "C") gradeDistribution["C"]++;
        else if (student.grade === "F") gradeDistribution["F"]++;

        // Track passing counter values.
        if (student.grade !== "F") {
            nonFailingCount++;
        }

        // Aggregate matching subject groupings.
        if (!subjectTrackingMap[student.subject]) {
            subjectTrackingMap[student.subject] = { sum: 0, count: 0 };
        }
        subjectTrackingMap[student.subject].sum += student.average;
        subjectTrackingMap[student.subject].count++;
    });

    // --- STEP 4: CALCULATE SUBJECT MEAN AVERAGES ---
    const subjectWiseAverage = {};
    for (const key in subjectTrackingMap) {
        const item = subjectTrackingMap[key];
        subjectWiseAverage[key] = Number((item.sum / item.count).toFixed(2));
    }

    // --- STEP 5: RETURN COMPILED OBJECT ENGINE ---
    return {
        totalStudents,
        classAverage: Number((sumOfAllAverages / totalStudents).toFixed(2)),
        topScorer: { ...topScorer },
        lowestScorer: { ...lowestScorer },
        gradeDistribution,
        passRate: Number(((nonFailingCount / totalStudents) * 100).toFixed(2)),
        subjectWiseAverage
    };
}

// --- EXAMPLE USAGE ---
console.log(
    generateExamReport([
        { name: "A", subject: "Math", average: 92, grade: "A+" },
        { name: "B", subject: "Math", average: 78, grade: "A" },
        { name: "C", subject: "Science", average: 40, grade: "F" }
    ])
);

console.log(
    generateExamReport(undefined)
);