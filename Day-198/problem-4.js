// PROBLEM-04: distributeTeamBonusPool()

// Logic: Splits a bonus pool proportionally by contribution score. Because rounding each share individually can leave a tiny leftover/shortfall, that leftover gets folded into whoever contributed the MOST (so the pool is fully distributed with no money lost to rounding).

const distributeTeamBonusPool = (totalBonusPool, teamMembers) => {

    // --- STEP 1: VALIDATION ---
    if (typeof totalBonusPool !== "number" || totalBonusPool <= 0) return "Invalid Input";
    if (!Array.isArray(teamMembers) || teamMembers.length === 0) return "Invalid Input";
    for (let i = 0; i < teamMembers.length; i++) {
        const m = teamMembers[i];
        if (!m || typeof m !== "object") return "Invalid Input";
        if (typeof m.employeeName !== "string") return "Invalid Input";
        if (typeof m.contributionScore !== "number" || m.contributionScore <= 0) return "Invalid Input";
    }

    // --- STEP 2: TOTAL CONTRIBUTION SCORE ACROSS THE TEAM ---
    const totalContributionScore = teamMembers.reduce((sum, m) => sum + m.contributionScore, 0);

    // --- STEP 3: COMPUTE EACH MEMBER'S PROPORTIONAL SHARE (ROUNDED) ---
    const distribution = teamMembers.map(m => ({
        employeeName: m.employeeName,
        contributionScore: m.contributionScore,
        shareOfPool: Number(((m.contributionScore / totalContributionScore) * totalBonusPool).toFixed(2))
    }));

    // --- STEP 4: COMPUTE THE ROUNDING DIFFERENCE ---
    // sum up all the ALREADY-ROUNDED shares and see how far that is from the true total
    const sumOfShares = distribution.reduce((sum, d) => sum + d.shareOfPool, 0);
    const roundingDifference = Number((totalBonusPool - sumOfShares).toFixed(2));

    // --- STEP 5: FIND THE HIGHEST CONTRIBUTOR (first one wins on a tie) ---
    let highestIndex = 0;
    for (let i = 1; i < distribution.length; i++) {
        if (distribution[i].contributionScore > distribution[highestIndex].contributionScore) {
            highestIndex = i;
        }
    }

    // --- STEP 6: FOLD THE ROUNDING DIFFERENCE INTO THE HIGHEST CONTRIBUTOR'S SHARE ---
    distribution[highestIndex].shareOfPool = Number(
        (distribution[highestIndex].shareOfPool + roundingDifference).toFixed(2)
    );

    // --- STEP 7: STRIP contributionScore BEFORE RETURNING (only employeeName + shareOfPool needed) ---
    const finalDistribution = distribution.map(({ employeeName, shareOfPool }) => ({ employeeName, shareOfPool }));

    // --- STEP 8: RETURN RESULT ---
    return { distribution: finalDistribution };
};

// --- EXAMPLE USAGE ---
console.log(distributeTeamBonusPool(10000, [
    { employeeName: "Alif", contributionScore: 3 },
    { employeeName: "Bilal", contributionScore: 4 },
    { employeeName: "Chumki", contributionScore: 3 }
]));