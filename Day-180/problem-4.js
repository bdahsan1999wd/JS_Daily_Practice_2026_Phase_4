// PROBLEM-04: lowStockAlert()

// Logic: Buckets all products into critical / low / healthy stock groups based on a threshold, and produces a summary message.

const lowStockAlert = (inventory, threshold) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(inventory)) return "Invalid Input";
    if (typeof threshold !== "number" || isNaN(threshold) || threshold < 0) return "Invalid Input";

    // --- STEP 2: BUCKET PRODUCTS BY STOCK LEVEL ---
    const criticalStock = inventory.filter(p => p.quantity === 0);                          // completely out
    const lowStock = inventory.filter(p => p.quantity > 0 && p.quantity <= threshold);      // running low
    const healthyStock = inventory.filter(p => p.quantity > threshold);                     // plenty in stock

    // --- STEP 3: BUILD THE ALERT MESSAGE (priority: critical > low > healthy) ---
    let alertMessage;
    if (criticalStock.length > 0) {
        alertMessage = `URGENT: ${criticalStock.length} product(s) out of stock!`;
    } else if (lowStock.length > 0) {
        alertMessage = `WARNING: ${lowStock.length} product(s) running low.`;
    } else {
        alertMessage = "All stock levels healthy.";
    }

    // --- STEP 4: RETURN RESULT ---
    return { criticalStock, lowStock, healthyStock, alertMessage };
};

// --- EXAMPLE USAGE ---
console.log(lowStockAlert([
    { productId: "P1", name: "Pen", quantity: 0, unitPrice: 5 },
    { productId: "P2", name: "Notebook", quantity: 8, unitPrice: 25 },
    { productId: "P3", name: "Stapler", quantity: 40, unitPrice: 80 }
], 10));