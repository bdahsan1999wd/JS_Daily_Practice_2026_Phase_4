// 🧩 PROBLEM–04: deepCloneBook()

// Logic: This function uses a serialization pipeline to sever references to nested structures. This allows mutations to target child arrays or objects without changing the original record.

function deepCloneBook(bookRecord) {

    // --- STEP 1: VALIDATION ---
    if (!bookRecord || typeof bookRecord !== "object" || Array.isArray(bookRecord)) {
        return "Invalid Input";
    }

    if (
        typeof bookRecord.bookId !== "string" ||
        typeof bookRecord.title !== "string" ||
        !bookRecord.locationInfo || typeof bookRecord.locationInfo !== "object" || Array.isArray(bookRecord.locationInfo) ||
        typeof bookRecord.locationInfo.shelf !== "string" ||
        typeof bookRecord.locationInfo.floor !== "string" ||
        !Array.isArray(bookRecord.tags)
    ) {
        return "Invalid Input";
    }

    // --- STEP 2: HARD SERIALIZED DEEP COPY ---
    const clonedRecord = JSON.parse(JSON.stringify(bookRecord));

    // --- STEP 3: EXECUTE ISOLATED MUTATIONS ON THE CLONE ---
    clonedRecord.cloneTag = "CLONED";
    clonedRecord.locationInfo.shelf = "Unknown";
    clonedRecord.tags.push("cloned-tag");

    // --- STEP 4: RETURN BOTH DISTINCT LIFE CYCLES ---
    return {
        original: bookRecord,
        clone: clonedRecord
    };
}

// --- EXAMPLE USAGE ---
console.log(
    deepCloneBook({
        bookId: "BK-004",
        title: "The Alchemist",
        locationInfo: { shelf: "A-12", floor: "Ground" },
        tags: ["fiction", "philosophy"]
    })
);

console.log(deepCloneBook({ bookId: "BK-MISSING", locationInfo: "Invalid String Nesting Type" }));