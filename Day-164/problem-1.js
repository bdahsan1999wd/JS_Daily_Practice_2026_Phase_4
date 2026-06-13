// 🧩 PROBLEM–01: buildBookRecord()

// Logic: This function processes metadata split across structural themes (content, publishing, and inventory metrics) and aggregates them into a unified record using the spread operator while executing chronological and availability checks.

function buildBookRecord(bookInfo, publishingInfo, libraryInfo) {

    // --- STEP 1: VALIDATION ---
    // Ensure all three inputs are valid objects and not null/arrays.
    if (
        !bookInfo || typeof bookInfo !== "object" || Array.isArray(bookInfo) ||
        !publishingInfo || typeof publishingInfo !== "object" || Array.isArray(publishingInfo) ||
        !libraryInfo || typeof libraryInfo !== "object" || Array.isArray(libraryInfo)
    ) {
        return "Invalid Input";
    }

    // Validate bookInfo fields
    const { title, author, genre, totalPages } = bookInfo;
    if (
        typeof title !== "string" || title.trim() === "" ||
        typeof author !== "string" || author.trim() === "" ||
        typeof genre !== "string" || genre.trim() === "" ||
        typeof totalPages !== "number" || !Number.isInteger(totalPages) || totalPages <= 0
    ) {
        return "Invalid Input";
    }

    // Validate publishingInfo fields
    const { publisher, publishYear, edition } = publishingInfo;
    if (
        typeof publisher !== "string" || publisher.trim() === "" ||
        typeof publishYear !== "number" || !Number.isInteger(publishYear) || publishYear < 1900 || publishYear > 2025 ||
        typeof edition !== "number" || !Number.isInteger(edition) || edition < 1
    ) {
        return "Invalid Input";
    }

    // Validate libraryInfo fields
    const { bookId, totalCopies, availableCopies } = libraryInfo;
    if (
        typeof bookId !== "string" || bookId.trim() === "" ||
        typeof totalCopies !== "number" || !Number.isInteger(totalCopies) || totalCopies < 1 ||
        typeof availableCopies !== "number" || !Number.isInteger(availableCopies) || availableCopies < 0
    ) {
        return "Invalid Input";
    }

    // --- STEP 2: CALCULATE COMPUTED FIELDS ---
    const isAvailable = availableCopies > 0;
    const borrowedCopies = totalCopies - availableCopies;
    const bookAge = 2025 - publishYear;

    let ageCategory;
    if (bookAge >= 50) {
        ageCategory = "CLASSIC";
    } else if (bookAge >= 20) {
        ageCategory = "ESTABLISHED";
    } else if (bookAge >= 5) {
        ageCategory = "MODERN";
    } else {
        ageCategory = "NEW RELEASE";
    }

    // --- STEP 3: RETURN CONSOLIDATED RECORD ---
    return {
        ...bookInfo,
        ...publishingInfo,
        ...libraryInfo,
        isAvailable,
        borrowedCopies,
        bookAge,
        ageCategory,
        addedAt: "2025-01-01"
    };
}

// --- EXAMPLE USAGE ---
console.log(
    buildBookRecord(
        { title: "Clean Code", author: "Robert C. Martin", genre: "Technology", totalPages: 431 },
        { publisher: "Prentice Hall", publishYear: 2008, edition: 1 },
        { bookId: "BK-001", totalCopies: 5, availableCopies: 3 }
    )
);

console.log(buildBookRecord({ title: "Clean Code" }, {}, null));