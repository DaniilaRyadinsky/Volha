import {
  useEffect,
  type WheelEvent as ReactWheelEvent,
  memo,
  useState,
  useCallback
} from 'react'
import { useAdminData } from '../../../../AdminLayout/lib/useAdminData'
import styles from './ColorInput.module.css'
import type { Color } from '../../../../../../entities/Product/types/ProductTypes'
import { AddColor } from './AddColor/Addcolor'
import { ColorMarker } from '../../../../../../shared/ui/Color/Color'
import FileUpload from '../../../../FileUpload/FileUpload'
import AdminImage from '../../AdminImage/AdminImage'
import type { ColorItem, ICustomInput } from '../../../types/types'
import close from '../../../../../../shared/assets/icons/close.svg'
import Modal from '../../../../../../shared/ui/Modal/Modal'
import ColorForm from '../../../../forms/ColorForm'

interface IColorInput extends ICustomInput {
  selectedColor: string | null,
  setSelectedColor: (e: string | null) => void
}

const ColorInput = ({ defaultValue, onChange, isErr, setErrors, selectedColor, setSelectedColor }: IColorInput) => {
  const { colors } = useAdminData() as { colors: Color[] }

  const [colorList, setColorList] = useState<ColorItem[]>(defaultValue as ColorItem[])


  const [isModal, setIsModal] = useState(false)


  useEffect(() => {
    if (colorList.length === 0) {
      if (selectedColor !== null) {
        setSelectedColor(null)
      }
      return
    }

    const exists = colorList.some(c => c.color.id === selectedColor)
    if (!exists) {
      setSelectedColor(colorList[colorList.length - 1].color.id)
    }
  }, [colorList, selectedColor, setSelectedColor])

  const selectedColorImages = colorList.find(c => c.color.id === selectedColor)?.images ?? []

  const handleAddColor = (id: string) => {
    if (isErr)
      setErrors(undefined)

    const colorToAdd = colors.find(color => color.id === id)
    if (!colorToAdd) return

    const alreadyExists = colorList.some(item => item.color.id === id)
    if (alreadyExists) return

    const newValue = [...colorList, { color: colorToAdd, images: [] }];
    setColorList(newValue)
    onChange(newValue)

    setSelectedColor(id)
  }

  const handleSelectColor = (id: string) => {
    setSelectedColor(id)
  }

  const handleDeleteColor = (id: string) => {
    const newValue = colorList.filter(u => u.color.id !== id);
    setColorList(newValue)
    onChange(newValue)
  }

  const handleAddImg = (filename: string) => {
    if (!filename || !selectedColor) return

    const newValue = colorList.map(item => {
      if (item.color.id !== selectedColor) return item
      if (item.images.includes(filename)) return item
      return { ...item, images: [...item.images, filename] }
    })

    setColorList(newValue)
    onChange(newValue)
  }

  const handleDeleteImg = (filename: string) => {
    const newValue = colorList.map(item =>
      item.color.id === selectedColor
        ? {
          ...item,
          images: item.images.filter(img => img !== filename)
        }
        : item
    )

    setColorList(newValue)
    onChange(newValue)
  }

  const handleImageListWheel = useCallback(
    (event: ReactWheelEvent<HTMLDivElement>) => {
      const container = event.currentTarget
      const canScrollHorizontally = container.scrollWidth > container.clientWidth

      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY

      if (!canScrollHorizontally || delta === 0) return

      event.preventDefault()
      event.stopPropagation()
      container.scrollLeft += delta
    },
    []
  )

  return (
    <>
      <div className={styles.color_form} style={{ border: isErr ? '2px solid var(--red)' : undefined }}>
        <h3 className={styles.color_form_title}>Цвета*</h3>

        <div className={styles.color_top}>
          <div className={styles.color_list}>
            {colorList.map(c => (
              <ColorItem
                key={c.color.id}
                color={c.color}
                isSelected={selectedColor === c.color.id}
                onClick={handleSelectColor}
                onDelete={handleDeleteColor}
              />
            ))}
          </div>

          <AddColor
            title="Добавить цвет"
            options={colors.map((c: Color) => ({ value: c.id, label: c.name }))}
            onChange={handleAddColor}
            lastChild={<div>Добавить цвет...</div>}
            lastOnClick={() => setIsModal(true)}
          />
        </div>

        {selectedColor && (
          <>
            <div className={styles.upload_container}>
              <FileUpload onUpload={handleAddImg} />
            </div>

            <div className={styles.image_list} onWheel={handleImageListWheel}>
              {selectedColorImages.map(img => (
                <AdminImage
                  key={img}
                  src={img}
                  onDelete={handleDeleteImg}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {isModal && <Modal closeCallback={() => setIsModal(false)}><ColorForm closecallback={() => setIsModal(false)} setColorList={setColorList} setSelectedColor={setSelectedColor} /></Modal>}
    </>
  )
}

export default ColorInput

interface IColorItemProps {
  color: Color
  isSelected: boolean
  onClick: (id: string) => void
  onDelete: (id: string) => void
}

const ColorItem = memo(
  ({ color, isSelected, onClick, onDelete }: IColorItemProps) => {
    const handleClick = () => onClick(color.id)

    const handleDelete = (e: React.MouseEvent) => {
      e.stopPropagation()
      onDelete(color.id)
    }

    return (
      <div
        className={styles.color_item}
        style={{ borderColor: isSelected ? 'var(--main)' : 'var(--outline)' }}
        onClick={handleClick}
      >
        <ColorMarker name={color.name} hex={color.hex} />
        {color.name}
        <div className={styles.icon_container}>
          <img
            src={close}
            onClick={handleDelete}
            className={styles.close_icon}
            alt="delete"
          />
        </div>
      </div>
    )
  }
)
