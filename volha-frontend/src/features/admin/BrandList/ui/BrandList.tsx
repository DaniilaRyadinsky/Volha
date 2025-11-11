import styles from './BrandList.module.css'
import type { Brand } from '../../../../entities/Product/types/ProductTypes'
import editIcon from '../../../../shared/assets/icons/edit.svg'
import deleteIcon from '../../../../shared/assets/icons/delete_forever.svg'
import { ClipLoader } from 'react-spinners'
import { fetchDeleteBrand } from '../api/fetchDeleteBrand'
import { showAlert, showErr } from '../../../../shared/ui/customAlert/showAlert'
import { useAdminData } from '../../AdminLayout/lib/useAdminData'
import { useState } from 'react'
import BrandForm from '../../forms/BrandForm'
import Modal from '../../../../shared/ui/Modal/Modal'
import { Button } from '../../../../shared/ui/Button/Button'

const BrandList = () => {
    const { brands, isLoading, refetchBrands } = useAdminData()
    const [editBrand, setEditBrand] = useState<Brand | undefined>(undefined);
    const [isModal, setIsModal] = useState(false)

    const handleDelete = (id: string) => {
        fetchDeleteBrand(id, () => {
            showAlert('Бренд удален');
            refetchBrands();
        }, (err) => {
            showErr(err);
        })
    }

    if (isLoading) {
        return <div><ClipLoader loading size={50} cssOverride={{ color: 'var(--main)' }} /></div>
    }

    return (
        <div>
            <div className={styles.title_container}>
                <h1 className={styles.title}>Все бренды</h1>
                <Button onClick={() => setIsModal(true)}>Новый бренд</Button>
            </div>

            <div className={styles.table}>
                <div className={styles.header}>
                    <div className={styles.cell}>Название</div>
                    <div className={styles.cell}>Действия</div>
                </div>

                {brands?.map((brand: Brand) => (
                    <div key={brand.id} className={styles.row}>
                        <div className={styles.cell}>{brand.name}</div>
                        <div className={styles.cell}>
                            <div className={styles.actions}>
                                <img
                                    className={styles.action_icon}
                                    src={editIcon}
                                    onClick={() => setEditBrand(brand)} />
                                <img className={styles.action_icon} src={deleteIcon} onClick={() => handleDelete(brand.id)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {editBrand &&
                <Modal closeCallback={() => setEditBrand(undefined)}>
                    <BrandForm data={editBrand} closecallback={() => setEditBrand(undefined)} />
                </Modal>}

            {isModal &&
                <Modal closeCallback={() => setIsModal(false)}>
                    <BrandForm  closecallback={() => setIsModal(false)} />
                </Modal>
            }
        </div>
    )
}

export default BrandList

