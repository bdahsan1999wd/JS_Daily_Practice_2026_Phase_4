// PROBLEM-01: addBookCopy()

// Logic: If a book's ISBN already exists, this just ADDS more copies to it instead of rejecting. If it's a brand new ISBN, it gets added as a fresh catalog entry.

const addBookCopy = (catalog, newBook) => {

    // --- STEP 1: VALIDATION ---
    // 1a) catalog must be an array
    if (!Array.isArray(catalog)) return "Invalid Input";
    // 1b) newBook must be a plain object
    if (typeof newBook !== "object" || newBook === null || Array.isArray(newBook)) {
        return "Invalid Input";
    }
    // 1c) validate every existing catalog entry
    for (let i = 0; i < catalog.length; i++) {
        const b = catalog[i];
        if (!b || typeof b !== "object") return "Invalid Input";
        if (typeof b.isbn !== "string") return "Invalid Input";
        if (typeof b.title !== "string") return "Invalid Input";
        if (typeof b.totalCopies !== "number" || !Number.isInteger(b.totalCopies) || b.totalCopies < 1) return "Invalid Input";
        if (typeof b.availableCopies !== "number" || !Number.isInteger(b.availableCopies) || b.availableCopies < 0) return "Invalid Input";
    }
    // 1d) validate newBook's own fields
    const { isbn, title, totalCopies } = newBook;
    if (typeof isbn !== "string" || isbn === "") return "Invalid Input";
    if (typeof title !== "string" || title === "") return "Invalid Input";
    if (typeof totalCopies !== "number" || !Number.isInteger(totalCopies) || totalCopies < 1) return "Invalid Input";

    // --- STEP 2: CHECK IF THIS ISBN ALREADY EXISTS ---
    const existingBook = catalog.find(b => b.isbn === isbn);

    let updatedCatalog;
    let actionType;

    if (existingBook) {
        // --- STEP 3a: EXISTING BOOK -> INCREASE BOTH COPY COUNTS (IMMUTABLY) ---
        updatedCatalog = catalog.map(b =>
            b.isbn === isbn
                ? { ...b, totalCopies: b.totalCopies + totalCopies, availableCopies: b.availableCopies + totalCopies }
                : b
        );
        actionType = "COPIES_ADDED";
    } else {
        // --- STEP 3b: BRAND NEW BOOK -> APPEND AS NEW ENTRY (IMMUTABLY) ---
        // availableCopies starts equal to totalCopies since nothing's borrowed yet
        const brandNewBook = { isbn, title, totalCopies, availableCopies: totalCopies };
        updatedCatalog = [...catalog, brandNewBook];
        actionType = "NEW_BOOK_ADDED";
    }

    // --- STEP 4: RETURN RESULT ---
    return { catalog: updatedCatalog, actionType };
};

// --- EXAMPLE USAGE ---
console.log(addBookCopy(
    [{ isbn: "978-1", title: "Clean Code", totalCopies: 3, availableCopies: 1 }],
    { isbn: "978-1", title: "Clean Code", totalCopies: 2 }
));