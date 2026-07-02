// PROBLEM-01: createUser()

// Logic: Creates a new user, but blocks it if either the userId OR the email (checked case-insensitively) is already in use. New users always start with status "ACTIVE".

const createUser = (users, newUser) => {

    // --- STEP 1: VALIDATION ---
    // 1a) users must be an array
    if (!Array.isArray(users)) return "Invalid Input";
    // 1b) newUser must be a plain object
    if (typeof newUser !== "object" || newUser === null || Array.isArray(newUser)) {
        return "Invalid Input";
    }
    // 1c) validate every existing user record's shape
    for (let i = 0; i < users.length; i++) {
        const u = users[i];
        if (!u || typeof u !== "object") return "Invalid Input";
        if (typeof u.userId !== "string") return "Invalid Input";
        if (typeof u.username !== "string") return "Invalid Input";
        if (typeof u.email !== "string") return "Invalid Input";
        if (!["ACTIVE", "SUSPENDED", "DELETED"].includes(u.status)) return "Invalid Input";
    }
    // 1d) validate the new user's own fields
    const { userId, username, email } = newUser;
    if (typeof userId !== "string" || userId === "") return "Invalid Input";
    if (typeof username !== "string" || username === "") return "Invalid Input";
    if (typeof email !== "string" || !email.includes("@")) return "Invalid Input";

    // --- STEP 2: CHECK FOR DUPLICATE USER ID ---
    const isDuplicateId = users.some(u => u.userId === userId);
    if (isDuplicateId) {
        return { created: false, reason: "User ID already exists", users };
    }

    // --- STEP 3: CHECK FOR DUPLICATE EMAIL (CASE-INSENSITIVE) ---
    // lowercase both sides so "MINA@mail.com" matches "mina@mail.com"
    const isDuplicateEmail = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (isDuplicateEmail) {
        return { created: false, reason: "Email already registered", users };
    }

    // --- STEP 4: CREATE THE USER (IMMUTABLY) ---
    // status is always forced to "ACTIVE" for brand new users
    const createdUser = { userId, username, email, status: "ACTIVE" };
    const updatedUsers = [...users, createdUser];

    // --- STEP 5: RETURN SUCCESS RESULT ---
    return { created: true, users: updatedUsers, totalUsers: updatedUsers.length };
};

// --- EXAMPLE USAGE ---
console.log(createUser(
    [{ userId: "U1", username: "rafi_k", email: "rafi@mail.com", status: "ACTIVE" }],
    { userId: "U2", username: "mina_h", email: "MINA@mail.com" }
));