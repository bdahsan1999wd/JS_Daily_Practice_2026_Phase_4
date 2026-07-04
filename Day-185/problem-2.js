// PROBLEM-02: checkoutBook()

// Logic: Lets a member borrow a book, but ONLY if all 4 checks pass IN ORDER: book exists, copies are available, member hasn't hit their 3-book limit, and member doesn't already have this exact book checked out.

const checkoutBook = (catalog, isbn, memberId, borrowedBooks) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(catalog)) return "Invalid Input";
    if (typeof isbn !== "string" || isbn === "") return "Invalid Input";
    if (typeof memberId !== "string" || memberId === "") return "Invalid Input";
    if (!Array.isArray(borrowedBooks)) return "Invalid Input";
    for (let i = 0; i < catalog.length; i++) {
        const b = catalog[i];
        if (!b || typeof b !== "object") return "Invalid Input";
        if (typeof b.isbn !== "string") return "Invalid Input";
        if (typeof b.availableCopies !== "number") return "Invalid Input";
    }
    for (let i = 0; i < borrowedBooks.length; i++) {
        const r = borrowedBooks[i];
        if (!r || typeof r !== "object") return "Invalid Input";
        if (typeof r.memberId !== "string") return "Invalid Input";
        if (typeof r.isbn !== "string") return "Invalid Input";
    }

    // --- STEP 2: CHECK #1 - BOOK MUST EXIST IN CATALOG ---
    const targetBook = catalog.find(b => b.isbn === isbn);
    if (!targetBook) {
        return { checkedOut: false, reason: "Book not found", catalog, borrowedBooks };
    }

    // --- STEP 3: CHECK #2 - MUST HAVE AVAILABLE COPIES ---
    if (targetBook.availableCopies <= 0) {
        return { checkedOut: false, reason: "No copies available", catalog, borrowedBooks };
    }

    // --- STEP 4: CHECK #3 - MEMBER BORROW LIMIT (MAX 3 BOOKS) ---
    const memberBorrowCount = borrowedBooks.filter(r => r.memberId === memberId).length;
    if (memberBorrowCount >= 3) {
        return { checkedOut: false, reason: "Member has reached borrowing limit", catalog, borrowedBooks };
    }

    // --- STEP 5: CHECK #4 - MEMBER CAN'T BORROW THE SAME ISBN TWICE ---
    const alreadyHasThisBook = borrowedBooks.some(r => r.memberId === memberId && r.isbn === isbn);
    if (alreadyHasThisBook) {
        return { checkedOut: false, reason: "Member already has this book checked out", catalog, borrowedBooks };
    }

    // --- STEP 6: ALL CHECKS PASSED - APPLY THE CHECKOUT (IMMUTABLY) ---
    const updatedCatalog = catalog.map(b =>
        b.isbn === isbn ? { ...b, availableCopies: b.availableCopies - 1 } : b
    );
    const updatedBorrowedBooks = [...borrowedBooks, { memberId, isbn }];

    // --- STEP 7: RETURN SUCCESS RESULT ---
    return { checkedOut: true, catalog: updatedCatalog, borrowedBooks: updatedBorrowedBooks };
};

// --- EXAMPLE USAGE ---
console.log(checkoutBook(
    [{ isbn: "978-1", title: "Clean Code", totalCopies: 5, availableCopies: 3 }],
    "978-1",
    "M-101",
    [{ memberId: "M-101", isbn: "978-2" }]
));