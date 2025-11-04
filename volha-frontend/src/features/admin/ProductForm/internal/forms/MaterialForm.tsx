import  { useState } from 'react'
import type { IForm } from '../../types/types'
import type { Material } from '../../../../../entities/Product/types/ProductTypes'
import { Button } from '../../../../../shared/ui/Button/Button'
import Input from '../../../../../shared/ui/Input/Input'
import { useAdminData } from '../../../AdminLayout/lib/useAdminData'
import { postMaterial } from '../../api/fetchCreate'

import styles from '../../ui/ProductForm.module.css'

const MaterialForm = ({ closecallback }: IForm) => {
  const { refetchMaterials} = useAdminData()
    const [err, setErr] = useState('')
    const [newMaterial, setNewMaterial] = useState<Material>({ id: '', title: ''}
    )

    const handleClick = () => {
        postMaterial(
            newMaterial,
            () => {
                closecallback();
                refetchMaterials();
            },
            (e) => {
                setErr(e)
            }
        )
    }

    return (
        <div className={styles.form}>
            <h2 className={styles.form_title}>Новый материал</h2>
            {/* <label className={styles.label}>
                Название */}
            <Input type='text' placeholder='Введите название' value={newMaterial.title} onChange={(e) => setNewMaterial((prev) => ({ ...prev, title: e }))} />
            {/* </label> */}
            {err != '' && <p className={styles.err}>{err}</p>}
            <Button style={{ width: "100%" }} onClick={handleClick} mode='primary'>Сохранить</Button>
        </div>
    )
}

export default MaterialForm