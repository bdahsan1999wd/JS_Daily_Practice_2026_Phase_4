// 🧩 PROBLEM–01: normalizeDataFields()

// Logic: Maps an array of records to normalize variable property naming rules. It matches key indexes against a dictionary template map, retains unmapped key/value pairs immutably, and ensures any explicitly requested missing parameters resolve safely to a null baseline.

const normalizeDataFields = (records, fieldMap) => {

    // --- STEP 1: PARAMETER VALIDATION ---
    if (!Array.isArray(records) || records.length === 0) {
        return "Invalid Input";
    }
    if (!fieldMap || typeof fieldMap !== "object" || Array.isArray(fieldMap) || Object.keys(fieldMap).length === 0) {
        return "Invalid Input";
    }

    // --- STEP 2: ARRAY NORMALIZATION PROCESSING ---
    // Apply modern map operations built completely using pure arrow function logic
    return records.map(record => {
        if (!record || typeof record !== "object" || Array.isArray(record)) {
            // Force code pipeline out to fallbacks if array holds invalid item schemas
            return "Invalid Input";
        }

        const normalizedObject = {};

        // Track and migrate target properties defined under the field mapping blueprint
        const mappedOldKeys = Object.keys(fieldMap);
        for (let i = 0; i < mappedOldKeys.length; i++) {
            const oldKey = mappedOldKeys[i];
            const newKey = fieldMap[oldKey];

            // Extract using nullish coalescing to secure explicit parameter mappings
            normalizedObject[newKey] = record[oldKey] ?? null;
        }

        // Keep all original attributes that were not explicitly listed for transformation
        const originalKeys = Object.keys(record);
        for (let j = 0; j < originalKeys.length; j++) {
            const sourceKey = originalKeys[j];

            if (!fieldMap.hasOwnProperty(sourceKey)) {
                normalizedObject[sourceKey] = record[sourceKey] ?? null;
            }
        }

        return normalizedObject;
    });
};

// --- EXAMPLE USAGE ---
console.log(normalizeDataFields([
    { fname: "Rafi", lname: "Islam", age: 25 },
    { fname: "Mou", age: 30 }
], { fname: "firstName", lname: "lastName" }));