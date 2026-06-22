// Problem–1: validateRegistrationForm()

// Logic: Validates input object structures against explicit security requirements. It handles multiple decoupled checks synchronously, mapping regex evaluations and type strictness into a centralized errors array to track complete missing criteria.

const validateRegistrationForm = (formData) => {

    // --- STEP 1: INITIAL STRUCTURAL CHECKS ---
    if (typeof formData !== "object" || formData === null || Array.isArray(formData)) {
        return "Invalid Input";
    }

    const errors = [];
    const { username, email, password, confirmPassword, age } = formData;

    // --- STEP 2: FIELD-BY-FIELD VALIDATION TRAILS ---

    // 1. Username pattern match (4–20 chars, letters/numbers/underscore)
    const usernameRegex = /^[A-Za-z0-9_]+$/;
    if (typeof username !== "string" || username.length < 4 || username.length > 20 || !usernameRegex.test(username)) {
        errors.push("Username must be 4-20 characters (letters, numbers, underscore only)");
    }

    // 2. Email format validation (must contain "@" and "." somewhere after "@")
    if (typeof email !== "string") {
        errors.push("Invalid email format");
    } else {
        const atIndex = email.indexOf("@");
        if (atIndex === -1 || email.indexOf(".", atIndex) === -1) {
            errors.push("Invalid email format");
        }
    }

    // 3. Password complexity framework (>= 8 chars, 1 uppercase, 1 lowercase, 1 digit)
    if (typeof password !== "string" || password.length < 8) {
        errors.push("Password must be 8+ characters with uppercase, lowercase, and a digit");
    } else {
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasDigit = /[0-9]/.test(password);
        if (!hasUpper || !hasLower || !hasDigit) {
            errors.push("Password must be 8+ characters with uppercase, lowercase, and a digit");
        }
    }

    // 4. Identity confirmation match
    if (password !== confirmPassword) {
        errors.push("Passwords do not match");
    }

    // 5. Age boundary check (Number >= 13)
    if (typeof age !== "number" || isNaN(age) || age < 13) {
        errors.push("Must be at least 13 years old");
    }

    // --- STEP 3: EVALUATE VALIDITY STATE ---
    const isValid = errors.length === 0;

    // --- STEP 4: EMIT FORM VALIDATION REPORT ---
    return {
        isValid,
        errors
    };
};

// --- EXAMPLE USAGE ---
console.log(validateRegistrationForm({
    username: "raf",
    email: "rafmail.com",
    password: "abc12345",
    confirmPassword: "abc12345",
    age: 12
}));