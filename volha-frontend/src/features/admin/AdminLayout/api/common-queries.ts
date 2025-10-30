import { fetchBrands, fetchCategories, fetchColors, fetchCountries, fetchMaterials } from "../../../../shared/api/fetchTables";

export const commonQueries = {
  categories: {
    queryKey: ['admin', 'categories'], 
    queryFn: fetchCategories,
    staleTime: 30 * 60 * 1000,
  },
  brands: {
    queryKey: ['admin', 'brands'], 
    queryFn: fetchBrands,
    staleTime: 30 * 60 * 1000,
  },
  colors: {
    queryKey: ['admin', 'colors'],
    queryFn: fetchColors,
    staleTime: 30 * 60 * 1000,
  },
  countries: {
    queryKey: ['admin', 'countries'],
    queryFn: fetchCountries,
    staleTime: 30 * 60 * 1000,
  },
  materials: {
    queryKey: ['admin', 'materials'],
    queryFn: fetchMaterials,
    staleTime: 30 * 60 * 1000,
  }
} as const;