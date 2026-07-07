// PROBLEM-03: calculateTeamPerformanceIndex()

// Logic: Computes a weighted score per team member (quality + speed + collaboration, each scaled by its weight), then ranks them. The 3 weights MUST sum to 1 — anything else is invalid.

const calculateTeamPerformanceIndex = (teamMembers, weights) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(teamMembers) || teamMembers.length === 0) return "Invalid Input";
    if (typeof weights !== "object" || weights === null || Array.isArray(weights)) return "Invalid Input";
    for (let i = 0; i < teamMembers.length; i++) {
        const m = teamMembers[i];
        if (!m || typeof m !== "object") return "Invalid Input";
        if (typeof m.name !== "string") return "Invalid Input";
        if (typeof m.qualityScore !== "number" || m.qualityScore < 0 || m.qualityScore > 100) return "Invalid Input";
        if (typeof m.speedScore !== "number" || m.speedScore < 0 || m.speedScore > 100) return "Invalid Input";
        if (typeof m.collaborationScore !== "number" || m.collaborationScore < 0 || m.collaborationScore > 100) return "Invalid Input";
    }
    const { quality, speed, collaboration } = weights;
    if (typeof quality !== "number" || quality < 0 || quality > 1) return "Invalid Input";
    if (typeof speed !== "number" || speed < 0 || speed > 1) return "Invalid Input";
    if (typeof collaboration !== "number" || collaboration < 0 || collaboration > 1) return "Invalid Input";

    // --- STEP 2: WEIGHTS MUST SUM TO 1 (WITHIN A SMALL FLOATING TOLERANCE) ---
    // floating point math (0.1+0.2+0.7) can be 0.9999999... instead of exactly 1,
    // so we check the ABSOLUTE difference is small rather than using strict equality
    const weightSum = quality + speed + collaboration;
    if (Math.abs(weightSum - 1) > 0.01) {
        return "Invalid Input";
    }

    // --- STEP 3: COMPUTE WEIGHTED PERFORMANCE INDEX PER MEMBER ---
    const computed = teamMembers.map(m => {
        const performanceIndex = Number(
            (m.qualityScore * quality + m.speedScore * speed + m.collaborationScore * collaboration).toFixed(2)
        );
        return { name: m.name, performanceIndex };
    });

    // --- STEP 4: RANK MEMBERS DESCENDING BY performanceIndex ---
    const rankedMembers = [...computed].sort((a, b) => b.performanceIndex - a.performanceIndex);

    // --- STEP 5: TEAM AVERAGE INDEX ---
    const teamAverageIndex = Number(
        (computed.reduce((sum, m) => sum + m.performanceIndex, 0) / computed.length).toFixed(2)
    );

    // --- STEP 6: RETURN RESULT ---
    return { rankedMembers, teamAverageIndex };
};

// --- EXAMPLE USAGE ---
console.log(calculateTeamPerformanceIndex([
    { name: "Tonny", qualityScore: 90, speedScore: 70, collaborationScore: 80 },
    { name: "Bidisha", qualityScore: 75, speedScore: 95, collaborationScore: 70 }
], { quality: 0.5, speed: 0.3, collaboration: 0.2 }));