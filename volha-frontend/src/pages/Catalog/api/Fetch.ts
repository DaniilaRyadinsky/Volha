
import type { Product } from '../../../entities/Product/types/ProductTypes';
import type { IFilter } from '../../../features/Filter/model/FilterType';
import BASE_URL from '../../../shared/const/base_url'


export const fetchProducts = async (
    filterData: IFilter,
    onSuccess: (d: Product[]) => void,
    onError: (e: string) => void
) => {
    fetch(`${BASE_URL}api/product/filter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            brand: filterData.brands,
            category: filterData.categories,
            colors: filterData.colors,
            country: filterData.countries,
            limit: 0,
            materials: filterData.materials,
            max_depth: filterData.max_depth,
            max_height: filterData.max_height,
            max_price: filterData.max_price,
            max_width: filterData.max_width,
            min_depth: filterData.min_depth,
            min_height: filterData.min_height,
            min_price: filterData.min_price,
            min_width: filterData.min_width,
            offset: 0,
            sort_by: filterData.sort_by,
            sort_order: filterData.sort_order
        })
    })
        .then(res => res.json())
        .then(d => onSuccess(d))
        .catch(e => onError(e))
}