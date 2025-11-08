import { useEffect, useRef, useState } from 'react'
import { ColorMarker } from '../Color/Color'
import styles from './ColorHexInput.module.css'

interface IColorHexInput {
    value: string,
    placeholder?: string,
    onChange: (hex: string) => void,
    style?: React.CSSProperties,
}

const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/

const normalizeHex = (hex: string): string => {
    if (!hex) return '#000000'
    // Если значение не начинается с #, добавляем его
    if (!hex.startsWith('#')) {
        hex = '#' + hex
    }
    // Нормализуем короткий формат (#RGB -> #RRGGBB)
    if (hex.length === 4) {
        hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3]
    }
    return hex.toUpperCase()
}

const ColorHexInput = ({ value, placeholder = '#000000', onChange, style }: IColorHexInput) => {
    const colorInputRef = useRef<HTMLInputElement>(null)
    const normalizedValue = normalizeHex(value || '#000000')
    const [displayValue, setDisplayValue] = useState(normalizedValue)

    // Синхронизируем displayValue с value из пропсов
    useEffect(() => {
        const normalized = normalizeHex(value || '#000000')
        setDisplayValue(normalized)
    }, [value])

    const handleColorMarkerClick = () => {
        colorInputRef.current?.click()
    }

    const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const hex = e.target.value.toUpperCase()
        setDisplayValue(hex)
        onChange(hex)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value
        setDisplayValue(inputValue)
        
        // Обновляем родительский компонент только если значение полностью валидно
        const normalized = normalizeHex(inputValue)
        if (hexRegex.test(normalized)) {
            onChange(normalized)
        }
    }

    const handleInputBlur = () => {
        // При потере фокуса нормализуем значение
        const normalized = normalizeHex(displayValue)
        if (hexRegex.test(normalized)) {
            setDisplayValue(normalized)
            onChange(normalized)
        } else {
            // Если невалидно, возвращаем последнее валидное значение из пропсов
            const fallback = normalizeHex(value || '#000000')
            setDisplayValue(fallback)
        }
    }

    // Используем нормализованное значение для color picker
    const normalizedDisplay = normalizeHex(displayValue)
    const colorValue = hexRegex.test(normalizedDisplay) 
        ? normalizedDisplay 
        : normalizedValue

    return (
        <div className={styles.colorHexInput} style={style}>
            <ColorMarker
                name="Выбрать цвет"
                hex={colorValue}
                onClick={handleColorMarkerClick}
                style={{ flexShrink: 0 }}
            />
            <input
                className={styles.input}
                type="text"
                placeholder={placeholder}
                value={displayValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
            />
            <input
                ref={colorInputRef}
                type="color"
                value={colorValue}
                onChange={handleColorPickerChange}
                className={styles.hiddenColorInput}
            />
        </div>
    )
}

export default ColorHexInput

