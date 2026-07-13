// PROBLEM-04: rankLoanApplicants()

// Logic: Ranks applicants by risk score (higher = safer, gets priority). Ties are broken by smaller requested amount (safer to approve). A FULL tie (both riskScore AND requestedAmount equal) shares the same rank.

const rankLoanApplicants = (applicants) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(applicants) || applicants.length === 0) return "Invalid Input";
    for (let i = 0; i < applicants.length; i++) {
        const a = applicants[i];
        if (!a || typeof a !== "object") return "Invalid Input";
        if (typeof a.applicantName !== "string") return "Invalid Input";
        if (typeof a.riskScore !== "number" || a.riskScore < 0 || a.riskScore > 100) return "Invalid Input";
        if (typeof a.requestedAmount !== "number" || a.requestedAmount <= 0) return "Invalid Input";
    }

    // --- STEP 2: SORT - riskScore DESCENDING, THEN requestedAmount ASCENDING (tie-break) ---
    const sorted = [...applicants].sort((a, b) => {
        if (b.riskScore !== a.riskScore) return b.riskScore - a.riskScore;
        return a.requestedAmount - b.requestedAmount; // smaller amount wins the tie
    });

    // --- STEP 3: ASSIGN RANKS ---
    // a FULL tie (both riskScore AND requestedAmount equal to the previous
    // entry) shares the same rank as that previous entry; otherwise the
    // rank is simply this entry's 1-based position
    const result = [];
    for (let i = 0; i < sorted.length; i++) {
        let rank;
        if (i === 0) {
            rank = 1;
        } else {
            const prev = sorted[i - 1];
            const curr = sorted[i];
            const isFullTie = (curr.riskScore === prev.riskScore) && (curr.requestedAmount === prev.requestedAmount);
            rank = isFullTie ? result[i - 1].rank : i + 1;
        }

        // --- STEP 4: ASSIGN PRIORITY LEVEL BASED ON RANK ---
        let priorityLevel;
        if (rank === 1) priorityLevel = "FIRST_PRIORITY";
        else if (rank <= 3) priorityLevel = "SECOND_PRIORITY";
        else priorityLevel = "STANDARD_QUEUE";

        result.push({
            applicantName: sorted[i].applicantName,
            riskScore: sorted[i].riskScore,
            rank,
            priorityLevel
        });
    }

    // --- STEP 5: RETURN RESULT ---
    return result;
};

// --- EXAMPLE USAGE ---
console.log(rankLoanApplicants([
    { applicantName: "Hasan", riskScore: 85, requestedAmount: 200000 },
    { applicantName: "Mina", riskScore: 90, requestedAmount: 150000 },
    { applicantName: "Tarek", riskScore: 85, requestedAmount: 100000 }
]));