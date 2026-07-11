// PROBLEM-01: analyzeProductProfitability()

// Logic: Computes revenue/profit/margin per product, then identifies the most and least profitable, plus the overall pooled margin.

const analyzeProductProfitability = (products) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(products) || products.length === 0) return "Invalid Input";
    for (let i = 0; i < products.length; i++) {
        const p = products[i];
        if (!p || typeof p !== "object") return "Invalid Input";
        if (typeof p.productName !== "string") return "Invalid Input";
        if (typeof p.unitsSold !== "number" || !Number.isInteger(p.unitsSold) || p.unitsSold < 0) return "Invalid Input";
        if (typeof p.sellingPrice !== "number" || p.sellingPrice <= 0) return "Invalid Input";
        if (typeof p.costPrice !== "number" || p.costPrice <= 0) return "Invalid Input";
    }

    // --- STEP 2: COMPUTE PER-PRODUCT METRICS ---
    const computed = products.map(p => {
        const revenue = p.unitsSold * p.sellingPrice;
        const cost = p.unitsSold * p.costPrice;
        const profit = revenue - cost;
        // guard against division by zero when revenue is 0 (e.g. unitsSold = 0)
        const profitMarginPercent = revenue === 0 ? 0 : Number(((profit / revenue) * 100).toFixed(2));
        return { productName: p.productName, revenue, profit, profitMarginPercent };
    });

    const productBreakdown = computed.map(({ productName, revenue, profit, profitMarginPercent }) => (
        { productName, revenue, profit, profitMarginPercent }
    ));

    // --- STEP 3: FIND MOST AND LEAST PROFITABLE PRODUCT ---
    let mostProfitableProduct = computed[0].productName;
    let maxProfit = computed[0].profit;
    let leastProfitableProduct = computed[0].productName;
    let minProfit = computed[0].profit;

    for (let i = 1; i < computed.length; i++) {
        if (computed[i].profit > maxProfit) {
            maxProfit = computed[i].profit;
            mostProfitableProduct = computed[i].productName;
        }
        if (computed[i].profit < minProfit) {
            minProfit = computed[i].profit;
            leastProfitableProduct = computed[i].productName;
        }
    }

    // --- STEP 4: OVERALL PROFIT MARGIN (pooled, across ALL products combined) ---
    const totalRevenue = computed.reduce((sum, p) => sum + p.revenue, 0);
    const totalProfit = computed.reduce((sum, p) => sum + p.profit, 0);
    const overallProfitMargin = Number(((totalProfit / totalRevenue) * 100).toFixed(2));

    // --- STEP 5: RETURN RESULT ---
    return { productBreakdown, mostProfitableProduct, leastProfitableProduct, overallProfitMargin };
};

// --- EXAMPLE USAGE ---
console.log(analyzeProductProfitability([
    { productName: "Mug", unitsSold: 100, sellingPrice: 200, costPrice: 120 },
    { productName: "Plate", unitsSold: 50, sellingPrice: 300, costPrice: 250 }
]));