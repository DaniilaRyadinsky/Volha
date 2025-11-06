export type Color = {
    id: string,
    name: string,
    hex: string
}

export type Category = {
    id: string,
    img: string,
    title: string,
    uri: string
}

export type Brand = {
    id: string,
    name: string
}

export type Country = {
    id: string,
    title: string,
    friendly: string
}

export type Material = {
    id: string,
    title: string
}

export type Product = {
    id: string,
    article: string,
    title: string,
    brand?: Brand,
    category?: Category,
    country?: Country,
    width: number,
    height: number,
    depth: number,
    materials: Material[],
    colors: Color[],
    photos: string[],
    seems: string[],
    price: number,
    description: string
}