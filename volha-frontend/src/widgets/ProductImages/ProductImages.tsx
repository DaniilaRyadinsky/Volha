import { Swiper as SwiperTypes } from 'swiper';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel, Pagination, Scrollbar, Thumbs } from 'swiper/modules';

import 'swiper/swiper-bundle.css';
import styles from './ProductImages.module.css'
import BASE_URL from '../../shared/const/base_url';
import { useState, useEffect } from 'react';
import ImgView from '../ImgView/ImgView';

interface IProductImages {
    images: string[];
    name: string;
}

const ProductImages = ({ images, name }: IProductImages) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperTypes | null>(null);
    const [activeIndex, setActiveIndex] = useState(-1)

    useEffect(() => {
        if (activeIndex != -1) {
            const originalStyle = window.getComputedStyle(document.body).overflow;
            document.body.style.overflow = 'hidden';

            return () => {
                document.body.style.overflow = originalStyle;
            };
        }
    }, [activeIndex]);

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
                    breakpoints={{
                        0: {
                            direction: 'horizontal',
                        },
                        1400: {
                            direction: 'vertical',
                        }
                    }}
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
                breakpoints={{
                    0: {
                        pagination: false,
                    },
                    1096: {
                        pagination: true,
                    }
                }}
                modules={[FreeMode, Thumbs, Pagination]}
                className={styles.image_container}
            >
                {images.map((img, index) =>
                    <SwiperSlide key={img} onClick={() => setActiveIndex(index)}>
                        <img
                            src={`${BASE_URL}images/${img}`}
                            alt={`Фото ${name}`}
                            className={styles.image}
                        />
                    </SwiperSlide>
                )}
            </SwiperComponent>

            {activeIndex != -1 &&
                <ImgView images={images} closeCallback={() => setActiveIndex(-1)} activeIndex={activeIndex}/>
            }
        </div>
    );
};

export default ProductImages;
