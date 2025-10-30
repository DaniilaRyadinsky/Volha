import { useState } from 'react';
import styles from './SortSelect.module.css'
import clsx from 'clsx';
import arrow from '../../../../shared/assets/icons/expand_more.svg'
import Backdrop from '../../../../shared/ui/Backdrop/Backdrop';

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

                <div style={{ visibility: isOpen ? "visible" : "hidden" }} className={styles.options}>
                    <div className={styles.title_container}
                        onClick={handleToggle}>
                        <div className={styles.title}>{title}</div>
                        <img className={clsx([styles.arrow], {
                            [styles.arrow_active]: isOpen
                        })} src={arrow} />
                    </div>

                    {options.map((option) =>
                        <div key={option.value}
                            className={styles.option}
                            onClick={() => handleOptionClick(option.value)}>
                            {option.label}
                        </div>)}
                </div>

            </div>
            {isOpen && (
                <Backdrop onClick={() => setIsOpen(false)} />
            )}
        </>
    )
}

export default Select