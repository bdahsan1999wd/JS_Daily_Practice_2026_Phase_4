// PROBLEM-02: scoreCandidateProfile()

// Logic: Combines 5 different signals into ONE weighted composite score (out of 100), then maps that score to a hiring tier.

const scoreCandidateProfile = (candidate) => {

    // --- STEP 1: VALIDATION ---
    if (typeof candidate !== "object" || candidate === null || Array.isArray(candidate)) return "Invalid Input";
    const { yearsExperience, interviewScore, technicalTestScore, culturalFitScore, hasRelevantCertification } = candidate;

    if (typeof yearsExperience !== "number" || yearsExperience < 0) return "Invalid Input";
    if (typeof interviewScore !== "number" || interviewScore < 0 || interviewScore > 100) return "Invalid Input";
    if (typeof technicalTestScore !== "number" || technicalTestScore < 0 || technicalTestScore > 100) return "Invalid Input";
    if (typeof culturalFitScore !== "number" || culturalFitScore < 0 || culturalFitScore > 100) return "Invalid Input";
    if (typeof hasRelevantCertification !== "boolean") return "Invalid Input";

    // --- STEP 2: EXPERIENCE SCORE (10 points per year, capped at 100) ---
    const experienceScore = Math.min(yearsExperience * 10, 100);

    // --- STEP 3: CERTIFICATION BONUS (all-or-nothing) ---
    const certificationBonus = hasRelevantCertification === true ? 100 : 0;

    // --- STEP 4: WEIGHTED COMPOSITE SCORE ---
    // weights: experience 20%, interview 30%, technical 30%, culture 15%, cert 5%
    const compositeScore = Number((
        (experienceScore * 0.2) +
        (interviewScore * 0.3) +
        (technicalTestScore * 0.3) +
        (culturalFitScore * 0.15) +
        (certificationBonus * 0.05)
    ).toFixed(2));

    // --- STEP 5: RECOMMENDATION TIER ---
    let tier;
    if (compositeScore >= 85) tier = "STRONG_HIRE";
    else if (compositeScore >= 70) tier = "HIRE";
    else if (compositeScore >= 55) tier = "MAYBE";
    else tier = "NO_HIRE";

    // --- STEP 6: RETURN RESULT ---
    return { compositeScore, tier };
};

// --- EXAMPLE USAGE ---
console.log(scoreCandidateProfile({
    yearsExperience: 5,
    interviewScore: 85,
    technicalTestScore: 90,
    culturalFitScore: 80,
    hasRelevantCertification: true
}));