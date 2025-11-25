import { useEffect, useState } from 'react'

import styles from './SeemsInput.module.css'

import deleteIcon from '../../../../../../shared/assets/icons/delete_forever.svg'
import type { Product } from '../../../../../../entities/Product/types/ProductTypes'
import BASE_URL from '../../../../../../shared/const/base_url'
import AdminSearch from '../../../../AdminSearch/AdminSearch'
import { fetchProduct } from '../../../../../../entities/Product/api/ProductFetch'
import type { ICustomInput } from '../../../types/types'

const SeemsInput = ({defaultValue, onChange}: ICustomInput) => {
   const [value, setValue] = useState<string[]>(defaultValue as string[] || [])
    const [seemsProducts, setSeemsProducts] = useState<(Product | { id: string, error: string })[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (value.length === 0) {
            setSeemsProducts([])
            setLoading(false)
            return
        }

        setLoading(true)
        const results: (Product | { id: string, error: string })[] = new Array(value.length)
        let completedRequests = 0
        const totalRequests = value.length

        value.forEach((seemId, index) => {
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
    }, [value])

    const handleDeleteSeem = (id: string) => {
        const newValue = value.filter(seem => seem !== id)
        setValue(newValue)
        onChange(newValue)
    }

    const handleAddSeem = (id: string) => {
        if (value.includes(id)) return
        const newValue = [...value, id]
        setValue(newValue)
        onChange(newValue)
    }

    return (
        <div className={styles.seems_form}>
            <h3 className={styles.seems_title}>Похожие товары</h3>
            <AdminSearch onClick={handleAddSeem} />
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
                            <p className={styles.cell}>{item.title}</p>
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