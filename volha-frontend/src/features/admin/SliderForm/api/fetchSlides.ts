import BASE_URL from "../../../../shared/const/base_url";
import type { Slide } from "../../../MainSlider/MainSlider";

export const getAllSLides = async (
    onSuccess: (slides: Slide[]) => void,
    onError: (err: string) => void
) => {
    fetch(`${BASE_URL}api/slide/all`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(async response => {
            const status = response.status
            if (status === 200) {
                const json = await response.json();
                onSuccess(json);
            } else {
                if (status == 502)
                    onError('Ошибка сервера');
            }
        })
        .catch(err => {
            console.error("Ошибка сети:", err);
            onError("Ошибка сети");
        })
}


export const postSlide = async (
    mode: 'POST' | 'PUT',
    slide: Slide,
    onSuccess: (id: string) => void,
    onError: (err: string) => void
) => {
    fetch(`${BASE_URL}api/slide`, {
        method: mode,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slide)
    })
        .then(async response => {
            const status = response.status
            if (status === 200) {
                const json = await response.json();
                onSuccess(json.id);
            } else {
                switch (status) {
                    case 400:
                        onError('Неправильный ввод');
                        break;
                    case 404:
                        onError("Неправильный адрес")
                        break;
                    case 409:
                        onError('Уже существует');
                        break;
                    case 502:
                        onError('Ошибка сервера');
                        break;
                }
            }
        })
        .catch(err => {
            console.error("Ошибка сети:", err);
            onError("Ошибка сети");
        })
}


export const deleteSlide = async (
    id: string,
    onSuccess: () => void,
    onError: (err: string) => void
) => {
    fetch(`${BASE_URL}api/slide?id=${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(async response => response.status)
        .then(status => {
            switch (status) {
                case 200:
                    onSuccess();
                    break;
                case 400:
                    onError('Неправильный ввод');
                    break;
                case 404:
                    onError("Неправильный адрес")
                    break;
                case 409:
                    onError('Уже существует');
                    break;
                case 502:
                    onError('Ошибка сервера');
                    break;
            }
        })
        .catch(err => {
            console.error("Ошибка сети:", err);
            onError("Ошибка сети");
        })
}


