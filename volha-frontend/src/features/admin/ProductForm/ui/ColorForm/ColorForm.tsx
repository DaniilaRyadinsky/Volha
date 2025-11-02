import { useState } from 'react'
import { useAdminData } from '../../../AdminLayout/lib/useAdminData'
import styles from './ColorForm.module.css'
import type { Color } from '../../../../../entities/Product/types/ProductTypes'
import { AddColor } from '../AddColor/Addcolor'
import { ColorMarker } from '../../../../../shared/ui/Color/Color'
import FileUpload from '../FileUpload/FileUpload'


const ColorForm = () => {
    const { colors } = useAdminData() as { colors: Color[] }

    const [colorList, setColorList] = useState<Color[]>([])
    const [selectedColor, setSelectedColor] = useState('')

    const handleAddColor = (id: string) => {
        const colorToAdd = colors.find(color => color.id === id)
        if (colorToAdd) {
            if (!colorList.find(color => color.id === id))
                setColorList(prev => [...prev, colorToAdd])
        }
    }

    return (
        <div className={styles.color_form}>
            <h3 className={styles.color_form_title}>Цвета</h3>

            <div className={styles.color_top}>
                <div className={styles.color_list}>
                    {colorList.map((c) => <ColorItem color={c} isSelected={selectedColor === c.id} onClick={id => setSelectedColor(id)} />)}
                </div>
                <AddColor
                    title={"Добавить цвет"}
                    options={colors.map((b: Color) => ({ value: b.id, label: b.name }))}
                    onChange={(e) => handleAddColor(e)}
                />
            </div>
            <div>
                <FileUpload/>
            </div>


        </div>
    )
}

export default ColorForm


interface IColorItem {
    color: Color,
    isSelected: boolean,
    onClick: (id: string) => void
}
const ColorItem = ({ color, isSelected, onClick }: IColorItem) => {
    return (
        <div
            className={styles.color_item}
            style={{ borderColor: isSelected ? "var(--main)" : "var(--outline)" }}
            onClick={() => onClick(color.id)}
        >
            {color.name}
            <ColorMarker name={color.name} hex={color.hex} />
        </div>
    )
}






