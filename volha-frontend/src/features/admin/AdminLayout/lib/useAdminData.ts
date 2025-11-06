import { QueryClient, useQuery } from '@tanstack/react-query';
import { commonQueries } from '../api/common-queries';

export const useAdminData = () => {
  const categoriesQ = useQuery(commonQueries.categories);
  const brandsQ = useQuery(commonQueries.brands);
  const materialsQ = useQuery(commonQueries.materials);
  const colorsQ = useQuery(commonQueries.colors);
  const countriesQ = useQuery(commonQueries.countries);

  const isLoading =
    categoriesQ.isLoading ||
    brandsQ.isLoading ||
    materialsQ.isLoading ||
    colorsQ.isLoading ||
    countriesQ.isLoading;

  const isError =
    categoriesQ.isError ||
    brandsQ.isError ||
    materialsQ.isError ||
    colorsQ.isError ||
    countriesQ.isError;

  return {
    categories: categoriesQ.data ?? [],
    brands: brandsQ.data ?? [],
    materials: materialsQ.data ?? [],
    colors: colorsQ.data ?? [],
    countries: countriesQ.data ?? [],
    isLoading,
    isError,
    refetchCategories: categoriesQ.refetch,
    refetchBrands: brandsQ.refetch,
    refetchMaterials: materialsQ.refetch,
    refetchColors: colorsQ.refetch,
    refetchCountries: countriesQ.refetch,
  };
};

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 5 * 60 * 1000,
        },
    },
});