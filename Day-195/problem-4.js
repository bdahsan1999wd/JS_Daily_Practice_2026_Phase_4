// PROBLEM-04: shortlistCandidates()

// Logic: Ranks candidates and shortlists the TOP N — but if a tied group of candidates straddles the cutoff boundary, the WHOLE tied group gets included rather than arbitrarily splitting it.

const shortlistCandidates = (candidates, maxShortlistSize) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(candidates) || candidates.length === 0) return "Invalid Input";
    if (typeof maxShortlistSize !== "number" || !Number.isInteger(maxShortlistSize) || maxShortlistSize < 1) {
        return "Invalid Input";
    }
    for (let i = 0; i < candidates.length; i++) {
        const c = candidates[i];
        if (!c || typeof c !== "object") return "Invalid Input";
        if (typeof c.candidateName !== "string") return "Invalid Input";
        if (typeof c.compositeScore !== "number" || c.compositeScore < 0 || c.compositeScore > 100) return "Invalid Input";
        if (typeof c.yearsExperience !== "number" || c.yearsExperience < 0) return "Invalid Input";
    }

    // --- STEP 2: SORT - compositeScore DESCENDING, THEN yearsExperience DESCENDING (tie-break) ---
    const sorted = [...candidates].sort((a, b) => {
        if (b.compositeScore !== a.compositeScore) return b.compositeScore - a.compositeScore;
        return b.yearsExperience - a.yearsExperience;
    });

    // --- STEP 3: ASSIGN RANKS ---
    // a FULL tie (both compositeScore AND yearsExperience equal to the
    // previous candidate) shares that previous candidate's rank
    const ranked = [];
    for (let i = 0; i < sorted.length; i++) {
        let rank;
        if (i === 0) {
            rank = 1;
        } else {
            const prev = sorted[i - 1];
            const curr = sorted[i];
            const isFullTie = (curr.compositeScore === prev.compositeScore) && (curr.yearsExperience === prev.yearsExperience);
            rank = isFullTie ? ranked[i - 1].rank : i + 1;
        }
        ranked.push({
            candidateName: sorted[i].candidateName,
            compositeScore: sorted[i].compositeScore,
            rank
        });
    }

    // --- STEP 4: DETERMINE THE SHORTLIST CUTOFF ---
    // Look at whichever candidate sits at position `maxShortlistSize`
    // (capped to the list's actual length) and take THEIR rank as the
    // cutoff. Everyone with rank <= cutoffRank gets shortlisted — this
    // naturally pulls in an entire tied group even if it makes the
    // shortlist bigger than maxShortlistSize originally asked for.
    const cutoffIndex = Math.min(maxShortlistSize, ranked.length) - 1;
    const cutoffRank = ranked[cutoffIndex].rank;

    const shortlisted = ranked.filter(c => c.rank <= cutoffRank);
    const waitlisted = ranked.filter(c => c.rank > cutoffRank);

    // --- STEP 5: RETURN RESULT ---
    return { shortlisted, waitlisted };
};

// --- EXAMPLE USAGE ---
console.log(shortlistCandidates([
    { candidateName: "Lima", compositeScore: 90, yearsExperience: 5 },
    { candidateName: "Rony", compositeScore: 85, yearsExperience: 3 },
    { candidateName: "Sami", compositeScore: 85, yearsExperience: 7 },
    { candidateName: "Tani", compositeScore: 70, yearsExperience: 2 }
], 2));