import { useEffect, useState } from 'react'
import { fetchProduct } from '../../../../../entities/Product/api/ProductFetch'
import AdminSearch from '../../../AdminSearch/AdminSearch'
import { useProductForm } from '../../context/useProductForm'
import type { Product } from '../../../../../entities/Product/types/ProductTypes'
import styles from './SeemsInput.module.css'

import BASE_URL from '../../../../../shared/const/base_url'
import deleteIcon from '../../../../../shared/assets/icons/delete_forever.svg'
const SeemsInput = () => {
    const { newProduct, setNewProduct } = useProductForm()
    const [seemsProducts, setSeemsProducts] = useState<(Product | { id: string, error: string })[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (newProduct.seems.length === 0) {
            setSeemsProducts([])
            setLoading(false)
            return
        }

        setLoading(true)
        const results: (Product | { id: string, error: string })[] = new Array(newProduct.seems.length)
        let completedRequests = 0
        const totalRequests = newProduct.seems.length

        newProduct.seems.forEach((seemId, index) => {
            fetchProduct(
                seemId,
                (data) => {
                    results[index] = data
                    completedRequests++
                    if (completedRequests === totalRequests) {
                        setSeemsProducts([...results])
                        setLoading(false)
                    }
                },
                (err) => {
                    results[index] = { id: seemId, error: err }
                    completedRequests++
                    if (completedRequests === totalRequests) {
                        setSeemsProducts([...results])
                        setLoading(false)
                    }
                }
            )
        })
    }, [newProduct.seems])

    const handleDeleteSeem = (id: string) => {
        setNewProduct(prev => ({ ...prev, seems: prev.seems.filter(seem => seem !== id) }))
    }

    return (
        <div className={styles.seems_form}>
            <h3 className={styles.seems_title}>Похожие товары</h3>
            <AdminSearch onClick={(id) => {
                console.log(id)
                setNewProduct(prev => {
                    if (prev.seems.includes(id)) {
                        return prev
                    }
                    return { ...prev, seems: [...prev.seems, id] }
                })
            }} />
            <div className={styles.seems_list}>
                {loading && <p>Загрузка...</p>}
                {!loading && seemsProducts.map((item) => {
                    if ('error' in item) {
                        return (
                            <div key={item.id} className={styles.seem_item}>
                                <p>{item.error}</p>
                            </div>
                        )
                    }
                    return (
                        <div key={item.id} className={styles.seem_item}>
                            <img className={styles.seem_img} src={`${BASE_URL}images/${item.photos[0]}`} alt={item.title} />
                            <h3 className={styles.cell}>{item.title}</h3>
                            <p className={styles.cell}>{item.article}</p>
                            <div className={styles.cell}>
                                <img className={styles.delete_icon} src={deleteIcon} onClick={() => handleDeleteSeem(item.id)} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SeemsInput