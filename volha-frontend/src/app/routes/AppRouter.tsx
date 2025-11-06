import { Navigate, createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import Layout from "../layout/Layout"
import Contacts from "../../pages/Contacts/Contacts"
import Catalog from "../../pages/Catalog/Catalog"
import ProductPage from "../../pages/ProductPage/ProductPage"
import { productPageLoader } from "../../pages/ProductPage/api/productPageLoader"
import { useQueryClient } from "@tanstack/react-query"
import type { Category, Product } from "../../entities/Product/types/ProductTypes"
import AdminLayout from "../../features/admin/AdminLayout/ui/AdminLayout"
import { ProductForm } from "../../features/admin/ProductForm/ui/ProductForm"
import ProductList from "../../features/admin/ProductList/ui/ProductList"


const useCategoryCrumb = (_data: Category & {breadcrumb: string}, params: Category) => {
    const queryClient = useQueryClient();
    const categories = queryClient.getQueryData<Category[]>(['categories']) ?? [];

    const category = categories.find(c => c.uri === params.uri);

    return category ? category.title : decodeURIComponent(params.uri ?? "Категория");
}

const getProductCrumb = (data: Product & {breadcrumb: string}) => data?.breadcrumb || "Товар"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        handle: { crumb: "Главная" },
        children: [
            { index: true, element: <Navigate to="/catalog" replace /> },

            {
                path: "catalog",
                element: <Outlet />,
                handle: { crumb: "Каталог" },
                children: [
                    { index: true, element: <Catalog /> },
                    {
                        path: "category/:uri",
                        element: <Outlet />,
                        handle: {
                            crumb: useCategoryCrumb
                        },
                        children: [
                            { index: true, element: <Catalog /> },

                            {
                                path: "product/:id/:title",
                                element: <ProductPage />,
                                loader: productPageLoader,
                                handle: {
                                    crumb: getProductCrumb
                                }
                            }
                        ]
                    },
                    {
                        path: "product/:id/:title",
                        element: <ProductPage />,
                        loader: productPageLoader,
                        handle: {
                            crumb: getProductCrumb
                        }
                    }
                ]
            },

            {
                path: "product/:id/:title",
                element: <ProductPage />,
                loader: productPageLoader,
                handle: {
                    crumb: getProductCrumb
                }
            },

            { path: "contacts", element: <Contacts />, handle: { crumb: "Контакты" } },
            { path: "about", element: <h2>О компании</h2>, handle: { crumb: "О компании" } },
            { path: "*", element: <h2>Не потерялся?</h2> }
        ]
    },

    {
        path: "admin",
        element: <AdminLayout />,
        children: [
            { index: true, element: <ProductForm /> },
            {
                path: "product/all",
                element: <ProductList />
            },
            {
                path: "product/new",
                element: <ProductForm />
            },
            {
                path: "product/:id/edit",
                element: <ProductForm />
            },

        ]
    }
]);

const AppRouter = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default AppRouter