import styles from './Checkbox.module.css'
import { ColorMarker } from '../Color/Color';
import type { ICheckbox } from './Checkbox';


const ColorCheckbox = ({ text, checked, onClick, hex }: ICheckbox) => {
    if (!hex) return;
    let r = parseInt(hex.substring(1, 3), 16)
    let g = parseInt(hex.substring(3, 5), 16)
    let b = parseInt(hex.substring(5), 16)

    const isDark = ((r + g + b) / 3) > 128


    return (
        <div className={styles.checkbox} onClick={onClick}>
            <ColorMarker name={text} hex={hex} style={{ borderColor: checked ? 'var(--main)' : '' }}>
                {checked &&
                    <svg width="18" height="18" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_61_1837)">
                            <path d="M6.75012 12.6275L3.62262 9.5L2.55762 10.5575L6.75012 14.75L15.7501 5.75L14.6926 4.6925L6.75012 12.6275Z" fill={isDark ? 'var(--main)' : '#fff'} />
                        </g>
                    </svg>
                }
            </ColorMarker>
            <p className={styles.text}>{text}</p>
        </div>
    )
}

export default ColorCheckbox