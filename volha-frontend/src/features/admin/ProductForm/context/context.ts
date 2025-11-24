import { createContext } from 'react'
import type { NewProduct, ColorItem } from '../types/types'
import type { Product } from '../../../../entities/Product/types/ProductTypes'

export interface ProductFormContextType {
    newProduct: NewProduct
    setNewProduct: React.Dispatch<React.SetStateAction<NewProduct>>
    colorList: ColorItem[]
    setColorList: React.Dispatch<React.SetStateAction<ColorItem[]>>
    selectedColor: string | null
    setSelectedColor: React.Dispatch<React.SetStateAction<string | null>>
    resetForm: () => void,
    onInputChange: (key: keyof Product, value: string | number) => void;
    errors: Partial<Record<keyof NewProduct, "empty" | "limit">>
    setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof NewProduct, "empty" | "limit">>>>
    title: string
    setTitle: React.Dispatch<React.SetStateAction<string>>
    description: string
    setDescription: React.Dispatch<React.SetStateAction<string>>
    article: string
    setArticle: React.Dispatch<React.SetStateAction<string>>
}

export const ProductFormContext = createContext<ProductFormContextType | undefined>(undefined)

