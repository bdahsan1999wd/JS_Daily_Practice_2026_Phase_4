// 🧩 PROBLEM–05: generateThemeLabels()

// Logic: Loops through collections of user interface theme layouts to append formatted print templates. It leverages functional lookup tables alongside fallbacks to isolate input structures.

const generateThemeLabels = (themes, labelFormat) => {

    // --- STEP 1: VALIDATION ---
    // Ensure standard configuration shapes exist before performing collection mutations.
    if (!Array.isArray(themes) || themes.length === 0) {
        return "Invalid Input";
    }

    const permittedFormats = ["SHORT", "FULL", "BADGE"];
    if (typeof labelFormat !== "string" || !permittedFormats.includes(labelFormat)) {
        return "Invalid Input";
    }

    const outputCollection = [];

    // --- STEP 2: LOOP LOGICAL EXTRACTION MAP ---
    for (let i = 0; i < themes.length; i++) {
        const themeItem = themes[i];

        if (!themeItem || typeof themeItem !== "object" || Array.isArray(themeItem)) {
            return "Invalid Input";
        }

        // Apply fallback patterns to preserve structural balance
        const themeId = themeItem.themeId ?? "unknown-id";
        const mode = themeItem.mode ?? "light";
        const createdBy = themeItem.meta?.createdBy ?? "system";
        const version = themeItem.meta?.version ?? "1.0";

        // Confirm primitive type parameters inside variables
        if (
            typeof themeId !== "string" ||
            typeof mode !== "string" ||
            typeof createdBy !== "string" ||
            typeof version !== "string"
        ) {
            return "Invalid Input";
        }

        // --- STEP 3: CHOOSE FORMAT STRING ---
        let labelText = "";
        if (labelFormat === "SHORT") {
            labelText = `[${mode}] ${themeId}`;
        } else if (labelFormat === "FULL") {
            labelText = `Theme: ${themeId} | Mode: ${mode} | By: ${createdBy} | v${version}`;
        } else if (labelFormat === "BADGE") {
            labelText = `🎨 ${mode.toUpperCase()} — ${themeId}`;
        }

        // --- STEP 4: PUSH RESULT TO REGISTRY MAP ---
        outputCollection.push({
            themeId,
            mode,
            label: labelText,
            labelFormat
        });
    }

    return outputCollection;
};

// --- EXAMPLE USAGE ---
console.log(generateThemeLabels([
    { themeId: "U1-dark-theme", mode: "dark", meta: { createdBy: "Rafiq", version: "2.0" } },
    { themeId: "U2-light-theme", meta: { version: "1.5" } }
], "FULL"));