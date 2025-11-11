import styles from './CountryList.module.css'
import { useQuery } from '@tanstack/react-query'
import type { Country } from '../../../../entities/Product/types/ProductTypes'
import fetchCountry from '../api/fetchCountry'

import editIcon from '../../../../shared/assets/icons/edit.svg'
import deleteIcon from '../../../../shared/assets/icons/delete_forever.svg'
import { ClipLoader } from 'react-spinners'
import { fetchDeleteCountry } from '../api/fetchDeleteCountry'
import { showAlert } from '../../../../shared/ui/customAlert/showAlert'

const CountryList = () => {
    const { data: countries, isLoading, refetch } = useQuery<Country[]>({
        queryKey: ['countries'],
        queryFn: fetchCountry,
    })


    const handleDelete = (id: string) => {
        fetchDeleteCountry(id, () => {
            showAlert('Страна удалена');
            refetch();
        }, (err) => {
            alert(err);
        })
    }

    if (isLoading) {
        return <div><ClipLoader loading size={50} cssOverride={{ color: 'var(--main)' }} /></div>
    }

    return (
        <div>
            <div className={styles.title_container}>
                <h1 className={styles.title}>Все страны</h1>
            </div>

            <div className={styles.table}>
                <div className={styles.header}>
                    <div className={styles.cell}>Название</div>
                    <div className={styles.cell}>Friendly</div>
                    <div className={styles.cell}>Действия</div>
                </div>

                {countries?.map(country => (
                    <div key={country.id} className={styles.row}>
                        <div className={styles.cell}>{country.title}</div>
                        <div className={styles.cell}>{country.friendly}</div>
                        <div className={styles.cell}>
                            <div className={styles.actions}>
                                <img 
                                className={styles.action_icon} 
                                src={editIcon} 
                                onClick={() => showAlert("создание")} />
                                <img className={styles.action_icon} src={deleteIcon} onClick={() => handleDelete(country.id)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CountryList

