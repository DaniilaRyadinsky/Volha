import type { Material } from "../../../../entities/Product/types/ProductTypes"
import { fetchMaterials } from "../../../../shared/api/fetchTables"

export const fetchMaterial = async (): Promise<Material[]> => {
    return fetchMaterials();
}

export default fetchMaterial;

