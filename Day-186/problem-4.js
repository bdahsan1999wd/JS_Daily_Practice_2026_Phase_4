// PROBLEM-04: findBestTableMatch()

// Logic: Finds the SMALLEST available table that still fits the party — first restricted to the preferred location (if any), then falling back to searching ALL locations if nothing matched there.

const findBestTableMatch = (tables, partySize, preferredLocation) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(tables) || tables.length === 0) return "Invalid Input";
    if (typeof partySize !== "number" || isNaN(partySize) || partySize < 1) return "Invalid Input";
    if (preferredLocation !== null && !["INDOOR", "OUTDOOR"].includes(preferredLocation)) return "Invalid Input";
    for (let i = 0; i < tables.length; i++) {
        const t = tables[i];
        if (!t || typeof t !== "object") return "Invalid Input";
        if (typeof t.tableId !== "string") return "Invalid Input";
        if (typeof t.capacity !== "number") return "Invalid Input";
        if (typeof t.location !== "string") return "Invalid Input";
        if (typeof t.status !== "string") return "Invalid Input";
    }

    // --- STEP 2: BUILD THE BASE CANDIDATE POOL ---
    // only AVAILABLE tables that are big enough for the party qualify at all
    const baseCandidates = tables.filter(t => t.status === "AVAILABLE" && t.capacity >= partySize);

    // helper: pick the SMALLEST-capacity table from a list (first one wins ties)
    const pickSmallest = (candidates) => {
        if (candidates.length === 0) return null;
        let best = candidates[0];
        for (let i = 1; i < candidates.length; i++) {
            if (candidates[i].capacity < best.capacity) {
                best = candidates[i];
            }
            // strict "<" means an EARLIER table of equal capacity keeps its spot
        }
        return best;
    };

    // --- STEP 3: TRY THE PREFERRED LOCATION FIRST (IF ONE WAS GIVEN) ---
    if (preferredLocation !== null) {
        const preferredCandidates = baseCandidates.filter(t => t.location === preferredLocation);
        const preferredMatch = pickSmallest(preferredCandidates);
        if (preferredMatch) {
            return { found: true, table: preferredMatch };
        }
        // nothing matched in the preferred location -> fall through to STEP 4
    }

    // --- STEP 4: FALLBACK - SEARCH ACROSS ALL LOCATIONS ---
    const fallbackMatch = pickSmallest(baseCandidates);
    if (fallbackMatch) {
        return { found: true, table: fallbackMatch };
    }

    // --- STEP 5: NOTHING FITS AT ALL ---
    return { found: false, message: "No available table can accommodate this party size." };
};

// --- EXAMPLE USAGE ---
console.log(findBestTableMatch([
    { tableId: "T1", capacity: 6, location: "INDOOR", status: "AVAILABLE" },
    { tableId: "T2", capacity: 4, location: "OUTDOOR", status: "AVAILABLE" },
    { tableId: "T3", capacity: 2, location: "INDOOR", status: "AVAILABLE" }
], 2, "OUTDOOR"));