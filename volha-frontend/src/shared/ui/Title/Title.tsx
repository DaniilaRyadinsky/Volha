import styles from './Title.module.css'

const Title = ({ children, subtitle }: { children: string, subtitle?:string }) => {
    return (
        <div className={styles.header_container}>
            <h1 className={styles.header}>{children}</h1>
            <p className={styles.subtitle}>{subtitle}</p>
        </div>
    )
}

export default Title