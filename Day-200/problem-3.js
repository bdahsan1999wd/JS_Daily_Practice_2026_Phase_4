// PROBLEM-03: decideClaimSettlement()

// Logic: 2-step policy gate, then settlement math flows through 3 stages fault adjustment, deductible subtraction, then capping at the policy limit.

const decideClaimSettlement = (claim) => {

    // --- STEP 1: VALIDATION ---
    if (typeof claim !== "object" || claim === null || Array.isArray(claim)) return "Invalid Input";
    const { policyActive, damageEstimate, policyLimit, deductible, atFaultPercent, previousClaimsThisYear } = claim;
    if (typeof policyActive !== "boolean") return "Invalid Input";
    if (typeof damageEstimate !== "number" || damageEstimate <= 0) return "Invalid Input";
    if (typeof policyLimit !== "number" || policyLimit <= 0) return "Invalid Input";
    if (typeof deductible !== "number" || deductible < 0) return "Invalid Input";
    if (typeof atFaultPercent !== "number" || atFaultPercent < 0 || atFaultPercent > 100) return "Invalid Input";
    if (typeof previousClaimsThisYear !== "number" || !Number.isInteger(previousClaimsThisYear) || previousClaimsThisYear < 0) return "Invalid Input";

    // --- STEP 2: GATE CHECKS - STOP AT FIRST FAILURE ---
    if (policyActive !== true) {
        return { settled: false, reason: "Policy is not active" };
    }
    if (previousClaimsThisYear >= 3) {
        return { settled: false, reason: "Maximum claims per year exceeded" };
    }

    // --- STEP 3: SETTLEMENT MATH (3 sequential adjustments) ---
    // (a) adjust damage by the OTHER party's fault share
    const faultAdjustedDamage = Number((damageEstimate * ((100 - atFaultPercent) / 100)).toFixed(2));
    // (b) subtract the deductible, never going below 0
    const afterDeductible = Number(Math.max(0, faultAdjustedDamage - deductible).toFixed(2));
    // (c) cap the payout at the policy limit
    const payoutAmount = Number(Math.min(afterDeductible, policyLimit).toFixed(2));
    const wasCapped = afterDeductible > policyLimit;

    // --- STEP 4: RETURN RESULT ---
    return { settled: true, payoutAmount, wasCapped };
};

// --- EXAMPLE USAGE ---
if (require.main === module) {
    console.log(decideClaimSettlement({
        policyActive: true,
        damageEstimate: 100000,
        policyLimit: 80000,
        deductible: 5000,
        atFaultPercent: 20,
        previousClaimsThisYear: 1
    }));
}

module.exports = { decideClaimSettlement };