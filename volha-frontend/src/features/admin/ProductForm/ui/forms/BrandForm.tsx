import { useState } from 'react'
import styles from '../ProductForm.module.css'
import type { Brand } from '../../../../../entities/Product/types/ProductTypes'
import Input from '../../../../../shared/ui/Input/Input'
import { Button } from '../../../../../shared/ui/Button/Button'
import type { IForm } from '../../types/types'
import { postBrand } from '../../api/fetchCreate'
import { useAdminData } from '../../../AdminLayout/lib/useAdminData'


const BrandForm = ({ closecallback }: IForm) => {
    const { refetchBrands } = useAdminData()
    const [err, setErr] = useState('')
    const [newBrand, setNewBrand] = useState<Brand>({ id: '', name: '' }
    )

    const handleClick = () => {
        postBrand(
            newBrand,
            () => {
                closecallback();
                refetchBrands();
            },
            (e) => {
                setErr(e)
            }
        )
    }

    return (
        <div className={styles.form}>
            <h2 className={styles.form_title}>Новый бренд</h2>
            {/* <label className={styles.label}>
                Название */}
            <Input type='text' placeholder='Введите название' value={newBrand.name} onChange={(e) => setNewBrand((prev) => ({ ...prev, name: e }))} />
            {/* </label> */}
            {err != '' && <p className={styles.err}>{err}</p>}
            <Button style={{ width: "100%" }} onClick={handleClick} mode='primary'>Сохранить</Button>
        </div>
    )
}

export default BrandForm    