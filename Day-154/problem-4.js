// 🧩 PROBLEM–04: validateCart()

// Logic: This function checks if ordered quantities are within current inventory stocks, tracks missing stocks, over-ordered configurations, and lists problematic item designations.

function validateCart(cartItems) {

    // --- STEP 1: VALIDATION ---
    // Ensure cartItems is a non-empty array.
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
        return "Invalid Input";
    }

    for (const item of cartItems) {
        if (
            !item ||
            typeof item.name !== "string" ||
            typeof item.price !== "number" || item.price <= 0 ||
            typeof item.quantity !== "number" || !Number.isInteger(item.quantity) || item.quantity < 1 ||
            typeof item.stock !== "number" || !Number.isInteger(item.stock) || item.stock < 0 ||
            typeof item.discountPercent !== "number" || item.discountPercent < 0 || item.discountPercent > 100
        ) {
            return "Invalid Input";
        }
    }

    // --- STEP 2: CHECK QUANTITY VS STOCK STATUS ---
    const isCartValid = cartItems.every(item => item.quantity <= item.stock);
    const hasOutOfStockItem = cartItems.some(item => item.stock === 0);
    const hasOverOrderedItem = cartItems.some(item => item.quantity > item.stock && item.stock > 0);

    const problematicItems = cartItems
        .filter(item => item.quantity > item.stock)
        .map(item => item.name);

    // --- STEP 3: RETURN TRUTH OBJECT ---
    return {
        isCartValid,
        hasOutOfStockItem,
        hasOverOrderedItem,
        problematicItems
    };
}

// --- EXAMPLE USAGE ---
console.log(
    validateCart([
        { name: "Cap", price: 300, quantity: 5, stock: 3, discountPercent: 0 },
        { name: "Belt", price: 700, quantity: 2, stock: 0, discountPercent: 5 },
        { name: "Sock", price: 150, quantity: 3, stock: 10, discountPercent: 0 }
    ])
);

console.log(
    validateCart([])
);