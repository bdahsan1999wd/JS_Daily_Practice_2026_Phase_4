// 🧩 PROBLEM–05: formatForExport()

// Logic: Translates structured application collections into clean external target formats (CSV, JSON, or Markdown). It picks requested variables via map layouts, replaces missing properties with standard tokens via nullish operations, and formats the table outputs with literal carriage break structures.

const formatForExport = (records, exportConfig) => {

    // --- STEP 1: VALIDATE BASELINE CONTRACT SCHEMAS ---
    if (!Array.isArray(records) || records.length === 0) {
        return "Invalid Input";
    }
    if (!exportConfig || typeof exportConfig !== "object" || Array.isArray(exportConfig)) {
        return "Invalid Input";
    }

    const { format, fields, title: explicitTitle } = exportConfig;
    const permittedExportTargets = ["CSV", "JSON", "MARKDOWN"];

    if (typeof format !== "string" || !permittedExportTargets.includes(format)) {
        return "Invalid Input";
    }
    if (!Array.isArray(fields) || fields.length === 0) {
        return "Invalid Input";
    }

    // Standardize names or assign default labels using nullish coalescing
    const resolvedExportTitle = explicitTitle ?? "Export";
    if (typeof resolvedExportTitle !== "string") {
        return "Invalid Input";
    }

    // Ensure all requested fields match text property requirements
    for (let i = 0; i < fields.length; i++) {
        if (typeof fields[i] !== "string" || fields[i].trim() === "") {
            return "Invalid Input";
        }
    }

    // --- STEP 2: CLEAN DATA COLLECTION PARSING ---
    // Extract target values using deep property mapping lookups
    const pristineDataPayload = records.map(record => {
        if (!record || typeof record !== "object" || Array.isArray(record)) {
            return null;
        }

        const filteredItemNode = {};
        for (let j = 0; j < fields.length; j++) {
            const fieldKeyName = fields[j];

            // Apply modern safe optional path defaults
            filteredItemNode[fieldKeyName] = record[fieldKeyName] ?? "N/A";
        }
        return filteredItemNode;
    });

    // Terminate operations immediately if any base dataset record is invalid
    if (pristineDataPayload.includes(null)) {
        return "Invalid Input";
    }

    let exportedDataResultValue = "";

    // --- STEP 3: PARSE PAYLOAD INTO TARGET ENCODING SCHEMES ---
    if (format === "CSV") {
        const fileLinesBuffer = [];
        fileLinesBuffer.push(fields.join(","));

        pristineDataPayload.forEach(row => {
            const rowValueList = fields.map(key => String(row[key]));
            fileLinesBuffer.push(rowValueList.join(","));
        });

        exportedDataResultValue = fileLinesBuffer.join("\n");

    } else if (format === "JSON") {
        exportedDataResultValue = pristineDataPayload;

    } else if (format === "MARKDOWN") {
        const fileLinesBuffer = [];

        // Build the headers line segment
        fileLinesBuffer.push(`| ${fields.join(" | ")} |`);

        // Build the separation line block markers
        const syntaxDivisions = fields.map(() => "---");
        fileLinesBuffer.push(`| ${syntaxDivisions.join(" | ")} |`);

        // Build the actual table values content
        pristineDataPayload.forEach(row => {
            const rowValueList = fields.map(key => String(row[key]));
            fileLinesBuffer.push(`| ${rowValueList.join(" | ")} |`);
        });

        exportedDataResultValue = fileLinesBuffer.join("\n");
    }

    // --- STEP 4: PACK RESULT EXPORT PACKAGES ---
    return {
        format,
        title: resolvedExportTitle,
        recordCount: records.length,
        exportedData: exportedDataResultValue
    };
};

// --- EXAMPLE USAGE ---
console.log(formatForExport([
    { name: "Arif", dept: "IT", salary: 60000 },
    { name: "Bela", salary: 45000 },
    { name: "Cyrus", dept: "HR" }
], { format: "CSV", fields: ["name", "dept", "salary"], title: "Staff Report" }));