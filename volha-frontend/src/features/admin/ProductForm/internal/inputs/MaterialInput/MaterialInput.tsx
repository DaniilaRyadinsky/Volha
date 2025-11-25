import type { Material } from '../../../../../../entities/Product/types/ProductTypes'
import Select from '../../../../../../shared/ui/Select/Select'
import { useAdminData } from '../../../../AdminLayout/lib/useAdminData'
import type { ICustomInput } from '../../../types/types'
import styles from './MaterialInput.module.css'

import close from '../../../../../../shared/assets/icons/close.svg'
import { useState } from 'react'
import MaterialForm from '../../../../forms/MaterialForm'
import Modal from '../../../../../../shared/ui/Modal/Modal'


const MaterialInput = ({ defaultValue, onChange, isErr, setErrors }: ICustomInput) => {
  const { materials } = useAdminData()

  const [isModal, setIsModal] = useState(false)

  const [materialList, setMaterialList] = useState<string[]>(defaultValue as string[])

  const handleAddMaterial = (materialId: string) => {
    if (isErr)
      setErrors(undefined);
    
    if (materialList.includes(materialId)) return;

    const newMaterials = [...materialList, materialId]
    setMaterialList(newMaterials)
    onChange(newMaterials)
  }

  const handleDeleteMaterial = (materialId: string) => {
    const newMaterials = materialList.filter(id => id !== materialId)
    setMaterialList(newMaterials)
    onChange(newMaterials)
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
          lastOnClick={() => { setIsModal(true) }}
          style={{ border: isErr ? '2px solid var(--red)' : undefined }}
        />
      </label>

      <div className={styles.materials_container}>
        {materialList.map(m => {
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

      {isModal && <Modal closeCallback={() => setIsModal(false)}>
        <MaterialForm closecallback={() => setIsModal(false)} onChange={(e) => setMaterialList([...materialList, e])} />
      </Modal>}
    </div>
  )
}

export default MaterialInput