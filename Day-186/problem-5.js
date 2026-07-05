// PROBLEM-05: runRestaurantWorkflow()

// Logic: The capstone "orchestrator" — composes registerTable(), bookTable(), vacateTable(), AND findBestTableMatch() into ONE sequential pipeline. FIND_MATCH operations are read-only (never change table state) regardless of whether they succeed.

const runRestaurantWorkflow = (initialTables, operations) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(initialTables)) return "Invalid Input";
    if (!Array.isArray(operations)) return "Invalid Input";
    for (let i = 0; i < initialTables.length; i++) {
        const t = initialTables[i];
        if (!t || typeof t !== "object") return "Invalid Input";
        if (typeof t.tableId !== "string") return "Invalid Input";
        if (typeof t.capacity !== "number") return "Invalid Input";
        if (typeof t.location !== "string") return "Invalid Input";
        if (typeof t.status !== "string") return "Invalid Input";
    }
    for (let i = 0; i < operations.length; i++) {
        const op = operations[i];
        if (!op || typeof op !== "object") return "Invalid Input";
        if (!["REGISTER", "BOOK", "VACATE", "FIND_MATCH"].includes(op.type)) return "Invalid Input";
    }

    // helper: same smallest-capacity-wins-ties logic as Problem-04
    const pickSmallest = (candidates) => {
        if (candidates.length === 0) return null;
        let best = candidates[0];
        for (let i = 1; i < candidates.length; i++) {
            if (candidates[i].capacity < best.capacity) best = candidates[i];
        }
        return best;
    };

    // --- STEP 2: PROCESS OPERATIONS SEQUENTIALLY ---
    // `currentTables` is our running "state" — each operation reads from
    // it and (if it's a state-changing op) produces the next version
    let currentTables = initialTables;
    const operationLog = [];

    for (let i = 0; i < operations.length; i++) {
        const op = operations[i];

        if (op.type === "REGISTER") {
            // --- inline equivalent of registerTable() logic ---
            const newTable = op.table;
            const isDuplicate = currentTables.some(t => t.tableId === newTable?.tableId);

            if (isDuplicate) {
                operationLog.push({ type: "REGISTER", success: false, reason: "Table ID already exists" });
            } else {
                const registeredTable = { ...newTable, status: "AVAILABLE" };
                currentTables = [...currentTables, registeredTable];
                operationLog.push({ type: "REGISTER", success: true, reason: null });
            }

        } else if (op.type === "BOOK") {
            // --- inline equivalent of bookTable() logic ---
            const { tableId, partySize, customerName } = op.bookingRequest;
            const targetTable = currentTables.find(t => t.tableId === tableId);

            if (!targetTable) {
                operationLog.push({ type: "BOOK", success: false, reason: "Table not found" });
            } else if (targetTable.status !== "AVAILABLE") {
                operationLog.push({ type: "BOOK", success: false, reason: "Table is not available" });
            } else if (partySize > targetTable.capacity) {
                operationLog.push({ type: "BOOK", success: false, reason: "Party size exceeds table capacity" });
            } else {
                currentTables = currentTables.map(t =>
                    t.tableId === tableId
                        ? { ...t, status: "OCCUPIED", currentBooking: { customerName, partySize } }
                        : t
                );
                operationLog.push({ type: "BOOK", success: true, reason: null });
            }

        } else if (op.type === "VACATE") {
            // --- inline equivalent of vacateTable() logic ---
            const targetTable = currentTables.find(t => t.tableId === op.tableId);

            if (!targetTable) {
                operationLog.push({ type: "VACATE", success: false, reason: "Table not found" });
            } else if (targetTable.status === "AVAILABLE") {
                operationLog.push({ type: "VACATE", success: false, reason: "Table is already vacant" });
            } else {
                currentTables = currentTables.map(t => {
                    if (t.tableId !== op.tableId) return t;
                    const { currentBooking, ...rest } = t;
                    return { ...rest, status: "AVAILABLE" };
                });
                operationLog.push({ type: "VACATE", success: true, reason: null });
            }

        } else if (op.type === "FIND_MATCH") {
            // --- inline equivalent of findBestTableMatch() logic ---
            // IMPORTANT: read-only — currentTables is NEVER reassigned here,
            // whether a match is found or not.
            const baseCandidates = currentTables.filter(t => t.status === "AVAILABLE" && t.capacity >= op.partySize);

            let matchResult = null;
            if (op.preferredLocation !== null) {
                const preferredCandidates = baseCandidates.filter(t => t.location === op.preferredLocation);
                matchResult = pickSmallest(preferredCandidates);
            }
            if (!matchResult) {
                matchResult = pickSmallest(baseCandidates); // fallback across all locations
            }

            if (matchResult) {
                operationLog.push({ type: "FIND_MATCH", success: true, reason: null });
            } else {
                operationLog.push({ type: "FIND_MATCH", success: false, reason: "No available table can accommodate this party size." });
            }
        }
    }

    // --- STEP 3: COMPUTE FINAL OCCUPANCY RATE ---
    const totalTables = currentTables.length;
    const occupiedTables = currentTables.filter(t => t.status === "OCCUPIED").length;
    const occupancyRate = Number(((occupiedTables / totalTables) * 100).toFixed(2));

    // --- STEP 4: RETURN FINAL RESULT ---
    return { finalTables: currentTables, operationLog, occupancyRate };
};

// --- EXAMPLE USAGE ---
console.log(runRestaurantWorkflow(
    [{ tableId: "T1", capacity: 4, location: "INDOOR", status: "AVAILABLE" }],
    [
        { type: "REGISTER", table: { tableId: "T2", capacity: 2, location: "OUTDOOR" } },
        { type: "BOOK", bookingRequest: { tableId: "T1", partySize: 3, customerName: "Arman" } },
        { type: "FIND_MATCH", partySize: 2, preferredLocation: null },
        { type: "VACATE", tableId: "T2" }
    ]
));