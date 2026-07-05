// PROBLEM-01: registerTable()

// Logic: Registers a new table, but only if its tableId doesn't already exist. Status is always forced to "AVAILABLE".

const registerTable = (tables, newTable) => {

    // --- STEP 1: VALIDATION ---
    // 1a) tables must be an array
    if (!Array.isArray(tables)) return "Invalid Input";
    // 1b) newTable must be a plain object
    if (typeof newTable !== "object" || newTable === null || Array.isArray(newTable)) {
        return "Invalid Input";
    }
    // 1c) validate every existing table record
    for (let i = 0; i < tables.length; i++) {
        const t = tables[i];
        if (!t || typeof t !== "object") return "Invalid Input";
        if (typeof t.tableId !== "string") return "Invalid Input";
        if (typeof t.capacity !== "number" || !Number.isInteger(t.capacity) || t.capacity < 1) return "Invalid Input";
        if (!["INDOOR", "OUTDOOR"].includes(t.location)) return "Invalid Input";
    }
    // 1d) validate the new table's own fields
    const { tableId, capacity, location } = newTable;
    if (typeof tableId !== "string" || tableId === "") return "Invalid Input";
    if (typeof capacity !== "number" || !Number.isInteger(capacity) || capacity < 1 || capacity > 12) return "Invalid Input";
    if (!["INDOOR", "OUTDOOR"].includes(location)) return "Invalid Input";

    // --- STEP 2: CHECK FOR DUPLICATE TABLE ID ---
    const isDuplicate = tables.some(t => t.tableId === tableId);
    if (isDuplicate) {
        return { registered: false, reason: "Table ID already exists", tables };
    }

    // --- STEP 3: REGISTER THE TABLE (IMMUTABLY) ---
    const registeredTable = { tableId, capacity, location, status: "AVAILABLE" };
    const updatedTables = [...tables, registeredTable];

    // --- STEP 4: RETURN SUCCESS RESULT ---
    return { registered: true, tables: updatedTables, totalTables: updatedTables.length };
};

// --- EXAMPLE USAGE ---
console.log(registerTable(
    [],
    { tableId: "T1", capacity: 4, location: "INDOOR" }
));