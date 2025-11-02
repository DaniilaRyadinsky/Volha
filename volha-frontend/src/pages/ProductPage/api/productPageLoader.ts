import type { Product } from "../../../entities/Product/types/ProductTypes";
import BASE_URL from "../../../shared/const/base_url";

export const productPageLoader = async ({ params }: { params: any }) => {
  const { id } = params;

  const res = await fetch(`${BASE_URL}api/product/get?id=${id}`);
  if (!res.ok) throw new Error('Product not found');

  const product: Product = await res.json();

  return {
    product,
    breadcrumb: product.title
  };
};

