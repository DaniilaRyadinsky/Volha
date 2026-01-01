
import type { Product } from '../../../entities/Product/types/ProductTypes';
import type { FilterMetadata, IFilter } from '../../../features/Filter/model/FilterType';
import BASE_URL from '../../../shared/const/base_url'

export const fetchFilters = async (
    onSuccess: (data: FilterMetadata) => void,
    onError: (e: string) => void,
    id?: string
) => {
    fetch(`${BASE_URL}api/dictionaries/all${id ? `/by-category?id=${id}` : ""}`)
        .then(async response => {
            const status = response.status;
            if (status === 200) {
                const json = await response.json();
                onSuccess(json);
            } else {
                switch (status) {
                    case 400:
                        onError("Неправильные данные")
                        break;
                    case 404:
                        onError("Неправильный адрес")
                        break;
                    case 502:
                        onError("Ошибка сервера 502")
                        break;
                }
            }
        })
        .catch(err => {
            console.error("Ошибка сети:", err);
            onError("Ошибка сети");
        })
}


export const fetchProducts = async (
    filterData: IFilter,
    onSuccess: (d: { items: Product[], total: number }) => void,
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
            limit: filterData.limit,
            materials: filterData.materials,
            max_depth: filterData.max_depth,
            max_height: filterData.max_height,
            max_price: filterData.max_price,
            max_width: filterData.max_width,
            min_depth: filterData.min_depth,
            min_height: filterData.min_height,
            min_price: filterData.min_price,
            min_width: filterData.min_width,
            offset: filterData.offset,
            sort_by: filterData.sort_by,
            sort_order: filterData.sort_order,
            title: filterData.title ? filterData.title : undefined
        })
    })
        .then(res => res.json())
        .then(d => onSuccess(d))
        .catch(e => onError(e))
}