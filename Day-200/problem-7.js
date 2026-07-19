// PROBLEM-07: decideConstructionPermit()

// Logic: 2 hard gates, then a zone-specific floor limit different zones allow different maximum building heights.

const decideConstructionPermit = (application) => {

    // --- STEP 1: VALIDATION ---
    if (typeof application !== "object" || application === null || Array.isArray(application)) return "Invalid Input";
    const { plotAreaSqFt, proposedFloors, setbackCompliant, environmentalClearance, zoneType } = application;
    if (typeof plotAreaSqFt !== "number" || plotAreaSqFt <= 0) return "Invalid Input";
    if (typeof proposedFloors !== "number" || !Number.isInteger(proposedFloors) || proposedFloors < 1) return "Invalid Input";
    if (typeof setbackCompliant !== "boolean") return "Invalid Input";
    if (typeof environmentalClearance !== "boolean") return "Invalid Input";
    if (!["RESIDENTIAL", "COMMERCIAL", "INDUSTRIAL"].includes(zoneType)) return "Invalid Input";

    // --- STEP 2: GATE CHECKS - STOP AT FIRST FAILURE ---
    if (setbackCompliant !== true) {
        return { approved: false, reason: "Setback requirements not met" };
    }
    if (environmentalClearance !== true) {
        return { approved: false, reason: "Environmental clearance required" };
    }

    // --- STEP 3: ZONE-SPECIFIC FLOOR LIMIT CHECK ---
    const maxFloorsByZone = { RESIDENTIAL: 4, COMMERCIAL: 10, INDUSTRIAL: 6 };
    const maxFloorsForZone = maxFloorsByZone[zoneType];
    if (proposedFloors > maxFloorsForZone) {
        return { approved: false, reason: "Proposed floors exceed zone limit" };
    }

    // --- STEP 4: APPROVED - COMPUTE PERMIT FEE ---
    const permitFee = Number((plotAreaSqFt * 5 * proposedFloors).toFixed(2));

    // --- STEP 5: RETURN RESULT ---
    return { approved: true, permitFee };
};

// --- EXAMPLE USAGE ---
console.log(decideConstructionPermit({
    plotAreaSqFt: 2000,
    proposedFloors: 3,
    setbackCompliant: true,
    environmentalClearance: true,
    zoneType: "RESIDENTIAL"
}));