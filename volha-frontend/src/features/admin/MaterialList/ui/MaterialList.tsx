import styles from './MaterialList.module.css'
import type { Material } from '../../../../entities/Product/types/ProductTypes'

import editIcon from '../../../../shared/assets/icons/edit.svg'
import deleteIcon from '../../../../shared/assets/icons/delete_forever.svg'
import { ClipLoader } from 'react-spinners'
import { fetchDeleteMaterial } from '../api/fetchDeleteMaterial'
import { showAlert, showErr } from '../../../../shared/ui/customAlert/showAlert'
import { useAdminData } from '../../AdminLayout/lib/useAdminData'
import { useState } from 'react'
import MaterialForm from '../../forms/MaterialForm'
import Modal from '../../../../shared/ui/Modal/Modal'
import { Button } from '../../../../shared/ui/Button/Button'

const MaterialList = () => {
    const {materials, isLoading, refetchMaterials} = useAdminData()
    const [editMaterial, setEditMaterial] = useState<Material | undefined>(undefined);
    const [isModal, setIsModal] = useState(false)


    const handleDelete = (id: string) => {
        fetchDeleteMaterial(id, () => {
            showAlert('Материал удален');
            refetchMaterials();
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
                <h1 className={styles.title}>Все материалы</h1>
                <Button onClick={() => setIsModal(true)}>Новый материал</Button>
            </div>

            <div className={styles.table}>
                <div className={styles.header}>
                    <div className={styles.cell}>Название</div>
                    <div className={styles.cell}>Действия</div>
                </div>

                {materials?.map((material:Material) => (
                    <div key={material.id} className={styles.row}>
                        <div className={styles.cell}>{material.title}</div>
                        <div className={styles.cell}>
                            <div className={styles.actions}>
                                <img 
                                className={styles.action_icon} 
                                src={editIcon} 
                                onClick={() => setEditMaterial(material)} />
                                <img className={styles.action_icon} src={deleteIcon} onClick={() => handleDelete(material.id)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {editMaterial &&
                <Modal closeCallback={() => setEditMaterial(undefined)}>
                    <MaterialForm data={editMaterial} closecallback={() => setEditMaterial(undefined)} />
                </Modal>}

            {isModal &&
                <Modal closeCallback={() => setIsModal(false)}>
                    <MaterialForm closecallback={() => setIsModal(false)} />
                </Modal>
            }
        </div>
    )
}

export default MaterialList

