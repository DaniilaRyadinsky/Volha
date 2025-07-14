import { Link } from 'react-router'
import NewsSubscr from '../../features/NewsSubscr/NewsSubscr'
import styles from './Footer.module.css'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer_container}>
                <nav className={styles.footer_list} style={{gridArea: "a"}}>
                    <h3 className={styles.footer_title}>О магазине</h3>
                    <ul className={styles.footer_list_items}>
                        <Link to="/about"><li className={styles.footer_item}>О нас</li></Link>
                        <Link to="/contacts"><li className={styles.footer_item}>Оставить заявку</li></Link>
                        <li className={styles.footer_item}>Пользовательское соглашение</li>
                    </ul>
                </nav>
                <nav className={styles.footer_list} style={{gridArea: "b"}}>
                    <h3 className={styles.footer_title}>Продукция</h3>
                    <ul className={styles.footer_list_items}>
                        <li className={styles.footer_item}>Ящики</li>
                        <li className={styles.footer_item}>Шкафы</li>
                        <li className={styles.footer_item}>Стеллажи</li>
                        <li className={styles.footer_item}>Этажерки</li>
                    </ul>
                </nav>
                <div className={styles.footer_list} style={{gridArea: "c"}}>
                    <h3 className={styles.footer_title}>Контакты</h3>
                    <ul className={styles.footer_list_items}>
                        <li className={styles.footer_item}>
                            <p>188653, Ленинградская область,</p>
                            <p>д.Агалатово 178</p></li>
                        <li className={styles.footer_item}>+7 (965) 763-84-34</li>
                        <li className={styles.footer_item}>+7 (960) 262-35-66</li>
                        <li className={styles.footer_item}>info@garagespace.ru</li>
                    </ul>
                </div>
                <div className={styles.footer_list} style={{gridArea: "d"}}>
                    <h3 className={styles.footer_title}>Подписаться на обновления</h3>
                    <NewsSubscr isColumn={window.innerWidth < 768 ? true : false}/>
                </div>
            </div>
            <div className={styles.footer_credits}>©2009 — 2025 Волха. Все права защищены</div>
        </footer>
    )
}

export default Footer