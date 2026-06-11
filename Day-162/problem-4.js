// 🧩 PROBLEM–04: deepCloneOrder()

// Logic: Isolates deep nested properties into a separate location in memory using serialization, allowing updates to nested entries like array elements or address fields without leaking side-effects back into the source object.

function deepCloneOrder(orderRecord) {

    // --- STEP 1: VALIDATION ---
    if (!orderRecord || typeof orderRecord !== "object" || Array.isArray(orderRecord)) {
        return "Invalid Input";
    }

    if (
        typeof orderRecord.orderId !== "string" ||
        typeof orderRecord.customerName !== "string" ||
        !orderRecord.deliveryAddress || typeof orderRecord.deliveryAddress !== "object" || Array.isArray(orderRecord.deliveryAddress) ||
        typeof orderRecord.deliveryAddress.street !== "string" ||
        typeof orderRecord.deliveryAddress.city !== "string" ||
        !Array.isArray(orderRecord.items)
    ) {
        return "Invalid Input";
    }

    // --- STEP 2: SERIALIZED HARD DEEP COPY ---
    const clonedRecord = JSON.parse(JSON.stringify(orderRecord));

    // --- STEP 3: PERFORM ISOLATED TRANSLATIONS ---
    clonedRecord.cloneTag = "CLONED";
    clonedRecord.deliveryAddress.city = "Unknown";
    clonedRecord.items.push("cloned-item");

    // --- STEP 4: RETURN CONTEXTS ---
    return {
        original: orderRecord,
        clone: clonedRecord
    };
}

// --- EXAMPLE USAGE ---
console.log(
    deepCloneOrder({
        orderId: "ORD-004",
        customerName: "Mona Lisa",
        deliveryAddress: { street: "Road-5, Block-B", city: "Sylhet" },
        items: ["Notebook", "Pen"]
    })
);

console.log(deepCloneOrder({ orderId: "ORD-ERR", deliveryAddress: "Not an object shape" }));