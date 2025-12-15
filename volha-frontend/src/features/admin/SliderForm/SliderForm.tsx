import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css';

import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
import styles from './SliderForm.module.css'
import type { Slide } from "../../MainSlider/MainSlider";

const SliderForm = () => {
  const [slides, setSlides] = useState<Slide[]>([]);

  useEffect(()=> {
    
  },[])

  return (
    <div>
      <div>
        <Swiper
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

      </div>
    </div>
  )
}

export default SliderForm