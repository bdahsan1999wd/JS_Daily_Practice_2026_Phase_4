// PROBLEM-02: calculateNPS()

// Logic: Classic Net Promoter Score — splits respondents into promoters/passives/detractors by their 0-10 score, then computes NPS = %promoters - %detractors (passives ignored).

const calculateNPS = (surveyResponses) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(surveyResponses) || surveyResponses.length === 0) return "Invalid Input";
    for (let i = 0; i < surveyResponses.length; i++) {
        const r = surveyResponses[i];
        if (!r || typeof r !== "object") return "Invalid Input";
        if (typeof r.customerName !== "string") return "Invalid Input";
        if (typeof r.score !== "number" || !Number.isInteger(r.score) || r.score < 0 || r.score > 10) return "Invalid Input";
    }

    // --- STEP 2: CLASSIFY EACH RESPONSE INTO ONE OF 3 BUCKETS ---
    let promoterCount = 0;
    let passiveCount = 0;
    let detractorCount = 0;

    for (let i = 0; i < surveyResponses.length; i++) {
        const score = surveyResponses[i].score;
        if (score >= 9) promoterCount++;       // 9-10
        else if (score >= 7) passiveCount++;   // 7-8
        else detractorCount++;                 // 0-6
    }

    // --- STEP 3: COMPUTE THE NPS SCORE ---
    // NPS = % promoters MINUS % detractors (passives don't factor in at all)
    const total = surveyResponses.length;
    const promoterPercent = (promoterCount / total) * 100;
    const detractorPercent = (detractorCount / total) * 100;
    const npsScore = Number((promoterPercent - detractorPercent).toFixed(2));

    // --- STEP 4: NPS CATEGORY ---
    let npsCategory;
    if (npsScore >= 50) npsCategory = "EXCELLENT";
    else if (npsScore >= 0) npsCategory = "GOOD";
    else npsCategory = "POOR";

    // --- STEP 5: RETURN RESULT ---
    return { promoterCount, passiveCount, detractorCount, npsScore, npsCategory };
};

// --- EXAMPLE USAGE ---
console.log(calculateNPS([
    { customerName: "A", score: 10 },
    { customerName: "B", score: 9 },
    { customerName: "C", score: 5 },
    { customerName: "D", score: 7 }
]));