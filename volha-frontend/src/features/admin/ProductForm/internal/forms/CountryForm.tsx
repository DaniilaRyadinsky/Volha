import { useState } from 'react'
import type { IForm } from '../../types/types'
import type { Country } from '../../../../../entities/Product/types/ProductTypes'
import { Button } from '../../../../../shared/ui/Button/Button'
import Input from '../../../../../shared/ui/Input/Input'
import { useAdminData } from '../../../AdminLayout/lib/useAdminData'
import { postCountry } from '../../api/fetchCreate'
import styles from '../../ui/ProductForm.module.css'

const CountryForm = ({ closecallback }: IForm) => {
    const { refetchCountries} = useAdminData()
    const [err, setErr] = useState('')
    const [newCountry, setNewCountry] = useState<Country>({ id: '', title: '' , friendly: "yes"}
    )

    const handleClick = () => {
        postCountry(
            newCountry,
            () => {
                closecallback();
                refetchCountries();
            },
            (e) => {
                setErr(e)
            }
        )
    }

    return (
        <div className={styles.form}>
            <h2 className={styles.form_title}>Новая страна</h2>
            {/* <label className={styles.label}>
                Название */}
            <Input type='text' placeholder='Введите название' value={newCountry.title} onChange={(e) => setNewCountry((prev) => ({ ...prev, title: e }))} />
            {/* </label> */}
            {err != '' && <p className={styles.err}>{err}</p>}
            <Button style={{ width: "100%" }} onClick={handleClick} mode='primary'>Сохранить</Button>
        </div>
    )
}

export default CountryForm