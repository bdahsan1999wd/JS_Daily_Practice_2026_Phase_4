// 🧩 PROBLEM–04: compareSettingsSnapshots()

// Logic: Performs exact property-to-property delta tracking between snapshot elements. It utilizes optional structural paths combined with nullish operators to isolate value modifications.

const compareSettingsSnapshots = (snapshots) => {

    // --- STEP 1: VALIDATION ---
    // Ensure input constraints are precisely met.
    if (!Array.isArray(snapshots) || snapshots.length !== 2) {
        return "Invalid Input";
    }

    const snap1 = snapshots[0];
    const snap2 = snapshots[1];

    if (
        !snap1 || typeof snap1 !== "object" || Array.isArray(snap1) ||
        !snap2 || typeof snap2 !== "object" || Array.isArray(snap2)
    ) {
        return "Invalid Input";
    }

    // --- STEP 2: EXTRACT PROPERTY METRICS WITH FALLBACKS ---
    // Flatten settings records using arrow maps to cleanly unpack optional paths.
    const extractCleanSettings = (snap) => ({
        theme: snap.settings?.theme ?? "default",
        language: snap.settings?.language ?? "English",
        fontSize: snap.settings?.fontSize ?? 14,
        notifications: snap.settings?.notifications ?? true
    });

    const set1 = extractCleanSettings(snap1);
    const set2 = extractCleanSettings(snap2);

    // Validate type correctness of newly resolved configuration sets
    if (
        typeof set1.theme !== "string" || typeof set2.theme !== "string" ||
        typeof set1.language !== "string" || typeof set2.language !== "string" ||
        typeof set1.fontSize !== "number" || isNaN(set1.fontSize) ||
        typeof set2.fontSize !== "number" || isNaN(set2.fontSize) ||
        typeof set1.notifications !== "boolean" || typeof set2.notifications !== "boolean"
    ) {
        return "Invalid Input";
    }

    // --- STEP 3: RUN FIELD COMPARISON ---
    const matchingFields = [];
    const differingFields = [];
    const propertiesToCompare = ["theme", "language", "fontSize", "notifications"];

    for (let i = 0; i < propertiesToCompare.length; i++) {
        const key = propertiesToCompare[i];

        if (set1[key] === set2[key]) {
            matchingFields.push(key);
        } else {
            differingFields.push({
                field: key,
                snapshot1Value: set1[key],
                snapshot2Value: set2[key]
            });
        }
    }

    // --- STEP 4: GENERATE RESULTS OVERVIEW ---
    const isSameSettings = differingFields.length === 0;
    const comparisonSummary = `Snapshot ${snap1.snapshotId ?? "UNKNOWN"} vs ${snap2.snapshotId ?? "UNKNOWN"}: ${differingFields.length} difference(s) found.`;

    return {
        matchingFields,
        differingFields,
        isSameSettings,
        comparisonSummary
    };
};

// --- EXAMPLE USAGE ---
console.log(compareSettingsSnapshots([
    { snapshotId: "S1", savedAt: "2025-01-01", settings: { theme: "dark", language: "English", fontSize: 16, notifications: true } },
    { snapshotId: "S2", savedAt: "2025-01-15", settings: { theme: "dark", language: "Bangla", notifications: false } }
]));