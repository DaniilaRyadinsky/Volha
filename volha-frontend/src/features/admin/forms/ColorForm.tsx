import { useEffect, useState } from 'react'
import type { Color } from '../../../entities/Product/types/ProductTypes'
import { Button } from '../../../shared/ui/Button/Button'
import { showAlert, showErr } from '../../../shared/ui/customAlert/showAlert'
import Input from '../../../shared/ui/Input/Input'
import ColorHexInput from '../../../shared/ui/ColorHexInput/ColorHexInput'
import { postColor, putColor } from '../ProductForm/api/fetchCreate'
import { useAdminData } from '../AdminLayout/lib/useAdminData'
import type { ColorItem } from '../ProductForm/types/types'

import styles from './Forms.module.css'

interface IColorForm {
    data?: Color
    closecallback: () => void,
    setColorList?: React.Dispatch<React.SetStateAction<ColorItem[]>>;
    setSelectedColor?: (colorId: string) => void;
}

const ColorForm = ({ closecallback, data, setColorList, setSelectedColor }: IColorForm) => {
    const { refetchColors } = useAdminData()
    const [err, setErr] = useState('')
    const [newColor, setNewColor] = useState<Color>({ id: '', name: '', hex: '#000000' })

    useEffect(() => {
        if (data) {
            setNewColor(data)
        }
    }, [data])

    const handleClick = () => {
        if (newColor.name.trim() == "")
            setErr("emptyName")
        else {
            setErr('')
            if (data) {
                // Режим редактирования
                putColor(
                    newColor,
                    () => {
                        refetchColors()
                        closecallback();
                        showAlert("Цвет изменен")
                    },
                    (e) => {
                        showErr("Ошибка: " + e)
                    }
                )
            } else {
                // Режим создания
                postColor(
                    newColor,
                    (id) => {
                        if (id) {
                            refetchColors()
                            if (setColorList && setSelectedColor) {
                                const createdColor: Color = { ...newColor, id }
                                setColorList((prev) => {
                                    // Проверяем, нет ли уже такого цвета в списке
                                    if (prev.find(item => item.color.id === id)) {
                                        return prev
                                    }
                                    return [...prev, { color: createdColor, images: [] }]
                                })
                                setSelectedColor(id)
                            }
                        }
                        closecallback();
                        showAlert("Цвет добавлен")
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
            <h2 className={styles.form_title}>{data ? 'Редактировать цвет' : 'Новый цвет'}</h2>

            <Input
                style={{ width: "100%" , borderColor: err=="emptyName" ? "var(--red)": ""}}
                type='text'
                placeholder='Введите название'
                value={newColor.name}
                onChange={(e) => setNewColor((prev) => ({ ...prev, name: e }))} />
            {err == 'emptyName' && <p className={styles.err}>Введите название</p>}
            <ColorHexInput
                value={newColor.hex}
                placeholder='#000000'
                onChange={(hex) => setNewColor((prev) => ({ ...prev, hex }))}
                style={{ width: "100%" }}
            />

            <Button style={{ width: "100%" }} onClick={handleClick} mode='primary'>Сохранить</Button>
        </div>
    )
}

export default ColorForm