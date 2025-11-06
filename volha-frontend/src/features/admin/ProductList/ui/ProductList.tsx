import styles from './ProductList.module.css'
import { useQuery } from '@tanstack/react-query'
import type { Product } from '../../../../entities/Product/types/ProductTypes'
import fetchProducts from '../api/fetchProduct'
import BASE_URL from '../../../../shared/const/base_url'

import editIcon from '../../../../shared/assets/icons/edit.svg'
import deleteIcon from '../../../../shared/assets/icons/delete_forever.svg'
import { ClipLoader } from 'react-spinners'

const ProductList = () => {
    const { data: products, isLoading } = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: fetchProducts,
    })

    if (isLoading) {
        return <div><ClipLoader loading size={50} cssOverride={{ color: 'var(--main)' }} /></div>
    }

    return (
        <div>
            <div className={styles.title_container}>
                <h1 className={styles.title}>Все товары</h1>
            </div>

            <div className={styles.table}>
                <div className={styles.header}>
                    <div className={styles.cell}>Фото</div>
                    <div className={styles.cell}>Категория</div>
                    <div className={styles.cell}>Название</div>
                    <div className={styles.cell}>Артикул</div>
                    <div className={styles.cell}>Бренд</div>
                    <div className={styles.cell}>Цена</div>
                    <div className={styles.cell}>Действия</div>
                </div>
                
                {products?.map(product => (
                    <div key={product.id} className={styles.row}>
                        <div className={styles.cell}>
                            <img 
                                src={`${BASE_URL}images/${product.photos[0]}`} 
                                alt={product.title}
                                className={styles.product_image} 
                            />
                        </div>
                        <div className={styles.cell}>{product.category?.title}</div>
                        <div className={styles.cell}>{product.title}</div>
                        <div className={styles.cell}>{product.article}</div>
                        <div className={styles.cell}>{product.brand?.name}</div>
                        <div className={styles.cell}>{product.price} ₽</div>
                        <div className={styles.cell}>
                            <div className={styles.actions}>
                                <img className={styles.action_icon} src={editIcon}/>
                                <img className={styles.action_icon} src={deleteIcon}/>                               
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductList