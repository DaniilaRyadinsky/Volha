import BASE_URL from "../../../shared/const/base_url";

export const fetchColorImg = async(
    color_id: string,
    product_id: string,
    onSuccess: (data: string[]) => void,
    onError: (e: string) => void
) => {
    fetch(`${BASE_URL}api/productcolorphotos/getphotos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({color_id, product_id})
    })
    .then(response => {
        const status = response.status;
        switch (status) {
            case 200:
                return response.json().then(data => {
                    onSuccess(data);
                });
            case 400:
                onError('Неправильные данные');
                break;
            case 500:
                onError('Ошибка сервера 500');
                break;
            case 502:
                onError('Ошибка сервера 502');
                break;
        }
    })
}