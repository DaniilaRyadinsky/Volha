import type { Color } from '../../entities/Product/types/ProductTypes';
import { ColorMarker } from '../../shared/ui/Color/Color';
import styles from './ProductColor.module.css'

interface IProductColor {
    colors: Color[];
}

const ProductColor = ({colors}: IProductColor) => {
    return (
        <div className={styles.color_container}>
            <p className={styles.color_title}>Цвет: Серый</p>
            <div className={styles.color_container}>
                {colors.map((color) => <ColorMarker {...color}/>)}
            </div>

        </div>
    )
}

export default ProductColor