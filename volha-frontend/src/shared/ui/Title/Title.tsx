import styles from './Title.module.css'

const Title = ({ children }: { children: string }) => {
    return (
        <h1 className={styles.header}>{children}</h1>
    )
}

export default Title