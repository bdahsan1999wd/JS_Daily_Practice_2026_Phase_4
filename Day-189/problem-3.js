// PROBLEM-03: compareDepartmentAttendance()

// Logic: Ranks departments by attendance rate. IMPORTANT: the company-wide average is the MEAN OF EACH DEPARTMENT'S RATE (not a pooled calculation across all raw logs) — this matters when departments have very different log counts.

const compareDepartmentAttendance = (attendanceLogs) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(attendanceLogs) || attendanceLogs.length === 0) return "Invalid Input";
    const validStatuses = ["PRESENT", "ABSENT", "LATE", "HALF_DAY"];
    for (let i = 0; i < attendanceLogs.length; i++) {
        const log = attendanceLogs[i];
        if (!log || typeof log !== "object") return "Invalid Input";
        if (typeof log.department !== "string") return "Invalid Input";
        if (!validStatuses.includes(log.status)) return "Invalid Input";
    }

    // --- STEP 2: GROUP & COUNT PER DEPARTMENT ---
    const countsMap = {};
    for (let i = 0; i < attendanceLogs.length; i++) {
        const { department, status } = attendanceLogs[i];
        if (!countsMap[department]) {
            countsMap[department] = { total: 0, attended: 0 };
        }
        countsMap[department].total += 1;
        if (status === "PRESENT" || status === "LATE" || status === "HALF_DAY") {
            countsMap[department].attended += 1;
        }
    }

    // --- STEP 3: COMPUTE attendanceRate FOR EACH DEPARTMENT ---
    const departmentRates = [];
    for (const dept in countsMap) {
        const { total, attended } = countsMap[dept];
        const attendanceRate = Number(((attended / total) * 100).toFixed(2));
        departmentRates.push({ department: dept, attendanceRate });
    }

    // --- STEP 4: RANK DEPARTMENTS DESCENDING BY attendanceRate ---
    const departmentRanking = [...departmentRates].sort((a, b) => b.attendanceRate - a.attendanceRate);

    // --- STEP 5: BEST & WORST DEPARTMENT (top and bottom of the ranking) ---
    const bestDepartment = departmentRanking[0].department;
    const worstDepartment = departmentRanking[departmentRanking.length - 1].department;

    // --- STEP 6: COMPANY AVERAGE RATE ---
    // KEY DETAIL: average the department RATES themselves, NOT the raw
    // pooled present/absent counts. A small department and a large
    // department each count EQUALLY toward this average.
    const companyAverageRate = Number(
        (departmentRates.reduce((sum, d) => sum + d.attendanceRate, 0) / departmentRates.length).toFixed(2)
    );

    // --- STEP 7: RETURN RESULT ---
    return { departmentRanking, bestDepartment, worstDepartment, companyAverageRate };
};

// --- EXAMPLE USAGE ---
console.log(compareDepartmentAttendance([
    { department: "Sales", status: "PRESENT" },
    { department: "Sales", status: "ABSENT" },
    { department: "IT", status: "PRESENT" },
    { department: "IT", status: "PRESENT" }
]));