// 🧩 PROBLEM–04: detectConfigDiff()

// Logic: This function runs flat comparison analysis between object parameters. It uses Object.keys() to find differences, records modifications, and compiles summary reports using template literal formatting strings.

const detectConfigDiff = (oldConfig, newConfig) => {

    // --- STEP 1: VALIDATION ---
    if (!oldConfig || typeof oldConfig !== 'object' || Array.isArray(oldConfig)) {
        return "Invalid Input";
    }
    if (!newConfig || typeof newConfig !== 'object' || Array.isArray(newConfig)) {
        return "Invalid Input";
    }

    const oldKeys = Object.keys(oldConfig);
    const totalKeys = oldKeys.length;

    const unchanged = [];
    const changed = [];

    // --- STEP 2: DIFFERENCE EXTRACTION ---
    for (let i = 0; i < totalKeys; i++) {
        const targetKey = oldKeys[i];

        const oldVal = oldConfig[targetKey];
        const newVal = newConfig[targetKey];

        // Group changes by evaluating direct match equality values
        if (oldVal === newVal) {
            unchanged.push(targetKey);
        } else {
            changed.push({
                key: targetKey,
                oldValue: oldVal,
                newValue: newVal
            });
        }
    }

    // --- STEP 3: TEMPLATE SUMMARY ---
    const summaryText = `${changed.length} change(s) detected out of ${totalKeys} config key(s).`;

    return {
        unchanged,
        changed,
        summary: summaryText
    };
};

// --- EXAMPLE USAGE ---
console.log(detectConfigDiff(
    { env: "staging", timeout: 5000, darkMode: false, version: "1.0.0" },
    { env: "production", timeout: 5000, darkMode: true, version: "1.0.0" }
));