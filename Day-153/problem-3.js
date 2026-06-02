// 🧩 PROBLEM–03: generateInventoryReport()

// Logic: This function generates a complete inventory report, including total inventory value, average product price, most valuable product, and category-wise inventory value.

function generateInventoryReport(products) {

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

    // --- STEP 3: COUNT TOTAL PRODUCTS ---

    const totalProducts = products.length;

    // --- STEP 4: CALCULATE TOTAL INVENTORY VALUE ---
    // price × stock for every product.

    const totalInventoryValue = products.reduce(
        (sum, product) =>
            sum + (product.price * product.stock),
        0
    );

    // --- STEP 5: CALCULATE AVERAGE PRICE ---

    const totalPrice = products.reduce(
        (sum, product) =>
            sum + product.price,
        0
    );

    const averagePrice = Number(
        (totalPrice / totalProducts).toFixed(2)
    );

    // --- STEP 6: FIND MOST VALUABLE PRODUCT ---
    // Highest (price × stock).

    const mostValuableProduct = products.reduce(
        (best, product) => {

            const currentValue =
                product.price * product.stock;

            const bestValue =
                best.price * best.stock;

            return currentValue > bestValue
                ? product
                : best;
        }
    );

    // --- STEP 7: GENERATE CATEGORY-WISE VALUE ---

    const categoryWiseValue = products.reduce(
        (acc, product) => {

            const value =
                product.price * product.stock;

            if (!acc[product.category]) {
                acc[product.category] = 0;
            }

            acc[product.category] += value;

            return acc;

        },
        {}
    );

    // --- STEP 8: RETURN REPORT OBJECT ---

    return {
        totalProducts,
        totalInventoryValue,
        averagePrice,
        mostValuableProduct,
        categoryWiseValue
    };
}

// --- EXAMPLE USAGE ---
console.log(
    generateInventoryReport([
        {
            name: "A",
            category: "Electronics",
            price: 10000,
            stock: 3
        },
        {
            name: "B",
            category: "Electronics",
            price: 5000,
            stock: 2
        },
        {
            name: "C",
            category: "Furniture",
            price: 8000,
            stock: 1
        }
    ])
);