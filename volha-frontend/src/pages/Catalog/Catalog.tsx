import styles from './Catalog.module.css'

import ProductCard from "../../entities/Product/ProductCard/ProductCard"
import Checkbox from '../../shared/ui/Checkbox/Checkbox'
import { useState } from 'react'
import Filter from '../../features/Filter/ui/Filter'

const Catalog = () => {


    return (
        <div className={styles.catalog}>
            <Filter />

            <div className={styles.product_list}>
                <ProductCard id='1' title="Шкаф металлический очень крутой налетайте" price="23000" width={1200} height={1200} depth={1200} img='https://garagespace.ru/images/5e4320afe986a.jpg' colors={[{id:'1', name: 'red', hex: '#121231' }, {id:'2', name: 'red', hex: '#242463' }]} />
                <ProductCard id='1' title="Шкаф металлический очень крутой налетайте" price="23000" width={1200} height={1200} depth={1200} img='https://garagespace.ru/images/5e4320afe986a.jpg' colors={[{id:'1', name: 'red', hex: '#121231' }, {id:'2', name: 'red', hex: '#242463' }]} />
                <ProductCard id='1' title="Шкаф металлический очень крутой налетайте" price="23000" width={1200} height={1200} depth={1200} img='https://garagespace.ru/images/5e4320afe986a.jpg' colors={[{id:'1', name: 'red', hex: '#121231' }, {id:'2', name: 'red', hex: '#242463' }]} />
                <ProductCard id='1' title="Шкаф металлический очень крутой налетайте" price="23000" width={1200} height={1200} depth={1200} img='https://garagespace.ru/images/5e4320afe986a.jpg' colors={[{id:'1', name: 'red', hex: '#121231' }, {id:'2', name: 'red', hex: '#242463' }]} />
                <ProductCard id='1' title="Шкаф металлический очень крутой налетайте" price="23000" width={1200} height={1200} depth={1200} img='https://garagespace.ru/images/5e4320afe986a.jpg' colors={[{id:'1', name: 'red', hex: '#121231' }, {id:'2', name: 'red', hex: '#242463' }]} />
                <ProductCard id='1' title="Шкаф металлический очень крутой налетайте" price="23000" width={1200} height={1200} depth={1200} img='https://garagespace.ru/images/5e4320afe986a.jpg' colors={[{id:'1', name: 'red', hex: '#121231' }, {id:'2', name: 'red', hex: '#242463' }]} />
                <ProductCard id='1' title="Шкаф металлический очень крутой налетайте" price="23000" width={1200} height={1200} depth={1200} img='https://garagespace.ru/images/5e4320afe986a.jpg' colors={[{id:'1', name: 'red', hex: '#121231' }, {id:'2', name: 'red', hex: '#242463' }]} />
                <ProductCard id='1' title="Шкаф металлический очень крутой налетайте" price="23000" width={1200} height={1200} depth={1200} img='https://garagespace.ru/images/5e4320afe986a.jpg' colors={[{id:'1', name: 'red', hex: '#121231' }, {id:'2', name: 'red', hex: '#242463' }]} />
                <ProductCard id='1' title="Шкаф металлический очень крутой налетайте" price="23000" width={1200} height={1200} depth={1200} img='https://garagespace.ru/images/5e4320afe986a.jpg' colors={[{id:'1', name: 'red', hex: '#121231' }, {id:'2', name: 'red', hex: '#242463' }]} />
                <ProductCard id='1' title="Шкаф металлический очень крутой налетайте" price="23000" width={1200} height={1200} depth={1200} img='https://garagespace.ru/images/5e4320afe986a.jpg' colors={[{id:'1', name: 'red', hex: '#121231' }, {id:'2', name: 'red', hex: '#242463' }]} />
                <ProductCard id='1' title="Шкаф металлический очень крутой налетайте" price="23000" width={1200} height={1200} depth={1200} img='https://garagespace.ru/images/5e4320afe986a.jpg' colors={[{id:'1', name: 'red', hex: '#121231' }, {id:'2', name: 'red', hex: '#242463' }]} />
                <ProductCard id='1' title="Шкаф металлический очень крутой налетайте" price="23000" width={1200} height={1200} depth={1200} img='https://garagespace.ru/images/5e4320afe986a.jpg' colors={[{id:'1', name: 'red', hex: '#121231' }, {id:'2', name: 'red', hex: '#242463' }]} />
                <ProductCard id='1' title="Шкаф металлический очень крутой налетайте" price="23000" width={1200} height={1200} depth={1200} img='https://garagespace.ru/images/5e4320afe986a.jpg' colors={[{id:'1', name: 'red', hex: '#121231' }, {id:'2', name: 'red', hex: '#242463' }]} />
                <ProductCard id='1' title="Шкаф металлический очень крутой налетайте" price="23000" width={1200} height={1200} depth={1200} img='https://garagespace.ru/images/5e4320afe986a.jpg' colors={[{id:'1', name: 'red', hex: '#121231' }, {id:'2', name: 'red', hex: '#242463' }]} />
                <ProductCard id='1' title="Шкаф металлический очень крутой налетайте" price="23000" width={1200} height={1200} depth={1200} img='https://garagespace.ru/images/5e4320afe986a.jpg' colors={[{id:'1', name: 'red', hex: '#121231' }, {id:'2', name: 'red', hex: '#242463' }]} />
                <ProductCard id='1' title="Шкаф металлический очень крутой налетайте" price="23000" width={1200} height={1200} depth={1200} img='https://garagespace.ru/images/5e4320afe986a.jpg' colors={[{id:'1', name: 'red', hex: '#121231' }, {id:'2', name: 'red', hex: '#242463' }]} />
                
            </div>


        </div>
    )
}

export default Catalog