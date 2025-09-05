import { Button } from '../../shared/ui/Button/Button'
import ProductImages from '../../widgets/ProductImages/ProductImages'
import styles from './ProductPage.module.css'

const ProductPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.product_info}>
        <div className={styles.info_left_container}>
          <ProductImages name={"Шкаф"} images={["https://garagespace.ru/images/5624c2526e872.jpg", "https://garagespace.ru/images/5661d215c3143.jpg", "https://garagespace.ru/images/666efe065f84f.png"]} />
        </div>
        <div className={styles.info_right_container}>
          <h1 className={styles.title}>Шкаф металлический Волха </h1>
          
          <div className={styles.features_container}>
            <div className={styles.feature}>
              <div className={styles.feature_title}>Артикул</div>
              <div className={styles.feature_points}></div>
              <div className={styles.feature_text}>2138109240148190</div>
            </div>

            <div className={styles.feature}>
              <div className={styles.feature_title}>Производитель</div>
              <div className={styles.feature_points}></div>
              <div className={styles.feature_text}>Волха мебелс</div>
            </div>

            <div className={styles.feature}>
              <div className={styles.feature_title}>Страна производства</div>
              <div className={styles.feature_points}></div>
              <div className={styles.feature_text}>Таджикистан</div>
            </div>

            <div className={styles.feature}>
              <div className={styles.feature_title}>Материалы</div>
              <div className={styles.feature_points}></div>
              <div className={styles.feature_text}>Сталь, дерево</div>
            </div>

            <div className={styles.feature}>
              <div className={styles.feature_title}>Размеры</div>
              <div className={styles.feature_points}></div>
              <div className={styles.feature_text}>Ш 1400 х В 1220 х Г 1300</div>
            </div>

          </div>
          <p className={styles.price}>23000 р</p>
          <div className={styles.button_container}>
            <Button style={{ width: "100%" }} mode={"on_primary"} onClick={() => console.log("click")}>Узнать цену</Button>
          </div>
        </div>
      </div>

      <div className={styles.product_description}>
        <h2 className={styles.title2}>Описание</h2>
        <p className={styles.description} >Создать современный сайт бренда Волха, который демонстрирует минималистичную мебель и предметный дизайн с возможностью вдохновения для покупателей (DIYидеи) и последующей покупки или запроса стоимости. Сайт должен быть удобен для архитекторов, дизайнеров, частных покупателей и DIY-энтузиастов. Создать современный сайт бренда Волха, который демонстрирует минималистичную мебель и предметный дизайн с возможностью вдохновения для покупателей (DIYидеи) и последующей покупки или запроса стоимости. Сайт должен быть удобен для архитекторов, дизайнеров, частных покупателей и DIY-энтузиастов. Создать современный сайт бренда Волха, который демонстрирует минималистичную мебель и предметный дизайн с возможностью вдохновения для покупателей (DIYидеи) и последующей покупки или запроса стоимости. Сайт должен быть удобен для архитекторов, дизайнеров, частных покупателей и DIY-энтузиастов. Создать современный сайт бренда Волха, который демонстрирует минималистичную мебель и предметный дизайн с возможностью вдохновения для покупателей (DIYидеи) и последующей покупки или запроса стоимости. Сайт должен быть удобен для архитекторов, дизайнеров, частных покупателей и DIY-энтузиастов. Создать современный сайт бренда Волха, который демонстрирует минималистичную мебель и предметный дизайн с возможностью вдохновения для покупателей (DIYидеи) и последующей покупки или запроса стоимости. Сайт должен быть удобен для архитекторов, дизайнеров, частных покупателей и DIY-энтузиастов.</p>
      </div>

      <div className={styles.product_seems}>
        <h2 className={styles.title2}>С этим сочетается</h2>
      </div>

    </div>
  )
}

export default ProductPage