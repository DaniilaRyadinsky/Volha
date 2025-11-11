import styles from './CategoryList.module.css'
import { useQuery } from '@tanstack/react-query'
import type { Category } from '../../../../entities/Product/types/ProductTypes'
import fetchCategory from '../api/fetchCategory'
import BASE_URL from '../../../../shared/const/base_url'

import editIcon from '../../../../shared/assets/icons/edit.svg'
import deleteIcon from '../../../../shared/assets/icons/delete_forever.svg'
import { ClipLoader } from 'react-spinners'
import { fetchDeleteCategory } from '../api/fetchDeleteCategory'
import { showAlert } from '../../../../shared/ui/customAlert/showAlert'

const CategoryList = () => {
    const { data: categories, isLoading, refetch } = useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: fetchCategory,
    })


    const handleDelete = (id: string) => {
        fetchDeleteCategory(id, () => {
            showAlert('Категория удалена');
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
                <h1 className={styles.title}>Все категории</h1>
            </div>

            <div className={styles.table}>
                <div className={styles.header}>
                    <div className={styles.cell}>Фото</div>
                    <div className={styles.cell}>Название</div>
                    <div className={styles.cell}>URI</div>
                    <div className={styles.cell}>Действия</div>
                </div>

                {categories?.map(category => (
                    <div key={category.id} className={styles.row}>
                        <div className={styles.cell}>
                            <img
                                src={`${BASE_URL}images/${category.img}`}
                                alt={category.title}
                                className={styles.category_image}
                            />
                        </div>
                        <div className={styles.cell}>{category.title}</div>
                        <div className={styles.cell}>{category.uri}</div>
                        <div className={styles.cell}>
                            <div className={styles.actions}>
                                <img 
                                className={styles.action_icon} 
                                src={editIcon} 
                                onClick={() => showAlert("создание")} />
                                <img className={styles.action_icon} src={deleteIcon} onClick={() => handleDelete(category.id)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategoryList

