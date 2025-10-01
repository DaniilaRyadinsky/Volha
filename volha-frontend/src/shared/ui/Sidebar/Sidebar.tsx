import styles from './Sidebar.module.css'
import clsx from 'clsx'
interface ISidebar {
    children: React.ReactNode,
    isOpen: boolean,
    closeCallback: () => void
}

const Sidebar = ({ children, isOpen, closeCallback }: ISidebar) => {
    return (
        <>
            <div className={clsx(styles.sidebar, {
                [styles.sidebar_active]: isOpen
            })}>
                {children}
            </div>
            {isOpen && (
                    <div
                        className={styles.backdrop}
                        onClick={closeCallback}
                    />
                )}
        </>
    )
}

export default Sidebar