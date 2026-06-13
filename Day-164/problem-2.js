// 🧩 PROBLEM–02: updateBookRecord()

// Logic: Modifies target operational metrics immutably via spread merging. Re-evaluates internal flags and prevents updates that create conflicting data states, such as having more available copies than total copies.

function updateBookRecord(existingBook, updates) {

    // --- STEP 1: VALIDATION ---
    // Ensure both parameters are valid non-empty objects.
    if (
        !existingBook || typeof existingBook !== "object" || Array.isArray(existingBook) ||
        !updates || typeof updates !== "object" || Array.isArray(updates) ||
        Object.keys(updates).length === 0
    ) {
        return "Invalid Input";
    }

    // Validate minimum required existingBook base parameters
    if (
        typeof existingBook.bookId !== "string" || existingBook.bookId.trim() === "" ||
        typeof existingBook.title !== "string" || existingBook.title.trim() === "" ||
        typeof existingBook.totalCopies !== "number" || !Number.isInteger(existingBook.totalCopies) || existingBook.totalCopies < 1 ||
        typeof existingBook.availableCopies !== "number" || !Number.isInteger(existingBook.availableCopies) || existingBook.availableCopies < 0 ||
        typeof existingBook.publishYear !== "number" || !Number.isInteger(existingBook.publishYear) || existingBook.publishYear < 1900 || existingBook.publishYear > 2025
    ) {
        return "Invalid Input";
    }

    // Validate update parameters explicitly if present
    if (updates.hasOwnProperty("totalCopies") && (typeof updates.totalCopies !== "number" || !Number.isInteger(updates.totalCopies) || updates.totalCopies < 1)) {
        return "Invalid Input";
    }
    if (updates.hasOwnProperty("availableCopies") && (typeof updates.availableCopies !== "number" || !Number.isInteger(updates.availableCopies) || updates.availableCopies < 0)) {
        return "Invalid Input";
    }
    if (updates.hasOwnProperty("edition") && (typeof updates.edition !== "number" || !Number.isInteger(updates.edition) || updates.edition < 1)) {
        return "Invalid Input";
    }
    if (updates.hasOwnProperty("publisher") && (typeof updates.publisher !== "string" || updates.publisher.trim() === "")) {
        return "Invalid Input";
    }
    if (updates.hasOwnProperty("genre") && (typeof updates.genre !== "string" || updates.genre.trim() === "")) {
        return "Invalid Input";
    }

    // --- STEP 2: IMMUTABLE STATE MERGING ---
    const updatedBook = {
        ...existingBook,
        ...updates,
        lastUpdated: "2025-01-01"
    };

    // Logical cross-validation: Final available copies must not outnumber total copies
    if (updatedBook.availableCopies > updatedBook.totalCopies) {
        return "Invalid Input";
    }

    // --- STEP 3: RECOMPUTE CORRELATING DEPENDENCIES ---
    updatedBook.isAvailable = updatedBook.availableCopies > 0;
    updatedBook.borrowedCopies = updatedBook.totalCopies - updatedBook.availableCopies;

    return updatedBook;
}

// --- EXAMPLE USAGE ---
console.log(
    updateBookRecord(
        { bookId: "BK-002", title: "The Pragmatic Programmer", totalCopies: 4, availableCopies: 4, publishYear: 1999 },
        { totalCopies: 6, availableCopies: 2 }
    )
);

console.log(
    updateBookRecord(
        { bookId: "BK-002", title: "The Pragmatic Programmer", totalCopies: 4, availableCopies: 4, publishYear: 1999 },
        { availableCopies: 10 }
    )
);