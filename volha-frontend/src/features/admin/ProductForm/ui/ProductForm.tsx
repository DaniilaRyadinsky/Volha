import { useState } from 'react'
import type { Brand, Category, Color, Country, Material, Product } from '../../../../entities/Product/types/ProductTypes'
import Input from '../../../../shared/ui/Input/Input'
import styles from './ProductForm.module.css'
import Select from '../../../../shared/ui/Select/Select'
import Textarea from '../../../../shared/ui/Textarea/Textarea'
import { useAdminData } from '../../AdminLayout/lib/useAdminData'
import Modal from '../../../../shared/ui/Modal/Modal'
import BrandForm from '../internal/forms/BrandForm'
import MaterialForm from '../internal/forms/MaterialForm'
import CategoryForm from '../internal/forms/CategoryForm'
import CountryForm from '../internal/forms/CountryForm'
import { getLabel, getLabelTitle } from '../lib/find'
import ColorForm from '../internal/ColorForm/ColorForm'
import { Button } from '../../../../shared/ui/Button/Button'
import type { ColorItem, NewProduct } from '../types/types'
import { postProduct } from '../api/fetchCreate'


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

    const [colorList, setColorList] = useState<ColorItem[]>([])

    const onInputChange = (key: keyof Product, value: string|number) => {
        setNewProduct(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const handleSaveClick = () => {
        // if (colorList.length < 0) {
        console.log("click")
        setNewProduct(prev => ({ ...prev, colors: colorList.map(item => item.color.id), photos: colorList[0].images }))
        postProduct(newProduct, () => console.log("succ"), (e) => console.log(e))
        // }
    }

    return (
        <div>
            <h1>Новый товар</h1>
            <Button onClick={() => handleSaveClick()}>Сохранить</Button>
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
                        <Input type='number' placeholder='Высота' style={{ width: "100px" }} value={String(newProduct.height)} onChange={(e) => onInputChange("height", parseInt(e))} />
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
                            <Input type='number' style={{ width: "70px" }} placeholder='Введите длину' value={String(newProduct.width)} onChange={(e) => onInputChange("width", parseInt(e))} />
                        </label>

                        <label className={styles.label}>
                            Ширина
                            <Input type='number' placeholder='Ширина' style={{ width: "70px" }} value={String(newProduct.depth)} onChange={(e) => onInputChange("depth", parseInt(e))} />
                        </label>

                        <label className={styles.label}>
                            Высота
                            <Input type='number' placeholder='Высота' style={{ width: "70px" }} value={String(newProduct.height)} onChange={(e) => onInputChange("height", parseInt(e))} />
                        </label>
                    </div>

                    <label className={styles.label}>
                        Описание
                        <Textarea style={{ height: "150px" }} value={newProduct.description} placeholder='Описание' onChange={(e) => onInputChange("description", e)} />
                    </label>
                </div>
                <div className={styles.right_container}>
                    <ColorForm colorList={colorList} setColorList={setColorList} />
                </div>


                {modalMode != "none" && <Modal closeCallback={() => setModalMode("none")}>
                    {modalMode === 'brand' && <BrandForm closecallback={() => setModalMode("none")} />}
                    {modalMode === 'material' && <MaterialForm closecallback={() => setModalMode("none")} />}
                    {modalMode === 'category' && <CategoryForm closecallback={() => setModalMode("none")} />}
                    {modalMode == "country" && <CountryForm closecallback={() => setModalMode("none")} />}

                </Modal>}
            </div>
        </div>
    )
}
