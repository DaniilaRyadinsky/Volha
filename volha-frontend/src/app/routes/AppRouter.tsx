import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import Layout from "../layout/Layout"
import Contacts from "../../pages/Contacts/Contacts"
import Catalog from "../../pages/Catalog/Catalog"
import AdminPage from "../../pages/Admin/AdminPage"
import ProductPage from "../../pages/ProductPage/ProductPage"


const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Layout />}>
                    <Route path="" element={<Navigate to="/catalog" replace />} />
                    <Route path="main" element={<h2>Главная</h2>} />
                    <Route path="catalog">
                        <Route index element={<Catalog />} />
                        <Route path="category/:uri"  >
                            <Route index element={<Catalog />} />
                            <Route path="product/:id" element={<ProductPage />} />
                        </Route>
                        <Route path="product/:id" element={<ProductPage />} />
                    </Route>
                    <Route path="contacts" element={<Contacts />} />
                    <Route path="about" element={<h2>О компании</h2>} />
                    <Route path="*" element={<h2>Не потерялся?</h2>} />
                </Route>
                <Route path="admin" element={<AdminPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter