// 🧩 PROBLEM–04: transferPatient()

// Logic: Handles horizontal internal re-assignments to different hospital wards safely. It isolates data variations using deep cloning via serialization, updates pricing rates, logs operational transfer footprints, and verifies that the source object remains unaffected.

function transferPatient(patientRecord, newWard) {

    // --- STEP 1: TYPE AND ARGUMENT INTERFACE CHECK ---
    if (!patientRecord || typeof patientRecord !== "object" || Array.isArray(patientRecord)) {
        return "Invalid Input";
    }

    const permittedWards = ["GENERAL", "ICU", "EMERGENCY", "PRIVATE"];
    if (typeof newWard !== "string" || !permittedWards.includes(newWard)) {
        return "Invalid Input";
    }

    // --- STEP 2: DEEP SCAN TARGET SCHEMA ATTRIBUTES ---
    if (
        typeof patientRecord.patientId !== "string" ||
        typeof patientRecord.name !== "string" ||
        typeof patientRecord.ward !== "string" || !permittedWards.includes(patientRecord.ward) ||
        typeof patientRecord.dailyCharge !== "number" || patientRecord.dailyCharge <= 0 ||
        typeof patientRecord.admittedDays !== "number" || !Number.isInteger(patientRecord.admittedDays) || patientRecord.admittedDays < 1 ||
        !Array.isArray(patientRecord.transferHistory)
    ) {
        return "Invalid Input";
    }

    // Guard Clause: Prevent redundant spatial re-allocation inside the same operational unit
    if (patientRecord.ward === newWard) {
        return "Invalid Input";
    }

    // --- STEP 3: PERFORM DEEP COPY OVER SERIALIZATION PIPELINE ---
    // Severing references to child objects and arrays completely
    const clonedRecord = JSON.parse(JSON.stringify(patientRecord));

    // --- STEP 4: ALTER CLONED VALUE PARAMETERS ---
    clonedRecord.ward = newWard;

    // Adjust clinical ledger charge thresholds to match the new ward's pricing tier
    if (newWard === "ICU") {
        clonedRecord.dailyCharge = 8000;
    } else if (newWard === "PRIVATE") {
        clonedRecord.dailyCharge = 5000;
    } else if (newWard === "EMERGENCY") {
        clonedRecord.dailyCharge = 6000;
    } else {
        clonedRecord.dailyCharge = 2000;
    }

    // Push tracking messages safely into the nested array within the deep-cloned space
    clonedRecord.transferHistory.push("Transferred to " + newWard);
    clonedRecord.transferredAt = "2025-01-01";

    // --- STEP 5: PROVE ENCAPSULATION RETURNING COMPARED VERSIONS ---
    return {
        original: patientRecord,
        updated: clonedRecord
    };
}

// --- EXAMPLE USAGE ---
console.log(
    transferPatient(
        { patientId: "P-004", name: "Fatema Khanam", ward: "GENERAL", dailyCharge: 2000, admittedDays: 3, transferHistory: ["Admitted to GENERAL"] },
        "PRIVATE"
    )
);