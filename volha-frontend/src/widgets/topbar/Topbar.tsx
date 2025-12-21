import { Link, useNavigate } from 'react-router-dom'
import styles from './Topbar.module.css'
import logo from '../../shared/assets/icons/logo.svg'
import Search from '../../features/Search/ui/Search'

import menu from '../../shared/assets/icons/menu.svg'
import search from '../../shared/assets/icons/search.svg'
import { useState } from 'react'
import Sidebar from '../../shared/ui/Sidebar/Sidebar'
import Select from '../../shared/ui/Select/Select'
import { useCategories } from '../../app/layout/model/useCategories'


const Topbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { categories } = useCategories();
    const navigate = useNavigate()

    return (
        <div className={styles.topbar}>
            <div className={styles.topbar_container}>
                <Link to="/"><img src={logo} className={styles.logo} /></Link>

                <div className={styles.right_container}>
                    <Search />
                </div>
                
                <nav >
                    <ul className={styles.navlist}>
                        {/* {categories.slice(0, 4).map((category) =>
                            <Link key={category.uri} to={`/catalog/category/${category.uri}`} style={{ textDecoration: "none" }}><li className={styles.navlist_item}>{category.title}</li></Link>)} */}
                        <Select
                            variant="sort"
                            fontSize="lg"
                            dropdownSide="left"
                            title="Каталог"
                            options={[...categories.map((category) => ({ label: category.title, value: `/catalog/category/${category.uri}` })), { label: "Все товары", value: "/catalog" }]}
                            onChange={(e) => navigate(e)} />
                        {/* <Link to="/articles" style={{ textDecoration: "none" }}><li className={styles.navlist_item}>Статьи</li></Link>
                        <Link to="/progects" style={{ textDecoration: "none" }}><li className={styles.navlist_item}>Проекты</li></Link>
                        <Link to="/news" style={{ textDecoration: "none" }}><li className={styles.navlist_item}>Новости</li></Link> */}
                        <Link to="/about" style={{ textDecoration: "none" }}><li className={styles.navlist_item}>О нас</li></Link>
                        <Link to="/contacts" style={{ textDecoration: "none" }}><li className={styles.navlist_item}>Контакты</li></Link>
                    </ul>
                </nav>

                <div className={styles.right_container_short}>
                    <div className={styles.icons_container} onClick={() => setIsOpen(true)}>
                        <img src={search} className={styles.search} />
                        <img src={menu} className={styles.icons} />
                    </div>
                    <Sidebar isOpen={isOpen} closeCallback={() => setIsOpen(false)} isRight={true}>
                        <div className={styles.sidebar_navlist}>
                            <Search />
                            {categories.map((category) =>
                                <Link onClick={() => setIsOpen(false)} key={category.id} to={`/catalog/category/${category.uri}`} style={{ textDecoration: "none" }}><li className={styles.navlist_item}>{category.title}</li></Link>)}
                            <Link to="/catalog" onClick={() => setIsOpen(false)} style={{ textDecoration: "none" }}><li className={styles.navlist_item}>Все товары</li></Link>
                        </div>
                    </Sidebar>
                </div>
            </div>

        </div>
    )
}

export default Topbar