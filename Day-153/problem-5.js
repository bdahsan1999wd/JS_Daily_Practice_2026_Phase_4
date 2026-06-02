// 🧩 PROBLEM–05: rankProductsByValue()

// Logic: This function ranks products based on inventory value (price × stock). If inventory values tie, higher price wins. If both value and price tie, products share rank.

function rankProductsByValue(products) {

    // --- STEP 1: VALIDATION ---
    // Ensure products is a non-empty array.

    if (
        !Array.isArray(products) ||
        products.length === 0
    ) {
        return "Invalid Input";
    }

    // --- STEP 2: VALIDATE ALL PRODUCTS ---

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

    // --- STEP 3: SORT PRODUCTS ---
    // Primary: inventoryValue DESC
    // Secondary: price DESC

    const sortedProducts = [...products].sort(
        (a, b) => {

            const valueA =
                a.price * a.stock;

            const valueB =
                b.price * b.stock;

            if (valueB !== valueA) {
                return valueB - valueA;
            }

            return b.price - a.price;
        }
    );

    // --- STEP 4: GENERATE RANKS ---

    const rankedProducts = [];

    let currentRank = 1;

    for (let i = 0; i < sortedProducts.length; i++) {

        const current =
            sortedProducts[i];

        const currentValue =
            current.price * current.stock;

        if (i > 0) {

            const previous =
                sortedProducts[i - 1];

            const previousValue =
                previous.price * previous.stock;

            if (
                currentValue ===
                previousValue &&
                current.price ===
                previous.price
            ) {
                currentRank =
                    rankedProducts[i - 1].rank;
            } else {
                currentRank = i + 1;
            }
        }

        // --- STEP 5: ASSIGN VALUE TIER ---

        let valueTier;

        if (currentValue > 100000) {
            valueTier = "PREMIUM";
        } else if (currentValue > 50000) {
            valueTier = "HIGH";
        } else if (currentValue > 10000) {
            valueTier = "MEDIUM";
        } else {
            valueTier = "LOW";
        }

        // --- STEP 6: STORE RESULT OBJECT ---

        rankedProducts.push({
            name: current.name,
            category: current.category,
            inventoryValue: currentValue,
            rank: currentRank,
            valueTier
        });
    }

    // --- STEP 7: RETURN FINAL RESULT ---

    return rankedProducts;
}

// --- EXAMPLE USAGE ---
console.log(
    rankProductsByValue([
        {
            name: "A",
            category: "Electronics",
            price: 15000,
            stock: 10
        },
        {
            name: "B",
            category: "Furniture",
            price: 8000,
            stock: 5
        },
        {
            name: "C",
            category: "Electronics",
            price: 5000,
            stock: 3
        }
    ])
);