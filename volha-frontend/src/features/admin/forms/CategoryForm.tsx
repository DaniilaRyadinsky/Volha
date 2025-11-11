import styles from './Forms.module.css'
import type { Category } from '../../../entities/Product/types/ProductTypes'
import { useEffect, useState } from 'react'
import Input from '../../../shared/ui/Input/Input'
import { Button } from '../../../shared/ui/Button/Button'
import { postCategory, putCategory } from '../ProductForm/api/fetchCreate'
import FileUpload from '../FileUpload/FileUpload'
import AdminImage from '../ProductForm/internal/AdminImage/AdminImage'
import CyrillicToTranslit from 'cyrillic-to-translit-js'
import { showAlert, showErr } from '../../../shared/ui/customAlert/showAlert'
import type { NewProduct } from '../ProductForm/types/types'
import { useAdminData } from '../AdminLayout/lib/useAdminData'

interface ICategoryForm {
    data?: Category
    closecallback: () => void,
    setNewProduct?: React.Dispatch<React.SetStateAction<NewProduct>>;
}

const CategoryForm = ({ closecallback, data, setNewProduct }: ICategoryForm) => {
  const { refetchCategories } = useAdminData()
  const [err, setErr] = useState<"none" | "emptyName" | "emptyImg">('none')
  const [newCategory, setNewCategory] = useState<Category>(
    { id: '', img: '', title: '', uri: '' })

  useEffect(() => {
    if (data) {
      setNewCategory(data)
    }
  }, [data])

  const handleClick = () => {
    const trimmedTitle = newCategory.title.trim()

    if (trimmedTitle === '') {
      setErr("emptyName")
    }
    else if (!data && newCategory.img === '') {
      setErr("emptyImg")
    }
    else {
      setErr('none')
      const uri = CyrillicToTranslit().transform(trimmedTitle, '-').toLowerCase()
      const categoryToSave = { ...newCategory, title: trimmedTitle, uri }
      
      if (data) {
        // Режим редактирования
        putCategory(
          categoryToSave,
          () => {
            refetchCategories()
            closecallback();
            showAlert("Категория изменена")
          },
          (e) => {
            showErr("Ошибка: " + e)
          }
        )
      } else {
        // Режим создания
        postCategory(
          categoryToSave,
          (id) => {
            if (id) {
              refetchCategories()
              if (setNewProduct) {
                setNewProduct(prev => ({ ...prev, category: id }))
              }
            }
            closecallback();
            showAlert("Категория добавлена")
          },
          (e) => {
            showErr("Ошибка: " + e)
          }
        )
      }
    }
  }

  return (
    <div className={styles.form}>
      <h2 className={styles.form_title}>{data ? 'Редактировать категорию' : 'Новая категория'}</h2>
      <Input style={{ width: "100%", borderColor: err == "emptyName" ? "var(--red)" : '' }} type='text' placeholder='Введите название' value={newCategory.title} onChange={(e) => setNewCategory((prev) => ({ ...prev, title: e }))} />
      {err == 'emptyName' && <p className={styles.err}>Введите название</p>}
      {newCategory.img === '' && <FileUpload onUpload={(filename) => setNewCategory((prev) => ({ ...prev, img: filename }))} />}
      {newCategory.img !== '' && <AdminImage src={newCategory.img} onDelete={() => setNewCategory((prev) => ({ ...prev, img: '' }))} />}
      {err == 'emptyImg' && <p className={styles.err}>Выберите фото</p>}
      <Button style={{ width: "100%" }} onClick={handleClick} mode='primary'>Сохранить</Button>
    </div>
  )
}

export default CategoryForm
