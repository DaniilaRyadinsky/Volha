import type { IFilter } from "./FilterType";

export const initialFilterState: IFilter = {
    categories: [],
    brands: [],
    colors: [],
    countries: [],
    materials: [],
    min_height: 0,
    max_height: 0,
    min_width: 0,
    max_width: 0,
    min_depth: 0,
    max_depth: 0,
    min_price: 0,
    max_price: 0
};

export type FilterAction =
    | { type: 'INIT_FROM_RESPONSE'; payload: Partial<IFilter> }
    | { type: 'RESET_TO_METADATA'; payload: Partial<IFilter> }
    | { type: 'UPDATE_FIELD'; payload: { field: keyof IFilter; value: any } };

export function filterReducer(state: IFilter, action: FilterAction): IFilter {
    switch (action.type) {
        case 'INIT_FROM_RESPONSE':
        case 'RESET_TO_METADATA':
            return { ...state, ...action.payload };
        case 'UPDATE_FIELD':
            return { ...state, [action.payload.field]: action.payload.value };
        default:
            return state;
    }
}