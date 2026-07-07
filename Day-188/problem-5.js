// PROBLEM-05: buildExecutivePerformanceSummary()

// Logic: Rolls up every department's KPI achievement into a single company-wide health check — best/worst department, who needs attention, and an overall letter grade.

const buildExecutivePerformanceSummary = (departmentData) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(departmentData) || departmentData.length === 0) return "Invalid Input";
    for (let i = 0; i < departmentData.length; i++) {
        const d = departmentData[i];
        if (!d || typeof d !== "object") return "Invalid Input";
        if (typeof d.department !== "string") return "Invalid Input";
        if (typeof d.targetKPI !== "number" || d.targetKPI <= 0) return "Invalid Input";
        if (typeof d.actualKPI !== "number" || d.actualKPI < 0) return "Invalid Input";
        if (typeof d.employeeCount !== "number" || !Number.isInteger(d.employeeCount) || d.employeeCount <= 0) return "Invalid Input";
    }

    // --- STEP 2: COMPUTE achievementPercent PER DEPARTMENT ---
    const computed = departmentData.map(d => ({
        department: d.department,
        achievementPercent: Number(((d.actualKPI / d.targetKPI) * 100).toFixed(2)),
        employeeCount: d.employeeCount
    }));

    // --- STEP 3: COMPANY-WIDE AVERAGE ACHIEVEMENT ---
    const companyWideAchievement = Number(
        (computed.reduce((sum, d) => sum + d.achievementPercent, 0) / computed.length).toFixed(2)
    );

    // --- STEP 4: TOTAL EMPLOYEES ACROSS ALL DEPARTMENTS ---
    const totalEmployees = computed.reduce((sum, d) => sum + d.employeeCount, 0);

    // --- STEP 5: FIND BEST AND WORST DEPARTMENT ---
    let bestDepartment = computed[0].department;
    let bestScore = computed[0].achievementPercent;
    let worstDepartment = computed[0].department;
    let worstScore = computed[0].achievementPercent;

    for (let i = 1; i < computed.length; i++) {
        if (computed[i].achievementPercent > bestScore) {
            bestScore = computed[i].achievementPercent;
            bestDepartment = computed[i].department;
        }
        if (computed[i].achievementPercent < worstScore) {
            worstScore = computed[i].achievementPercent;
            worstDepartment = computed[i].department;
        }
    }

    // --- STEP 6: DEPARTMENTS NEEDING ATTENTION (below 70%) ---
    const departmentsNeedingAttention = computed
        .filter(d => d.achievementPercent < 70)
        .map(d => d.department);

    // --- STEP 7: DETERMINE EXECUTIVE GRADE ---
    let executiveGrade;
    if (companyWideAchievement >= 90) executiveGrade = "A";
    else if (companyWideAchievement >= 75) executiveGrade = "B";
    else if (companyWideAchievement >= 60) executiveGrade = "C";
    else executiveGrade = "D";

    // --- STEP 8: RETURN FINAL RESULT ---
    return {
        companyWideAchievement,
        totalEmployees,
        bestDepartment,
        worstDepartment,
        departmentsNeedingAttention,
        executiveGrade
    };
};

// --- EXAMPLE USAGE ---
console.log(buildExecutivePerformanceSummary([
    { department: "Sales", targetKPI: 100000, actualKPI: 95000, employeeCount: 10 },
    { department: "Support", targetKPI: 500, actualKPI: 300, employeeCount: 5 },
    { department: "Engineering", targetKPI: 50, actualKPI: 48, employeeCount: 15 }
]));