import type { Brand, Category, Color, Country, Material } from "../../../../entities/Product/types/ProductTypes";
import BASE_URL from "../../../../shared/const/base_url"
import type { NewProduct } from "../types/types";


const postTable = async (
    table: "brand" | "category" | "material" | "country" | "product" | "color",
    data: Brand | Category | Material | Country | NewProduct | Color,
    onSuccess: (id: string) => void,
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
    onSuccess: (id: string) => void,
    onError: (err: string) => void
) => {
    return postTable("brand", data, onSuccess, onError)
}

export const postCategory = async (
    data: Category,
    onSuccess: (id: string) => void,
    onError: (err: string) => void
) => {
    return postTable("category", data, onSuccess, onError)
}

export const postMaterial = async (
    data: Material,
    onSuccess: (id: string) => void,
    onError: (err: string) => void
) => {
    return postTable("material", data, onSuccess, onError)
}

export const postCountry = async (
    data: Country,
    onSuccess: (id: string) => void,
    onError: (err: string) => void
) => {
    return postTable("country", data, onSuccess, onError)
}


export const postProduct = async (
    data: NewProduct,
    onSuccess: (id: string) => void,
    onError: (err: string) => void
) => {
    return postTable("product", data, onSuccess, onError)
}

export const postColor = async (
    data: Color,
    onSuccess: (id: string) => void,
    onError: (err: string) => void
) => {
    return postTable("color", data, onSuccess, onError)
}


export const postColorImg = async (
    color_id: string,
    photos: string[],
    product_id: string,
    onSuccess: () => void,
    onError: (err: string) => void,
    mode?: "post" | "put"
) => {
    fetch(`${BASE_URL}api/productcolorphotos/create`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ color_id, photos, product_id })
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
                    if (mode === "put")
                        return putColorImg(
                            color_id,
                            photos,
                            product_id,
                            onSuccess,
                            onError
                        )
                    onError("Ошибка сервера 502")

            }
        })
        .catch(err => {
            console.error("Ошибка сети:", err);
            onError("Ошибка сети");
        })
}


export const putTable= async (
    table: "brand" | "category" | "material" | "country" | "product" | "color",
    data: Brand | Category | Material | Country | NewProduct | Color,
    onSuccess: () => void,
    onError: (err: string) => void
) => {
    fetch(`${BASE_URL}api/${table}/update?id=${data.id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(res => res.status)
        .then(status => {
            switch (status) {
                case 200:
                    onSuccess();
                    break
                case 400:
                    throw new Error("Неверные данные")
                case 500:
                    throw new Error("Ошибка на сервере")
                case 502:
                    throw new Error("Неверный ID")
            }
        })
        .catch((e) => {
            onError(e.error)
        })
}

export const putProduct = async (
    data: NewProduct,
    onSuccess: () => void,
    onError: (e: string) => void
) => {
    return putTable("product", data, onSuccess, onError)
}

export const putBrand = async (
    data: Brand,
    onSuccess: () => void,
    onError: (e: string) => void
) => {
    return putTable("brand", data, onSuccess, onError)
}

export const putCategory = async (
    data: Category,
    onSuccess: () => void,
    onError: (e: string) => void
) => {
    return putTable("category", data, onSuccess, onError)
}

export const putColor = async (
    data: Color,
    onSuccess: () => void,
    onError: (e: string) => void
) => {
    return putTable("color", data, onSuccess, onError)
}

export const putCountry = async (
    data: Country,
    onSuccess: () => void,
    onError: (e: string) => void
) => {
    return putTable("country", data, onSuccess, onError)
}

export const putMaterial = async (
    data: Material,
    onSuccess: () => void,
    onError: (e: string) => void
) => {
    return putTable("material", data, onSuccess, onError)
}

export const putColorImg = async (
    color_id: string,
    photos: string[],
    product_id: string,
    onSuccess: () => void,
    onError: (err: string) => void
) => {
    fetch(`${BASE_URL}api/productcolorphotos/update`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ color_id, photos, product_id })
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