import styles from './AdminPage.module.css'
import logo from '../../shared/assets/icons/logo.svg'
import Input from '../../shared/ui/Input/Input'
import { useState } from 'react'
import type { Brand, Category, Country, Material, Color } from '../../entities/Product/types/ProductTypes'

type ProductData = {
    article: string,
    title: string,
    brand: Brand | undefined,
    category: Category | undefined,
    country: Country | undefined,
    width: number,
    height: number,
    depth: number,
    materials: Material[],
    colors: Color[],
    // photos: string[],
    seems: string[],
    price: number,
    description: string
}

const AdminPage = () => {
    const [newProduct, setNewProduct] = useState<ProductData>({
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
        // photos: string[],
        seems: [],
        price: 0,
        description: ""
    })

    const onInputChange = (key: keyof ProductData, value: string) => {
        setNewProduct(prev => ({
            ...prev,
            [key]: value
        }))
    }


    return (
        <div className={styles.container}>
            <div className={styles.admin_topbar}>
                <img src={logo} />
                <p>Здравствуйте, повелитель</p>
            </div>
            <div className={styles.admin_layout}>
                <h1>Добавить товар</h1>
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
                        Длина
                        <Input type='number' placeholder='Введите длину' value={String(newProduct.width)} onChange={(e) => onInputChange("width", e.target.value)} />
                    </label>

                    <label className={styles.label}>
                        Ширина
                        <Input type='number' placeholder='Ширина' value={String(newProduct.depth)} onChange={(e) => onInputChange("depth", e.target.value)} />
                    </label>


                    <label className={styles.label}>
                        Высота
                        <Input type='number' placeholder='Высота' value={String(newProduct.height)} onChange={(e) => onInputChange("height", e.target.value)} />
                    </label>
                </div>

            </div>
        </div>

    )
}

export default AdminPage