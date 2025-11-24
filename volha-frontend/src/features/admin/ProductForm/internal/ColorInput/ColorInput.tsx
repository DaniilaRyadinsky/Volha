import {
  useEffect,
  type WheelEvent as ReactWheelEvent,
  useCallback,
  useMemo,
  memo
} from 'react'
import { useAdminData } from '../../../AdminLayout/lib/useAdminData'
import styles from './ColorInput.module.css'
import type { Color } from '../../../../../entities/Product/types/ProductTypes'
import { AddColor } from '../AddColor/Addcolor'
import { ColorMarker } from '../../../../../shared/ui/Color/Color'
import FileUpload from '../../../FileUpload/FileUpload'
import AdminImage from '../AdminImage/AdminImage'
import type { ICustomInput } from '../../types/types'
import { useProductForm } from '../../context/useProductForm'
import close from '../../../../../shared/assets/icons/close.svg'

const ColorInput = ({ setModalMode, style }: ICustomInput) => {
  const { colors } = useAdminData() as { colors: Color[] }

  const {
    colorList,
    setColorList,
    selectedColor,
    setSelectedColor,
    setErrors
  } = useProductForm()

  // Автовыбор цвета при изменении списка
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

  const colorOptions = useMemo(
    () => colors.map((c: Color) => ({ value: c.id, label: c.name })),
    [colors]
  )

  const selectedColorImages = useMemo(
    () => colorList.find(c => c.color.id === selectedColor)?.images ?? [],
    [colorList, selectedColor]
  )

  const addToColorList = useCallback(
    (newColor: Color) => {
      setColorList(prev => [...prev, { color: newColor, images: [] }])
    },
    [setColorList]
  )

  const handleAddColor = useCallback(
    (id: string) => {
      setErrors(prev => ({ ...prev, colors: undefined }))

      const colorToAdd = colors.find(color => color.id === id)
      if (!colorToAdd) return

      const alreadyExists = colorList.some(item => item.color.id === id)
      if (alreadyExists) return

      addToColorList(colorToAdd)
      setSelectedColor(id)
    },
    [colors, colorList, addToColorList, setSelectedColor, setErrors]
  )

  const handleSelectColor = useCallback(
    (id: string) => {
      setSelectedColor(id)
    },
    [setSelectedColor]
  )

  const handleDeleteColor = useCallback(
    (id: string) => {
      setColorList(prev => prev.filter(u => u.color.id !== id))
      // selectedColor пересчитает эффект выше
    },
    [setColorList]
  )

  const handleAddImg = useCallback(
    (filename: string) => {
      if (!filename || !selectedColor) return

      setColorList(prev =>
        prev.map(item => {
          if (item.color.id !== selectedColor) return item
          if (item.images.includes(filename)) return item
          return { ...item, images: [...item.images, filename] }
        })
      )
    },
    [selectedColor, setColorList]
  )

  const handleDeleteImg = useCallback(
    (filename: string) => {
      setColorList(prev =>
        prev.map(item =>
          item.color.id === selectedColor
            ? {
                ...item,
                images: item.images.filter(img => img !== filename)
              }
            : item
        )
      )
    },
    [selectedColor, setColorList]
  )

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
    <div className={styles.color_form} style={style}>
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
          options={colorOptions}
          onChange={handleAddColor}
          lastChild={<div>Добавить цвет...</div>}
          lastOnClick={() => setModalMode('color')}
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
