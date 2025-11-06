import styles from './AdminLayout.module.css'
import logo from '../../../../shared/assets/icons/logo.svg'
import { Outlet } from 'react-router-dom'
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
                        <p>Здравствуйте, повелитель</p>
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