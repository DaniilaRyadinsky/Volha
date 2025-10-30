import { useState } from 'react'
import type { Brand, Category, Country, Material, Product } from '../../../../entities/Product/types/ProductTypes'
import Input from '../../../../shared/ui/Input/Input'
import styles from './ProductForm.module.css'
import Select from '../../../../shared/ui/Select/Select'
import Textarea from '../../../../shared/ui/Textarea/Textarea'
import { useAdminData } from '../../AdminLayout/lib/useAdminData'

type NewProduct = {
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

export const ProductForm = () => {
    const { categories, brands, materials, colors, countries } = useAdminData();
    const [newProduct, setNewProduct] = useState<NewProduct>({
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
    })

    const onInputChange = (key: keyof Product, value: string) => {
        setNewProduct(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const findById = <T extends { id: string | number }>(
        arr: T[],
        id?: string | number
    ): T | undefined => (id == null ? undefined : arr.find(x => String(x.id) === String(id)));

    // сразу получить label по id
    const getLabel = <T extends { id: string | number; name: string }>(
        arr: T[],
        id?: string | number
    ): string | undefined => findById(arr, id)?.name;

    const getLabelTitle = <T extends { id: string | number; title: string }>(
        arr: T[],
        id?: string | number
    ): string | undefined => findById(arr, id)?.title;


    console.log(categories)
    return (
        <div className={styles.form_container}>
            <label className={styles.label}>
                Название товара
                <Input type='text' placeholder='Введите название товара' value={newProduct.title} onChange={(e) => onInputChange("title", e.target.value)} />
            </label>

            <label className={styles.label}>
                Артикул
                <Input type='text' placeholder='Введите артикул' value={newProduct.article} onChange={(e) => onInputChange("article", e.target.value)} />
            </label>

            <label className={styles.label}>
                Цена
                <Input type='number' placeholder='Высота' style={{ width: "100px" }} value={String(newProduct.height)} onChange={(e) => onInputChange("height", e.target.value)} />
            </label>

            <label className={styles.label}>
                Бренд
                <Select
                    value={getLabel(brands, newProduct.brand)}
                    title='Бренд'
                    options={brands.map((b: Brand) => ({ value: b.id, label: b.name }))}
                    onChange={(e) => { onInputChange("brand", e) }}
                    lastChild={<div onClick={()=> {}}>Добавить бренд...</div>}
                />
            </label>

            <label className={styles.label}>
                Категория
                <Select
                    value={getLabelTitle(categories, newProduct.category)}
                    title='Категория'
                    options={categories.map((c: Category) => ({ value: c.id, label: c.title }))}
                    onChange={(e) => onInputChange("category", e)} />
                    lastChild={<div onClick={()=> {}}>Добавить категорию...</div>}
            </label>

            <label className={styles.label}>
                Материалы
                <Select
                    title='Материалы'
                    options={materials.map((c: Material) => ({ value: c.id, label: c.title }))}
                    onChange={() => { }} 
                    lastChild={<div onClick={()=> {}}>Добавить материал...</div>}
                    />
                    
            </label>

            <label className={styles.label}>
                Страна
                <Select
                value={getLabelTitle(countries, newProduct.country)}
                    title='Страна'
                    options={countries.map((c: Country) => ({ value: c.id, label: c.title }))}
                    onChange={(e) => onInputChange("country", e)} 
                    lastChild={<div onClick={()=> {}}>Добавить страну...</div>}
                    />
            </label>

            <div className={styles.width_container}>
                <label className={styles.label}>
                    Длина
                    <Input type='number' style={{ width: "70px" }} placeholder='Введите длину' value={String(newProduct.width)} onChange={(e) => onInputChange("width", e.target.value)} />
                </label>

                <label className={styles.label}>
                    Ширина
                    <Input type='number' placeholder='Ширина' style={{ width: "70px" }} value={String(newProduct.depth)} onChange={(e) => onInputChange("depth", e.target.value)} />
                </label>

                <label className={styles.label}>
                    Высота
                    <Input type='number' placeholder='Высота' style={{ width: "70px" }} value={String(newProduct.height)} onChange={(e) => onInputChange("height", e.target.value)} />
                </label>
            </div>

            <label className={styles.label}>
                Описание
                <Textarea style={{ height: "150px" }} value={newProduct.description} placeholder='Описание' onChange={(e) => onInputChange("description", e.target.value)} />
            </label>


        </div>
    )
}
