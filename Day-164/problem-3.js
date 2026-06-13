// 🧩 PROBLEM–03: extractBookSections()

// Logic: This function maps flat metadata shapes into structured sub-objects via parameter destructuring, and then maps system state traces to descriptive statuses.

function extractBookSections(bookRecord) {

    // --- STEP 1: VALIDATION ---
    // Ensure entry is an object and all required schema keys are present.
    if (!bookRecord || typeof bookRecord !== "object" || Array.isArray(bookRecord)) {
        return "Invalid Input";
    }

    const mandatoryKeys = [
        "bookId", "title", "author", "genre", "publisher", "publishYear",
        "edition", "totalCopies", "availableCopies", "borrowedCopies", "ageCategory", "addedAt"
    ];

    for (const key of mandatoryKeys) {
        if (!bookRecord.hasOwnProperty(key)) {
            return "Invalid Input";
        }
    }

    // --- STEP 2: DISTRIBUTE PROPERTIES VIA DESTRUCTURING ---
    const {
        bookId, title, author, genre,
        publisher, publishYear, edition, ageCategory,
        totalCopies, availableCopies, borrowedCopies,
        addedAt
    } = bookRecord;

    // --- STEP 3: ASSEMBLE SEGMENTED RESPONSE ---
    return {
        bookDetails: { bookId, title, author, genre },
        publishingDetails: { publisher, publishYear, edition, ageCategory },
        copyDetails: { totalCopies, availableCopies, borrowedCopies },
        librarySummary: {
            registeredOn: addedAt,
            isFullyAvailable: borrowedCopies === 0,
            isFullyBorrowed: availableCopies === 0
        }
    };
}

// --- EXAMPLE USAGE ---
console.log(
    extractBookSections({
        bookId: "BK-003",
        title: "Atomic Habits",
        author: "James Clear",
        genre: "Self-Help",
        publisher: "Avery",
        publishYear: 2018,
        edition: 2,
        totalCopies: 3,
        availableCopies: 0,
        borrowedCopies: 3,
        ageCategory: "MODERN",
        addedAt: "2025-01-01"
    })
);

console.log(extractBookSections({ bookId: "BK-ERR" }));