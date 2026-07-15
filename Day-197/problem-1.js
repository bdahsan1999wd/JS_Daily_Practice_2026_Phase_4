// PROBLEM-01: checkDiscountEligibility()

// Logic: A decision-tree gate checks 3 conditions IN ORDER, stops at the FIRST one that fails.

const checkDiscountEligibility = (customer, cart) => {

    // --- STEP 1: VALIDATION ---
    if (typeof customer !== "object" || customer === null || Array.isArray(customer)) return "Invalid Input";
    if (typeof cart !== "object" || cart === null || Array.isArray(cart)) return "Invalid Input";

    const { membershipTier, accountAgeMonths } = customer;
    const { subtotal, itemCount } = cart;

    if (!["NONE", "SILVER", "GOLD", "PLATINUM"].includes(membershipTier)) return "Invalid Input";
    if (typeof accountAgeMonths !== "number" || accountAgeMonths < 0) return "Invalid Input";
    if (typeof subtotal !== "number" || subtotal <= 0) return "Invalid Input";
    if (typeof itemCount !== "number" || !Number.isInteger(itemCount) || itemCount < 1) return "Invalid Input";

    // --- STEP 2: DECISION TREE - CHECK IN ORDER, STOP AT FIRST FAILURE ---
    // Check #1: minimum purchase amount
    if (subtotal < 500) {
        return { eligible: false, rejectionReason: "Minimum purchase amount not met" };
    }
    // Check #2: account age requirement
    if (accountAgeMonths < 1) {
        return { eligible: false, rejectionReason: "Account too new for discounts" };
    }
    // Check #3: must have an active membership
    if (membershipTier === "NONE") {
        return { eligible: false, rejectionReason: "No active membership" };
    }

    // --- STEP 3: ALL CHECKS PASSED ---
    return { eligible: true, rejectionReason: null };
};

// --- EXAMPLE USAGE ---
console.log(checkDiscountEligibility(
    { membershipTier: "GOLD", accountAgeMonths: 6 },
    { subtotal: 300, itemCount: 2 }
));