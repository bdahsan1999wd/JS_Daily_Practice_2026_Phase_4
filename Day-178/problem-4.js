// Problem-04: dispatchMultiChannelOtp()

// Logic: Follows prioritized network nodes sequentially to bypass channel outages. It collects execution trace blocks and halts processes at the initial active gateway safely.

const dispatchMultiChannelOtp = (userPreferences, otpCode, channelStatus) => {

    // --- STEP 1: INITIAL STRUCTURAL CHECKS ---
    if (typeof userPreferences !== "object" || userPreferences === null || Array.isArray(userPreferences)) {
        return "Invalid Input";
    }
    if (typeof otpCode !== "string" || otpCode === "") {
        return "Invalid Input";
    }
    if (typeof channelStatus !== "object" || channelStatus === null || Array.isArray(channelStatus)) {
        return "Invalid Input";
    }

    const { userId, preferredChannels } = userPreferences;
    if (typeof userId !== "string" || userId === "" || !Array.isArray(preferredChannels)) {
        return "Invalid Input";
    }

    // --- STEP 2: SAFE BOUNDARY RESOLUTIONS (PRIORITY TRACE ENGINE) ---
    let dispatched = false;
    let usedChannel = null;
    let message = "";
    const channelsAttempted = [];

    // --- STEP 3: DATA MAP CONVERSIONS ---
    for (let i = 0; i < preferredChannels.length; i++) {
        const channel = preferredChannels[i];
        if (typeof channel !== "string" || channel === "") return "Invalid Input";

        channelsAttempted.push(channel);

        // Intercept validation metrics using the status registry
        if (channelStatus[channel] === true) {
            dispatched = true;
            usedChannel = channel;
            message = `OTP delivered via ${usedChannel}`;
            break; // Terminate execution at first operational link
        }
    }

    if (!dispatched) {
        usedChannel = null;
        message = "All preferred channels are currently unavailable.";
    }

    // --- STEP 4: EMIT LOG BLUEPRINT PACKAGES ---
    return {
        dispatched,
        usedChannel,
        message,
        channelsAttempted
    };
};

// --- EXAMPLE USAGE ---
console.log(dispatchMultiChannelOtp(
    { userId: "U-700", preferredChannels: ["SMS", "EMAIL", "PUSH"] },
    "998877",
    { SMS: false, EMAIL: true, PUSH: true }
));