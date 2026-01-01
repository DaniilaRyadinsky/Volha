import styles from './Catalog.module.css';
import ProductCard from '../../entities/Product/ProductCard/ProductCard';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { ClipLoader } from 'react-spinners';
import type { Category, Product } from '../../entities/Product/types/ProductTypes';
import type { FilterMetadata, IFilter } from '../../features/Filter/model/FilterType';
import FilterWiget from '../../features/Filter/ui/FilterWiget';
import { fetchFilters, fetchProducts } from './api/Fetch';
import { defaultFilter } from './consts/consts';
import Breadcrumbs from '../../features/Breadcrumbs/Breadcrumbs';
import LayoutContent from '../../app/layout/LayoutContent';
import Title from '../../shared/ui/Title/Title';
import Pagination from '../../features/Pagination/Pagination';
import { PRODUCT_PER_PAGE } from '../../features/Pagination/consts/consts';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ProductCardSkeleton from '../../entities/Product/ProductCard/ProductCardSkeleton';


const Catalog = () => {
    const [filterMetaData, setFilterMetaData] = useState<FilterMetadata>()
    const [isLoadingFilterMeta, setIsLoadingFilterMeta] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const queryClient = useQueryClient();

    const [filterState, setFilterState] = useState<IFilter>(defaultFilter)
    const { uri, query } = useParams();
    const categories = queryClient.getQueryData<Category[]>(['categories']) ?? [];
    const [title, setTitle] = useState('Все товары')

    const loadFilters = async (id?: string) => {
        setIsLoadingFilterMeta(true)
        await fetchFilters(
            (data) => setFilterMetaData(data),
            (e) => { console.error(e); setError(e)},
            id
        )
        setIsLoadingFilterMeta(false)
    }

    useEffect(() => {
        loadFilters();
    }, [])

    useEffect(() => {
        console.log(uri, query)
        if (uri) {
            const _category = uri ? categories.find(c => c.uri === uri) : undefined
            if (_category) {
                setTitle(_category.title);
                loadFilters(_category.id)
                if (filterState.categories[0] !== _category.id) {
                    setFilterState(prev => ({
                        ...prev,
                        categories: [_category.id],
                    }));
                }
            }
        }
        if (query) {
            console.log(query)

            setTitle(`Результаты поиска по запросу «${query}»`);
            setFilterState(prev => ({
                ...prev,
                title: query,
            }));
        }
        setShouldUpdate(true)
    }, [uri, query]);

    useEffect(() => {
        if (filterMetaData) {
            setFilterState(prev => ({
                ...prev,
                // categories: [],
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
                max_price: filterMetaData.max_price,
            }))
            setShouldUpdate(true)
        }
    }, [filterMetaData])

    const [productList, setProductList] = useState<{ items: Product[], total: number }>({ items: [], total: 0 })
    const [isLoading, setIsLoading] = useState(false)

    const [shouldUpdate, setShouldUpdate] = useState(false)

    const fetchCatalog = useCallback(async () => {
        setIsLoading(true);
        // await Promise.all([delay(5000), fetchProducts(filterState, setProductList, (e) => { alert(e) })])
        await fetchProducts(filterState, setProductList, (e) => { alert(e) });
        setIsLoading(false);
    }, [filterState]);


    useEffect(() => {
        if (shouldUpdate) {
            fetchCatalog();
            setShouldUpdate(false);
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }, [shouldUpdate]);


    const handlePaginationChange = (e: number) => {
        setFilterState(prev => ({
            ...prev,
            limit: e * PRODUCT_PER_PAGE,
            offset: (e - 1) * PRODUCT_PER_PAGE
        }));
        setShouldUpdate(true)
    }


    if (isLoadingFilterMeta) return <ClipLoader loading cssOverride={{ color: 'var(--main)' }} size={50} />;
    if (error != null) return <div style={{ color: 'red', height: '80vh' }}>Ошибка: {error}</div>;

    if (!filterMetaData) return null;

    return (
        <LayoutContent>
            <div className={styles.catalog_container}>
                <Breadcrumbs />
                <Title subtitle={`Найдено ${productList.total}`}>{title}</Title>
                <FilterWiget filterState={filterState} filterMetadata={filterMetaData} onFilterChange={setFilterState} callback={fetchCatalog} isLoading={isLoadingFilterMeta} error={error} />
                
                <div className={styles.catalog}>
                    <div className={styles.product_list}>
                        {isLoading &&
                            Array.from({ length: PRODUCT_PER_PAGE }).map((_, i) => < Skeleton wrapper={ProductCardSkeleton} key={i} />)}
                        {productList?.items?.map((item) => <ProductCard
                            article={item.article}
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
                <Pagination total={productList.total} onChange={handlePaginationChange} />
            </div>
        </LayoutContent>
    );
};

export default Catalog;