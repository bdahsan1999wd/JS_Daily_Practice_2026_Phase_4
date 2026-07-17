// PROBLEM-02: calculateTriageScore()

// Logic: Additive urgency scoring for NON-emergency patients pain, symptom duration, age, and chronic conditions each contribute points that decide how soon they need to be seen.

const calculateTriageScore = (patient) => {

    // --- STEP 1: VALIDATION ---
    if (typeof patient !== "object" || patient === null || Array.isArray(patient)) {
        return "Invalid Input";
    }
    const { painLevel, symptomDurationHours, age, hasChronicCondition } = patient;
    if (typeof painLevel !== "number" || !Number.isInteger(painLevel) || painLevel < 0 || painLevel > 10) return "Invalid Input";
    if (typeof symptomDurationHours !== "number" || symptomDurationHours < 0) return "Invalid Input";
    if (typeof age !== "number" || age < 0) return "Invalid Input";
    if (typeof hasChronicCondition !== "boolean") return "Invalid Input";

    // --- STEP 2: ADDITIVE URGENCY SCORING ---
    let triageScore = 0;

    // pain level tier
    if (painLevel >= 8) triageScore += 30;
    else if (painLevel >= 5) triageScore += 15; // 5-7
    else if (painLevel >= 1) triageScore += 5;  // 1-4

    // symptom duration tier (shorter duration = MORE urgent, since it's new/sudden)
    if (symptomDurationHours < 1) triageScore += 20;
    else if (symptomDurationHours < 24) triageScore += 10; // 1-23.99

    // vulnerable age groups (very young OR elderly)
    if (age >= 65 || age <= 5) triageScore += 15;

    // chronic condition bonus
    if (hasChronicCondition === true) triageScore += 10;

    // --- STEP 3: TRIAGE CATEGORY & MAX WAIT TIME LOOKUP ---
    let category, maxWaitMinutes;
    if (triageScore >= 50) {
        category = "URGENT"; maxWaitMinutes = 15;
    } else if (triageScore >= 25) {
        category = "STANDARD"; maxWaitMinutes = 60;
    } else {
        category = "NON_URGENT"; maxWaitMinutes = 120;
    }

    // --- STEP 4: RETURN RESULT ---
    return { triageScore, category, maxWaitMinutes };
};

// --- EXAMPLE USAGE ---
console.log(calculateTriageScore({
    painLevel: 7,
    symptomDurationHours: 0.5,
    age: 70,
    hasChronicCondition: true
}));