// PROBLEM-05: runCheckoutPricingPipeline()

// Logic: The "orchestrator" chains checkDiscountEligibility() into calculateTieredDiscount(). If eligibility fails, the pipeline stops immediately and returns the ORIGINAL subtotal as the final price (no discount math needed for a rejected cart).

const runCheckoutPricingPipeline = (customer, cart, isHolidaySale) => {

    // --- STEP 1: VALIDATION ---
    if (typeof customer !== "object" || customer === null || Array.isArray(customer)) return "Invalid Input";
    if (typeof cart !== "object" || cart === null || Array.isArray(cart)) return "Invalid Input";
    if (typeof isHolidaySale !== "boolean") return "Invalid Input";

    const { membershipTier, accountAgeMonths } = customer;
    const { subtotal, itemCount } = cart;

    if (!["NONE", "SILVER", "GOLD", "PLATINUM"].includes(membershipTier)) return "Invalid Input";
    if (typeof accountAgeMonths !== "number" || accountAgeMonths < 0) return "Invalid Input";
    if (typeof subtotal !== "number" || subtotal <= 0) return "Invalid Input";
    if (typeof itemCount !== "number" || !Number.isInteger(itemCount) || itemCount < 1) return "Invalid Input";

    // --- STEP 2: PIPELINE STAGE 1 - ELIGIBILITY GATE (equivalent of checkDiscountEligibility) ---
    // STOP IMMEDIATELY if any gate fails — return the ORIGINAL subtotal, no discount
    if (subtotal < 500) {
        return { discountApplied: false, reason: "Minimum purchase amount not met", finalPrice: subtotal };
    }
    if (accountAgeMonths < 1) {
        return { discountApplied: false, reason: "Account too new for discounts", finalPrice: subtotal };
    }
    if (membershipTier === "NONE") {
        return { discountApplied: false, reason: "No active membership", finalPrice: subtotal };
    }

    // --- STEP 3: PIPELINE STAGE 2 - TIERED DISCOUNT (equivalent of calculateTieredDiscount) ---
    // only reached if the customer PASSED stage 1, so membershipTier here
    // is guaranteed to be SILVER/GOLD/PLATINUM (never "NONE")
    let baseDiscount;
    if (membershipTier === "SILVER") baseDiscount = 5;
    else if (membershipTier === "GOLD") baseDiscount = 10;
    else baseDiscount = 15; // PLATINUM

    let volumeBonus;
    if (subtotal >= 5000) volumeBonus = 5;
    else if (subtotal >= 2000) volumeBonus = 3;
    else volumeBonus = 0;

    const holidayBonus = isHolidaySale === true ? 5 : 0;

    const totalDiscountPercent = Math.min(baseDiscount + volumeBonus + holidayBonus, 30);

    const discountAmount = Number((subtotal * totalDiscountPercent / 100).toFixed(2));
    const finalPrice = Number((subtotal - discountAmount).toFixed(2));

    // --- STEP 4: RETURN FINAL APPROVED RESULT ---
    return { discountApplied: true, totalDiscountPercent, finalPrice };
};

// --- EXAMPLE USAGE ---
console.log(runCheckoutPricingPipeline(
    { membershipTier: "SILVER", accountAgeMonths: 3 },
    { subtotal: 2500, itemCount: 4 },
    false
));