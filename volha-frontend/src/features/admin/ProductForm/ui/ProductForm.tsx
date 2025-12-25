import { useEffect, useRef, useState } from 'react'
import styles from './ProductForm.module.css'
import { validateForm } from '../lib/utils'
import { Button } from '../../../../shared/ui/Button/Button'
import ColorInput from '../internal/inputs/ColorInput/ColorInput'
import MaterialInput from '../internal/inputs/MaterialInput/MaterialInput'
import { useParams } from 'react-router-dom'
import { useProductFormEffects } from '../lib/useProductFormEffects'
import { createDefaultNewProduct } from '../model/defaults'
import { type ColorItem, type NewProduct } from '../types/types'
import FormInput from '../internal/inputs/FormInput/FormInput'
import BrandInput from '../internal/inputs/SelectInputs/BrandInput'
import CategoryInput from '../internal/inputs/SelectInputs/CategoryInput'
import CountryInput from '../internal/inputs/SelectInputs/CountryInput'
import SeemsInput from '../internal/inputs/SeemsInput/SeemsInput'
import DescriptionInput from '../internal/DescriptionInput/DescriptionInput'
import Checkbox from '../../../../shared/ui/Checkbox/Checkbox'


const ProductForm = () => {
    const formRef = useRef<NewProduct>(createDefaultNewProduct())
    const colorListRef = useRef<ColorItem[]>([])

    const [selectedColor, setSelectedColor] = useState<string | null>(null)

    const [errors, setErrors] = useState<Partial<Record<keyof NewProduct, "empty" | "limit">>>({});

    const [shouldPost, setShouldPost] = useState(false);

    const [formKey, setFormKey] = useState(0)
    const [colorListKey, setColorListKey] = useState(0)

    const [is_favorite, setIsFavorite] = useState(false)

    useEffect(() => {
        setIsFavorite(formRef.current.is_favorite)
    }, [formKey])

    const { id } = useParams();

    useProductFormEffects({
        id,
        formRef,
        colorListRef,
        shouldPost,
        setNewProduct: (e) => {
            formRef.current = e
            setFormKey(prev => prev + 1)
        },
        setColorList: (e) => {
            colorListRef.current = e
            setColorListKey(prev => prev + 1)
        },
        setSelectedColor,
        setShouldPost
    })


    const handleSaveClick = () => {
        console.log(formRef.current)
        const isValid = validateForm(formRef.current, colorListRef.current, setErrors);
        if (!isValid) return;
        formRef.current = { ...formRef.current, colors: colorListRef.current.map(item => item.color.id), photos: colorListRef.current[0].images }

        console.log("handlesave")
        setShouldPost(true);
    }

    const handleCheckboxChange = () => {
        const prev = is_favorite
        setIsFavorite(!prev)
        formRef.current.is_favorite = (!prev)
    }

    return (
        <div >
            <div className={styles.title_container}>
                <h1 className={styles.title}>{id ? "Редактирование товара" : "Новый товар"}</h1>
                <Button onClick={() => handleSaveClick()}>Сохранить</Button>
            </div>

            <div className={styles.form_container}>
                <div className={styles.left_container}>
                    <FormInput
                        key={`title-${formKey}`}
                        type='text'
                        placeholder='Название товара'
                        defaultValue={formRef.current.title}
                        onChange={(e) => formRef.current.title = e}
                        isErr={errors.title ? true : false}
                        setErrors={(e) => setErrors(prev => ({ ...prev, title: e }))}
                    />

                    <FormInput
                        key={`article-${formKey}`}
                        type='text'
                        placeholder='Артикул'
                        defaultValue={formRef.current.article}
                        onChange={(e) => formRef.current.article = e}
                        isErr={errors.article ? true : false}
                        setErrors={(e) => setErrors(prev => ({ ...prev, article: e }))}
                    />

                    {errors.article == "limit" && <p className={styles.err}>Длина артикула должна быть 8 символов</p>}

                    <FormInput
                        key={`price-${formKey}`}
                        type='number'
                        placeholder='Цена'
                        defaultValue={String(formRef.current.price)}
                        onChange={(e) => formRef.current.price = Number(e)}
                        isErr={errors.price ? true : false}
                        setErrors={(e) => setErrors(prev => ({ ...prev, price: e }))}
                    />

                    <BrandInput
                        key={`brand-${formKey}`}
                        defaultValue={formRef.current.brand}
                        onChange={(e) => formRef.current.brand = e}
                        isErr={errors.brand ? true : false}
                        setErrors={(e) => setErrors(prev => ({ ...prev, brand: e }))}
                    />

                    <CategoryInput
                        key={`category-${formKey}`}
                        defaultValue={formRef.current.category}
                        onChange={(e) => formRef.current.category = e}
                        isErr={errors.category ? true : false}
                        setErrors={(e) => setErrors(prev => ({ ...prev, category: e }))}
                    />

                    <MaterialInput
                        key={`materials-${formKey}`}
                        defaultValue={formRef.current.materials}
                        onChange={(e) => formRef.current.materials = e as string[]}
                        isErr={errors.materials ? true : false}
                        setErrors={(e) => setErrors(prev => ({ ...prev, materials: e }))}
                    />

                    <CountryInput
                        key={`country-${formKey}`}
                        defaultValue={formRef.current.country}
                        onChange={(e) => formRef.current.country = e}
                        isErr={errors.country ? true : false}
                        setErrors={(e) => setErrors(prev => ({ ...prev, country: e }))}
                    />

                    <div className={styles.width_container}>

                        <FormInput
                            key={`width-${formKey}`}
                            type='number'
                            placeholder='Длина'
                            defaultValue={String(formRef.current.width)}
                            onChange={(e) => formRef.current.width = parseInt(e)}
                            isErr={errors.width ? true : false}
                            setErrors={(e) => setErrors(prev => ({ ...prev, width: e }))}
                            style={{ width: "120px" }}
                        />

                        <FormInput
                            key={`depth-${formKey}`}
                            type='number'
                            placeholder='Ширина'
                            defaultValue={String(formRef.current.depth)}
                            onChange={(e) => formRef.current.depth = parseInt(e)}
                            isErr={errors.depth ? true : false}
                            setErrors={(e) => setErrors(prev => ({ ...prev, depth: e }))}
                            style={{ width: "120px" }}
                        />

                        <FormInput
                            key={`height-${formKey}`}
                            type='number'
                            placeholder='Высота'
                            defaultValue={String(formRef.current.height)}
                            onChange={(e) => formRef.current.height = parseInt(e)}
                            isErr={errors.height ? true : false}
                            setErrors={(e) => setErrors(prev => ({ ...prev, height: e }))}
                            style={{ width: "120px" }}
                        />

                    </div>


                </div>
                <div className={styles.right_container}>
                    <Checkbox
                        key={`favorite-${formKey}`}
                        text='Избранный товар'
                        checked={is_favorite}
                        onClick={() => handleCheckboxChange()} />

                    <ColorInput
                        key={`colors-${colorListKey}`}
                        defaultValue={colorListRef.current}
                        onChange={(e) => colorListRef.current = e as ColorItem[]}
                        isErr={errors.colors ? true : false}
                        setErrors={(e) => setErrors(prev => ({ ...prev, colors: e }))}
                        selectedColor={selectedColor}
                        setSelectedColor={setSelectedColor}
                    />

                    <SeemsInput
                        key={`seems-${formKey}`}
                        defaultValue={formRef.current.seems}
                        onChange={(e) => formRef.current.seems = e as string[]}
                        isErr={false}
                        setErrors={() => { }}
                    />
                </div>

            </div>
            <div className={styles.description_container}>
                <label className={styles.label}>
                    Описание
                </label>

                <DescriptionInput key={`description-${formKey}`} defaultValue={formRef.current.description} onChange={(e) => formRef.current.description = e} />
            </div>
        </div>
    )
}
export default ProductForm;

