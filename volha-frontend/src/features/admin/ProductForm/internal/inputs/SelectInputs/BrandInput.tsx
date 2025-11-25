import Select from '../../../../../../shared/ui/Select/Select'
import { useState } from 'react'
import type { Brand } from '../../../../../../entities/Product/types/ProductTypes'
import { getLabel } from '../../../lib/utils'

import styles from './FormSelect.module.css'
import BrandForm from '../../../../forms/BrandForm'
import { useAdminData } from '../../../../AdminLayout/lib/useAdminData'
import Modal from '../../../../../../shared/ui/Modal/Modal'
import type { IAdminSelect } from '../../../types/types'


const BrandInput = ({ defaultValue, onChange, isErr, setErrors }: IAdminSelect) => {
    const {brands} =  useAdminData()
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
                Бренд*
                <Select
                    value={getLabel(brands, value)}
                    title="Бренд"
                    options={brands.map((b: Brand) => ({ value: b.id, label: b.name }))}
                    onChange={handleChange}
                    lastChild={<div >Добавить бренд...</div>}
                    lastOnClick={() => { setIsModal(true) }}
                    style={{ borderColor: isErr ? 'var(--red)' : undefined }}
                />
            </label>

            {isModal && <Modal closeCallback={() => setIsModal(false)}><BrandForm closecallback={() => setIsModal(false)} onChange={(e)=> setValue(e)}/></Modal>}
        </>
    )
}

export default BrandInput