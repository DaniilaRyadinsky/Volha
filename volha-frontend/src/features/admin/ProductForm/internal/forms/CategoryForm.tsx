import styles from '../../ui/ProductForm.module.css'
import type { IForm } from '../../types/types'
import type { Category } from '../../../../../entities/Product/types/ProductTypes'
import { useState } from 'react'
import Input from '../../../../../shared/ui/Input/Input'
import { Button } from '../../../../../shared/ui/Button/Button'
import { postCategory } from '../../api/fetchCreate'
import { useAdminData } from '../../../AdminLayout/lib/useAdminData'
import FileUpload from '../../../FileUpload/FileUpload'
import AdminImage from '../AdminImage/AdminImage'
import CyrillicToTranslit from 'cyrillic-to-translit-js'

const CategoryForm = ({ closecallback }: IForm) => {
  const { refetchCategories } = useAdminData()
  const [err, setErr] = useState('')
  const [newCategory, setNewCategory] = useState<Category>(
    { id: '', img: '', title: '', uri: '' })

  const handleClick = () => {
    setNewCategory((prev) => ({...prev, uri: CyrillicToTranslit().transform(newCategory.title, '-').toLowerCase()}))
   
    postCategory(
      newCategory,
      () => {
        closecallback();
        refetchCategories();
      },
      (e) => {
        setErr(e)
      }
    )
  }

  return (
    <div className={styles.form}>
      <h2 className={styles.form_title}>Новый материал</h2>
      <Input style={{width: "100%"}} type='text' placeholder='Введите название' value={newCategory.title} onChange={(e) => setNewCategory((prev) => ({ ...prev, title: e }))} />
      {err != '' && <p className={styles.err}>{err}</p>}
      {newCategory.img === '' && <FileUpload onUpload={(filename) => setNewCategory((prev) => ({ ...prev, img: filename }))} />}
      {newCategory.img !== '' && <AdminImage src={newCategory.img} onDelete={() => setNewCategory((prev) => ({ ...prev, img: '' }))}/>}
      
      <Button style={{ width: "100%" }} onClick={handleClick} mode='primary'>Сохранить</Button>
    </div>
  )
}

export default CategoryForm
