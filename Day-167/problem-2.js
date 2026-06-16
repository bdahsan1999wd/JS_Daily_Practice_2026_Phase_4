// 🧩 PROBLEM–02: overrideConfig()

// Logic: This function uses a rest parameter to gather multiple override layers. It iteratively scales those adjustments over an initial application object using spread merging, validates parameters to prevent negative values, and rebuilds metadata flags.

const overrideConfig = (currentConfig, ...overrides) => {

    // --- STEP 1: VALIDATION ---
    // Ensure core configuration reference exists and rest array contains modification elements.
    if (!currentConfig || typeof currentConfig !== 'object' || Array.isArray(currentConfig)) {
        return "Invalid Input";
    }

    if (!overrides || overrides.length === 0) {
        return "Invalid Input";
    }

    // Validate baseline structure schema definitions
    if (
        typeof currentConfig.appName !== 'string' || currentConfig.appName.trim() === "" ||
        typeof currentConfig.env !== 'string' || currentConfig.env.trim() === "" ||
        typeof currentConfig.version !== 'string' || currentConfig.version.trim() === "" ||
        typeof currentConfig.timeout !== 'number' || isNaN(currentConfig.timeout) || currentConfig.timeout <= 0 ||
        typeof currentConfig.maxRetries !== 'number' || !Number.isInteger(currentConfig.maxRetries) || currentConfig.maxRetries < 1 || currentConfig.maxRetries > 10
    ) {
        return "Invalid Input";
    }

    // --- STEP 2: LOGICAL MERGE ---
    // Accumulate structural properties sequentially across the provided rest argument parameters
    let finalConfig = { ...currentConfig };

    for (let i = 0; i < overrides.length; i++) {
        const patch = overrides[i];

        if (!patch || typeof patch !== 'object' || Array.isArray(patch)) {
            return "Invalid Input";
        }

        // Validate override data types if values are supplied
        if (patch.hasOwnProperty('timeout') && (typeof patch.timeout !== 'number' || isNaN(patch.timeout) || patch.timeout <= 0)) {
            return "Invalid Input";
        }
        if (patch.hasOwnProperty('maxRetries') && (typeof patch.maxRetries !== 'number' || !Number.isInteger(patch.maxRetries) || patch.maxRetries < 1 || patch.maxRetries > 10)) {
            return "Invalid Input";
        }

        finalConfig = { ...finalConfig, ...patch };
    }

    // --- STEP 3: COMPUTED FIELDS ---
    // Recompute runtime template string structures based on final values
    finalConfig.configId = `${finalConfig.appName}-${finalConfig.env}-v${finalConfig.version}`;
    finalConfig.isProduction = finalConfig.env === "production";
    finalConfig.overrideCount = overrides.length;
    finalConfig.lastModified = "2025-01-01";

    return finalConfig;
};

// --- EXAMPLE USAGE ---
console.log(overrideConfig(
    { appName: "PayApp", env: "staging", version: "1.0.0", timeout: 5000, maxRetries: 3 },
    { env: "production", timeout: 10000 },
    { version: "1.2.0", maxRetries: 5 }
));