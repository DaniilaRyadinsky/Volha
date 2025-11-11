import styles from './AdminLayout.module.css'
import logo from '../../../../shared/assets/icons/logo.svg'
import { Outlet, Link } from 'react-router-dom'
import { ScrollToTop } from '../../../../shared/lib/ScrollToTop'
import { AdminDataProvider } from '../../providers/admin-data-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const AdminLayout = () => {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <AdminDataProvider>
                    <ScrollToTop />
                    <div className={styles.admin_topbar}>
                        <img src={logo} />
                        <nav>
                            <ul className={styles.admin_nav}>
                                <li><Link to="/admin/product/all">Товары</Link></li>
                                <li><Link to="/admin/category/all">Категории</Link></li>
                                <li><Link to="/admin/material/all">Материалы</Link></li>
                                <li><Link to="/admin/color/all">Цвета</Link></li>
                                <li><Link to="/admin/brand/all">Бренды</Link></li>
                                <li><Link to="/admin/country/all">Страны</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div className={styles.admin_layout}>
                        <Outlet />
                    </div>
                </AdminDataProvider>
            </QueryClientProvider>
        </>
    )
}

export default AdminLayout