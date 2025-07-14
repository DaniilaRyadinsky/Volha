import Feedback from '../../features/Feedback/ui/Feedback'
import styles from './Contacts.module.css'

const Contacts = () => {
    return (
        <div className={styles.contacts}>
            <h1 className={styles.title}>Контакты</h1>
            <div className={styles.contacts_container} >
                <div className={styles.left_container}>
                    <h2 className={styles.info_title}>Оставить заявку</h2>
                    <Feedback />
                </div>

                <div className={styles.middle_container}>
                    <div className={styles.info_container}>
                        <h2 className={styles.info_title}>Контактные телефоны</h2>
                        <a href='tel:+79657638434' className={styles.info_link}>+7 (965) 763-84-34</a>
                        <a className={styles.info_link}>+7 (960) 262-35-66 (Telegram, Whatsapp)</a>
                    </div>

                    <div className={styles.info_container}>
                        <h2 className={styles.info_title}>Электронная почта </h2>
                        <a href='tel:+79657638434' className={styles.info_link}>info@garagespace.ru</a>
                    </div>

                    <div className={styles.info_container}>
                        <h2 className={styles.info_title}>Контактные телефоны</h2>
                        <a href='' className={styles.info_link}><p>188653, Ленинградская область,</p>
                            <p>д.Агалатово 178</p></a>
                        <i>
                            <p>Перед приездом просим</p>
                            <p>согласовать время встречи!</p>
                        </i>
                    </div>

                </div>
                <div className={styles.map}>
                    <iframe className={styles.map} src="https://yandex.ru/map-widget/v1/?um=constructor%3A5d2c1720e0c86bf44686601a868c49d82dfe2715381e62f77914f3c3798ac588&amp;source=constructor" width="auto" height="auto" frameBorder="0"/>
                </div>
                
            </div>
        </div>
    )
}

export default Contacts