import BASE_URL from "../../../../shared/const/base_url";

export const fetchDeleteCountry = async (
    id: string,
    onSuccess: () => void,
    onError: (err: string) => void
) => {
    fetch(`${BASE_URL}api/country?id=${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => response.status)
        .then(status => {
            switch (status) {
                case 200:
                    onSuccess();
                    break;
                case 400:
                    onError('Неправильные данные');
                    break;
                case 404:
                    onError("Неправильный адрес")
                    break;
                case 500:
                    onError('Ошибка сервера 500');
                    break;
                case 502:
                    onError('Страна привязана к существующему товару. Удалите товар и повторите снова');
                    break;
            }
        })
        .catch(err => {
            console.error("Ошибка сети:", err);
            onError("Ошибка сети");
        })
}

