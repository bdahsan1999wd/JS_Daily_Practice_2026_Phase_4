// 🧩 PROBLEM–01: buildAppConfig()

// Logic: This function maps and rolls together distinct layers of application options using the spread operator. It securely evaluates partial configuration records by using nullish coalescing (??) fallbacks to build production identifiers and boolean status structures.

const buildAppConfig = (baseConfig, envConfig, featureFlags) => {

    // --- STEP 1: VALIDATION ---
    // Ensure all target parameters arrive as valid non-null object wrappers.
    if (
        !baseConfig || typeof baseConfig !== 'object' || Array.isArray(baseConfig) ||
        !envConfig || typeof envConfig !== 'object' || Array.isArray(envConfig) ||
        !featureFlags || typeof featureFlags !== 'object' || Array.isArray(featureFlags)
    ) {
        return "Invalid Input";
    }

    // Deconstruct and validate baseConfig requirements
    const { appName, version, maxRetries } = baseConfig;
    if (
        typeof appName !== 'string' || appName.trim() === "" ||
        typeof version !== 'string' || version.trim() === "" ||
        typeof maxRetries !== 'number' || !Number.isInteger(maxRetries) || maxRetries < 1 || maxRetries > 10
    ) {
        return "Invalid Input";
    }

    // Resolve envConfig properties using optional chaining and nullish fallbacks
    const apiUrl = envConfig?.apiUrl ?? "http://localhost:3000";
    const timeout = envConfig?.timeout ?? 5000;
    const env = envConfig?.env ?? "development";

    // Validate type accuracy of resolved environment options
    const permittedEnvs = ["development", "staging", "production"];
    if (
        typeof apiUrl !== 'string' ||
        typeof timeout !== 'number' || isNaN(timeout) ||
        typeof env !== 'string' || !permittedEnvs.includes(env)
    ) {
        return "Invalid Input";
    }

    // Resolve feature flags explicitly using nullish coalescing operators
    const darkMode = featureFlags?.darkMode ?? false;
    const betaFeatures = featureFlags?.betaFeatures ?? false;
    const maintenanceMode = featureFlags?.maintenanceMode ?? false;

    // Validate type accuracy of feature flag variables
    if (typeof darkMode !== 'boolean' || typeof betaFeatures !== 'boolean' || typeof maintenanceMode !== 'boolean') {
        return "Invalid Input";
    }

    // --- STEP 2: LOGICAL COMPILATION ---
    // Calculate template string ID and check production state
    const configId = `${appName}-${env}-v${version}`;
    const isProduction = env === "production";

    // Dynamically compile array of enabled configuration flags
    const activeFlags = [];
    if (darkMode) activeFlags.push("darkMode");
    if (betaFeatures) activeFlags.push("betaFeatures");
    if (maintenanceMode) activeFlags.push("maintenanceMode");

    // --- STEP 3: CONSOLIDATED MERGE ---
    return {
        appName,
        version,
        maxRetries,
        apiUrl,
        timeout,
        env,
        darkMode,
        betaFeatures,
        maintenanceMode,
        configId,
        isProduction,
        activeFlags
    };
};

// --- EXAMPLE USAGE ---
console.log(buildAppConfig(
    { appName: "ShopBD", version: "2.1.0", maxRetries: 3 },
    { apiUrl: "https://api.shopbd.com", timeout: 8000, env: "production" },
    { darkMode: true, betaFeatures: false, maintenanceMode: false }
));