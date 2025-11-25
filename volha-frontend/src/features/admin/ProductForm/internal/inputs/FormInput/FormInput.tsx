import { useState } from 'react'
import TextInput from '../../../../../../shared/ui/Input/TextInput'
import styles from './FormInput.module.css'

interface IFormInput {
    type: string,
    placeholder: string,
    defaultValue: string,
    onChange: (e: string) => void,
    isErr: boolean,
    setErrors: (e?:  "empty" | "limit") => void,
    style?: React.CSSProperties,
}
const FormInput = ({type, placeholder, defaultValue, onChange, isErr, setErrors, style}:IFormInput) => {
    const [value, setValue] = useState(defaultValue)

    const handleChange = (e: string) => {
        setValue(e)
        onChange(e)
        if (e !== '' && isErr) {
            setErrors(undefined)
        }
    }

    return (
        <label className={styles.label}>
            {placeholder}*
            <TextInput
                type={type}
                placeholder={`Введите ${placeholder.toLowerCase()}`}
                value={value}
                onChange={handleChange}
                style={{ borderColor: isErr ? 'var(--red)' : undefined, ...style }}
            />
        </label>
    )
}

export default FormInput