// 🧩 PROBLEM–02: patchUserSettings()

// Logic: This function dynamically updates core settings using rest parameters without mutating the original source object. It traces modified parameters through sequential spread applications to provide update history metrics.

const patchUserSettings = (currentSettings, ...patches) => {

    // --- STEP 1: VALIDATION ---
    // Confirm baseline configurations exist and that rest params captured mutation properties.
    if (!currentSettings || typeof currentSettings !== 'object' || Array.isArray(currentSettings)) {
        return "Invalid Input";
    }
    if (!patches || patches.length === 0) {
        return "Invalid Input";
    }

    // Enforce existence and type discipline of core original setting records
    if (
        typeof currentSettings.userId !== "string" || currentSettings.userId.trim() === "" ||
        typeof currentSettings.language !== "string" || currentSettings.language.trim() === "" ||
        typeof currentSettings.timezone !== "string" || currentSettings.timezone.trim() === "" ||
        typeof currentSettings.currency !== "string" || currentSettings.currency.trim() === "" ||
        typeof currentSettings.notificationsEnabled !== "boolean" ||
        typeof currentSettings.autoSave !== "boolean"
    ) {
        return "Invalid Input";
    }

    // --- STEP 2: LOGICAL MERGE ---
    // Clone properties immutably left-to-right over sequential patch object arguments.
    let updatedSettings = { ...currentSettings };

    for (let i = 0; i < patches.length; i++) {
        const individualPatch = patches[i];

        if (!individualPatch || typeof individualPatch !== "object" || Array.isArray(individualPatch)) {
            return "Invalid Input";
        }

        updatedSettings = { ...updatedSettings, ...individualPatch };
    }

    // --- STEP 3: DIFFERENCE DETECTION ---
    // Compare structural attributes between previous values and final outcomes to track mutations.
    const fieldsToTrack = ["userId", "language", "timezone", "currency", "notificationsEnabled", "autoSave"];
    const changedFields = [];

    for (let i = 0; i < fieldsToTrack.length; i++) {
        const fieldName = fieldsToTrack[i];
        if (currentSettings[fieldName] !== updatedSettings[fieldName]) {
            changedFields.push(fieldName);
        }
    }

    // --- STEP 4: META INTEGRATION ---
    // Compile progress logs using descriptive template literal structures.
    updatedSettings.changedFields = changedFields;
    updatedSettings.patchCount = patches.length;
    updatedSettings.settingsSummary = `User ${currentSettings.userId} settings updated. ${changedFields.length} field(s) changed.`;

    return updatedSettings;
};

// --- EXAMPLE USAGE ---
console.log(patchUserSettings(
    { userId: "U-202", language: "English", timezone: "Asia/Dhaka", currency: "BDT", notificationsEnabled: true, autoSave: false },
    { language: "Bangla", autoSave: true },
    { currency: "USD", timezone: "Asia/Dhaka" }
));