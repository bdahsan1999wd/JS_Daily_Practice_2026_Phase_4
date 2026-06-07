// 🧩 PROBLEM–02: updateProductEntry()

// Logic: This function safely merges a set of updates into an existing product structure without mutating the original, tracking type and dynamic logic shifts like operational availability.

function updateProductEntry(existingProduct, updates) {

    // --- STEP 1: VALIDATION ---
    if (
        !existingProduct || typeof existingProduct !== "object" || Array.isArray(existingProduct) ||
        !updates || typeof updates !== "object" || Array.isArray(updates) ||
        Object.keys(updates).length === 0
    ) {
        return "Invalid Input";
    }

    // Verify minimum required fields on the original target item
    if (
        typeof existingProduct.productId !== "string" || existingProduct.productId.trim() === "" ||
        typeof existingProduct.productName !== "string" || existingProduct.productName.trim() === "" ||
        typeof existingProduct.originalPrice !== "number" || existingProduct.originalPrice <= 0 ||
        typeof existingProduct.stock !== "number" || !Number.isInteger(existingProduct.stock) || existingProduct.stock < 0
    ) {
        return "Invalid Input";
    }

    // Validate specific fields if passed down inside the incremental updates block
    if (updates.hasOwnProperty("productName") && (typeof updates.productName !== "string" || updates.productName.trim() === "")) {
        return "Invalid Input";
    }
    if (updates.hasOwnProperty("originalPrice") && (typeof updates.originalPrice !== "number" || updates.originalPrice <= 0)) {
        return "Invalid Input";
    }
    if (updates.hasOwnProperty("discountPercent") && (typeof updates.discountPercent !== "number" || updates.discountPercent < 0 || updates.discountPercent > 100)) {
        return "Invalid Input";
    }
    if (updates.hasOwnProperty("stock") && (typeof updates.stock !== "number" || !Number.isInteger(updates.stock) || updates.stock < 0)) {
        return "Invalid Input";
    }
    if (updates.hasOwnProperty("warehouse") && (typeof updates.warehouse !== "string" || updates.warehouse.trim() === "")) {
        return "Invalid Input";
    }

    // --- STEP 2: IMMUTABLE MERGING ---
    const updatedProduct = {
        ...existingProduct,
        ...updates,
        lastUpdated: "2025-01-01"
    };

    // Recompute operational dependency properties based on the updated state metrics
    updatedProduct.isAvailable = updatedProduct.stock > 0;

    return updatedProduct;
}

// --- EXAMPLE USAGE ---
const sampleProduct = { productId: "P002", productName: "USB Hub", originalPrice: 800, stock: 20 };

console.log(updateProductEntry(sampleProduct, { originalPrice: 900, stock: 0 }));

console.log(updateProductEntry(sampleProduct, { stock: -15 }));