import styles from './Catalog.module.css';
import ProductCard from '../../entities/Product/ProductCard/ProductCard';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import BASE_URL from '../../shared/const/base_url';
import { ClipLoader } from 'react-spinners';
import type { Product } from '../../entities/Product/types/ProductTypes';
import type { FilterMetadata, IFilter } from '../../features/Filter/model/FilterType';
import FilterWiget from '../../features/Filter/ui/FilterWiget';

const Catalog = () => {
    const { data: filterMetaData, isLoading: isLoadingFilterMeta, error } = useQuery<FilterMetadata>({
        queryKey: ['filterMetaData'],
        queryFn: async () => {
            const res = await fetch(`${BASE_URL}dictionaries/getall`);
            if (!res.ok) throw new Error(res.statusText);
            return res.json();
        },
        staleTime: Infinity
    });

    const [filterState, setFilterState] = useState<IFilter>({
        categories: [],
        brands: [],
        colors: [],
        countries: [],
        materials: [],
        min_height: 0,
        max_height: 1000,
        min_width: 0,
        max_width: 1000,
        min_depth: 0,
        max_depth: 1000,
        min_price: 0,
        max_price: 1000
    })

    useEffect(() => {
        if (filterMetaData) {
            console.log("apply filters")
            setFilterState(prev => ({
                ...prev,
                categories: [],
                brands: [],
                colors: [],
                countries: [],
                materials: [],
                min_height: filterMetaData.min_height,
                max_height: filterMetaData.max_height,
                min_width: filterMetaData.min_width,
                max_width: filterMetaData.max_width,
                min_depth: filterMetaData.min_depth,
                max_depth: filterMetaData.max_depth,
                min_price: filterMetaData.min_price,
                max_price: filterMetaData.max_price
            }))
            setShouldUpdate(true)
        }
    }, [filterMetaData])


    const [shouldUpdate, setShouldUpdate] = useState(false)

    useEffect(() => {
        if (shouldUpdate) {
        fetchCatalog()
        console.log(filterState)
        setShouldUpdate(false)
        }

    }, [filterState])

    const { uri } = useParams();

    useEffect(() => {
        if (uri) {

        }
    }, [uri]);

    const fetchCatalog = async () => {
        setIsLoading(true)
        fetch(`${BASE_URL}product/filter`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                brand: filterState.brands,
                category: filterState.categories,
                colors: filterState.colors,
                country: filterState.countries,
                limit: 0,
                materials: filterState.materials,
                max_depth: filterState.max_depth,
                max_height: filterState.max_height,
                max_price: filterState.max_price,
                max_width: filterState.max_width,
                min_depth: filterState.min_depth,
                min_height: filterState.min_height,
                min_price: filterState.min_price,
                min_width: filterState.min_width,
                offset: 0,
                sort_by: "price",
                sort_order: "ASC"
            })
        }).then(res => res.json()).then(d => setProductList(d)).catch(e => alert(e))
        setIsLoading(false)

    }

    const [productList, setProductList] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(false)


    if (isLoading) return <ClipLoader loading cssOverride={{ color: 'var(--main)' }} size={50} />;
    if (!filterMetaData) return null;

    return (
        <div className={styles.catalog_container}>
            <h1 className={styles.header}>{uri?.split('_')[0] || 'Все товары'}</h1>
            <FilterWiget/>
            <div className={styles.catalog}>
               
                <div className={styles.product_list}>
                    {productList?.map((item) => <ProductCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        width={item.width}
                        height={item.height}
                        depth={item.depth}
                        colors={item.colors}
                        photos={item.photos} />)}
                        {productList?.map((item) => <ProductCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        width={item.width}
                        height={item.height}
                        depth={item.depth}
                        colors={item.colors}
                        photos={item.photos} />)}
                        {productList?.map((item) => <ProductCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        width={item.width}
                        height={item.height}
                        depth={item.depth}
                        colors={item.colors}
                        photos={item.photos} />)}
                        {productList?.map((item) => <ProductCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        width={item.width}
                        height={item.height}
                        depth={item.depth}
                        colors={item.colors}
                        photos={item.photos} />)}
                </div>
            </div>
        </div>
    );
};

export default Catalog;