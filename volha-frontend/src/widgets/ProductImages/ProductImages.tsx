import { useEffect, useState } from 'react';
import styles from './ProductImages.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/swiper-bundle.css';




interface IProductImages {
    images: string[];
    name: string
}

const ProductImages = ({ images, name }: IProductImages) => {
    const [currentImage, setCurrentImage] = useState(images[0]);

    useEffect

    return (
        <div className={styles.container}>
            <div className={styles.miniatures}>
                {images.map((img) => <img src={img} alt={`Фото ${name}`} className={styles.miniature} onClick={() => setCurrentImage(img)} />)}
            </div>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className={styles.image_container}>
                {images.map((img) =>
                    <SwiperSlide>
                        <img src={img} alt={`Фото ${name}`} className={styles.image} />
                    </SwiperSlide>
                )}
            </Swiper>
            {/* <div className={styles.image_container}>
                <img className={styles.image} src={currentImage} alt={`Фото ${name}`} />
            </div> */}
        </div>
    )
}

export default ProductImages