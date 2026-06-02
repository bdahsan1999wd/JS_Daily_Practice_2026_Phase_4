// 🧩 PROBLEM–05: rankCartItems()

// Logic: This function calculates values, matches items against financial limits to set spending tiers, handles descending score priority sorting, and appends placement rankings.

function rankCartItems(cartItems) {

    // --- STEP 1: VALIDATION ---
    // Ensure cartItems is a non-empty array.
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
        return "Invalid Input";
    }

    for (const item of cartItems) {
        if (
            !item ||
            typeof item.name !== "string" ||
            typeof item.category !== "string" ||
            typeof item.price !== "number" || item.price <= 0 ||
            typeof item.quantity !== "number" || !Number.isInteger(item.quantity) || item.quantity < 1 ||
            typeof item.discountPercent !== "number" || item.discountPercent < 0 || item.discountPercent > 100
        ) {
            return "Invalid Input";
        }
    }

    // --- STEP 2: EXTEND SCHEMA AND DETERMINE TIERS ---
    const processedItems = cartItems.map(item => {
        const itemTotal = item.price * item.quantity;
        let spendingTier = "LOW";

        if (itemTotal > 50000) {
            spendingTier = "PREMIUM";
        } else if (itemTotal >= 10001) {
            spendingTier = "HIGH";
        } else if (itemTotal >= 3001) {
            spendingTier = "MEDIUM";
        }

        return {
            name: item.name,
            category: item.category,
            price: item.price, // Kept temporarily to evaluate sort tie conditions
            itemTotal: Number(itemTotal.toFixed(2)),
            spendingTier
        };
    });

    // --- STEP 3: ORDER AND RANK PLACEMENTS ---
    // Sort descending by itemTotal. Tie-break using high unit price.
    processedItems.sort((a, b) => {
        if (b.itemTotal !== a.itemTotal) {
            return b.itemTotal - a.itemTotal;
        }
        return b.price - a.price;
    });

    // Assign ranking positions correctly tracking identical tie groups
    let currentRank = 1;
    for (let i = 0; i < processedItems.length; i++) {
        if (i > 0) {
            const currentItem = processedItems[i];
            const previousItem = processedItems[i - 1];

            if (currentItem.itemTotal !== previousItem.itemTotal || currentItem.price !== previousItem.price) {
                currentRank = i + 1;
            }
        }
        processedItems[i].rank = currentRank;
        delete processedItems[i].price; // Clean up formatting helper variable
    }

    return processedItems;
}

// --- EXAMPLE USAGE ---
console.log(
    rankCartItems([
        { name: "TV", category: "Electronics", price: 40000, quantity: 2, discountPercent: 0 },
        { name: "Chair", category: "Furniture", price: 8000, quantity: 1, discountPercent: 5 },
        { name: "Pen", category: "Stationery", price: 50, quantity: 4, discountPercent: 0 }
    ])
);

console.log(
    rankCartItems([{ name: "Broken Data" }])
);