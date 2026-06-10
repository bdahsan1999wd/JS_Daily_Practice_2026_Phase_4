// 🧩 PROBLEM–03: extractEmployeeSections()

// Logic: Breaks down a flat database object profile layout pattern into segmented nested operational models using parameter destructuring tools.

function extractEmployeeSections(employeeRecord) {

    // --- STEP 1: VALIDATION ---
    // Ensure input is an object and all mandatory keys exist.
    if (!employeeRecord || typeof employeeRecord !== "object" || Array.isArray(employeeRecord)) {
        return "Invalid Input";
    }

    const mandatoryKeys = [
        "employeeId", "fullName", "age", "department", "designation",
        "yearsOfExperience", "baseSalary", "bonusAmount", "seniorityLevel", "joinedAt"
    ];

    for (const key of mandatoryKeys) {
        if (!employeeRecord.hasOwnProperty(key)) {
            return "Invalid Input";
        }
    }

    // --- STEP 2: STRUCTURAL DESTRUCTURING ---
    const {
        employeeId, fullName, age,
        department, designation, yearsOfExperience, seniorityLevel,
        baseSalary, bonusAmount,
        joinedAt
    } = employeeRecord;

    // --- STEP 3: RETURN NESTED MODULE WRAPPER ---
    return {
        personal: { employeeId, fullName, age },
        job: { department, designation, yearsOfExperience, seniorityLevel },
        compensation: { baseSalary, bonusAmount },
        hrSummary: {
            hiredOn: joinedAt,
            isExperienced: yearsOfExperience >= 5
        }
    };
}

// --- EXAMPLE USAGE ---
console.log(
    extractEmployeeSections({
        employeeId: "E002",
        fullName: "Razu Mia",
        age: 29,
        department: "Finance",
        designation: "Analyst",
        yearsOfExperience: 7,
        baseSalary: 65000,
        bonusAmount: 9750,
        seniorityLevel: "MID-LEVEL",
        joinedAt: "2025-01-01"
    })
);

console.log(extractEmployeeSections({ employeeId: "E999" }));