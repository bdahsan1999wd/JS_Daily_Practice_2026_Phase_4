// PROBLEM-03: refundOrder()

// Logic: Refunds an order — but ONLY if it's currently DELIVERED. Marks the order REFUNDED and records the reason + amount.

const refundOrder = (orders, orderId, refundReason) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(orders)) return "Invalid Input";
    if (typeof orderId !== "string" || orderId === "") return "Invalid Input";
    if (typeof refundReason !== "string" || refundReason === "") return "Invalid Input";
    for (let i = 0; i < orders.length; i++) {
        const o = orders[i];
        if (!o || typeof o !== "object") return "Invalid Input";
        if (typeof o.orderId !== "string") return "Invalid Input";
        if (typeof o.status !== "string") return "Invalid Input";
        if (typeof o.totalAmount !== "number") return "Invalid Input";
    }

    // --- STEP 2: LOCATE THE TARGET ORDER ---
    const targetOrder = orders.find(o => o.orderId === orderId);
    if (!targetOrder) {
        return { refunded: false, reason: "Order not found", orders };
    }

    // --- STEP 3: ELIGIBILITY CHECK ---
    // only DELIVERED orders are eligible for a refund
    if (targetOrder.status !== "DELIVERED") {
        return { refunded: false, reason: "Only delivered orders can be refunded", orders };
    }

    // --- STEP 4: APPLY REFUND (IMMUTABLY) ---
    // refundAmount is simply the order's original totalAmount
    const refundAmount = targetOrder.totalAmount;
    const updatedOrders = orders.map(o =>
        o.orderId === orderId
            ? { ...o, status: "REFUNDED", refundReason, refundAmount }
            : o
    );

    // --- STEP 5: RETURN SUCCESS RESULT ---
    return { refunded: true, orders: updatedOrders, refundAmount };
};

// --- EXAMPLE USAGE ---
console.log(refundOrder(
    [{ orderId: "ORD-2", customerName: "Lina", totalAmount: 800, status: "DELIVERED" }],
    "ORD-2",
    "Item damaged on arrival"
));