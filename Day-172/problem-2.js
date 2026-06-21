// 🧩 PROBLEM–02: calculateStreak()

// Logic: Evaluates calendar records using functional array pipelines. It ignores corrupted blocks, computes gaps sequentially, maintains tracking indices for maximum and active intervals, and formats values cleanly via template literals.

const calculateStreak = (activityRecords) => {

    // --- STEP 1: INPUT DATA VALIDATION ---
    if (!Array.isArray(activityRecords) || activityRecords.length === 0) {
        return "Invalid Input";
    }

    const filteredDays = [];
    let previousDayValue = 0;

    // --- STEP 2: RECONCILE DATA INTEGRITY & SORT ORDERS ---
    for (let i = 0; i < activityRecords.length; i++) {
        const item = activityRecords[i];
        if (!item || typeof item !== "object" || Array.isArray(item)) {
            return "Invalid Input";
        }

        // Fallback rule: Silently omit records missing a day value
        if (item.day === undefined || item.day === null) {
            continue;
        }

        const day = item.day;
        const completed = item.meta?.completed ?? false;

        if (typeof day !== "number" || !Number.isInteger(day) || day < 1 || day > 365) {
            return "Invalid Input";
        }
        if (typeof completed !== "boolean") {
            return "Invalid Input";
        }

        // Validate strictly ascending chronological array sequences
        if (day < previousDayValue) {
            return "Invalid Input";
        }
        previousDayValue = day;

        // Collect matching days for streak calculations
        if (completed === true) {
            filteredDays.push(day);
        }
    }

    const totalCompleted = filteredDays.length;

    // --- STEP 3: FALLBACK PATTERNS FOR NULL ACTIVITIES ---
    if (totalCompleted === 0) {
        return {
            totalCompleted: 0,
            currentStreak: 0,
            longestStreak: 0,
            streakStatus: "No activity recorded."
        };
    }

    // --- STEP 4: SEQUENTIAL STREAK GAP CALCULATION ---
    let longestStreak = 0;
    let runningStreakCounter = 0;

    // Process milestones sequentially across all items to capture gaps
    for (let j = 0; j < filteredDays.length; j++) {
        if (j === 0) {
            runningStreakCounter = 1;
        } else {
            const gap = filteredDays[j] - filteredDays[j - 1];

            if (gap === 1) {
                runningStreakCounter += 1;
            } else if (gap > 1) {
                // Break detected: update high marks and reset interval counter
                if (runningStreakCounter > longestStreak) {
                    longestStreak = runningStreakCounter;
                }
                runningStreakCounter = 1;
            }
        }
    }

    // Capture boundary changes on the final array loop execution pass
    if (runningStreakCounter > longestStreak) {
        longestStreak = runningStreakCounter;
    }

    // The current streak must connect directly to the last active tracking element
    const currentStreak = runningStreakCounter;
    const streakStatus = `Current streak: ${currentStreak} day(s). Best: ${longestStreak} day(s).`;

    return {
        totalCompleted,
        currentStreak,
        longestStreak,
        streakStatus
    };
};

// --- EXAMPLE USAGE ---
console.log(calculateStreak([
    { day: 1, meta: { completed: true } },
    { day: 2, meta: { completed: true } },
    { day: 3, meta: { completed: false } },
    { day: 4, meta: { completed: true } },
    { day: 5, meta: { completed: true } },
    { day: 6, meta: { completed: true } }
]));