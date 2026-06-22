// Problem-4: generateAccountId()

// Logic: Constructs a structured alphanumeric identifier based on structural metadata. It uses custom string manipulation techniques to enforce minimum padding thresholds and resolves naming conflicts recursively through iterative array checks.

const generateAccountId = (userData, existingIds) => {

    // --- STEP 1: INITIAL STRUCTURAL CHECKS ---
    if (typeof userData !== "object" || userData === null || Array.isArray(userData)) {
        return "Invalid Input";
    }
    if (!Array.isArray(existingIds)) {
        return "Invalid Input";
    }

    const { username, registrationYear, accountType } = userData;

    // Strict boundary parameters validation
    if (typeof username !== "string" || username.trim() === "") return "Invalid Input";
    if (typeof registrationYear !== "number" || !Number.isInteger(registrationYear) || registrationYear < 2000 || registrationYear > 2025) return "Invalid Input";
    if (accountType !== "FREE" && accountType !== "PREMIUM" && accountType !== "ENTERPRISE") return "Invalid Input";

    // --- STEP 2: SAFE BOUNDARY RESOLUTIONS ---
    // Handle short username lengths dynamically via padding loop
    let prefix = username.substring(0, 3).toUpperCase();
    while (prefix.length < 3) {
        prefix += "X";
    }

    const yearString = String(registrationYear);
    const yearPart = yearString.substring(yearString.length - 2);

    let typeCode = "F";
    if (accountType === "PREMIUM") typeCode = "P";
    if (accountType === "ENTERPRISE") typeCode = "E";

    // --- STEP 3: DATA MAP CONVERSIONS (DUPLICATE COLLISION SOLVER) ---
    const baseId = `${prefix}${yearPart}${typeCode}`;
    let accountId = baseId;
    let isDuplicateResolved = false;
    let suffixCounter = 1;

    // Sequential index generator loop until key uniqueness is secured
    while (existingIds.includes(accountId)) {
        isDuplicateResolved = true;
        accountId = `${baseId}-${suffixCounter}`;
        suffixCounter++;
    }

    // --- STEP 4: EMIT LOG BLUEPRINT PACKAGES ---
    return {
        accountId,
        isDuplicateResolved
    };
};

// --- EXAMPLE USAGE ---
console.log(generateAccountId(
    { username: "Karim", registrationYear: 2024, accountType: "PREMIUM" },
    ["KAR24P", "KAR24P-1"]
));