// PROBLEM-04: analyzePortfolioRiskConcentration()

// Logic: Groups insurance policies by risk tier, then checks how much of the TOTAL coverage is concentrated in HIGH_RISK policies too much concentration there is a portfolio-level red flag.

const analyzePortfolioRiskConcentration = (policies) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(policies) || policies.length === 0) return "Invalid Input";
    for (let i = 0; i < policies.length; i++) {
        const p = policies[i];
        if (!p || typeof p !== "object") return "Invalid Input";
        if (typeof p.policyId !== "string") return "Invalid Input";
        if (!["LOW_RISK", "MEDIUM_RISK", "HIGH_RISK"].includes(p.riskTier)) return "Invalid Input";
        if (typeof p.coverageAmount !== "number" || p.coverageAmount <= 0) return "Invalid Input";
    }

    // --- STEP 2: GROUP & SUM COVERAGE BY RISK TIER ---
    const tierBreakdown = {};
    for (let i = 0; i < policies.length; i++) {
        const { riskTier, coverageAmount } = policies[i];
        if (!tierBreakdown[riskTier]) {
            tierBreakdown[riskTier] = { count: 0, totalCoverage: 0 };
        }
        tierBreakdown[riskTier].count += 1;
        tierBreakdown[riskTier].totalCoverage += coverageAmount;
    }

    // --- STEP 3: OVERALL TOTAL COVERAGE ACROSS ALL TIERS ---
    const overallTotalCoverage = policies.reduce((sum, p) => sum + p.coverageAmount, 0);

    // --- STEP 4: HIGH-RISK COVERAGE PERCENT ---
    // use ?? 0 fallback in case there are NO high-risk policies at all
    const highRiskCoverage = tierBreakdown["HIGH_RISK"]?.totalCoverage ?? 0;
    const highRiskCoveragePercent = Number(((highRiskCoverage / overallTotalCoverage) * 100).toFixed(2));

    // --- STEP 5: PORTFOLIO HEALTH STATUS ---
    let portfolioHealthStatus;
    if (highRiskCoveragePercent >= 40) portfolioHealthStatus = "OVEREXPOSED";
    else if (highRiskCoveragePercent >= 20) portfolioHealthStatus = "BALANCED_CAUTION";
    else portfolioHealthStatus = "WELL_DIVERSIFIED";

    // --- STEP 6: RETURN RESULT ---
    return { tierBreakdown, highRiskCoveragePercent, portfolioHealthStatus };
};

// --- EXAMPLE USAGE ---
console.log(analyzePortfolioRiskConcentration([
    { policyId: "P1", riskTier: "HIGH_RISK", coverageAmount: 500000 },
    { policyId: "P2", riskTier: "LOW_RISK", coverageAmount: 300000 },
    { policyId: "P3", riskTier: "MEDIUM_RISK", coverageAmount: 200000 }
]));