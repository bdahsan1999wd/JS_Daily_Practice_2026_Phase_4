// 🧩 PROBLEM–05: rankEmployeesBySalary()

// Logic: This function ranks employees by salary. If salary ties, higher performance score wins. If both salary and performance score tie, employees share the same rank.

function rankEmployeesBySalary(employees) {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(employees) || employees.length === 0) {
        return "Invalid Input";
    }

    // --- STEP 2: VALIDATE EMPLOYEE OBJECTS ---
    for (const employee of employees) {

        const {
            name,
            salary,
            department,
            performanceScore
        } = employee;

        if (
            typeof name !== "string" ||
            typeof department !== "string" ||
            typeof salary !== "number" ||
            salary <= 0 ||
            typeof performanceScore !== "number" ||
            performanceScore < 0 ||
            performanceScore > 100
        ) {
            return "Invalid Input";
        }
    }

    // --- STEP 3: SORT EMPLOYEES ---
    // Salary DESC
    // Performance DESC if salary ties

    const sortedEmployees = [...employees].sort(
        (a, b) => {

            if (b.salary !== a.salary) {
                return b.salary - a.salary;
            }

            return (
                b.performanceScore -
                a.performanceScore
            );
        }
    );

    // --- STEP 4: GENERATE RANKS ---
    const rankedEmployees = [];

    let currentRank = 1;

    for (let i = 0; i < sortedEmployees.length; i++) {

        if (i > 0) {

            const current = sortedEmployees[i];
            const previous = sortedEmployees[i - 1];

            if (
                current.salary === previous.salary &&
                current.performanceScore ===
                previous.performanceScore
            ) {
                currentRank =
                    rankedEmployees[i - 1].rank;
            } else {
                currentRank = i + 1;
            }
        }

        // --- STEP 5: ASSIGN SALARY BAND ---
        let salaryBand;

        if (sortedEmployees[i].salary > 80000) {
            salaryBand = "EXECUTIVE";
        } else if (
            sortedEmployees[i].salary > 50000
        ) {
            salaryBand = "SENIOR";
        } else if (
            sortedEmployees[i].salary > 30000
        ) {
            salaryBand = "MID";
        } else {
            salaryBand = "JUNIOR";
        }

        // --- STEP 6: STORE RESULT ---
        rankedEmployees.push({
            name: sortedEmployees[i].name,
            salary: sortedEmployees[i].salary,
            rank: currentRank,
            salaryBand
        });
    }

    // --- STEP 7: RETURN RESULT ---
    return rankedEmployees;
}

// --- EXAMPLE USAGE ---
console.log(
    rankEmployeesBySalary([
        {
            name: "X",
            salary: 90000,
            department: "IT",
            performanceScore: 88
        },
        {
            name: "Y",
            salary: 55000,
            department: "HR",
            performanceScore: 75
        },
        {
            name: "Z",
            salary: 55000,
            department: "IT",
            performanceScore: 80
        }
    ])
);