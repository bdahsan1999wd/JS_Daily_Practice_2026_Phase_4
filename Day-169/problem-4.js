// 🧩 PROBLEM–04: transformResponses()

// Logic: Maps an update filter criteria over an input array to patch properties. It prefixes label descriptors and compiles detailed payload configurations cleanly.

const transformResponses = (responses, transformRules) => {

    // --- STEP 1: SCHEMA STRUCTURE ASSURANCES ---
    if (!Array.isArray(responses) || responses.length === 0) {
        return "Invalid Input";
    }
    if (!transformRules || typeof transformRules !== "object" || Array.isArray(transformRules)) {
        return "Invalid Input";
    }

    // Unpack modification rule flags
    const { addTimestamp, addSuccessFlag, labelPrefix } = transformRules;
    if (
        (transformRules.hasOwnProperty("addTimestamp") && typeof addTimestamp !== "boolean") ||
        (transformRules.hasOwnProperty("addSuccessFlag") && typeof addSuccessFlag !== "boolean") ||
        (transformRules.hasOwnProperty("labelPrefix") && labelPrefix !== null && typeof labelPrefix !== "string")
    ) {
        return "Invalid Input";
    }

    const modifiedPayloadArray = [];

    // --- STEP 2: COLLECTION TRANSFORMATION MAP LOOP ---
    for (let i = 0; i < responses.length; i++) {
        const entry = responses[i];

        if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
            return "Invalid Input";
        }

        // Apply path lookup fallbacks inside dataset loops
        const id = entry.id ?? "unknown";
        const statusCode = entry.statusCode ?? 200;
        const value = entry.data?.value ?? null;
        let label = entry.data?.label ?? "Unlabeled";

        // Validate basic parameter types inside original responses
        if (typeof id !== "string" || typeof statusCode !== "number" || typeof label !== "string") {
            return "Invalid Input";
        }

        // --- STEP 3: APPLY TRANSFORMATIONS ---
        if (typeof labelPrefix === "string") {
            label = `${labelPrefix}: ${label}`;
        }

        const formattedEntry = `[${id}] ${label} → ${value}`;

        // Construct standard localized payload blueprint
        const convertedRecord = {
            id,
            statusCode,
            value,
            label,
            formattedEntry
        };

        // Inject dynamic properties if required by configurations
        if (addSuccessFlag === true) {
            convertedRecord.success = statusCode >= 200 && statusCode < 300;
        }
        if (addTimestamp === true) {
            convertedRecord.timestamp = "2025-01-01";
        }

        modifiedPayloadArray.push(convertedRecord);
    }

    return modifiedPayloadArray;
};

// --- EXAMPLE USAGE ---
console.log(transformResponses(
    [
        { id: "R1", statusCode: 200, data: { value: 9500, label: "Revenue" } },
        { id: "R2", statusCode: 404, data: { value: null } }
    ],
    { addTimestamp: true, addSuccessFlag: true, labelPrefix: "💰" }
));