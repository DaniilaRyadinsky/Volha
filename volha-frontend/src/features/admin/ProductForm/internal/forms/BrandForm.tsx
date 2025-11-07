import { useState } from 'react'
import styles from '../../ui/ProductForm.module.css'
import type { Brand } from '../../../../../entities/Product/types/ProductTypes'
import Input from '../../../../../shared/ui/Input/Input'
import { Button } from '../../../../../shared/ui/Button/Button'
import type { IForm } from '../../types/types'
import { postBrand } from '../../api/fetchCreate'
import { useAdminData } from '../../../AdminLayout/lib/useAdminData'
import { showAlert, showErr } from '../../../../../shared/ui/customAlert/showAlert'


const BrandForm = ({ closecallback }: IForm) => {
    const { refetchBrands } = useAdminData()
    const [err, setErr] = useState('')
    const [newBrand, setNewBrand] = useState<Brand>({ id: '', name: '' }
    )

    const handleClick = () => {
        if (newBrand.name.trim() == "")
            setErr("emptyName")
        else {
            setErr('')
            postBrand(
                newBrand,
                () => {
                    closecallback();
                    showAlert("Бренд добавлен")
                    refetchBrands();
                },
                (e) => {
                    showErr("Ошибка: " + e)
                }
            )
        }
    }

    return (
        <div className={styles.form}>
            <h2 className={styles.form_title}>Новый бренд</h2>

            <Input
                style={{ width: "100%" , borderColor: err=="emptyName" ? "var(--red)": ""}}
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