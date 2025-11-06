import BASE_URL from "../../../../../../shared/const/base_url"

export const deleteFile = async (
    file: string,
    onSuccess: () => void,
    onError: (err: string) => void
) => {
    fetch(`${BASE_URL}api/files/delete?title=${file}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.status)
    .then(status => {
        switch (status) {
                case 200:
                    onSuccess();
                    break;
                case 400:
                    onError("Неправильные данные")
                    break;
                case 500:
                    onError("Ошибка сервера 500")
                    break;
            }
        })
        .catch(err => {
            console.error("Ошибка сети:", err);
            onError("Ошибка сети");
        })
}