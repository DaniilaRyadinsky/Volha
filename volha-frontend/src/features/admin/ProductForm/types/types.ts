import type { Color } from "../../../../entities/Product/types/ProductTypes";

export interface IAdminModalForm {
    // data?: Brand | Category | Country | Material | Color
    closecallback: () => void,
    onChange?: (id: string) => void;
}

export interface IAdminSelect {
    defaultValue?: string,
    onChange: (value: string) => void,
    isErr: boolean,
    setErrors: (e?:  "empty" | "limit") => void,
}

export interface ICustomInput {
    defaultValue: ColorItem[] | string[]
    onChange: (value: string[] | ColorItem[]) => void,
    isErr: boolean,
    setErrors: (e?:  "empty" | "limit") => void,
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
    description: string,
    is_favorite: boolean
}

export type ColorItem = {
    color: Color;
    images: string[];
}