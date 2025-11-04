import { useId, useState } from 'react'
import styles from './FileUpload.module.css'
import { uploadFile } from './api/upload'
import { ClipLoader } from 'react-spinners'
import upload from '../../../shared/assets/icons/upload_file.svg'


interface IFileUpload {
    callback: (filename: string) => void
}
const FileUpload = ({ callback }: IFileUpload) => {
    const id = useId()
    const [isLoading, setIsLoading] = useState(false)

    const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (file) {
            setIsLoading(true)
            uploadFile(
                file,
                (e) => { console.log(e); callback(e.name)},
                (e) => { console.log(e) }
            )
            setIsLoading(false)
            
        }
    }

    if (isLoading)
        return <div className={styles.upload_container}>
            <ClipLoader loading size={30} cssOverride={{ color: 'var(--main)' }} />
        </div>

    return (
        <div className={styles.upload_container}>
            <label htmlFor={id} className={styles.upload_label} >
                <img src={upload} className={styles.upload_img} />
                <p className={styles.upload_text}>Загрузить фото</p>
                <input
                    style={{ display: "none" }}
                    type='file' id={id}
                    accept="image/*"
                    onChange={handleUploadImage} />
            </label>

        </div>
    )
}

export default FileUpload