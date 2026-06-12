// 🧩 PROBLEM–01: buildStudentRecord()

// Logic: This function integrates dynamic objects containing personal, academic, and enrollment records using the spread operator while parsing tuition fee structures and scholastic standing metrics dynamically.

function buildStudentRecord(personalInfo, academicInfo, enrollmentInfo) {

    // --- STEP 1: VALIDATION ---
    // Ensure all three inputs are valid objects and not null/arrays.
    if (
        !personalInfo || typeof personalInfo !== "object" || Array.isArray(personalInfo) ||
        !academicInfo || typeof academicInfo !== "object" || Array.isArray(academicInfo) ||
        !enrollmentInfo || typeof enrollmentInfo !== "object" || Array.isArray(enrollmentInfo)
    ) {
        return "Invalid Input";
    }

    // Validate personalInfo fields
    const { firstName, lastName, age } = personalInfo;
    if (
        typeof firstName !== "string" || firstName.trim() === "" ||
        typeof lastName !== "string" || lastName.trim() === "" ||
        typeof age !== "number" || age < 10 || age > 30
    ) {
        return "Invalid Input";
    }

    // Validate academicInfo fields
    const { department, semester, cgpa } = academicInfo;
    if (
        typeof department !== "string" || department.trim() === "" ||
        typeof semester !== "number" || !Number.isInteger(semester) || semester < 1 || semester > 12 ||
        typeof cgpa !== "number" || cgpa < 0.00 || cgpa > 4.00
    ) {
        return "Invalid Input";
    }

    // Validate enrollmentInfo fields
    const { studentId, scholarshipPercent, tuitionFee } = enrollmentInfo;
    if (
        typeof studentId !== "string" || studentId.trim() === "" ||
        typeof scholarshipPercent !== "number" || scholarshipPercent < 0 || scholarshipPercent > 100 ||
        typeof tuitionFee !== "number" || tuitionFee <= 0
    ) {
        return "Invalid Input";
    }

    // --- STEP 2: CALCULATE COMPUTED FIELDS ---
    const fullName = firstName + " " + lastName;
    const discountedFee = Number((tuitionFee - (tuitionFee * scholarshipPercent / 100)).toFixed(2));

    let academicStanding;
    if (cgpa >= 3.75) {
        academicStanding = "DISTINCTION";
    } else if (cgpa >= 3.00) {
        academicStanding = "GOOD STANDING";
    } else if (cgpa >= 2.00) {
        academicStanding = "AVERAGE";
    } else {
        academicStanding = "PROBATION";
    }

    // --- STEP 3: RETURN CONSOLIDATED REGISTRY RECORD ---
    return {
        ...personalInfo,
        ...academicInfo,
        ...enrollmentInfo,
        fullName,
        discountedFee,
        academicStanding,
        enrolledAt: "2025-01-01"
    };
}

// --- EXAMPLE USAGE ---
console.log(
    buildStudentRecord(
        { firstName: "Raka", lastName: "Chowdhury", age: 20 },
        { department: "CSE", semester: 5, cgpa: 3.80 },
        { studentId: "STU-001", scholarshipPercent: 25, tuitionFee: 40000 }
    )
);

console.log(buildStudentRecord({ firstName: "Raka" }, {}, null));