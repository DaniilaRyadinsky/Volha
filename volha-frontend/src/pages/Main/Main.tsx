import MainSlider from '../../features/MainSlider/MainSlider'
import { useCategories } from '../../app/layout/model/useCategories'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Mousewheel, Navigation, Scrollbar } from 'swiper/modules'
import BASE_URL from '../../shared/const/base_url'
import { Link } from 'react-router-dom'

import 'swiper/swiper-bundle.css';
import styles from './Main.module.css'
import LayoutContent from '../../app/layout/LayoutContent'

const Main = () => {
  const { categories } = useCategories()
  return (
    <div>
      <div>
        <MainSlider />
      </div>
      <LayoutContent>

        <div>
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
            {categories.map((category) => (
              <SwiperSlide key={category.id}>
                <Link to={`/catalog/category/${category.uri}`}>
                  <div className={styles.category_card}>
                    <img src={`${BASE_URL}images/${category.img}`} className={styles.category_img} />
                    <div className={styles.category_title}>{category.title}</div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>

        <div>


        </div>
      </LayoutContent>
    </div>

  )
}

export default Main