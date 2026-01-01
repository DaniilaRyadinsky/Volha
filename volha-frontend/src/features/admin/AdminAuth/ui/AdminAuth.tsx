import { useEffect, useState } from 'react'
import FormInput from '../../ProductForm/internal/inputs/FormInput/FormInput'
import { Button } from '../../../../shared/ui/Button/Button'
import styles from './AdminAuth.module.css'
import { useNavigate } from 'react-router-dom'
import { validatePassword } from '../api/validatePassword'

const AdminAuth = () => {
    const [password, setPassword] = useState('')
    const [error, setError] = useState<"empty" | "limit" | undefined>(undefined)

    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyPress = (event: Event) => {
            const keyEvent = event as unknown as KeyboardEvent
            if (keyEvent.key === 'Enter') {
                event.preventDefault()
                handleClick()
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [password]);

    const handleClick = () => {
        if (password === '') {
            setError("empty")
            return
        }
        else {
            // document.cookie =
            //     `admin_pw=${encodeURIComponent(password)}; path=/; SameSite=None; Secure`;
            validatePassword(password,
                () => {
                    navigate("/admin/product/all")
                },
                (e) => {
                    console.log(e)
                    if (e === "Неправильный пароль") {
                        setError("limit")
                    }
                }
            )
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <h1>Админка</h1>
                <FormInput
                    type='password'
                    placeholder='Пароль'
                    defaultValue={password}
                    onChange={setPassword}
                    isErr={error !== undefined}
                    setErrors={setError} />
                {error === "empty" && <p className={styles.error}>Введите пароль</p>}
                {error === "limit" && <p className={styles.error}>Неправильный пароль</p>}
                <Button onClick={() => handleClick()}>Войти</Button>
            </div>
        </div>
    )
}

export default AdminAuth