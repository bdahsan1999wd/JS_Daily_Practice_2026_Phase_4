// PROBLEM-03: calculateGPA()

// Logic: Converts each of the 3 subject marks into a grade point, averages them into a GPA, and classifies the result.

const calculateGPA = (marks) => {

    // --- STEP 1: VALIDATION ---
    if (typeof marks !== "object" || marks === null || Array.isArray(marks)) return "Invalid Input";
    const { math, english, science } = marks;
    for (const val of [math, english, science]) {
        if (typeof val !== "number" || val < 0 || val > 100) return "Invalid Input";
    }

    // --- STEP 2: CONVERT EACH SUBJECT MARK TO A GRADE POINT ---
    const toGradePoint = (mark) => {
        if (mark >= 90) return 4.00;
        if (mark >= 80) return 3.75;
        if (mark >= 70) return 3.50;
        if (mark >= 60) return 3.00;
        if (mark >= 50) return 2.50;
        if (mark >= 40) return 2.00;
        return 0.00;
    };

    const mathGP = toGradePoint(math);
    const englishGP = toGradePoint(english);
    const scienceGP = toGradePoint(science);

    // --- STEP 3: COMPUTE GPA (average of the 3 grade points) ---
    const gpa = Number(((mathGP + englishGP + scienceGP) / 3).toFixed(2));

    // --- STEP 4: DETERMINE CLASSIFICATION ---
    let classification;
    if (gpa >= 3.75) classification = "FIRST CLASS";
    else if (gpa >= 3.00) classification = "SECOND CLASS";
    else if (gpa >= 2.00) classification = "THIRD CLASS";
    else classification = "FAIL";

    // --- STEP 5: RETURN RESULT ---
    return { gpa, classification };
};

// --- EXAMPLE USAGE ---
console.log(calculateGPA({ math: 92, english: 75, science: 85 }));