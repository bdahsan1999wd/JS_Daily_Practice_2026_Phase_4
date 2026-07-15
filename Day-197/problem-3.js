// PROBLEM-03: calculateBulkPricing()

// Logic: Buying more units unlocks a bigger per-unit discount tier compute the discounted price and how much was saved overall.

const calculateBulkPricing = (unitPrice, quantity) => {

    // --- STEP 1: VALIDATION ---
    if (typeof unitPrice !== "number" || unitPrice <= 0) return "Invalid Input";
    if (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity < 1) return "Invalid Input";

    // --- STEP 2: DETERMINE DISCOUNT PERCENT BASED ON QUANTITY TIER ---
    let discountPercent;
    if (quantity >= 100) discountPercent = 20;
    else if (quantity >= 50) discountPercent = 15;
    else if (quantity >= 20) discountPercent = 10;
    else if (quantity >= 10) discountPercent = 5;
    else discountPercent = 0;

    // --- STEP 3: DISCOUNTED UNIT PRICE ---
    const discountedUnitPrice = Number((unitPrice * (1 - discountPercent / 100)).toFixed(2));

    // --- STEP 4: TOTAL COST AT THE DISCOUNTED PRICE ---
    const totalCost = Number((discountedUnitPrice * quantity).toFixed(2));

    // --- STEP 5: TOTAL SAVINGS COMPARED TO FULL PRICE ---
    const totalSavings = Number(((unitPrice * quantity) - totalCost).toFixed(2));

    // --- STEP 6: RETURN RESULT ---
    return { discountedUnitPrice, totalCost, totalSavings };
};

// --- EXAMPLE USAGE ---
console.log(calculateBulkPricing(100, 60));