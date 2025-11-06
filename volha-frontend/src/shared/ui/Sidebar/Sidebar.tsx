import { useEffect } from 'react'
import Backdrop from '../Backdrop/Backdrop'
import styles from './Sidebar.module.css'
import clsx from 'clsx'
interface ISidebar {
    children: React.ReactNode,
    isOpen: boolean,
    closeCallback: () => void,
    isRight?: boolean
}

const Sidebar = ({ children, isOpen, closeCallback, isRight=false }: ISidebar) => {
    useEffect(() => {
        if (isOpen) {
            const originalStyle = window.getComputedStyle(document.body).overflow;
            document.body.style.overflow = 'hidden';

            return () => {
                document.body.style.overflow = originalStyle;
            };
        }
    }, [isOpen]);

    return (
        <>
            <div 
            className={clsx(styles.sidebar, {
                [styles.offset_left]: !isRight,
                [styles.offset_right]: isRight,
                [styles.sidebar_active]: isOpen && !isRight,
                [styles.sidebar_active_right]: isOpen && isRight,
            })}>
                {children}
            </div>
            {isOpen && (
                <Backdrop onClick={closeCallback} mode={"gray"} />
            )}
        </>
    )
}

export default Sidebar