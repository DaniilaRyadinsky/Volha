import { useState } from 'react'
import type { IForm } from '../../types/types'
import type { Material } from '../../../../../entities/Product/types/ProductTypes'
import { Button } from '../../../../../shared/ui/Button/Button'
import Input from '../../../../../shared/ui/Input/Input'
import { useAdminData } from '../../../AdminLayout/lib/useAdminData'
import { postMaterial } from '../../api/fetchCreate'

import styles from '../../ui/ProductForm.module.css'
import { showAlert, showErr } from '../../../../../shared/ui/customAlert/showAlert'
import { useProductForm } from '../../context/useProductForm'

const MaterialForm = ({ closecallback }: IForm) => {
    const { refetchMaterials } = useAdminData()
    const { newProduct, setNewProduct } = useProductForm()
    const [err, setErr] = useState('')
    const [newMaterial, setNewMaterial] = useState<Material>({ id: '', title: '' }
    )

    const handleClick = () => {
        if (newMaterial.title.trim() == "")
            setErr("emptyName")
        else {
            setErr('')
            postMaterial(
                newMaterial,
                (id) => {
                    closecallback();
                    showAlert("Материал добавлен")
                    const newM = [...newProduct.materials, id]
                    setNewProduct(prev => ({ ...prev, materials: newM }))
                    refetchMaterials();
                },
                (e) => {
                    showErr("Ошибка: " + e)
                }
            )
        }
    }

    return (
        <div className={styles.form}>
            <h2 className={styles.form_title}>Новый материал</h2>
            <Input
                style={{ width: "100%", borderColor: err == "emptyName" ? "var(--red)" : "" }}
                type='text'
                placeholder='Введите название'
                value={newMaterial.title}
                onChange={(e) => setNewMaterial((prev) => ({ ...prev, title: e }))}
            />
            {err == 'emptyName' && <p className={styles.err}>Введите название</p>}
            <Button style={{ width: "100%" }} onClick={handleClick} mode='primary'>Сохранить</Button>
        </div>
    )
}

export default MaterialForm