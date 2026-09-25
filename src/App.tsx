
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import MainLayout from './Layout/MainLayout'
import AdminLayout from './Layout/AdminLayout'
import Admin_Home from './Pages/Admin/Home'
import AboutPage from './Pages/Main/AboutPage'
import MainPage from './Pages/Main/MainPage'
import ListBrandPage from './Pages/Admin/Brands/ListBrandPage'
import CreateBrandPage from './Pages/Admin/Brands/CreateBrandPage'
import EditBrandPage from './Pages/Admin/Brands/EditBrandPage'
import ListCategoriesPage from './Pages/Admin/Categories/Index'
import EditCategoryPage from './Pages/Admin/Categories/edit'
import CreateCategoryPage from './Pages/Admin/Categories/create'


 function App() {


  return (
  <BrowserRouter>
      <Routes>
        {/* صفحه‌هایی با layout اصلی */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<AboutPage />} />
          <Route path="/about" element={<MainPage />} />
        </Route>

        {/* صفحه‌هایی با layout پنل */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin_Home />} />
          <Route path="/admin/brands/create" element={<CreateBrandPage />} />
          <Route path="/admin/brands" element={<ListBrandPage />} />
          <Route path="/admin/brands/edit/:id"element={<EditBrandPage />}/>

          <Route path="/admin/category" element={<ListCategoriesPage />} />
          <Route path="/admin/category/create" element={<CreateCategoryPage />} />
          <Route path="/admin/category/edit/:id"element={<EditCategoryPage />}/>
        </Route>

        {/* صفحه بدون layout */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
