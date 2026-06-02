// 🧩 PROBLEM–02: filterLowStockProducts()

// Logic: This function analyzes inventory stock levels, categorizes products into lowStock, outOfStock, and adequate stock groups, then sorts each group by stock quantity in ascending order.

function filterLowStockProducts(products, threshold) {

    // --- STEP 1: VALIDATION ---
    // Ensure products is a non-empty array.
    // Ensure threshold is a number >= 0.

    if (
        !Array.isArray(products) ||
        products.length === 0 ||
        typeof threshold !== "number" ||
        threshold < 0
    ) {
        return "Invalid Input";
    }

    // --- STEP 2: VALIDATE ALL PRODUCTS ---
    // Every product must contain:
    // name (string)
    // category (string)
    // price (number > 0)
    // stock (number >= 0)

    for (const product of products) {

        const {
            name,
            category,
            price,
            stock
        } = product;

        if (
            typeof name !== "string" ||
            typeof category !== "string" ||
            typeof price !== "number" ||
            price <= 0 ||
            typeof stock !== "number" ||
            stock < 0
        ) {
            return "Invalid Input";
        }
    }

    // --- STEP 3: FIND LOW STOCK PRODUCTS ---
    // Products where stock > 0 and stock <= threshold.

    const lowStock = products
        .filter(product =>
            product.stock > 0 &&
            product.stock <= threshold
        )
        .sort((a, b) => a.stock - b.stock);

    // --- STEP 4: FIND OUT OF STOCK PRODUCTS ---
    // Products where stock === 0.

    const outOfStock = products
        .filter(product => product.stock === 0)
        .sort((a, b) => a.stock - b.stock);

    // --- STEP 5: FIND ADEQUATE STOCK PRODUCTS ---
    // Products where stock > threshold.

    const adequate = products
        .filter(product =>
            product.stock > threshold
        )
        .sort((a, b) => a.stock - b.stock);

    // --- STEP 6: RETURN RESULT OBJECT ---

    return {
        lowStock,
        outOfStock,
        adequate
    };
}

// --- EXAMPLE USAGE ---
console.log(
    filterLowStockProducts(
        [
            {
                name: "A",
                category: "X",
                price: 100,
                stock: 0
            },
            {
                name: "B",
                category: "Y",
                price: 200,
                stock: 3
            },
            {
                name: "C",
                category: "Z",
                price: 300,
                stock: 15
            }
        ],
        5
    )
);