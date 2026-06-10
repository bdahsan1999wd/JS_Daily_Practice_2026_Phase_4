// 🧩 PROBLEM–02: updateEmployeeRecord()

// Logic: This function merges an existing profile record with an incremental patch update payload without mutating the source profile parameters, re-evaluating operational metrics like seniority ranks on-the-fly.

function updateEmployeeRecord(existingEmployee, updates) {

    // --- STEP 1: VALIDATION ---
    // Ensure both parameters are valid non-empty objects.
    if (
        !existingEmployee || typeof existingEmployee !== "object" || Array.isArray(existingEmployee) ||
        !updates || typeof updates !== "object" || Array.isArray(updates) ||
        Object.keys(updates).length === 0
    ) {
        return "Invalid Input";
    }

    // Validate minimum required existingEmployee baseline fields
    if (
        typeof existingEmployee.employeeId !== "string" || existingEmployee.employeeId.trim() === "" ||
        typeof existingEmployee.fullName !== "string" || existingEmployee.fullName.trim() === "" ||
        typeof existingEmployee.baseSalary !== "number" || existingEmployee.baseSalary <= 0 ||
        typeof existingEmployee.bonusPercent !== "number" || existingEmployee.bonusPercent < 0 || existingEmployee.bonusPercent > 100 ||
        typeof existingEmployee.yearsOfExperience !== "number" || existingEmployee.yearsOfExperience < 0
    ) {
        return "Invalid Input";
    }

    // Validate conditionally updated fields if present in the updates object
    if (updates.hasOwnProperty("baseSalary") && (typeof updates.baseSalary !== "number" || updates.baseSalary <= 0)) {
        return "Invalid Input";
    }
    if (updates.hasOwnProperty("bonusPercent") && (typeof updates.bonusPercent !== "number" || updates.bonusPercent < 0 || updates.bonusPercent > 100)) {
        return "Invalid Input";
    }
    if (updates.hasOwnProperty("yearsOfExperience") && (typeof updates.yearsOfExperience !== "number" || updates.yearsOfExperience < 0)) {
        return "Invalid Input";
    }
    if (updates.hasOwnProperty("designation") && (typeof updates.designation !== "string" || updates.designation.trim() === "")) {
        return "Invalid Input";
    }
    if (updates.hasOwnProperty("department") && (typeof updates.department !== "string" || updates.department.trim() === "")) {
        return "Invalid Input";
    }

    // --- STEP 2: IMMUTABLE STATE MERGING ---
    const updatedEmployee = {
        ...existingEmployee,
        ...updates,
        lastUpdated: "2025-01-01"
    };

    // --- STEP 3: RECOMPUTE CORRELATING PROPERTIES ---
    updatedEmployee.bonusAmount = Number(
        (updatedEmployee.baseSalary * updatedEmployee.bonusPercent / 100).toFixed(2)
    );

    const exp = updatedEmployee.yearsOfExperience;
    if (exp >= 10) {
        updatedEmployee.seniorityLevel = "SENIOR";
    } else if (exp >= 5) {
        updatedEmployee.seniorityLevel = "MID-LEVEL";
    } else if (exp >= 1) {
        updatedEmployee.seniorityLevel = "JUNIOR";
    } else {
        updatedEmployee.seniorityLevel = "FRESHER";
    }

    return updatedEmployee;
}

// --- EXAMPLE USAGE ---
console.log(
    updateEmployeeRecord(
        { employeeId: "E001", fullName: "Mitu Akter", baseSalary: 60000, bonusPercent: 10, yearsOfExperience: 4 },
        { baseSalary: 70000, yearsOfExperience: 10 }
    )
);

console.log(
    updateEmployeeRecord(
        { employeeId: "E001", fullName: "Mitu Akter", baseSalary: 60000, bonusPercent: 10, yearsOfExperience: 4 },
        { baseSalary: -500 }
    )
);