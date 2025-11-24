import { type ReactNode, useState, useCallback, useMemo } from "react";
import type { Product } from "../../../../entities/Product/types/ProductTypes";
import { defaultNewProduct } from "../model/defaults";
import type { NewProduct, ColorItem } from "../types/types";
import { ProductFormContext } from "./context";

export const ProductFormProvider = ({ children }: { children: ReactNode }) => {
    const [newProduct, setNewProduct] = useState<NewProduct>(defaultNewProduct)
    const [title, setTitle] = useState<string>(defaultNewProduct.title);
    const [description, setDescription] = useState<string>(defaultNewProduct.description);
    const[article, setArticle] = useState<string>(defaultNewProduct.article);
    const [colorList, setColorList] = useState<ColorItem[]>([])
    const [selectedColor, setSelectedColor] = useState<string | null>(null)
    const [errors, setErrors] = useState<Partial<Record<keyof NewProduct, "empty" | "limit">>>({});

    const resetForm = useCallback(() => {
        setNewProduct(defaultNewProduct)
        setTitle(defaultNewProduct.title)
        setDescription(defaultNewProduct.description)
        setArticle(defaultNewProduct.article)
        setColorList([])
        setSelectedColor(null)
    }, [])

    const onInputChange = useCallback(
        (key: keyof Product, value: string | number) => {
            if (value !== '' && errors[key] === "empty") {
                setErrors(prev => ({ ...prev, [key]: undefined }));
            }

            setNewProduct(prev => ({
                ...prev,
                [key]: value
            }));
        },
        [errors, setErrors, setNewProduct]
    );

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
        setErrors,
        title,
        setTitle,
        description,
        setDescription,
        article,
        setArticle
    }), [newProduct, colorList, errors, selectedColor, title, description, article]);

    return (
        <ProductFormContext.Provider value={value}>
            {children}
        </ProductFormContext.Provider>
    )
}
