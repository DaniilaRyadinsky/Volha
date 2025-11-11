import { Swiper, SwiperSlide, type SwiperRef } from 'swiper/react';
import { Swiper as SwiperTypes } from 'swiper';
import { Button } from '../../shared/ui/Button/Button'
import ProductImages from '../../widgets/ProductImages/ProductImages'
import 'swiper/swiper-bundle.css';


import styles from './ProductPage.module.css'
import { Navigation, Pagination } from 'swiper/modules';
import ProductCard from '../../entities/Product/ProductCard/ProductCard';
import type { Product } from '../../entities/Product/types/ProductTypes';
import { useLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ColorMarker } from '../../shared/ui/Color/Color';

import arrow from '../../shared/assets/icons/expand_more.svg'
import ImgView from '../../widgets/ImgView/ImgView';
import { fetchColorImg } from '../../entities/Product/api/ProductFetch';

interface LoaderResult {
  product: Product;
  breadcrumb: string;
}

const ProductPage = () => {
  const product = (useLoaderData() as LoaderResult).product;
  console.log(product)

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperTypes | null>(null);

  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [img, setImg] = useState<string[]>([]);

  const [isImgView, setIsImgView] = useState(false);

  const [swiper, setSwiper] = useState<SwiperRef['swiper'] | null>(null);


  const nextHandler = () => {
    swiper?.slideNext();
  };

  const prevHandler = () => {
    swiper?.slidePrev();
  };

  const getMaterials = () => {
    let res = ''
    if (product.materials)
      product.materials.forEach((material) => {
        res += material.title + ', '
      })

    return res.slice(0, res.length - 2)
  }

  const handleColorClick = (id: string) => {
    const selectColor = product.colors.find(u => u.id == id)
    if (selectColor)
      setSelectedColor(selectColor)
  }

  const getSlidesPerView = () => {
    if (window.innerWidth > 1500)
      return 4;
    else if (window.innerWidth > 1200)
      return 3;
    else
      return 2
  }


  useEffect(() => {
    fetchColorImg(
      selectedColor.id,
      product.id,
      (e) => setImg(e),
      (e) => console.error(e)

    )
  }, [selectedColor])

  return (
    <>
      {isImgView &&
        <ImgView images={img} thumbsSwiper={thumbsSwiper} setThumbsSwiper={setThumbsSwiper} />
      }

      <div className={styles.container}>
        <div className={styles.product_info}>
          <div className={styles.info_left_container}>
            <ProductImages name={"Шкаф"} images={img} thumbsSwiper={thumbsSwiper} setThumbsSwiper={setThumbsSwiper} onClick={() => setIsImgView(true)} />
          </div>
          <div className={styles.info_right_container}>
            <h1 className={styles.title}>{product.title}</h1>

            <div className={styles.color_container}>
              <h3 className={styles.color_title}>{"Цвет: " + selectedColor.name}</h3>
              <div className={styles.colors}>
                {product.colors.map(c =>
                  <ColorMarker
                    style={{ borderColor: selectedColor.id === c.id ? "var(--main)" : undefined }}
                    name={c.name}
                    hex={c.hex}
                    onClick={() => handleColorClick(c.id)}
                  />)}
              </div>
            </div>

            <div className={styles.features_container}>
              <div className={styles.feature}>
                <div className={styles.feature_title}>Артикул</div>
                <div className={styles.feature_points}></div>
                <div className={styles.feature_text}>{product.article}</div>
              </div>

              <div className={styles.feature}>
                <div className={styles.feature_title}>Производитель</div>
                <div className={styles.feature_points}></div>
                <div className={styles.feature_text}>{product.brand?.name}</div>
              </div>

              <div className={styles.feature}>
                <div className={styles.feature_title}>Страна производства</div>
                <div className={styles.feature_points}></div>
                <div className={styles.feature_text}>{product.country?.title}</div>
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
          <div className={styles.swiper_container}>
            <img className={styles.swiper_prev_button} src={arrow} onClick={() => prevHandler()} />
            <Swiper
              slidesPerView={getSlidesPerView()}
              spaceBetween={20}
              pagination={{
                clickable: true,
              }}
              onSwiper={(swiper) => setSwiper(swiper)}
              modules={[Navigation, Pagination]}
              className={styles.mySwiper}
            >
              <SwiperSlide>
                <ProductCard article='1234' isAbsolutePath={true} id='1' title="Шкаф металлический очень крутой налетайте" price={2300000} width={1200} height={1200} depth={1200} photos={['https://garagespace.ru/images/5e4320afe986a.jpg']} colors={[{ id: '1', name: 'red', hex: '#121231' }, { id: '2', name: 'red', hex: '#242463' }]} />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard article='1234' isAbsolutePath={true} id='2' title="Шкаф металлический очень крутой налетайте" price={23000} width={1200} height={1200} depth={1200} photos={['https://garagespace.ru/images/5e4320afe986a.jpg']} colors={[{ id: '1', name: 'red', hex: '#121231' }, { id: '2', name: 'red', hex: '#242463' }]} />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard article='1234' isAbsolutePath={true} id='3' title="Шкаф металлический очень крутой налетайте" price={23000} width={1200} height={1200} depth={1200} photos={['https://garagespace.ru/images/5e4320afe986a.jpg']} colors={[{ id: '1', name: 'red', hex: '#121231' }, { id: '2', name: 'red', hex: '#242463' }]} />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard article='1234' isAbsolutePath={true} id='4' title="Шкаф металлический очень крутой налетайте" price={23000} width={1200} height={1200} depth={1200} photos={['https://garagespace.ru/images/5e4320afe986a.jpg']} colors={[{ id: '1', name: 'red', hex: '#121231' }, { id: '2', name: 'red', hex: '#242463' }]} />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard article='1234' isAbsolutePath={true} id='5' title="Шкаф металлический очень крутой налетайте" price={23000} width={1200} height={1200} depth={1200} photos={['https://garagespace.ru/images/5e4320afe986a.jpg']} colors={[{ id: '1', name: 'red', hex: '#121231' }, { id: '2', name: 'red', hex: '#242463' }]} />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard article='1234' isAbsolutePath={true} id='6' title="Шкаф металлический очень крутой налетайте" price={23000} width={1200} height={1200} depth={1200} photos={['https://garagespace.ru/images/5e4320afe986a.jpg']} colors={[{ id: '1', name: 'red', hex: '#121231' }, { id: '2', name: 'red', hex: '#242463' }]} />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard article='1234' isAbsolutePath={true} id='7' title="Шкаф металлический очень крутой налетайте" price={23000} width={1200} height={1200} depth={1200} photos={['https://garagespace.ru/images/5e4320afe986a.jpg']} colors={[{ id: '1', name: 'red', hex: '#121231' }, { id: '2', name: 'red', hex: '#242463' }]} />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard article='1234' isAbsolutePath={true} id='8' title="Шкаф металлический очень крутой налетайте" price={23000} width={1200} height={1200} depth={1200} photos={['https://garagespace.ru/images/5e4320afe986a.jpg']} colors={[{ id: '1', name: 'red', hex: '#121231' }, { id: '2', name: 'red', hex: '#242463' }]} />
              </SwiperSlide>
            </Swiper>
            <img className={styles.swiper_next_button} src={arrow} onClick={() => nextHandler()} />
          </div>
        </div>

      </div >
    </>
  )
}

export default ProductPage