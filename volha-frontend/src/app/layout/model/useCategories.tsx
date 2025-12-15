import { useSuspenseQuery } from "@tanstack/react-query";
import type { Category } from "../../../entities/Product/types/ProductTypes";
import { fetchCategories } from "../../../shared/api/fetchTables";

export const useCategories = () => {
    const { data: categories , error} = useSuspenseQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    }); 
    return { categories: categories ?? [], error: error };
};