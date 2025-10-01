import { useState } from 'react'
import styles from './Search.module.css'
import search from '../../../shared/assets/icons/search.svg'
const Search = () => {
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div className={styles.search_container}>
            <input 
            className={styles.input} 
            type="text" 
            value={searchQuery} 
            placeholder='Поиск по товарам' 
            onChange={(e) => setSearchQuery(e.target.value)} />
            <img src={search} className={styles.icon}/>
        </div>
    )
}

export default Search