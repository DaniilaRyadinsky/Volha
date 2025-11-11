import { useEffect, useState } from 'react'
import type { Material } from '../../../entities/Product/types/ProductTypes'
import { Button } from '../../../shared/ui/Button/Button'
import Input from '../../../shared/ui/Input/Input'
import { postMaterial, putMaterial } from '../ProductForm/api/fetchCreate'

import styles from './Forms.module.css'
import { showAlert, showErr } from '../../../shared/ui/customAlert/showAlert'
import type { NewProduct } from '../ProductForm/types/types'
import { useAdminData } from '../AdminLayout/lib/useAdminData'

interface IMaterialForm {
    data?: Material
    closecallback: () => void,
    setNewProduct?: React.Dispatch<React.SetStateAction<NewProduct>>;
}

const MaterialForm = ({ closecallback, data, setNewProduct }: IMaterialForm) => {
    const { refetchMaterials } = useAdminData()
    const [err, setErr] = useState('')
    const [newMaterial, setNewMaterial] = useState<Material>({ id: '', title: '' })

    useEffect(() => {
        if (data) {
            setNewMaterial(data)
        }
    }, [data])

    const handleClick = () => {
        if (newMaterial.title.trim() == "")
            setErr("emptyName")
        else {
            setErr('')
            if (data) {
                // Режим редактирования
                putMaterial(
                    newMaterial,
                    () => {
                        refetchMaterials()
                        closecallback();
                        showAlert("Материал изменен")
                    },
                    (e) => {
                        showErr("Ошибка: " + e)
                    }
                )
            } else {
                // Режим создания
                postMaterial(
                    newMaterial,
                    (id) => {
                        if (id) {
                            refetchMaterials()
                            if (setNewProduct) {
                                setNewProduct(prev => ({ ...prev, materials: [...prev.materials, id] }))
                            }
                        }
                        closecallback();
                        showAlert("Материал добавлен")
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
            <h2 className={styles.form_title}>{data ? 'Редактировать материал' : 'Новый материал'}</h2>
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