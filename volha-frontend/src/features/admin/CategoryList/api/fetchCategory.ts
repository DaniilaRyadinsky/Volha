import type { Category } from "../../../../entities/Product/types/ProductTypes"
import { fetchCategories } from "../../../../shared/api/fetchTables"

export const fetchCategory = async (): Promise<Category[]> => {
    return fetchCategories();
}

export default fetchCategory;

