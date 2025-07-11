import styles from './Contacts.module.css'

const Contacts = () => {
  return (
    <div>
        <h1 className={styles.title}>Контакты</h1>
        <div className={styles.contacts_container} >
            <div></div>
            <div className={styles.middle_container}>
                <div>
                    <h2>Контактные телефоны</h2>
                    <a href='tel:+79657638434'>+7 (965) 763-84-34</a>
                    <a>+7 (960) 262-35-66 (Telegram, Whatsapp)</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Contacts