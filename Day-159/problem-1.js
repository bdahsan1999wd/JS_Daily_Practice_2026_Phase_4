// 🧩 PROBLEM–01: buildProductEntry()

// Logic: This function combines segmented product components into a unified listing catalog entry using the object spread operator, computing the final pricing and availability states inline.

function buildProductEntry(basicDetails, pricingInfo, stockInfo) {

    // --- STEP 1: VALIDATION ---
    if (
        !basicDetails || typeof basicDetails !== "object" || Array.isArray(basicDetails) ||
        !pricingInfo || typeof pricingInfo !== "object" || Array.isArray(pricingInfo) ||
        !stockInfo || typeof stockInfo !== "object" || Array.isArray(stockInfo)
    ) {
        return "Invalid Input";
    }

    // Validate basicDetails
    if (
        typeof basicDetails.productId !== "string" || basicDetails.productId.trim() === "" ||
        typeof basicDetails.productName !== "string" || basicDetails.productName.trim() === "" ||
        typeof basicDetails.category !== "string" || basicDetails.category.trim() === "" ||
        typeof basicDetails.brand !== "string" || basicDetails.brand.trim() === ""
    ) {
        return "Invalid Input";
    }

    // Validate pricingInfo
    if (
        typeof pricingInfo.originalPrice !== "number" || pricingInfo.originalPrice <= 0 ||
        typeof pricingInfo.discountPercent !== "number" || pricingInfo.discountPercent < 0 || pricingInfo.discountPercent > 100
    ) {
        return "Invalid Input";
    }

    // Validate stockInfo
    if (
        typeof stockInfo.stock !== "number" || !Number.isInteger(stockInfo.stock) || stockInfo.stock < 0 ||
        typeof stockInfo.warehouse !== "string" || stockInfo.warehouse.trim() === ""
    ) {
        return "Invalid Input";
    }

    // --- STEP 2: IMMUTABLE ASSEMBLY & COMPUTED FIELDS ---
    const originalPrice = pricingInfo.originalPrice;
    const discountPercent = pricingInfo.discountPercent;

    const sellingPrice = originalPrice - (originalPrice * discountPercent / 100);
    const isAvailable = stockInfo.stock > 0;

    return {
        ...basicDetails,
        ...pricingInfo,
        ...stockInfo,
        sellingPrice: Number(sellingPrice.toFixed(2)),
        isAvailable,
        listedAt: "2025-01-01"
    };
}

// --- EXAMPLE USAGE ---
console.log(
    buildProductEntry(
        { productId: "P001", productName: "Wireless Mouse", category: "Electronics", brand: "Logitech" },
        { originalPrice: 1200, discountPercent: 10 },
        { stock: 50, warehouse: "Dhaka-Central" }
    )
);

console.log(
    buildProductEntry({ productId: "P99" }, {}, null)
);