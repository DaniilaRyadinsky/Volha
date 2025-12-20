import Select from '../../../../../../shared/ui/Select/Select'
import { useState } from 'react'
import type { Country } from '../../../../../../entities/Product/types/ProductTypes'
import { getLabel } from '../../../lib/utils'

import styles from './FormSelect.module.css'
import CountryForm from '../../../../forms/CountryForm'
import { useAdminData } from '../../../../AdminLayout/lib/useAdminData'
import Modal from '../../../../../../shared/ui/Modal/Modal'
import type { IAdminSelect } from '../../../types/types'

const CountryInput = ({ defaultValue, onChange, isErr, setErrors }: IAdminSelect) => {
    const { countries } = useAdminData()
    const [isModal, setIsModal] = useState(false)
    const [value, setValue] = useState(defaultValue)

    const handleChange = (e: string) => {
        setValue(e)
        onChange(e)

        if (e !== '' && isErr) {
            setErrors(undefined)
        }
    }

    return (
        <>
            <label className={styles.label}>
                Страна*
                <Select
                    value={getLabel(countries, value)}
                    title="Страна"
                    options={countries.map((c: Country) => ({ value: c.id, label: c.title }))}
                    onChange={handleChange}
                    lastChild={<div>Добавить страну...</div>}
                    lastOnClick={() => { setIsModal(true) }}
                    style={{ borderColor: isErr ? 'var(--red)' : undefined }}
                />
            </label>

            {isModal && <Modal closeCallback={() => setIsModal(false)}><CountryForm closecallback={() => setIsModal(false)} onChange={(e) => handleChange(e)} /></Modal>}
        </>
    )
}

export default CountryInput

