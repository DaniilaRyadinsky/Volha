import type { Color } from "../../../../entities/Product/types/ProductTypes";

export interface IForm {
    closecallback: () => void
}

export interface ICustomInput {
    setModalMode: (value: "none" | "brand" | "category" | "country" | "material" | "color") => void,
    style?: React.CSSProperties
}

export type NewProduct = {
    id: string,
    article: string,
    title: string,
    brand?: string,
    category?: string,
    country?: string,
    width: number,
    height: number,
    depth: number,
    materials: string[],
    colors: string[],
    photos: string[],
    seems: string[],
    price: number,
    description: string
}

export type ColorItem = {
    color: Color;
    images: string[];
}