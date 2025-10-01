import { Navigate, createBrowserRouter, RouterProvider, Outlet } from "react-router"
import Layout from "../layout/Layout"
import Contacts from "../../pages/Contacts/Contacts"
import Catalog from "../../pages/Catalog/Catalog"
import AdminPage from "../../pages/Admin/AdminPage"
import ProductPage from "../../pages/ProductPage/ProductPage"
import { productPageLoader } from "../../pages/ProductPage/api/productPageLoader"
import { useQueryClient } from "@tanstack/react-query"
import type { Category } from "../../entities/Product/types/ProductTypes"


const getCategoryCrumb = (_data: any, params: any) => {
    const queryClient = useQueryClient();
    const categories = queryClient.getQueryData<Category[]>(['categories']) ?? [];

    const category = categories.find(c => c.uri === params.uri);

    return category ? category.title : decodeURIComponent(params.uri ?? "Категория");
}

const getProductCrumb = (data: any) => data?.breadcrumb || "Товар"

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
                            crumb: getCategoryCrumb
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

    { path: "admin", element: <AdminPage /> }
]);

const AppRouter = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default AppRouter