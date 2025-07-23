// import { Link } from 'react-router'
import styles from './ProductCard.module.css'
import { Button } from '../../../shared/ui/Button/Button'
import {Color} from '../../../shared/ui/Color/Color'
import type { ColorType } from '../../../shared/types/ColorType'


interface IProduct {
  id: string,
  title: string,
  price: string,
  colors: ColorType[],
  width: number,
  height: number,
  depth: number,
  img: string
}

const ProductCard = (product: IProduct) => {
  return (
    // <Link className={styles.main_link} to={`/tovar/${product.id}`}>
    <li className={styles.card_unit} key={product.id}>
      <img src={product.img} alt={product.title} className={styles.card_img} />
      <div className={styles.card_unit_description_container}>
        <h3 className={styles.card_title}>{product.title}</h3>
        <p className={styles.card_dimensions}>{product.width}*{product.depth}*{product.height}мм</p>
        <div className={styles.color_container} >
          {product.colors.map((color) => <Color key={color.id} name={color.name} hex={color.hex} />)}
        </div>

        <div className={styles.price_container}>
          <p className={styles.card_price}>{product.price} р</p>
          <Button onClick={() => console.log('click')}>Подробнее</Button>
        </div>
      </div>
    </li>
    // </Link>
  )
}

export default ProductCard