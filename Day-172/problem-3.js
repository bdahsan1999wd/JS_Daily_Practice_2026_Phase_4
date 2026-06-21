// 🧩 PROBLEM–03: mergeSessions()

// Logic: Blends data clusters cleanly using modern spread parameters. It ensures structural data immutability, joins collections using flat expansions, and isolates unique array elements cleanly via object mappings or standard arrays.

const mergeSessions = (baseSession, ...additionalSessions) => {

    // --- STEP 1: PARAMETER PROFILE VALIDATION ---
    if (!baseSession || typeof baseSession !== "object" || Array.isArray(baseSession)) {
        return "Invalid Input";
    }
    // Rest parameter enforcement: Requires at least 1 additional dataset segment
    if (!additionalSessions || additionalSessions.length === 0) {
        return "Invalid Input";
    }

    const { userId, startedAt, actions: baseActions, pagesVisited: basePages } = baseSession;

    if (
        typeof userId !== "string" || userId === "" ||
        typeof startedAt !== "string" || startedAt === "" ||
        !Array.isArray(baseActions) || !Array.isArray(basePages)
    ) {
        return "Invalid Input";
    }

    // Pre-populate our merge collections with baseline records immutably
    let combinedActionsList = [...baseActions];
    let rawPagesTrackingList = [...basePages];
    let customPropertyOverrides = {};

    // --- STEP 2: SCAN AND RESOLVE REST ARRAYS ---
    for (let i = 0; i < additionalSessions.length; i++) {
        const customSessionBlock = additionalSessions[i];

        if (!customSessionBlock || typeof customSessionBlock !== "object" || Array.isArray(customSessionBlock)) {
            return "Invalid Input";
        }

        const { actions, pagesVisited, ...remainderProperties } = customSessionBlock;

        // Unpack properties cleanly if matching definitions exist
        if (actions !== undefined) {
            if (!Array.isArray(actions)) return "Invalid Input";
            combinedActionsList.push(...actions);
        }
        if (pagesVisited !== undefined) {
            if (!Array.isArray(pagesVisited)) return "Invalid Input";
            rawPagesTrackingList.push(...pagesVisited);
        }

        // Apply remaining parameter updates using object spread overrides
        customPropertyOverrides = { ...customPropertyOverrides, ...remainderProperties };
    }

    // --- STEP 3: EXTRACT UNIQUE PAGINATION INDEX ARRAYS ---
    const uniquePagesVisited = [];
    rawPagesTrackingList.forEach(page => {
        if (typeof page !== "string") return "Invalid Input";
        if (!uniquePagesVisited.includes(page)) {
            uniquePagesVisited.push(page);
        }
    });

    // Check for nested structural schema errors across our loops
    if (combinedActionsList.some(action => typeof action !== "string")) {
        return "Invalid Input";
    }

    // --- STEP 4: SUMMARIZE STRUCTURAL VALUES ---
    const totalActions = combinedActionsList.length;
    const uniquePages = uniquePagesVisited.length;
    const totalMergedCount = additionalSessions.length + 1;

    const mergeSummary = `${totalMergedCount} session(s) merged. ${totalActions} total action(s). ${uniquePages} unique page(s) visited.`;

    // --- STEP 5: EMIT INTEGRATED VALUE SETS ---
    return {
        userId,
        startedAt,
        actions: combinedActionsList,
        pagesVisited: uniquePagesVisited,
        totalActions,
        uniquePages,
        mergedSessions: totalMergedCount,
        ...customPropertyOverrides,
        mergeSummary
    };
};

// --- EXAMPLE USAGE ---
console.log(mergeSessions(
    { userId: "U-401", startedAt: "2025-01-01", actions: ["login", "view-home"], pagesVisited: ["/home", "/profile"] },
    { actions: ["view-products", "add-to-cart"], pagesVisited: ["/products", "/home"] },
    { actions: ["checkout"], pagesVisited: ["/checkout", "/profile"] }
));