// PROBLEM-05: runTriagePipeline()

// Logic: The "orchestrator" chains checkEmergencyStatus() → calculateTriageScore() → routeToDepartment(). CRITICAL BRANCH: if the patient IS an emergency, triage scoring is SKIPPED ENTIRELY and a special emergency-only routing path is used instead (which uses "TRAUMA_EMERGENCY" rather than the normal "ORTHOPEDIC_TRAUMA" department name this is intentional per the spec for the emergency path specifically).

const runTriagePipeline = (patient, symptoms) => {

    // --- STEP 1: VALIDATION ---
    if (typeof patient !== "object" || patient === null || Array.isArray(patient)) return "Invalid Input";
    if (!Array.isArray(symptoms) || symptoms.length === 0) return "Invalid Input";
    for (let i = 0; i < symptoms.length; i++) {
        if (typeof symptoms[i] !== "string") return "Invalid Input";
    }

    const {
        heartRate, oxygenSaturation, consciousnessLevel, bodyTemperature,
        painLevel, symptomDurationHours, age, hasChronicCondition
    } = patient;

    if (typeof heartRate !== "number" || heartRate <= 0) return "Invalid Input";
    if (typeof oxygenSaturation !== "number" || oxygenSaturation < 0 || oxygenSaturation > 100) return "Invalid Input";
    if (!["ALERT", "CONFUSED", "UNRESPONSIVE"].includes(consciousnessLevel)) return "Invalid Input";
    if (typeof bodyTemperature !== "number" || bodyTemperature <= 0) return "Invalid Input";
    if (typeof painLevel !== "number" || !Number.isInteger(painLevel) || painLevel < 0 || painLevel > 10) return "Invalid Input";
    if (typeof symptomDurationHours !== "number" || symptomDurationHours < 0) return "Invalid Input";
    if (typeof age !== "number" || age < 0) return "Invalid Input";
    if (typeof hasChronicCondition !== "boolean") return "Invalid Input";

    // helper: whether ANY symptom contains ANY of the given keywords
    const hasMatch = (keywords) => {
        for (let i = 0; i < symptoms.length; i++) {
            for (let j = 0; j < keywords.length; j++) {
                if (symptoms[i].includes(keywords[j])) return true;
            }
        }
        return false;
    };

    // --- STEP 2: PIPELINE STAGE 1 - EMERGENCY CHECK (equivalent of checkEmergencyStatus) ---
    const isEmergency =
        consciousnessLevel === "UNRESPONSIVE" ||
        oxygenSaturation < 90 ||
        heartRate < 40 || heartRate > 150 ||
        bodyTemperature >= 40;

    if (isEmergency) {
        // SKIP triage scoring entirely — route directly based on emergency-only logic
        let department;
        if (hasMatch(["chest pain", "breathing"])) {
            department = "CARDIOLOGY_EMERGENCY";
        } else if (hasMatch(["fracture", "bleeding"])) {
            department = "TRAUMA_EMERGENCY"; // special emergency-path name, per spec
        } else {
            department = "GENERAL_EMERGENCY";
        }
        return { triageCategory: "EMERGENCY", department, isEmergency: true };
    }

    // --- STEP 3: PIPELINE STAGE 2 - TRIAGE SCORE (equivalent of calculateTriageScore) ---
    // only reached if the patient is NOT an emergency
    let triageScore = 0;

    if (painLevel >= 8) triageScore += 30;
    else if (painLevel >= 5) triageScore += 15;
    else if (painLevel >= 1) triageScore += 5;

    if (symptomDurationHours < 1) triageScore += 20;
    else if (symptomDurationHours < 24) triageScore += 10;

    if (age >= 65 || age <= 5) triageScore += 15;

    if (hasChronicCondition === true) triageScore += 10;

    let category;
    if (triageScore >= 50) category = "URGENT";
    else if (triageScore >= 25) category = "STANDARD";
    else category = "NON_URGENT";

    // --- STEP 4: PIPELINE STAGE 3 - DEPARTMENT ROUTING (equivalent of routeToDepartment) ---
    let department;
    if (hasMatch(["chest pain", "breathing"])) {
        department = "CARDIOLOGY_EMERGENCY";
    } else if (hasMatch(["fracture", "bleeding"])) {
        department = "ORTHOPEDIC_TRAUMA"; // normal (non-emergency) path uses this name
    } else if (hasMatch(["fever", "infection"])) {
        department = "INTERNAL_MEDICINE";
    } else {
        if (category === "URGENT") department = "GENERAL_EMERGENCY";
        else if (category === "STANDARD") department = "GENERAL_PRACTICE";
        else department = "OUTPATIENT_CLINIC";
    }

    // --- STEP 5: RETURN FINAL RESULT ---
    return { triageCategory: category, department, isEmergency: false };
};

// --- EXAMPLE USAGE ---
console.log(runTriagePipeline(
    { heartRate: 80, oxygenSaturation: 98, consciousnessLevel: "ALERT", bodyTemperature: 39.5, painLevel: 6, symptomDurationHours: 12, age: 30, hasChronicCondition: false },
    ["high fever", "body ache"]
));