import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css';

import { Navigation, Pagination } from "swiper/modules";
import styles from './SliderForm.module.css'
import type { Slide } from "../../MainSlider/MainSlider";
import TextInput from "../../../shared/ui/Input/TextInput";
import FileUpload from "../FileUpload/FileUpload";
import AdminImage from "../ProductForm/internal/AdminImage/AdminImage";
import { Button } from "../../../shared/ui/Button/Button";
import { deleteSlide, getAllSLides, postSlide } from "./api/fetchSlides";
import { showAlert, showErr } from "../../../shared/ui/customAlert/showAlert";
import BASE_URL from "../../../shared/const/base_url";
const SliderForm = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState<Slide>({ id: '', img: '', img762: '', link: '' });
  const isCreateMode = activeIndex === slides.length;

  type SlideErrors = {
    img?: boolean;
    img762?: boolean;
    link?: boolean;
  };

  const [errors, setErrors] = useState<SlideErrors>({});

  const validateSlide = (slide: Slide) => {
    const newErrors: SlideErrors = {};

    if (!slide.img) newErrors.img = true;
    if (!slide.img762) newErrors.img762 = true;
    if (!slide.link.trim()) newErrors.link = true;

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  const handleAddClick = () => {
    if (!currentSlide) return;

    if (!validateSlide(currentSlide)) return;

    if (isCreateMode) {
      postSlide('POST', currentSlide,
        () => { showAlert("Слайд добавлен"); getAllSLides((e) => setSlides(e), (e) => { showErr(e) }) },
        (e) => showErr(e))
    } else {
      postSlide('PUT', currentSlide,
        () => { showAlert("Слайд обновлен"); getAllSLides((e) => setSlides(e), (e) => { showErr(e) }) },
        (e) => showErr(e))
    }

  }


  const handleDeleteClick = () => {
    deleteSlide(currentSlide.id, () => {
      showAlert("Слайд удален");
      getAllSLides((e) => setSlides(e), (e) => { showErr(e) })
    }, (e) => showErr(e))
  }


  useEffect(() => {
    getAllSLides((e) => setSlides(e), (e) => { showErr(e) })
  }, [])

  useEffect(() => {
    if (activeIndex < slides.length) {
      // редактирование
      setCurrentSlide(slides[activeIndex]);
    } else {
      // добавление
      setCurrentSlide({
        id: '',
        img: '',
        img762: '',
        link: ''
      });
    }
  }, [activeIndex, slides]);

  return (
    <div className={styles.container}>
      <div>
        <Swiper
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className={styles.slider}
          loop={false}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Navigation, Pagination]}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <img src={`${BASE_URL}images/${slide.img}`} alt="" className={styles.img} />
            </SwiperSlide>
          ))}
          <SwiperSlide>
            <div className={styles.add_slide}>
              <span>+ Добавить слайд</span>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className={styles.form_container}>
        <div className={styles.form_container_item}
        style={{outline: errors.img ? "2px solid var(--red)": ''}}
        >
          <label>Фото для десктопных устройств (1920х750px)</label>
          <FileUpload onUpload={(e) => setCurrentSlide(prev => ({ ...prev, img: e }))} />
          {currentSlide.img != '' &&
            <AdminImage src={currentSlide.img} onDelete={() => setCurrentSlide(prev => ({ ...prev, img: '' }))} />
          }
        </div>

        <div className={styles.form_container_item}
        style={{outline: errors.img762 ? "2px solid var(--red)": ''}}
        >
          <label>Фото для мобильных устройств</label>
          <FileUpload onUpload={(e) => setCurrentSlide(prev => ({ ...prev, img762: e }))} />
          {currentSlide.img762 != '' &&
            <AdminImage src={currentSlide.img762} onDelete={() => setCurrentSlide(prev => ({ ...prev, img762: '' }))} />
          }
        </div>
        <div className={styles.form_container_item}
        style={{outline: errors.link ? "2px solid var(--red)": ''}}
        >
          <label>Ссылка</label>
          <TextInput type='text' placeholder="Ссылка" value={currentSlide.link} onChange={(e) => setCurrentSlide(prev => ({ ...prev, link: e }))} />
        </div>
        <div className={styles.button_container}>
          <Button onClick={() => handleAddClick()}>{isCreateMode ? 'Добавить' : 'Сохранить'}</Button>
          <Button onClick={() => handleDeleteClick()}>Удалить</Button>
        </div>
        <div className={styles.form_container_item}>

        </div>
      </div>
    </div>
  )
}

export default SliderForm