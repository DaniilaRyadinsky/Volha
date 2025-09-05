import { Link } from 'react-router'
import styles from './Topbar.module.css'
import type { Category } from '../../entities/Product/types/ProductTypes'
import logo from '../../shared/assets/icons/logo.svg'


interface ITopbar {
    categories: Category[]
}

const Topbar = ({ categories }: ITopbar) => {
    return (
        <div className={styles.topbar}>
            <div className={styles.topbar_container}>
                <img src={logo} className={styles.logo} />

                <nav >
                    <ul className={styles.navlist}>
                        {categories.slice(0, 4).map((category) =>
                            <Link key={category.id} to={`/catalog/category/${category.uri}_${category.id}`} style={{ textDecoration: "none" }}><li className={styles.navlist_item}>{category.title}</li></Link>)}
                        <Link to="/catalog" style={{ textDecoration: "none" }}><li className={styles.navlist_item}>Все товары</li></Link>
                    </ul>
                </nav>
                <div>

                </div>
            </div>

        </div>
    )
}

export default Topbar