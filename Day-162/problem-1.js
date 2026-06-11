// 🧩 PROBLEM–01: buildOrderRecord()

// Logic: This function integrates customer, order details, and delivery information into a unified order object using the spread operator while computing delivery charges and grand totals dynamically based on the delivery choice.

function buildOrderRecord(customerInfo, orderDetails, deliveryInfo) {

    // --- STEP 1: VALIDATION ---
    // Ensure all three inputs are valid objects and not null or arrays.
    if (
        !customerInfo || typeof customerInfo !== "object" || Array.isArray(customerInfo) ||
        !orderDetails || typeof orderDetails !== "object" || Array.isArray(orderDetails) ||
        !deliveryInfo || typeof deliveryInfo !== "object" || Array.isArray(deliveryInfo)
    ) {
        return "Invalid Input";
    }

    // Validate customerInfo fields
    const { customerId, customerName, email } = customerInfo;
    if (
        typeof customerId !== "string" || customerId.trim() === "" ||
        typeof customerName !== "string" || customerName.trim() === "" ||
        typeof email !== "string" || !email.includes("@")
    ) {
        return "Invalid Input";
    }

    // Validate orderDetails fields
    const { orderId, items, totalAmount } = orderDetails;
    if (
        typeof orderId !== "string" || orderId.trim() === "" ||
        !Array.isArray(items) || items.length < 1 ||
        typeof totalAmount !== "number" || totalAmount <= 0
    ) {
        return "Invalid Input";
    }

    // Validate deliveryInfo fields
    const { deliveryCity, deliveryMethod } = deliveryInfo;
    if (
        typeof deliveryCity !== "string" || deliveryCity.trim() === "" ||
        typeof deliveryMethod !== "string" || !["STANDARD", "EXPRESS", "OVERNIGHT"].includes(deliveryMethod)
    ) {
        return "Invalid Input";
    }

    // --- STEP 2: CALCULATE COMPUTED FIELDS ---
    let deliveryCharge;
    if (deliveryMethod === "OVERNIGHT") {
        deliveryCharge = 500;
    } else if (deliveryMethod === "EXPRESS") {
        deliveryCharge = 250;
    } else {
        deliveryCharge = 100;
    }

    const grandTotal = totalAmount + deliveryCharge;

    // --- STEP 3: RETURN INTEGRATED ORDER RECORD ---
    return {
        ...customerInfo,
        ...orderDetails,
        ...deliveryInfo,
        deliveryCharge,
        grandTotal,
        orderedAt: "2025-01-01",
        status: "PENDING"
    };
}

// --- EXAMPLE USAGE ---
console.log(
    buildOrderRecord(
        { customerId: "C001", customerName: "Farhan Hossain", email: "farhan@mail.com" },
        { orderId: "ORD-001", items: ["Laptop", "Mouse"], totalAmount: 85000 },
        { deliveryCity: "Dhaka", deliveryMethod: "EXPRESS" }
    )
);

console.log(buildOrderRecord({ customerId: "C001" }, {}, null));