// 🧩 PROBLEM–01: calculateCartItems()

// Logic: This function processes an array of cart item objects, calculates the original total, discount amount, and final total for each item, and returns an array with the computed fields.

function calculateCartItems(cartItems) {

    // --- STEP 1: VALIDATION ---
    // Ensure cartItems is a non-empty array.
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
        return "Invalid Input";
    }

    // --- STEP 2: PROCESS EACH ITEM ---
    // Validate individual fields and calculate values.
    for (const item of cartItems) {
        if (
            !item ||
            typeof item.name !== "string" ||
            typeof item.price !== "number" || item.price <= 0 ||
            typeof item.quantity !== "number" || !Number.isInteger(item.quantity) || item.quantity < 1 ||
            typeof item.discountPercent !== "number" || item.discountPercent < 0 || item.discountPercent > 100
        ) {
            return "Invalid Input";
        }
    }

    // --- STEP 3: RETURN TRANSFORMED ARRAY ---
    return cartItems.map(item => {
        const { name, price, quantity, discountPercent } = item;

        const originalTotal = price * quantity;
        const discountAmount = (originalTotal * discountPercent) / 100;
        const finalTotal = originalTotal - discountAmount;

        return {
            name,
            originalTotal: Number(originalTotal.toFixed(2)),
            discountAmount: Number(discountAmount.toFixed(2)),
            finalTotal: Number(finalTotal.toFixed(2))
        };
    });
}

// --- EXAMPLE USAGE ---
console.log(
    calculateCartItems([
        { name: "Shirt", price: 500, quantity: 3, discountPercent: 10 },
        { name: "Shoes", price: 2000, quantity: 1, discountPercent: 0 }
    ])
);

console.log(
    calculateCartItems("invalid")
);