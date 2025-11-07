import styles from './CustomAlert.module.css'

export const CustomAlert = ({ message }: { message: string }) => {
    return (
        <div className={styles.alert}>
            <p className={styles.alert_text}>{message}</p>
        </div>
    )
}

export const CustomErr = ({message} : {message: string}) => {
    return (
        <div className={styles.err}>
            <p className={styles.err_text}>{message}</p>
        </div>
    )
}

