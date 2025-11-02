import { useState } from 'react'
import type { Brand, Category, Country, Material, Product } from '../../../../entities/Product/types/ProductTypes'
import Input from '../../../../shared/ui/Input/Input'
import styles from './ProductForm.module.css'
import Select from '../../../../shared/ui/Select/Select'
import Textarea from '../../../../shared/ui/Textarea/Textarea'
import { useAdminData } from '../../AdminLayout/lib/useAdminData'
import Modal from '../../../../shared/ui/Modal/Modal'
import BrandForm from './forms/BrandForm'
import MaterialForm from './forms/MaterialForm'
import CategoryForm from './forms/CategoryForm'
import CountryForm from './forms/CountryForm'
import { getLabel, getLabelTitle } from './lib/find'
import AdminImage from './Image/AdminImage'
import ColorForm from './ColorForm/ColorForm'

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
    const { categories, brands, materials, countries } = useAdminData();
    const [modalMode, setModalMode] = useState<"none" | "brand" | "category" | "country" | "material">("none")

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


    return (
        <div className={styles.form_container}>
            <div className={styles.left_container}>
                <label className={styles.label}>
                    Название товара
                    <Input type='text' placeholder='Введите название товара' value={newProduct.title} onChange={(e) => onInputChange("title", e)} />
                </label>

                <label className={styles.label}>
                    Артикул
                    <Input type='text' placeholder='Введите артикул' value={newProduct.article} onChange={(e) => onInputChange("article", e)} />
                </label>

                <label className={styles.label}>
                    Цена
                    <Input type='number' placeholder='Высота' style={{ width: "100px" }} value={String(newProduct.height)} onChange={(e) => onInputChange("height", e)} />
                </label>

                <label className={styles.label}>
                    Бренд
                    <Select
                        value={getLabel(brands, newProduct.brand)}
                        title='Бренд'
                        options={brands.map((b: Brand) => ({ value: b.id, label: b.name }))}
                        onChange={(e) => { onInputChange("brand", e) }}
                        lastChild={<div >Добавить бренд...</div>}
                        lastOnClick={() => { setModalMode("brand") }}
                    />
                </label>

                <label className={styles.label}>
                    Категория
                    <Select
                        value={getLabelTitle(categories, newProduct.category)}
                        title='Категория'
                        options={categories.map((c: Category) => ({ value: c.id, label: c.title }))}
                        onChange={(e) => onInputChange("category", e)}
                        lastChild={<div >Добавить категорию...</div>}
                        lastOnClick={() => { setModalMode("category") }}
                    />

                </label>

                <label className={styles.label}>
                    Материалы
                    <Select
                        title='Материалы'
                        options={materials.map((c: Material) => ({ value: c.id, label: c.title }))}
                        onChange={() => { }}
                        lastChild={<div >Добавить материал...</div>}
                        lastOnClick={() => { setModalMode("material") }}
                    />

                </label>

                <label className={styles.label}>
                    Страна
                    <Select
                        value={getLabelTitle(countries, newProduct.country)}
                        title='Страна'
                        options={countries.map((c: Country) => ({ value: c.id, label: c.title }))}
                        onChange={(e) => onInputChange("country", e)}
                        lastChild={<div>Добавить страну...</div>}
                        lastOnClick={() => { setModalMode("country") }}
                    />
                </label>

                <div className={styles.width_container}>
                    <label className={styles.label}>
                        Длина
                        <Input type='number' style={{ width: "70px" }} placeholder='Введите длину' value={String(newProduct.width)} onChange={(e) => onInputChange("width", e)} />
                    </label>

                    <label className={styles.label}>
                        Ширина
                        <Input type='number' placeholder='Ширина' style={{ width: "70px" }} value={String(newProduct.depth)} onChange={(e) => onInputChange("depth", e)} />
                    </label>

                    <label className={styles.label}>
                        Высота
                        <Input type='number' placeholder='Высота' style={{ width: "70px" }} value={String(newProduct.height)} onChange={(e) => onInputChange("height", e)} />
                    </label>
                </div>

                <label className={styles.label}>
                    Описание
                    <Textarea style={{ height: "150px" }} value={newProduct.description} placeholder='Описание' onChange={(e) => onInputChange("description", e)} />
                </label>
            </div>
            <div className={styles.right_container}>
                {/* <AdminImage src={"noj.png"}/> */}
                <ColorForm />
            </div>

            
            {modalMode != "none" && <Modal closeCallback={() => setModalMode("none")}>
                {modalMode === 'brand' && <BrandForm closecallback={() => setModalMode("none")} />}
                {modalMode === 'material' && <MaterialForm closecallback={() => setModalMode("none")} />}
                {modalMode === 'category' && <CategoryForm closecallback={() => setModalMode("none")} />}
                {modalMode == "country" && <CountryForm closecallback={() => setModalMode("none")} />}

            </Modal>}
        </div>
    )
}
