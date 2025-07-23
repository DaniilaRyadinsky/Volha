import { useState } from 'react'
import Input from '../../../shared/ui/Input/Input'
import styles from './Feedback.module.css'
import { Button } from '../../../shared/ui/Button/Button'
import Textarea from '../../../shared/ui/Textarea/Textarea'

const Feedback = () => {
  type message = {
    name: string,
    email: string,
    text: string
  }

  const [feed, setFeed] = useState<message>({ name: '', email: '', text: '' })

  return (
    <div className={styles.feedback_container}>
      <Input type="name" placeholder='Фамилия, имя и отчество' value={feed.name} onChange={(e) => setFeed((prev) => ({ ...prev, name: e.target.value }))} />
      <Input type="email" placeholder='E-mail' value={feed.email} onChange={(e) => setFeed((prev) => ({ ...prev, email: e.target.value }))} />
      <Textarea style={{height: "150px"}} placeholder='Сообщение' value={feed.text} onChange={(e) => setFeed((prev) => ({ ...prev, text: e.target.value }))} />
      <Button onClick={()=>console.log('click')}>Отправить</Button>
    </div>
  )
}

export default Feedback