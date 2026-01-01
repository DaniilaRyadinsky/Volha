import { ColorMarkerSkeleton } from '../../../shared/ui/Color/ColorSkeleton';
import styles from './ProductCard.module.css'

import Skeleton from 'react-loading-skeleton';



const ProductCardSkeleton = () => {


  return (
    <li className={styles.card_unit}>
      <Skeleton className={styles.skeleton_image} />

      <div className={styles.card_unit_description_container}>
        <Skeleton width="80%" className={styles.skeleton_title} />

        <div className={styles.price_container}>
          <div className={styles.color_container} >
            {Array.from({ length: 3 }).map((_, i) => (
              <ColorMarkerSkeleton />
            ))}
          </div>
          <Skeleton width={80} className={styles.skeleton_title} />
        </div>
      </div>
    </li>
  )
}

export default ProductCardSkeleton