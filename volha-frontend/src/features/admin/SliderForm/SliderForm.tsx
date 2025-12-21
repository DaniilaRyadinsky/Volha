import { useEffect, useState } from "react";
import { Swiper, SwiperSlide, type SwiperRef } from "swiper/react";
import 'swiper/swiper-bundle.css';

import { Navigation, Pagination } from "swiper/modules";
import styles from './SliderForm.module.css'
import type { Slide } from "../../MainSlider/MainSlider";
import TextInput from "../../../shared/ui/Input/TextInput";
import FileUpload from "../FileUpload/FileUpload";
import AdminImage from "../ProductForm/internal/AdminImage/AdminImage";
import { Button } from "../../../shared/ui/Button/Button";
import { postSlide } from "./api/fetchSlides";
import { showAlert, showErr } from "../../../shared/ui/customAlert/showAlert";
const SliderForm = () => {

  const [swiper, setSwiper] = useState<SwiperRef['swiper'] | null>(null);
  const [slides, setSlides] = useState<Slide[]>([]);

  const [currentSlide, setCurrentSlide] = useState<Slide>({ id: '', img: '', img762: '', link: '' })

  const handleAddClick = () => {
    postSlide(currentSlide, () => showAlert("Слайд добавлен"), (e) => showErr(e))
  }


  useEffect(() => {

  }, [])

  return (
    <div>
      <div>
        <Swiper
          onSwiper={(swiper) => setSwiper(swiper)}
          // onSlideChange={() => { setCurrentSlide(slides[swiper ? swiper?.activeIndex : 0]) }}
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
              <img src={slide.img} alt="" className={styles.img} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={styles.form_container}>
        <div className={styles.form_container_item}>
          <label>Фото для десктопных устройств (1920х750px)</label>
          <FileUpload onUpload={(e) => setCurrentSlide(prev => ({ ...prev, img: e }))} />
          {currentSlide.img != '' &&
            <AdminImage src={currentSlide.img} onDelete={() => setCurrentSlide(prev => ({ ...prev, img: '' }))} />
          }
        </div>

        <div className={styles.form_container_item}>
          <label>Фото для мобильных устройств</label>
          <FileUpload onUpload={(e) => setCurrentSlide(prev => ({ ...prev, img762: e }))} />
          {currentSlide.img762 != '' &&
            <AdminImage src={currentSlide.img762} onDelete={() => setCurrentSlide(prev => ({ ...prev, img762: '' }))} />
          }
        </div>
        <div className={styles.form_container_item}>
          <label>Ссылка</label>
          <TextInput type='text' placeholder="Ссылка" value={swiper ? slides[swiper?.activeIndex]?.link : ''} onChange={(e) => setCurrentSlide(prev => ({ ...prev, link: e }))} />
        </div>
        <div className={styles.form_container_item}>
          <Button onClick={() => handleAddClick()}>Добавить</Button>
        </div>
        <div className={styles.form_container_item}>

        </div>
      </div>
    </div>
  )
}

export default SliderForm