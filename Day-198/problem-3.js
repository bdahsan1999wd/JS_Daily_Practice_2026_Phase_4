// PROBLEM-03: calculateSalesBonusTier()

// Logic: How far over (or under) target someone sold determines BOTH their named tier AND what percentage of THEIR OWN sales they get back as a bonus.

const calculateSalesBonusTier = (salesAmount, targetAmount) => {

    // --- STEP 1: VALIDATION ---
    if (typeof salesAmount !== "number" || salesAmount < 0) return "Invalid Input";
    if (typeof targetAmount !== "number" || targetAmount <= 0) return "Invalid Input";

    // --- STEP 2: ACHIEVEMENT PERCENT ---
    const achievementPercent = Number(((salesAmount / targetAmount) * 100).toFixed(2));

    // --- STEP 3: DETERMINE TIER AND ITS BONUS PERCENTAGE ---
    let tier, bonusPercent;
    if (achievementPercent >= 150) {
        tier = "EXCEPTIONAL"; bonusPercent = 20;
    } else if (achievementPercent >= 120) {
        tier = "EXCELLENT"; bonusPercent = 12;
    } else if (achievementPercent >= 100) {
        tier = "TARGET_MET"; bonusPercent = 7;
    } else if (achievementPercent >= 80) {
        tier = "NEAR_TARGET"; bonusPercent = 3;
    } else {
        tier = "BELOW_TARGET"; bonusPercent = 0;
    }

    // --- STEP 4: BONUS AMOUNT (percentage OF THE SALES AMOUNT, not the target) ---
    const bonusAmount = Number((salesAmount * bonusPercent / 100).toFixed(2));

    // --- STEP 5: RETURN RESULT ---
    return { achievementPercent, tier, bonusAmount };
};

// --- EXAMPLE USAGE ---
console.log(calculateSalesBonusTier(180000, 120000));