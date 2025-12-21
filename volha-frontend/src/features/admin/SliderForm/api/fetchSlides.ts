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
}


export const postSlide = async (
    slide: Slide,
    onSuccess: (id: string) => void,
    onError: (err: string) => void
) => {
    fetch(`${BASE_URL}api/slide`, {
        method: 'POST',
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
                    case 409:
                        onError('Уже существует');
                        break;
                    case 502:
                        onError('Ошибка сервера');
                        break;
                }
            }
        })
}


