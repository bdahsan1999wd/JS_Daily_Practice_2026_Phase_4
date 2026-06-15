// 🧩 PROBLEM–04: filterAndFormatNotifications()

// Logic: This function streams data through criteria filters and map processes. It excludes non-matching alerts, cleans up recipient properties via optional chaining, formats messages with template literals, and returns a prioritized array.

const filterAndFormatNotifications = (notifications, filters) => {

    // --- STEP 1: GENERAL SCHEMATIC VALIDATION ---
    if (!Array.isArray(notifications) || !filters || typeof filters !== "object" || Array.isArray(filters)) {
        return "Invalid Input";
    }

    // Validate configuration options if properties are specified
    if (filters.hasOwnProperty("type") && filters.type !== null && typeof filters.type !== "string") {
        return "Invalid Input";
    }
    if (filters.hasOwnProperty("minPriority") && filters.minPriority !== null && (typeof filters.minPriority !== "number" || isNaN(filters.minPriority))) {
        return "Invalid Input";
    }

    const validTypes = ["INFO", "WARNING", "ERROR", "SUCCESS"];

    // --- STEP 2: ITERATIVE VALIDATION, FILTERING, AND FORMULATION ---
    const processedList = [];

    for (let i = 0; i < notifications.length; i++) {
        const item = notifications[i];

        if (!item || typeof item !== "object" || Array.isArray(item)) {
            return "Invalid Input";
        }

        // Apply parameter defaults immediately using nullish coalescing to guarantee type stability
        const id = item.id ?? "UNKNOWN";
        const type = item.type ?? "INFO";
        const priority = item.meta?.priority ?? 3;
        const message = item.message ?? "No message";

        const recipientName = item.recipient?.name ?? "Unknown";
        const recipientEmail = item.recipient?.email ?? "N/A";

        // Validate basic component integrity inside properties
        if (!validTypes.includes(type) || typeof priority !== "number" || priority < 1 || priority > 5) {
            return "Invalid Input";
        }

        // --- STEP 3: MATCH DATA AGAINST CHOSEN TARGET CRITERIA ---
        let passesFilter = true;

        if (filters.type && filters.type !== type) {
            passesFilter = false;
        }
        if (filters.minPriority && priority < filters.minPriority) {
            passesFilter = false;
        }

        // If data survives parameter restrictions, shape object and save to storage collection
        if (passesFilter) {
            const formattedMessage = `[${type}] (Priority: ${priority}) → ${message}`;

            processedList.push({
                id,
                type,
                recipientName,
                recipientEmail,
                priority,
                formattedMessage
            });
        }
    }

    // --- STEP 4: DESCENDING RE-ORDER BASED ON ALERT LEVEL STRENGTH ---
    processedList.sort((low, high) => high.priority - low.priority);

    return processedList;
};

// --- EXAMPLE USAGE ---
console.log(
    filterAndFormatNotifications([
        { id: "N1", type: "ERROR", recipient: { name: "Rony", email: "rony@mail.com" }, meta: { priority: 5 }, message: "Server down!" },
        { id: "N2", type: "INFO", recipient: { name: "Mila" }, meta: { priority: 2 }, message: "Update available." },
        { id: "N3", type: "ERROR", message: "Disk full!" }
    ], { type: "ERROR", minPriority: 3 })
);