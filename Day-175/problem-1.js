// Problem-1 : enforcePasswordPolicy()

// Logic: Validates input strings against explicit criteria. It runs separate complexity scans using character pools, filters blacklisted sub-strings case-insensitively, and bundles violations chronologically.

const enforcePasswordPolicy = (password, policy) => {

    // --- STEP 1: INITIAL STRUCTURAL CHECKS ---
    if (typeof password !== "string" || password === "") {
        return "Invalid Input";
    }
    if (typeof policy !== "object" || policy === null || Array.isArray(policy)) {
        return "Invalid Input";
    }

    const { minLength, requireUppercase, requireLowercase, requireDigit, requireSpecialChar, forbiddenWords } = policy;

    if (typeof minLength !== "number" || minLength < 1 || isNaN(minLength)) return "Invalid Input";
    if (typeof requireUppercase !== "boolean" || typeof requireLowercase !== "boolean") return "Invalid Input";
    if (typeof requireDigit !== "boolean" || typeof requireSpecialChar !== "boolean") return "Invalid Input";
    if (!Array.isArray(forbiddenWords)) return "Invalid Input";

    // --- STEP 2: SAFE BOUNDARY RESOLUTIONS ---
    const violations = [];

    // 1. Minimum Length constraint evaluation
    if (password.length < minLength) {
        violations.push(`Password must be at least ${minLength} characters`);
    }

    // 2. Character type pool validation using regular expressions
    if (requireUppercase && !/[A-Z]/.test(password)) {
        violations.push("Must contain an uppercase letter");
    }
    if (requireLowercase && !/[a-z]/.test(password)) {
        violations.push("Must contain a lowercase letter");
    }
    if (requireDigit && !/[0-9]/.test(password)) {
        violations.push("Must contain a digit");
    }
    if (requireSpecialChar && !/[!@#$%^&*]/.test(password)) {
        violations.push("Must contain a special character");
    }

    // --- STEP 3: DATA MAP CONVERSIONS (FORBIDDEN WORD INTERSECTION) ---
    const lowerPassword = password.toLowerCase();
    for (let i = 0; i < forbiddenWords.length; i++) {
        const word = forbiddenWords[i];
        if (typeof word === "string" && word !== "") {
            if (lowerPassword.includes(word.toLowerCase())) {
                violations.push(`Password contains a forbidden word: ${word}`);
            }
        }
    }

    const isCompliant = violations.length === 0;

    // --- STEP 4: EMIT LOG BLUEPRINT PACKAGES ---
    return {
        isCompliant,
        violations
    };
};

// --- EXAMPLE USAGE ---
console.log(enforcePasswordPolicy("password123", {
    minLength: 10,
    requireUppercase: true,
    requireLowercase: true,
    requireDigit: true,
    requireSpecialChar: true,
    forbiddenWords: ["password", "admin"]
}));