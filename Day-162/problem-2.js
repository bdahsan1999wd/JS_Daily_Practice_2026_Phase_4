// 🧩 PROBLEM–02: updateOrderStatus()

// Logic: This function yields a fresh, updated copy of an order by applying patches without mutating the input object, while safely recalculating fields that depend on delivery pricing updates.

function updateOrderStatus(existingOrder, updates) {

    // --- STEP 1: VALIDATION ---
    // Ensure parameters are valid non-empty objects.
    if (
        !existingOrder || typeof existingOrder !== "object" || Array.isArray(existingOrder) ||
        !updates || typeof updates !== "object" || Array.isArray(updates) ||
        Object.keys(updates).length === 0
    ) {
        return "Invalid Input";
    }

    // Validate essential fields of existingOrder profile
    if (
        typeof existingOrder.orderId !== "string" || existingOrder.orderId.trim() === "" ||
        typeof existingOrder.customerName !== "string" || existingOrder.customerName.trim() === "" ||
        typeof existingOrder.totalAmount !== "number" || existingOrder.totalAmount <= 0 ||
        typeof existingOrder.deliveryCharge !== "number" || existingOrder.deliveryCharge < 0 ||
        typeof existingOrder.status !== "string" || existingOrder.status.trim() === ""
    ) {
        return "Invalid Input";
    }

    // Validate fields provided dynamically inside the updates patch payload
    if (updates.hasOwnProperty("status")) {
        const allowedStatuses = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];
        if (typeof updates.status !== "string" || !allowedStatuses.includes(updates.status)) {
            return "Invalid Input";
        }
    }
    if (updates.hasOwnProperty("deliveryCharge") && (typeof updates.deliveryCharge !== "number" || updates.deliveryCharge < 0)) {
        return "Invalid Input";
    }
    if (updates.hasOwnProperty("deliveryCity") && (typeof updates.deliveryCity !== "string" || updates.deliveryCity.trim() === "")) {
        return "Invalid Input";
    }
    if (updates.hasOwnProperty("deliveryMethod") && (typeof updates.deliveryMethod !== "string" || updates.deliveryMethod.trim() === "")) {
        return "Invalid Input";
    }

    // --- STEP 2: IMMUTABLE SPREAD MERGE ---
    const updatedOrder = {
        ...existingOrder,
        ...updates,
        lastUpdated: "2025-01-01"
    };

    // --- STEP 3: RECALCULATE LOGICAL DEPENDENCIES ---
    updatedOrder.grandTotal = updatedOrder.totalAmount + updatedOrder.deliveryCharge;

    return updatedOrder;
}

// --- EXAMPLE USAGE ---
console.log(
    updateOrderStatus(
        { orderId: "ORD-002", customerName: "Ritu Das", totalAmount: 12000, deliveryCharge: 100, status: "PENDING" },
        { status: "SHIPPED", deliveryCharge: 250 }
    )
);

console.log(
    updateOrderStatus(
        { orderId: "ORD-002", customerName: "Ritu Das", totalAmount: 12000, deliveryCharge: 100, status: "PENDING" },
        { status: "INVALID_STATUS" }
    )
);