import { useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { NewProduct, ColorItem } from '../types/types'
import { ProductFormContext } from './context'
import { defaultNewProduct } from '../model/defaults'
import type { Product } from '../../../../entities/Product/types/ProductTypes'

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

    return (
        <ProductFormContext.Provider
            value={{
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
            }}
        >
            {children}
        </ProductFormContext.Provider>
    )
}

