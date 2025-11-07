import { useState } from 'react'
import styles from './ProductCardImages.module.css'
import BASE_URL from '../../shared/const/base_url'

interface IProductImages {
  img: string[]
}

const ProductCardImages = ({ img }: IProductImages) => {
  const [activeImage, setActiveImage] = useState(0)
  const [isCursor, setIsCursor] = useState(false)

  const segments = img.length > 5 ? 5 : img.length

  return (
    <div className={styles.container}>
      <img
        src={`${BASE_URL}images/${img[activeImage]}`}
        alt={`Product view ${activeImage + 1}`}
        className={styles.mainImage}
      />
      <div className={styles.triggers}>
        {Array.from({ length: segments }, (_, index) => (
          <div
            key={index}
            className={styles.triggerWrapper}
          >
            <div
              className={styles.trigger}
              onMouseEnter={() => { setActiveImage(index); setIsCursor(true) }}
              onMouseLeave={() => { setActiveImage(0); setIsCursor(false) }}
            />
            <div
              className={styles.indicator}
              style={{
                opacity: activeImage === index && isCursor && segments != 1 ? 1 : 0
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductCardImages