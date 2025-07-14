import Footer from '../../widgets/footer/Footer'
import { Outlet } from 'react-router'
import Topbar from '../../widgets/topbar/Topbar'
import styles from './Layout.module.css'

const Layout = () => {
    return (
        <>
            {/* <Topbar/> */}

            <main className={styles.layout__content}>
                <Outlet />
            </main>

            <Footer />
        </>
    )
}

export default Layout