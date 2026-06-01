// 🧩 PROBLEM–01: calculateNetSalaries()

// Logic: This function processes an array of employee objects and calculates gross salary, applies tax deductions based on salary slabs, and returns the final net salary for each employee.

function calculateNetSalaries(employees) {

    // --- STEP 1: VALIDATION ---
    // Ensure the input is a non-empty array.
    // If not, return "Invalid Input".
    if (!Array.isArray(employees) || employees.length === 0) {
        return "Invalid Input";
    }

    // --- STEP 2: PROCESS EACH EMPLOYEE ---
    // Use .map() to transform each employee object.
    return employees.map(employee => {

        // --- STEP 2a: VALIDATE EMPLOYEE OBJECT ---
        // Each employee must contain:
        // name (string)
        // baseSalary (number > 0)
        // hoursWorked (number between 0 and 744)
        // overtimeRate (number > 0)

        const {
            name,
            baseSalary,
            hoursWorked,
            overtimeRate
        } = employee;

        if (
            typeof name !== "string" ||
            typeof baseSalary !== "number" ||
            baseSalary <= 0 ||
            typeof hoursWorked !== "number" ||
            hoursWorked < 0 ||
            hoursWorked > 744 ||
            typeof overtimeRate !== "number" ||
            overtimeRate <= 0
        ) {
            return "Invalid Input";
        }

        // --- STEP 3: CALCULATE OVERTIME HOURS ---
        // Standard working hours = 160
        // Extra hours beyond 160 are considered overtime.
        const overtimeHours =
            hoursWorked > 160 ? hoursWorked - 160 : 0;

        // --- STEP 4: CALCULATE OVERTIME PAY ---
        const overtimePay =
            overtimeHours * overtimeRate;

        // --- STEP 5: CALCULATE GROSS SALARY ---
        const grossSalary =
            baseSalary + overtimePay;

        // --- STEP 6: DETERMINE TAX RATE ---
        let taxRate;

        if (grossSalary > 80000) {
            taxRate = 0.30;
        } else if (grossSalary > 50000) {
            taxRate = 0.20;
        } else if (grossSalary > 30000) {
            taxRate = 0.10;
        } else {
            taxRate = 0;
        }

        // --- STEP 7: CALCULATE NET SALARY ---
        const netSalary =
            grossSalary - (grossSalary * taxRate);

        // --- STEP 8: RETURN RESULT OBJECT ---
        // Round values to 2 decimal places.
        return {
            name,
            grossSalary: Number(grossSalary.toFixed(2)),
            netSalary: Number(netSalary.toFixed(2))
        };
    });
}

// --- EXAMPLE USAGE ---
console.log(
    calculateNetSalaries([
        {
            name: "Karim",
            baseSalary: 50000,
            hoursWorked: 180,
            overtimeRate: 200
        }
    ])
);

console.log(
    calculateNetSalaries("not an array")
);