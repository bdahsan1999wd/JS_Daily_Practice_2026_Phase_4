// PROBLEM-02: removeProduct()

// Logic: Removes a product by ID, only if it actually exists. Never mutates the original array.

const removeProduct = (inventory, productId) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(inventory)) return "Invalid Input";
    if (typeof productId !== "string" || productId === "") return "Invalid Input";
    for (let i = 0; i < inventory.length; i++) {
        const p = inventory[i];
        if (!p || typeof p !== "object") return "Invalid Input";
        if (typeof p.productId !== "string") return "Invalid Input";
    }

    // --- STEP 2: CHECK PRODUCT EXISTS ---
    const exists = inventory.some(p => p.productId === productId);
    if (!exists) {
        return { removed: false, reason: "Product not found", inventory };
    }

    // --- STEP 3: REMOVE THE PRODUCT (IMMUTABLY) ---
    // filter() naturally returns a new array, leaving original untouched
    const updatedInventory = inventory.filter(p => p.productId !== productId);

    // --- STEP 4: RETURN SUCCESS RESULT ---
    return { removed: true, inventory: updatedInventory, totalProducts: updatedInventory.length };
};

// --- EXAMPLE USAGE ---
console.log(removeProduct(
    [
        { productId: "P1", name: "Pen", quantity: 100, unitPrice: 5 },
        { productId: "P2", name: "Notebook", quantity: 50, unitPrice: 25 }
    ],
    "P1"
));