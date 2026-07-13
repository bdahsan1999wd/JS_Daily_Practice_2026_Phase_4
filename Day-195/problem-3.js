// PROBLEM-03: calculatePanelConsensus()

// Logic: Decides a final hiring recommendation from multiple interviewer votes. PRIORITY ORDER matters here: unanimous decisions win first, then direct HIRE-vs-NO_HIRE conflicts get escalated, and only otherwise does plain majority apply.

const calculatePanelConsensus = (panelScores) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(panelScores) || panelScores.length === 0) return "Invalid Input";
    for (let i = 0; i < panelScores.length; i++) {
        const p = panelScores[i];
        if (!p || typeof p !== "object") return "Invalid Input";
        if (typeof p.interviewerName !== "string") return "Invalid Input";
        if (typeof p.score !== "number" || p.score < 0 || p.score > 100) return "Invalid Input";
        if (!["HIRE", "NO_HIRE", "MAYBE"].includes(p.recommendation)) return "Invalid Input";
    }

    // --- STEP 2: AVERAGE SCORE ---
    const averageScore = Number(
        (panelScores.reduce((sum, p) => sum + p.score, 0) / panelScores.length).toFixed(2)
    );

    // --- STEP 3: COUNT VOTES PER RECOMMENDATION TYPE ---
    const hireVotes = panelScores.filter(p => p.recommendation === "HIRE").length;
    const noHireVotes = panelScores.filter(p => p.recommendation === "NO_HIRE").length;
    const maybeVotes = panelScores.filter(p => p.recommendation === "MAYBE").length;

    // --- STEP 4: UNANIMOUS & CONFLICTING FLAGS ---
    const hasUnanimousDecision = (hireVotes === panelScores.length) ||
        (noHireVotes === panelScores.length) ||
        (maybeVotes === panelScores.length);
    // a direct conflict needs AT LEAST ONE HIRE and AT LEAST ONE NO_HIRE
    const hasConflictingViews = hireVotes >= 1 && noHireVotes >= 1;

    // --- STEP 5: FINAL RECOMMENDATION (priority order matters!) ---
    let finalRecommendation;
    if (hasUnanimousDecision) {
        // figure out which single recommendation everyone gave
        if (hireVotes === panelScores.length) finalRecommendation = "HIRE";
        else if (noHireVotes === panelScores.length) finalRecommendation = "NO_HIRE";
        else finalRecommendation = "MAYBE";
    } else if (hasConflictingViews) {
        // direct HIRE vs NO_HIRE disagreement always escalates,
        // even if one side technically has more votes
        finalRecommendation = "ESCALATE_TO_SENIOR_REVIEW";
    } else {
        // mixed votes but NO direct conflict (e.g. some HIRE + some MAYBE) ->
        // simple majority decides; a tie among the top vote-getters escalates
        const voteCounts = [
            { rec: "HIRE", count: hireVotes },
            { rec: "NO_HIRE", count: noHireVotes },
            { rec: "MAYBE", count: maybeVotes }
        ];
        const maxVotes = Math.max(...voteCounts.map(v => v.count));
        const topRecs = voteCounts.filter(v => v.count === maxVotes);

        if (topRecs.length > 1) {
            finalRecommendation = "ESCALATE_TO_SENIOR_REVIEW";
        } else {
            finalRecommendation = topRecs[0].rec;
        }
    }

    // --- STEP 6: RETURN RESULT ---
    return { averageScore, hasUnanimousDecision, hasConflictingViews, finalRecommendation };
};

// --- EXAMPLE USAGE ---
console.log(calculatePanelConsensus([
    { interviewerName: "A", score: 80, recommendation: "HIRE" },
    { interviewerName: "B", score: 40, recommendation: "NO_HIRE" },
    { interviewerName: "C", score: 75, recommendation: "HIRE" }
]));