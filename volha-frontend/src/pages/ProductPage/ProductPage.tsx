import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from '../../shared/ui/Button/Button'
import ProductImages from '../../widgets/ProductImages/ProductImages'
import 'swiper/swiper-bundle.css';

import styles from './ProductPage.module.css'
import { Pagination } from 'swiper/modules';
import ProductCard from '../../entities/Product/ProductCard/ProductCard';
import type { Product } from '../../entities/Product/types/ProductTypes';
import { useLoaderData } from 'react-router-dom';

interface LoaderResult {
  product: Product[];
  breadcrumb: string;
}

const ProductPage = () => {
  const product = (useLoaderData() as LoaderResult).product[0];

  const getMaterials = () => {
    let res = ''
    product.materials.forEach((material) => {
      res += material.title + ', '
    })

    return res.slice(0, res.length - 2)
  }

  const getSlidesPerView = () => {
    if (window.innerWidth > 1500)
      return 4;
    else if (window.innerWidth > 1200)
      return 3;
    else
      return 2
  }

  return (
    <div className={styles.container}>
      <div className={styles.product_info}>
        <div className={styles.info_left_container}>
          <ProductImages name={"Шкаф"} images={["https://garagespace.ru/images/5624c2526e872.jpg",
            "https://garagespace.ru/images/5661d215c3143.jpg",
            "https://garagespace.ru/images/666efe065f84f.png",
            "https://garagespace.ru/images/5624c2526e872.jpg",
            "https://garagespace.ru/images/5661d215c3143.jpg",
            "https://garagespace.ru/images/666efe065f84f.png"]} />
        </div>
        <div className={styles.info_right_container}>
          <h1 className={styles.title}>{product.title}</h1>

          <div className={styles.features_container}>
            <div className={styles.feature}>
              <div className={styles.feature_title}>Артикул</div>
              <div className={styles.feature_points}></div>
              <div className={styles.feature_text}>{product.article}</div>
            </div>

            <div className={styles.feature}>
              <div className={styles.feature_title}>Производитель</div>
              <div className={styles.feature_points}></div>
              <div className={styles.feature_text}>{product.brand.name}</div>
            </div>

            <div className={styles.feature}>
              <div className={styles.feature_title}>Страна производства</div>
              <div className={styles.feature_points}></div>
              <div className={styles.feature_text}>{product.country.title}</div>
            </div>

            <div className={styles.feature}>
              <div className={styles.feature_title}>Материалы</div>
              <div className={styles.feature_points}></div>
              <div className={styles.feature_text}>{getMaterials()}</div>
            </div>

            <div className={styles.feature}>
              <div className={styles.feature_title}>Размеры</div>
              <div className={styles.feature_points}></div>
              <div className={styles.feature_text}>Ш {product.width} х В {product.height} х Г {product.depth}</div>
            </div>

          </div>
          <p className={styles.price}>{product.price} р</p>
          <div className={styles.button_container}>
            <Button style={{ width: "100%" }} mode={"on_primary"} onClick={() => console.log("click")}>Узнать цену</Button>
          </div>
        </div>
      </div>

      <div className={styles.product_description}>
        <h2 className={styles.title2}>Описание</h2>
        <p className={styles.description} >{product.description}</p>
      </div>

      <div className={styles.product_seems}>
        <h2 className={styles.title2}>С этим сочетается</h2>
        <Swiper
          slidesPerView={getSlidesPerView()}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <ProductCard isAbsolutePath={true} id='1' title="Шкаф металлический очень крутой налетайте" price={2300000} width={1200} height={1200} depth={1200} photos={['https://garagespace.ru/images/5e4320afe986a.jpg']} colors={[{ id: '1', name: 'red', hex: '#121231' }, { id: '2', name: 'red', hex: '#242463' }]} />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard isAbsolutePath={true} id='2' title="Шкаф металлический очень крутой налетайте" price={23000} width={1200} height={1200} depth={1200} photos={['https://garagespace.ru/images/5e4320afe986a.jpg']} colors={[{ id: '1', name: 'red', hex: '#121231' }, { id: '2', name: 'red', hex: '#242463' }]} />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard isAbsolutePath={true} id='3' title="Шкаф металлический очень крутой налетайте" price={23000} width={1200} height={1200} depth={1200} photos={['https://garagespace.ru/images/5e4320afe986a.jpg']} colors={[{ id: '1', name: 'red', hex: '#121231' }, { id: '2', name: 'red', hex: '#242463' }]} />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard isAbsolutePath={true} id='4' title="Шкаф металлический очень крутой налетайте" price={23000} width={1200} height={1200} depth={1200} photos={['https://garagespace.ru/images/5e4320afe986a.jpg']} colors={[{ id: '1', name: 'red', hex: '#121231' }, { id: '2', name: 'red', hex: '#242463' }]} />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard isAbsolutePath={true} id='5' title="Шкаф металлический очень крутой налетайте" price={23000} width={1200} height={1200} depth={1200} photos={['https://garagespace.ru/images/5e4320afe986a.jpg']} colors={[{ id: '1', name: 'red', hex: '#121231' }, { id: '2', name: 'red', hex: '#242463' }]} />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard isAbsolutePath={true} id='6' title="Шкаф металлический очень крутой налетайте" price={23000} width={1200} height={1200} depth={1200} photos={['https://garagespace.ru/images/5e4320afe986a.jpg']} colors={[{ id: '1', name: 'red', hex: '#121231' }, { id: '2', name: 'red', hex: '#242463' }]} />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard isAbsolutePath={true} id='7' title="Шкаф металлический очень крутой налетайте" price={23000} width={1200} height={1200} depth={1200} photos={['https://garagespace.ru/images/5e4320afe986a.jpg']} colors={[{ id: '1', name: 'red', hex: '#121231' }, { id: '2', name: 'red', hex: '#242463' }]} />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard isAbsolutePath={true} id='8' title="Шкаф металлический очень крутой налетайте" price={23000} width={1200} height={1200} depth={1200} photos={['https://garagespace.ru/images/5e4320afe986a.jpg']} colors={[{ id: '1', name: 'red', hex: '#121231' }, { id: '2', name: 'red', hex: '#242463' }]} />
          </SwiperSlide>
        </Swiper>
      </div>

    </div >
  )
}

export default ProductPage