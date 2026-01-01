import BASE_URL from "../../../shared/const/base_url";
import type { Message } from "../ui/Feedback";

export const sendFeedback = async (
    data: Message,
    onSuccess: () => void,
    onError: (error: string) => void
) => {
    fetch(`${BASE_URL}api/message`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            html: `имя:${data.name}, email: ${data.email}, text: ${data.text}`,
            recipient_email: "redgreeenblue2@gmail.com",
            recipient_name: "сюда любое имя хз как работает",
            subject: `заявка (на цену) от ${data.name}`,
            text: data.text,
        })
    })
        .then(async response => response.status)
        .then(status => {
            switch (status) {
                case 200:
                    onSuccess();
                    break;
                case 400:
                    onError("Неправильные данные")
                    break;
                case 404:
                    onError("Неправильный адрес")
                    break;
                case 500:
                    onError("Ошибка сервера 500")
                    break;
                case 502:
                    onError("Ошибка сервера 502")
                    break;
            }
        })
        .catch(err => {
            console.error("Ошибка сети:", err);
            onError("Ошибка сети");
        })

}