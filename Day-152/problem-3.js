// 🧩 PROBLEM–03: generatePayrollSummary()

// Logic: This function generates a payroll summary including total payroll, average salary, highest paid employee, lowest paid employee, and department-wise salary totals.

function generatePayrollSummary(employees) {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(employees) || employees.length === 0) {
        return "Invalid Input";
    }

    // --- STEP 2: VALIDATE EMPLOYEE OBJECTS ---
    for (const employee of employees) {

        const { name, salary, department } = employee;

        if (
            typeof name !== "string" ||
            typeof department !== "string" ||
            typeof salary !== "number" ||
            salary <= 0
        ) {
            return "Invalid Input";
        }
    }

    // --- STEP 3: TOTAL PAYROLL ---
    const totalPayroll = employees.reduce(
        (sum, employee) => sum + employee.salary,
        0
    );

    // --- STEP 4: AVERAGE SALARY ---
    const averageSalary = Number(
        (totalPayroll / employees.length).toFixed(2)
    );

    // --- STEP 5: HIGHEST PAID EMPLOYEE ---
    const highestPaid = employees.reduce(
        (highest, employee) =>
            employee.salary > highest.salary
                ? employee
                : highest
    );

    // --- STEP 6: LOWEST PAID EMPLOYEE ---
    const lowestPaid = employees.reduce(
        (lowest, employee) =>
            employee.salary < lowest.salary
                ? employee
                : lowest
    );

    // --- STEP 7: DEPARTMENT-WISE TOTAL ---
    const departmentWiseTotal = employees.reduce(
        (acc, employee) => {

            if (!acc[employee.department]) {
                acc[employee.department] = 0;
            }

            acc[employee.department] += employee.salary;

            return acc;
        },
        {}
    );

    // --- STEP 8: RETURN SUMMARY OBJECT ---
    return {
        totalPayroll,
        averageSalary,
        highestPaid,
        lowestPaid,
        departmentWiseTotal
    };
}

// --- EXAMPLE USAGE ---
console.log(
    generatePayrollSummary([
        {
            name: "A",
            salary: 50000,
            department: "IT"
        },
        {
            name: "B",
            salary: 30000,
            department: "HR"
        },
        {
            name: "C",
            salary: 70000,
            department: "IT"
        }
    ])
);