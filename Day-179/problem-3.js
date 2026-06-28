// PROBLEM-03: detectBreachPatterns()

// Logic: Scans a batch of login attempts and flags 3 different attack patterns — credential stuffing (one IP, many usernames), brute force (one username, many failures), and rapid-fire (one username, a tight burst of attempts in a short window).

const detectBreachPatterns = (loginAttempts) => {

    // --- STEP 1: VALIDATION ---
    // 1a) must be a non-empty array
    if (!Array.isArray(loginAttempts) || loginAttempts.length === 0) {
        return "Invalid Input";
    }
    // 1b) every entry must have the correct shape/types
    for (let i = 0; i < loginAttempts.length; i++) {
        const a = loginAttempts[i];
        if (!a || typeof a !== "object") return "Invalid Input";
        if (typeof a.username !== "string" || a.username === "") return "Invalid Input";
        if (typeof a.ipAddress !== "string" || a.ipAddress === "") return "Invalid Input";
        if (typeof a.success !== "boolean") return "Invalid Input";
        if (typeof a.timestampMinutes !== "number" || isNaN(a.timestampMinutes)) return "Invalid Input";
    }

    // --- STEP 2: GROUP RAW DATA INTO LOOKUP MAPS ---
    // We pre-process the data once into 3 maps so each pattern check
    // below becomes a simple lookup instead of re-scanning the array.

    // ipMap: ipAddress -> Set of DISTINCT usernames seen from that IP
    const ipMap = {};
    // userFailMap: username -> count of FAILED (success === false) attempts
    const userFailMap = {};
    // userTimestampMap: username -> array of ALL their timestamps (minutes)
    const userTimestampMap = {};

    for (let i = 0; i < loginAttempts.length; i++) {
        const { username, ipAddress, success, timestampMinutes } = loginAttempts[i];

        if (!ipMap[ipAddress]) ipMap[ipAddress] = new Set();
        ipMap[ipAddress].add(username);

        if (!userFailMap[username]) userFailMap[username] = 0;
        if (success === false) userFailMap[username] += 1;

        if (!userTimestampMap[username]) userTimestampMap[username] = [];
        userTimestampMap[username].push(timestampMinutes);
    }

    // --- STEP 3: PATTERN A — CREDENTIAL STUFFING ---
    // Flag any IP address that was used to attempt login for
    // 3 or more DIFFERENT usernames (classic credential-stuffing signal)
    const suspiciousIPs = [];
    for (const ip in ipMap) {
        if (ipMap[ip].size >= 3) {
            suspiciousIPs.push(ip);
        }
    }

    // --- STEP 4: PATTERN B — BRUTE FORCE ---
    // Flag any username that has 5 or more FAILED login attempts
    const bruteForceUsernames = [];
    for (const username in userFailMap) {
        if (userFailMap[username] >= 5) {
            bruteForceUsernames.push(username);
        }
    }

    // --- STEP 5: PATTERN C — RAPID FIRE ---
    // For each username: sort their timestamps, then slide a 3-wide
    // window across the sorted list. If ANY 3 consecutive timestamps
    // span 5 minutes or less, that's a "rapid fire" burst of attempts.
    const rapidFireUsernames = [];
    for (const username in userTimestampMap) {
        const sortedTimes = [...userTimestampMap[username]].sort((x, y) => x - y);

        if (sortedTimes.length < 3) continue; // need at least 3 attempts to form a window

        let isRapidFire = false;
        for (let i = 0; i <= sortedTimes.length - 3; i++) {
            const windowSpan = sortedTimes[i + 2] - sortedTimes[i]; // span of 3 consecutive sorted attempts
            if (windowSpan <= 5) {
                isRapidFire = true;
                break; // found one qualifying window, no need to check further
            }
        }

        if (isRapidFire) {
            rapidFireUsernames.push(username);
        }
    }

    // --- STEP 6: OVERALL THREAT LEVEL ---
    let overallThreatLevel;
    if (suspiciousIPs.length > 0 || bruteForceUsernames.length > 0) {
        overallThreatLevel = "SEVERE";       // A or B found = most serious
    } else if (rapidFireUsernames.length > 0) {
        overallThreatLevel = "ELEVATED";     // only C found
    } else {
        overallThreatLevel = "NORMAL";       // nothing suspicious found
    }

    // --- STEP 7: RETURN FINAL RESULT ---
    return { suspiciousIPs, bruteForceUsernames, rapidFireUsernames, overallThreatLevel };
};

// --- EXAMPLE USAGE ---
console.log(detectBreachPatterns([
    { username: "u1", ipAddress: "1.1.1.1", success: false, timestampMinutes: 10 },
    { username: "u2", ipAddress: "1.1.1.1", success: false, timestampMinutes: 11 },
    { username: "u3", ipAddress: "1.1.1.1", success: false, timestampMinutes: 12 },
    { username: "u4", ipAddress: "2.2.2.2", success: true, timestampMinutes: 50 }
]));