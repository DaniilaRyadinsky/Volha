
import { Swiper as SwiperTypes } from 'swiper';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';
import { FreeMode, Thumbs } from 'swiper/modules';

import 'swiper/swiper-bundle.css';

import styles from './ImgView.module.css'

import BASE_URL from '../../shared/const/base_url';

interface IImgView {
    images: string[];
    thumbsSwiper: SwiperTypes | null,
    setThumbsSwiper: (swiper: SwiperTypes | null) => void,
    close?: () => void,
}
const ImgView = ({ images, thumbsSwiper, setThumbsSwiper, close }: IImgView) => {
    return (
        <div className={styles.container} >
            <div className={styles.miniatures_container}>
                <SwiperComponent
                    onSwiper={setThumbsSwiper}
                    spaceBetween={15}
                    slidesPerView={5}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Thumbs]}
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
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Thumbs]}
                className={styles.image_container}
                >
                {images.map((img) =>
                    <SwiperSlide key={img}>
                        <img src={`${BASE_URL}images/${img}`} alt={`Фото ${name}`} className={styles.image} />
                    </SwiperSlide>
                )}
            </SwiperComponent>
        </div >
    )
}

export default ImgView