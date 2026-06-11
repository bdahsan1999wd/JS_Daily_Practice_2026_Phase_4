// 🧩 PROBLEM–03: extractOrderSections()

// Logic: This function normalizes a flat order object data sheet and uses structured destructuring to distribute internal data into cohesive categorical subdivisions.

function extractOrderSections(orderRecord) {

    // --- STEP 1: VALIDATION ---
    // Ensure record object is intact and contains all mandatory fields.
    if (!orderRecord || typeof orderRecord !== "object" || Array.isArray(orderRecord)) {
        return "Invalid Input";
    }

    const requiredKeys = [
        "orderId", "customerId", "customerName", "email", "items",
        "totalAmount", "deliveryCharge", "grandTotal", "deliveryCity",
        "deliveryMethod", "status", "orderedAt"
    ];

    for (const key of requiredKeys) {
        if (!orderRecord.hasOwnProperty(key)) {
            return "Invalid Input";
        }
    }

    // Further type safety check for array mapping inside summary calculations
    if (!Array.isArray(orderRecord.items)) {
        return "Invalid Input";
    }

    // --- STEP 2: OBJECT FIELD DESTRUCTURING ---
    const {
        customerId, customerName, email,
        orderId, items, totalAmount, status,
        deliveryCity, deliveryMethod, deliveryCharge, grandTotal,
        orderedAt
    } = orderRecord;

    // --- STEP 3: ASSEMBLE SECTIONS WRAPPER ---
    return {
        customer: { customerId, customerName, email },
        order: { orderId, items, totalAmount, status },
        delivery: { deliveryCity, deliveryMethod, deliveryCharge, grandTotal },
        orderSummary: {
            placedOn: orderedAt,
            itemCount: items.length,
            isDelivered: status === "DELIVERED"
        }
    };
}

// --- EXAMPLE USAGE ---
console.log(
    extractOrderSections({
        orderId: "ORD-003",
        customerId: "C002",
        customerName: "Sabbir Khan",
        email: "sabbir@mail.com",
        items: ["Chair", "Desk", "Lamp"],
        totalAmount: 25000,
        deliveryCharge: 500,
        grandTotal: 25500,
        deliveryCity: "Chittagong",
        deliveryMethod: "OVERNIGHT",
        status: "DELIVERED",
        orderedAt: "2025-01-01"
    })
);

console.log(extractOrderSections({ orderId: "ORD-MIA" }));