import { useState } from 'react';
import styles from './Select.module.css'
import clsx from 'clsx';
import arrow from '../../assets/icons/expand_more.svg'

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

const Select = ({ title, options, value, onChange }: ISelect) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleBackdropClick = () => {
        setIsOpen(false);
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.title_container} onClick={handleToggle}>
                    <div className={styles.title} >{value === undefined ? title : value}</div>
                    <img className={clsx([styles.arrow], {
                        [styles.arrow_active]: isOpen
                    })} src={arrow} />
                </div>

                {isOpen &&
                    <div className={styles.options}>
                        <div className={styles.option_title_container} onClick={handleToggle}>
                            <div className={styles.title} >{value === undefined ? title : value}</div>
                            <div className={styles.fake_arrow}></div>
                        </div>

                        {options.map((option) => <div key={option.value} className={styles.option} onClick={() => handleOptionClick(option.value)}>{option.label}</div>)}
                    </div>

                }
            </div>
            {isOpen && (
                <div
                    className={styles.backdrop}
                    onClick={handleBackdropClick}
                />
            )}
        </>
    )
}

export default Select