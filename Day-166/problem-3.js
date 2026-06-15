// 🧩 PROBLEM–03: mergeNotificationPreferences()

// Logic: Aggregates multiple configuration instances down into a single master layout. Uses rest parameters to capture variadic object layers, and applies consecutive spread operators to handle overrides from left to right.

const mergeNotificationPreferences = (defaultPrefs, ...userPrefsList) => {

    // --- STEP 1: VALIDATE ENTRANCE BASE STRUCTURES ---
    if (!defaultPrefs || typeof defaultPrefs !== "object" || Array.isArray(defaultPrefs)) {
        return "Invalid Input";
    }

    // Validate default settings layout to ensure standard parameters exist
    if (
        typeof defaultPrefs.language !== "string" || defaultPrefs.language.trim() === "" ||
        (defaultPrefs.theme !== "light" && defaultPrefs.theme !== "dark") ||
        typeof defaultPrefs.emailEnabled !== "boolean" ||
        typeof defaultPrefs.smsEnabled !== "boolean" ||
        typeof defaultPrefs.pushEnabled !== "boolean"
    ) {
        return "Invalid Input";
    }

    // Rest parameter enforcement: Function must receive at least 1 user preference adjustment payload
    if (!userPrefsList || userPrefsList.length === 0) {
        return "Invalid Input";
    }

    // --- STEP 2: LOOP AND SPREAD PARAMETERS TO ACCUMULATE ALTERATIONS ---
    let mergedResult = { ...defaultPrefs };

    for (let i = 0; i < userPrefsList.length; i++) {
        const userPref = userPrefsList[i];

        // Ensure entry item instances are valid parameter configuration objects
        if (!userPref || typeof userPref !== "object" || Array.isArray(userPref)) {
            return "Invalid Input";
        }

        // Merge current object layer onto previous ones, letting later properties overwrite earlier ones
        mergedResult = { ...mergedResult, ...userPref };
    }

    // Validate type correctness of final merged configuration properties
    if (
        typeof mergedResult.language !== "string" || mergedResult.language.trim() === "" ||
        (mergedResult.theme !== "light" && mergedResult.theme !== "dark") ||
        typeof mergedResult.emailEnabled !== "boolean" ||
        typeof mergedResult.smsEnabled !== "boolean" ||
        typeof mergedResult.pushEnabled !== "boolean"
    ) {
        return "Invalid Input";
    }

    // --- STEP 3: ANALYZE ACTIVE DELIVERY MECHANISMS ---
    const activeChannels = [];
    if (mergedResult.emailEnabled === true) activeChannels.push("EMAIL");
    if (mergedResult.smsEnabled === true) activeChannels.push("SMS");
    if (mergedResult.pushEnabled === true) activeChannels.push("PUSH");

    // --- STEP 4: APPEND STATUS METRICS ---
    mergedResult.activeChannels = activeChannels;
    mergedResult.totalChannels = activeChannels.length;

    return mergedResult;
};

// --- EXAMPLE USAGE ---
console.log(
    mergeNotificationPreferences(
        { language: "English", theme: "light", emailEnabled: true, smsEnabled: false, pushEnabled: true },
        { theme: "dark", smsEnabled: true },
        { language: "Bangla", pushEnabled: false }
    )
);