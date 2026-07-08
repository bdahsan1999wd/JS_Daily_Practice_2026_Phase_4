// PROBLEM-04: analyzeWeeklyAttendancePattern()

// Logic: Groups attendance by day-of-week to spot patterns — which day people skip the most, and which day has the best turnout.

const analyzeWeeklyAttendancePattern = (attendanceLogs) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(attendanceLogs) || attendanceLogs.length === 0) return "Invalid Input";
    const validDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const validStatuses = ["PRESENT", "ABSENT", "LATE", "HALF_DAY"];
    for (let i = 0; i < attendanceLogs.length; i++) {
        const log = attendanceLogs[i];
        if (!log || typeof log !== "object") return "Invalid Input";
        if (!validDays.includes(log.dayOfWeek)) return "Invalid Input";
        if (!validStatuses.includes(log.status)) return "Invalid Input";
    }

    // --- STEP 2: GROUP & COUNT PER DAY ---
    const countsMap = {};
    for (let i = 0; i < attendanceLogs.length; i++) {
        const { dayOfWeek, status } = attendanceLogs[i];
        if (!countsMap[dayOfWeek]) {
            countsMap[dayOfWeek] = { totalCount: 0, absentCount: 0 };
        }
        countsMap[dayOfWeek].totalCount += 1;
        if (status === "ABSENT") {
            countsMap[dayOfWeek].absentCount += 1;
        }
    }

    // --- STEP 3: COMPUTE absenceRate FOR EACH DAY ---
    const dayBreakdown = {};
    for (const day in countsMap) {
        const { totalCount, absentCount } = countsMap[day];
        const absenceRate = Number(((absentCount / totalCount) * 100).toFixed(2));
        dayBreakdown[day] = { totalCount, absentCount, absenceRate };
    }

    // --- STEP 4: FIND WORST (highest absenceRate) AND BEST (lowest) DAY ---
    let worstAttendanceDay = null;
    let bestAttendanceDay = null;
    for (const day in dayBreakdown) {
        if (worstAttendanceDay === null || dayBreakdown[day].absenceRate > dayBreakdown[worstAttendanceDay].absenceRate) {
            worstAttendanceDay = day;
        }
        if (bestAttendanceDay === null || dayBreakdown[day].absenceRate < dayBreakdown[bestAttendanceDay].absenceRate) {
            bestAttendanceDay = day;
        }
    }

    // --- STEP 5: RETURN RESULT ---
    return { dayBreakdown, worstAttendanceDay, bestAttendanceDay };
};

// --- EXAMPLE USAGE ---
console.log(analyzeWeeklyAttendancePattern([
    { dayOfWeek: "Mon", status: "PRESENT" },
    { dayOfWeek: "Mon", status: "ABSENT" },
    { dayOfWeek: "Fri", status: "ABSENT" },
    { dayOfWeek: "Fri", status: "ABSENT" }
]));