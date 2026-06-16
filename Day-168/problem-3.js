// 🧩 PROBLEM–03: switchTheme()

// Logic: Modifies user interface styling paradigms inside deeply isolated configurations. It uses serialization cloning to protect references, processes colors using an arrow mapper, and appends modification trails.

const switchTheme = (currentTheme, targetMode) => {

    // --- STEP 1: VALIDATION ---
    // Confirm theme interface parameters and strict target modes match operational choices.
    if (!currentTheme || typeof currentTheme !== 'object' || Array.isArray(currentTheme)) {
        return "Invalid Input";
    }
    if (targetMode !== "light" && targetMode !== "dark") {
        return "Invalid Input";
    }

    // Enforce complete typing consistency on baseline properties
    if (
        typeof currentTheme.themeId !== "string" || currentTheme.themeId.trim() === "" ||
        (currentTheme.mode !== "light" && currentTheme.mode !== "dark") ||
        typeof currentTheme.primaryColor !== "string" || currentTheme.primaryColor.trim() === "" ||
        typeof currentTheme.backgroundColor !== "string" || currentTheme.backgroundColor.trim() === "" ||
        typeof currentTheme.textColor !== "string" || currentTheme.textColor.trim() === "" ||
        !Array.isArray(currentTheme.switchHistory)
    ) {
        return "Invalid Input";
    }

    // Prevent identical state updates
    if (currentTheme.mode === targetMode) {
        return "Invalid Input";
    }

    // --- STEP 2: LOGICAL ISOLATION (DEEP COPY) ---
    // Sever parent references using high-fidelity JSON parsing to ensure immutability.
    const previous = JSON.parse(JSON.stringify(currentTheme));
    const current = JSON.parse(JSON.stringify(currentTheme));

    // --- STEP 3: COLOR AND TEXT SPECIFICATION OVERRIDES ---
    const oldMode = current.mode;
    current.mode = targetMode;

    // Use explicit arrow functions/mappings to handle color value swaps
    const colorPaletteMap = (mode) => {
        return mode === "dark"
            ? { primary: "#BB86FC", background: "#121212", text: "#FFFFFF" }
            : { primary: "#6200EE", background: "#FFFFFF", text: "#000000" };
    };

    const nextColors = colorPaletteMap(targetMode);
    current.primaryColor = nextColors.primary;
    current.backgroundColor = nextColors.background;
    current.textColor = nextColors.text;

    // Extract identifier elements located before the first hyphen delimiter
    const userId = current.themeId.split('-')[0];
    current.themeId = `${userId}-${targetMode}-theme`;

    // --- STEP 4: TRACK SYSTEM STATE CHRONOLOGY ---
    current.switchHistory.push(`Switched from ${oldMode} to ${targetMode}`);
    current.switchedAt = "2025-01-01";

    return {
        previous,
        current
    };
};

// --- EXAMPLE USAGE ---
console.log(switchTheme(
    {
        themeId: "U101-light-theme",
        mode: "light",
        primaryColor: "#6200EE",
        backgroundColor: "#FFFFFF",
        textColor: "#000000",
        switchHistory: ["Initialized light theme"]
    },
    "dark"
));