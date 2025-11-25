import { useEffect, useState } from 'react'
import type { Brand } from '../../../entities/Product/types/ProductTypes'
import Input from '../../../shared/ui/Input/TextInput'
import { Button } from '../../../shared/ui/Button/Button'
import { postBrand, putBrand } from '../ProductForm/api/fetchCreate'
import { showAlert, showErr } from '../../../shared/ui/customAlert/showAlert'
import styles from './Forms.module.css'
import { useAdminData } from '../AdminLayout/lib/useAdminData'
import type { IAdminModalForm } from '../ProductForm/types/types'

interface IBrandForm extends IAdminModalForm {
    data?: Brand
}

const BrandForm = ({ closecallback, data, onChange }: IBrandForm) => {
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

    useEffect(() => {
        const handleKeyPress = (event: Event) => {
            const keyEvent = event as unknown as KeyboardEvent
            if (keyEvent.key === 'Enter') {
                event.preventDefault()
                handleClick()
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [newBrand]);


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
                        console.log(id)
                        refetchBrands()
                        if (id) {
                            if (onChange)
                                onChange(id)
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