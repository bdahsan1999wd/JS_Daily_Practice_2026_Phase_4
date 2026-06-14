// 🧩 PROBLEM–01: admitPatient()

// Logic: This function combines the patient's identity profile and admission tracking data into a unified clinical ledger using the spread operator. It dynamically evaluates financial obligations based on ward tier multipliers and classifies the developmental age group category from the patient's data.

function admitPatient(patientInfo, admissionInfo) {

    // --- STEP 1: OBJECT STRUCTURE VALIDATION ---
    // Validate that the parameters are valid non-null structural objects and not arrays.
    if (
        !patientInfo || typeof patientInfo !== "object" || Array.isArray(patientInfo) ||
        !admissionInfo || typeof admissionInfo !== "object" || Array.isArray(admissionInfo)
    ) {
        return "Invalid Input";
    }

    // --- STEP 2: PROFILE SCHEMA DATA VALIDATION ---
    const { patientId, name, age, bloodGroup } = patientInfo;
    const allowedBloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

    if (
        typeof patientId !== "string" || patientId.trim() === "" ||
        typeof name !== "string" || name.trim() === "" ||
        typeof age !== "number" || isNaN(age) || age < 0 || age > 120 ||
        typeof bloodGroup !== "string" || !allowedBloodGroups.includes(bloodGroup)
    ) {
        return "Invalid Input";
    }

    // --- STEP 3: ADMISSION DETAILS DATA VALIDATION ---
    const { ward, diagnosis, dailyCharge, admittedDays } = admissionInfo;
    const allowedWards = ["GENERAL", "ICU", "EMERGENCY", "PRIVATE"];

    if (
        typeof ward !== "string" || !allowedWards.includes(ward) ||
        typeof diagnosis !== "string" || diagnosis.trim() === "" ||
        typeof dailyCharge !== "number" || isNaN(dailyCharge) || dailyCharge <= 0 ||
        typeof admittedDays !== "number" || !Number.isInteger(admittedDays) || admittedDays < 1
    ) {
        return "Invalid Input";
    }

    // --- STEP 4: COMPUTE DYNAMIC FINANCIAL AND DEMOGRAPHIC FIELDS ---
    // 1. Calculate base total bill: rate multiplied by operational days
    const totalBill = dailyCharge * admittedDays;

    // 2. Assess hospital ward surcharge depending on service intensity tiers
    let wardSurcharge;
    if (ward === "ICU") {
        wardSurcharge = totalBill * 0.50;
    } else if (ward === "PRIVATE") {
        wardSurcharge = totalBill * 0.30;
    } else if (ward === "EMERGENCY") {
        wardSurcharge = totalBill * 0.20;
    } else {
        wardSurcharge = 0;  // General tier has zero surcharge
    }

    // 3. Compute final gross pricing balance rounded cleanly to 2 decimal places
    const finalBill = Number((totalBill + wardSurcharge).toFixed(2));

    // 4. Group chronological age thresholds into standard medical brackets
    let ageGroup;
    if (age < 13) {
        ageGroup = "CHILD";
    } else if (age <= 17) {
        ageGroup = "TEEN";
    } else if (age <= 59) {
        ageGroup = "ADULT";
    } else {
        ageGroup = "SENIOR";
    }

    // --- STEP 5: IMMUTABLE SPREAD MERGE AND RETURN ---
    return {
        ...patientInfo,
        ...admissionInfo,
        totalBill,
        wardSurcharge,
        finalBill,
        ageGroup,
        admittedAt: "2025-01-01"
    };
}

// --- EXAMPLE USAGE ---
console.log(
    admitPatient(
        { patientId: "P-001", name: "Kamal Uddin", age: 65, bloodGroup: "B+" },
        { ward: "ICU", diagnosis: "Cardiac Arrest", dailyCharge: 5000, admittedDays: 4 }
    )
);