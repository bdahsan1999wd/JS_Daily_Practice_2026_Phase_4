// 🧩 PROBLEM–03: buildPaginatedResponse()

// Logic: This function tracks boundaries and page metrics using strict math engines. It applies nullish defaults for partial pagination records and constructs a concise navigation summary.

const buildPaginatedResponse = (items, pagination) => {

    // --- STEP 1: INITIAL STRUCTURAL CHECKS ---
    if (!Array.isArray(items) || items.length === 0) {
        return "Invalid Input";
    }
    if (!pagination || typeof pagination !== "object" || Array.isArray(pagination)) {
        return "Invalid Input";
    }

    // --- STEP 2: RESOLVE METRICS VIA NULLISH COALESCING ---
    const currentPage = pagination.currentPage ?? 1;
    const pageSize = pagination.pageSize ?? 10;
    const totalItems = pagination.totalItems ?? items.length;

    // Validate ranges to secure mathematical calculations
    if (
        typeof currentPage !== "number" || !Number.isInteger(currentPage) || currentPage < 1 ||
        typeof pageSize !== "number" || !Number.isInteger(pageSize) || pageSize < 1 || pageSize > 100 ||
        typeof totalItems !== "number" || !Number.isInteger(totalItems) || totalItems < 0
    ) {
        return "Invalid Input";
    }

    // --- STEP 3: COMPUTED CONFIGURATION BOUNDS ---
    const totalPages = Math.ceil(totalItems / pageSize) || 1;
    const hasNextPage = currentPage < totalPages;
    const hasPreviousPage = currentPage > 1;

    // Determine data index windows
    const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const endIndex = Math.min(currentPage * pageSize, totalItems);

    // --- STEP 4: TEMPLATE SUMMATION & EXPORT ---
    const paginationSummary = `Showing ${startIndex}–${endIndex} of ${totalItems} items (Page ${currentPage} of ${totalPages})`;

    return {
        items,
        currentPage,
        pageSize,
        totalItems,
        totalPages,
        hasNextPage,
        hasPreviousPage,
        startIndex,
        endIndex,
        paginationSummary
    };
};

// --- EXAMPLE USAGE ---
console.log(buildPaginatedResponse(
    ["Item1", "Item2", "Item3", "Item4", "Item5"],
    { currentPage: 2, pageSize: 5, totalItems: 23 }
));