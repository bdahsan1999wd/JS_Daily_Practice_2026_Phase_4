// 🧩 PROBLEM–03: extractCustomerSections()

// Logic: Uses precise structural destructuring to unpack flat fields into localized domain modules, injecting a strategic business performance analytics block.

function extractCustomerSections(customerRecord) {

    // --- STEP 1: METADATA COMPLIANCE RUN ---
    if (!customerRecord || typeof customerRecord !== "object" || Array.isArray(customerRecord)) {
        return "Invalid Input";
    }

    const mandatoryProperties = [
        "customerId", "fullName", "email", "companyName", "industry",
        "annualRevenue", "accountType", "creditLimit", "customerTier", "registeredAt"
    ];

    for (const property of mandatoryProperties) {
        if (!customerRecord.hasOwnProperty(property)) {
            return "Invalid Input";
        }
    }

    // --- STEP 2: DESTRUCTURING EXTRACTION MATRIX ---
    const {
        customerId, fullName, email,
        companyName, industry, annualRevenue,
        accountType, creditLimit, customerTier,
        registeredAt
    } = customerRecord;

    // --- STEP 3: ASSEMBLE ENCAPSULATION WRAPPER ---
    return {
        personal: { customerId, fullName, email },
        business: { companyName, industry, annualRevenue },
        account: { accountType, creditLimit, customerTier },
        crmSummary: {
            joinedOn: registeredAt,
            isHighValue: annualRevenue >= 1000000
        }
    };
}

// --- EXAMPLE USAGE ---
console.log(
    extractCustomerSections({
        customerId: "C002",
        fullName: "Arif Hossain",
        email: "arif@corp.com",
        companyName: "BuildIt Ltd",
        industry: "Construction",
        annualRevenue: 2500000,
        accountType: "ENTERPRISE",
        creditLimit: 1000000,
        customerTier: "GOLD",
        registeredAt: "2025-01-01"
    })
);

console.log(extractCustomerSections({ customerId: "C999", fullName: "Partial Field Set Data" }));