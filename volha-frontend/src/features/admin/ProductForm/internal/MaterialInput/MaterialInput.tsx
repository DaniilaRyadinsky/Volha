import type { Material } from '../../../../../entities/Product/types/ProductTypes'
import Select from '../../../../../shared/ui/Select/Select'
import { useAdminData } from '../../../AdminLayout/lib/useAdminData'
import { useProductForm } from '../../context/useProductForm'
import type { ICustomInput } from '../../types/types'
import styles from './MaterialInput.module.css'

import close from '../../../../../shared/assets/icons/close.svg'


const MaterialInput = ({ setModalMode, style }: ICustomInput) => {
  const { materials } = useAdminData()
  const { newProduct, setNewProduct, setErrors } = useProductForm()

  const handleAddMaterial = (materialId: string) => {
    setErrors(prev => ({ ...prev, materials: undefined }));
    if (newProduct.materials.includes(materialId)) return;

    const newMaterials = [...newProduct.materials, materialId]
    setNewProduct(prev => ({ ...prev, materials: newMaterials }))
  }

  const handleDeleteMaterial = (materialId: string) => {
    const newMaterials = newProduct.materials.filter(id => id !== materialId)
    setNewProduct(prev => ({ ...prev, materials: newMaterials }))
  }

  return (
    <div className={styles.container} >
      <label className={styles.label}>
        Материалы*
        <Select
          title='Материалы'
          options={materials.map((m: Material) => ({ 
            value: m.id, 
            label: m.title 
          }))}
          onChange={(id) => { handleAddMaterial(id) }}
          lastChild={<div >Добавить материал...</div>}
          lastOnClick={() => { setModalMode("material") }}
          style={style}
        />
      </label>

      <div className={styles.materials_container}>
        {newProduct.materials.map(m => {
          const material: Material = materials.find((u: Material) => u.id === m) as Material
          if (!material) return null
          
          return (<div className={styles.material_item} key={material.id}>
            {material.title}
            <div className={styles.icon_container} >
              <img src={close} onClick={() => handleDeleteMaterial(material.id)} className={styles.close_icon} />
            </div>
          </div>)
        })}

      </div>
    </div>
  )
}

export default MaterialInput