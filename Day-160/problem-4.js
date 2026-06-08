// 🧩 PROBLEM–04: deepCloneCustomer()

// Logic: Clones deeply nested reference graphs safely using serialization pipelines, disconnecting primitive arrays and properties across both object branches completely.

function deepCloneCustomer(customerRecord) {

    // --- STEP 1: VALIDATION RUN ---
    if (!customerRecord || typeof customerRecord !== "object" || Array.isArray(customerRecord)) {
        return "Invalid Input";
    }

    if (
        typeof customerRecord.customerId !== "string" ||
        typeof customerRecord.fullName !== "string" ||
        !customerRecord.address || typeof customerRecord.address !== "object" || Array.isArray(customerRecord.address) ||
        typeof customerRecord.address.city !== "string" ||
        typeof customerRecord.address.country !== "string" ||
        !Array.isArray(customerRecord.purchaseHistory)
    ) {
        return "Invalid Input";
    }

    // --- STEP 2: ISOLATE REFERENCE ENTITIES VIA DEEP COPY ---
    const clone = JSON.parse(JSON.stringify(customerRecord));

    // --- STEP 3: MANIPULATE NESTED CLONE SCOPES ---
    clone.cloneTag = "CLONED";
    clone.address.city = "Unknown";
    clone.purchaseHistory.push("cloned-entry");

    return {
        original: customerRecord,
        clone: clone
    };
}

// --- EXAMPLE USAGE ---
console.log(
    deepCloneCustomer({
        customerId: "C003",
        fullName: "Nadia Islam",
        address: { city: "Sylhet", country: "Bangladesh" },
        purchaseHistory: ["INV-001", "INV-002"]
    })
);

console.log(deepCloneCustomer({ customerId: "C101", address: { city: "Dhaka" } }));