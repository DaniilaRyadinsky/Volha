import { useId, useState } from 'react'
import styles from './FileUpload.module.css'
import { uploadFile } from './api/upload'

const FileUpload = () => {
    const id = useId()
    const [isLoading, setIsLoading] = useState(false)

    const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (file) {
            setIsLoading(true)
            uploadFile(
                file,
                (e) => { console.log(e) },
                (e) => { console.log(e) }
            )
            setIsLoading(false)
        }
    }

    return (
        <div>
            <label htmlFor={id}>
                <input type='file' id={id} accept="image/*" onChange={handleUploadImage} />
            </label>

        </div>
    )
}

export default FileUpload