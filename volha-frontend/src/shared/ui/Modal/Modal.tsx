import { useEffect } from 'react';
import Backdrop from '../Backdrop/Backdrop'
import styles from './Modal.module.css'

interface IModal {
    closeCallback: () => void,
    children: React.ReactNode
}
const Modal = ({ closeCallback, children }: IModal) => {

    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, []);

    return (
        <div className={styles.modal}>

            <div className={styles.modal_window}>
                {children}
            </div>
            <Backdrop onClick={closeCallback} mode='gray' />
        </div>
    )
}

export default Modal