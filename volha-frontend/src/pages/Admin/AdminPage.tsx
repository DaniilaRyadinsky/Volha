import styles from './AdminPage.module.css'
import logo from '../../shared/assets/icons/logo.svg'
import { ProductForm } from '../../features/admin/ProductForm/ui/ProductForm'



const AdminPage = () => {
   


    return (
        <div className={styles.container}>
            <div className={styles.admin_topbar}>
                <img src={logo} />
                <p>Здравствуйте, повелитель</p>
            </div>
            <div className={styles.admin_layout}>
                <h1>Добавить товар</h1>
                <div className={styles.admin_content}>
                    <ProductForm/>

                    <div className={styles.photoinput_container}>
                        
                    </div>
                </div>


            </div>
        </div>

    )
}

export default AdminPage