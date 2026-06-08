// 🧩 PROBLEM–01: buildCustomerRecord()

// Logic: Merges customer details from three separate contexts using the object spread operator while injecting computed properties based on tier revenue bounds.

function buildCustomerRecord(personalInfo, businessInfo, accountInfo) {

    // --- STEP 1: GLOBAL TYPE VALIDATION ---
    if (
        !personalInfo || typeof personalInfo !== "object" || Array.isArray(personalInfo) ||
        !businessInfo || typeof businessInfo !== "object" || Array.isArray(businessInfo) ||
        !accountInfo || typeof accountInfo !== "object" || Array.isArray(accountInfo)
    ) {
        return "Invalid Input";
    }

    // Validate personalInfo fields
    if (
        typeof personalInfo.firstName !== "string" || personalInfo.firstName.trim() === "" ||
        typeof personalInfo.lastName !== "string" || personalInfo.lastName.trim() === "" ||
        typeof personalInfo.email !== "string" || !personalInfo.email.includes("@")
    ) {
        return "Invalid Input";
    }

    // Validate businessInfo fields
    if (
        typeof businessInfo.companyName !== "string" || businessInfo.companyName.trim() === "" ||
        typeof businessInfo.industry !== "string" || businessInfo.industry.trim() === "" ||
        typeof businessInfo.annualRevenue !== "number" || businessInfo.annualRevenue < 0
    ) {
        return "Invalid Input";
    }

    // Validate accountInfo fields
    if (
        typeof accountInfo.accountType !== "string" ||
        !["BASIC", "PREMIUM", "ENTERPRISE"].includes(accountInfo.accountType) ||
        typeof accountInfo.creditLimit !== "number" || accountInfo.creditLimit < 0
    ) {
        return "Invalid Input";
    }

    // --- STEP 2: METRIC EVALUATION ---
    const revenue = businessInfo.annualRevenue;
    let customerTier = "STANDARD";

    if (revenue >= 10000000) {
        customerTier = "PLATINUM";
    } else if (revenue >= 1000000) {
        customerTier = "GOLD";
    } else if (revenue >= 100000) {
        customerTier = "SILVER";
    }

    // --- STEP 3: IMMUTABLE MERGING & COMPOSE ---
    return {
        ...personalInfo,
        ...businessInfo,
        ...accountInfo,
        fullName: personalInfo.firstName + " " + personalInfo.lastName,
        customerTier,
        registeredAt: "2025-01-01"
    };
}

// --- EXAMPLE USAGE ---
console.log(
    buildCustomerRecord(
        { firstName: "Tanvir", lastName: "Ahmed", email: "tanvir@biz.com" },
        { companyName: "TechCorp BD", industry: "Software", annualRevenue: 5000000 },
        { accountType: "PREMIUM", creditLimit: 500000 }
    )
);

console.log(buildCustomerRecord({ firstName: "" }, {}, []));