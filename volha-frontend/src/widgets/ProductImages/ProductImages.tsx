import { useState } from 'react';
import { Swiper as SwiperTypes } from 'swiper';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/swiper-bundle.css';
import styles from './ProductImages.module.css'
import BASE_URL from '../../shared/const/base_url';

interface IProductImages {
    images: string[];
    name: string
}

const ProductImages = ({ images, name }: IProductImages) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperTypes | null>(null);

    return (
        <div className={styles.container}>
            <div className={styles.miniatures_container}>
                <SwiperComponent
                    onSwiper={setThumbsSwiper}
                    spaceBetween={15}
                    slidesPerView={5}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className={styles.miniatures}
                    direction={window.innerWidth > 1400 ? "vertical" : "horizontal"}
                >
                    {images.map((img) =>
                        <SwiperSlide>
                            <img src={`${BASE_URL}images/${img}`} alt={`Фото ${name}`}
                                className={styles.miniature} />
                        </SwiperSlide>)}
                </SwiperComponent>
            </div>

            <SwiperComponent
                slidesPerView={1}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className={styles.image_container}>
                {images.map((img) =>
                    <SwiperSlide>
                        <img src={`${BASE_URL}images/${img}`} alt={`Фото ${name}`} className={styles.image} />
                    </SwiperSlide>
                )}
            </SwiperComponent>
        </div >
    )
}

export default ProductImages