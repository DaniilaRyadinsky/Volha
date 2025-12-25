import { useEffect } from 'react';
import { fetchColorImg, fetchProduct } from '../../../../entities/Product/api/ProductFetch';
import { postColorImg, postProduct, putProduct } from '../api/fetchCreate';
import { showAlert, showErr } from '../../../../shared/ui/customAlert/showAlert';
import type { NewProduct, ColorItem } from '../types/types';
import { useNavigate } from 'react-router-dom';

interface UseProductFormEffectsParams {
    id?: string;
    formRef: React.MutableRefObject<NewProduct>;
    colorListRef: React.MutableRefObject<ColorItem[]>;
    shouldPost: boolean;

    setNewProduct: (product: NewProduct) => void;
    setColorList: (colorList: ColorItem[]) => void;
    setSelectedColor: (colorId: string) => void;
    setShouldPost: (shouldPost: boolean) => void;
}

/**
 * Загрузка продукта по ID + сохранение (create/update).
 */
export const useProductFormEffects = ({
    id,
    formRef,
    colorListRef,
    shouldPost,
    setNewProduct,
    setColorList,
    setSelectedColor,
    setShouldPost
}: UseProductFormEffectsParams) => {
    const navigate = useNavigate();

    // Загрузка продукта при редактировании
    useEffect(() => {
        if (!id) return;

        fetchProduct(
            id,
            (product) => {
                setNewProduct({
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
                    seems: product.seems != null ? product.seems.map(s => s.id) : [],
                    price: product.price,
                    description: product.description ?? '',
                    is_favorite: product.is_favorite ?? false
                });

                const colors = product.colors ?? [];
                if (colors.length === 0) return;

                Promise.all(
                    colors.map(color =>
                        new Promise<string[]>((resolve) => {
                            fetchColorImg(
                                color.id,
                                product.id,
                                (res) => resolve(res),
                                () => resolve([])
                            );
                        }).then(images => ({ color, images }))
                    )
                )
                    .then(colorItems => {
                        setColorList(colorItems);
                        if (colorItems[0]) {
                            setSelectedColor(colorItems[0].color.id);
                        }
                    })
                    .catch(() => {
                        setColorList([]);
                    });
            },
            (e) => {
                showErr(e);
            }
        );
    }, [id]);

    // Сохранение продукта (create/update)
    useEffect(() => {
        if (!shouldPost) return;

        const product = formRef.current;
        const colorList = colorListRef.current;

        if (id) {
            console.log("update")
            // UPDATE
            putProduct(
                product,
                () => {
                    uploadAllColors(product.id, colorList, 'put')
                        .then(() => {
                            showAlert('Продукт изменен');
                            navigate('/admin/product/all');
                        })
                        .catch((e) => {
                            showErr('Ошибка передачи фото ' + e);
                        });
                },
                (e) => {
                    showErr('Ошибка: ' + e);
                }
            );
        } else {
            // CREATE
            postProduct(
                product,
                (createdId) => {
                    if (!createdId) {
                        showAlert('Нет id товара');
                        return;
                    }
                    console.log("create")
                    uploadAllColors(createdId, colorList, 'post')
                        .then(() => {
                            showAlert('Продукт создан');
                            navigate('/admin/product/all');
                        })
                        .catch((e) => {
                            showErr('Ошибка передачи фото ' + e);
                        });
                },
                (e) => {
                    showErr('Ошибка: ' + e);
                }
            );
        }

        setShouldPost(false);
    }, [shouldPost]);
};

/**
 * Загрузка всех картинок по цветам для товара.
 * mode: 'post' – создание, 'put' – обновление.
 */
const uploadAllColors = (
    productId: string,
    colorList: ColorItem[],
    mode: 'post' | 'put'
) =>
    Promise.all(
        colorList.map(
            (item) =>
                new Promise<void>((resolve, reject) => {
                    const maybeMethod = mode === 'put' ? 'put' : undefined;
                    console.log(maybeMethod)
                    postColorImg(
                        item.color.id,
                        item.images,
                        productId,
                        () => resolve(),
                        (e) => reject(e),
                        // в create старый код не передавал метод, поэтому даём undefined
                        maybeMethod
                    );
                })
        )
    );
