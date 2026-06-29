// PROBLEM-02: cancelOrder()

// Logic: Cancels an order by ID, but blocks the cancellation if the order is already cancelled or already delivered.

const cancelOrder = (orders, orderId) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(orders)) return "Invalid Input";
    if (typeof orderId !== "string" || orderId === "") return "Invalid Input";
    for (let i = 0; i < orders.length; i++) {
        const o = orders[i];
        if (!o || typeof o !== "object") return "Invalid Input";
        if (typeof o.orderId !== "string") return "Invalid Input";
        if (typeof o.status !== "string") return "Invalid Input";
    }

    // --- STEP 2: LOCATE THE TARGET ORDER ---
    const targetOrder = orders.find(o => o.orderId === orderId);
    if (!targetOrder) {
        return { cancelled: false, reason: "Order not found", orders };
    }

    // --- STEP 3: STATUS-BASED REJECTION CHECKS ---
    // order's CURRENT status decides if cancellation is even allowed
    if (targetOrder.status === "CANCELLED") {
        return { cancelled: false, reason: "Order is already cancelled", orders };
    }
    if (targetOrder.status === "DELIVERED") {
        return { cancelled: false, reason: "Cannot cancel a delivered order", orders };
    }

    // --- STEP 4: APPLY CANCELLATION (IMMUTABLY) ---
    const updatedOrders = orders.map(o =>
        o.orderId === orderId ? { ...o, status: "CANCELLED" } : o
    );

    // --- STEP 5: RETURN SUCCESS RESULT ---
    return { cancelled: true, orders: updatedOrders };
};

// --- EXAMPLE USAGE ---
console.log(cancelOrder(
    [
        { orderId: "ORD-1", customerName: "Hasib", totalAmount: 2500, status: "PENDING" },
        { orderId: "ORD-2", customerName: "Lina", totalAmount: 800, status: "DELIVERED" }
    ],
    "ORD-2"
));