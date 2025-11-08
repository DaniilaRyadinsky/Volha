import { useState } from 'react'
import type { IForm } from '../../types/types'
import type { Country } from '../../../../../entities/Product/types/ProductTypes'
import { Button } from '../../../../../shared/ui/Button/Button'
import Input from '../../../../../shared/ui/Input/Input'
import { useAdminData } from '../../../AdminLayout/lib/useAdminData'
import { postCountry } from '../../api/fetchCreate'
import styles from '../../ui/ProductForm.module.css'
import { showAlert, showErr } from '../../../../../shared/ui/customAlert/showAlert'
import { useProductForm } from '../../context/useProductForm'

const CountryForm = ({ closecallback }: IForm) => {
    const { refetchCountries } = useAdminData()
    const { setNewProduct } = useProductForm()
    
    const [err, setErr] = useState('')
    const [newCountry, setNewCountry] = useState<Country>({ id: '', title: '', friendly: "yes" }
    )

    const handleClick = () => {
        if (newCountry.title.trim() == "")
            setErr("emptyName")
        else {
            setErr('')
            postCountry(
                newCountry,
                (id) => {
                    closecallback();
                    showAlert("Страна добавлена")
                    setNewProduct(prev => ({ ...prev, country: id }))
                    refetchCountries();
                },
                (e) => {
                    showErr("Ошибка: " + e)
                }
            )
        }
    }

    return (
        <div className={styles.form}>
            <h2 className={styles.form_title}>Новая страна</h2>
            <Input style={{ width: "100%", borderColor: err == "emptyName" ? "var(--red)": ""}} type='text' placeholder='Введите название' value={newCountry.title} onChange={(e) => setNewCountry((prev) => ({ ...prev, title: e }))} />

            {err == 'emptyName' && <p className={styles.err}>Введите страну</p>}
            <Button style={{ width: "100%" }} onClick={handleClick} mode='primary'>Сохранить</Button>
        </div>
    )
}

export default CountryForm