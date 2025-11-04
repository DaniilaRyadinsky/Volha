import clsx from "clsx";
import { useState } from "react";
import Backdrop from "../../../../../shared/ui/Backdrop/Backdrop";
import type { ISelect } from "../../../../../shared/ui/Select/Select";
import plus from '../../../../../shared/assets/icons/add.svg'
import styles from './AddColor.module.css'

export const AddColor = ({ title, options, value, onChange, lastChild, lastOnClick }: ISelect) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

    const handleOptionClick = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    }


    const handleLastClick = () => {
        setIsOpen(false);
        if (lastOnClick)
            lastOnClick()
    }


    return (
        <>
            <div className={styles.container}>
                <div
                    className={styles.title_container}
                    onClick={handleToggle}
                >
                    <img className={clsx([styles.arrow], {
                        [styles.arrow_active]: isOpen
                    })} src={plus} />
                    <div className={styles.title}
                    >
                        {value === undefined ? title : value}
                    </div>

                </div>

                <div style={{ visibility: isOpen ? "visible" : "hidden" }} className={styles.options}>
                    {options.map((option) =>
                        <div key={option.value}
                            className={styles.option}
                            onClick={() => handleOptionClick(option.value)}>
                            {option.label}
                        </div>)}
                    <div className={styles.option} onClick={handleLastClick}>{lastChild}</div>
                </div>
            </div >
            {isOpen && (
                <Backdrop onClick={() => setIsOpen(false)} />
            )
            }
        </>
    )
}