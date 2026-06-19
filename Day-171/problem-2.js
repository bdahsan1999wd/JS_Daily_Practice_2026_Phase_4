// 🧩 PROBLEM–02: evaluateFormulas()

// Logic: Iterates through structural sets of objects while evaluating formula rules dynamically. It leverages modern rest/spread parameters to avoid updating original inputs, processes mathematical strings using arrow functions, and limits results safely to 2 decimal places.

const evaluateFormulas = (dataset, formulas) => {

    // --- STEP 1: INITIAL COMPONENT TYPE ASSURANCES ---
    if (!Array.isArray(dataset) || dataset.length === 0) {
        return "Invalid Input";
    }
    if (!formulas || typeof formulas !== "object" || Array.isArray(formulas)) {
        return "Invalid Input";
    }

    const formulaKeys = Object.keys(formulas);

    // --- STEP 2: MULTI-LEVEL LOGICAL COMPONENT OVERRIDES ---
    const evaluatedCollectionOutput = [];

    for (let i = 0; i < dataset.length; i++) {
        const itemRecord = dataset[i];

        if (!itemRecord || typeof itemRecord !== "object" || Array.isArray(itemRecord)) {
            return "Invalid Input";
        }

        // Isolate reference scope footprints completely using the object spread operator
        let extendedResultNode = { ...itemRecord };

        // Process formulas incrementally over cloned dictionary keys
        for (let j = 0; j < formulaKeys.length; j++) {
            const outputFieldKey = formulaKeys[j];
            const executeFormulaArrow = formulas[outputFieldKey];

            if (typeof executeFormulaArrow !== "function") {
                return "Invalid Input";
            }

            try {
                // Call lambda expressions while supplying item variables as scoped properties
                const rawCalculatedValue = executeFormulaArrow(extendedResultNode);

                if (typeof rawCalculatedValue !== "number" || isNaN(rawCalculatedValue)) {
                    return "Invalid Input";
                }

                // Force layout parameters onto precise decimal fractional bounds
                extendedResultNode[outputFieldKey] = parseFloat(rawCalculatedValue.toFixed(2));
            } catch (err) {
                return "Invalid Input";
            }
        }

        evaluatedCollectionOutput.push(extendedResultNode);
    }

    return evaluatedCollectionOutput;
};

// --- EXAMPLE USAGE ---
console.log(evaluateFormulas([
    { baseSalary: 50000, bonusPercent: 10, taxPercent: 15 },
    { baseSalary: 80000, bonusPercent: 5, taxPercent: 20 }
], {
    bonusAmount: r => parseFloat((r.baseSalary * r.bonusPercent / 100).toFixed(2)),
    netSalary: r => parseFloat(((r.baseSalary + r.baseSalary * r.bonusPercent / 100) * (1 - r.taxPercent / 100)).toFixed(2))
}));