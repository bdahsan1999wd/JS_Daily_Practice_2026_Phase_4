// 🧩 PROBLEM–05: generateEnvConfigs()

// Logic: This function maps over an array of target environment keys using standard arrays. It leverages spread operators and nullish checks to build configured environment records based on base templates, while tracking unique values to catch duplicates.

const generateEnvConfigs = (baseConfig, environments, envOverrides) => {

    // --- STEP 1: VALIDATION ---
    if (!baseConfig || typeof baseConfig !== 'object' || Array.isArray(baseConfig)) {
        return "Invalid Input";
    }
    if (!Array.isArray(environments) || environments.length === 0) {
        return "Invalid Input";
    }
    if (!envOverrides || typeof envOverrides !== 'object' || Array.isArray(envOverrides)) {
        return "Invalid Input";
    }

    // Validate the properties on our baseline template reference configuration
    if (
        typeof baseConfig.appName !== 'string' || baseConfig.appName.trim() === "" ||
        typeof baseConfig.version !== 'string' || baseConfig.version.trim() === "" ||
        typeof baseConfig.timeout !== 'number' || isNaN(baseConfig.timeout) || baseConfig.timeout <= 0 ||
        typeof baseConfig.maxRetries !== 'number' || !Number.isInteger(baseConfig.maxRetries) || baseConfig.maxRetries < 1 || baseConfig.maxRetries > 10
    ) {
        return "Invalid Input";
    }

    const permittedTargets = ["development", "staging", "production"];
    const verifiedTracker = [];
    const generatedManifest = {};

    // --- STEP 2: LOOP LOGICAL MAP ANALYSIS ---
    for (let i = 0; i < environments.length; i++) {
        const environmentName = environments[i];

        // Reject invalid labels or duplicate environments
        if (typeof environmentName !== 'string' || !permittedTargets.includes(environmentName)) {
            return "Invalid Input";
        }
        if (verifiedTracker.includes(environmentName)) {
            return "Invalid Input";
        }

        verifiedTracker.push(environmentName);

        // Fetch overrides for this environment, falling back to an empty object if none exist
        const localizedOverrides = envOverrides[environmentName] ?? {};
        if (typeof localizedOverrides !== 'object' || Array.isArray(localizedOverrides)) {
            return "Invalid Input";
        }

        // --- STEP 3: IMMUTABLE STRUCTURAL SPREAD ---
        // Combine options, inject specific environment flags, and compile unique config IDs
        const synthesizedConfig = {
            ...baseConfig,
            env: environmentName,
            ...localizedOverrides,
            configId: `${baseConfig.appName}-${environmentName}-v${baseConfig.version}`,
            isProduction: environmentName === "production"
        };

        generatedManifest[environmentName] = synthesizedConfig;
    }

    return generatedManifest;
};

// --- EXAMPLE USAGE ---
console.log(generateEnvConfigs(
    { appName: "RideApp", version: "3.0.0", timeout: 5000, maxRetries: 3 },
    ["development", "production"],
    { production: { timeout: 15000, maxRetries: 5 } }
));