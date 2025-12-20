import Select from '../../../../../../shared/ui/Select/Select'
import { useState } from 'react'
import type { Category } from '../../../../../../entities/Product/types/ProductTypes'
import { getLabel } from '../../../lib/utils'

import styles from './FormSelect.module.css'
import CategoryForm from '../../../../forms/CategoryForm'
import { useAdminData } from '../../../../AdminLayout/lib/useAdminData'
import Modal from '../../../../../../shared/ui/Modal/Modal'
import type { IAdminSelect } from '../../../types/types'


const CategoryInput = ({ defaultValue, onChange, isErr, setErrors }: IAdminSelect) => {
    const { categories } = useAdminData()
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
                Категория*
                <Select
                    value={getLabel(categories, value)}
                    title="Категория"
                    options={categories.map((c: Category) => ({ value: c.id, label: c.title }))}
                    onChange={handleChange}
                    lastChild={<div >Добавить категорию...</div>}
                    lastOnClick={() => { setIsModal(true) }}
                    style={{ borderColor: isErr ? 'var(--red)' : undefined }}
                />
            </label>

            {isModal && <Modal closeCallback={() => setIsModal(false)}><CategoryForm closecallback={() => setIsModal(false)} onChange={(e) => handleChange(e)} /></Modal>}
        </>
    )
}

export default CategoryInput

