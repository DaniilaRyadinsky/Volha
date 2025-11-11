import styles from './ColorList.module.css'
import { useQuery } from '@tanstack/react-query'
import type { Color } from '../../../../entities/Product/types/ProductTypes'
import fetchColor from '../api/fetchColor'

import editIcon from '../../../../shared/assets/icons/edit.svg'
import deleteIcon from '../../../../shared/assets/icons/delete_forever.svg'
import { ClipLoader } from 'react-spinners'
import { fetchDeleteColor } from '../api/fetchDeleteColor'
import { showAlert } from '../../../../shared/ui/customAlert/showAlert'

const ColorList = () => {
    const { data: colors, isLoading, refetch } = useQuery<Color[]>({
        queryKey: ['colors'],
        queryFn: fetchColor,
    })


    const handleDelete = (id: string) => {
        fetchDeleteColor(id, () => {
            showAlert('Цвет удален');
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
                <h1 className={styles.title}>Все цвета</h1>
            </div>

            <div className={styles.table}>
                <div className={styles.header}>
                    <div className={styles.cell}>Название</div>
                    <div className={styles.cell}>Цвет</div>
                    <div className={styles.cell}>HEX</div>
                    <div className={styles.cell}>Действия</div>
                </div>

                {colors?.map(color => (
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
                                onClick={() => showAlert("создание")} />
                                <img className={styles.action_icon} src={deleteIcon} onClick={() => handleDelete(color.id)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ColorList

