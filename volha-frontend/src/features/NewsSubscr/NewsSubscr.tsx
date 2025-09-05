import { useState } from 'react'
import Input from '../../shared/ui/Input/Input'
import styles from './NewsSubscr.module.css'
import { Button } from '../../shared/ui/Button/Button'
import clsx from 'clsx'



const NewsSubscr = () => {
    const [email, setEmail] = useState('')
    

    return (
        <div className={styles.container}> 
            <Input type='email' style={{minWidth: "235px", maxWidth: '295px'}} value={email} onChange={(e) => setEmail(e.target.value)} placeholder='E-mail' />
            <Button mode='primary_container' onClick={() => console.log('click')}>Подписаться</Button>
        </div>
    )
}

export default NewsSubscr