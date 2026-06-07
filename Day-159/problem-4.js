// 🧩 PROBLEM–04: deepCloneProduct()

// Logic: Generates a completely isolated deep copy of complex nested tracking objects using string serialization techniques, guaranteeing nested modifications do not bleed into originals.

function deepCloneProduct(productEntry) {

    // --- STEP 1: VALIDATION ---
    if (!productEntry || typeof productEntry !== "object" || Array.isArray(productEntry)) {
        return "Invalid Input";
    }

    if (
        typeof productEntry.productId !== "string" ||
        typeof productEntry.productName !== "string" ||
        !productEntry.pricing || typeof productEntry.pricing !== "object" || Array.isArray(productEntry.pricing) ||
        typeof productEntry.pricing.originalPrice !== "number" ||
        typeof productEntry.pricing.sellingPrice !== "number" ||
        !Array.isArray(productEntry.tags)
    ) {
        return "Invalid Input";
    }

    // --- STEP 2: DEEP COPY EXECUTION ---
    const clone = JSON.parse(JSON.stringify(productEntry));

    // --- STEP 3: ISOLATED STATE MUTATION ---
    clone.cloneTag = "CLONED";
    clone.pricing.sellingPrice = 0;
    clone.tags.push("cloned-item");

    return {
        original: productEntry,
        clone: clone
    };
}

// --- EXAMPLE USAGE ---
console.log(
    deepCloneProduct({
        productId: "P004",
        productName: "Webcam HD",
        pricing: { originalPrice: 3000, sellingPrice: 2700 },
        tags: ["camera", "HD", "USB"]
    })
);

console.log(deepCloneProduct({ productId: "P005", tags: "not-an-array" }));