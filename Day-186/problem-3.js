// PROBLEM-03: vacateTable()

// Logic: Frees up a table back to AVAILABLE, and the currentBooking field must be COMPLETELY removed (key doesn't exist anymore, not just set to null/undefined).

const vacateTable = (tables, tableId) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(tables)) return "Invalid Input";
    if (typeof tableId !== "string" || tableId === "") return "Invalid Input";
    for (let i = 0; i < tables.length; i++) {
        const t = tables[i];
        if (!t || typeof t !== "object") return "Invalid Input";
        if (typeof t.tableId !== "string") return "Invalid Input";
        if (typeof t.status !== "string") return "Invalid Input";
    }

    // --- STEP 2: LOCATE THE TARGET TABLE ---
    const targetTable = tables.find(t => t.tableId === tableId);
    if (!targetTable) {
        return { vacated: false, reason: "Table not found", tables };
    }

    // --- STEP 3: REJECTION CHECK (already vacant) ---
    if (targetTable.status === "AVAILABLE") {
        return { vacated: false, reason: "Table is already vacant", tables };
    }

    // --- STEP 4: VACATE & FULLY DROP currentBooking (IMMUTABLY) ---
    // destructure currentBooking OUT, keep the rest — rest never had
    // currentBooking in it, so the resulting object simply has no such key
    const updatedTables = tables.map(t => {
        if (t.tableId !== tableId) return t;
        const { currentBooking, ...rest } = t;
        return { ...rest, status: "AVAILABLE" };
    });

    // --- STEP 5: RETURN SUCCESS RESULT ---
    return { vacated: true, tables: updatedTables };
};

// --- EXAMPLE USAGE ---
console.log(vacateTable(
    [{ tableId: "T1", capacity: 4, location: "INDOOR", status: "OCCUPIED", currentBooking: { customerName: "Rumana", partySize: 3 } }],
    "T1"
));