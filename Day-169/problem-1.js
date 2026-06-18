// 🧩 PROBLEM–01: buildApiResponse()

// Logic: This function maps numerical status codes and data onto standard payload structures. It uses optional chaining and nullish operators to isolate metadata fields safely, while compiling descriptive response labels through inline template literals.

const buildApiResponse = (statusCode, data, meta) => {

    // --- STEP 1: PARAMETER VALIDATION ---
    // Ensure the baseline HTTP status codes match explicit backend definitions.
    const allowedStatuses = [200, 201, 400, 401, 403, 404, 500];
    if (typeof statusCode !== "number" || !allowedStatuses.includes(statusCode)) {
        return "Invalid Input";
    }

    // --- STEP 2: APPLY OPTIONAL CHAINING & NULLISH COALESCING ---
    // Extract property fields or fall back to system defaults if fields are null or undefined.
    const requestId = meta?.requestId ?? "N/A";
    const version = meta?.version ?? "1.0";
    const processingTime = meta?.processingTime ?? 0;

    // Validate type accuracy of resolved meta variables
    if (
        typeof requestId !== "string" ||
        typeof version !== "string" ||
        typeof processingTime !== "number" || isNaN(processingTime)
    ) {
        return "Invalid Input";
    }

    // --- STEP 3: MAPPING COMPUTED METRICS ---
    // Establish success range booleans and match code numbers to standardized strings.
    const success = statusCode >= 200 && statusCode < 300;

    let statusMessage = "";
    if (statusCode === 200) statusMessage = "OK";
    else if (statusCode === 201) statusMessage = "Created";
    else if (statusCode === 400) statusMessage = "Bad Request";
    else if (statusCode === 401) statusMessage = "Unauthorized";
    else if (statusCode === 403) statusMessage = "Forbidden";
    else if (statusCode === 404) statusMessage = "Not Found";
    else if (statusCode === 500) statusMessage = "Internal Server Error";

    // --- STEP 4: CONSTRUCT TEMPLATE TEXT & RETURN ---
    const responseLabel = `[${statusCode}] ${statusMessage} — RequestID: ${requestId}`;

    return {
        statusCode,
        statusMessage,
        success,
        data,
        requestId,
        version,
        processingTime,
        responseLabel
    };
};

// --- EXAMPLE USAGE ---
console.log(buildApiResponse(
    201,
    { userId: "U-001", name: "Nabil" },
    { requestId: "REQ-9921", version: "2.3", processingTime: 142 }
));