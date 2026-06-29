// PROBLEM-05: runOrderWorkflow()

// Logic: The "orchestrator" — composes createOrder(), cancelOrder(), and refundOrder() into ONE sequential pipeline. Each operation acts on the result of the previous one. Failed operations don't change the order list, but processing still continues to the next operation in line.

const runOrderWorkflow = (initialOrders, operations) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(initialOrders)) return "Invalid Input";
    if (!Array.isArray(operations)) return "Invalid Input";
    for (let i = 0; i < initialOrders.length; i++) {
        const o = initialOrders[i];
        if (!o || typeof o !== "object") return "Invalid Input";
        if (typeof o.orderId !== "string") return "Invalid Input";
        if (typeof o.status !== "string") return "Invalid Input";
    }
    for (let i = 0; i < operations.length; i++) {
        const op = operations[i];
        if (!op || typeof op !== "object") return "Invalid Input";
        if (!["CREATE", "CANCEL", "REFUND"].includes(op.type)) return "Invalid Input";
    }

    // --- STEP 2: PROCESS OPERATIONS SEQUENTIALLY ---
    // `currentOrders` is our running "state" — each operation reads from
    // it, and (if successful) produces the next version for the next step.
    let currentOrders = initialOrders;
    const operationLog = [];

    for (let i = 0; i < operations.length; i++) {
        const op = operations[i];

        if (op.type === "CREATE") {
            // --- inline equivalent of createOrder() logic ---
            const req = op.orderRequest;
            const isDuplicate = currentOrders.some(o => o.orderId === req?.orderId);

            if (isDuplicate) {
                operationLog.push({ type: "CREATE", success: false, reason: "Order ID already exists" });
                // currentOrders stays the same, move to next operation
            } else {
                const totalAmount = req.items.reduce((sum, it) => sum + (it.price * it.qty), 0);
                const newOrder = {
                    orderId: req.orderId,
                    customerName: req.customerName,
                    items: req.items,
                    totalAmount,
                    status: "PENDING"
                };
                currentOrders = [...currentOrders, newOrder];
                operationLog.push({ type: "CREATE", success: true, reason: null });
            }

        } else if (op.type === "CANCEL") {
            // --- inline equivalent of cancelOrder() logic ---
            const targetOrder = currentOrders.find(o => o.orderId === op.orderId);

            if (!targetOrder) {
                operationLog.push({ type: "CANCEL", success: false, reason: "Order not found" });
            } else if (targetOrder.status === "CANCELLED") {
                operationLog.push({ type: "CANCEL", success: false, reason: "Order is already cancelled" });
            } else if (targetOrder.status === "DELIVERED") {
                operationLog.push({ type: "CANCEL", success: false, reason: "Cannot cancel a delivered order" });
            } else {
                currentOrders = currentOrders.map(o =>
                    o.orderId === op.orderId ? { ...o, status: "CANCELLED" } : o
                );
                operationLog.push({ type: "CANCEL", success: true, reason: null });
            }

        } else if (op.type === "REFUND") {
            // --- inline equivalent of refundOrder() logic ---
            const targetOrder = currentOrders.find(o => o.orderId === op.orderId);

            if (!targetOrder) {
                operationLog.push({ type: "REFUND", success: false, reason: "Order not found" });
            } else if (targetOrder.status !== "DELIVERED") {
                operationLog.push({ type: "REFUND", success: false, reason: "Only delivered orders can be refunded" });
            } else {
                const refundAmount = targetOrder.totalAmount;
                currentOrders = currentOrders.map(o =>
                    o.orderId === op.orderId
                        ? { ...o, status: "REFUNDED", refundReason: op.refundReason, refundAmount }
                        : o
                );
                operationLog.push({ type: "REFUND", success: true, reason: null });
            }
        }
    }

    // --- STEP 3: BUILD FINAL SUMMARY (counts grouped by status) ---
    const totalOrders = currentOrders.length;
    const pendingCount = currentOrders.filter(o => o.status === "PENDING").length;
    const cancelledCount = currentOrders.filter(o => o.status === "CANCELLED").length;
    const refundedCount = currentOrders.filter(o => o.status === "REFUNDED").length;
    const deliveredCount = currentOrders.filter(o => o.status === "DELIVERED").length;

    const summary = { totalOrders, pendingCount, cancelledCount, refundedCount, deliveredCount };

    // --- STEP 4: RETURN FINAL RESULT ---
    return { finalOrders: currentOrders, operationLog, summary };
};

// --- EXAMPLE USAGE ---
console.log(runOrderWorkflow(
    [{ orderId: "ORD-9", customerName: "Mina", items: [{ name: "Book", price: 300, qty: 1 }], totalAmount: 300, status: "DELIVERED" }],
    [
        { type: "CREATE", orderRequest: { orderId: "ORD-10", customerName: "Rafi", items: [{ name: "Cup", price: 150, qty: 2 }] } },
        { type: "REFUND", orderId: "ORD-9", refundReason: "Wrong item" },
        { type: "CANCEL", orderId: "ORD-99" }
    ]
));