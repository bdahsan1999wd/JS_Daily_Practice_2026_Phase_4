// 🧩 PROBLEM–05: generateDischargeSummary()

// Logic: This function destructures a flat patient history record, validates the data, and derives operational variables like bill sub-totals, ward multipliers, and recovery stays to generate a comprehensive discharge summary.

function generateDischargeSummary(patientRecord) {

    // --- STEP 1: DATA STRUCTURE VALIDATION ---
    if (!patientRecord || typeof patientRecord !== "object" || Array.isArray(patientRecord)) {
        return "Invalid Input";
    }

    // --- STEP 2: CONTEXT PROPERTY DESTRUCTURING MAP ---
    const {
        patientId, name, age, ward, diagnosis,
        medications, admittedDays, dailyCharge, admittedAt
    } = patientRecord;

    // --- STEP 3: EXPLICIT EXTRACTED VALUE CHECK ---
    const validWards = ["GENERAL", "ICU", "EMERGENCY", "PRIVATE"];

    if (
        typeof patientId !== "string" || patientId.trim() === "" ||
        typeof name !== "string" || name.trim() === "" ||
        typeof age !== "number" || isNaN(age) || age < 0 || age > 120 ||
        typeof ward !== "string" || !validWards.includes(ward) ||
        typeof diagnosis !== "string" || diagnosis.trim() === "" ||
        !Array.isArray(medications) || medications.length < 1 ||
        typeof admittedDays !== "number" || !Number.isInteger(admittedDays) || admittedDays < 1 ||
        typeof dailyCharge !== "number" || isNaN(dailyCharge) || dailyCharge <= 0 ||
        typeof admittedAt !== "string" || admittedAt.trim() === ""
    ) {
        return "Invalid Input";
    }

    // --- STEP 4: CALCULATE ACCRUED ACCOUNTING RECORDS ---
    const totalBill = dailyCharge * admittedDays;

    let wardSurcharge;
    if (ward === "ICU") {
        wardSurcharge = totalBill * 0.50;
    } else if (ward === "PRIVATE") {
        wardSurcharge = totalBill * 0.30;
    } else if (ward === "EMERGENCY") {
        wardSurcharge = totalBill * 0.20;
    } else {
        wardSurcharge = 0;
    }

    const finalBill = Number((totalBill + wardSurcharge).toFixed(2));

    // --- STEP 5: PROCESS DURATION CATEGORIZATION LEVEL ---
    let recoveryStatus;
    if (admittedDays <= 3) {
        recoveryStatus = "SHORT STAY";
    } else if (admittedDays <= 7) {
        recoveryStatus = "MODERATE STAY";
    } else if (admittedDays <= 14) {
        recoveryStatus = "EXTENDED STAY";
    } else {
        recoveryStatus = "LONG TERM CARE";
    }

    // --- STEP 6: RETURN COMPLETE DISCHARGE METADATA SUMMARY ---
    return {
        patientId,
        name,
        age,
        ward,
        diagnosis,
        medications,
        admittedAt,
        dischargedAt: "2025-01-01",
        admittedDays,
        totalBill,
        wardSurcharge,
        finalBill,
        recoveryStatus
    };
}

// --- EXAMPLE USAGE ---
console.log(
    generateDischargeSummary({
        patientId: "P-005",
        name: "Arif Billah",
        age: 38,
        ward: "PRIVATE",
        diagnosis: "Pneumonia",
        medications: ["Azithromycin", "Prednisolone", "Salbutamol"],
        admittedDays: 6,
        dailyCharge: 4000,
        admittedAt: "2025-01-01"
    })
);