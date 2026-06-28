// PROBLEM-04: orchestrateAccountRecovery()

// Logic: Decides whether an account-recovery request can proceed, based on different verification requirements tied to the account's risk level (LOW / MEDIUM / HIGH).

const orchestrateAccountRecovery = (recoveryRequest, verificationResults) => {

    // --- STEP 1: VALIDATION ---
    // 1a) recoveryRequest must be a plain object
    if (typeof recoveryRequest !== "object" || recoveryRequest === null || Array.isArray(recoveryRequest)) {
        return "Invalid Input";
    }
    // 1b) verificationResults must be a plain object
    if (typeof verificationResults !== "object" || verificationResults === null || Array.isArray(verificationResults)) {
        return "Invalid Input";
    }
    const { userId, accountRiskLevel } = recoveryRequest;
    // 1c) userId must be a non-empty string
    if (typeof userId !== "string" || userId === "") return "Invalid Input";
    // 1d) accountRiskLevel must be one of the 3 allowed levels
    if (!["LOW", "MEDIUM", "HIGH"].includes(accountRiskLevel)) return "Invalid Input";

    // --- STEP 2: SAFE EXTRACTION WITH FALLBACKS ---
    const emailVerified = verificationResults?.emailVerified ?? false;
    const phoneVerified = verificationResults?.phoneVerified ?? false;
    const securityQuestionsVerified = verificationResults?.securityQuestionsVerified ?? false;
    const supportAgentApproved = verificationResults?.supportAgentApproved ?? false;

    // --- STEP 3: EVALUATE REQUIREMENTS BASED ON RISK LEVEL ---
    let recoveryApproved = false;
    const missingSteps = [];

    if (accountRiskLevel === "LOW") {
        // LOW risk: at least ONE of email/phone is enough
        recoveryApproved = emailVerified || phoneVerified;
        if (!recoveryApproved) {
            // neither verified -> both are technically "missing options"
            missingSteps.push("email verification", "phone verification");
        }
    } else if (accountRiskLevel === "MEDIUM") {
        // MEDIUM risk: BOTH email AND phone required
        recoveryApproved = emailVerified && phoneVerified;
        if (!emailVerified) missingSteps.push("email verification");
        if (!phoneVerified) missingSteps.push("phone verification");
    } else if (accountRiskLevel === "HIGH") {
        // HIGH risk: email AND phone AND (securityQuestions OR supportApproval)
        const extraStepDone = securityQuestionsVerified || supportAgentApproved;
        recoveryApproved = emailVerified && phoneVerified && extraStepDone;
        if (!emailVerified) missingSteps.push("email verification");
        if (!phoneVerified) missingSteps.push("phone verification");
        if (!extraStepDone) missingSteps.push("security questions or support approval");
    }

    // --- STEP 4: DETERMINE NEXT ACTION ---
    const nextAction = recoveryApproved
        ? "Proceed with password reset"
        : "Complete remaining verification steps";

    // --- STEP 5: RETURN FINAL RESULT ---
    return { recoveryApproved, missingSteps, nextAction };
};

// --- EXAMPLE USAGE ---
console.log(orchestrateAccountRecovery(
    { userId: "U-900", accountRiskLevel: "HIGH" },
    { emailVerified: true, phoneVerified: true, securityQuestionsVerified: false, supportAgentApproved: false }
));