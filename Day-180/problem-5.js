// PROBLEM-05: runInventoryWorkflow()

// Logic: This is the "orchestrator" — it composes the behaviour of addProduct(), removeProduct(), updateStock() and lowStockAlert() into ONE pipeline. Operations run in order, each acting on the result of the previous one. A failed operation does NOT change inventory but processing still continues afterward.

const runInventoryWorkflow = (initialInventory, operations) => {

    // --- STEP 1: VALIDATION ---
    // 1a) initialInventory must be an array of valid product objects
    if (!Array.isArray(initialInventory)) return "Invalid Input";
    if (!Array.isArray(operations)) return "Invalid Input";
    for (let i = 0; i < initialInventory.length; i++) {
        const p = initialInventory[i];
        if (!p || typeof p !== "object") return "Invalid Input";
        if (typeof p.productId !== "string") return "Invalid Input";
        if (typeof p.name !== "string") return "Invalid Input";
        if (typeof p.quantity !== "number") return "Invalid Input";
        if (typeof p.unitPrice !== "number") return "Invalid Input";
    }
    // 1b) every operation must have a recognized "type"
    for (let i = 0; i < operations.length; i++) {
        const op = operations[i];
        if (!op || typeof op !== "object") return "Invalid Input";
        if (!["ADD", "REMOVE", "UPDATE_STOCK"].includes(op.type)) return "Invalid Input";
    }

    // --- STEP 2: PROCESS OPERATIONS SEQUENTIALLY ---
    // `currentInventory` is our running "state" — each operation reads
    // from it and (if successful) produces the next version of it.
    // This is exactly how addProduct/removeProduct/updateStock would
    // chain together if you called them one after another.
    let currentInventory = initialInventory;
    const operationLog = [];

    for (let i = 0; i < operations.length; i++) {
        const op = operations[i];

        if (op.type === "ADD") {
            // --- inline equivalent of addProduct() logic ---
            const newProduct = op.product;
            const isDuplicate = currentInventory.some(p => p.productId === newProduct?.productId);

            if (isDuplicate) {
                operationLog.push({ type: "ADD", success: false, reason: "Product ID already exists" });
                // inventory unchanged, move on to the next operation
            } else {
                currentInventory = [...currentInventory, newProduct];
                operationLog.push({ type: "ADD", success: true, reason: null });
            }

        } else if (op.type === "REMOVE") {
            // --- inline equivalent of removeProduct() logic ---
            const exists = currentInventory.some(p => p.productId === op.productId);

            if (!exists) {
                operationLog.push({ type: "REMOVE", success: false, reason: "Product not found" });
            } else {
                currentInventory = currentInventory.filter(p => p.productId !== op.productId);
                operationLog.push({ type: "REMOVE", success: true, reason: null });
            }

        } else if (op.type === "UPDATE_STOCK") {
            // --- inline equivalent of updateStock() logic ---
            const targetProduct = currentInventory.find(p => p.productId === op.productId);

            if (!targetProduct) {
                operationLog.push({ type: "UPDATE_STOCK", success: false, reason: "Product not found" });
            } else {
                const newQuantity = targetProduct.quantity + op.quantityChange;
                if (newQuantity < 0) {
                    operationLog.push({ type: "UPDATE_STOCK", success: false, reason: "Insufficient stock for this operation" });
                } else {
                    currentInventory = currentInventory.map(p =>
                        p.productId === op.productId ? { ...p, quantity: newQuantity } : p
                    );
                    operationLog.push({ type: "UPDATE_STOCK", success: true, reason: null });
                }
            }
        }
    }

    // --- STEP 3: RUN FINAL LOW-STOCK CHECK (threshold = 10) ---
    // inline equivalent of lowStockAlert() — we only need the final message here
    const threshold = 10;
    const criticalStock = currentInventory.filter(p => p.quantity === 0);
    const lowStock = currentInventory.filter(p => p.quantity > 0 && p.quantity <= threshold);

    let finalAlertMessage;
    if (criticalStock.length > 0) {
        finalAlertMessage = `URGENT: ${criticalStock.length} product(s) out of stock!`;
    } else if (lowStock.length > 0) {
        finalAlertMessage = `WARNING: ${lowStock.length} product(s) running low.`;
    } else {
        finalAlertMessage = "All stock levels healthy.";
    }

    // --- STEP 4: RETURN FINAL RESULT ---
    return {
        finalInventory: currentInventory,
        operationLog,
        finalAlertMessage
    };
};

// --- EXAMPLE USAGE ---
console.log(runInventoryWorkflow(
    [{ productId: "P1", name: "Pen", quantity: 20, unitPrice: 5 }],
    [
        { type: "ADD", product: { productId: "P2", name: "Notebook", quantity: 5, unitPrice: 25 } },
        { type: "UPDATE_STOCK", productId: "P1", quantityChange: -15 },
        { type: "REMOVE", productId: "P3" }
    ]
));