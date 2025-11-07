import { useEffect, useState } from 'react'
import type { Brand, Category, Country, Material, Product } from '../../../../entities/Product/types/ProductTypes'
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
import { postColorImg, postProduct } from '../api/fetchCreate'
import { showAlert, showErr } from '../../../../shared/ui/customAlert/showAlert'
import { defaultNewProduct } from '../model/defaults'


export const ProductForm = () => {
    const { categories, brands, materials, countries } = useAdminData();
    const [modalMode, setModalMode] = useState<"none" | "brand" | "category" | "country" | "material">("none")
    const [errors, setErrors] = useState<Partial<Record<keyof NewProduct, "empty" | "limit">>>({});
    const [shouldPost, setShouldPost] = useState(false);

    const [newProduct, setNewProduct] = useState<NewProduct>(defaultNewProduct)
    const [colorList, setColorList] = useState<ColorItem[]>([])
    const [selectedColor, setSelectedColor] = useState('')


    const validateForm = () => {
        const newErrors: Partial<Record<keyof NewProduct, "empty" | "limit">> = {};

        if (newProduct.title == '') newErrors.title = "empty";
        if (newProduct.article == '') newErrors.article = "empty";
        if (newProduct.article.length !== 8) newErrors.article = "limit";
        if (!newProduct.brand) newErrors.brand = "empty";
        if (!newProduct.category) newErrors.category = "empty";
        if (!newProduct.country) newErrors.country = "empty";
        if (!newProduct.price || newProduct.price <= 0) newErrors.price = "empty";
        if (newProduct.width == 0) newErrors.width = "empty";
        if (newProduct.height == 0) newErrors.height = "empty";
        if (newProduct.depth == 0) newErrors.depth = "empty";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const onInputChange = (key: keyof Product, value: string | number) => {
        setNewProduct(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const handleSaveClick = () => {
        const isValid = validateForm();
        if (!isValid) return;
        if (colorList.length > 0)
            setNewProduct(prev => ({ ...prev, colors: colorList.map(item => item.color.id), photos: colorList[0].images }))

        console.log("handlesave")
        setShouldPost(true);
    }

    useEffect(() => {
        console.log("effect")
        if (shouldPost) {
            postProduct(newProduct, (id) => {
                colorList.map((item) => {
                    if (!id) {
                        showAlert("Нет id товара")
                        return
                    }
                    postColorImg(item.color.id, item.images, id,
                        () => {
                            showAlert("Продукт создан")
                            setNewProduct(defaultNewProduct)
                            setColorList([])
                        },
                        (e) => {
                            showAlert("Ошибка передачи фото" + e)
                        }
                    )
                })

            }, (e) => {
                showErr("Ошибка:" + e)
            })
            setShouldPost(false)

        }
    }, [shouldPost])

    return (
        <div >
            <div className={styles.title_container}>
                <h1 className={styles.title}>Новый товар</h1>
                <Button onClick={() => handleSaveClick()}>Сохранить</Button>
            </div>
            <div className={styles.form_container}>
                <div className={styles.left_container}>
                    <label className={styles.label}>
                        Название товара
                        <Input
                            type='text'
                            placeholder='Введите название товара'
                            value={newProduct.title}
                            onChange={(e) => onInputChange("title", e)}
                            style={{ border: errors.title ? '2px solid var(--red)' : undefined }}
                        />
                    </label>

                    <label className={styles.label}>
                        Артикул
                        <Input
                            type='text'
                            placeholder='Введите артикул'
                            value={newProduct.article}
                            onChange={(e) => onInputChange("article", e)}
                            style={{ border: errors.article ? '2px solid var(--red)' : undefined }}
                        />
                    </label>
                    {errors.article == "limit" && <p>Длина артикула должна быть 8 символов</p>}

                    <label className={styles.label}>
                        Цена
                        <Input
                            type='number'
                            placeholder='Высота'
                            value={String(newProduct.price)}
                            onChange={(e) => onInputChange("price", parseInt(e))}
                            style={{ width: "150px", border: errors.price ? '2px solid var(--red)' : undefined }}
                        />
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
                            <Input
                                type='number'
                                placeholder='Введите длину'
                                value={String(newProduct.width)}
                                onChange={(e) => onInputChange("width", parseInt(e))}
                                style={{ width: "120px", border: errors.width ? '2px solid var(--red)' : undefined }}
                            />
                        </label>

                        <label className={styles.label}>
                            Ширина
                            <Input
                                type='number'
                                placeholder='Ширина'
                                value={String(newProduct.depth)}
                                onChange={(e) => onInputChange("depth", parseInt(e))}
                                style={{ width: "120px", border: errors.depth ? '2px solid var(--red)' : undefined }}
                            />
                        </label>

                        <label className={styles.label}>
                            Высота
                            <Input
                                type='number'
                                placeholder='Высота'
                                value={String(newProduct.height)}
                                onChange={(e) => onInputChange("height", parseInt(e))}
                                style={{ width: "120px", border: errors.height ? '2px solid var(--red)' : undefined }}
                            />
                        </label>
                    </div>

                    <label className={styles.label}>
                        Описание
                        <Textarea style={{ height: "150px" }} value={newProduct.description} placeholder='Описание' onChange={(e) => onInputChange("description", e)} />
                    </label>
                </div>
                <div className={styles.right_container}>
                    <ColorForm colorList={colorList} setColorList={setColorList} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
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
