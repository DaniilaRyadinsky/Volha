import BASE_URL from "../const/base_url";

export const fetchTables = async (
    table: "brand" | "color" | "country" | "material" | "category"
) => {
    const res = await fetch(`${BASE_URL}api/${table}/getall`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) {
        throw new Error(res.statusText);
    }
    return res.json();
}

export const fetchCategories = async () => {
    return fetchTables("category")
}

export const fetchBrands = async () => {
    return fetchTables("brand")
}

export const fetchMaterials = async () => {
    return fetchTables("material")
}

export const fetchColors = async () => {
    return fetchTables("color")
}

export const fetchCountries = async () => {
    return fetchTables("country")
}
