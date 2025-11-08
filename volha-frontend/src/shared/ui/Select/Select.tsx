import { useState } from 'react';
import styles from './Select.module.css'
import clsx from 'clsx';
import arrow from '../../assets/icons/expand_more.svg'
import Backdrop from '../Backdrop/Backdrop';

type Option = {
    value: string;
    label: string;
}

export interface ISelect {
    title: string;
    options: Option[];
    value?: string;
    onChange: (value: string) => void;
    lastChild?: React.ReactNode;
    lastOnClick?: () => void,
    style?: React.CSSProperties
}

const Select = ({ title, options, value, onChange, lastChild, lastOnClick, style }: ISelect) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    const handleLastClick = () => {
        setIsOpen(false);
        if (lastOnClick)
            lastOnClick()
    }


    return (
        <>
            <div className={styles.container} style={style}>
                <div
                    className={styles.title_container}
                    onClick={handleToggle}
                >
                    <div className={styles.title}
                    >
                        {value === undefined ? title : value}
                    </div>
                    <img className={clsx([styles.arrow], {
                        [styles.arrow_active]: isOpen
                    })} src={arrow} />
                </div>

                <div style={{ visibility: isOpen ? "visible" : "hidden" }} className={styles.options_container}>
                    <div className={styles.title_container} onClick={handleToggle}>
                        <div className={styles.title}>{title}</div>
                        <img className={clsx([styles.arrow], {
                            [styles.arrow_active]: isOpen
                        })} src={arrow} />
                    </div>
                    <div className={styles.options}>
                        {options.map((option) =>
                            <div key={option.value}
                                className={styles.option}
                                onClick={() => handleOptionClick(option.value)}>
                                {option.label}
                            </div>)}
                        <div className={styles.option} onClick={handleLastClick}>{lastChild}</div>
                    </div>
                </div>


            </div >
            {isOpen && (
                <Backdrop onClick={() => setIsOpen(false)} />
            )
            }
        </>
    )
}

export default Select