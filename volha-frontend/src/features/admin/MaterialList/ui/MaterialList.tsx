import styles from './MaterialList.module.css'
import { useQuery } from '@tanstack/react-query'
import type { Material } from '../../../../entities/Product/types/ProductTypes'
import fetchMaterial from '../api/fetchMaterial'

import editIcon from '../../../../shared/assets/icons/edit.svg'
import deleteIcon from '../../../../shared/assets/icons/delete_forever.svg'
import { ClipLoader } from 'react-spinners'
import { fetchDeleteMaterial } from '../api/fetchDeleteMaterial'
import { showAlert } from '../../../../shared/ui/customAlert/showAlert'

const MaterialList = () => {
    const { data: materials, isLoading, refetch } = useQuery<Material[]>({
        queryKey: ['materials'],
        queryFn: fetchMaterial,
    })


    const handleDelete = (id: string) => {
        fetchDeleteMaterial(id, () => {
            showAlert('Материал удален');
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
                <h1 className={styles.title}>Все материалы</h1>
            </div>

            <div className={styles.table}>
                <div className={styles.header}>
                    <div className={styles.cell}>Название</div>
                    <div className={styles.cell}>Действия</div>
                </div>

                {materials?.map(material => (
                    <div key={material.id} className={styles.row}>
                        <div className={styles.cell}>{material.title}</div>
                        <div className={styles.cell}>
                            <div className={styles.actions}>
                                <img 
                                className={styles.action_icon} 
                                src={editIcon} 
                                onClick={() => showAlert("создание")} />
                                <img className={styles.action_icon} src={deleteIcon} onClick={() => handleDelete(material.id)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MaterialList

