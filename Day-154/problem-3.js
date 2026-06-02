// 🧩 PROBLEM–03: generateCartSummary()

// Logic: This function computes total counts, total quantities, monetary amounts, category-specific distributions, and identifies the unit-wise highest priced item.

function generateCartSummary(cartItems) {

    // --- STEP 1: VALIDATION ---
    // Ensure cartItems is a non-empty array.
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
        return "Invalid Input";
    }

    for (const item of cartItems) {
        if (
            !item ||
            typeof item.name !== "string" ||
            typeof item.category !== "string" ||
            typeof item.price !== "number" || item.price <= 0 ||
            typeof item.quantity !== "number" || !Number.isInteger(item.quantity) || item.quantity < 1 ||
            typeof item.discountPercent !== "number" || item.discountPercent < 0 || item.discountPercent > 100
        ) {
            return "Invalid Input";
        }
    }

    // --- STEP 2: INITIALIZE SUMMARY METRICS ---
    const totalItems = cartItems.length;
    let totalQuantity = 0;
    let subtotal = 0;
    let totalDiscount = 0;
    let mostExpensiveItem = cartItems[0];
    const categoryWiseTotal = {};

    // --- STEP 3: RUN AGGREGATIONS ---
    cartItems.forEach(item => {
        const itemCost = item.price * item.quantity;
        const itemDiscount = (itemCost * item.discountPercent) / 100;

        totalQuantity += item.quantity;
        subtotal += itemCost;
        totalDiscount += itemDiscount;

        if (item.price > mostExpensiveItem.price) {
            mostExpensiveItem = item;
        }

        if (!categoryWiseTotal[item.category]) {
            categoryWiseTotal[item.category] = 0;
        }
        categoryWiseTotal[item.category] += itemCost;
    });

    for (const key in categoryWiseTotal) {
        categoryWiseTotal[key] = Number(categoryWiseTotal[key].toFixed(2));
    }

    // --- STEP 4: RETURN FORMATTED RESULT ---
    return {
        totalItems,
        totalQuantity,
        subtotal: Number(subtotal.toFixed(2)),
        totalDiscount: Number(totalDiscount.toFixed(2)),
        grandTotal: Number((subtotal - totalDiscount).toFixed(2)),
        mostExpensiveItem: { ...mostExpensiveItem },
        categoryWiseTotal
    };
}

// --- EXAMPLE USAGE ---
console.log(
    generateCartSummary([
        { name: "Bag", category: "Accessories", price: 1200, quantity: 2, discountPercent: 10 },
        { name: "Watch", category: "Accessories", price: 5000, quantity: 1, discountPercent: 5 },
        { name: "Phone", category: "Electronics", price: 30000, quantity: 1, discountPercent: 0 }
    ])
);

console.log(
    generateCartSummary(null)
);