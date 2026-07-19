// PROBLEM-10: processCrossDomainBatch()

// Logic: Extends Problem-05's orchestrator to ALL 7 domains from this document. Tracks per-domain success/failure counts, an overall success rate, and which domain appeared most often in the batch. SHIPPING is special: it's a RECOMMENDATION engine, not a gate, so any valid (non-error) result counts as a "success".

const { decideScholarshipAward } = require("./problem-1");
const { decideRentalApplication } = require("./problem-2");
const { decideClaimSettlement } = require("./problem-3");
const { decideVisaApplication } = require("./problem-6");
const { decideConstructionPermit } = require("./problem-7");
const { decideMatchmaking } = require("./problem-8");
const { recommendShippingMethod } = require("./problem-9");

const processCrossDomainBatch = (batchRequests) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(batchRequests) || batchRequests.length === 0) return "Invalid Input";

    // --- STEP 2: PROCESS EACH REQUEST, ROUTING BY domain ---
    const domainTally = {};
    let totalSucceeded = 0;

    for (let i = 0; i < batchRequests.length; i++) {
        const req = batchRequests[i];
        const domain = req?.domain;
        let outcome;
        let succeeded = false;

        if (domain === "SCHOLARSHIP") {
            outcome = decideScholarshipAward(req.data);
            succeeded = outcome?.awarded === true;
        } else if (domain === "RENTAL") {
            outcome = decideRentalApplication(req.data, req.monthlyRent);
            succeeded = outcome?.approved === true;
        } else if (domain === "INSURANCE_CLAIM") {
            outcome = decideClaimSettlement(req.data);
            succeeded = outcome?.settled === true;
        } else if (domain === "VISA") {
            outcome = decideVisaApplication(req.data);
            succeeded = outcome?.approved === true;
        } else if (domain === "CONSTRUCTION_PERMIT") {
            outcome = decideConstructionPermit(req.data);
            succeeded = outcome?.approved === true;
        } else if (domain === "MATCHMAKING") {
            outcome = decideMatchmaking(req.players);
            succeeded = outcome?.matched === true;
        } else if (domain === "SHIPPING") {
            outcome = recommendShippingMethod(req.data);
            // SHIPPING is a recommendation engine rather than an approval system.
            // Any valid object result (except "Invalid Input") counts as a success.
            succeeded = outcome !== "Invalid Input" && outcome !== null && typeof outcome === "object";
        } else {
            // unrecognized domain -> always counts as failed
            outcome = "Invalid Input";
            succeeded = false;
        }

        // --- STEP 3: UPDATE THIS DOMAIN'S TALLY ---
        const tallyKey = domain ?? "UNKNOWN";
        if (!domainTally[tallyKey]) {
            domainTally[tallyKey] = { total: 0, succeeded: 0, failed: 0 };
        }
        domainTally[tallyKey].total += 1;
        if (succeeded) {
            domainTally[tallyKey].succeeded += 1;
            totalSucceeded += 1;
        } else {
            domainTally[tallyKey].failed += 1;
        }
    }

    // --- STEP 4: GRAND TOTALS ACROSS ALL DOMAINS ---
    const grandTotalRequests = batchRequests.length;
    const grandSuccessRate = Number(((totalSucceeded / grandTotalRequests) * 100).toFixed(2));

    // --- STEP 5: FIND THE DOMINANT (MOST FREQUENT) DOMAIN ---
    // Scan requests in their original order. If multiple domains have the same highest count, the one that appeared first is selected.
    let dominantDomain = null;
    let maxCount = -1;
    for (let i = 0; i < batchRequests.length; i++) {
        const domain = batchRequests[i]?.domain ?? "UNKNOWN";
        const count = domainTally[domain].total;
        if (count > maxCount) {
            maxCount = count;
            dominantDomain = domain;
        }
    }

    // --- STEP 6: RETURN FINAL RESULT ---
    return { domainTally, grandTotalRequests, grandSuccessRate, dominantDomain };
};

// --- EXAMPLE USAGE ---
console.log(processCrossDomainBatch([
    {
        domain: "MATCHMAKING", players: [
            { playerName: "A", skillRating: 1000, region: "EU", pingMs: 30 },
            { playerName: "B", skillRating: 1050, region: "EU", pingMs: 40 }
        ]
    },
    {
        domain: "MATCHMAKING", players: [
            { playerName: "C", skillRating: 1000, region: "EU", pingMs: 30 },
            { playerName: "D", skillRating: 1500, region: "EU", pingMs: 40 }
        ]
    },
    { domain: "SHIPPING", data: { weightKg: 60, destinationDistanceKm: 200, isFragile: false, customerWantsExpress: false } }
]));