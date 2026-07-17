// PROBLEM-03: routeToDepartment()

// Logic: Looks for specific symptom KEYWORDS (checked in priority order) to route a patient to a specialized department. Only falls back to the generic triageCategory routing if NO keyword matched at all.

const routeToDepartment = (symptoms, triageCategory) => {

    // --- STEP 1: VALIDATION ---
    if (!Array.isArray(symptoms) || symptoms.length === 0) return "Invalid Input";
    for (let i = 0; i < symptoms.length; i++) {
        if (typeof symptoms[i] !== "string") return "Invalid Input";
    }
    if (!["URGENT", "STANDARD", "NON_URGENT"].includes(triageCategory)) return "Invalid Input";

    // helper: scans every symptom string for ANY of the given keywords,
    // returns the FIRST symptom string that contains one of them
    const findMatch = (keywords) => {
        for (let i = 0; i < symptoms.length; i++) {
            for (let j = 0; j < keywords.length; j++) {
                if (symptoms[i].includes(keywords[j])) {
                    return symptoms[i];
                }
            }
        }
        return null;
    };

    // --- STEP 2: CHECK RULES IN STRICT PRIORITY ORDER (first match wins) ---
    // Rule #1: cardiology/respiratory emergency keywords
    let matchedKeyword = findMatch(["chest pain", "breathing"]);
    if (matchedKeyword) {
        return { department: "CARDIOLOGY_EMERGENCY", matchedKeyword };
    }

    // Rule #2: orthopedic trauma keywords
    matchedKeyword = findMatch(["fracture", "bleeding"]);
    if (matchedKeyword) {
        return { department: "ORTHOPEDIC_TRAUMA", matchedKeyword };
    }

    // Rule #3: internal medicine keywords
    matchedKeyword = findMatch(["fever", "infection"]);
    if (matchedKeyword) {
        return { department: "INTERNAL_MEDICINE", matchedKeyword };
    }

    // --- STEP 3: NO KEYWORD MATCHED -> FALL BACK TO triageCategory ---
    let department;
    if (triageCategory === "URGENT") department = "GENERAL_EMERGENCY";
    else if (triageCategory === "STANDARD") department = "GENERAL_PRACTICE";
    else department = "OUTPATIENT_CLINIC";

    return { department, matchedKeyword: null };
};

// --- EXAMPLE USAGE ---
console.log(routeToDepartment(["mild headache", "shortness of breath"], "URGENT"));