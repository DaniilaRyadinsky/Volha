import { PRODUCT_PER_PAGE } from "../../../features/Pagination/consts/consts";

export const defaultFilter = {
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
    sort_order: "",
    limit: PRODUCT_PER_PAGE,
    offset: 0,
    title: ''
}