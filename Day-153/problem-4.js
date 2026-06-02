// 🧩 PROBLEM–04: validateInventoryStatus()

// Logic: This function validates inventory status using every() and some() methods and identifies products with critical stock levels.

function validateInventoryStatus(products) {

    // --- STEP 1: VALIDATION ---
    // Ensure products is a non-empty array.

    if (
        !Array.isArray(products) ||
        products.length === 0
    ) {
        return "Invalid Input";
    }

    // --- STEP 2: VALIDATE ALL PRODUCTS ---
    // Every product must contain:
    // name (string)
    // price (number > 0)
    // stock (number >= 0)
    // minStockRequired (number >= 0)

    for (const product of products) {

        const {
            name,
            price,
            stock,
            minStockRequired
        } = product;

        if (
            typeof name !== "string" ||
            typeof price !== "number" ||
            price <= 0 ||
            typeof stock !== "number" ||
            stock < 0 ||
            typeof minStockRequired !== "number" ||
            minStockRequired < 0
        ) {
            return "Invalid Input";
        }
    }

    // --- STEP 3: CHECK FULLY STOCKED STATUS ---
    // True if all products meet minimum stock requirement.

    const isFullyStocked = products.every(
        product =>
            product.stock >=
            product.minStockRequired
    );

    // --- STEP 4: CHECK OUT OF STOCK STATUS ---
    // True if any product has stock === 0.

    const hasOutOfStock = products.some(
        product => product.stock === 0
    );

    // --- STEP 5: CHECK CRITICAL STOCK STATUS ---
    // True if stock > 0 but below minimum requirement.

    const hasCriticalStock = products.some(
        product =>
            product.stock > 0 &&
            product.stock <
            product.minStockRequired
    );

    // --- STEP 6: FIND CRITICAL PRODUCTS ---

    const criticalProducts = products
        .filter(
            product =>
                product.stock > 0 &&
                product.stock <
                product.minStockRequired
        )
        .map(product => product.name);

    // --- STEP 7: RETURN RESULT OBJECT ---

    return {
        isFullyStocked,
        hasOutOfStock,
        hasCriticalStock,
        criticalProducts
    };
}

// --- EXAMPLE USAGE ---
console.log(
    validateInventoryStatus([
        {
            name: "X",
            price: 500,
            stock: 2,
            minStockRequired: 5
        },
        {
            name: "Y",
            price: 300,
            stock: 0,
            minStockRequired: 3
        },
        {
            name: "Z",
            price: 200,
            stock: 10,
            minStockRequired: 5
        }
    ])
);