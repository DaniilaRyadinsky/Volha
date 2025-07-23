import { BrowserRouter, Routes, Route } from "react-router"
import Layout from "../layout/Layout"
import Contacts from "../../pages/Contacts/Contacts"
import Catalog from "../../pages/Catalog/Catalog"


const AppRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="main" element={<h2>Главная</h2>} />
                        <Route path="catalog/*" element={<Catalog/>} />
                        <Route path="contacts" element={<Contacts />} />
                        <Route path="about" element={<h2>О компании</h2>} />
                        <Route path="*" element={<h2>Не потерялся?</h2>} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default AppRouter