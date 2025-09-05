import { useEffect, useState } from 'react';
import Checkbox from '../../../shared/ui/Checkbox/Checkbox';
import ColorCheckbox from '../../../shared/ui/Checkbox/ColorCheckbox';

import { Button } from '../../../shared/ui/Button/Button';
import styles from './Filter.module.css';
import { ClipLoader } from 'react-spinners';
import type { IFilter, FilterMetadata, CheckboxItem, FilterCheckboxType } from '../model/FilterType';

import 'react-range-slider-input/dist/style.css'
import Range from '../../../shared/ui/Range/Range';


interface FilterProps {
    filterState: IFilter;
    filterMetadata: FilterMetadata,
    onFilterChange: (newState: IFilter | ((prev: IFilter) => IFilter)) => void,
    callback: () => void;
    isLoading: boolean,
    error: Error | null
}

const Filter = ({ filterState, filterMetadata, onFilterChange, callback, isLoading, error }: FilterProps) => {

    const cleanFilters = () => {
        if (filterMetadata) {
            onFilterChange({
                categories: [],
                brands: [],
                colors: [],
                countries: [],
                materials: [],
                min_height: filterMetadata.min_height,
                max_height: filterMetadata.max_height,
                min_width: filterMetadata.min_width,
                max_width: filterMetadata.max_width,
                min_depth: filterMetadata.min_depth,
                max_depth: filterMetadata.max_depth,
                min_price: filterMetadata.min_price,
                max_price: filterMetadata.max_price
            })
        };
        setIsUpdate(true)
    };


    const [isUpdate, setIsUpdate] = useState(false)

    useEffect(() => {
        if (isUpdate) {
            callback()
            setIsUpdate(false)
        }
    }, [filterState]);

    function toggleArrayItem(key: keyof Pick<IFilter, FilterCheckboxType>, id: string) {
        onFilterChange(prevState => {

            const currentArray = prevState[key];
            if (!Array.isArray(currentArray)) {
                console.error(`Поле ${key} не является массивом`);
                return prevState;
            }

            const updatedArray = currentArray.includes(id)
                ? currentArray.filter(item => item !== id)
                : [...currentArray, id];

            return {
                ...prevState,
                [key]: updatedArray
            };
        });
    }

    function updateRange(key1: keyof IFilter, key2: keyof IFilter, min: number, max: number) {
        onFilterChange(prevState => {
            return {
                ...prevState,
                [key1]: min,
                [key2]: max
            };
        });
    }


    interface RenderCheckboxesProps {
        title: string;
        items: CheckboxItem[];
        textKey?: keyof Omit<CheckboxItem, "id" | "hex">;
        filterKey: keyof Pick<IFilter, FilterCheckboxType>,
        CheckboxComponent?: React.ComponentType<{
            checked: boolean;
            text: string;
            onClick: () => void;
            hex?: string;
        }>;
    }

    const renderCheckbox = ({
        title,
        items,
        textKey = "title",
        filterKey,
        CheckboxComponent = Checkbox
    }: RenderCheckboxesProps) => (
        <details className={styles.details}>
            <summary>{title}</summary>
            <div className={styles.details__content}>
                {items.map((item) =>
                    <CheckboxComponent
                        key={item.id}
                        checked={filterState[filterKey].includes(item.id)}
                        text={item[textKey] as string}
                        hex={item.hex}
                        onClick={() => toggleArrayItem(filterKey, item.id)} />)}
            </div>
        </details>
    );

    const renderRange = (
        title: string,
        minKey: keyof Omit<FilterMetadata, FilterCheckboxType>,
        maxKey: keyof Omit<FilterMetadata, FilterCheckboxType>
    ) => (
        <details className={styles.details} open>
            <summary>{title}</summary>
            <Range
                step={1}
                value={[filterState[minKey], filterState[maxKey]]}
                min={filterMetadata[minKey]} max={filterMetadata[maxKey]}
                onChange={(value) => updateRange(minKey, maxKey, value[0], value[1])} />
        </details>
    );

    if (isLoading) { console.log("loading");return <ClipLoader loading size={50} cssOverride={{ color: 'var(--main)' }} />;}
    if (error) return <div style={{ color: 'red' }}>Ошибка: {error.message}</div>;
    if (!filterMetadata) return null;
    return (
        <div className={styles.filter_container}>

            {renderRange("Цена", "min_price", "max_price")}

            {renderCheckbox({
                title: "Категории",
                items: filterMetadata.categories,
                filterKey: "categories"
            })}

            {renderCheckbox({
                title: "Бренды",
                items: filterMetadata.brands,
                textKey: "name",
                filterKey: "brands"
            })}

            {renderCheckbox({
                title: "Страны",
                items: filterMetadata.countries,
                filterKey: "countries"
            })}

            {renderCheckbox({
                title: "Материалы",
                items: filterMetadata.materials,
                filterKey: "materials"
            })}

            {renderCheckbox({
                title: "Цвета",
                items: filterMetadata.colors,
                textKey: "name",
                filterKey: "colors",
                CheckboxComponent: ColorCheckbox
            })}

            {renderRange("Длина, см", "min_width", "max_width")}

            {renderRange("Ширина, см", "min_depth", "max_depth")}

            {renderRange("Высота, см", "min_height", "max_height")}

            <Button style={{ width: '100%' }} onClick={() => { callback(); console.log("filters go") }}>Применить</Button>
            <Button style={{ width: '100%' }} mode='on_primary' onClick={cleanFilters}>Очистить фильтр</Button>

        </div>
    )
}

export default Filter


