import styles from './Color.module.css'

export interface IColor {
    name: string,
    hex: string,
    children?: React.ReactNode,
    style?: React.CSSProperties
}

export const Color = ({name,hex, children, style}: IColor) => {
    return (
        <div className={styles.color} style={{backgroundColor: hex, ...style}} title={name}>{children}</div>
    )
}

