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
                    onError('Страна привязана к существующему товару. Удалите товар и повторите снова');
            }
        })
}