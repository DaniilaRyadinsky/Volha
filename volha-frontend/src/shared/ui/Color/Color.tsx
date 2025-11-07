import styles from './Color.module.css'

export interface IColor {
    name: string,
    hex: string,
    children?: React.ReactNode,
    style?: React.CSSProperties,
    onClick?: () => void;
}

export const ColorMarker = ({name,hex, children, style, onClick}: IColor) => {
    return (
        <div 
        className={styles.color} 
        style={{backgroundColor: hex, ...style}} 
        title={name}
        onClick={onClick}
        >{children}</div>
    )
}

