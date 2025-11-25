import styles from './TextInput.module.css'

interface IInput {
    type: string,
    value: string,
    placeholder: string,
    onChange: (text: string) => void,
    style?: React.CSSProperties,
}

const TextInput = ({ value, type, placeholder, onChange, style }: IInput) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value
        onChange(v)
    }

    return (
        <>
            <input
                className={styles.input}
                placeholder={placeholder}
                type={type}
                value={value}
                style={style}
                min={0}
                onChange={handleChange} />
        </>
    )
}

export default TextInput