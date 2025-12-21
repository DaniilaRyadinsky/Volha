import styles from './Catalog.module.css';
import ProductCard from '../../entities/Product/ProductCard/ProductCard';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import BASE_URL from '../../shared/const/base_url';
import { ClipLoader } from 'react-spinners';
import type { Category, Product } from '../../entities/Product/types/ProductTypes';
import type { FilterMetadata, IFilter } from '../../features/Filter/model/FilterType';
import FilterWiget from '../../features/Filter/ui/FilterWiget';
import { fetchProducts } from './api/Fetch';
import { defaultFilter } from './consts/consts';
import Breadcrumbs from '../../features/Breadcrumbs/Breadcrumbs';
import LayoutContent from '../../app/layout/LayoutContent';
import Title from '../../shared/ui/Title/Title';
import Pagination from '../../features/Pagination/Pagination';
import { PRODUCT_PER_PAGE } from '../../features/Pagination/consts/consts';


const Catalog = () => {
    const { data: filterMetaData, isLoading: isLoadingFilterMeta, error } = useQuery<FilterMetadata>({
        queryKey: ['filterMetaData'],
        queryFn: async () => {
            const res = await fetch(`${BASE_URL}api/dictionaries/all`);
            if (!res.ok) throw new Error(res.statusText);
            return res.json();
        },
        staleTime: Infinity
    });

    const [filterState, setFilterState] = useState<IFilter>(defaultFilter)
    const { uri } = useParams();
    const [title, setTitle] = useState('Все товары')
    const queryClient = useQueryClient();

    useEffect(() => {
        console.log("uri")
        if (uri) {

            const categories = queryClient.getQueryData<Category[]>(['categories']) ?? [];
            const category = categories.find(c => c.uri === uri)

            if (category) {
                console.log("set title")
                setTitle(category.title);
                // if (filterMetaData) {
                if (filterState.categories[0] !== category.id) {
                    setFilterState(prev => ({
                        ...prev,
                        categories: [category.id],
                    }));
                    setShouldUpdate(true)
                }
                // }
            }
        }
    }, [uri]);

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


    if (isLoading) return <ClipLoader loading cssOverride={{ color: 'var(--main)' }} size={50} />;
    if (!filterMetaData) return null;

    return (
        <LayoutContent>
            <div className={styles.catalog_container}>
                <Breadcrumbs />
                <Title>{title}</Title>
                <FilterWiget filterState={filterState} filterMetadata={filterMetaData} onFilterChange={setFilterState} callback={fetchCatalog} isLoading={isLoadingFilterMeta} error={error} />

                <div className={styles.catalog}>
                    <div className={styles.product_list}>
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