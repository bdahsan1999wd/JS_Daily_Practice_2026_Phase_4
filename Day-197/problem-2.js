// PROBLEM-02: calculateTieredDiscount()

// Logic: Stacks a base membership discount with a volume bonus and an optional holiday bonus — ALL additive but the combined total can never exceed a 30% cap.

const calculateTieredDiscount = (membershipTier, subtotal, isHolidaySale) => {

    // --- STEP 1: VALIDATION ---
    if (!["SILVER", "GOLD", "PLATINUM"].includes(membershipTier)) return "Invalid Input";
    if (typeof subtotal !== "number" || subtotal <= 0) return "Invalid Input";
    if (typeof isHolidaySale !== "boolean") return "Invalid Input";

    // --- STEP 2: BASE DISCOUNT BY MEMBERSHIP TIER ---
    let baseDiscount;
    if (membershipTier === "SILVER") baseDiscount = 5;
    else if (membershipTier === "GOLD") baseDiscount = 10;
    else baseDiscount = 15; // PLATINUM

    // --- STEP 3: VOLUME BONUS BASED ON SUBTOTAL SIZE ---
    let volumeBonus;
    if (subtotal >= 5000) volumeBonus = 5;
    else if (subtotal >= 2000) volumeBonus = 3;
    else volumeBonus = 0;

    // --- STEP 4: HOLIDAY BONUS (FLAT, IF APPLICABLE) ---
    const holidayBonus = isHolidaySale === true ? 5 : 0;

    // --- STEP 5: TOTAL DISCOUNT PERCENT, CAPPED AT 30% ---
    const totalDiscountPercent = Math.min(baseDiscount + volumeBonus + holidayBonus, 30);

    // --- STEP 6: DISCOUNT AMOUNT & FINAL PRICE ---
    const discountAmount = Number((subtotal * totalDiscountPercent / 100).toFixed(2));
    const finalPrice = Number((subtotal - discountAmount).toFixed(2));

    // --- STEP 7: RETURN RESULT ---
    return { totalDiscountPercent, discountAmount, finalPrice };
};

// --- EXAMPLE USAGE ---
console.log(calculateTieredDiscount("PLATINUM", 6000, true));