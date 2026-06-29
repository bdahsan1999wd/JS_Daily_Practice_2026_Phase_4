// PROBLEM-01: createOrder()

// Logic: Creates a new order from a request, computes its total amount, and appends it to the order list — only if the orderId doesn't already exist. Never mutates the original array.

const createOrder = (orders, newOrderRequest) => {

    // --- STEP 1: VALIDATION ---
    // 1a) orders must be an array
    if (!Array.isArray(orders)) return "Invalid Input";
    // 1b) newOrderRequest must be a plain object
    if (typeof newOrderRequest !== "object" || newOrderRequest === null || Array.isArray(newOrderRequest)) {
        return "Invalid Input";
    }
    // 1c) every existing order must at least have a valid orderId
    for (let i = 0; i < orders.length; i++) {
        const o = orders[i];
        if (!o || typeof o !== "object") return "Invalid Input";
        if (typeof o.orderId !== "string") return "Invalid Input";
    }
    // 1d) validate the new order request's own fields
    const { orderId, customerName, items } = newOrderRequest;
    if (typeof orderId !== "string" || orderId === "") return "Invalid Input";
    if (typeof customerName !== "string" || customerName === "") return "Invalid Input";
    if (!Array.isArray(items) || items.length === 0) return "Invalid Input";
    // 1e) validate each item inside the order
    for (let i = 0; i < items.length; i++) {
        const it = items[i];
        if (!it || typeof it !== "object") return "Invalid Input";
        if (typeof it.name !== "string" || it.name === "") return "Invalid Input";
        if (typeof it.price !== "number" || it.price <= 0) return "Invalid Input";
        if (typeof it.qty !== "number" || !Number.isInteger(it.qty) || it.qty < 1) return "Invalid Input";
    }

    // --- STEP 2: CHECK FOR DUPLICATE ORDER ID ---
    const isDuplicate = orders.some(o => o.orderId === orderId);
    if (isDuplicate) {
        return { created: false, reason: "Order ID already exists", orders };
    }

    // --- STEP 3: COMPUTE TOTAL AMOUNT ---
    // sum of (price * qty) across all items in this order
    const totalAmount = items.reduce((sum, it) => sum + (it.price * it.qty), 0);

    // --- STEP 4: BUILD THE NEW ORDER & APPEND IT (IMMUTABLY) ---
    const newOrder = { orderId, customerName, items, totalAmount, status: "PENDING" };
    const updatedOrders = [...orders, newOrder];

    // --- STEP 5: RETURN SUCCESS RESULT ---
    return { created: true, orders: updatedOrders, totalAmount };
};

// --- EXAMPLE USAGE ---
console.log(createOrder(
    [],
    { orderId: "ORD-1", customerName: "Hasib", items: [{ name: "Bag", price: 1200, qty: 2 }, { name: "Pen", price: 20, qty: 5 }] }
));