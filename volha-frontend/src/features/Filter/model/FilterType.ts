import type { Brand, Category, Color, Country, Material } from "../../../entities/Product/types/ProductTypes"

export interface IFilter {
    categories: string[],
    brands: string[],
    colors: string[],
    countries: string[],
    materials: string[],
    min_price: number,
    max_price: number,
    min_width: number,
    max_width: number,
    min_height: number,
    max_height: number,
    min_depth: number,
    max_depth: number
}

export type FilterMetadata = {
    categories: Category[],
    brands: Brand[],
    countries: Country[],
    materials: Material[],
    colors: Color[],
    min_price: number,
    max_price: number,
    min_width: number,
    max_width: number,
    min_height: number,
    max_height: number,
    min_depth: number,
    max_depth: number
}

export type FilterCheckboxType = "categories" | "brands" | "countries" | "materials" | "colors";

export type CheckboxItem = {
    id: string,
    title?: string,
    name?: string,
    hex?: string
}

