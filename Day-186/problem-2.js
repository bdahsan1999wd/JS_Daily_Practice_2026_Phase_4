// PROBLEM-02: bookTable()

// Logic: Books a table for a party, but only if 3 checks pass IN ORDER: table exists, table is available, party fits capacity.

const bookTable = (tables, bookingRequest) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(tables)) return "Invalid Input";
    if (typeof bookingRequest !== "object" || bookingRequest === null || Array.isArray(bookingRequest)) {
        return "Invalid Input";
    }
    for (let i = 0; i < tables.length; i++) {
        const t = tables[i];
        if (!t || typeof t !== "object") return "Invalid Input";
        if (typeof t.tableId !== "string") return "Invalid Input";
        if (typeof t.capacity !== "number") return "Invalid Input";
        if (typeof t.status !== "string") return "Invalid Input";
    }
    const { tableId, partySize, customerName } = bookingRequest;
    if (typeof tableId !== "string" || tableId === "") return "Invalid Input";
    if (typeof partySize !== "number" || !Number.isInteger(partySize) || partySize < 1) return "Invalid Input";
    if (typeof customerName !== "string" || customerName === "") return "Invalid Input";

    // --- STEP 2: CHECK #1 - TABLE MUST EXIST ---
    const targetTable = tables.find(t => t.tableId === tableId);
    if (!targetTable) {
        return { booked: false, reason: "Table not found", tables };
    }

    // --- STEP 3: CHECK #2 - TABLE MUST BE AVAILABLE ---
    if (targetTable.status !== "AVAILABLE") {
        return { booked: false, reason: "Table is not available", tables };
    }

    // --- STEP 4: CHECK #3 - PARTY SIZE MUST FIT WITHIN CAPACITY ---
    if (partySize > targetTable.capacity) {
        return { booked: false, reason: "Party size exceeds table capacity", tables };
    }

    // --- STEP 5: ALL CHECKS PASSED - APPLY THE BOOKING (IMMUTABLY) ---
    const updatedTables = tables.map(t =>
        t.tableId === tableId
            ? { ...t, status: "OCCUPIED", currentBooking: { customerName, partySize } }
            : t
    );

    // --- STEP 6: RETURN SUCCESS RESULT ---
    return { booked: true, tables: updatedTables };
};

// --- EXAMPLE USAGE ---
console.log(bookTable(
    [{ tableId: "T1", capacity: 4, location: "INDOOR", status: "AVAILABLE" }],
    { tableId: "T1", partySize: 3, customerName: "Rumana" }
));