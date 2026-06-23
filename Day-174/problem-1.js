// Problem-01: authenticateLogin()

// Logic: Validates incoming transactional credentials against secure data records. It enforces an explicit short-circuit hierarchy sequentially, intercepting identity mismatches and state flags before verifying password matching.

const authenticateLogin = (storedUser, loginAttempt) => {

    // --- STEP 1: INITIAL STRUCTURAL CHECKS ---
    if (typeof storedUser !== "object" || storedUser === null || Array.isArray(storedUser)) {
        return "Invalid Input";
    }
    if (typeof loginAttempt !== "object" || loginAttempt === null || Array.isArray(loginAttempt)) {
        return "Invalid Input";
    }

    // Extract values and check property integrity bounds
    const { username: storedName, passwordHash: storedHash, isActive, isLocked } = storedUser;
    const { username: attemptName, passwordHash: attemptHash } = loginAttempt;

    if (typeof storedName !== "string" || storedName === "" || typeof storedHash !== "string" || storedHash === "") return "Invalid Input";
    if (typeof attemptName !== "string" || attemptName === "" || typeof attemptHash !== "string" || attemptHash === "") return "Invalid Input";
    if (typeof isActive !== "boolean" || typeof isLocked !== "boolean") return "Invalid Input";

    // --- STEP 2: SAFE BOUNDARY RESOLUTIONS (AUTH HIERARCHY) ---
    let success = false;
    let message = "";

    if (attemptName !== storedName) {
        message = "User not found";
    } else if (isLocked === true) {
        message = "Account is locked";
    } else if (isActive === false) {
        message = "Account is deactivated";
    } else if (attemptHash !== storedHash) {
        message = "Incorrect password";
    } else {
        // All security barriers successfully cleared
        success = true;
        message = "Login successful";
    }

    // --- STEP 3: DATA MAP CONVERSIONS ---
    // Mapping direct parameters into a clear validation result object

    // --- STEP 4: EMIT LOG BLUEPRINT PACKAGES ---
    return {
        success,
        message
    };
};

// --- EXAMPLE USAGE ---
console.log(authenticateLogin(
    { username: "shawon99", passwordHash: "hash_abc123", isActive: true, isLocked: false },
    { username: "shawon99", passwordHash: "hash_wrong" }
));