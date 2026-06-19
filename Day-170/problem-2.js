// 🧩 PROBLEM–02: fillTemplate()

// Logic: This function maps variable objects to template interpolation targets. Instead of regex tools, it utilizes nested array manipulation patterns (.split() and .join()) combined with safe nullish structures to replace layout properties cleanly.

const fillTemplate = (template, variables) => {

    // --- STEP 1: SCHEMA STRUCTURE ASSURANCES ---
    if (typeof template !== "string" || template === "") {
        return "Invalid Input";
    }
    if (!variables || typeof variables !== "object" || Array.isArray(variables)) {
        return "Invalid Input";
    }

    let dynamicOutputText = template;

    // --- STEP 2: COLLECT ALL CANDIDATE REPLACEMENT MARKS ---
    const markers = [];
    let processingString = template;

    // Locate matching instances of double opening and closing curly braces manually
    while (processingString.includes("{{") && processingString.includes("}}")) {
        const startMarkerIndex = processingString.indexOf("{{");
        const endMarkerIndex = processingString.indexOf("}}");

        if (endMarkerIndex < startMarkerIndex) {
            // Protect against corrupted or out-of-order tag alignments
            break;
        }

        // Extract raw parameter key (e.g., "{{name}}" => "name")
        const parameterKey = processingString.substring(startMarkerIndex + 2, endMarkerIndex);

        if (!markers.includes(parameterKey)) {
            markers.push(parameterKey);
        }

        // Clip string to progress structural analysis past handled segments
        processingString = processingString.substring(endMarkerIndex + 2);
    }

    // --- STEP 3: SPLIT AND JOIN RESOLUTION LOOPS ---
    for (let i = 0; i < markers.length; i++) {
        const currentKey = markers[i];
        const searchPlaceholder = `{{${currentKey}}}`;

        // Unpack user records safely, falling back to a uniform tag string if missing
        const structuralValue = variables[currentKey] ?? "N/A";
        const replacementValueString = String(structuralValue);

        // Perform multi-instance replacement using split-segment and joining chains
        dynamicOutputText = dynamicOutputText.split(searchPlaceholder).join(replacementValueString);
    }

    return dynamicOutputText;
};

// --- EXAMPLE USAGE ---
console.log(fillTemplate(
    "Dear {{name}}, your invoice #{{invoiceId}} of ৳{{amount}} is {{status}}.",
    { name: "Tamim", invoiceId: "INV-441", amount: 7500 }
));