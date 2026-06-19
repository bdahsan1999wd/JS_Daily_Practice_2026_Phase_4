// 🧩 PROBLEM–04: buildUrls()

// Logic: This function processes routing rules into fully qualified endpoint URLs. It maps objects onto base uniform resource locators, computes optional identifiers, and links page boundaries with query markers cleanly using template literals.

const buildUrls = (baseUrl, routes) => {

    // --- STEP 1: CRITERIA AND RANGE CHECKS ---
    if (typeof baseUrl !== "string" || !baseUrl.startsWith("http")) {
        return "Invalid Input";
    }
    if (!Array.isArray(routes)) {
        return "Invalid Input";
    }

    const finalUrlManifest = [];

    // --- STEP 2: LOOP LOGICAL EXTRACTION MAP ---
    for (let i = 0; i < routes.length; i++) {
        const targetRoute = routes[i];

        if (!targetRoute || typeof targetRoute !== "object" || Array.isArray(targetRoute)) {
            return "Invalid Input";
        }

        // Apply path fallback limits inside dataset loops
        const path = targetRoute.path ?? "/";
        const label = targetRoute.meta?.label ?? "Unnamed Route";

        if (typeof path !== "string" || typeof label !== "string") {
            return "Invalid Input";
        }

        // --- STEP 3: DESTRUCT AND SCALE URI PARAMS ---
        let runningUrlBuilder = `${baseUrl}${path}`;

        // Append resource path keys if present
        const routeParamId = targetRoute.params?.id;
        if (routeParamId !== undefined && routeParamId !== null) {
            if (typeof routeParamId !== "number" && typeof routeParamId !== "string") {
                return "Invalid Input";
            }
            runningUrlBuilder += `/${routeParamId}`;
        }

        // Build query components using strict parameter validation structures
        const queryLimit = targetRoute.query?.limit;
        const queryPage = targetRoute.query?.page;

        if (queryLimit !== undefined && (typeof queryLimit !== "number" || isNaN(queryLimit))) return "Invalid Input";
        if (queryPage !== undefined && (typeof queryPage !== "number" || isNaN(queryPage))) return "Invalid Input";

        let queryStringSegments = "";
        if (queryLimit !== undefined && queryPage !== undefined) {
            queryStringSegments = `?limit=${queryLimit}&page=${queryPage}`;
        } else if (queryLimit !== undefined) {
            queryStringSegments = `?limit=${queryLimit}`;
        } else if (queryPage !== undefined) {
            queryStringSegments = `?page=${queryPage}`;
        }

        // Integrate assembled string fragments together
        const finalCompiledUrl = `${runningUrlBuilder}${queryStringSegments}`;

        finalUrlManifest.push({
            label,
            fullUrl: finalCompiledUrl
        });
    }

    return finalUrlManifest;
};

// --- EXAMPLE USAGE ---
console.log(buildUrls("https://api.myapp.com", [
    { path: "/users", params: { id: 42 }, query: { limit: 10, page: 2 }, meta: { label: "User Detail" } },
    { path: "/products", query: { limit: 20 }, meta: { label: "Product List" } },
    { path: "/orders" }
]));