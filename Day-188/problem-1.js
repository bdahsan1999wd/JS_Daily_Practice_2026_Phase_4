// PROBLEM-01: aggregateEmployeePerformance()

// Logic: Sums multiple task entries per employee, computes their productivity rate, and identifies whoever has the highest rate.

const aggregateEmployeePerformance = (taskRecords) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(taskRecords) || taskRecords.length === 0) return "Invalid Input";
    for (let i = 0; i < taskRecords.length; i++) {
        const r = taskRecords[i];
        if (!r || typeof r !== "object") return "Invalid Input";
        if (typeof r.employeeName !== "string") return "Invalid Input";
        if (typeof r.tasksCompleted !== "number" || !Number.isInteger(r.tasksCompleted) || r.tasksCompleted < 0) return "Invalid Input";
        if (typeof r.hoursWorked !== "number" || r.hoursWorked <= 0) return "Invalid Input";
    }

    // --- STEP 2: GROUP & SUM BY employeeName ---
    // multiple entries for the same person accumulate into one running total
    const aggregateMap = {};
    for (let i = 0; i < taskRecords.length; i++) {
        const { employeeName, tasksCompleted, hoursWorked } = taskRecords[i];
        if (!aggregateMap[employeeName]) {
            aggregateMap[employeeName] = { totalTasksCompleted: 0, totalHoursWorked: 0 };
        }
        aggregateMap[employeeName].totalTasksCompleted += tasksCompleted;
        aggregateMap[employeeName].totalHoursWorked += hoursWorked;
    }

    // --- STEP 3: COMPUTE PRODUCTIVITY RATE FOR EACH EMPLOYEE ---
    const employeeBreakdown = {};
    for (const name in aggregateMap) {
        const { totalTasksCompleted, totalHoursWorked } = aggregateMap[name];
        const productivityRate = Number((totalTasksCompleted / totalHoursWorked).toFixed(2));
        employeeBreakdown[name] = { totalTasksCompleted, totalHoursWorked, productivityRate };
    }

    // --- STEP 4: FIND THE TOP PERFORMER (highest productivityRate) ---
    let topPerformer = null;
    let topRate = -1;
    for (const name in employeeBreakdown) {
        if (employeeBreakdown[name].productivityRate > topRate) {
            topRate = employeeBreakdown[name].productivityRate;
            topPerformer = name;
        }
    }

    // --- STEP 5: RETURN RESULT ---
    return { employeeBreakdown, topPerformer };
};

// --- EXAMPLE USAGE ---
console.log(aggregateEmployeePerformance([
    { employeeName: "Rakib", tasksCompleted: 10, hoursWorked: 5 },
    { employeeName: "Rakib", tasksCompleted: 5, hoursWorked: 3 },
    { employeeName: "Sumi", tasksCompleted: 8, hoursWorked: 4 }
]));