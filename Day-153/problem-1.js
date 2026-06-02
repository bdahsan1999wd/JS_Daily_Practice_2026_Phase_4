// 🧩 PROBLEM–01: applyDiscountToProducts()

// Logic: This function processes an array of product objects, applies a discount to available products, keeps out-of-stock products unchanged, and returns a transformed array with pricing information and stock status.

function applyDiscountToProducts(products, discountPercent) {

    // --- STEP 1: VALIDATION ---
    // Ensure products is a non-empty array.
    // Ensure discountPercent is a number between 0 and 100.

    if (
        !Array.isArray(products) ||
        products.length === 0 ||
        typeof discountPercent !== "number" ||
        discountPercent < 0 ||
        discountPercent > 100
    ) {
        return "Invalid Input";
    }

    // --- STEP 2: PROCESS EACH PRODUCT ---
    // Use .map() to transform each product into
    // the required output format.

    return products.map(product => {

        // --- STEP 2a: VALIDATE PRODUCT OBJECT ---
        // Each product must contain:
        // name (string)
        // category (string)
        // price (number > 0)
        // stock (number >= 0)

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

        // --- STEP 3: DETERMINE STOCK STATUS ---
        // If stock is 0, mark as out of stock.

        const outOfStock = stock === 0;

        // --- STEP 4: CALCULATE DISCOUNTED PRICE ---
        // Out-of-stock products do not receive discount.
        // Otherwise apply percentage discount.

        let discountedPrice;

        if (outOfStock) {
            discountedPrice = price;
        } else {
            discountedPrice =
                price -
                (price * discountPercent / 100);
        }

        // --- STEP 5: RETURN RESULT OBJECT ---
        // Return only the required fields.
        // Round discounted price to 2 decimal places.

        return {
            name,
            category,
            originalPrice: price,
            discountedPrice: Number(
                discountedPrice.toFixed(2)
            ),
            outOfStock
        };
    });
}

// --- EXAMPLE USAGE ---
console.log(
    applyDiscountToProducts(
        [
            {
                name: "Laptop",
                category: "Electronics",
                price: 80000,
                stock: 5
            },
            {
                name: "Pen",
                category: "Stationery",
                price: 20,
                stock: 0
            }
        ],
        10
    )
);

console.log(
    applyDiscountToProducts(
        "invalid",
        10
    )
);