import { useEffect, useState } from 'react'
import type { Country } from '../../../entities/Product/types/ProductTypes'
import { Button } from '../../../shared/ui/Button/Button'
import Input from '../../../shared/ui/Input/Input'
import { postCountry, putCountry } from '../ProductForm/api/fetchCreate'
import { showAlert, showErr } from '../../../shared/ui/customAlert/showAlert'
import type { NewProduct } from '../ProductForm/types/types'
import { useAdminData } from '../AdminLayout/lib/useAdminData'

import styles from './Forms.module.css'

interface ICountryForm {
    data?: Country
    closecallback: () => void,
    setNewProduct?: React.Dispatch<React.SetStateAction<NewProduct>>;
}

const CountryForm = ({ closecallback, data, setNewProduct }: ICountryForm) => {
    const { refetchCountries } = useAdminData()
    
    const [err, setErr] = useState('')
    const [newCountry, setNewCountry] = useState<Country>({ id: '', title: '', friendly: "yes" })

    useEffect(() => {
        if (data) {
            setNewCountry(data)
        }
    }, [data])

    const handleClick = () => {
        if (newCountry.title.trim() == "")
            setErr("emptyName")
        else {
            setErr('')
            if (data) {
                // Режим редактирования
                putCountry(
                    newCountry,
                    () => {
                        refetchCountries()
                        closecallback();
                        showAlert("Страна изменена")
                    },
                    (e) => {
                        showErr("Ошибка: " + e)
                    }
                )
            } else {
                // Режим создания
                postCountry(
                    newCountry,
                    (id) => {
                        if (id) {
                            refetchCountries()
                            if (setNewProduct) {
                                setNewProduct(prev => ({ ...prev, country: id }))
                            }
                        }
                        closecallback();
                        showAlert("Страна добавлена")
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
            <h2 className={styles.form_title}>{data ? 'Редактировать страну' : 'Новая страна'}</h2>
            <Input style={{ width: "100%", borderColor: err == "emptyName" ? "var(--red)": ""}} type='text' placeholder='Введите название' value={newCountry.title} onChange={(e) => setNewCountry((prev) => ({ ...prev, title: e }))} />

            {err == 'emptyName' && <p className={styles.err}>Введите страну</p>}
            <Button style={{ width: "100%" }} onClick={handleClick} mode='primary'>Сохранить</Button>
        </div>
    )
}

export default CountryForm