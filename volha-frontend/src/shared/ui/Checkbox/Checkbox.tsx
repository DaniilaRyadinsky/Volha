import { useState } from 'react';
import styles from './Checkbox.module.css'

export interface ICheckbox {
    text: string,
    hex?: string,
    checked: boolean,
    onClick: () => void
}

const Checkbox = ({ text, checked, onClick }: ICheckbox) => {

    return (
        <div className={styles.checkbox} onClick={onClick}>
            <div className={styles.icon} style={{ backgroundColor: checked ? 'var(--main)' : '#fff' }}>
                {checked &&
                    <svg width="18" height="18" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_61_1837)">
                            <path d="M6.75012 12.6275L3.62262 9.5L2.55762 10.5575L6.75012 14.75L15.7501 5.75L14.6926 4.6925L6.75012 12.6275Z" fill="white" />
                        </g>
                    </svg>
                }
            </div>
            <p className={styles.text}>{text}</p>
        </div>
    )
}

export default Checkbox