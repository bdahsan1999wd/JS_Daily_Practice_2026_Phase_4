// PROBLEM-01: decideScholarshipAward()

// Logic: Two hard gates (discipline + minimum CGPA) must pass first; then an additive score (academic + need + extracurricular) decides the award tier.

const decideScholarshipAward = (student) => {

    // --- STEP 1: VALIDATION ---
    if (typeof student !== "object" || student === null || Array.isArray(student)) return "Invalid Input";
    const { cgpa, familyIncomeAnnual, extracurricularScore, disciplinaryFlags } = student;
    if (typeof cgpa !== "number" || cgpa < 0 || cgpa > 4.00) return "Invalid Input";
    if (typeof familyIncomeAnnual !== "number" || familyIncomeAnnual < 0) return "Invalid Input";
    if (typeof extracurricularScore !== "number" || extracurricularScore < 0 || extracurricularScore > 100) return "Invalid Input";
    if (typeof disciplinaryFlags !== "number" || !Number.isInteger(disciplinaryFlags) || disciplinaryFlags < 0) return "Invalid Input";

    // --- STEP 2: GATE CHECKS - STOP AT FIRST FAILURE ---
    if (disciplinaryFlags !== 0) {
        return { awarded: false, reason: "Disciplinary flags disqualify candidate" };
    }
    if (cgpa < 2.5) {
        return { awarded: false, reason: "CGPA below minimum requirement" };
    }

    // --- STEP 3: SCORING (additive across 3 dimensions) ---
    const academicPoints = cgpa * 20; // max 80 since cgpa caps at 4.00

    let needPoints;
    if (familyIncomeAnnual < 200000) needPoints = 20;
    else if (familyIncomeAnnual <= 500000) needPoints = 10;
    else needPoints = 0;

    const extracurricularPoints = extracurricularScore * 0.1; // max 10

    const totalScore = Number((academicPoints + needPoints + extracurricularPoints).toFixed(2));

    // --- STEP 4: AWARD TIER LOOKUP ---
    let tier, awardPercent;
    if (totalScore >= 85) { tier = "FULL_SCHOLARSHIP"; awardPercent = 100; }
    else if (totalScore >= 70) { tier = "PARTIAL_75"; awardPercent = 75; }
    else if (totalScore >= 55) { tier = "PARTIAL_50"; awardPercent = 50; }
    else if (totalScore >= 40) { tier = "PARTIAL_25"; awardPercent = 25; }
    else { tier = "NOT_AWARDED"; awardPercent = 0; }

    // --- STEP 5: RETURN RESULT ---
    return { awarded: true, totalScore, tier, awardPercent };
};

// --- EXAMPLE USAGE ---
console.log(decideScholarshipAward({
    cgpa: 3.8,
    familyIncomeAnnual: 150000,
    extracurricularScore: 70,
    disciplinaryFlags: 0
}));