import styles from './ProductCard.module.css'
import { Button } from '../../../shared/ui/Button/Button'
import { ColorMarker } from '../../../shared/ui/Color/Color'
import type { Color } from '../types/ProductTypes'
import { Link, useNavigate } from 'react-router-dom';

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

// const ProductCard = ({ id, title, price, colors, width, height, depth, photos, isAbsolutePath = false }: IProduct) => {
//   return (
//     <Link
//       className={styles.main_link}
//       to={`${isAbsolutePath ? "/" : ""}product/${id}/${CyrillicToTranslit().transform(title, '-').toLowerCase()}`}>
//       <li className={styles.card_unit} key={id}>

//         <ProductCardImages img={photos} />

//         <div className={styles.card_unit_description_container}>
//           <h3 className={styles.card_title}>{title}</h3>
//           <p className={styles.card_dimensions}>{width}*{depth}*{height}мм</p>
//           <div className={styles.color_container} >
//             {colors.map((color) => <ColorMarker key={color.id} name={color.title} hex={color.hex} />)}
//           </div>

//           <div className={styles.price_container}>
//             <p className={styles.card_price}>{price}<span className={styles.price_span}>₽</span></p>
//             <div className={styles.button_container}>
//               <Button mode='on_primary' style={{ width: "100%" }} onClick={() => console.log('click')}>Подробнее</Button>
//             </div>
//           </div>
//         </div>
//       </li>
//     </Link>
//   )
// }

const ProductCard = ({ id, title, price, colors, width, height, depth, photos, isAbsolutePath = false }: IProduct) => {
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [img, setImg] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleColorClick = (id: string) => {
    const selectColor = colors.find(u => u.id == id)
    if (selectColor)
      setSelectedColor(selectColor)
  }

  useEffect(() => {
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
    // <Link
    //   className={styles.main_link}
    //   to={`${isAbsolutePath ? "/" : ""}product/${id}/${CyrillicToTranslit().transform(title, '-').toLowerCase()}`}>
    <li className={styles.card_unit} key={id} onClick={() => navigareClick()}>

      <ProductCardImages img={img} />

      <div className={styles.card_unit_description_container}>
        <h3 className={styles.card_title} >{title}</h3>

        <div className={styles.price_container}>
          <div className={styles.color_container} >
            {colors.map(c =>
              <ColorMarker
                key={c.id}
                style={{ borderColor: selectedColor.id === c.id ? "var(--main)" : undefined }}
                name={c.title}
                hex={c.hex}
                onClick={() => handleColorClick(c.id)}
              />)}</div>
          <p className={styles.card_price}>{price}<span className={styles.price_span}>₽</span></p>
        </div>
      </div>
    </li>
    // </Link>
  )
}

export default ProductCard