import styles from './AdminLayout.module.css'
import logo from '../../../../shared/assets/icons/logo.svg'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { ScrollToTop } from '../../../../shared/lib/ScrollToTop'
import { AdminDataProvider } from '../../providers/admin-data-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react'

const queryClient = new QueryClient();

const AdminLayout = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!getCookie('admin_pw')) {
            navigate('/admin/auth')
        } 

        
    }, [])



    return (
        <>
            <QueryClientProvider client={queryClient}>
                <AdminDataProvider>
                    <ScrollToTop />
                    <div className={styles.admin_topbar}>
                        <Link to="/"><img src={logo} /></Link>
                        <nav>
                            <ul className={styles.admin_nav}>
                                <li><Link to="/admin/product/all">Товары</Link></li>
                                <li><Link to="/admin/category/all">Категории</Link></li>
                                <li><Link to="/admin/material/all">Материалы</Link></li>
                                <li><Link to="/admin/color/all">Цвета</Link></li>
                                <li><Link to="/admin/brand/all">Бренды</Link></li>
                                <li><Link to="/admin/country/all">Страны</Link></li>
                                <li><Link to="/admin/slider">Слайдер</Link></li>
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

const getCookie = (name: string) => {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith(name + '='))
    ?.split('=')[1];
};

export default AdminLayout
