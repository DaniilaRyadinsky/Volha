import styles from './ProductCard.module.css'
import { ColorMarker } from '../../../shared/ui/Color/Color'
import type { Color } from '../types/ProductTypes'
import { useNavigate } from 'react-router-dom';

import CyrillicToTranslit from 'cyrillic-to-translit-js';
import ProductCardImages from '../../../widgets/ProductCardImages/ProductCardImages';
import { useEffect, useState } from 'react';
import { fetchColorImg } from '../api/ProductFetch';

interface IProduct {
  id: string,
  article: string,
  title: string,
  price: number,
  colors: Color[],
  width: number,
  height: number,
  depth: number,
  photos: string[],
  isAbsolutePath?: boolean
}

const ProductCard = ({ id, title, price, colors, isAbsolutePath = false }: IProduct) => {
  const [selectedColor, setSelectedColor] = useState<Color | null>(null)
  const [img, setImg] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleColorClick = (id: string) => {
    const selectColor = colors.find(u => u.id == id)
    if (selectColor)
      setSelectedColor(selectColor)
  }

  useEffect(() => {
    if (!selectedColor && colors.length) {
      setSelectedColor(colors[0]);
    }
  }, [colors, selectedColor]);

  useEffect(() => {
    if (selectedColor)
      fetchColorImg(
        selectedColor.id,
        id,
        (e) => setImg(e),
        (e) => console.error(e)

      )
  }, [selectedColor])

  const navigareClick = () => {
    navigate(`${isAbsolutePath ? "/" : ""}product/${id}/${CyrillicToTranslit().transform(title, '-').toLowerCase()}`)
  }

  return (
    <li className={styles.card_unit} key={id} onClick={() => navigareClick()}>

      <ProductCardImages img={img} />

      <div className={styles.card_unit_description_container}>
        <h3 className={styles.card_title} >{title}</h3>

        <div className={styles.price_container}>
          <div className={styles.color_container} >
            {colors.map(c =>
              <ColorMarker
                key={c.id}
                style={{ borderColor: selectedColor?.id === c.id ? "var(--main)" : undefined }}
                name={c.title}
                hex={c.hex}
                onClick={() => handleColorClick(c.id)}
              />)}</div>
          <p className={styles.card_price}>{price}<span className={styles.price_span}>₽</span></p>
        </div>
      </div>
    </li>
  )
}

export default ProductCard