import { useEffect, useState } from 'react'
import type { Product } from '../../../entities/Product/types/ProductTypes';
import Input from '../../../shared/ui/Input/Input';
import styles from './AdminSearch.module.css'
import BASE_URL from '../../../shared/const/base_url';
import { productSearch } from '../../../entities/Product/api/ProductFetch';
import { showErr } from '../../../shared/ui/customAlert/showAlert';

const AdminSearch = () => {
    const [query, setQuery] = useState('')
    const [searchResult, setSearchResult] = useState<Product[]>([]);

    useEffect(() => {
        if (query === '') {
            setSearchResult([])
            return
        }
        const timeoutId = setTimeout(() => {
            productSearch(
                query,
                (data) => setSearchResult(data),
                (err) => showErr(err)
            );
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query]);

    return (
        <div className={styles.admin_search}>
            <Input
                type="text"
                value={query}
                onChange={(text) => setQuery(text)}
                placeholder="Поиск..."
            />
            {query !== '' && searchResult.length == 0 && <p>Товары не найдены</p>}
            {searchResult.length != 0 && <div className={styles.productList_result}>
                {searchResult.map((product) =>
                    <div key={product.id} className={styles.product_item}>
                        <img className={styles.product_img} src={`${BASE_URL}images/${product.photos[0]}`} alt={product.title} />
                        <h3 className={styles.cell} >{product.title}</h3>
                        <p className={styles.cell}>{product.article}</p>
                    </div>)}
            </div>}
        </div>
    )
}

export default AdminSearch