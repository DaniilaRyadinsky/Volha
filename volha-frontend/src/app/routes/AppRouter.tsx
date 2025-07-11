import { BrowserRouter, Routes, Route } from "react-router"
import Layout from "../layout/Layout"
import Contacts from "../../pages/Contacts/Contacts"


const AppRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="main" element={<h2>Главная</h2>} />
                        <Route path="catalog" element={<h2>Каталог</h2>} />

                        <Route path="contacts" element={<Contacts />} />
                        <Route path="about" element={<h2>О компании</h2>} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default AppRouter