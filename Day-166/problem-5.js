// 🧩 PROBLEM–05: generateNotificationSummary()

// Logic: Flattens collections of batch logs into a unified list using the spread operator. It then evaluates delivery metrics, tracks alert types, identifies high-priority warnings, and computes the system's dispatch success rate.

const generateNotificationSummary = (...notificationBatches) => {

    // --- STEP 1: CAPTURED ARRAY LIST STRUCTURAL CHECK ---
    if (!notificationBatches || notificationBatches.length === 0) {
        return "Invalid Input";
    }

    // Confirm every element provided under rest arguments collection is configured as a list
    for (let i = 0; i < notificationBatches.length; i++) {
        if (!Array.isArray(notificationBatches[i])) {
            return "Invalid Input";
        }
    }

    // --- STEP 2: CONCATENATE SEPARATED BATCHES INTO A UNIFIED ARCHIVE LIST ---
    const allNotifications = [];
    notificationBatches.forEach(batch => {
        allNotifications.push(...batch);
    });

    // Guard Clause: If flat target list contains no entries, flag validation error
    if (allNotifications.length === 0) {
        return "Invalid Input";
    }

    // --- STEP 3: OPERATIONAL BASE COUNTERS INITIALIZATION ---
    let totalNotifications = allNotifications.length;
    let totalDispatched = 0;
    let totalFailed = 0;
    let highPriorityCount = 0;

    const typeBreakdown = { INFO: 0, WARNING: 0, ERROR: 0, SUCCESS: 0 };
    const validTypes = ["INFO", "WARNING", "ERROR", "SUCCESS"];

    // --- STEP 4: AGGREGATE SYSTEM METRICS IN A SINGLE PASS ---
    for (let i = 0; i < allNotifications.length; i++) {
        const entry = allNotifications[i];

        if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
            return "Invalid Input";
        }

        const type = entry.type;
        const dispatched = entry.dispatched;
        const priority = entry.meta?.priority ?? 3;

        // Ensure internal values map cleanly to base system parameters
        if (!validTypes.includes(type) || typeof dispatched !== "boolean" || typeof priority !== "number") {
            return "Invalid Input";
        }

        // Increment configuration state counts depending on type values
        typeBreakdown[type] += 1;

        if (dispatched === true) {
            totalDispatched += 1;
        } else {
            totalFailed += 1;
        }

        if (priority >= 4) {
            highPriorityCount += 1;
        }
    }

    // --- STEP 5: COMPUTE SUCCESS RATES AND ROUND SAFELY ---
    const dispatchRate = Number(((totalDispatched / totalNotifications) * 100).toFixed(2));

    return {
        totalNotifications,
        totalDispatched,
        totalFailed,
        typeBreakdown,
        highPriorityCount,
        dispatchRate
    };
};

// --- EXAMPLE USAGE ---
console.log(
    generateNotificationSummary(
        [
            { type: "INFO", dispatched: true, meta: { priority: 2 } },
            { type: "ERROR", dispatched: false, meta: { priority: 5 } }
        ],
        [
            { type: "SUCCESS", dispatched: true, meta: { priority: 4 } },
            { type: "WARNING", dispatched: true }
        ]
    )
);