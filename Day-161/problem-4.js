// 🧩 PROBLEM–04: deepCloneEmployee()

// Logic: This function produces a structurally fully isolated deep copy duplicate tracking record graph of a user via JSON serialization to safe-guard reference data items from unintended cross-mutation.

function deepCloneEmployee(employeeRecord) {

    // --- STEP 1: VALIDATION ---
    if (!employeeRecord || typeof employeeRecord !== "object" || Array.isArray(employeeRecord)) {
        return "Invalid Input";
    }

    if (
        typeof employeeRecord.employeeId !== "string" ||
        typeof employeeRecord.fullName !== "string" ||
        !employeeRecord.officeAddress || typeof employeeRecord.officeAddress !== "object" || Array.isArray(employeeRecord.officeAddress) ||
        typeof employeeRecord.officeAddress.building !== "string" ||
        typeof employeeRecord.officeAddress.city !== "string" ||
        !Array.isArray(employeeRecord.certifications)
    ) {
        return "Invalid Input";
    }

    // --- STEP 2: CLONE SEGREGATION VIA SERIALIZATION ---
    const clone = JSON.parse(JSON.stringify(employeeRecord));

    // --- STEP 3: ISOLATED MUTATIONS ON CLONE ONLY ---
    clone.cloneTag = "CLONED";
    clone.officeAddress.city = "Unknown";
    clone.certifications.push("cloned-cert");

    // --- STEP 4: RETURN BOTH HISTORIES ---
    return {
        original: employeeRecord,
        clone: clone
    };
}

// --- EXAMPLE USAGE ---
console.log(
    deepCloneEmployee({
        employeeId: "E003",
        fullName: "Sadia Parvin",
        officeAddress: { building: "Tower-A", city: "Dhaka" },
        certifications: ["AWS", "PMP"]
    })
);

console.log(deepCloneEmployee("Invalid string representation"));