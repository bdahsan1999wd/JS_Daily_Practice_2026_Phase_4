// 🧩 PROBLEM–03: formatTableRows()

// Logic: This function transforms flat array metadata matrices into readable string tables. It generates header frames, isolates missing property variables, applies fallback tokens, and separates cell metrics uniformly with inline separator symbols.

const formatTableRows = (columns, rows) => {

    // --- STEP 1: INITIAL STRUCTURAL CHECKS ---
    if (!Array.isArray(columns) || columns.length === 0) {
        return "Invalid Input";
    }
    if (!Array.isArray(rows)) {
        return "Invalid Input";
    }

    // Verify types for all targeted header column names
    for (let i = 0; i < columns.length; i++) {
        if (typeof columns[i] !== "string" || columns[i].trim() === "") {
            return "Invalid Input";
        }
    }

    const tabularResponseReport = [];

    // --- STEP 2: EMIT HEADER FRAME LAYOUT ---
    const primaryHeaderRow = columns.join(" | ");
    tabularResponseReport.push(primaryHeaderRow);

    // --- STEP 3: PROCESS RECORDS MATRIX ---
    for (let i = 0; i < rows.length; i++) {
        const currentDataRow = rows[i];

        if (!currentDataRow || typeof currentDataRow !== "object" || Array.isArray(currentDataRow)) {
            return "Invalid Input";
        }

        const compiledRowCells = [];

        // Map internal cell fields precisely along matching header layout keys
        for (let j = 0; j < columns.length; j++) {
            const currentColumnKey = columns[j];

            // Apply nullish checks to catch missing data entries safely
            const cellValue = currentDataRow[currentColumnKey] ?? "—";
            compiledRowCells.push(String(cellValue));
        }

        // Assemble cells into standard pipe-delimited text layouts
        tabularResponseReport.push(compiledRowCells.join(" | "));
    }

    return tabularResponseReport;
};

// --- EXAMPLE USAGE ---
console.log(formatTableRows(
    ["Product", "Price", "Stock"],
    [
        { Product: "Laptop", Price: 75000, Stock: 12 },
        { Product: "Mouse", Price: 850 },
        { Product: "Keyboard" }
    ]
));