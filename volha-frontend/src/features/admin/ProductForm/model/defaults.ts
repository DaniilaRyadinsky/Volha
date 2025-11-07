import type { NewProduct } from "../types/types";

export const defaultNewProduct: NewProduct = {
    id: '',
    article: '',
    title: '',
    brand: undefined,
    category: undefined,
    country: undefined,
    width: 0,
    height: 0,
    depth: 0,
    materials: [],
    colors: [],
    photos: [],
    seems: [],
    price: 0,
    description: ''
}