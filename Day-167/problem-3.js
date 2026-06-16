// 🧩 PROBLEM–03: safeReadConfig()

// Logic: This function maps an array of dot-notation object paths into a flat resolution map. It safely traverses nested object references using iterative lookup methods and applies optional chaining and nullish fallbacks to prevent errors on missing object references.

const safeReadConfig = (config, keys) => {

    // --- STEP 1: VALIDATION ---
    // Enforce matching function parameter shapes before starting resolution loops.
    if (!config || typeof config !== 'object' || Array.isArray(config)) {
        return "Invalid Input";
    }

    if (!Array.isArray(keys) || keys.length === 0) {
        return "Invalid Input";
    }

    const outputReport = {};

    // --- STEP 2: LOGICAL PROCESSING LOOP ---
    for (let i = 0; i < keys.length; i++) {
        const pathString = keys[i];

        if (typeof pathString !== 'string' || pathString.trim() === "") {
            return "Invalid Input";
        }

        // Split target configuration path values along their structural dots
        const parts = pathString.split('.');
        let activeScope = config;

        // Traverse object levels sequentially using a reference index loop
        for (let j = 0; j < parts.length; j++) {
            const currentProperty = parts[j];
            // Access next level safely using optional chaining logic simulation
            activeScope = activeScope?.[currentProperty];
        }

        // --- STEP 3: NULLISH VALUE HANDLING ---
        // Save the resolved value, falling back to a uniform fallback flag if undefined or null
        outputReport[pathString] = activeScope ?? "NOT_CONFIGURED";
    }

    return outputReport;
};

// --- EXAMPLE USAGE ---
console.log(safeReadConfig(
    {
        server: { host: "localhost", port: 8080 },
        database: { host: "db.server.com" },
        cache: null
    },
    ["server.host", "server.port", "database.host", "database.password", "cache.ttl", "queue.url"]
));