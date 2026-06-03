// 🧩 PROBLEM–02: filterByGrade()

// Logic: This function searches an array of student records to filter out matching grades (case-sensitive) and returns the list sorted by average descending.

function filterByGrade(students, grade) {

    // --- STEP 1: VALIDATION ---
    // Ensure students is a non-empty array and grade matches the exact string list.
    const allowedGrades = ["A+", "A", "B", "C", "F"];
    if (
        !Array.isArray(students) ||
        students.length === 0 ||
        typeof grade !== "string" ||
        !allowedGrades.includes(grade)
    ) {
        return "Invalid Input";
    }

    // Deep object schema validation loop.
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

    // --- STEP 2: FILTER AND SORT RECORDS ---
    // Match the target grade exactly and sort by average in descending order.
    return students
        .filter(student => student.grade === grade)
        .sort((a, b) => b.average - a.average);
}

// --- EXAMPLE USAGE ---
console.log(
    filterByGrade([
        { name: "Arif", average: 88, grade: "A", subject: "Math" },
        { name: "Sona", average: 76, grade: "A", subject: "Science" },
        { name: "Rana", average: 55, grade: "C", subject: "English" }
    ], "A")
);

console.log(
    filterByGrade([], "InvalidGrade")
);