// 🧩 PROBLEM–01: buildNotification()

// Logic: This function maps incoming entity inputs into standardized alert responses. It leverages optional chaining (?.) and nullish coalescing (??) operators to secure missing property targets against program errors, while utilizing template literals for string formatting.

const buildNotification = (user, event, details) => {

    // --- STEP 1: PARAMETER VALIDATION ---
    // Ensure both object wrappers are structured correctly and event is a non-empty string.
    if (
        !user || typeof user !== "object" || Array.isArray(user) ||
        typeof event !== "string" || event.trim() === "" ||
        !details || typeof details !== "object" || Array.isArray(details)
    ) {
        return "Invalid Input";
    }

    // Verify the event matches one of our designated system types
    const allowedEvents = ["LOGIN", "PURCHASE", "ALERT", "REMINDER"];
    if (!allowedEvents.includes(event)) {
        return "Invalid Input";
    }

    // --- STEP 2: APPLY OPTIONAL CHAINING & NULLISH COALESCING ---
    // Extract properties safely. Fallback to default values only if value is null or undefined.
    const name = user.name ?? "Guest";
    const email = user.email ?? "no-email@unknown.com";
    const language = user.preferences?.language ?? "English";

    const amount = details.amount ?? 0;
    const message = details.message ?? "No message provided";

    // Double-check nested types if values were provided but were of the wrong type
    if (typeof name !== "string" || typeof email !== "string" || typeof language !== "string") {
        return "Invalid Input";
    }
    if (event === "PURCHASE" && (typeof amount !== "number" || isNaN(amount))) {
        return "Invalid Input";
    }
    if ((event === "ALERT" || event === "REMINDER") && typeof message !== "string") {
        return "Invalid Input";
    }

    // --- STEP 3: CONSTRUCT TEMPLATE LITERAL STRINGS ---
    let notificationText = "";
    if (event === "LOGIN") {
        notificationText = `Hello, ${name}! You have successfully logged in.`;
    } else if (event === "PURCHASE") {
        notificationText = `Hi ${name}, your purchase of ৳${amount} has been confirmed.`;
    } else if (event === "ALERT") {
        notificationText = `⚠️ Alert for ${name}: ${message}`;
    } else if (event === "REMINDER") {
        notificationText = `📅 Reminder for ${name}: ${message}`;
    }

    // --- STEP 4: RETURN CONSOLIDATED NOTIFICATION WRAPPER ---
    return {
        recipientName: name,
        recipientEmail: email,
        language,
        event,
        notificationText
    };
};

// --- EXAMPLE USAGE ---
console.log(
    buildNotification(
        { name: "Sajib", email: "sajib@mail.com", preferences: { language: "Bangla" } },
        "PURCHASE",
        { amount: 4500 }
    )
);