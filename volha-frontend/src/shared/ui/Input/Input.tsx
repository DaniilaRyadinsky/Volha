import styles from './Input.module.css'

interface IInput {
    type: string,
    value: string,
    placeholder: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    style?: React.CSSProperties
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
                onChange={onChange}/>
        </>
    )
}

export default Input