import type { Country } from "../../../../entities/Product/types/ProductTypes"
import { fetchCountries } from "../../../../shared/api/fetchTables"

export const fetchCountry = async (): Promise<Country[]> => {
    return fetchCountries();
}

export default fetchCountry;

