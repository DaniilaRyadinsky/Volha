import styles from '../../ui/ProductForm.module.css'
import type { IForm } from '../../types/types'
import type { Category } from '../../../../../entities/Product/types/ProductTypes'
import { useEffect, useState } from 'react'
import Input from '../../../../../shared/ui/Input/Input'
import { Button } from '../../../../../shared/ui/Button/Button'
import { postCategory } from '../../api/fetchCreate'
import { useAdminData } from '../../../AdminLayout/lib/useAdminData'
import FileUpload from '../../../FileUpload/FileUpload'
import AdminImage from '../AdminImage/AdminImage'
import CyrillicToTranslit from 'cyrillic-to-translit-js'
import { showAlert, showErr } from '../../../../../shared/ui/customAlert/showAlert'
import { useProductForm } from '../../context/useProductForm'

const CategoryForm = ({ closecallback }: IForm) => {
  const { refetchCategories } = useAdminData()
  const { setNewProduct } = useProductForm()

  const [err, setErr] = useState<"none" | "emptyName" | "emptyImg">('none')
  const [newCategory, setNewCategory] = useState<Category>(
    { id: '', img: '', title: '', uri: '' })

  const [shouldPost, setShouldPost] = useState(false)

  const handleClick = () => {
    const trimmedTitle = newCategory.title.trim()

    if (trimmedTitle === '') {
      setErr("emptyName")
    }

    else if (newCategory.img === '') {
      setErr("emptyImg")
    }
    else {
      setErr('none')
      const uri = CyrillicToTranslit().transform(trimmedTitle, '-').toLowerCase()
      setNewCategory((prev) => ({ ...prev, title: trimmedTitle, uri }))
      setShouldPost(true)
    }
  }

  useEffect(() => {
    if (shouldPost) {
      postCategory(newCategory, 
        (id) => {
        closecallback();
        showAlert("Категория добавлена")
        setNewProduct(prev => ({ ...prev, category: id }))
        refetchCategories();
        setShouldPost(false)
      }, (e) => {
        showErr("Ошибка: " + e)
      })
    }
  }, [shouldPost])

  return (
    <div className={styles.form}>
      <h2 className={styles.form_title}>Новый материал</h2>
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
