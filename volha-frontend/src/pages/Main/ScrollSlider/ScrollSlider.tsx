import React from 'react'
import { Swiper } from 'swiper/react'
import { Navigation, Mousewheel, FreeMode, Scrollbar } from 'swiper/modules'
import styles from './ScrollSlider.module.css'

const ScrollSlider = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Swiper
                slidesPerView={'auto'}
                spaceBetween={30}
                loop={false}
                freeMode={true}
                speed={300}
                scrollbar={{
                    hide: false,
                    draggable: true,
                }}
                direction={"horizontal"}
                watchSlidesProgress={true}
                mousewheel={{
                    forceToAxis: true,
                    sensitivity: 1,
                    releaseOnEdges: true,
                }}
                modules={[Navigation, Mousewheel, FreeMode, Scrollbar]}
                className={styles.mySwiper}
            >
                {children}
            </Swiper>
        </>
    )
}

export default ScrollSlider