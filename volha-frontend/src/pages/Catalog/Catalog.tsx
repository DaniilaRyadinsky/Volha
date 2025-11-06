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

const Catalog = () => {
    const { data: filterMetaData, isLoading: isLoadingFilterMeta, error } = useQuery<FilterMetadata>({
        queryKey: ['filterMetaData'],
        queryFn: async () => {
            const res = await fetch(`${BASE_URL}api/dictionaries/getall`);
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
        max_price: 1000,
        sort_by: "",
        sort_order: ""
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
                max_price: filterMetaData.max_price,
            }))
            setShouldUpdate(true)
        }
    }, [filterMetaData])


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
        }
    }, [filterState, shouldUpdate, fetchCatalog]);

    const { uri } = useParams();
    const [title, setTitle] = useState('Все товары')
    const queryClient = useQueryClient();

    useEffect(() => {
        if (uri) {
            const categories = queryClient.getQueryData<Category[]>(['categories']) ?? [];
            const category = categories.find(c => c.uri === uri)

            if (category) {
                setTitle(category.title);
                if (filterMetaData) {
                    setFilterState(prev => ({
                        ...prev,
                        categories: [category.id],
                    }));
                }
            }
        }
    }, [uri, filterMetaData, queryClient]);



    const [productList, setProductList] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(false)


    if (isLoading) return <ClipLoader loading cssOverride={{ color: 'var(--main)' }} size={50} />;
    if (!filterMetaData) return null;

    return (
        <div className={styles.catalog_container}>
            <h1 className={styles.header}>{title}</h1>
            <FilterWiget filterState={filterState} filterMetadata={filterMetaData} onFilterChange={setFilterState} callback={fetchCatalog} isLoading={isLoadingFilterMeta} error={error} />
            <div className={styles.catalog}>

                <div className={styles.product_list}>
                    {productList?.map((item) => <ProductCard
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
        </div>
    );
};

export default Catalog;