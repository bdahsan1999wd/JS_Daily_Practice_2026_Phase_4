// PROBLEM-06: decideVisaApplication()

// Logic: A gate check first, then a SECOND check whose rule depends entirely on travelPurpose each purpose has its own eligibility condition.

const decideVisaApplication = (applicant) => {

    // --- STEP 1: VALIDATION ---
    if (typeof applicant !== "object" || applicant === null || Array.isArray(applicant)) return "Invalid Input";
    const { bankBalance, hasSponsorLetter, previousVisaRejections, travelPurpose } = applicant;
    if (typeof bankBalance !== "number" || bankBalance < 0) return "Invalid Input";
    if (typeof hasSponsorLetter !== "boolean") return "Invalid Input";
    if (typeof previousVisaRejections !== "number" || !Number.isInteger(previousVisaRejections) || previousVisaRejections < 0) return "Invalid Input";
    if (!["TOURISM", "BUSINESS", "STUDY"].includes(travelPurpose)) return "Invalid Input";

    // --- STEP 2: CHECK #1 - PREVIOUS REJECTIONS (applies to everyone) ---
    if (previousVisaRejections >= 2) {
        return { approved: false, rejectionReason: "Too many previous rejections", visaValidityMonths: null };
    }

    // --- STEP 3: CHECK #2 - PURPOSE-SPECIFIC RULE ---
    if (travelPurpose === "TOURISM") {
        if (!(bankBalance >= 100000 || hasSponsorLetter === true)) {
            return { approved: false, rejectionReason: "Insufficient funds or sponsorship for tourism", visaValidityMonths: null };
        }
    } else if (travelPurpose === "BUSINESS") {
        if (hasSponsorLetter !== true) {
            return { approved: false, rejectionReason: "Business visa requires sponsor letter", visaValidityMonths: null };
        }
    } else { // STUDY
        if (bankBalance < 300000) {
            return { approved: false, rejectionReason: "Insufficient funds for study visa", visaValidityMonths: null };
        }
    }

    // --- STEP 4: APPROVED - LOOK UP VALIDITY PERIOD BY PURPOSE ---
    let visaValidityMonths;
    if (travelPurpose === "TOURISM") visaValidityMonths = 3;
    else if (travelPurpose === "BUSINESS") visaValidityMonths = 12;
    else visaValidityMonths = 24;

    // --- STEP 5: RETURN RESULT ---
    return { approved: true, rejectionReason: null, visaValidityMonths };
};

// --- EXAMPLE USAGE ---
if (require.main === module) {
    console.log(decideVisaApplication({
        bankBalance: 50000,
        hasSponsorLetter: true,
        previousVisaRejections: 0,
        travelPurpose: "TOURISM"
    }));
}

module.exports = { decideVisaApplication };