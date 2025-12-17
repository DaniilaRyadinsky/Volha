import { useEffect, useState } from "react";
import { Swiper, SwiperSlide, useSwiper, type SwiperRef } from "swiper/react";
import 'swiper/swiper-bundle.css';

import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
import styles from './SliderForm.module.css'
import type { Slide } from "../../MainSlider/MainSlider";
import TextInput from "../../../shared/ui/Input/TextInput";

const SliderForm = () => {

  const [swiper, setSwiper] = useState<SwiperRef['swiper'] | null>(null);
  const [slides, setSlides] = useState<Slide[]>([]);

  useEffect(() => {

  }, [])

  return (
    <div>
      <div>
        <Swiper
        onSwiper={(swiper)=> setSwiper(swiper)}
          className={styles.slider}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Navigation, Pagination]}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <Link to={slide.link}>
                <img src={slide.img} alt="" className={styles.img} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div>
          <TextInput type='text' placeholder="Ссылка" value={swiper ? slides[swiper?.activeIndex].link: ''} onChange={()=>{}}/>
      </div>
    </div>
  )
}

export default SliderForm