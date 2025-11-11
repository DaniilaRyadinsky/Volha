import type { Brand } from "../../../../entities/Product/types/ProductTypes"
import { fetchBrands } from "../../../../shared/api/fetchTables"

export const fetchBrand = async (): Promise<Brand[]> => {
    return fetchBrands();
}

export default fetchBrand;

