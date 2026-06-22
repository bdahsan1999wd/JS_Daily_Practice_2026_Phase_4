// Problem-5: processBulkRegistrations()

// Logic: Batch-processes arrays of user applications. It screens objects based on explicit short-circuit rules, registers approved records, tracks error contexts, and calculates performance rate transformations safely.

const processBulkRegistrations = (registrationRequests) => {

    // --- STEP 1: INITIAL STRUCTURAL CHECKS ---
    if (!Array.isArray(registrationRequests) || registrationRequests.length === 0) {
        return "Invalid Input";
    }

    const approved = [];
    const rejected = [];

    // --- STEP 2: SAFE BOUNDARY RESOLUTIONS (BATCH LOOP) ---
    for (let i = 0; i < registrationRequests.length; i++) {
        const currentReq = registrationRequests[i];

        if (typeof currentReq !== "object" || currentReq === null) {
            return "Invalid Input";
        }

        const { username, email, password, age } = currentReq;

        // Condition 1 Rule Check
        if (typeof username !== "string" || username.length < 4 || username.length > 20) {
            const safeUser = typeof username === "string" ? username : "Unknown";
            rejected.push({ username: safeUser, reason: "Invalid username length" });
            continue;
        }

        // Condition 2 Rule Check
        if (typeof email !== "string" || !email.includes("@")) {
            rejected.push({ username, reason: "Invalid email" });
            continue;
        }

        // Condition 3 Rule Check
        if (typeof password !== "string" || password.length < 8) {
            rejected.push({ username, reason: "Password too short" });
            continue;
        }

        // Condition 4 Rule Check
        if (typeof age !== "number" || isNaN(age) || age < 13) {
            rejected.push({ username, reason: "Underage" });
            continue;
        }

        // --- STEP 3: DATA MAP CONVERSIONS ---
        approved.push(username);
    }

    // Summary calculations mapping
    const totalRequests = registrationRequests.length;
    const approvalRate = parseFloat(((approved.length / totalRequests) * 100).toFixed(2));

    // --- STEP 4: EMIT LOG BLUEPRINT PACKAGES ---
    return {
        approved,
        rejected,
        approvalRate
    };
};

// --- EXAMPLE USAGE ---
console.log(processBulkRegistrations([
    { username: "Tania01", email: "tania@mail.com", password: "pass1234", age: 22 },
    { username: "Bo", email: "bomail.com", password: "12345", age: 19 },
    { username: "Hasan99", email: "hasan@mail.com", password: "short", age: 10 }
]));