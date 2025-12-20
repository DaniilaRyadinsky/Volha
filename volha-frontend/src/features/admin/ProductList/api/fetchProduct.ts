import type { Product } from "../../../../entities/Product/types/ProductTypes"
import BASE_URL from "../../../../shared/const/base_url"

export const fetchProducts = async (): Promise<Product[]> => {
    const res = await fetch(`${BASE_URL}api/product/all?start=0&end=200`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
        throw new Error(res.statusText);
    }
    const products = await res.json() 
    return products.items;
}


export default fetchProducts;
