// PROBLEM-09: recommendShippingMethod()

// Logic: A priority-ordered decision tree checks 4 rules IN ORDER, first match wins, with a default fallback if nothing matches.

const recommendShippingMethod = (order) => {

    // --- STEP 1: VALIDATION ---
    if (typeof order !== "object" || order === null || Array.isArray(order)) return "Invalid Input";
    const { weightKg, destinationDistanceKm, isFragile, customerWantsExpress } = order;
    if (typeof weightKg !== "number" || weightKg <= 0) return "Invalid Input";
    if (typeof destinationDistanceKm !== "number" || destinationDistanceKm <= 0) return "Invalid Input";
    if (typeof isFragile !== "boolean") return "Invalid Input";
    if (typeof customerWantsExpress !== "boolean") return "Invalid Input";

    // --- STEP 2: PRIORITY-ORDERED RULES - FIRST MATCH WINS ---
    let recommendedMethod;
    if (isFragile === true && weightKg > 20) {
        recommendedMethod = "SPECIALIZED_FREIGHT";
    } else if (customerWantsExpress === true && destinationDistanceKm <= 500) {
        recommendedMethod = "EXPRESS_COURIER";
    } else if (weightKg > 50) {
        recommendedMethod = "CARGO_TRUCK";
    } else if (destinationDistanceKm > 1000) {
        recommendedMethod = "AIR_FREIGHT";
    } else {
        recommendedMethod = "STANDARD_COURIER"; // default fallback
    }

    // --- STEP 3: LOOK UP ESTIMATED DAYS FOR THE CHOSEN METHOD ---
    const daysByMethod = {
        SPECIALIZED_FREIGHT: 7,
        EXPRESS_COURIER: 1,
        CARGO_TRUCK: 5,
        AIR_FREIGHT: 3,
        STANDARD_COURIER: 4
    };
    const estimatedDays = daysByMethod[recommendedMethod];

    // --- STEP 4: RETURN RESULT ---
    return { recommendedMethod, estimatedDays };
};

// --- EXAMPLE USAGE ---
console.log(recommendShippingMethod({
    weightKg: 15,
    destinationDistanceKm: 300,
    isFragile: true,
    customerWantsExpress: true
}));