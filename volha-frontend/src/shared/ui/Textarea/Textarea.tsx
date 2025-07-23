import styles from './Textarea.module.css'

interface IInput {
    value: string,
    placeholder: string,
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
    style?: React.CSSProperties,
}

const Input = ({ value, placeholder, onChange, style }: IInput) => {
    return (
        <>
            <textarea
                className={styles.textarea}
                placeholder={placeholder}
                value={value}
                style={style}
                onChange={onChange} />
        </>
    )
}

export default Input