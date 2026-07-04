// PROBLEM-04: libraryStatusReport()

// Logic: Summarizes the entire library state — utilization rate, which books are fully borrowed out, and which single ISBN has been borrowed the most times.

const libraryStatusReport = (catalog, borrowedBooks) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(catalog) || catalog.length === 0) return "Invalid Input";
    if (!Array.isArray(borrowedBooks)) return "Invalid Input";
    for (let i = 0; i < catalog.length; i++) {
        const b = catalog[i];
        if (!b || typeof b !== "object") return "Invalid Input";
        if (typeof b.isbn !== "string") return "Invalid Input";
        if (typeof b.title !== "string") return "Invalid Input";
        if (typeof b.totalCopies !== "number") return "Invalid Input";
        if (typeof b.availableCopies !== "number") return "Invalid Input";
    }
    for (let i = 0; i < borrowedBooks.length; i++) {
        const r = borrowedBooks[i];
        if (!r || typeof r !== "object") return "Invalid Input";
        if (typeof r.memberId !== "string") return "Invalid Input";
        if (typeof r.isbn !== "string") return "Invalid Input";
    }

    // --- STEP 2: BASIC COUNTS ---
    const totalBooks = catalog.length;
    const totalCopiesInSystem = catalog.reduce((sum, b) => sum + b.totalCopies, 0);
    const totalCheckedOut = borrowedBooks.length;

    // --- STEP 3: UTILIZATION RATE (%) ---
    const utilizationRate = Number(((totalCheckedOut / totalCopiesInSystem) * 100).toFixed(2));

    // --- STEP 4: FULLY BORROWED BOOKS (zero copies left) ---
    const fullyBorrowedBooks = catalog.filter(b => b.availableCopies === 0).map(b => b.title);

    // --- STEP 5: MOST BORROWED BOOK ---
    // Track BOTH the count per isbn AND the order each isbn first appeared.
    // When scanning for the max, use STRICT ">" (not ">=") so that on a
    // tie, the isbn that appeared FIRST in borrowedBooks keeps the title.
    let mostBorrowedBook = null;
    if (borrowedBooks.length > 0) {
        const countMap = {};
        const firstSeenOrder = [];

        for (let i = 0; i < borrowedBooks.length; i++) {
            const bookIsbn = borrowedBooks[i].isbn;
            if (!(bookIsbn in countMap)) {
                countMap[bookIsbn] = 0;
                firstSeenOrder.push(bookIsbn);
            }
            countMap[bookIsbn]++;
        }

        let maxCount = -1;
        for (let i = 0; i < firstSeenOrder.length; i++) {
            const bookIsbn = firstSeenOrder[i];
            if (countMap[bookIsbn] > maxCount) {
                maxCount = countMap[bookIsbn];
                mostBorrowedBook = bookIsbn;
            }
        }
    }

    // --- STEP 6: RETURN RESULT ---
    return {
        totalBooks,
        totalCopiesInSystem,
        totalCheckedOut,
        utilizationRate,
        fullyBorrowedBooks,
        mostBorrowedBook
    };
};

// --- EXAMPLE USAGE ---
console.log(libraryStatusReport(
    [
        { isbn: "978-1", title: "Clean Code", totalCopies: 5, availableCopies: 3 },
        { isbn: "978-2", title: "Atomic Habits", totalCopies: 2, availableCopies: 0 }
    ],
    [
        { memberId: "M1", isbn: "978-1" },
        { memberId: "M2", isbn: "978-2" },
        { memberId: "M3", isbn: "978-2" }
    ]
));