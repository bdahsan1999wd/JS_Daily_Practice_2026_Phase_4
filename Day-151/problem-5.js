// 🧩 PROBLEM–05: promotionEngine()

// Logic: This function evaluates each student's promotion eligibility based on their finalScore, attendance, and behaviorScore. It checks conditions in priority order: PROMOTED first (best case), then CONDITIONAL (borderline), and FAILED as the default fallback.

function promotionEngine(students) {

    // --- STEP 1: VALIDATION ---
    // Input must be a non-empty array of student objects.
    if (!Array.isArray(students) || students.length === 0) {
        return "Invalid Input";
    }

    // --- STEP 2: EVALUATE EACH STUDENT ---
    // .map() transforms each student object into a result object
    // containing only name and decision.
    return students.map(student => {

        const { name, finalScore, attendance, behaviorScore } = student;

        // --- STEP 3: APPLY PROMOTION RULES IN PRIORITY ORDER ---

        // RULE 1 PROMOTED (highest priority):
        // Student must score ≥ 75 AND have attendance ≥ 80.
        // Both conditions must be true simultaneously (AND logic).
        if (finalScore >= 75 && attendance >= 80) {
            return { name, decision: "PROMOTED" };
        }

        // RULE 2 CONDITIONAL (middle tier):
        // Student scored in the borderline range (60–74) AND
        // has good enough behavior (≥ 70) to earn a conditional pass.
        // Note: finalScore <= 74 is explicit here to clearly
        // separate this tier from the PROMOTED range above.
        if (finalScore >= 60 && finalScore <= 74 && behaviorScore >= 70) {
            return { name, decision: "CONDITIONAL" };
        }

        // RULE 3 FAILED (default fallback):
        // If neither condition above was satisfied, the student
        // does not qualify for promotion or conditional status.
        return { name, decision: "FAILED" };
    });
}

// --- EXAMPLE USAGE ---
console.log(promotionEngine([
    { name: "A", finalScore: 80, attendance: 85, behaviorScore: 70 },
    { name: "B", finalScore: 65, attendance: 80, behaviorScore: 75 },
    { name: "C", finalScore: 40, attendance: 60, behaviorScore: 30 }
]));