// import { Link } from 'react-router'
import styles from './ProductCard.module.css'
import { Button } from '../../../shared/ui/Button/Button'

interface IProduct {
  id: string,
  title: string,
  price: string,
  // colors: Color[],
  width: number,
  height: number,
  depth: number,
  img: string
}

const ProductCard = (product: IProduct) => {
  return (
    // <Link className={styles.main_link} to={`/tovar/${product.id}`}>
      <li className={styles.card_unit}>
        <img src={product.img} alt={product.title} className={styles.card_img} />
        <div className={styles.card_unit_description_container}>
          <h3 className={styles.card_title}>{product.title}</h3>
          <p className={styles.card_dimensions}>{product.width}*{product.depth}*{product.height}мм</p>
          {/* {product.colors.map((color) =>)} */}

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