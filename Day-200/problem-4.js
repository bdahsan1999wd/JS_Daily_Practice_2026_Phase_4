// PROBLEM-04: allocateServiceTiers()

// Logic: A "loyalty score" rewards lifetime value and tenure but PENALIZES support tickets high-maintenance customers rank lower even with money spent.

const allocateServiceTiers = (customers) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(customers) || customers.length === 0) return "Invalid Input";
    for (let i = 0; i < customers.length; i++) {
        const c = customers[i];
        if (!c || typeof c !== "object") return "Invalid Input";
        if (typeof c.customerName !== "string") return "Invalid Input";
        if (typeof c.lifetimeValue !== "number" || c.lifetimeValue < 0) return "Invalid Input";
        if (typeof c.accountAgeYears !== "number" || c.accountAgeYears < 0) return "Invalid Input";
        if (typeof c.supportTicketsThisYear !== "number" || !Number.isInteger(c.supportTicketsThisYear) || c.supportTicketsThisYear < 0) return "Invalid Input";
    }

    // --- STEP 2: COMPUTE loyaltyScore FOR EACH CUSTOMER ---
    const computed = customers.map(c => ({
        customerName: c.customerName,
        lifetimeValue: c.lifetimeValue,
        loyaltyScore: Number(
            ((c.lifetimeValue / 1000) + (c.accountAgeYears * 10) - (c.supportTicketsThisYear * 2)).toFixed(2)
        )
    }));

    // --- STEP 3: SORT - loyaltyScore DESCENDING, THEN lifetimeValue DESCENDING (tie-break) ---
    const sorted = [...computed].sort((a, b) => {
        if (b.loyaltyScore !== a.loyaltyScore) return b.loyaltyScore - a.loyaltyScore;
        return b.lifetimeValue - a.lifetimeValue;
    });

    // --- STEP 4: ASSIGN RANKS & SERVICE TIERS ---
    const result = [];
    for (let i = 0; i < sorted.length; i++) {
        let rank;
        if (i === 0) {
            rank = 1;
        } else {
            const prev = sorted[i - 1];
            const curr = sorted[i];
            const isFullTie = (curr.loyaltyScore === prev.loyaltyScore) && (curr.lifetimeValue === prev.lifetimeValue);
            rank = isFullTie ? result[i - 1].rank : i + 1;
        }

        let serviceTier;
        if (rank === 1) serviceTier = "VIP";
        else if (rank <= 3) serviceTier = "PREMIUM";
        else serviceTier = "STANDARD";

        result.push({
            customerName: sorted[i].customerName,
            loyaltyScore: sorted[i].loyaltyScore,
            rank,
            serviceTier
        });
    }

    // --- STEP 5: RETURN RESULT ---
    return result;
};

// --- EXAMPLE USAGE ---
console.log(allocateServiceTiers([
    { customerName: "Nadia", lifetimeValue: 50000, accountAgeYears: 3, supportTicketsThisYear: 2 },
    { customerName: "Farhan", lifetimeValue: 80000, accountAgeYears: 1, supportTicketsThisYear: 10 }
]));