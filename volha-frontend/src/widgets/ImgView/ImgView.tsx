
import { Swiper as SwiperTypes } from 'swiper';
import { Swiper as SwiperComponent, SwiperSlide, type SwiperRef } from 'swiper/react';
import { FreeMode, Mousewheel, Scrollbar, Thumbs } from 'swiper/modules';

import close from '../../shared/assets/icons/close.svg'

import 'swiper/swiper-bundle.css';

import styles from './ImgView.module.css'

import BASE_URL from '../../shared/const/base_url';
import { useState } from 'react';
import arrow from '../../shared/assets/icons/arrow_big.svg'

interface IImgView {
    images: string[];
    activeIndex: number,
    closeCallback: () => void,
}
const ImgView = ({ images, closeCallback, activeIndex }: IImgView) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperTypes | null>(null);


    const [swiper, setSwiper] = useState<SwiperRef['swiper'] | null>(null);


    const nextHandler = () => {
        swiper?.slideNext();
    };

    const prevHandler = () => {
        swiper?.slidePrev();
    };

    return (
        <div className={styles.container} >
            <div className={styles.swipers_container}>
                <div className={styles.miniatures_container}>
                    <SwiperComponent
                        onSwiper={setThumbsSwiper}
                        spaceBetween={15}
                        slidesPerView={'auto'}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Thumbs, Mousewheel, Scrollbar]}
                        className={styles.miniatures}
                        mousewheel={{
                            forceToAxis: false,
                            sensitivity: 0.8,
                            releaseOnEdges: false,
                        }}
                        scrollbar={{
                            hide: false,
                            draggable: true,
                        }}
                        breakpoints={{
                            0: {
                                direction: 'vertical'
                            },
                            768: { direction: 'horizontal' },
                            1400: {
                                direction: 'vertical',
                            }
                        }}
                    >
                        {images.map((img) =>
                            <SwiperSlide >
                                <img src={`${BASE_URL}images/${img}`} alt={`Фото ${name}`}
                                    className={styles.miniature} />
                            </SwiperSlide>)}
                    </SwiperComponent>
                </div>
                <div className={styles.image_swiper_container}>
                    <img className={styles.swiper_prev_button} src={arrow} onClick={() => prevHandler()} />

                    <SwiperComponent
                        onSwiper={(swiper) => setSwiper(swiper)}
                        slidesPerView={1}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Thumbs]}
                        className={styles.image_container}
                        initialSlide={activeIndex}
                    >
                        {images.map((img) =>
                            <SwiperSlide key={img} >
                                <img src={`${BASE_URL}images/${img}`} alt={`Фото ${name}`} className={styles.image} />
                            </SwiperSlide>
                        )}
                    </SwiperComponent>
                    <img className={styles.swiper_next_button} src={arrow} onClick={() => nextHandler()} />
                </div>
            </div>
            <div className={styles.close_container}>
                <img src={close} className={styles.close} onClick={() => closeCallback()} />
            </div>

        </div >
    )
}

export default ImgView