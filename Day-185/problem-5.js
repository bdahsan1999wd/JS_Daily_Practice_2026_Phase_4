// PROBLEM-05: runLibraryWorkflow()

// Logic: The "orchestrator" — composes checkoutBook() and returnBook() into ONE sequential pipeline, then runs libraryStatusReport() logic on the final catalog + borrowedBooks state.

const runLibraryWorkflow = (initialCatalog, initialBorrowedBooks, operations) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(initialCatalog)) return "Invalid Input";
    if (!Array.isArray(initialBorrowedBooks)) return "Invalid Input";
    if (!Array.isArray(operations)) return "Invalid Input";
    for (let i = 0; i < initialCatalog.length; i++) {
        const b = initialCatalog[i];
        if (!b || typeof b !== "object") return "Invalid Input";
        if (typeof b.isbn !== "string") return "Invalid Input";
        if (typeof b.title !== "string") return "Invalid Input";
        if (typeof b.totalCopies !== "number") return "Invalid Input";
        if (typeof b.availableCopies !== "number") return "Invalid Input";
    }
    for (let i = 0; i < initialBorrowedBooks.length; i++) {
        const r = initialBorrowedBooks[i];
        if (!r || typeof r !== "object") return "Invalid Input";
        if (typeof r.memberId !== "string") return "Invalid Input";
        if (typeof r.isbn !== "string") return "Invalid Input";
    }
    for (let i = 0; i < operations.length; i++) {
        const op = operations[i];
        if (!op || typeof op !== "object") return "Invalid Input";
        if (!["CHECKOUT", "RETURN"].includes(op.type)) return "Invalid Input";
    }

    // --- STEP 2: PROCESS OPERATIONS SEQUENTIALLY ---
    // both currentCatalog AND currentBorrowedBooks act as running "state"
    // that each operation reads from and (if successful) updates for the next step
    let currentCatalog = initialCatalog;
    let currentBorrowedBooks = initialBorrowedBooks;
    const operationLog = [];

    for (let i = 0; i < operations.length; i++) {
        const op = operations[i];

        if (op.type === "CHECKOUT") {
            // --- inline equivalent of checkoutBook() logic, same 4-step order ---
            const targetBook = currentCatalog.find(b => b.isbn === op.isbn);

            if (!targetBook) {
                operationLog.push({ type: "CHECKOUT", success: false, reason: "Book not found" });
            } else if (targetBook.availableCopies <= 0) {
                operationLog.push({ type: "CHECKOUT", success: false, reason: "No copies available" });
            } else if (currentBorrowedBooks.filter(r => r.memberId === op.memberId).length >= 3) {
                operationLog.push({ type: "CHECKOUT", success: false, reason: "Member has reached borrowing limit" });
            } else if (currentBorrowedBooks.some(r => r.memberId === op.memberId && r.isbn === op.isbn)) {
                operationLog.push({ type: "CHECKOUT", success: false, reason: "Member already has this book checked out" });
            } else {
                currentCatalog = currentCatalog.map(b =>
                    b.isbn === op.isbn ? { ...b, availableCopies: b.availableCopies - 1 } : b
                );
                currentBorrowedBooks = [...currentBorrowedBooks, { memberId: op.memberId, isbn: op.isbn }];
                operationLog.push({ type: "CHECKOUT", success: true, reason: null });
            }

        } else if (op.type === "RETURN") {
            // --- inline equivalent of returnBook() logic ---
            const matchIndex = currentBorrowedBooks.findIndex(r => r.memberId === op.memberId && r.isbn === op.isbn);

            if (matchIndex === -1) {
                operationLog.push({ type: "RETURN", success: false, reason: "No matching checkout record found" });
            } else {
                const targetBook = currentCatalog.find(b => b.isbn === op.isbn);
                if (!targetBook) {
                    operationLog.push({ type: "RETURN", success: false, reason: "Book not found in catalog" });
                } else {
                    currentBorrowedBooks = currentBorrowedBooks.filter((_, idx) => idx !== matchIndex);
                    currentCatalog = currentCatalog.map(b =>
                        b.isbn === op.isbn
                            ? { ...b, availableCopies: Math.min(b.availableCopies + 1, b.totalCopies) }
                            : b
                    );
                    operationLog.push({ type: "RETURN", success: true, reason: null });
                }
            }
        }
    }

    // --- STEP 3: BUILD STATUS REPORT (inline equivalent of libraryStatusReport) ---
    const totalBooks = currentCatalog.length;
    const totalCopiesInSystem = currentCatalog.reduce((sum, b) => sum + b.totalCopies, 0);
    const totalCheckedOut = currentBorrowedBooks.length;
    const utilizationRate = Number(((totalCheckedOut / totalCopiesInSystem) * 100).toFixed(2));
    const fullyBorrowedBooks = currentCatalog.filter(b => b.availableCopies === 0).map(b => b.title);

    let mostBorrowedBook = null;
    if (currentBorrowedBooks.length > 0) {
        const countMap = {};
        const firstSeenOrder = [];
        for (let i = 0; i < currentBorrowedBooks.length; i++) {
            const bookIsbn = currentBorrowedBooks[i].isbn;
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

    const statusReport = {
        totalBooks,
        totalCopiesInSystem,
        totalCheckedOut,
        utilizationRate,
        fullyBorrowedBooks,
        mostBorrowedBook
    };

    // --- STEP 4: RETURN FINAL RESULT ---
    return {
        finalCatalog: currentCatalog,
        finalBorrowedBooks: currentBorrowedBooks,
        operationLog,
        statusReport
    };
};

// --- EXAMPLE USAGE ---
console.log(runLibraryWorkflow(
    [{ isbn: "978-1", title: "Clean Code", totalCopies: 2, availableCopies: 2 }],
    [],
    [
        { type: "CHECKOUT", isbn: "978-1", memberId: "M-1" },
        { type: "CHECKOUT", isbn: "978-1", memberId: "M-1" },
        { type: "RETURN", isbn: "978-1", memberId: "M-1" }
    ]
));