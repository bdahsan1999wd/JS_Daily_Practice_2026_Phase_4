// 🧩 PROBLEM–02: generateSmartLeaderboard()

// Logic: This function takes an array of students (who already have a finalScore) and ranks them in descending order. Ties are broken first by attendance, then by behaviorScore. If all three values are identical, both students share the same rank number.

function generateSmartLeaderboard(students) {

    // --- STEP 1: VALIDATION ---
    // Input must be a non-empty array to produce a leaderboard.
    if (!Array.isArray(students) || students.length === 0) {
        return "Invalid Input";
    }

    // --- STEP 2: SORT STUDENTS ---
    // Create a shallow copy first with spread [...] so we don't
    // mutate the original array.
    // Sort by finalScore descending → if tied, by attendance
    // descending → if still tied, by behaviorScore descending.
    const sorted = [...students].sort((a, b) => {
        if (b.finalScore !== a.finalScore) return b.finalScore - a.finalScore;
        if (b.attendance !== a.attendance) return b.attendance - a.attendance;
        return b.behaviorScore - a.behaviorScore;
    });

    // --- STEP 3: ASSIGN RANKS ---
    // Track the current rank separately from the array index.
    // When a student's stats differ from the previous student,
    // the rank jumps to (index + 1).
    // When stats are identical across all tiebreakers,
    // the rank stays the same (true tie → same rank).
    let currentRank = 1;

    return sorted.map((student, index) => {

        // First student always gets rank 1.
        if (index > 0) {
            const prev = sorted[index - 1];

            // Compare all three tiebreaker fields.
            // If any differ, this student gets a new rank position.
            const isDifferent =
                student.finalScore !== prev.finalScore ||
                student.attendance !== prev.attendance ||
                student.behaviorScore !== prev.behaviorScore;

            if (isDifferent) {
                currentRank = index + 1; // rank = position in sorted array
            }
            // If NOT different → currentRank stays the same (shared rank)
        }

        // --- STEP 4: RETURN RESULT OBJECT ---
        return {
            name: student.name,
            finalScore: student.finalScore,
            rank: currentRank
        };
    });
}

// --- EXAMPLE USAGE ---
console.log(generateSmartLeaderboard([
    { name: "A", finalScore: 90, attendance: 95, behaviorScore: 80 },
    { name: "B", finalScore: 90, attendance: 85, behaviorScore: 90 }
]));