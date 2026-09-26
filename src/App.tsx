import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import MainLayout from "./Layout/MainLayout";
import AdminLayout from "./Layout/AdminLayout";
import Admin_Home from "./Pages/Admin/Home";
import AboutPage from "./Pages/Main/AboutPage";
import MainPage from "./Pages/Main/MainPage";
import ListBrandPage from "./Pages/Admin/Brands";
import CreateBrandPage from "./Pages/Admin/Brands/create";
import EditBrandPage from "./Pages/Admin/Brands/edit";
import ListCategoriesPage from "./Pages/Admin/Categories/Index";
import EditCategoryPage from "./Pages/Admin/Categories/edit";
import CreateCategoryPage from "./Pages/Admin/Categories/create";
import LoginPage from "./Pages/Account/LoginPage";
import ProtectedAdminRoute from "./Components/ProtectedAdminRoute";
import { RoleType } from "./Service/api/accounts/account.types";
import RoleRoute from "./Context/RoleRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* صفحه‌هایی با layout اصلی */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<AboutPage />} />
          <Route path="/about" element={<MainPage />} />
        </Route>
        {/* 
        <Route element={<ProtectedAdminRoute />}>

        </Route> */}

        <Route element={<RoleRoute roles={[RoleType.Admin]} />}>
          {/* صفحه‌هایی با layout پنل */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Admin_Home />} />
            <Route path="/admin/brands/create" element={<CreateBrandPage />} />
            <Route path="/admin/brands" element={<ListBrandPage />} />
            <Route path="/admin/brands/edit/:id" element={<EditBrandPage />} />

            <Route path="/admin/category" element={<ListCategoriesPage />} />
            <Route
              path="/admin/category/create"
              element={<CreateCategoryPage />}
            />
            <Route
              path="/admin/category/edit/:id"
              element={<EditCategoryPage />}
            />
          </Route>
        </Route>

        {/* صفحه بدون layout */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
