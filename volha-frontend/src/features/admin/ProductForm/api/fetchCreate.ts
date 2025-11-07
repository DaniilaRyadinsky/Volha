import type { Brand, Category, Country, Material } from "../../../../entities/Product/types/ProductTypes";
import BASE_URL from "../../../../shared/const/base_url"
import type { NewProduct } from "../types/types";


const postTable = async (
    table: "brand" | "category" | "material" | "country" | "product",
    data: Brand | Category | Material | Country | NewProduct,
    onSuccess: (id?: string) => void,
    onError: (err: string) => void
) => {
    fetch(`${BASE_URL}api/${table}/create`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(async response => {
            const status = response.status;
            if (status === 200) {
                const json = await response.json();
                const id = json.id;
                onSuccess(id);
            } else {
                switch (status) {
                    case 400:
                        onError("Неправильные данные")
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
        .catch(err => {
            console.error("Ошибка сети:", err);
            onError("Ошибка сети");
        })
}

export const postBrand = async (
    data: Brand,
    onSuccess: () => void,
    onError: (err: string) => void
) => {
    return postTable("brand", data, onSuccess, onError)
}

export const postCategory = async (
    data: Category,
    onSuccess: () => void,
    onError: (err: string) => void
) => {
    return postTable("category", data, onSuccess, onError)
}

export const postMaterial = async (
    data: Material,
    onSuccess: () => void,
    onError: (err: string) => void
) => {
    return postTable("material", data, onSuccess, onError)
}

export const postCountry = async (
    data: Country,
    onSuccess: () => void,
    onError: (err: string) => void
) => {
    return postTable("country", data, onSuccess, onError)
}


export const postProduct = async (
    data: NewProduct,
    onSuccess: (id?: string) => void,
    onError: (err: string) => void
) => {
    return postTable("product", data, onSuccess, onError)
}


export const postColorImg = async (
    color_id: string,
    photos: string[],
    product_id: string,
    onSuccess: () => void,
    onError: (err: string) => void
) => {
    fetch(`${BASE_URL}api/productcolorphotos/create`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({color_id, photos, product_id})
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
                case 500:
                    onError("Ошибка сервера 500")
                    break;
                case 502:
                    onError("Ошибка сервера 502")

            }
        })
        .catch(err => {
            console.error("Ошибка сети:", err);
            onError("Ошибка сети");
        })
}
