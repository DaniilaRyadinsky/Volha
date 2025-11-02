import styles from './Textarea.module.css'

interface IInput {
    value: string,
    placeholder: string,
    onChange: (text: string) => void
    style?: React.CSSProperties,
}

const Textarea = ({ value, placeholder, onChange, style }: IInput) => {
    return (
        <>
            <textarea
                className={styles.textarea}
                placeholder={placeholder}
                value={value}
                style={style}
                onChange={(e) => onChange(e.target.value)} />
        </>
    )
}

export default Textarea