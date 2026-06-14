// 🧩 PROBLEM–03: extractPatientReport()

// Logic: This function maps a flat patient record profile into sub-objects using object destructuring. It organizes the unstructured data into distinct logical layers and adds an administrative health status summary object.

function extractPatientReport(patientRecord) {

    // --- STEP 1: PROPERTY PRESENCE CHECK ---
    if (!patientRecord || typeof patientRecord !== "object" || Array.isArray(patientRecord)) {
        return "Invalid Input";
    }

    const standardFields = [
        "patientId", "name", "age", "bloodGroup", "ward", "diagnosis",
        "medications", "dailyCharge", "admittedDays", "finalBill", "admittedAt"
    ];

    // Enforce schema completeness by scanning object property footprints
    for (const property of standardFields) {
        if (!patientRecord.hasOwnProperty(property)) {
            return "Invalid Input";
        }
    }

    // Confirm that inner collection components match expected native structures
    if (!Array.isArray(patientRecord.medications)) {
        return "Invalid Input";
    }

    // --- STEP 2: RECONSTRUCT DATA LAYERS VIA DESTRUCTURING ---
    const {
        patientId, name, age, bloodGroup,
        ward, diagnosis, medications,
        dailyCharge, admittedDays, finalBill,
        admittedAt
    } = patientRecord;

    // --- STEP 3: GENERATE WRAPPED DIAGNOSTIC SUMMARY CODES ---
    const isCritical = ward === "ICU" || ward === "EMERGENCY";

    // --- STEP 4: RETURN CATEGORIZED NESTED OBJECT ---
    return {
        identity: { patientId, name, age, bloodGroup },
        medical: { ward, diagnosis, medications },
        billing: { dailyCharge, admittedDays, finalBill },
        reportSummary: {
            admissionDate: admittedAt,
            medicationCount: medications.length,
            isCritical: isCritical
        }
    };
}

// --- EXAMPLE USAGE ---
console.log(
    extractPatientReport({
        patientId: "P-003",
        name: "Sumon Ali",
        age: 42,
        bloodGroup: "O+",
        ward: "EMERGENCY",
        diagnosis: "Appendicitis",
        medications: ["Morphine", "Amoxicillin", "IV Fluids"],
        dailyCharge: 3500,
        admittedDays: 2,
        finalBill: 8400,
        admittedAt: "2025-01-01"
    })
);