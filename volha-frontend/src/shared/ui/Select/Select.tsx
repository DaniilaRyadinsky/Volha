import styles from './Select.module.css'

type Option = {
    value: string;
    label: string;
}

interface ISelect {
    title: string;
    options: Option[];
    value?: string;
    onChange: (value: string) => void;
}

const Select = ({title, options, value, onChange}: ISelect) => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>{title}</div>
            <div className={styles.options}>
                {options.map((option) => <div className={styles.option} onClick={() => onChange(option.value)}>{option.label}</div>)}
            </div>
        </div>
    )
}

export default Select