import { useEffect } from 'react';
import { fetchColorImg, fetchProduct } from '../../../../entities/Product/api/ProductFetch';
import { postColorImg, postProduct, putProduct } from '../api/fetchCreate';
import { showAlert, showErr } from '../../../../shared/ui/customAlert/showAlert';
import type { NewProduct } from '../types/types';
import type { ColorItem } from '../types/types';

interface UseProductFormEffectsParams {
    id: string | undefined;
    newProduct: NewProduct;
    colorList: ColorItem[];
    shouldPost: boolean;
    setNewProduct: (product: NewProduct | ((prev: NewProduct) => NewProduct)) => void;
    setColorList: (colorList: ColorItem[]) => void;
    setSelectedColor: (colorId: string) => void;
    setShouldPost: (shouldPost: boolean) => void;
    resetForm: () => void;
}

/**
 * Хук для управления эффектами формы продукта:
 * - Загрузка продукта по ID при редактировании
 * - Сохранение продукта (создание или обновление)
 */
export const useProductFormEffects = ({
    id,
    newProduct,
    colorList,
    shouldPost,
    setNewProduct,
    setColorList,
    setSelectedColor,
    setShouldPost,
    resetForm,
}: UseProductFormEffectsParams) => {
    // Эффект для загрузки продукта по ID
    useEffect(() => {
        if (id) {
            console.log(id);
            fetchProduct(
                id,
                (product) => {
                    setNewProduct(() => ({
                        id: product.id,
                        article: product.article,
                        title: product.title,
                        brand: product.brand?.id,
                        category: product.category?.id,
                        country: product.country?.id,
                        width: product.width,
                        height: product.height,
                        depth: product.depth,
                        materials: product.materials?.map(m => m.id) ?? [],
                        colors: product.colors?.map(c => c.id) ?? [],
                        photos: product.photos ?? [],
                        seems: product.seems ?? [],
                        price: product.price,
                        description: product.description ?? ''
                    }));
                    if (product.colors.length != 0) {
                        Promise.all(
                            (product.colors ?? []).map(color => new Promise<string[]>((resolve) => {
                                fetchColorImg(
                                    color.id,
                                    product.id,
                                    (res) => resolve(res),
                                    () => resolve([])
                                )
                            }).then(images => ({ color, images })))
                        ).then(colorItems => {
                            setColorList(colorItems);
                        }).catch(() => {
                            setColorList([]);
                        })
                        setSelectedColor(product.colors[0].id)
                    }
                },
                (e) => {
                    showErr(e)
                }
            )
        }
    }, [id]);

    // Эффект для сохранения продукта
    useEffect(() => {
        console.log("effect")
        if (shouldPost) {
            if (id) {
                putProduct(newProduct,
                    () => {
                        colorList.map((item) => {
                            postColorImg(
                                item.color.id, item.images, newProduct.id,
                                () => {
                                    showAlert("Продукт изменен")
                                    // resetForm()
                                },
                                (e) => {
                                    showErr("Ошибка передачи фото" + e)
                                },
                                "put"
                            )
                        })
                    },
                    (e) => {
                        showErr("Ошибка:" + e)
                    })
            }
            else {
                postProduct(newProduct,
                    (id) => {
                        colorList.map((item) => {
                            if (!id) {
                                showAlert("Нет id товара")
                                return
                            }
                            postColorImg(item.color.id, item.images, id,
                                () => {
                                    showAlert("Продукт создан")
                                    resetForm()
                                },
                                (e) => {
                                    showAlert("Ошибка передачи фото" + e)
                                }
                            )
                        })
                    },
                    (e) => {
                        showErr("Ошибка:" + e)
                    })
            }
            setShouldPost(false)
        }
    }, [shouldPost]);
};

