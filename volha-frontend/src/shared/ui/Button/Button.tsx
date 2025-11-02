import React from 'react'
import clsx from 'clsx';
import styles from './Button.module.css'

export type ButtonMode = 'primary' | 'on_primary' | 'primary_container'

interface IButton {
    children: React.ReactNode,
    mode?: ButtonMode,
    onClick: () => void,
    style?: React.CSSProperties
}

export const Button = (props: IButton) => {
    const {
        mode = 'primary',
        children,
        onClick,
        style
    } = props;

    return (
        <button style={style} className={clsx([styles.btn], {
            [styles.primary]: (mode === 'primary'),
            [styles.on_primary]: (mode === 'on_primary'),
            [styles.primary_container]: (mode === 'primary_container')
        })} onClick={onClick}>
            {children}
        </button>
    )
}