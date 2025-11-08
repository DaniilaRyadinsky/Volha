import { Link } from 'react-router-dom'
import NewsSubscr from '../../features/NewsSubscr/NewsSubscr'
import styles from './Footer.module.css'
import type { Category } from '../../entities/Product/types/ProductTypes'

interface IFooter {
    categories: Category[]
}

const Footer = ({ categories }: IFooter) => {

    return (
        <footer className={styles.footer}>
            <div className={styles.footer_container}>
                <nav className={styles.footer_list} style={{ gridArea: "a" }}>
                    <h3 className={styles.footer_title}>О магазине</h3>
                    <ul className={styles.footer_list_items}>
                        <Link to="/about"><li className={styles.footer_item}>О нас</li></Link>
                        <Link to="/contacts"><li className={styles.footer_item}>Контакты</li></Link>
                        <Link to="/contacts"><li className={styles.footer_item}>Оставить заявку</li></Link>
                        <li className={styles.footer_item}>Пользовательское соглашение</li>
                    </ul>
                </nav>
                <nav className={styles.footer_list} style={{ gridArea: "b" }}>
                    <h3 className={styles.footer_title}>Продукция</h3>
                    <ul className={styles.footer_list_items}>
                        {categories.slice(0, 4).map((category) =>
                            <Link key={category.id} to={`/catalog/category/${category.uri}`} style={{ textDecoration: "none" }}><li className={styles.footer_item}>{category.title}</li></Link>)}
                        <Link to="/catalog" style={{ textDecoration: "none" }}><li className={styles.footer_item}>Все товары</li></Link>
                    </ul>
                </nav>
                <div className={styles.footer_list} style={{ gridArea: "c" }}>

                    <div className={styles.fake_title} />

                    <ul className={styles.footer_list_items}>
                        <li className={styles.footer_item}>
                            <p className={styles.footer_item}>188653, Ленинградская область,</p>
                            <p className={styles.footer_item}>д.Агалатово 178</p></li>
                        <li className={styles.footer_item}>+7 (965) 763-84-34</li>
                        <li className={styles.footer_item}>+7 (960) 262-35-66</li>
                        <li className={styles.footer_item}>info@garagespace.ru</li>
                    </ul>
                </div>
                <div className={styles.footer_list} style={{ gridArea: "d" }}>
                    <h3 className={styles.footer_title}>Подписаться на обновления</h3>
                    <NewsSubscr />
                    <div className={styles.icon_container}>
                        <a href=''>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_35_102)">
                                    <path d="M40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40C31.0457 40 40 31.0457 40 20Z" fill="#CECED7" />
                                    <path d="M20.8931 26.4285C14.0599 26.4285 10.1624 21.8704 10 14.2856H13.4229C13.5353 19.8526 16.0587 22.2107 18.0574 22.6969V14.2856H21.2805V19.0869C23.2543 18.8802 25.3277 16.6923 26.0273 14.2856H29.2503C28.7132 17.2515 26.4646 19.4394 24.8656 20.3388C26.4646 21.0681 29.0256 22.9765 30 26.4285H26.4521C25.6901 24.1191 23.7914 22.3323 21.2805 22.0892V26.4285H20.8931Z" fill="var(--main)" />
                                </g>
                            </svg>
                        </a>
                        <a href=''>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_35_93)" filter="url(#filter0_d_35_93)">
                                    <mask id="mask0_35_93" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40">
                                        <path d="M40 0H0V40H40V0Z" fill="white" />
                                    </mask>
                                    <g mask="url(#mask0_35_93)">
                                        <path d="M39.7777 19.9999C39.7777 30.9222 30.9222 39.7777 19.9999 39.7777C9.07767 39.7777 0.222168 30.9222 0.222168 19.9999C0.222168 9.07767 9.07767 0.222168 19.9999 0.222168C30.9222 0.222168 39.7777 9.07767 39.7777 19.9999Z" fill="#CECED7" />
                                        <path opacity="0.05" d="M6.27324 19.472C14.3376 15.818 23.8092 11.8536 25.2678 11.28C28.4837 10.0152 29.8859 11.3077 29.6664 13.3695C29.3964 15.8961 28.1168 23.2485 27.3296 28.5163C26.8688 31.5987 25.1996 32.5431 23.3157 31.3475C21.8868 30.4407 16.974 27.2239 15.6815 26.1242C14.8004 25.3746 14.1863 24.5341 14.8113 23.6777C14.9942 23.4275 15.462 22.9232 15.7221 22.672C17.0264 21.4082 16.8504 21.1363 15.2731 22.2646C15.0852 22.3991 13.9955 23.1892 13.5475 23.4878C12.4498 24.2196 11.4402 24.2592 9.72841 23.6777C8.32815 23.2021 6.98326 22.8352 6.13479 22.4683C4.96296 21.961 4.514 20.269 6.27324 19.472Z" fill="var(--main)" />
                                        <path opacity="0.07" d="M6.98215 19.5955C14.47 16.2481 23.6786 12.4122 25.0254 11.8693C28.2532 10.5659 29.4408 11.3392 29.0937 13.8579C28.7714 16.1897 27.6272 23.4047 26.8252 28.2413C26.3525 31.0883 24.972 31.7153 23.1742 30.5523C22.0479 29.8265 17.5148 26.8401 16.4152 25.9708C15.5647 25.2994 14.6836 24.5241 15.7131 23.4017C16.0572 23.0269 17.9578 21.1925 19.3789 19.8278C20.2026 19.0357 19.9089 18.6451 18.9151 19.3255C17.0926 20.5745 14.1111 22.5512 13.579 22.9102C12.5654 23.5925 11.6131 23.7567 9.95574 23.2356C8.64942 22.8242 7.3876 22.4257 6.72998 22.1695C5.26049 21.5999 5.24072 20.3737 6.98215 19.5955Z" fill="var(--main)" />
                                        <path d="M7.69164 19.7202C14.604 16.6794 23.5485 12.972 24.7836 12.4588C28.0222 11.1159 29.0161 11.373 28.5206 14.3476C28.1646 16.4856 27.1382 23.563 26.3194 27.9685C25.8338 30.5812 24.7441 30.8907 23.0313 29.7604C22.2076 29.2165 18.0493 26.4664 17.1464 25.8207C16.3227 25.2323 15.1865 24.5242 16.6115 23.1299C17.1188 22.6335 20.4424 19.4591 23.0323 16.9889C23.3715 16.6645 22.9453 16.1315 22.5537 16.3916C19.0629 18.7066 14.2233 21.9195 13.6072 22.3378C12.6767 22.9697 11.7827 23.2594 10.1787 22.7986C8.96632 22.4505 7.78262 22.0352 7.3218 21.877C5.54674 21.2678 5.96801 20.4787 7.69164 19.7202Z" fill="var(--main)" />
                                    </g>
                                </g>
                            </svg>

                        </a>
                        <a href=''>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_35_105)">
                                    <mask id="mask0_35_105" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40">
                                        <path d="M40 0H0V40H40V0Z" fill="white" />
                                    </mask>
                                    <g mask="url(#mask0_35_105)">
                                        <path d="M40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40C31.0457 40 40 31.0457 40 20Z" fill="#CECED7" />
                                        <path d="M17.9331 28.9945C18.5811 30.2347 20.4806 31.285 22.4973 31.285C28.5029 31.285 32.8269 25.7599 32.8269 18.8995C32.8269 12.3241 27.4582 7.40234 20.5532 7.40234C11.961 7.40234 7.40234 13.1677 7.40234 19.4526C7.40234 22.3744 8.95542 26.0057 11.4415 27.1621C11.8213 27.3409 12.0225 27.2627 12.1063 26.8995C12.1733 26.6202 12.5085 25.2739 12.6593 24.6426C12.7152 24.4415 12.6649 24.2236 12.5197 24.0727C11.6984 23.0727 11.0392 21.2403 11.0392 19.5308C11.0392 15.1398 14.3632 10.8884 20.028 10.8884C24.9219 10.8884 28.3465 14.218 28.3465 18.9889C28.3465 24.3744 25.6258 28.1063 22.0839 28.1063C20.1286 28.1063 18.6649 26.4917 19.1342 24.5085C19.6984 22.1398 20.7822 19.5867 20.7822 17.8772C20.7822 16.3465 19.961 15.0727 18.2627 15.0727C16.2627 15.0727 14.6593 17.1398 14.6593 19.9051C14.6593 21.6705 15.2571 22.8604 15.2571 22.8604C15.2571 22.8604 13.285 31.2012 12.9219 32.7543C12.5085 34.542 12.6984 37.1063 12.8772 38.6705C13.285 38.8269 13.6873 38.9833 14.1063 39.1118C14.9163 37.8102 16.2236 35.5197 16.6873 33.7208C16.9331 32.799 17.9331 28.9945 17.9331 28.9945Z" fill="var(--main)" />
                                    </g>
                                </g>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div className={styles.footer_credits}>©2009 — 2025 Волха. Все права защищены</div>
        </footer>
    )
}

export default Footer