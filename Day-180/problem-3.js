// PROBLEM-03: updateStock()

// Logic: Adjusts a product's quantity up (restock) or down (sale). Blocks the change if it would push stock below zero.

const updateStock = (inventory, productId, quantityChange) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(inventory)) return "Invalid Input";
    if (typeof productId !== "string" || productId === "") return "Invalid Input";
    if (typeof quantityChange !== "number" || !Number.isInteger(quantityChange)) return "Invalid Input";
    for (let i = 0; i < inventory.length; i++) {
        const p = inventory[i];
        if (!p || typeof p !== "object") return "Invalid Input";
        if (typeof p.productId !== "string") return "Invalid Input";
        if (typeof p.quantity !== "number") return "Invalid Input";
    }

    // --- STEP 2: LOCATE THE TARGET PRODUCT ---
    const targetProduct = inventory.find(p => p.productId === productId);
    if (!targetProduct) {
        return { updated: false, reason: "Product not found", inventory };
    }

    // --- STEP 3: CALCULATE NEW QUANTITY & GUARD AGAINST NEGATIVE STOCK ---
    const newQuantity = targetProduct.quantity + quantityChange;
    if (newQuantity < 0) {
        // reject the change entirely — original inventory stays as-is
        return { updated: false, reason: "Insufficient stock for this operation", inventory };
    }

    // --- STEP 4: CLASSIFY THE OPERATION TYPE ---
    let operationType;
    if (quantityChange > 0) operationType = "RESTOCK";
    else if (quantityChange < 0) operationType = "DEDUCTION";
    else operationType = "NO_CHANGE";

    // --- STEP 5: APPLY THE UPDATE (IMMUTABLY) ---
    // map() rebuilds the array; only the matching product gets a new quantity
    const updatedInventory = inventory.map(p =>
        p.productId === productId ? { ...p, quantity: newQuantity } : p
    );

    // --- STEP 6: RETURN SUCCESS RESULT ---
    return { updated: true, inventory: updatedInventory, operationType, newQuantity };
};

// --- EXAMPLE USAGE ---
console.log(updateStock(
    [{ productId: "P2", name: "Notebook", quantity: 50, unitPrice: 25 }],
    "P2",
    -60
));