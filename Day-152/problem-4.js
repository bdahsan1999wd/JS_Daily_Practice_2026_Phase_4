// 🧩 PROBLEM–04: findTopPerformer()

// Logic: This function finds the highest-performing employee within a given department. If performance scores tie, higher salary wins.

function findTopPerformer(employees, department) {

    // --- STEP 1: VALIDATION ---
    if (
        !Array.isArray(employees) ||
        employees.length === 0 ||
        typeof department !== "string" ||
        department.trim() === ""
    ) {
        return "Invalid Input";
    }

    // --- STEP 2: VALIDATE EMPLOYEE OBJECTS ---
    for (const employee of employees) {

        const {
            name,
            department: empDepartment,
            performanceScore,
            salary
        } = employee;

        if (
            typeof name !== "string" ||
            typeof empDepartment !== "string" ||
            typeof performanceScore !== "number" ||
            performanceScore < 0 ||
            performanceScore > 100 ||
            typeof salary !== "number" ||
            salary <= 0
        ) {
            return "Invalid Input";
        }
    }

    // --- STEP 3: FILTER TARGET DEPARTMENT ---
    const departmentEmployees = employees.filter(
        employee =>
            employee.department.toLowerCase() ===
            department.toLowerCase()
    );

    // --- STEP 4: CHECK DEPARTMENT EXISTENCE ---
    if (departmentEmployees.length === 0) {
        return "Department Not Found";
    }

    // --- STEP 5: FIND TOP PERFORMER ---
    const topPerformer = departmentEmployees.reduce(
        (best, employee) => {

            if (
                employee.performanceScore >
                best.performanceScore
            ) {
                return employee;
            }

            if (
                employee.performanceScore ===
                best.performanceScore &&
                employee.salary > best.salary
            ) {
                return employee;
            }

            return best;
        }
    );

    // --- STEP 6: RETURN REQUIRED FIELDS ---
    return {
        name: topPerformer.name,
        department: topPerformer.department,
        performanceScore:
            topPerformer.performanceScore,
        salary: topPerformer.salary
    };
}

// --- EXAMPLE USAGE ---
console.log(
    findTopPerformer(
        [
            {
                name: "Arif",
                department: "IT",
                performanceScore: 92,
                salary: 60000
            },
            {
                name: "Nila",
                department: "IT",
                performanceScore: 92,
                salary: 75000
            },
            {
                name: "Reza",
                department: "HR",
                performanceScore: 88,
                salary: 50000
            }
        ],
        "IT"
    )
);