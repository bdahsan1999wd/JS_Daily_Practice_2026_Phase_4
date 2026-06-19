// 🧩 PROBLEM–03: groupAndLabelRecords()

// Logic: Groups raw arrays into object keys dynamically based on a target property key identifier. It replaces string placeholders without standard regex by splitting data fragments, then groups records into an organized output report containing accurate data item clusters.

const groupAndLabelRecords = (records, groupByKey, labelTemplate) => {

    // --- STEP 1: SCHEMA BOUNDARY AND RANGE CHECKS ---
    if (!Array.isArray(records) || records.length === 0) {
        return "Invalid Input";
    }
    if (typeof groupByKey !== "string" || groupByKey.trim() === "") {
        return "Invalid Input";
    }
    if (typeof labelTemplate !== "string" || labelTemplate.trim() === "") {
        return "Invalid Input";
    }

    // --- STEP 2: ACCUMULATE AND CLUSTER RECORDS MATRIX ---
    const groupingDictionaryMap = {};

    for (let i = 0; i < records.length; i++) {
        const item = records[i];

        if (!item || typeof item !== "object" || Array.isArray(item) || !item.hasOwnProperty(groupByKey)) {
            return "Invalid Input";
        }

        const explicitCategoryKeyValue = String(item[groupByKey]);

        // Initialize target partition blocks if missing from the accumulator array map
        if (!groupingDictionaryMap.hasOwnProperty(explicitCategoryKeyValue)) {
            groupingDictionaryMap[explicitCategoryKeyValue] = [];
        }

        groupingDictionaryMap[explicitCategoryKeyValue].push(item);
    }

    // --- STEP 3: REFORMAT DICTIONARY STRUCTURAL LABELS ---
    const finalReportCollectionObj = {};
    const processedClusterKeys = Object.keys(groupingDictionaryMap);

    for (let k = 0; k < processedClusterKeys.length; k++) {
        const activeGroupKey = processedClusterKeys[k];
        const clusteredItemsList = groupingDictionaryMap[activeGroupKey];
        const elementCount = clusteredItemsList.length;

        // Reconstruct text structures manually by joining token positions securely
        let formattedLabelString = labelTemplate.split("{{count}}").join(String(elementCount));
        formattedLabelString = formattedLabelString.split("{{key}}").join(activeGroupKey);

        finalReportCollectionObj[activeGroupKey] = {
            label: formattedLabelString,
            count: elementCount,
            records: clusteredItemsList
        };
    }

    return finalReportCollectionObj;
};

// --- EXAMPLE USAGE ---
console.log(groupAndLabelRecords([
    { name: "Alam", dept: "IT" },
    { name: "Bina", dept: "HR" },
    { name: "Cyrus", dept: "IT" },
    { name: "Dina", dept: "HR" }
], "dept", "{{count}} employee(s) in {{key}}"));