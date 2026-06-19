// 🧩 PROBLEM–05: mergeContentSections()

// Logic: Reviews structure layout formats and flattens input elements using rest parameters. It maps values, matches template strings based on structural choices, tracks total words, and returns calculated content configurations.

const mergeContentSections = (layout, ...sections) => {

    // --- STEP 1: INITIAL SCHEMA PARAMETER CHECKS ---
    const permittedLayouts = ["BLOG", "REPORT", "EMAIL"];
    if (typeof layout !== "string" || !permittedLayouts.includes(layout)) {
        return "Invalid Input";
    }

    // Rest parameter enforcement: Must process at least 1 section dictionary entry
    if (!sections || sections.length === 0) {
        return "Invalid Input";
    }

    let totalWordCount = 0;
    const formattedSections = [];

    // --- STEP 2: LOOP AGGREGATE PASS ---
    for (let i = 0; i < sections.length; i++) {
        const item = sections[i];

        if (!item || typeof item !== "object" || Array.isArray(item)) {
            return "Invalid Input";
        }

        // Apply path lookup fallbacks cleanly using modern primitives
        const sectionType = item.sectionType ?? "BODY";
        const title = item.title ?? "Untitled";
        const content = item.content ?? "No content provided.";
        const wordCount = item.meta?.wordCount ?? 0;
        const author = item.meta?.author ?? "Anonymous";

        if (
            typeof sectionType !== "string" ||
            typeof title !== "string" ||
            typeof content !== "string" ||
            typeof wordCount !== "number" || isNaN(wordCount) || wordCount < 0 ||
            typeof author !== "string"
        ) {
            return "Invalid Input";
        }

        // Track and increment total internal running numbers
        totalWordCount += wordCount;

        // --- STEP 3: MATCH FORMAT STRINGS BY LAYOUT SCHEME ---
        let sectionLayoutOutput = "";
        if (layout === "BLOG") {
            sectionLayoutOutput = `## ${title}\n${content}\n— ${author}`;
        } else if (layout === "REPORT") {
            sectionLayoutOutput = `[${sectionType}] ${title}: ${content}`;
        } else if (layout === "EMAIL") {
            sectionLayoutOutput = `<b>${title}</b><br>${content}`;
        }

        formattedSections.push(sectionLayoutOutput);
    }

    // --- STEP 4: EXPORT REPORT METRICS ---
    return {
        layout,
        sectionCount: sections.length,
        totalWordCount,
        formattedSections
    };
};

// --- EXAMPLE USAGE ---
console.log(mergeContentSections(
    "BLOG",
    { sectionType: "INTRO", title: "Why JS?", content: "JS is everywhere.", meta: { wordCount: 3, author: "Karim" } },
    { sectionType: "BODY", title: "ES6 Features", content: "Arrow functions are great.", meta: { wordCount: 4 } }
));