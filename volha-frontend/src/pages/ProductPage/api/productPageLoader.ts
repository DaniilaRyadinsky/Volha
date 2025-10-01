import type { Product } from "../../../entities/Product/types/ProductTypes";
import BASE_URL from "../../../shared/const/base_url";

export const productPageLoader = async ({ params }: { params: any }) => {
  const { id } = params;
  
  const res = await fetch(`${BASE_URL}product/search?query=${id}`);
  if (!res.ok) throw new Error('Product not found');
  
  const product = await res.json();
  console.log(product)
  
  return {
    product,
    breadcrumb: product[0].title
  };
};

