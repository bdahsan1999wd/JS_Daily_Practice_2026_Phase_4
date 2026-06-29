// PROBLEM-04: calculateOrderTotal()

// Logic: Computes a full pricing breakdown for a cart of items - subtotal, discount, after-discount amount, tax, and grand total.

const calculateOrderTotal = (items, discountPercent, taxPercent) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(items) || items.length === 0) return "Invalid Input";
    for (let i = 0; i < items.length; i++) {
        const it = items[i];
        if (!it || typeof it !== "object") return "Invalid Input";
        if (typeof it.name !== "string" || it.name === "") return "Invalid Input";
        if (typeof it.price !== "number" || it.price <= 0) return "Invalid Input";
        if (typeof it.qty !== "number" || !Number.isInteger(it.qty) || it.qty < 1) return "Invalid Input";
    }
    if (typeof discountPercent !== "number" || discountPercent < 0 || discountPercent > 100) return "Invalid Input";
    if (typeof taxPercent !== "number" || taxPercent < 0 || taxPercent > 100) return "Invalid Input";

    // --- STEP 2: COMPUTE SUBTOTAL ---
    // sum of (price * qty) for every item
    const subtotal = items.reduce((sum, it) => sum + (it.price * it.qty), 0);

    // --- STEP 3: APPLY DISCOUNT ---
    const discountAmount = subtotal * discountPercent / 100;
    const afterDiscount = subtotal - discountAmount;

    // --- STEP 4: APPLY TAX (tax is calculated AFTER discount, not before) ---
    const taxAmount = afterDiscount * taxPercent / 100;
    const grandTotal = afterDiscount + taxAmount;

    // --- STEP 5: ROUND EVERY MONETARY VALUE TO 2 DECIMAL PLACES ---
    const round2 = (n) => Number(n.toFixed(2));

    // --- STEP 6: RETURN FINAL BREAKDOWN ---
    return {
        subtotal: round2(subtotal),
        discountAmount: round2(discountAmount),
        afterDiscount: round2(afterDiscount),
        taxAmount: round2(taxAmount),
        grandTotal: round2(grandTotal)
    };
};

// --- EXAMPLE USAGE ---
console.log(calculateOrderTotal(
    [{ name: "Shirt", price: 1000, qty: 2 }, { name: "Belt", price: 500, qty: 1 }],
    10,
    5
));