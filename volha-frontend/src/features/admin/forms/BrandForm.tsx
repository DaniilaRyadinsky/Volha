import { useEffect, useState } from 'react'
import type { Brand } from '../../../entities/Product/types/ProductTypes'
import Input from '../../../shared/ui/Input/Input'
import { Button } from '../../../shared/ui/Button/Button'
import { postBrand, putBrand } from '../ProductForm/api/fetchCreate'
import { showAlert, showErr } from '../../../shared/ui/customAlert/showAlert'

import styles from './Forms.module.css'
import type { NewProduct } from '../ProductForm/types/types'
import { useAdminData } from '../AdminLayout/lib/useAdminData'

interface IBrandForm {
    data?: Brand
    closecallback: () => void,
    setNewProduct?: React.Dispatch<React.SetStateAction<NewProduct>>;

}

const BrandForm = ({ closecallback, data, setNewProduct }: IBrandForm) => {
    const { refetchBrands } = useAdminData()
    const [err, setErr] = useState('')
    const [newBrand, setNewBrand] = useState<Brand>({
        id: '',
        name: ''
    }
    )

    useEffect(() => {
        if (data)
            setNewBrand(data)
    }, [data])

    const handleClick = () => {
        if (newBrand.name.trim() == "")
            setErr("emptyName")
        else {
            setErr('')
            if (data) {
                putBrand(
                    newBrand,
                    () => {
                        refetchBrands()
                        closecallback();
                        showAlert("Бренд изменен")
                    },
                    (e) => {
                        showErr("Ошибка: " + e)
                    }
                )
            }
            else {
                postBrand(
                    newBrand,
                    (id) => {
                        if (id) {
                            refetchBrands()
                            if (setNewProduct)
                                setNewProduct(prev => ({ ...prev, brand: id }))
                        }

                        closecallback();
                        showAlert("Бренд добавлен")
                    },
                    (e) => {
                        showErr("Ошибка: " + e)
                    }
                )
            }
        }
    }

    return (
        <div className={styles.form}>
            <h2 className={styles.form_title}>{data ? 'Редактировать бренд' : 'Новый бренд'}</h2>

            <Input
                style={{ width: "100%", borderColor: err == "emptyName" ? "var(--red)" : "" }}
                type='text'
                placeholder='Введите название'
                value={newBrand.name}
                onChange={(e) => setNewBrand((prev) => ({ ...prev, name: e }))} />
            {err == 'emptyName' && <p className={styles.err}>Введите название</p>}
            <Button style={{ width: "100%" }} onClick={handleClick} mode='primary'>Сохранить</Button>
        </div>
    )
}

export default BrandForm    