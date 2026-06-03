// 🧩 PROBLEM–04: checkExamEligibility()

// Logic: This function tests structural condition criteria (marks, attendance, assignment submissions) across an entire student list to evaluate eligibility metrics.

function checkExamEligibility(students) {

    // --- STEP 1: VALIDATION ---
    // Ensure students is a non-empty array.
    if (!Array.isArray(students) || students.length === 0) {
        return "Invalid Input";
    }

    for (const student of students) {
        if (
            !student ||
            typeof student.name !== "string" ||
            typeof student.average !== "number" || student.average < 0 || student.average > 100 ||
            typeof student.attendance !== "number" || student.attendance < 0 || student.attendance > 100 ||
            typeof student.assignmentsSubmitted !== "number" || student.assignmentsSubmitted < 0 || student.assignmentsSubmitted > 10 ||
            student.totalAssignments !== 10
        ) {
            return "Invalid Input";
        }
    }

    // --- STEP 2: RE-MAP AND CLASSIFY GROUPS ---
    const eligibleStudents = [];
    const ineligibleStudents = [];

    students.forEach(student => {
        // Eligibility rules evaluation matrix
        const passesAverage = student.average >= 40;
        const passesAttendance = student.attendance >= 75;
        const passesAssignments = student.assignmentsSubmitted >= 8;

        if (passesAverage && passesAttendance && passesAssignments) {
            eligibleStudents.push(student.name);
        } else {
            ineligibleStudents.push(student.name);
        }
    });

    // --- STEP 3: ANALYZE SYSTEM METRICS WITH EVERY & SOME ---
    const allEligible = students.every(student => student.average >= 40 && student.attendance >= 75 && student.assignmentsSubmitted >= 8);
    const anyIneligible = students.some(student => !(student.average >= 40 && student.attendance >= 75 && student.assignmentsSubmitted >= 8));

    // --- STEP 4: RETURN CONSOLIDATED DISPATCH ---
    return {
        allEligible,
        anyIneligible,
        eligibleStudents,
        ineligibleStudents
    };
}

// --- EXAMPLE USAGE ---
console.log(
    checkExamEligibility([
        { name: "Kamal", average: 65, attendance: 80, assignmentsSubmitted: 9, totalAssignments: 10 },
        { name: "Jamal", average: 35, attendance: 90, assignmentsSubmitted: 10, totalAssignments: 10 },
        { name: "Tamal", average: 70, attendance: 70, assignmentsSubmitted: 8, totalAssignments: 10 }
    ])
);

console.log(
    checkExamEligibility([{ name: "Faulty Schema Data" }])
);