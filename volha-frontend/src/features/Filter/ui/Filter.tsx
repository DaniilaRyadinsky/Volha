import { useEffect, useState } from "react"
import Checkbox from "../../../shared/ui/Checkbox/Checkbox"
import type { IColor } from "../../../shared/ui/Color/Color"

import styles from './Filter.module.css'
import ColorCheckbox from "../../../shared/ui/Checkbox/ColorCheckbox"
import { Button } from "../../../shared/ui/Button/Button"


interface IFilter {
    categories: string[],
    brands: string[],
    colors: string[],
    countries: string[],
    materials: string[],
    minHeight: number,
    minWidth: number,
    minDepth: number,
    maxHeight: number,
    maxWidth: number,
    maxDepth: number
}



const Filter = () => {
    const [filterState, setFilterState] = useState<IFilter>({
        categories: [],
        brands: [],
        colors: [],
        countries: [],
        materials: [],
        minHeight: 0,
        minWidth: 0,
        minDepth: 0,
        maxHeight: 10000,
        maxWidth: 10000,
        maxDepth: 10000
    });



    var response = {
        "Brands": [
            {
                "id": "1b4d1d60-f66c-45ad-b1f1-9009c43534be",
                "name": "Адидас Вова"
            },
            {
                "id": "1b4d1d60-f66c-45ad-b1f1-9009c43534bd",
                "name": "Адидас Петя"
            },
            {
                "id": "1b4d1d60-f66c-45ad-b1f1-9009c43534bc",
                "name": "Адидас Ваня"
            }
        ],
        "Categories": [
            {
                "id": "967f882b-8489-4a88-a21b-a206504d6c34",
                "title": "Шкаф",
                "uri": "Shkaf"
            }
        ],
        "Countries": [
            {
                "id": "df7b25a7-72f2-4e50-a54b-0cd5bceec692",
                "title": "Prussia",
                "friendly": "no"
            }
        ],
        "Materials": [
            {
                "id": "bb2d767e-2da1-45f8-a9a0-42d14a33ed51",
                "title": "Пенис"
            }
        ],
        "Colors": [
            {
                "id": "d2ba0c4c-0497-4386-9789-6c346f0ad7fc",
                "name": "Оранжевый",
                "hex": "#FF9000"
            },
            {
                "id": "d2ba0c4c-0497-4386-9789-6c346f0ad7fd",
                "name": "Белый",
                "hex": "#FFFFFF"
            },
            {
                "id": "d2ba0c4c-0497-4386-9789-6c346f0ad7fs",
                "name": "Черный",
                "hex": "#000000"
            }
        ]
    }

    function copy() {
        let _brands: string[] = [];
        response.Brands.forEach((item) => _brands.push(item.id));

        let _categories: string[] = [];
        response.Categories.forEach((item) => _categories.push(item.id));

        let _countries: string[] = [];
        response.Countries.forEach((item) => _countries.push(item.id));

        let _colors: string[] = [];
        response.Colors.forEach((item) => _colors.push(item.id));

        let _materials: string[] = [];
        response.Materials.forEach((item) => _materials.push(item.id));

        setFilterState({
            categories: _categories,
            brands: _brands,
            colors: _colors,
            countries: _countries,
            materials: _materials,
            minHeight: 0,
            minWidth: 0,
            minDepth: 0,
            maxHeight: 10000,
            maxWidth: 10000,
            maxDepth: 10000
        })
    }


    function clickArr(key: keyof IFilter, id: string) {
        setFilterState(prevState => {

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

    const BASE_URL = 'http://localhost:8080/api/'

    async function fetchFilters() {
        await fetch(`${BASE_URL}dictionaries/getall`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            if (!response.ok) {
                // Обрабатываем 400 и 501 отдельно
                if (response.status === 400) {
                    throw new Error('400: Неверный запрос (Bad Request)');
                } else if (response.status === 501) {
                    throw new Error('501: Сервер не поддерживает функционал (Not Implemented)');
                } else {
                    throw new Error(`HTTP-ошибка: ${response.status} ${response.statusText}`);
                }
            }
            else {
                console.log('suc')
            }
        });
    }

    useEffect(() => {
        // copy()
        fetchFilters()
    }, [])



    return (
        <div className={styles.filter_container}>

            <details className={styles.details} open>
                <summary>Категории</summary>
                <div className={styles.details__content}>
                    {response.Categories.map((item) => <Checkbox
                        key={item.id}
                        checked={filterState.categories.includes(item.id)}
                        text={item.title}
                        onClick={() => clickArr("categories", item.id)} />)}
                </div>
            </details>

            <details className={styles.details} open>
                <summary>Бренды</summary>
                <div className={styles.details__content}>
                    {response.Brands.map((item) => <Checkbox
                        key={item.id}
                        checked={filterState.brands.includes(item.id)}
                        text={item.name}
                        onClick={() => clickArr("brands", item.id)} />)}
                </div>
            </details>

            <details className={styles.details} open>
                <summary>Страны</summary>
                <div className={styles.details__content}>
                    {response.Countries.map((item) => <Checkbox
                        key={item.id}
                        checked={filterState.countries.includes(item.id)}
                        text={item.title}
                        onClick={() => clickArr("countries", item.id)} />)}
                </div>
            </details>

            <details className={styles.details} open>
                <summary>Материалы</summary>
                <div className={styles.details__content}>
                    {response.Materials.map((item) => <Checkbox
                        key={item.id}
                        checked={filterState.materials.includes(item.id)}
                        text={item.title}
                        onClick={() => clickArr("materials", item.id)} />)}
                </div>
            </details>

            <div>
                <details className={styles.details} open>
                    <summary>Цвета</summary>
                    <div className={styles.details__content}>
                        {response.Colors.map((item) => <ColorCheckbox
                            key={item.id}
                            checked={filterState.colors.includes(item.id)}
                            name={item.name}
                            hex={item.hex}
                            text={item.name}
                            onClick={() => clickArr("colors", item.id)} />)}
                    </div>
                </details>
            </div>{/*цвета*/}

            <div></div>{/*высота*/}
            <div></div>{/*ширина*/}
            <div></div>{/*длина*/}

            <Button style={{ width: '100%' }} onClick={() => console.log('click')}>Применить</Button>
            <Button style={{ width: '100%' }} mode='on_primary' onClick={() => console.log('click')}>Очистить фильтр</Button>

        </div>
    )
}

export default Filter