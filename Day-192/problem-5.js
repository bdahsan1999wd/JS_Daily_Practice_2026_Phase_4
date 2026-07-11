// PROBLEM-05: buildCustomerExperienceReport()

// Logic: Blends 3 different metrics (rating, NPS, complaint resolution) each scaled to its own portion of a 100-point score into ONE overall experience grade.

const buildCustomerExperienceReport = (feedbackEntries) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(feedbackEntries) || feedbackEntries.length === 0) return "Invalid Input";
    for (let i = 0; i < feedbackEntries.length; i++) {
        const f = feedbackEntries[i];
        if (!f || typeof f !== "object") return "Invalid Input";
        if (typeof f.customerName !== "string") return "Invalid Input";
        if (typeof f.rating !== "number" || !Number.isInteger(f.rating) || f.rating < 1 || f.rating > 5) return "Invalid Input";
        if (typeof f.npsScore !== "number" || !Number.isInteger(f.npsScore) || f.npsScore < 0 || f.npsScore > 10) return "Invalid Input";
        if (typeof f.resolvedComplaint !== "boolean") return "Invalid Input";
    }

    // --- STEP 2: COMPUTE THE 3 BASE METRICS ---
    const totalCount = feedbackEntries.length;
    const averageRating = Number((feedbackEntries.reduce((sum, f) => sum + f.rating, 0) / totalCount).toFixed(2));
    const averageNPS = Number((feedbackEntries.reduce((sum, f) => sum + f.npsScore, 0) / totalCount).toFixed(2));
    const resolvedCount = feedbackEntries.filter(f => f.resolvedComplaint === true).length;
    const complaintResolutionRate = Number(((resolvedCount / totalCount) * 100).toFixed(2));

    // --- STEP 3: WEIGHTED OVERALL EXPERIENCE SCORE ---
    // rating contributes 40 points (scaled from /5), NPS contributes 40
    // points (scaled from /10), complaint resolution contributes 20
    // points (scaled from /100) — together these total 100
    const overallExperienceScore = Number(
        (
            (averageRating / 5) * 40 +
            (averageNPS / 10) * 40 +
            (complaintResolutionRate / 100) * 20
        ).toFixed(2)
    );

    // --- STEP 4: EXPERIENCE GRADE ---
    let experienceGrade;
    if (overallExperienceScore >= 85) experienceGrade = "A";
    else if (overallExperienceScore >= 70) experienceGrade = "B";
    else if (overallExperienceScore >= 50) experienceGrade = "C";
    else experienceGrade = "D";

    // --- STEP 5: BUILD THE REPORT SUMMARY SENTENCE ---
    const reportSummary = `Overall experience score: ${overallExperienceScore}/100 (Grade ${experienceGrade}). Average rating: ${averageRating}/5. Complaint resolution: ${complaintResolutionRate}%.`;

    // --- STEP 6: RETURN FINAL RESULT ---
    return { overallExperienceScore, experienceGrade, reportSummary };
};

// --- EXAMPLE USAGE ---
console.log(buildCustomerExperienceReport([
    { customerName: "A", rating: 5, npsScore: 9, resolvedComplaint: true },
    { customerName: "B", rating: 4, npsScore: 7, resolvedComplaint: true },
    { customerName: "C", rating: 3, npsScore: 5, resolvedComplaint: false }
]));