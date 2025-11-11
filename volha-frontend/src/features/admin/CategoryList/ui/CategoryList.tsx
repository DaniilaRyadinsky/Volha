import styles from './CategoryList.module.css'
import type { Category } from '../../../../entities/Product/types/ProductTypes'
import BASE_URL from '../../../../shared/const/base_url'
import editIcon from '../../../../shared/assets/icons/edit.svg'
import deleteIcon from '../../../../shared/assets/icons/delete_forever.svg'
import { ClipLoader } from 'react-spinners'
import { fetchDeleteCategory } from '../api/fetchDeleteCategory'
import { showAlert, showErr } from '../../../../shared/ui/customAlert/showAlert'
import { useAdminData } from '../../AdminLayout/lib/useAdminData'
import { useState } from 'react'
import CategoryForm from '../../forms/CategoryForm'
import Modal from '../../../../shared/ui/Modal/Modal'
import { Button } from '../../../../shared/ui/Button/Button'

const CategoryList = () => {
    const { categories, refetchCategories, isLoading } = useAdminData()
    const [editCategory, setEditCategory] = useState<Category | undefined>(undefined);
    const [isModal, setIsModal] = useState(false)

    const handleDelete = (id: string) => {
        fetchDeleteCategory(id, () => {
            showAlert('Категория удалена');
            refetchCategories();
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
                <h1 className={styles.title}>Все категории</h1>
                <Button onClick={() => setIsModal(true)}>Новая категория</Button>
            </div>

            <div className={styles.table}>
                <div className={styles.header}>
                    <div className={styles.cell}>Фото</div>
                    <div className={styles.cell}>Название</div>
                    <div className={styles.cell}>URI</div>
                    <div className={styles.cell}>Действия</div>
                </div>

                {categories?.map((category: Category) => (
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
                                    onClick={() => setEditCategory(category)} />
                                <img className={styles.action_icon} src={deleteIcon} onClick={() => handleDelete(category.id)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {editCategory &&
                <Modal closeCallback={() => setEditCategory(undefined)}>
                    <CategoryForm data={editCategory} closecallback={() => setEditCategory(undefined)} />
                </Modal>}

            {isModal &&
                <Modal closeCallback={() => setIsModal(false)}>
                    <CategoryForm closecallback={() => setIsModal(false)} />
                </Modal>
            }
        </div>
    )
}

export default CategoryList

