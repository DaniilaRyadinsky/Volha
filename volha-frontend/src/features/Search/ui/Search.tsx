import React, { useEffect, useState } from 'react'
import styles from './Search.module.css'
import search from '../../../shared/assets/icons/search.svg'
import { productSearch } from '../../../entities/Product/api/ProductFetch'
import type { Product } from '../../../entities/Product/types/ProductTypes'
import BASE_URL from '../../../shared/const/base_url'
import Backdrop from '../../../shared/ui/Backdrop/Backdrop'
import { showErr } from '../../../shared/ui/customAlert/showAlert'
import { useNavigate } from 'react-router-dom'

import CyrillicToTranslit from 'cyrillic-to-translit-js';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [query, setQuery] = useState<Product[]>([])
    const navigate = useNavigate();


    useEffect(() => {
        if (searchQuery === '') {
            setQuery([])
            return
        }
        const timeoutId = setTimeout(() => {
            productSearch(
                searchQuery,
                (data) => setQuery(data),
                (err) => showErr(err)
            );
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    const handleSearchClick = () => {
        console.log('click')
        if (searchQuery != '') {
            navigate(`/catalog/search/${searchQuery}`)
            setSearchQuery('')
        }
    }

    const handleProductClick = (e: React.MouseEvent<HTMLDivElement>, target: Product) => {
        e.stopPropagation();
        setSearchQuery('');
        navigate(`product/${target.id}/${CyrillicToTranslit().transform(target.title, '-').toLowerCase()}`)
    }


    return (
        <>
            <div className={styles.search_container}>
                <input
                    className={styles.input}
                    type="text"
                    value={searchQuery}
                    placeholder='Поиск по товарам'
                    onChange={(e) => setSearchQuery(e.target.value)} />
                <img src={search} className={styles.icon} onClick={() => handleSearchClick()} />

                {searchQuery !== '' &&
                    <>
                        <Backdrop onClick={() => setSearchQuery('')} />
                        <div className={styles.productList_result}>
                            {query.length == 0 ?
                                <p className={styles.product_item}>Товары не найдены</p> :
                                query.map((product) =>
                                    <div key={product.id} className={styles.product_item} onClick={(e) => handleProductClick(e, product)}>
                                        <p className={styles.cell} >{product.title}</p>
                                    </div>

                                )
                            }
                        </div>
                    </>
                }
            </div >

        </>
    )
}

export default Search

