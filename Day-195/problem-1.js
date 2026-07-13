// PROBLEM-01: screenResume()

// Logic: A decision-tree gate — checks 3 conditions IN ORDER and stops at the FIRST one that fails. Education levels are compared by RANK (a hierarchy), not by string equality.

const EDU_RANK = { HIGH_SCHOOL: 1, BACHELORS: 2, MASTERS: 3, PHD: 4 };

const screenResume = (candidate, jobRequirements) => {

    // --- STEP 1: VALIDATION ---
    if (typeof candidate !== "object" || candidate === null || Array.isArray(candidate)) return "Invalid Input";
    if (typeof jobRequirements !== "object" || jobRequirements === null || Array.isArray(jobRequirements)) return "Invalid Input";

    const { yearsExperience, educationLevel, requiredSkillsMatched } = candidate;
    const { minExperience, minEducationLevel, totalRequiredSkills, minSkillMatchPercent } = jobRequirements;

    if (typeof yearsExperience !== "number" || yearsExperience < 0) return "Invalid Input";
    if (!Object.keys(EDU_RANK).includes(educationLevel)) return "Invalid Input";
    if (typeof requiredSkillsMatched !== "number" || !Number.isInteger(requiredSkillsMatched) || requiredSkillsMatched < 0) return "Invalid Input";

    if (typeof minExperience !== "number" || minExperience < 0) return "Invalid Input";
    if (!Object.keys(EDU_RANK).includes(minEducationLevel)) return "Invalid Input";
    if (typeof totalRequiredSkills !== "number" || !Number.isInteger(totalRequiredSkills) || totalRequiredSkills <= 0) return "Invalid Input";
    if (typeof minSkillMatchPercent !== "number" || minSkillMatchPercent < 0 || minSkillMatchPercent > 100) return "Invalid Input";

    // --- STEP 2: ALWAYS COMPUTE skillMatchPercent (needed regardless of outcome) ---
    const skillMatchPercent = Number(((requiredSkillsMatched / totalRequiredSkills) * 100).toFixed(2));

    // --- STEP 3: DECISION TREE - CHECK IN ORDER, STOP AT FIRST FAILURE ---
    // Check #1: experience requirement
    if (yearsExperience < minExperience) {
        return { passed: false, rejectionReason: "Insufficient experience", skillMatchPercent };
    }
    // Check #2: education requirement (compare numeric RANK, not the string itself)
    if (EDU_RANK[educationLevel] < EDU_RANK[minEducationLevel]) {
        return { passed: false, rejectionReason: "Education requirement not met", skillMatchPercent };
    }
    // Check #3: skill match requirement
    if (skillMatchPercent < minSkillMatchPercent) {
        return { passed: false, rejectionReason: "Insufficient skill match", skillMatchPercent };
    }

    // --- STEP 4: ALL 3 CHECKS PASSED ---
    return { passed: true, rejectionReason: null, skillMatchPercent };
};

// --- EXAMPLE USAGE ---
console.log(screenResume(
    { yearsExperience: 3, educationLevel: "BACHELORS", requiredSkillsMatched: 6 },
    { minExperience: 2, minEducationLevel: "BACHELORS", totalRequiredSkills: 10, minSkillMatchPercent: 70 }
));