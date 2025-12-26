import MainSlider from '../../features/MainSlider/MainSlider'
import { useCategories } from '../../app/layout/model/useCategories'
import { SwiperSlide } from 'swiper/react'
import BASE_URL from '../../shared/const/base_url'
import { Link } from 'react-router-dom'

import 'swiper/swiper-bundle.css';
import styles from './Main.module.css'
import LayoutContent from '../../app/layout/LayoutContent'
import { Swiper } from 'swiper/react'
import { Navigation, Mousewheel, FreeMode, Scrollbar } from 'swiper/modules'
import type { Product } from '../../entities/Product/types/ProductTypes'
import { useEffect, useState } from 'react'
import ProductCard from '../../entities/Product/ProductCard/ProductCard'
import { fetchFavorites } from './api/fetchFav'
import Title from '../../shared/ui/Title/Title'

const Main = () => {
  const { categories } = useCategories()

  const [favorites, setFavorites] = useState<Product[]>([])

  useEffect(() => {
    fetchFavorites(
      (data) => setFavorites(data.items),
      (error) => console.error('Error fetching favorites:', error)
    )

  }, [])

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
        <Title>Каталог новинок</Title>
        <Swiper
          slidesPerView={4}
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
          {favorites.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard
                article={product.article}
                isAbsolutePath={true}
                id={product.id}
                title={product.title}
                price={product.price}
                width={product.width}
                height={product.height}
                depth={product.depth}
                photos={product.photos}
                colors={product.colors} />
            </SwiperSlide>))}
        </Swiper>

        <div>



        </div>
      </LayoutContent>
    </div>

  )
}

export default Main