// PROBLEM-02: detectChronicAbsenteeism()

// Logic: Flags employees whose individual absence rate crosses a given threshold, and separately reports the company-wide pooled absence rate.

const detectChronicAbsenteeism = (attendanceLogs, absenceThresholdPercent) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(attendanceLogs) || attendanceLogs.length === 0) return "Invalid Input";
    if (typeof absenceThresholdPercent !== "number" || absenceThresholdPercent < 0 || absenceThresholdPercent > 100) {
        return "Invalid Input";
    }
    for (let i = 0; i < attendanceLogs.length; i++) {
        const log = attendanceLogs[i];
        if (!log || typeof log !== "object") return "Invalid Input";
        if (typeof log.employeeName !== "string") return "Invalid Input";
        if (typeof log.status !== "string") return "Invalid Input";
    }

    // --- STEP 2: GROUP & COUNT PER EMPLOYEE, ALSO TRACK OVERALL ABSENT COUNT ---
    const countsMap = {};
    let totalAbsentOverall = 0;
    for (let i = 0; i < attendanceLogs.length; i++) {
        const { employeeName, status } = attendanceLogs[i];
        if (!countsMap[employeeName]) {
            countsMap[employeeName] = { totalDays: 0, absentDays: 0 };
        }
        countsMap[employeeName].totalDays += 1;
        if (status === "ABSENT") {
            countsMap[employeeName].absentDays += 1;
            totalAbsentOverall += 1; // pooled count across EVERYONE
        }
    }

    // --- STEP 3: COMPUTE PER-EMPLOYEE ABSENCE RATE & FLAG CHRONIC ABSENTEES ---
    const chronicAbsentees = [];
    for (const name in countsMap) {
        const { totalDays, absentDays } = countsMap[name];
        const absenceRate = Number(((absentDays / totalDays) * 100).toFixed(2));
        const isChronicAbsentee = absenceRate >= absenceThresholdPercent;
        if (isChronicAbsentee) {
            chronicAbsentees.push({ employeeName: name, absenceRate });
        }
    }

    // --- STEP 4: OVERALL ABSENCE RATE (pooled across ALL logs, not averaged per-person) ---
    const overallAbsenceRate = Number(((totalAbsentOverall / attendanceLogs.length) * 100).toFixed(2));

    // --- STEP 5: RETURN RESULT ---
    return { chronicAbsentees, overallAbsenceRate };
};

// --- EXAMPLE USAGE ---
console.log(detectChronicAbsenteeism([
    { employeeName: "Rumi", status: "ABSENT" },
    { employeeName: "Rumi", status: "ABSENT" },
    { employeeName: "Rumi", status: "PRESENT" },
    { employeeName: "Karim", status: "PRESENT" },
    { employeeName: "Karim", status: "PRESENT" }
], 50));