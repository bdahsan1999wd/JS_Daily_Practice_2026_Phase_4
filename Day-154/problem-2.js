// 🧩 PROBLEM–02: filterCartByCategory()

// Logic: This function filters cart items based on a case-insensitive category match and a minimum quantity criteria, sorts them by price in descending order, and returns the filtered array.

function filterCartByCategory(cartItems, category) {

    // --- STEP 1: VALIDATION ---
    // Ensure cartItems is a non-empty array and category is a valid string.
    if (!Array.isArray(cartItems) || cartItems.length === 0 || typeof category !== "string") {
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

    // --- STEP 2: FILTER AND SORT THE CART ---
    const targetCategory = category.toLowerCase();

    return cartItems
        .filter(item => item.category.toLowerCase() === targetCategory && item.quantity >= 2)
        .sort((a, b) => b.price - a.price);
}

// --- EXAMPLE USAGE ---
console.log(
    filterCartByCategory([
        { name: "T-Shirt", category: "Clothing", price: 800, quantity: 3, discountPercent: 5 },
        { name: "Jeans", category: "Clothing", price: 1500, quantity: 1, discountPercent: 10 },
        { name: "Laptop", category: "Electronics", price: 70000, quantity: 2, discountPercent: 0 }
    ], "clothing")
);

console.log(
    filterCartByCategory([], 123)
);