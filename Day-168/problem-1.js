// 🧩 PROBLEM–01: buildThemeProfile()

// Logic: This function maps and merges distinct customer preference inputs into a finalized presentation theme profile. It leverages nullish coalescing to shield against non-existent values and checks accessibility thresholds dynamically.

const buildThemeProfile = (userInfo, themeSettings) => {

    // --- STEP 1: VALIDATION ---
    // Enforce parameter presence and verify they are non-null structural objects.
    if (
        !userInfo || typeof userInfo !== 'object' || Array.isArray(userInfo) ||
        !themeSettings || typeof themeSettings !== 'object' || Array.isArray(themeSettings)
    ) {
        return "Invalid Input";
    }

    // Validate static configurations inside the theme settings object
    const { mode, primaryColor, borderRadius, animationsEnabled } = themeSettings;
    if (
        (mode !== "light" && mode !== "dark") ||
        typeof primaryColor !== "string" || primaryColor.trim() === "" ||
        typeof borderRadius !== "number" || isNaN(borderRadius) || borderRadius < 0 || borderRadius > 20 ||
        typeof animationsEnabled !== "boolean"
    ) {
        return "Invalid Input";
    }

    // --- STEP 2: APPLY OPTIONAL CHAINING & NULLISH COALESCING ---
    // Safely pluck profile traits or fall back to system-wide default parameters.
    const userId = userInfo.userId ?? "GUEST";
    const username = userInfo.username ?? "Anonymous";
    const colorScheme = userInfo.preferences?.colorScheme ?? "default";
    const fontSize = userInfo.preferences?.fontSize ?? 14;

    // Validate type accuracy of user profile properties
    if (
        typeof userId !== "string" ||
        typeof username !== "string" ||
        typeof colorScheme !== "string" ||
        typeof fontSize !== "number" || isNaN(fontSize)
    ) {
        return "Invalid Input";
    }

    // --- STEP 3: DYNAMIC ACCESSIBILITY ASSESSMENT ---
    // Evaluate display preferences to match specific access standards.
    let accessibilityMode = "STANDARD";
    if (fontSize >= 18 && animationsEnabled === false) {
        accessibilityMode = "HIGH_ACCESSIBILITY";
    } else if (fontSize >= 18 || animationsEnabled === false) {
        accessibilityMode = "PARTIAL_ACCESSIBILITY";
    }

    // --- STEP 4: CONSTRUCT TEMPLATE TEXT & RETURN ---
    const themeId = `${userId}-${mode}-theme`;

    return {
        userId,
        username,
        colorScheme,
        fontSize,
        mode,
        primaryColor,
        borderRadius,
        animationsEnabled,
        themeId,
        accessibilityMode
    };
};

// --- EXAMPLE USAGE ---
console.log(buildThemeProfile(
    { userId: "U-101", username: "Rakib", preferences: { colorScheme: "blue", fontSize: 20 } },
    { mode: "dark", primaryColor: "#1A1A2E", borderRadius: 8, animationsEnabled: false }
));