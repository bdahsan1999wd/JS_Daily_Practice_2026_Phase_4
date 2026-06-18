// 🧩 PROBLEM–02: buildErrorResponse()

// Logic: Captures detailed system breakdown instances through structural rest arguments. It assigns HTTP status mapping layers cleanly and formats detailed tracing fields via template strings.

const buildErrorResponse = (errorCode, context, ...details) => {

    // --- STEP 1: CRITERIA AND RANGE CHECKS ---
    // Enforce parameter patterns and map backend system errors to classic HTTP responses.
    let httpStatus = 0;
    if (errorCode === "VALIDATION_ERROR") httpStatus = 400;
    else if (errorCode === "AUTH_ERROR") httpStatus = 401;
    else if (errorCode === "PERMISSION_ERROR") httpStatus = 403;
    else if (errorCode === "NOT_FOUND") httpStatus = 404;
    else if (errorCode === "SERVER_ERROR") httpStatus = 500;
    else return "Invalid Input";

    // Validate contextual wrappers to prevent empty elements or array handling conflicts
    if (!context || typeof context !== "object" || Array.isArray(context)) {
        return "Invalid Input";
    }

    // Rest parameter enforcement: Rest arrays must contain at least 1 diagnostic string entry.
    if (!details || details.length === 0) {
        return "Invalid Input";
    }

    // --- STEP 2: SAFE EXTRACTION & TYPE INTEGRITY CHECKS ---
    const endpoint = context?.endpoint ?? "unknown";
    const userId = context?.userId ?? "anonymous";

    if (typeof endpoint !== "string" || typeof userId !== "string") {
        return "Invalid Input";
    }

    // Verify type safety for every individual collected entry inside details array
    for (let i = 0; i < details.length; i++) {
        if (typeof details[i] !== "string") {
            return "Invalid Input";
        }
    }

    // --- STEP 3: TEMPLATE TEXT FORMULATION ---
    const errorMessage = `[${errorCode}] Error on ${endpoint} for user ${userId}`;

    // --- STEP 4: RETURN COMPILED LOG RECORD ---
    return {
        errorCode,
        httpStatus,
        endpoint,
        userId,
        errorMessage,
        details,
        detailCount: details.length,
        timestamp: "2025-01-01"
    };
};

// --- EXAMPLE USAGE ---
console.log(buildErrorResponse(
    "VALIDATION_ERROR",
    { endpoint: "/api/register", userId: "U-055" },
    "Email is required",
    "Password too short",
    "Username already taken"
));