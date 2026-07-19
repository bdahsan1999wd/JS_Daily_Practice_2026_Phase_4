// PROBLEM-05: runUniversalDecisionOrchestrator()

// Logic: A 3-way orchestrator routes each request to the matching decision function (Problems 1-3) based on its `domain`, and tallies how many were approved/rejected across ALL domains.

const { decideScholarshipAward } = require("./problem-1");
const { decideRentalApplication } = require("./problem-2");
const { decideClaimSettlement } = require("./problem-3");

const runUniversalDecisionOrchestrator = (requests) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(requests) || requests.length === 0) return "Invalid Input";

    // --- STEP 2: PROCESS EACH REQUEST BASED ON ITS domain ---
    const results = [];
    let approvedCount = 0;

    for (let i = 0; i < requests.length; i++) {
        const req = requests[i];
        const domain = req?.domain;
        let outcome;

        if (domain === "SCHOLARSHIP") {
            outcome = decideScholarshipAward(req.data);
        } else if (domain === "RENTAL") {
            outcome = decideRentalApplication(req.data, req.monthlyRent);
        } else if (domain === "INSURANCE_CLAIM") {
            outcome = decideClaimSettlement(req.data);
        } else {
            outcome = "Invalid Input";
        }

        results.push({ domain, outcome });

        // --- STEP 3: CHECK IF THIS OUTCOME COUNTS AS "APPROVED" ---
        // each domain uses a different field name for success, so we check all 3
        const isApproved =
            (outcome && typeof outcome === "object") &&
            (outcome.awarded === true || outcome.approved === true || outcome.settled === true);

        if (isApproved) approvedCount++;
    }

    // --- STEP 4: BUILD THE FINAL TALLY ---
    const totalRequests = requests.length;
    const rejectedCount = totalRequests - approvedCount;
    const approvalRate = Number(((approvedCount / totalRequests) * 100).toFixed(2));

    // --- STEP 5: RETURN RESULT ---
    return { results, totalRequests, approvedCount, rejectedCount, approvalRate };
};

// --- EXAMPLE USAGE ---
console.log(JSON.stringify(runUniversalDecisionOrchestrator([
    { domain: "SCHOLARSHIP", data: { cgpa: 3.8, familyIncomeAnnual: 150000, extracurricularScore: 70, disciplinaryFlags: 0 } },
    { domain: "RENTAL", data: { monthlyIncome: 60000, creditScore: 700, hasEvictionHistory: false, hasPets: true }, monthlyRent: 18000 },
    { domain: "INSURANCE_CLAIM", data: { policyActive: false, damageEstimate: 10000, policyLimit: 5000, deductible: 500, atFaultPercent: 0, previousClaimsThisYear: 0 } }
])));