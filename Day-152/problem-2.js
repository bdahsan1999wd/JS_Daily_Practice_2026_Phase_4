// 🧩 PROBLEM–02: filterByDepartment()

// Logic: This function filters employees by department, keeps only high-performing employees (score ≥ 70), and sorts them by salary in descending order.

function filterByDepartment(employees, department) {

    // --- STEP 1: VALIDATION ---
    // employees must be a non-empty array
    // department must be a non-empty string

    if (
        !Array.isArray(employees) ||
        typeof department !== "string" ||
        department.trim() === ""
    ) {
        return "Invalid Input";
    }

    // --- STEP 2: VALIDATE ALL EMPLOYEES ---
    for (const employee of employees) {

        const {
            name,
            department: empDepartment,
            salary,
            performanceScore
        } = employee;

        if (
            typeof name !== "string" ||
            typeof empDepartment !== "string" ||
            typeof salary !== "number" ||
            salary <= 0 ||
            typeof performanceScore !== "number" ||
            performanceScore < 0 ||
            performanceScore > 100
        ) {
            return "Invalid Input";
        }
    }

    // --- STEP 3: FILTER BY DEPARTMENT ---
    const filteredEmployees = employees.filter(employee =>
        employee.department.toLowerCase() ===
        department.toLowerCase()
    );

    // --- STEP 4: FILTER BY PERFORMANCE ---
    const qualifiedEmployees = filteredEmployees.filter(
        employee => employee.performanceScore >= 70
    );

    // --- STEP 5: SORT BY SALARY DESCENDING ---
    qualifiedEmployees.sort(
        (a, b) => b.salary - a.salary
    );

    // --- STEP 6: RETURN REQUIRED FIELDS ---
    return qualifiedEmployees.map(employee => ({
        name: employee.name,
        department: employee.department,
        salary: employee.salary,
        performanceScore: employee.performanceScore
    }));
}

// --- EXAMPLE USAGE ---
console.log(
    filterByDepartment(
        [
            {
                name: "Rina",
                department: "HR",
                salary: 45000,
                performanceScore: 85
            },
            {
                name: "Sami",
                department: "HR",
                salary: 52000,
                performanceScore: 60
            },
            {
                name: "Tina",
                department: "IT",
                salary: 70000,
                performanceScore: 90
            }
        ],
        "hr"
    )
);