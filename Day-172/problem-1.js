// 🧩 PROBLEM–01: logActivities()

// Logic: Gathers scattered activity trails using structural rest parameters. It matches and binds platform details cleanly via nullish defaults, safely transforms metadata strings into tracked items using an arrow function map, and summarizes interaction patterns through descriptive template strings.

const logActivities = (userId, sessionInfo, ...actions) => {

    // --- STEP 1: INITIAL STRUCTURAL CHECKS ---
    if (typeof userId !== "string" || userId === "") {
        return "Invalid Input";
    }
    // Rest parameter confirmation: Actions must be recorded at least once.
    if (!actions || actions.length === 0) {
        return "Invalid Input";
    }

    // --- STEP 2: SAFE BOUNDARY RESOLUTIONS ---
    const device = sessionInfo?.device ?? "unknown";
    const location = sessionInfo?.location ?? "unknown";
    const sessionId = sessionInfo?.sessionId ?? "NO-SESSION";

    if (typeof device !== "string" || typeof location !== "string" || typeof sessionId !== "string") {
        return "Invalid Input";
    }

    // Ensure all items collected via rest arrays match text parameters
    for (let i = 0; i < actions.length; i++) {
        if (typeof actions[i] !== "string" || actions[i] === "") {
            return "Invalid Input";
        }
    }

    // --- STEP 3: DATA MAP CONVERSIONS ---
    const totalActions = actions.length;
    const activityLog = actions.map(action => `[${sessionId}] ${userId} → ${action}`);
    const sessionSummary = `User ${userId} performed ${totalActions} action(s) from ${device} in ${location}.`;

    // --- STEP 4: EMIT LOG BLUEPRINT PACKAGES ---
    return {
        userId,
        device,
        location,
        sessionId,
        totalActions,
        activityLog,
        sessionSummary
    };
};

// --- EXAMPLE USAGE ---
console.log(logActivities(
    "U-301",
    { device: "Mobile", location: "Dhaka", sessionId: "SES-881" },
    "Logged in",
    "Viewed dashboard",
    "Updated profile"
));