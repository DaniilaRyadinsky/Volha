import type { Product } from "../../../../entities/Product/types/ProductTypes"
import BASE_URL from "../../../../shared/const/base_url"

export const fetchProducts = async (): Promise<Product[]> => {
    const res = await fetch(`${BASE_URL}api/product/getall`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
        throw new Error(res.statusText);
    }
    return res.json();
}


export default fetchProducts;
