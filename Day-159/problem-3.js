// 🧩 PROBLEM–03: extractProductSections()

// Logic: Breaks a flat inventory listing schema apart using nested object destructuring, grouping fields into logical operational segments alongside a system evaluation metadata block.

function extractProductSections(productEntry) {

    // --- STEP 1: VALIDATION ---
    if (!productEntry || typeof productEntry !== "object" || Array.isArray(productEntry)) {
        return "Invalid Input";
    }

    const strictlyRequiredKeys = [
        "productId", "productName", "category", "brand",
        "originalPrice", "sellingPrice", "discountPercent",
        "stock", "warehouse", "isAvailable"
    ];

    for (const key of strictlyRequiredKeys) {
        if (!productEntry.hasOwnProperty(key)) {
            return "Invalid Input";
        }
    }

    // --- STEP 2: DESTRUCTURING SEPARATION ---
    const {
        productId, productName, category, brand,
        originalPrice, sellingPrice, discountPercent,
        stock, warehouse, isAvailable
    } = productEntry;

    // --- STEP 3: ASSEMBLE OUTPUT SCHEMA ---
    return {
        identity: { productId, productName, category, brand },
        pricing: { originalPrice, sellingPrice, discountPercent },
        inventory: { stock, warehouse, isAvailable },
        catalogSummary: {
            totalFields: 10,
            hasSavings: discountPercent > 0
        }
    };
}

// --- EXAMPLE USAGE ---
console.log(
    extractProductSections({
        productId: "P003",
        productName: "Mechanical Keyboard",
        category: "Electronics",
        brand: "Keychron",
        originalPrice: 5000,
        sellingPrice: 4250,
        discountPercent: 15,
        stock: 10,
        warehouse: "Chittagong-Port",
        isAvailable: true
    })
);

console.log(
    extractProductSections({ productId: "P101" })
);