// import { Link } from 'react-router'
import styles from './ProductCard.module.css'
import { Button } from '../../../shared/ui/Button/Button'
import { ColorMarker } from '../../../shared/ui/Color/Color'
import type { Color } from '../types/ProductTypes'
import fallbackImage from '../../../shared/assets/img/666ef3d869c6d.jpg';


interface IProduct {
  id: string,
  title: string,
  price: number,
  colors: Color[],
  width: number,
  height: number,
  depth: number,
  photos: string[]
}

const ProductCard = (product: IProduct) => {
  return (
    // <Link className={styles.main_link} to={`/product/${product.id}`}>
    <li className={styles.card_unit} key={product.id}>
      <img src={fallbackImage} alt={product.title} className={styles.card_img} /> {/*УБРАТЬ ОБЯЗАТЕЛЬНО*/}
      <div className={styles.card_unit_description_container}>
        <h3 className={styles.card_title}>{product.title}</h3>
        <p className={styles.card_dimensions}>{product.width}*{product.depth}*{product.height}мм</p>
        <div className={styles.color_container} >
          {product.colors.map((color) => <ColorMarker key={color.id} name={color.name} hex={color.hex} />)}
        </div>

        <div className={styles.price_container}>
          <p className={styles.card_price}>{product.price}<span className={styles.price_span}>₽</span></p>
          <div className={styles.button_container}>
            <Button mode='on_primary' style={{ width: "100%" }} onClick={() => console.log('click')}>Подробнее</Button>
          </div>

        </div>
      </div>
    </li>
    // </Link>
  )
}

export default ProductCard