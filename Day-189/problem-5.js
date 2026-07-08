// PROBLEM-05: buildAttendanceReport()

// Logic: Checks every employee against a required attendance %, splits them into compliant vs non-compliant (with a shortfall amount), and summarizes overall company compliance.

const buildAttendanceReport = (attendanceLogs, requiredAttendancePercent) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(attendanceLogs) || attendanceLogs.length === 0) return "Invalid Input";
    if (typeof requiredAttendancePercent !== "number" || requiredAttendancePercent < 0 || requiredAttendancePercent > 100) {
        return "Invalid Input";
    }
    for (let i = 0; i < attendanceLogs.length; i++) {
        const log = attendanceLogs[i];
        if (!log || typeof log !== "object") return "Invalid Input";
        if (typeof log.employeeName !== "string") return "Invalid Input";
        if (typeof log.status !== "string") return "Invalid Input";
    }

    // --- STEP 2: GROUP & COUNT PER EMPLOYEE ---
    const countsMap = {};
    for (let i = 0; i < attendanceLogs.length; i++) {
        const { employeeName, status } = attendanceLogs[i];
        if (!countsMap[employeeName]) {
            countsMap[employeeName] = { total: 0, attended: 0 };
        }
        countsMap[employeeName].total += 1;
        if (status === "PRESENT" || status === "LATE" || status === "HALF_DAY") {
            countsMap[employeeName].attended += 1;
        }
    }

    // --- STEP 3: COMPUTE attendanceRate & SORT INTO COMPLIANT / NON-COMPLIANT ---
    const compliantEmployees = [];
    const nonCompliantEmployees = [];

    for (const name in countsMap) {
        const { total, attended } = countsMap[name];
        const attendanceRate = Number(((attended / total) * 100).toFixed(2));

        if (attendanceRate >= requiredAttendancePercent) {
            compliantEmployees.push(name);
        } else {
            // shortfall = how far below the requirement they fell
            const shortfall = Number((requiredAttendancePercent - attendanceRate).toFixed(2));
            nonCompliantEmployees.push({ employeeName: name, attendanceRate, shortfall });
        }
    }

    // --- STEP 4: COMPANY COMPLIANCE RATE ---
    const totalEmployeeCount = Object.keys(countsMap).length;
    const companyComplianceRate = Number(((compliantEmployees.length / totalEmployeeCount) * 100).toFixed(2));

    // --- STEP 5: BUILD THE REPORT SUMMARY SENTENCE ---
    const reportSummary = `${compliantEmployees.length} of ${totalEmployeeCount} employee(s) meet the ${requiredAttendancePercent}% attendance requirement.`;

    // --- STEP 6: RETURN FINAL RESULT ---
    return { compliantEmployees, nonCompliantEmployees, companyComplianceRate, reportSummary };
};

// --- EXAMPLE USAGE ---
console.log(buildAttendanceReport([
    { employeeName: "Faria", status: "PRESENT" },
    { employeeName: "Faria", status: "PRESENT" },
    { employeeName: "Jamil", status: "ABSENT" },
    { employeeName: "Jamil", status: "PRESENT" }
], 90));