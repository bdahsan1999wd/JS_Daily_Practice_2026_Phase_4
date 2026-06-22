// Problem-2: checkDuplicateAccount()

// Logic: Resolves uniqueness by performing safe array scans across multi-user records. It standardizes text comparisons using case-insensitive transformations, isolating discrete flag intersections before emitting state authorization flags.

const checkDuplicateAccount = (existingUsers, newUser) => {

    // --- STEP 1: INITIAL STRUCTURAL CHECKS ---
    if (!Array.isArray(existingUsers)) {
        return "Invalid Input";
    }
    if (typeof newUser !== "object" || newUser === null || Array.isArray(newUser)) {
        return "Invalid Input";
    }

    // Destructure properties and enforce non-empty parameter constraints
    const { username, email } = newUser;
    if (typeof username !== "string" || username.trim() === "" || typeof email !== "string" || email.trim() === "") {
        return "Invalid Input";
    }

    // --- STEP 2: SAFE BOUNDARY RESOLUTIONS ---
    const targetUsername = username.toLowerCase();
    const targetEmail = email.toLowerCase();

    // --- STEP 3: DATA MAP CONVERSIONS (DUPLICATE SCANS) ---
    let usernameTaken = false;
    let emailTaken = false;

    for (let i = 0; i < existingUsers.length; i++) {
        const user = existingUsers[i];

        // Skip anomaly values safely if an array item is corrupted
        if (!user || typeof user !== "object") continue;

        if (typeof user.username === "string" && user.username.toLowerCase() === targetUsername) {
            usernameTaken = true;
        }
        if (typeof user.email === "string" && user.email.toLowerCase() === targetEmail) {
            emailTaken = true;
        }
    }

    const canRegister = !usernameTaken && !emailTaken;

    // --- STEP 4: EMIT LOG BLUEPRINT PACKAGES ---
    return {
        usernameTaken,
        emailTaken,
        canRegister
    };
};

// --- EXAMPLE USAGE ---
console.log(checkDuplicateAccount([
    { username: "Rakib123", email: "rakib@mail.com" },
    { username: "TaniaB", email: "tania@mail.com" }
], { username: "rakib123", email: "newrakib@mail.com" }));