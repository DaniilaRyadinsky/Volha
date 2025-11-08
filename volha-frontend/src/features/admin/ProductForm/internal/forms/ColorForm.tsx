import{ useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import type { Color } from '../../../../../entities/Product/types/ProductTypes'
import { Button } from '../../../../../shared/ui/Button/Button'
import { showAlert, showErr } from '../../../../../shared/ui/customAlert/showAlert'
import Input from '../../../../../shared/ui/Input/Input'
import ColorHexInput from '../../../../../shared/ui/ColorHexInput/ColorHexInput'
import { postColor } from '../../api/fetchCreate'
import type { IForm } from '../../types/types'
import { useProductForm } from '../../context/useProductForm'

import styles from '../../ui/ProductForm.module.css'

const ColorForm = ({ closecallback }: IForm) => {
    const queryClient = useQueryClient()
    const { setColorList, setSelectedColor } = useProductForm()
    const [err, setErr] = useState('')
    const [newColor, setNewColor] = useState<Color>({ id: '', name: '', hex: '#000000' }
    )

    const handleClick = () => {
        if (newColor.name.trim() == "")
            setErr("emptyName")
        else {
            setErr('')
            postColor(
                newColor,
                (id) => {
                    if (id) {
                        // Оптимистично обновляем кэш, добавляя новый цвет
                        const createdColor: Color = { ...newColor, id }
                        queryClient.setQueryData<Color[]>(['admin', 'colors'], (oldColors = []) => {
                            // Проверяем, нет ли уже такого цвета (на случай дублей)
                            if (oldColors.find(c => c.id === id)) {
                                return oldColors
                            }
                            return [...oldColors, createdColor]
                        })
                        
                        // Добавляем цвет в colorList
                        setColorList((prev) => {
                            // Проверяем, нет ли уже такого цвета в списке
                            if (prev.find(item => item.color.id === id)) {
                                return prev
                            }
                            return [...prev, { color: createdColor, images: [] }]
                        })
                        setSelectedColor(id)
                    }
                    // Инвалидируем кэш для гарантированного обновления с сервера
                    queryClient.invalidateQueries({ queryKey: ['admin', 'colors'] })
                    closecallback();
                    showAlert("Цвет добавлен")
                },
                (e) => {
                    showErr("Ошибка: " + e)
                }
            )
        }
    }

    return (
        <div className={styles.form}>
            <h2 className={styles.form_title}>Новый бренд</h2>

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