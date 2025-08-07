import Footer from '../../widgets/footer/Footer'
import { Outlet } from 'react-router'
import Topbar from '../../widgets/topbar/Topbar'
import styles from './Layout.module.css'
import type { Category } from '../../entities/Product/types/ProductTypes'
import { useSuspenseQuery } from '@tanstack/react-query';
import { FetchCategories } from './api/FetchCategories'

const Layout = () => {
    const { data: categories, error } = useSuspenseQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: FetchCategories,
    });

    if (error) return <div className={styles.filter_container} style={{ color: "red", fontSize: '0.8rem' }}>Ошибка: {error.message}</div>;

    return (
        <>
            <Topbar categories={categories} />

            <main className={styles.layout__content}>
                <Outlet />
            </main>

            <Footer categories={categories} />
        </>
    )
}

export default Layout