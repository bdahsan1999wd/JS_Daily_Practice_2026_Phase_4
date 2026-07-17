// PROBLEM-01: checkEmergencyStatus()

// Logic: Checks 4 critical vital-sign conditions IN ORDER. ANY single match means immediate emergency we report only the FIRST one that matches, not all of them.

const checkEmergencyStatus = (patient) => {

    // --- STEP 1: VALIDATION ---
    if (typeof patient !== "object" || patient === null || Array.isArray(patient)) {
        return "Invalid Input";
    }
    const { heartRate, oxygenSaturation, consciousnessLevel, bodyTemperature } = patient;
    if (typeof heartRate !== "number" || heartRate <= 0) return "Invalid Input";
    if (typeof oxygenSaturation !== "number" || oxygenSaturation < 0 || oxygenSaturation > 100) return "Invalid Input";
    if (!["ALERT", "CONFUSED", "UNRESPONSIVE"].includes(consciousnessLevel)) return "Invalid Input";
    if (typeof bodyTemperature !== "number" || bodyTemperature <= 0) return "Invalid Input";

    // --- STEP 2: CHECK EACH CONDITION IN ORDER, REPORT ONLY THE FIRST MATCH ---
    if (consciousnessLevel === "UNRESPONSIVE") {
        return { isEmergency: true, emergencyReason: "Unresponsive patient" };
    }
    if (oxygenSaturation < 90) {
        return { isEmergency: true, emergencyReason: "Critical oxygen saturation" };
    }
    if (heartRate < 40 || heartRate > 150) {
        return { isEmergency: true, emergencyReason: "Critical heart rate" };
    }
    if (bodyTemperature >= 40) {
        return { isEmergency: true, emergencyReason: "Dangerously high fever" };
    }

    // --- STEP 3: NONE OF THE EMERGENCY CONDITIONS MATCHED ---
    return { isEmergency: false, emergencyReason: null };
};

// --- EXAMPLE USAGE ---
console.log(checkEmergencyStatus({
    heartRate: 160,
    oxygenSaturation: 95,
    consciousnessLevel: "ALERT",
    bodyTemperature: 37
}));