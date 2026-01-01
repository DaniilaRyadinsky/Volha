import BASE_URL from "../../../shared/const/base_url";
import type { Product } from "../types/ProductTypes";

export const fetchProduct = async (
    id: string,
    onSuccess: (res: Product) => void,
    onError: (err: string) => void
) => {
    fetch(`${BASE_URL}api/product?id=${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(async response => {
            const status = response.status;
            if (status === 200) {
                const json = await response.json();
                onSuccess(json);
            } else {
                switch (status) {
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
            }
        })
        .catch((e) => {
            onError(e.error)
        })
}


export const fetchColorImg = async (
    color_id: string,
    product_id: string,
    onSuccess: (data: string[]) => void,
    onError: (e: string) => void
) => {
    fetch(`${BASE_URL}api/colorphotos/photos/get`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ color_id, product_id })
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
                case 404:
                    onError("Неправильный адрес")
                    break;
                case 500:
                    onError('Ошибка сервера 500');
                    break;
                case 502:
                    onError('Ошибка сервера 502');
                    break;
            }
        })
        .catch(err => {
            console.error("Ошибка сети:", err);
            onError("Ошибка сети");
        })
}

export const productSearch = async (
    query: string,
    onSuccess: (res: Product[]) => void,
    onError: (e: string) => void
) => {
    fetch(`${BASE_URL}api/product/search?prompt=${query}&start=0&end=20`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => {
            const status = response.status;
            switch (status) {
                case 200:
                    return response.json().then(data => {
                        onSuccess(data.items);
                    });
                case 400:
                    onError('Неправильные данные');
                    break;
                case 404:
                    onError("Неправильный адрес")
                    break;
                case 502:
                    onError('Ошибка сервера 502');
                    break;
            }
        })
        .catch(err => {
            console.error("Ошибка сети:", err);
            onError("Ошибка сети");
        })
}