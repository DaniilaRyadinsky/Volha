import clsx from 'clsx';
import { useEffect, useState } from 'react';
import arrow from '../../shared/assets/icons/expand_more.svg';
import styles from './Pagination.module.css';
import { PRODUCT_PER_PAGE } from './consts/consts';


interface IPagination {
    total: number;
    onChange: (e: number) => void
}
const Pagination = ({ total, onChange }: IPagination) => {
    const [page, setPage] = useState(1);
    const count_pages = Math.ceil(total / PRODUCT_PER_PAGE)

    useEffect(() => {
        onChange(page)
        console.log(page)
    }, [page])

    const handlePrevCLick = () => {
        if (page > 0)
            setPage(prev => (prev - 1))
    }

    const handleNextCLick = () => {
        if (page < count_pages)
            setPage(prev => (prev + 1))
    }

    const currentPageStyle: React.CSSProperties = { backgroundColor: 'var(--main)', color: "#fff" }

    const getPageNumbers = (currentPage: number, totalPages: number) => {
        const pages = [];

        if (totalPages > 0) {
            pages.push(1);
        }

        // Определяем диапазон вокруг текущей страницы
        let startPage = Math.max(2, currentPage - 2);
        let endPage = Math.min(totalPages - 1, currentPage + 2);

        // Если текущая страница близко к началу, расширяем вправо
        if (currentPage <= 3) {
            endPage = Math.min(totalPages - 1, 5);
        }

        // Если текущая страница близко к концу, расширяем влево
        if (currentPage >= totalPages - 2) {
            startPage = Math.max(2, totalPages - 4);
        }

        // Если есть пропуск между первой страницей и startPage
        if (startPage > 2) {
            pages.push('...');
        }

        // Добавляем страницы вокруг текущей
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        // Если есть пропуск между endPage и последней страницей
        if (endPage < totalPages - 1) {
            pages.push('...');
        }

        // Добавляем последнюю страницу (если она не первая)
        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className={styles.pagination}>
            <img className={clsx([styles.prev_button], [styles.pag_btn])} src={arrow} onClick={() => handlePrevCLick()} />
            {getPageNumbers(page, count_pages).map((pageNum, index) => (
                pageNum === '...' ? (
                    <div key={`dots-${index}`} className={styles.pag_dots}>
                        ...
                    </div>
                ) : (
                    <div
                        key={pageNum}
                        className={styles.pag_btn}
                        style={pageNum == page ? currentPageStyle : undefined}
                        onClick={() => setPage(Number(pageNum))}
                    >
                        {pageNum}
                    </div>
                )
            ))
            }


            <img className={clsx([styles.next_button], [styles.pag_btn])} src={arrow} onClick={() => handleNextCLick()} />
        </div>
    )
}

export default Pagination