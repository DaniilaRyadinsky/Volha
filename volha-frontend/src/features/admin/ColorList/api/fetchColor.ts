import type { Color } from "../../../../entities/Product/types/ProductTypes"
import { fetchColors } from "../../../../shared/api/fetchTables"

export const fetchColor = async (): Promise<Color[]> => {
    return fetchColors();
}

export default fetchColor;

