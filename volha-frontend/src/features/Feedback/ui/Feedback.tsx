import { useState } from 'react'
import Input from '../../../shared/ui/Input/TextInput'
import styles from './Feedback.module.css'
import { Button } from '../../../shared/ui/Button/Button'
import Textarea from '../../../shared/ui/Textarea/Textarea'
import { sendFeedback } from '../api/sendFeedback'
import { showAlert, showErr } from '../../../shared/ui/customAlert/showAlert'

export type Message = {
  name: string,
  email: string,
  text: string,
  subject: string
}

const Feedback = ({ subject = '', closeCallback }: { subject?: string, closeCallback?: () => void }) => {


  const [feed, setFeed] = useState<Message>({ name: '', email: '', text: '', subject: subject })

  const handleClick = () => {
    sendFeedback(feed,
      () => {
        showAlert("Сообщение отправлено")
        closeCallback && closeCallback()
      },
      (error) => {
        showErr(`Ошибка: ${error}`)
      }
    )
  }

  return (
    <>
      <h2 className={styles.info_title}>Оставить заявку</h2>
      <div className={styles.feedback_container}>
        <Input type="text" placeholder='Тема' value={feed.subject} onChange={(e) => setFeed((prev) => ({ ...prev, subject: e }))} />
        <Input type="name" placeholder='Фамилия, имя и отчество' value={feed.name} onChange={(e) => setFeed((prev) => ({ ...prev, name: e }))} />
        <Input type="email" placeholder='E-mail' value={feed.email} onChange={(e) => setFeed((prev) => ({ ...prev, email: e }))} />
        <Textarea style={{ height: "150px" }} placeholder='Сообщение' value={feed.text} onChange={(e) => setFeed((prev) => ({ ...prev, text: e }))} />
        <Button onClick={() => handleClick()}>Отправить</Button>
      </div>
    </>
  )
}

export default Feedback