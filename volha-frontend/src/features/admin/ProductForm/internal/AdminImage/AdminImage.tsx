import BASE_URL from '../../../../../shared/const/base_url'
import styles from './AdminImage.module.css'
import { deleteFile } from './api/delete'

interface IAdminImage {
    src: string,
    onDelete: (filename: string) => void
}
const AdminImage = ({ src, onDelete }: IAdminImage) => {
    const handleDeleteClick = () => {
        deleteFile(src, () => alert("Файл удален"), (e) => alert(e))
        onDelete(src)
    }

    return (
        <div className={styles.image_container}>
            <img src={`${BASE_URL}images/${src}`} className={styles.img} />
            <div className={styles.delete_area}>
                <div className={styles.delete} onClick={handleDeleteClick}>
                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_728_1720)">
                            <path fill="var(--red)" d="M5.75 18.2083C5.75 19.2625 6.6125 20.125 7.66667 20.125H15.3333C16.3875 20.125 17.25 19.2625 17.25 18.2083V6.70833H5.75V18.2083ZM8.1075 11.385L9.45875 10.0338L11.5 12.0654L13.5317 10.0338L14.8829 11.385L12.8513 13.4167L14.8829 15.4483L13.5317 16.7996L11.5 14.7679L9.46833 16.7996L8.11708 15.4483L10.1488 13.4167L8.1075 11.385ZM14.8542 3.83333L13.8958 2.875H9.10417L8.14583 3.83333H4.79167V5.75H18.2083V3.83333H14.8542Z" />
                        </g>
                    </svg>

                </div>
            </div>
        </div>
    )
}

export default AdminImage