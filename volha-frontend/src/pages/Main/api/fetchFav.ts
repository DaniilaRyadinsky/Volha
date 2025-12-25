import type { Product } from "../../../entities/Product/types/ProductTypes"
import BASE_URL from "../../../shared/const/base_url"

export const fetchFavorites = async (
    onSuccess: (d: { items: Product[], total: number }) => void,
    onError: (e: string) => void
) => {
    fetch(`${BASE_URL}api/product/filter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            is_favorite: true,
            limit: 20,
            offset: 0,
        })
    })
        .then(res => res.json())
        .then(d => onSuccess(d))
        .catch(e => onError(e))
}