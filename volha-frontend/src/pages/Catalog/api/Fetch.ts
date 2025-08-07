
import type { IFilter } from '../../../features/Filter/model/FilterType';
import BASE_URL from '../../../shared/const/base_url'


const fetchProducts = async (filterData:IFilter) => {
    const res = await fetch(`${BASE_URL}product/filter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...filterData, brand: filterData.brands, category: filterData.categories, country: filterData.countries })
    });
    if (!res.ok) {
        throw new Error(res.statusText);
    }
    return res.json();
}