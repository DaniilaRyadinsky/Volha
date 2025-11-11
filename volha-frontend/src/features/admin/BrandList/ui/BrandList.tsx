import styles from './BrandList.module.css'
import { useQuery } from '@tanstack/react-query'
import type { Brand } from '../../../../entities/Product/types/ProductTypes'
import fetchBrand from '../api/fetchBrand'

import editIcon from '../../../../shared/assets/icons/edit.svg'
import deleteIcon from '../../../../shared/assets/icons/delete_forever.svg'
import { ClipLoader } from 'react-spinners'
import { fetchDeleteBrand } from '../api/fetchDeleteBrand'
import { showAlert } from '../../../../shared/ui/customAlert/showAlert'

const BrandList = () => {
    const { data: brands, isLoading, refetch } = useQuery<Brand[]>({
        queryKey: ['brands'],
        queryFn: fetchBrand,
    })


    const handleDelete = (id: string) => {
        fetchDeleteBrand(id, () => {
            showAlert('Бренд удален');
            refetch();
        }, (err) => {
            alert(err);
        })
    }

    if (isLoading) {
        return <div><ClipLoader loading size={50} cssOverride={{ color: 'var(--main)' }} /></div>
    }

    return (
        <div>
            <div className={styles.title_container}>
                <h1 className={styles.title}>Все бренды</h1>
            </div>

            <div className={styles.table}>
                <div className={styles.header}>
                    <div className={styles.cell}>Название</div>
                    <div className={styles.cell}>Действия</div>
                </div>

                {brands?.map(brand => (
                    <div key={brand.id} className={styles.row}>
                        <div className={styles.cell}>{brand.name}</div>
                        <div className={styles.cell}>
                            <div className={styles.actions}>
                                <img 
                                className={styles.action_icon} 
                                src={editIcon} 
                                onClick={() => showAlert("создание")} />
                                <img className={styles.action_icon} src={deleteIcon} onClick={() => handleDelete(brand.id)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BrandList

