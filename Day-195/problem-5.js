// PROBLEM-05: runCandidateDecisionPipeline()

// Logic: The "orchestrator" chains screenResume() into scoreCandidateProfile(). If the resume screening FAILS, the pipeline stops immediately and the candidate never gets scored at all.

const EDU_RANK = { HIGH_SCHOOL: 1, BACHELORS: 2, MASTERS: 3, PHD: 4 };

const runCandidateDecisionPipeline = (candidate, jobRequirements) => {

    // --- STEP 1: VALIDATION ---
    if (typeof candidate !== "object" || candidate === null || Array.isArray(candidate)) return "Invalid Input";
    if (typeof jobRequirements !== "object" || jobRequirements === null || Array.isArray(jobRequirements)) return "Invalid Input";

    const {
        yearsExperience, educationLevel, requiredSkillsMatched,
        interviewScore, technicalTestScore, culturalFitScore, hasRelevantCertification
    } = candidate;
    const { minExperience, minEducationLevel, totalRequiredSkills, minSkillMatchPercent } = jobRequirements;

    if (typeof yearsExperience !== "number" || yearsExperience < 0) return "Invalid Input";
    if (!Object.keys(EDU_RANK).includes(educationLevel)) return "Invalid Input";
    if (typeof requiredSkillsMatched !== "number" || !Number.isInteger(requiredSkillsMatched) || requiredSkillsMatched < 0) return "Invalid Input";
    if (typeof interviewScore !== "number" || interviewScore < 0 || interviewScore > 100) return "Invalid Input";
    if (typeof technicalTestScore !== "number" || technicalTestScore < 0 || technicalTestScore > 100) return "Invalid Input";
    if (typeof culturalFitScore !== "number" || culturalFitScore < 0 || culturalFitScore > 100) return "Invalid Input";
    if (typeof hasRelevantCertification !== "boolean") return "Invalid Input";

    if (typeof minExperience !== "number" || minExperience < 0) return "Invalid Input";
    if (!Object.keys(EDU_RANK).includes(minEducationLevel)) return "Invalid Input";
    if (typeof totalRequiredSkills !== "number" || !Number.isInteger(totalRequiredSkills) || totalRequiredSkills <= 0) return "Invalid Input";
    if (typeof minSkillMatchPercent !== "number" || minSkillMatchPercent < 0 || minSkillMatchPercent > 100) return "Invalid Input";

    // --- STEP 2: PIPELINE STAGE 1 - RESUME SCREENING (equivalent of screenResume) ---
    const skillMatchPercent = Number(((requiredSkillsMatched / totalRequiredSkills) * 100).toFixed(2));

    // STOP IMMEDIATELY if any gate fails — no scoring needed for a rejected candidate
    if (yearsExperience < minExperience) {
        return { advancedToInterview: false, reason: "Insufficient experience" };
    }
    if (EDU_RANK[educationLevel] < EDU_RANK[minEducationLevel]) {
        return { advancedToInterview: false, reason: "Education requirement not met" };
    }
    if (skillMatchPercent < minSkillMatchPercent) {
        return { advancedToInterview: false, reason: "Insufficient skill match" };
    }

    // --- STEP 3: PIPELINE STAGE 2 - CANDIDATE SCORING (equivalent of scoreCandidateProfile) ---
    // only reached if the candidate PASSED stage 1
    const experienceScore = Math.min(yearsExperience * 10, 100);
    const certificationBonus = hasRelevantCertification === true ? 100 : 0;

    const compositeScore = Number((
        (experienceScore * 0.2) +
        (interviewScore * 0.3) +
        (technicalTestScore * 0.3) +
        (culturalFitScore * 0.15) +
        (certificationBonus * 0.05)
    ).toFixed(2));

    let tier;
    if (compositeScore >= 85) tier = "STRONG_HIRE";
    else if (compositeScore >= 70) tier = "HIRE";
    else if (compositeScore >= 55) tier = "MAYBE";
    else tier = "NO_HIRE";

    // --- STEP 4: RETURN FINAL RESULT ---
    return { advancedToInterview: true, compositeScore, tier };
};

// --- EXAMPLE USAGE ---
console.log(runCandidateDecisionPipeline(
    { yearsExperience: 6, educationLevel: "MASTERS", requiredSkillsMatched: 9, interviewScore: 88, technicalTestScore: 92, culturalFitScore: 85, hasRelevantCertification: true },
    { minExperience: 3, minEducationLevel: "BACHELORS", totalRequiredSkills: 10, minSkillMatchPercent: 80 }
));