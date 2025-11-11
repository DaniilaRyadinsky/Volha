import styles from './CountryList.module.css'
import editIcon from '../../../../shared/assets/icons/edit.svg'
import deleteIcon from '../../../../shared/assets/icons/delete_forever.svg'
import { ClipLoader } from 'react-spinners'
import { fetchDeleteCountry } from '../api/fetchDeleteCountry'
import { showAlert, showErr } from '../../../../shared/ui/customAlert/showAlert'
import { useAdminData } from '../../AdminLayout/lib/useAdminData'
import type { Country } from '../../../../entities/Product/types/ProductTypes'
import { useState } from 'react'
import CountryForm from '../../forms/CountryForm'
import Modal from '../../../../shared/ui/Modal/Modal'
import { Button } from '../../../../shared/ui/Button/Button'

const CountryList = () => {
    const { countries, isLoading, refetchCountries } = useAdminData()
    const [editCountry, setEditCountry] = useState<Country | undefined>(undefined);
    const [isModal, setIsModal] = useState(false)

    const handleDelete = (id: string) => {
        fetchDeleteCountry(id, () => {
            showAlert('Страна удалена');
            refetchCountries();
        }, (err) => {
            showErr(err);
        })
    }

    if (isLoading) {
        return <div><ClipLoader loading size={50} cssOverride={{ color: 'var(--main)' }} /></div>
    }

    return (
        <div>
            <div className={styles.title_container}>
                <h1 className={styles.title}>Все страны</h1>
                <Button onClick={() => setIsModal(true)}>Новая страна</Button>
            </div>

            <div className={styles.table}>
                <div className={styles.header}>
                    <div className={styles.cell}>Название</div>
                    <div className={styles.cell}>Friendly</div>
                    <div className={styles.cell}>Действия</div>
                </div>

                {countries?.map((country: Country) => (
                    <div key={country.id} className={styles.row}>
                        <div className={styles.cell}>{country.title}</div>
                        <div className={styles.cell}>{country.friendly}</div>
                        <div className={styles.cell}>
                            <div className={styles.actions}>
                                <img
                                    className={styles.action_icon}
                                    src={editIcon}
                                    onClick={() => setEditCountry(country)} />
                                <img className={styles.action_icon} src={deleteIcon} onClick={() => handleDelete(country.id)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {editCountry &&
                <Modal closeCallback={() => setEditCountry(undefined)}>
                    <CountryForm data={editCountry} closecallback={() => setEditCountry(undefined)} />
                </Modal>}

            {isModal &&
                <Modal closeCallback={() => setIsModal(false)}>
                    <CountryForm closecallback={() => setIsModal(false)} />
                </Modal>
            }
        </div>
    )
}

export default CountryList

