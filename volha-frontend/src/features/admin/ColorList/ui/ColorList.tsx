import styles from './ColorList.module.css'
import type { Color } from '../../../../entities/Product/types/ProductTypes'
import editIcon from '../../../../shared/assets/icons/edit.svg'
import deleteIcon from '../../../../shared/assets/icons/delete_forever.svg'
import { ClipLoader } from 'react-spinners'
import { fetchDeleteColor } from '../api/fetchDeleteColor'
import { showAlert, showErr } from '../../../../shared/ui/customAlert/showAlert'
import { useAdminData } from '../../AdminLayout/lib/useAdminData'
import { useState } from 'react'
import ColorForm from '../../forms/ColorForm'
import Modal from '../../../../shared/ui/Modal/Modal'
import { Button } from '../../../../shared/ui/Button/Button'

const ColorList = () => {
    const { colors, isLoading, refetchColors } = useAdminData()
    const [editColor, setEditColor] = useState<Color | undefined>(undefined);
    const [isModal, setIsModal] = useState(false)

    const handleDelete = (id: string) => {
        fetchDeleteColor(id, () => {
            showAlert('Цвет удален');
            refetchColors();
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
                <h1 className={styles.title}>Все цвета</h1>
                <Button onClick={() => setIsModal(true)}>Новый цвет</Button>
            </div>

            <div className={styles.table}>
                <div className={styles.header}>
                    <div className={styles.cell}>Название</div>
                    <div className={styles.cell}>Цвет</div>
                    <div className={styles.cell}>HEX</div>
                    <div className={styles.cell}>Действия</div>
                </div>

                {colors?.map((color: Color) => (
                    <div key={color.id} className={styles.row}>
                        <div className={styles.cell}>{color.name}</div>
                        <div className={styles.cell}>
                            <div
                                className={styles.color_preview}
                                style={{ backgroundColor: color.hex }}
                            />
                        </div>
                        <div className={styles.cell}>{color.hex}</div>
                        <div className={styles.cell}>
                            <div className={styles.actions}>
                                <img
                                    className={styles.action_icon}
                                    src={editIcon}
                                    onClick={() => setEditColor(color)} />
                                <img className={styles.action_icon} src={deleteIcon} onClick={() => handleDelete(color.id)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {editColor &&
                <Modal closeCallback={() => setEditColor(undefined)}>
                    <ColorForm data={editColor} closecallback={() => setEditColor(undefined)} />
                </Modal>}

            {isModal &&
                <Modal closeCallback={() => setIsModal(false)}>
                    <ColorForm closecallback={() => setIsModal(false)} />
                </Modal>
            }
        </div>
    )
}

export default ColorList

