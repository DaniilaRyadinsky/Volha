import { useEffect } from 'react'
import Backdrop from '../Backdrop/Backdrop'
import styles from './Sidebar.module.css'
import clsx from 'clsx'
interface ISidebar {
    children: React.ReactNode,
    isOpen: boolean,
    closeCallback: () => void
}

const Sidebar = ({ children, isOpen, closeCallback }: ISidebar) => {
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
            <div className={clsx(styles.sidebar, {
                [styles.sidebar_active]: isOpen
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