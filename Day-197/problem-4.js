// PROBLEM-04: resolveCouponStack()

// Logic: Two completely different behaviors depending on the coupons: If ANY coupon is non-stackable, ONLY the single BEST non-stackable coupon applies (all others, even stackable ones, are ignored entirely). If EVERY coupon is stackable (or there are none), apply them ALL in array order, each acting on the CURRENT running price (not the original subtotal).

const resolveCouponStack = (subtotal, coupons) => {

    // --- STEP 1: VALIDATION ---
    if (typeof subtotal !== "number" || subtotal <= 0) return "Invalid Input";
    if (!Array.isArray(coupons)) return "Invalid Input";
    for (let i = 0; i < coupons.length; i++) {
        const c = coupons[i];
        if (!c || typeof c !== "object") return "Invalid Input";
        if (typeof c.code !== "string") return "Invalid Input";
        if (!["PERCENT", "FIXED"].includes(c.type)) return "Invalid Input";
        if (typeof c.value !== "number" || c.value <= 0) return "Invalid Input";
        if (typeof c.stackable !== "boolean") return "Invalid Input";
    }

    // --- STEP 2: NO COUPONS AT ALL -> NOTHING CHANGES ---
    if (coupons.length === 0) {
        return { appliedCoupons: [], finalPrice: Number(subtotal.toFixed(2)) };
    }

    // --- STEP 3: CHECK IF ANY COUPON IS NON-STACKABLE ---
    const nonStackableCoupons = coupons.filter(c => c.stackable === false);

    if (nonStackableCoupons.length > 0) {
        // --- STEP 4a: NON-STACKABLE PATH ---
        // Compute each non-stackable coupon's OWN discount value
        // individually against the ORIGINAL subtotal (since only one
        // will ultimately be applied, they don't chain off each other)
        const withDiscountValue = nonStackableCoupons.map(c => {
            const discountValue = c.type === "PERCENT"
                ? subtotal * c.value / 100
                : c.value;
            return { ...c, discountValue };
        });

        // pick whichever single coupon gives the BIGGEST discount
        let best = withDiscountValue[0];
        for (let i = 1; i < withDiscountValue.length; i++) {
            if (withDiscountValue[i].discountValue > best.discountValue) {
                best = withDiscountValue[i];
            }
        }

        // apply only that one coupon, capping the result at 0 minimum
        const finalPrice = Number(Math.max(subtotal - best.discountValue, 0).toFixed(2));

        return { appliedCoupons: [best.code], finalPrice };

    } else {
        // --- STEP 4b: ALL COUPONS ARE STACKABLE -> APPLY ALL, IN ORDER ---
        let runningPrice = subtotal;
        const appliedCoupons = [];

        for (let i = 0; i < coupons.length; i++) {
            const coupon = coupons[i];

            if (coupon.type === "PERCENT") {
                // percent always applies to the CURRENT running price
                const discount = runningPrice * coupon.value / 100;
                runningPrice = Math.max(runningPrice - discount, 0);
            } else {
                // FIXED subtracts a flat amount from the current running price
                runningPrice = Math.max(runningPrice - coupon.value, 0);
            }

            appliedCoupons.push(coupon.code);
        }

        const finalPrice = Number(runningPrice.toFixed(2));
        return { appliedCoupons, finalPrice };
    }
};

// --- EXAMPLE USAGE ---
console.log(resolveCouponStack(1000, [
    { code: "SAVE10", type: "PERCENT", value: 10, stackable: false },
    { code: "FLAT200", type: "FIXED", value: 200, stackable: false }
]));