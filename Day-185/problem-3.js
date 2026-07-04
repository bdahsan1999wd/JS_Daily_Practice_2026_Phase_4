// PROBLEM-03: returnBook()

// Logic: Returns a book removes ONE matching checkout record (even if duplicates somehow exist, only the first match is removed) and bumps availableCopies up by 1, but never past totalCopies.

const returnBook = (catalog, borrowedBooks, memberId, isbn) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(catalog)) return "Invalid Input";
    if (!Array.isArray(borrowedBooks)) return "Invalid Input";
    if (typeof memberId !== "string" || memberId === "") return "Invalid Input";
    if (typeof isbn !== "string" || isbn === "") return "Invalid Input";
    for (let i = 0; i < catalog.length; i++) {
        const b = catalog[i];
        if (!b || typeof b !== "object") return "Invalid Input";
        if (typeof b.isbn !== "string") return "Invalid Input";
        if (typeof b.totalCopies !== "number") return "Invalid Input";
        if (typeof b.availableCopies !== "number") return "Invalid Input";
    }
    for (let i = 0; i < borrowedBooks.length; i++) {
        const r = borrowedBooks[i];
        if (!r || typeof r !== "object") return "Invalid Input";
        if (typeof r.memberId !== "string") return "Invalid Input";
        if (typeof r.isbn !== "string") return "Invalid Input";
    }

    // --- STEP 2: CHECK A MATCHING CHECKOUT RECORD EXISTS ---
    // findIndex gives us the POSITION of the first match (not just whether it exists)
    const matchIndex = borrowedBooks.findIndex(r => r.memberId === memberId && r.isbn === isbn);
    if (matchIndex === -1) {
        return { returned: false, reason: "No matching checkout record found", catalog, borrowedBooks };
    }

    // --- STEP 3: CHECK THE BOOK STILL EXISTS IN CATALOG ---
    const targetBook = catalog.find(b => b.isbn === isbn);
    if (!targetBook) {
        return { returned: false, reason: "Book not found in catalog", catalog, borrowedBooks };
    }

    // --- STEP 4: REMOVE ONLY THE FIRST MATCHING ENTRY (IMMUTABLY) ---
    // filtering BY POSITION (idx !== matchIndex) instead of by value
    // guarantees we only drop ONE entry, even with duplicates present
    const updatedBorrowedBooks = borrowedBooks.filter((_, idx) => idx !== matchIndex);

    // --- STEP 5: INCREASE availableCopies BY 1, CAPPED AT totalCopies (IMMUTABLY) ---
    const updatedCatalog = catalog.map(b =>
        b.isbn === isbn
            ? { ...b, availableCopies: Math.min(b.availableCopies + 1, b.totalCopies) }
            : b
    );

    // --- STEP 6: RETURN SUCCESS RESULT ---
    return { returned: true, catalog: updatedCatalog, borrowedBooks: updatedBorrowedBooks };
};

// --- EXAMPLE USAGE ---
console.log(returnBook(
    [{ isbn: "978-1", title: "Clean Code", totalCopies: 5, availableCopies: 2 }],
    [{ memberId: "M-101", isbn: "978-2" }, { memberId: "M-101", isbn: "978-1" }],
    "M-101",
    "978-1"
));