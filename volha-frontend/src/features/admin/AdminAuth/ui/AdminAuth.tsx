import { useState } from 'react'
import FormInput from '../../ProductForm/internal/inputs/FormInput/FormInput'
import { Button } from '../../../../shared/ui/Button/Button'
import styles from './AdminAuth.module.css'
import { useNavigate } from 'react-router-dom'

const AdminAuth = () => {
    const [password, setPassword] = useState('')
    const [error, setError] = useState<"empty" | "limit" | undefined>(undefined)

    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <h1>Админка</h1>
                <FormInput
                    type='password'
                    placeholder='Пароль'
                    defaultValue={password}
                    onChange={setPassword}
                    isErr={false}
                    setErrors={setError} />

                <Button onClick={() => {navigate("/admin/product/all") }}>Войти</Button>
            </div>
        </div>
    )
}

export default AdminAuth