// 🧩 PROBLEM–02: updateCustomerRecord()

// Logic: Performs an immutable shallow merge to append system updates on top of an existing profile, re-evaluating the business classification metric derived from revenue changes.

function updateCustomerRecord(existingCustomer, updates) {

    // --- STEP 1: INITIAL STRUCTURAL VALIDATION ---
    if (
        !existingCustomer || typeof existingCustomer !== "object" || Array.isArray(existingCustomer) ||
        !updates || typeof updates !== "object" || Array.isArray(updates) ||
        Object.keys(updates).length === 0
    ) {
        return "Invalid Input";
    }

    // Verify properties on the baseline profile object
    if (
        typeof existingCustomer.customerId !== "string" || existingCustomer.customerId.trim() === "" ||
        typeof existingCustomer.fullName !== "string" || existingCustomer.fullName.trim() === "" ||
        typeof existingCustomer.email !== "string" || !existingCustomer.email.includes("@") ||
        typeof existingCustomer.annualRevenue !== "number" || existingCustomer.annualRevenue < 0 ||
        typeof existingCustomer.creditLimit !== "number" || existingCustomer.creditLimit < 0
    ) {
        return "Invalid Input";
    }

    // Validate properties explicitly sent in the updates patch payload
    if (updates.hasOwnProperty("email") && (typeof updates.email !== "string" || !updates.email.includes("@"))) {
        return "Invalid Input";
    }
    if (updates.hasOwnProperty("annualRevenue") && (typeof updates.annualRevenue !== "number" || updates.annualRevenue < 0)) {
        return "Invalid Input";
    }
    if (updates.hasOwnProperty("creditLimit") && (typeof updates.creditLimit !== "number" || updates.creditLimit < 0)) {
        return "Invalid Input";
    }
    if (updates.hasOwnProperty("accountType") && typeof updates.accountType !== "string") {
        return "Invalid Input";
    }
    if (updates.hasOwnProperty("industry") && typeof updates.industry !== "string") {
        return "Invalid Input";
    }

    // --- STEP 2: IMMUTABLE STATE UPDATE ---
    const mergedRecord = {
        ...existingCustomer,
        ...updates,
        lastUpdated: "2025-01-01"
    };

    // --- STEP 3: RECALCULATE LOGIC DEPENDENCIES ---
    const finalRevenue = mergedRecord.annualRevenue;
    let computedTier = "STANDARD";

    if (finalRevenue >= 10000000) {
        computedTier = "PLATINUM";
    } else if (finalRevenue >= 1000000) {
        computedTier = "GOLD";
    } else if (finalRevenue >= 100000) {
        computedTier = "SILVER";
    }

    mergedRecord.customerTier = computedTier;

    return mergedRecord;
}

// --- EXAMPLE USAGE ---
const currentProfile = { customerId: "C001", fullName: "Rina Begum", email: "rina@biz.com", annualRevenue: 80000, creditLimit: 100000 };

console.log(
    updateCustomerRecord(currentProfile, { annualRevenue: 1500000, creditLimit: 300000 })
);

console.log(updateCustomerRecord(currentProfile, { email: "broken_email_str" }));