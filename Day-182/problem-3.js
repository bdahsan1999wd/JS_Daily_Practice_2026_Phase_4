// PROBLEM-03: bestCustomer()

// Logic: Aggregates orders per customer, finds the highest spender, and assigns them a loyalty tier based on how many orders they've made.

const bestCustomer = (customerOrders) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(customerOrders) || customerOrders.length === 0) return "Invalid Input";
    for (let i = 0; i < customerOrders.length; i++) {
        const c = customerOrders[i];
        if (!c || typeof c !== "object") return "Invalid Input";
        if (typeof c.customerName !== "string" || c.customerName === "") return "Invalid Input";
        if (typeof c.orderAmount !== "number" || c.orderAmount <= 0) return "Invalid Input";
    }

    // --- STEP 2: AGGREGATE SPENDING PER CUSTOMER ---
    const aggregateMap = {};
    for (let i = 0; i < customerOrders.length; i++) {
        const { customerName, orderAmount } = customerOrders[i];
        if (!aggregateMap[customerName]) {
            aggregateMap[customerName] = { customerName, totalSpent: 0, orderCount: 0 };
        }
        aggregateMap[customerName].totalSpent += orderAmount;
        aggregateMap[customerName].orderCount += 1;
    }

    // --- STEP 3: FIND THE CUSTOMER WITH THE HIGHEST totalSpent ---
    const allCustomers = Object.values(aggregateMap);
    let topCustomer = allCustomers[0];
    for (let i = 1; i < allCustomers.length; i++) {
        if (allCustomers[i].totalSpent > topCustomer.totalSpent) {
            topCustomer = allCustomers[i];
        }
    }

    // --- STEP 4: COMPUTE AVERAGE ORDER VALUE FOR THE TOP CUSTOMER ---
    const avgOrderValue = Number((topCustomer.totalSpent / topCustomer.orderCount).toFixed(2));

    // --- STEP 5: ASSIGN LOYALTY TIER BASED ON orderCount ---
    let loyaltyTier;
    if (topCustomer.orderCount >= 5) loyaltyTier = "VIP";
    else if (topCustomer.orderCount >= 2) loyaltyTier = "REGULAR";
    else loyaltyTier = "NEW";

    // --- STEP 6: RETURN RESULT ---
    return {
        bestCustomer: {
            customerName: topCustomer.customerName,
            totalSpent: topCustomer.totalSpent,
            orderCount: topCustomer.orderCount,
            avgOrderValue
        },
        loyaltyTier
    };
};

// --- EXAMPLE USAGE ---
console.log(bestCustomer([
    { customerName: "Tania", orderAmount: 500 },
    { customerName: "Tania", orderAmount: 300 },
    { customerName: "Rafi", orderAmount: 1000 }
]));