import { Link } from 'react-router-dom'
import styles from './Topbar.module.css'
import type { Category } from '../../entities/Product/types/ProductTypes'
import logo from '../../shared/assets/icons/logo.svg'
import Search from '../../features/Search/ui/Search'

import menu from '../../shared/assets/icons/menu.svg'
import search from '../../shared/assets/icons/search.svg'
import { useState } from 'react'
import Sidebar from '../../shared/ui/Sidebar/Sidebar'


interface ITopbar {
    categories: Category[]
}

const Topbar = ({ categories }: ITopbar) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className={styles.topbar}>
            <div className={styles.topbar_container}>
                <Link to="/catalog"><img src={logo} className={styles.logo} /></Link>

                <nav >
                    <ul className={styles.navlist}>
                        {categories.slice(0, 4).map((category) =>
                            <Link key={category.id} to={`/catalog/category/${category.uri}`} style={{ textDecoration: "none" }}><li className={styles.navlist_item}>{category.title}</li></Link>)}
                        <Link to="/catalog" style={{ textDecoration: "none" }}><li className={styles.navlist_item}>Все товары</li></Link>
                    </ul>
                </nav>
                <div className={styles.right_container}>
                    <Search />
                </div>
                <div className={styles.right_container_short}>
                    <div className={styles.icons_container} onClick={() => setIsOpen(true)}>
                        <img src={search} className={styles.icons} />
                        <img src={menu} className={styles.icons} />
                    </div>
                    <Sidebar isOpen={isOpen} closeCallback={() => setIsOpen(false)}>
                        <div className={styles.sidebar_navlist}>
                            <Search />
                            {categories.slice(0, 4).map((category) =>
                                <Link key={category.id} to={`/catalog/category/${category.uri}`} style={{ textDecoration: "none" }}><li className={styles.navlist_item}>{category.title}</li></Link>)}
                            <Link to="/catalog" style={{ textDecoration: "none" }}><li className={styles.navlist_item}>Все товары</li></Link>
                        </div>
                    </Sidebar>
                </div>
            </div>

        </div>
    )
}

export default Topbar