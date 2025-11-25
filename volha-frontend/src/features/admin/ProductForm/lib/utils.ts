import type { ColorItem, NewProduct } from "../types/types";

const findById = <T extends { id: string | number }>(
    arr: T[],
    id?: string | number
): T | undefined => (id == null ? undefined : arr.find(x => String(x.id) === String(id)));

// сразу получить label по id
export const getLabel = <T extends { id: string | number; name: string }>(
    arr: T[],
    id?: string | number
): string | undefined => findById(arr, id)?.name;

export const getLabelTitle = <T extends { id: string | number; title: string }>(
    arr: T[],
    id?: string | number
): string | undefined => findById(arr, id)?.title;


export const validateForm = (
    newProduct: NewProduct, 
    colorList: ColorItem[],
    setErrors: (val: Partial<Record<keyof NewProduct, "empty" | "limit">>) => void
) => {
    const newErrors: Partial<Record<keyof NewProduct, "empty" | "limit">> = {};

    if (newProduct.title == '') newErrors.title = "empty";
    if (newProduct.article == '') newErrors.article = "empty";
    if (newProduct.article.length !== 8) newErrors.article = "limit";
    if (!newProduct.brand) newErrors.brand = "empty";
    if (!newProduct.category) newErrors.category = "empty";
    if (!newProduct.materials || newProduct.materials.length === 0) newErrors.materials = "empty";
    if (!newProduct.country) newErrors.country = "empty";
    if (!newProduct.price || newProduct.price <= 0) newErrors.price = "empty";
    if (newProduct.width == 0) newErrors.width = "empty";
    if (newProduct.height == 0) newErrors.height = "empty";
    if (newProduct.depth == 0) newErrors.depth = "empty";
    if (!colorList || colorList.length === 0) newErrors.colors = "empty";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
};