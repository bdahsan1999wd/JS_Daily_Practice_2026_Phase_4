// 🧩 PROBLEM–02: dispatchBulkNotifications()

// Logic: Transforms an collection of user targets into unified system logs by mapping with an arrow function. Uses inline nullish fallbacks to construct personalized string messages.

const dispatchBulkNotifications = (users, eventType, defaultMessage) => {

    // --- STEP 1: TYPE STRUCTURAL VALIDATION ---
    if (
        !Array.isArray(users) ||
        typeof eventType !== "string" || eventType.trim() === "" ||
        typeof defaultMessage !== "string" || defaultMessage.trim() === ""
    ) {
        return "Invalid Input";
    }

    // Ensure user collection contains valid data elements and isn't just an empty array wrapper
    if (users.length === 0) {
        return "Invalid Input";
    }

    // --- STEP 2: BATCH TRANSFORMATION RUN VIA .MAP() ---
    // A loop that avoids mutating the original objects by returning new ones.
    const dispatchLog = [];

    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        // Ensure that individual elements inside the collection are valid object records
        if (!user || typeof user !== "object" || Array.isArray(user)) {
            return "Invalid Input";
        }

        // --- STEP 3: PROCESS FALLBACK VALUES SAFELY ---
        const userId = user.userId ?? "UNKNOWN";
        const name = user.name ?? "Guest";
        const email = user.contact?.email ?? "no-reply@system.com";
        const phone = user.contact?.phone ?? "N/A";

        // Validate final values are types we can print out safely
        if (typeof userId !== "string" || typeof name !== "string" || typeof email !== "string" || typeof phone !== "string") {
            return "Invalid Input";
        }

        // --- STEP 4: CONSTRUCT DISPATCH LOG ENTRY ---
        const formattedMessage = `[${eventType}] Dear ${name}, ${defaultMessage}`;

        dispatchLog.push({
            userId,
            name,
            email,
            phone,
            message: formattedMessage,
            dispatched: true
        });
    }

    return dispatchLog;
};

// --- EXAMPLE USAGE ---
console.log(
    dispatchBulkNotifications([
        { userId: "U1", name: "Mita", contact: { email: "mita@mail.com", phone: "01711111111" } },
        { userId: "U2", contact: { email: "unknown@mail.com" } }
    ], "PROMO", "Get 20% off on your next order!")
);