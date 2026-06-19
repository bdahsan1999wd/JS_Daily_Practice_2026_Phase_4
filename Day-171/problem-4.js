// 🧩 PROBLEM–04: runPipeline()

// Logic: Drives multi-stage transformations by executing data filters and modifications sequentially. It accepts sequences via modern rest syntax, updates inputs through a functional pipeline pattern, and summarizes array dimension variances across the lifecycle.

const runPipeline = (data, ...steps) => {

    // --- STEP 1: PARAMETER INTEGRITY VERIFICATION ---
    if (!Array.isArray(data) || data.length === 0) {
        return "Invalid Input";
    }
    // Rest parameter confirmation: Pipeline flows require at least 1 transformation arrow function.
    if (!steps || steps.length === 0) {
        return "Invalid Input";
    }

    const totalOriginalElementsCount = data.length;
    let runningPipelineBuffer = [...data];

    // --- STEP 2: LOOP THROUGH PIPELINE FUNCTIONS ---
    for (let i = 0; i < steps.length; i++) {
        const structuralStepArrow = steps[i];

        if (typeof structuralStepArrow !== "function") {
            return "Invalid Input";
        }

        try {
            // Apply logic mutations sequentially, using the output of the previous stage as current input
            runningPipelineBuffer = structuralStepArrow(runningPipelineBuffer);

            if (!Array.isArray(runningPipelineBuffer)) {
                return "Invalid Input";
            }
        } catch (pipelineException) {
            return "Invalid Input";
        }
    }

    // --- STEP 3: RECORD EXECUTION HISTORY METRICS ---
    return {
        originalCount: totalOriginalElementsCount,
        finalCount: runningPipelineBuffer.length,
        stepsApplied: steps.length,
        result: runningPipelineBuffer
    };
};

// --- EXAMPLE USAGE ---
console.log(runPipeline(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    data => data.filter(n => n % 2 === 0),
    data => data.map(n => n * 3),
    data => data.filter(n => n > 10)
));