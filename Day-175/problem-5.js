// Problem-5 : verifySecurityQuestions()

// Logic: Cross-references dynamic submission logs against stored security answers. It processes records via key matches, handles matching case-insensitively, and maps verification compliance thresholds.

const verifySecurityQuestions = (storedAnswers, submittedAnswers, requiredCorrect) => {

    // --- STEP 1: INITIAL STRUCTURAL CHECKS ---
    if (!Array.isArray(storedAnswers) || !Array.isArray(submittedAnswers)) {
        return "Invalid Input";
    }
    if (typeof requiredCorrect !== "number" || requiredCorrect < 1 || isNaN(requiredCorrect)) {
        return "Invalid Input";
    }

    // --- STEP 2: SAFE BOUNDARY RESOLUTIONS ---
    let correctCount = 0;
    const totalQuestions = submittedAnswers.length;

    // --- STEP 3: DATA MAP CONVERSIONS (CASE-INSENSITIVE CROSS SCAN) ---
    for (let i = 0; i < totalQuestions; i++) {
        const subEntry = submittedAnswers[i];
        if (!subEntry || typeof subEntry !== "object" || typeof subEntry.questionId !== "string" || typeof subEntry.answerHash !== "string") {
            return "Invalid Input";
        }

        // Search lookup registry targeting the associated question identifier
        let matchedStored = null;
        for (let j = 0; j < storedAnswers.length; j++) {
            if (storedAnswers[j] && storedAnswers[j].questionId === subEntry.questionId) {
                matchedStored = storedAnswers[j];
                break;
            }
        }

        // Process assertion testing if matching keys were located
        if (matchedStored && typeof matchedStored.answerHash === "string") {
            if (subEntry.answerHash.toLowerCase() === matchedStored.answerHash.toLowerCase()) {
                correctCount++;
            }
        }
    }

    const isVerified = correctCount >= requiredCorrect;
    const verificationMessage = isVerified
        ? `Identity verified: ${correctCount}/${totalQuestions} correct.`
        : `Verification failed: only ${correctCount}/${totalQuestions} correct (need ${requiredCorrect}).`;

    // --- STEP 4: EMIT LOG BLUEPRINT PACKAGES ---
    return {
        correctCount,
        totalQuestions,
        isVerified,
        verificationMessage
    };
};

// --- EXAMPLE USAGE ---
console.log(verifySecurityQuestions(
    [
        { questionId: "Q1", answerHash: "BlueSky" },
        { questionId: "Q2", answerHash: "Rocky" },
        { questionId: "Q3", answerHash: "Dhaka" }
    ],
    [
        { questionId: "Q1", answerHash: "bluesky" },
        { questionId: "Q2", answerHash: "Max" },
        { questionId: "Q3", answerHash: "dhaka" }
    ],
    2
));