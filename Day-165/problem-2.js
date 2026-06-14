// 🧩 PROBLEM–02: updatePrescription()

// Logic: Modifies clinical medication records and admission metrics immutably. It safely appends new entries to the arrays using the spread operator and re-calculates financial balances without altering the reference data source.

function updatePrescription(existingRecord, prescriptionUpdate) {

    // --- STEP 1: INITIAL SHAPE CHECK ---
    if (
        !existingRecord || typeof existingRecord !== "object" || Array.isArray(existingRecord) ||
        !prescriptionUpdate || typeof prescriptionUpdate !== "object" || Array.isArray(prescriptionUpdate)
    ) {
        return "Invalid Input";
    }

    // --- STEP 2: BASELINE SYSTEM RECORD VALIDATION ---
    if (
        typeof existingRecord.patientId !== "string" || existingRecord.patientId.trim() === "" ||
        typeof existingRecord.name !== "string" || existingRecord.name.trim() === "" ||
        typeof existingRecord.diagnosis !== "string" || existingRecord.diagnosis.trim() === "" ||
        !Array.isArray(existingRecord.medications) ||
        typeof existingRecord.admittedDays !== "number" || !Number.isInteger(existingRecord.admittedDays) || existingRecord.admittedDays < 1 ||
        typeof existingRecord.dailyCharge !== "number" || existingRecord.dailyCharge <= 0
    ) {
        return "Invalid Input";
    }

    // --- STEP 3: TRANSACTIONAL PATCH PACK VALIDATION ---
    // Ensure newMedications exists and is formatted strictly as an array payload
    if (!prescriptionUpdate.hasOwnProperty("newMedications") || !Array.isArray(prescriptionUpdate.newMedications)) {
        return "Invalid Input";
    }

    // Optional fields cross-validation processing when localized inside the payload patch
    if (prescriptionUpdate.hasOwnProperty("diagnosis") && (typeof prescriptionUpdate.diagnosis !== "string" || prescriptionUpdate.diagnosis.trim() === "")) {
        return "Invalid Input";
    }
    if (prescriptionUpdate.hasOwnProperty("admittedDays") && (typeof prescriptionUpdate.admittedDays !== "number" || !Number.isInteger(prescriptionUpdate.admittedDays) || prescriptionUpdate.admittedDays < 1)) {
        return "Invalid Input";
    }
    if (prescriptionUpdate.hasOwnProperty("dailyCharge") && (typeof prescriptionUpdate.dailyCharge !== "number" || prescriptionUpdate.dailyCharge <= 0)) {
        return "Invalid Input";
    }

    // --- STEP 4: MERGE ARRAYS AND PROPERTIES IMMUTABLY ---
    // Concatenate arrays together cleanly via rest-spread mechanisms
    const updatedMedications = [...existingRecord.medications, ...prescriptionUpdate.newMedications];

    // Create a new updated state object by overriding base fields with the update parameters
    const finalRecord = {
        ...existingRecord,
        ...prescriptionUpdate,
        medications: updatedMedications,
        lastReviewed: "2025-01-01"
    };

    // Remove temporary data fields that should not persist in the final output object
    delete finalRecord.newMedications;

    // --- STEP 5: SYNC CORRELATING LOGICAL VALUES ---
    finalRecord.totalBill = finalRecord.dailyCharge * finalRecord.admittedDays;

    return finalRecord;
}

// --- EXAMPLE USAGE ---
console.log(
    updatePrescription(
        { patientId: "P-002", name: "Rina Begum", diagnosis: "Typhoid", medications: ["Paracetamol", "ORS"], admittedDays: 3, dailyCharge: 2000 },
        { admittedDays: 5, newMedications: ["Azithromycin", "Zinc"] }
    )
);