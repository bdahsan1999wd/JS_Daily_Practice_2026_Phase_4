// 🧩 PROBLEM–01: buildEmployeeRecord()

// Logic: This function processes personal, job, and compensation information to construct a single unified employee profile using the spread operator and inserts dynamically computed seniority and bonus information metrics.

function buildEmployeeRecord(personalInfo, jobInfo, compensationInfo) {

    // --- STEP 1: VALIDATION ---
    // Ensure all three inputs are valid objects and not null/arrays.
    if (
        !personalInfo || typeof personalInfo !== "object" || Array.isArray(personalInfo) ||
        !jobInfo || typeof jobInfo !== "object" || Array.isArray(jobInfo) ||
        !compensationInfo || typeof compensationInfo !== "object" || Array.isArray(compensationInfo)
    ) {
        return "Invalid Input";
    }

    // Validate personalInfo fields
    const { firstName, lastName, age } = personalInfo;
    if (
        typeof firstName !== "string" || firstName.trim() === "" ||
        typeof lastName !== "string" || lastName.trim() === "" ||
        typeof age !== "number" || age < 18 || age > 60
    ) {
        return "Invalid Input";
    }

    // Validate jobInfo fields
    const { department, designation, yearsOfExperience } = jobInfo;
    if (
        typeof department !== "string" || department.trim() === "" ||
        typeof designation !== "string" || designation.trim() === "" ||
        typeof yearsOfExperience !== "number" || yearsOfExperience < 0
    ) {
        return "Invalid Input";
    }

    // Validate compensationInfo fields
    const { baseSalary, bonusPercent } = compensationInfo;
    if (
        typeof baseSalary !== "number" || baseSalary <= 0 ||
        typeof bonusPercent !== "number" || bonusPercent < 0 || bonusPercent > 100
    ) {
        return "Invalid Input";
    }

    // --- STEP 2: CALCULATE COMPUTED FIELDS ---
    const fullName = firstName + " " + lastName;
    const bonusAmount = Number((baseSalary * bonusPercent / 100).toFixed(2));

    let seniorityLevel;
    if (yearsOfExperience >= 10) {
        seniorityLevel = "SENIOR";
    } else if (yearsOfExperience >= 5) {
        seniorityLevel = "MID-LEVEL";
    } else if (yearsOfExperience >= 1) {
        seniorityLevel = "JUNIOR";
    } else {
        seniorityLevel = "FRESHER";
    }

    // --- STEP 3: RETURN INTEGRATED RECORD ---
    return {
        ...personalInfo,
        ...jobInfo,
        ...compensationInfo,
        fullName,
        bonusAmount,
        seniorityLevel,
        joinedAt: "2025-01-01"
    };
}

// --- EXAMPLE USAGE ---
console.log(
    buildEmployeeRecord(
        { firstName: "Shakil", lastName: "Hasan", age: 32 },
        { department: "Engineering", designation: "Software Engineer", yearsOfExperience: 6 },
        { baseSalary: 80000, bonusPercent: 15 }
    )
);

console.log(buildEmployeeRecord({ firstName: "Shakil" }, {}, null));