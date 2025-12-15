import { useState } from 'react';
import styles from './Select.module.css';
import clsx from 'clsx';
import arrow from '../../assets/icons/expand_more.svg';
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
    lastOnClick?: () => void;
    style?: React.CSSProperties;

    // visual configuration
    variant?: 'default' | 'sort';
    fontSize?: 'sm' | 'md' | 'lg';
    dropdownSide?: 'left' | 'right';
    className?: string;
}

const Select = ({
    title,
    options,
    value,
    onChange,
    lastChild,
    lastOnClick,
    style,
    variant = 'default',
    fontSize = 'md',
    dropdownSide = 'right',
    className,
}: ISelect) => {
    const [isOpen, setIsOpen] = useState(false);

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
            lastOnClick();
    }


    return (
        <>
            <div className={clsx(
                    styles.container,
                    styles[`variant_${variant}`],
                    styles[`font_${fontSize}`],
                    styles[`dropdown_${dropdownSide}`],
                    className,
                )}
                style={style}
            >
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
                    <div
                        className={styles.title_container}
                        onClick={handleToggle}
                    >
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
                            </div>
                        )}
                        {lastChild && (
                            <div className={styles.option} onClick={handleLastClick}>{lastChild}</div>
                        )}
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