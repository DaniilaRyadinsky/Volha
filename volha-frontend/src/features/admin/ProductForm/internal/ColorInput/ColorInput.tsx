import { type WheelEvent as ReactWheelEvent } from 'react'
import { useAdminData } from '../../../AdminLayout/lib/useAdminData'
import styles from './ColorInput.module.css'
import type { Color } from '../../../../../entities/Product/types/ProductTypes'
import { AddColor } from '../AddColor/Addcolor'
import { ColorMarker } from '../../../../../shared/ui/Color/Color'
import FileUpload from '../../../FileUpload/FileUpload'
import AdminImage from '../AdminImage/AdminImage'
import type { ColorItem, ICustomInput } from '../../types/types'
import { useProductForm } from '../../context/useProductForm'
import close from '../../../../../shared/assets/icons/close.svg'


const ColorInput = ({ setModalMode, style }: ICustomInput) => {
    const { colors } = useAdminData() as { colors: Color[] }

    const { colorList, setColorList, selectedColor, setSelectedColor, setErrors } = useProductForm()

    const addToColorlist = (newColor: Color) => {
        setColorList(prev => [...prev, { color: newColor, images: [] }])
    }

    const handleAddColor = (id: string) => {
        setErrors(prev => ({ ...prev, colors: undefined }));

        const colorToAdd = colors.find(color => color.id === id)
        if (colorToAdd) {
            if (!colorList.find(item => item.color.id === id)) {
                addToColorlist(colorToAdd)
                setSelectedColor(id)
            }
        }
    }

    const handleAddImg = (filename: string) => {
        if (!filename) {
            console.error('No filename provided')
            return
        }

        if (!selectedColor) {
            console.error('No color selected')
            return
        }

        setColorList(prev => {
            const updatedList = prev.map(item => {
                if (item.color.id === selectedColor) {
                    // Проверяем, нет ли уже такого изображения
                    if (item.images.includes(filename)) {
                        console.warn(`Image ${filename} already exists for this color`)
                        return item
                    }
                    return { ...item, images: [...item.images, filename] }
                }
                return item
            })

            console.log('Updated color list:', updatedList)
            return updatedList
        })
    }

    const handleDeleteImg = (filename: string) => {
        setColorList(prev => prev.map(item =>
            item.color.id === selectedColor
                ? { ...item, images: item.images.filter(img => img !== filename) }
                : item
        ))
    }


    const handleImageListWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
        const container = event.currentTarget
        const canScrollHorizontally = container.scrollWidth > container.clientWidth

        const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY)
            ? event.deltaX
            : event.deltaY

        if (!canScrollHorizontally || delta === 0) {
            return
        }

        event.preventDefault()
        event.stopPropagation()
        container.scrollLeft += delta
    }

    return (
        <div className={styles.color_form} style={style}>
            <h3 className={styles.color_form_title}>Цвета*</h3>

            <div className={styles.color_top}>
                <div className={styles.color_list}>
                    {colorList.map((c) =>
                        <ColorItem
                            key={c.color.id}
                            color={c.color}
                            isSelected={selectedColor === c.color.id}
                            onClick={id => setSelectedColor(id)}
                        />)}
                </div>
                <AddColor
                    title={"Добавить цвет"}
                    options={colors.map((b: Color) => ({ value: b.id, label: b.name }))}
                    onChange={(e) => handleAddColor(e)}
                    lastChild={<div >Добавить цвет...</div>}
                    lastOnClick={() => setModalMode('color')}
                />
            </div>
            {selectedColor && <>
                <div className={styles.upload_container}>
                    <FileUpload onUpload={handleAddImg} />
                </div>
                <div className={styles.image_list} onWheel={handleImageListWheel}>
                    {colorList
                        .find(u => u.color.id === selectedColor)?.images
                        .map((img) => (
                            <AdminImage
                                key={img}
                                src={img}
                                onDelete={(filename) => handleDeleteImg(filename)}
                            />
                        ))}
                </div>
            </>}
        </div>
    )
}

export default ColorInput


interface IColorItem {
    color: Color,
    isSelected: boolean,
    onClick: (id: string) => void
}
const ColorItem = ({ color, isSelected, onClick }: IColorItem) => {
    const { setColorList } = useProductForm()

    const deteleFromColorlist = (id: string) => {
        setColorList(prev => prev.filter(u => u.color.id != id))
    }

    const handleDeleteColor = (id: string) => {
        deteleFromColorlist(id);
    }

    return (
        <div
            key={color.id}
            className={styles.color_item}
            style={{ borderColor: isSelected ? "var(--main)" : "var(--outline)" }}
            onClick={() => onClick(color.id)}
        >
            <ColorMarker name={color.name} hex={color.hex} />
            {color.name}
            <div className={styles.icon_container} >
              <img src={close} onClick={() => handleDeleteColor(color.id)} className={styles.close_icon}/>
            </div>
        </div>
    )
}






