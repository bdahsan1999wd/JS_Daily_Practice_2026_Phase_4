// PROBLEM-03: analyzeFeedbackTopics()

// Logic: Flattens every feedback entry's topic tags into one frequency count, finds the most-discussed topic, and digs into how negatively that specific topic is being talked about.

const analyzeFeedbackTopics = (feedbackEntries) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(feedbackEntries) || feedbackEntries.length === 0) return "Invalid Input";
    for (let i = 0; i < feedbackEntries.length; i++) {
        const f = feedbackEntries[i];
        if (!f || typeof f !== "object") return "Invalid Input";
        if (typeof f.customerName !== "string") return "Invalid Input";
        if (!Array.isArray(f.topics)) return "Invalid Input";
        for (let j = 0; j < f.topics.length; j++) {
            if (typeof f.topics[j] !== "string") return "Invalid Input";
        }
        if (!["POSITIVE", "NEUTRAL", "NEGATIVE"].includes(f.sentiment)) return "Invalid Input";
    }

    // --- STEP 2: COUNT TOPIC FREQUENCY ACROSS ALL ENTRIES ---
    // for every feedback entry, every topic it lists adds 1 to that topic's count
    const topicFrequency = {};
    for (let i = 0; i < feedbackEntries.length; i++) {
        const topics = feedbackEntries[i].topics;
        for (let j = 0; j < topics.length; j++) {
            const topic = topics[j];
            topicFrequency[topic] = (topicFrequency[topic] ?? 0) + 1;
        }
    }

    // --- STEP 3: FIND THE MOST MENTIONED TOPIC ---
    let mostMentionedTopic = null;
    let maxCount = -1;
    for (const topic in topicFrequency) {
        if (topicFrequency[topic] > maxCount) {
            maxCount = topicFrequency[topic];
            mostMentionedTopic = topic;
        }
    }

    // --- STEP 4: NEGATIVE SENTIMENT % SPECIFICALLY FOR THE TOP TOPIC ---
    let negativeSentimentPercent = null;
    if (mostMentionedTopic !== null) {
        const entriesWithTopic = feedbackEntries.filter(f => f.topics.includes(mostMentionedTopic));
        const negativeCount = entriesWithTopic.filter(f => f.sentiment === "NEGATIVE").length;
        negativeSentimentPercent = Number(((negativeCount / entriesWithTopic.length) * 100).toFixed(2));
    }
    // if there were NO topics anywhere, mostMentionedTopic stays null,
    // and negativeSentimentPercent correctly stays null too

    // --- STEP 5: RETURN RESULT ---
    return { topicFrequency, mostMentionedTopic, negativeSentimentPercent };
};

// --- EXAMPLE USAGE ---
console.log(analyzeFeedbackTopics([
    { customerName: "A", topics: ["shipping", "quality"], sentiment: "NEGATIVE" },
    { customerName: "B", topics: ["shipping"], sentiment: "POSITIVE" },
    { customerName: "C", topics: ["shipping", "price"], sentiment: "NEGATIVE" }
]));