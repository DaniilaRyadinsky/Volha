import { type ReactNode, useState, useCallback, useMemo } from "react";
import type { Product } from "../../../../entities/Product/types/ProductTypes";
import { defaultNewProduct } from "../model/defaults";
import type { NewProduct, ColorItem } from "../types/types";
import { ProductFormContext } from "./context";

export const ProductFormProvider = ({ children }: { children: ReactNode }) => {
    const [newProduct, setNewProduct] = useState<NewProduct>(defaultNewProduct)
    const [colorList, setColorList] = useState<ColorItem[]>([])
    const [selectedColor, setSelectedColor] = useState('')
    const [errors, setErrors] = useState<Partial<Record<keyof NewProduct, "empty" | "limit">>>({});

    const resetForm = useCallback(() => {
        setNewProduct(defaultNewProduct)
        setColorList([])
        setSelectedColor('')
    }, [])

    const onInputChange = (key: keyof Product, value: string | number) => {
        if (value !== '' && errors[key] === "empty") {
            setErrors(prev => ({ ...prev, [key]: undefined }));
        }
        setNewProduct(prev => ({
            ...prev,
            [key]: value
        }))
    }

    // Оптимизируем рендер - предотвращаем лишние обновления
    const value = useMemo(() => ({
        newProduct,
        setNewProduct,
        colorList,
        setColorList,
        selectedColor,
        setSelectedColor,
        resetForm,
        onInputChange,
        errors,
        setErrors
    }), [newProduct, colorList, errors, selectedColor])

    return (
        <ProductFormContext.Provider value={value}>
            {children}
        </ProductFormContext.Provider>
    )
}
