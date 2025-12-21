import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css';

import styles from './MainSlider.module.css';
import BASE_URL from "../../shared/const/base_url";
import { Link } from "react-router-dom";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { getAllSLides } from "../admin/SliderForm/api/fetchSlides";

export interface Slide {
  id: string;
  img: string;
  img762: string;
  link: string;
}

const MainSlider = () => {
  const [slides, setSlides] = useState<Slide[]>([
    // {
    //   id: "1",
    //   img: `${BASE_URL}images/9d406330-a9dd-415d-bc97-8e7923edff30.png`,
    //   img768: "/images/slide1-768.jpg",
    //   link: "/products"
    // },
    // {
    //   id: "2",
    //   img: `${BASE_URL}images/9d406330-a9dd-415d-bc97-8e7923edff30.png`,
    //   img768: "/images/slide2-768.jpg",
    //   link: "/new-arrivals"
    // },
    // {
    //   id: "3",
    //   img: `${BASE_URL}images/9d406330-a9dd-415d-bc97-8e7923edff30.png`,
    //   img768: "/images/slide3-768.jpg",
    //   link: "/sale"
    // }
  ]);


  useEffect(() => {
    getAllSLides(setSlides, (e) => console.log(e))
  }, [])

  return (
    <div>
      <Swiper
        className={styles.slider}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Pagination, Autoplay]}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Link to={slide.link}>
              <img src={`${BASE_URL}images/${slide.img}`} alt="" className={styles.img} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default MainSlider