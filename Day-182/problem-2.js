// PROBLEM-02: topSellingProduct()

// Logic: Combines duplicate product entries into single totals, then ranks them by either quantity sold or revenue generated.

const topSellingProduct = (orderItems, metric) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(orderItems) || orderItems.length === 0) return "Invalid Input";
    if (metric !== "qty" && metric !== "revenue") return "Invalid Input";
    for (let i = 0; i < orderItems.length; i++) {
        const it = orderItems[i];
        if (!it || typeof it !== "object") return "Invalid Input";
        if (typeof it.productName !== "string") return "Invalid Input";
        if (typeof it.qtySold !== "number" || !Number.isInteger(it.qtySold) || it.qtySold < 0) return "Invalid Input";
        if (typeof it.revenue !== "number" || it.revenue < 0) return "Invalid Input";
    }

    // --- STEP 2: AGGREGATE DUPLICATE PRODUCTS TOGETHER ---
    // same productName appearing multiple times gets merged into one total
    const aggregateMap = {};
    for (let i = 0; i < orderItems.length; i++) {
        const { productName, qtySold, revenue } = orderItems[i];
        if (!aggregateMap[productName]) {
            aggregateMap[productName] = { productName, totalQtySold: 0, totalRevenue: 0 };
        }
        aggregateMap[productName].totalQtySold += qtySold;
        aggregateMap[productName].totalRevenue += revenue;
    }

    // --- STEP 3: SORT DESCENDING BY THE CHOSEN METRIC ---
    // map "qty" -> totalQtySold field, "revenue" -> totalRevenue field
    const metricKey = metric === "qty" ? "totalQtySold" : "totalRevenue";
    const rankedList = Object.values(aggregateMap).sort((a, b) => b[metricKey] - a[metricKey]);

    // --- STEP 4: TOP PRODUCT IS THE FIRST ITEM OF THE SORTED LIST ---
    const topProduct = rankedList[0];

    // --- STEP 5: RETURN RESULT ---
    return { topProduct, rankedList };
};

// --- EXAMPLE USAGE ---
console.log(topSellingProduct([
    { productName: "Mug", qtySold: 10, revenue: 2000 },
    { productName: "Plate", qtySold: 5, revenue: 2500 },
    { productName: "Mug", qtySold: 8, revenue: 1600 }
], "qty"));