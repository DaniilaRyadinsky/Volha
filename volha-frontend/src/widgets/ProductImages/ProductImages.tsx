import { Swiper as SwiperTypes } from 'swiper';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel, Pagination, Scrollbar, Thumbs } from 'swiper/modules';

import 'swiper/swiper-bundle.css';
import styles from './ProductImages.module.css'
import BASE_URL from '../../shared/const/base_url';
import { useState, useEffect } from 'react';

interface IProductImages {
    images: string[];
    name: string;
    thumbsSwiper: SwiperTypes | null;
    setThumbsSwiper: (swiper: SwiperTypes | null) => void;
    onClick?: () => void;
}

const ProductImages = ({ images, name, thumbsSwiper, setThumbsSwiper, onClick }: IProductImages) => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth);

    useEffect(() => {
        const onResize = () => setIsDesktop(window.innerWidth);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.miniatures_container}>
                <SwiperComponent
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={'auto'}
                    freeMode={true}
                    scrollbar={{
                        hide: false,
                        draggable: true,
                    }}
                    watchSlidesProgress={true}
                    modules={[Scrollbar, FreeMode, Mousewheel]}
                    className={styles.miniatures}
                    direction={isDesktop > 1400 ? 'vertical' : 'horizontal'}
                    mousewheel={{
                        forceToAxis: false,
                        sensitivity: 0.8,
                        releaseOnEdges: false,
                    }}
                >
                    {images.map((img) =>
                        <SwiperSlide key={img}>
                            <img
                                src={`${BASE_URL}images/${img}`}
                                alt={`Фото ${name}`}
                                className={styles.miniature}
                            />
                        </SwiperSlide>
                    )}
                </SwiperComponent>
            </div>

            <SwiperComponent
                slidesPerView={1}
                thumbs={{ swiper: thumbsSwiper }}
                pagination={isDesktop < 1096}
                modules={[FreeMode, Thumbs, Pagination]}
                className={styles.image_container}
            >
                {images.map((img) =>
                    <SwiperSlide key={img} onClick={onClick}>
                        <img
                            src={`${BASE_URL}images/${img}`}
                            alt={`Фото ${name}`}
                            className={styles.image}
                        />
                    </SwiperSlide>
                )}
            </SwiperComponent>
        </div>
    );
};

export default ProductImages;
