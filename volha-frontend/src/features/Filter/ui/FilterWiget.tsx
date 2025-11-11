import { useEffect, useState } from 'react'
import Filter from './Filter'
import styles from './Filter.module.css'
import type { FilterWidgetProps } from '../model/FilterType'
import Sidebar from '../../../shared/ui/Sidebar/Sidebar'
import SortSelect from './SortSelect/SortSelect'



const FilterWiget = (props: FilterWidgetProps) => {
    const [isFilter, setIsFilter] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)

    useEffect(() => {
        if (isUpdate) {
            props.callback()
            setIsUpdate(false)
        }
    }, [isUpdate]);

    const filterClick = () => {
        setIsFilter(!isFilter)
    }

    const sortChange = (optionValue: string) => {
        props.onFilterChange(prevState => {
            return {
                ...prevState,
                sort_by: optionValue.split(' ')[0],
                sort_order: optionValue.split(' ')[1]
            };
        });
        setIsUpdate(true)
    }

    const getSortMode = () => {
        const sort_mode = props.filterState.sort_by + " " + props.filterState.sort_order
        switch (sort_mode) {
            case "price DESC":
                return "По убыванию цены"
            case "price ASC":
                return "По возрастанию цены"
            default:
                return undefined
        }
    }

    return (
        <div className={styles.widget_container}>
            <div className={styles.widget_left_container}>
                <div className={styles.wiget_main_btn} onClick={filterClick}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_479_62)">
                            <path d="M2.25 13.5C2.25 13.9125 2.5875 14.25 3 14.25H6.75V12.75H3C2.5875 12.75 2.25 13.0875 2.25 13.5ZM2.25 4.5C2.25 4.9125 2.5875 5.25 3 5.25H9.75V3.75H3C2.5875 3.75 2.25 4.0875 2.25 4.5ZM9.75 15V14.25H15C15.4125 14.25 15.75 13.9125 15.75 13.5C15.75 13.0875 15.4125 12.75 15 12.75H9.75V12C9.75 11.5875 9.4125 11.25 9 11.25C8.5875 11.25 8.25 11.5875 8.25 12V15C8.25 15.4125 8.5875 15.75 9 15.75C9.4125 15.75 9.75 15.4125 9.75 15ZM5.25 7.5V8.25H3C2.5875 8.25 2.25 8.5875 2.25 9C2.25 9.4125 2.5875 9.75 3 9.75H5.25V10.5C5.25 10.9125 5.5875 11.25 6 11.25C6.4125 11.25 6.75 10.9125 6.75 10.5V7.5C6.75 7.0875 6.4125 6.75 6 6.75C5.5875 6.75 5.25 7.0875 5.25 7.5ZM15.75 9C15.75 8.5875 15.4125 8.25 15 8.25H8.25V9.75H15C15.4125 9.75 15.75 9.4125 15.75 9ZM12 6.75C12.4125 6.75 12.75 6.4125 12.75 6V5.25H15C15.4125 5.25 15.75 4.9125 15.75 4.5C15.75 4.0875 15.4125 3.75 15 3.75H12.75V3C12.75 2.5875 12.4125 2.25 12 2.25C11.5875 2.25 11.25 2.5875 11.25 3V6C11.25 6.4125 11.5875 6.75 12 6.75Z" fill="white" />
                        </g>
                    </svg>

                    Все фильтры
                </div>
                <div className={styles.filter_attr_btn}>
                    Тип товара
                </div>

                <div className={styles.filter_attr_btn}>
                    Цена
                </div>

                <div className={styles.filter_attr_btn}>
                    Размеры
                </div>
            </div>
            <div className={styles.widget_right_container}>
                <SortSelect
                    value={getSortMode()}
                    title="Сортировка"
                    options={[{ label: "По убыванию цены", value: "price DESC" }, { label: "По возрастанию цены", value: "price ASC" }]}
                    onChange={(e) => sortChange(e)} />
            </div>

            <Sidebar isOpen={isFilter} closeCallback={() => setIsFilter(false)}>
                <Filter {...props} setIsUpdate={setIsUpdate} closeCallback={() => setIsFilter(false)} />
            </Sidebar>


        </div >
    )
}


export default FilterWiget