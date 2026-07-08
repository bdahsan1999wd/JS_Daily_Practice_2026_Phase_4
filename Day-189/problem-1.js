// PROBLEM-01: aggregateIndividualAttendance()

// Logic: Groups attendance logs by employee, counts each status type, and computes an attendance rate (where ABSENT doesn't count as "attended" but PRESENT/LATE/HALF_DAY all do).

const aggregateIndividualAttendance = (attendanceLogs) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(attendanceLogs) || attendanceLogs.length === 0) return "Invalid Input";
    const validStatuses = ["PRESENT", "ABSENT", "LATE", "HALF_DAY"];
    for (let i = 0; i < attendanceLogs.length; i++) {
        const log = attendanceLogs[i];
        if (!log || typeof log !== "object") return "Invalid Input";
        if (typeof log.employeeName !== "string") return "Invalid Input";
        if (!validStatuses.includes(log.status)) return "Invalid Input";
    }

    // --- STEP 2: GROUP & COUNT EACH STATUS TYPE PER EMPLOYEE ---
    const countsMap = {};
    for (let i = 0; i < attendanceLogs.length; i++) {
        const { employeeName, status } = attendanceLogs[i];
        if (!countsMap[employeeName]) {
            countsMap[employeeName] = { present: 0, absent: 0, late: 0, halfDay: 0, totalDays: 0 };
        }
        countsMap[employeeName].totalDays += 1;
        if (status === "PRESENT") countsMap[employeeName].present += 1;
        else if (status === "ABSENT") countsMap[employeeName].absent += 1;
        else if (status === "LATE") countsMap[employeeName].late += 1;
        else if (status === "HALF_DAY") countsMap[employeeName].halfDay += 1;
    }

    // --- STEP 3: COMPUTE attendanceRate FOR EACH EMPLOYEE ---
    // ABSENT does NOT count toward attendance — only present+late+halfDay do
    const attendanceBreakdown = {};
    for (const name in countsMap) {
        const { totalDays, present, absent, late, halfDay } = countsMap[name];
        const attendanceRate = Number((((present + late + halfDay) / totalDays) * 100).toFixed(2));
        attendanceBreakdown[name] = { totalDays, present, absent, late, halfDay, attendanceRate };
    }

    // --- STEP 4: RETURN RESULT ---
    return attendanceBreakdown;
};

// --- EXAMPLE USAGE ---
console.log(aggregateIndividualAttendance([
    { employeeName: "Mahin", status: "PRESENT" },
    { employeeName: "Mahin", status: "ABSENT" },
    { employeeName: "Mahin", status: "LATE" },
    { employeeName: "Tania", status: "PRESENT" }
]));