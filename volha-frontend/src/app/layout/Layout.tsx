import Footer from '../../widgets/footer/Footer'
import { Outlet } from 'react-router-dom'
import Topbar from '../../widgets/topbar/Topbar'
import styles from './Layout.module.css'
import type { Category } from '../../entities/Product/types/ProductTypes'
import { useSuspenseQuery } from '@tanstack/react-query';

import Breadcrumbs from '../../features/Breadcrumbs/Breadcrumbs'
import { ScrollToTop } from '../../shared/lib/ScrollToTop'
import { fetchCategories } from '../../shared/api/fetchTables'





const Layout = () => {
    const { data: categories, error } = useSuspenseQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    });

    if (error) return <div className={styles.filter_container} style={{ color: "red", fontSize: '0.8rem' }}>Ошибка: {error.message}</div>;

    return (
        <>
            <ScrollToTop />
            <Topbar categories={categories} />

            <main className={styles.layout__content}>
                <Breadcrumbs />
                <Outlet />
            </main>

            <Footer categories={categories} />
        </>
    )
}

export default Layout