// PROBLEM-01: addProduct()

// Logic: Adds a new product into inventory, but only if its productId doesn't already exist. Never mutates the original array.

const addProduct = (inventory, newProduct) => {

    // --- STEP 1: VALIDATION ---
    // 1a) inventory must be an array
    if (!Array.isArray(inventory)) return "Invalid Input";
    // 1b) newProduct must be a plain object
    if (typeof newProduct !== "object" || newProduct === null || Array.isArray(newProduct)) {
        return "Invalid Input";
    }
    // 1c) every existing item in inventory must have the right shape
    for (let i = 0; i < inventory.length; i++) {
        const p = inventory[i];
        if (!p || typeof p !== "object") return "Invalid Input";
        if (typeof p.productId !== "string") return "Invalid Input";
        if (typeof p.name !== "string") return "Invalid Input";
        if (typeof p.quantity !== "number") return "Invalid Input";
        if (typeof p.unitPrice !== "number") return "Invalid Input";
    }
    // 1d) validate newProduct's own fields
    const { productId, name, quantity, unitPrice } = newProduct;
    if (typeof productId !== "string" || productId === "") return "Invalid Input";
    if (typeof name !== "string" || name === "") return "Invalid Input";
    if (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity < 0) return "Invalid Input";
    if (typeof unitPrice !== "number" || unitPrice <= 0) return "Invalid Input";

    // --- STEP 2: CHECK FOR DUPLICATE PRODUCT ID ---
    const isDuplicate = inventory.some(p => p.productId === productId);
    if (isDuplicate) {
        // reject — keep original inventory untouched
        return { added: false, reason: "Product ID already exists", inventory };
    }

    // --- STEP 3: ADD THE PRODUCT (IMMUTABLY) ---
    // Use spread to build a BRAND NEW array instead of push() on the original
    const updatedInventory = [...inventory, newProduct];

    // --- STEP 4: RETURN SUCCESS RESULT ---
    return { added: true, inventory: updatedInventory, totalProducts: updatedInventory.length };
};

// --- EXAMPLE USAGE ---
console.log(addProduct(
    [{ productId: "P1", name: "Pen", quantity: 100, unitPrice: 5 }],
    { productId: "P2", name: "Notebook", quantity: 50, unitPrice: 25 }
));