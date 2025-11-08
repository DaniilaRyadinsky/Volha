import styles from './Input.module.css'

interface IInput {
    type: string,
    value: string,
    placeholder: string,
    onChange: (text: string) => void,
    style?: React.CSSProperties,
}

const Input = ({ value, type, placeholder, onChange, style }: IInput) => {


    return (
        <>
            <input
                className={styles.input}
                placeholder={placeholder}
                type={type}
                value={value}
                style={style}
                min={0}
                onChange={(e) => onChange(e.target.value)} />
        </>
    )
}

export default Input