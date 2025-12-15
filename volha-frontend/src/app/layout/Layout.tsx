import Footer from '../../widgets/footer/Footer'
import { Outlet } from 'react-router-dom'
import Topbar from '../../widgets/topbar/Topbar'
import styles from './Layout.module.css'
import { useSuspenseQuery } from '@tanstack/react-query';
import { ScrollToTop } from '../../shared/lib/ScrollToTop'
import { fetchCategories } from '../../shared/api/fetchTables'
import { useCategories } from './model/useCategories'


export const LayoutDataProvider = ({ children }: { children: React.ReactNode; }) => {
    useSuspenseQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    });

    return <>{children}</>;
};


const Layout = () => {
    const {error} = useCategories();

    if (error) return <div className={styles.filter_container} style={{ color: "red", fontSize: '0.8rem' }}>Ошибка: {error.message}</div>;

    return (
        <>
            <ScrollToTop />
            <LayoutDataProvider >
                <Topbar  />

                <Outlet />

                <Footer/>
            </LayoutDataProvider>
        </>
    )
}

export default Layout