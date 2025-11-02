// import { Link } from 'react-router-dom'
import styles from './ProductCard.module.css'
import { Button } from '../../../shared/ui/Button/Button'
import { ColorMarker } from '../../../shared/ui/Color/Color'
import type { Color } from '../types/ProductTypes'
import fallbackImage from '../../../shared/assets/img/666ef3d869c6d.jpg';
import { Link } from 'react-router-dom';

import CyrillicToTranslit from 'cyrillic-to-translit-js';
import BASE_URL from '../../../shared/const/base_url';


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

// export declare class CyrillicToTranslit {
//   reverse: (input: string, spaceReplacement?: string) => string;
//   transform: (input: string, spaceReplacement?: string) => string;
//   constructor(config?: { preset: 'ru' | 'uk' | 'mn' });
// }

const ProductCard = ({id, title, price, colors, width, height, depth, photos, isAbsolutePath=false}: IProduct) => {
  return (
    <Link 
    className={styles.main_link} 
    to={`${isAbsolutePath ? "/" : ""}product/${id}/${CyrillicToTranslit().transform(title, '-').toLowerCase()}`}>
    <li className={styles.card_unit} key={id}>
      <img src={`${BASE_URL}${photos[0]}`} alt={title} className={styles.card_img} /> {/*УБРАТЬ ОБЯЗАТЕЛЬНО*/}
      <div className={styles.card_unit_description_container}>
        <h3 className={styles.card_title}>{title}</h3>
        <p className={styles.card_dimensions}>{width}*{depth}*{height}мм</p>
        <div className={styles.color_container} >
          {colors.map((color) => <ColorMarker key={color.id} name={color.name} hex={color.hex} />)}
        </div>

        <div className={styles.price_container}>
          <p className={styles.card_price}>{price}<span className={styles.price_span}>₽</span></p>
          <div className={styles.button_container}>
            <Button mode='on_primary' style={{ width: "100%" }} onClick={() => console.log('click')}>Подробнее</Button>
          </div>
        </div>
      </div>
    </li>
    </Link>
  )
}

export default ProductCard