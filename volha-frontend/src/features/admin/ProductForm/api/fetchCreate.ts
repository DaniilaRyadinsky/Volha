import type { Brand, Category, Country, Material } from "../../../../entities/Product/types/ProductTypes";
import BASE_URL from "../../../../shared/const/base_url"


const postTable = async (
    table: "brand" | "category" | "material"| "country",
    data: Brand|Category|Material|Country,
    onSuccess: () => void,
    onError: (err: string) => void
) => {
    fetch(`${BASE_URL}api/${table}/create`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(response => response.status)
        .then(res => {
            switch (res) {
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
                    break;
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


