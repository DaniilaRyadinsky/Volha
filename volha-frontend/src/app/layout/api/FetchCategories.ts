import BASE_URL from "../../../shared/const/base_url";


export const FetchCategories = async () => {
    const res = await fetch(`${BASE_URL}category/getall`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) {
        throw new Error(res.statusText);
    }
    return res.json();
}