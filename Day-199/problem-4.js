// PROBLEM-04: manageWaitingQueue()

// Logic: Orders patients by urgency, breaking ties by who arrived first, and converts each patient's rank into an estimated time until they're called.

const manageWaitingQueue = (patients) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(patients) || patients.length === 0) return "Invalid Input";
    for (let i = 0; i < patients.length; i++) {
        const p = patients[i];
        if (!p || typeof p !== "object") return "Invalid Input";
        if (typeof p.patientName !== "string") return "Invalid Input";
        if (typeof p.triageScore !== "number" || p.triageScore < 0) return "Invalid Input";
        if (typeof p.arrivalOrder !== "number" || !Number.isInteger(p.arrivalOrder) || p.arrivalOrder < 1) return "Invalid Input";
    }

    // --- STEP 2: SORT - triageScore DESCENDING, THEN arrivalOrder ASCENDING (tie-break) ---
    const sorted = [...patients].sort((a, b) => {
        if (b.triageScore !== a.triageScore) return b.triageScore - a.triageScore;
        return a.arrivalOrder - b.arrivalOrder; // earlier arrival wins the tie
    });

    // --- STEP 3: ASSIGN RANKS ---
    // a FULL tie (both triageScore AND arrivalOrder equal to the previous
    // patient) shares that previous patient's rank
    const result = [];
    for (let i = 0; i < sorted.length; i++) {
        let rank;
        if (i === 0) {
            rank = 1;
        } else {
            const prev = sorted[i - 1];
            const curr = sorted[i];
            const isFullTie = (curr.triageScore === prev.triageScore) && (curr.arrivalOrder === prev.arrivalOrder);
            rank = isFullTie ? result[i - 1].rank : i + 1;
        }

        // --- STEP 4: ESTIMATED CALL TIME (10 minutes per rank above #1) ---
        const estimatedCallTime = (rank - 1) * 10;

        result.push({
            patientName: sorted[i].patientName,
            triageScore: sorted[i].triageScore,
            rank,
            estimatedCallTime
        });
    }

    // --- STEP 5: RETURN RESULT ---
    return result;
};

// --- EXAMPLE USAGE ---
console.log(manageWaitingQueue([
    { patientName: "Rina", triageScore: 40, arrivalOrder: 2 },
    { patientName: "Sabbir", triageScore: 55, arrivalOrder: 1 },
    { patientName: "Tuli", triageScore: 40, arrivalOrder: 1 }
]));