
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import MainLayout from './Layout/MainLayout'
import AdminLayout from './Layout/AdminLayout'
import Admin_Home from './Pages/Admin/Home'
import AboutPage from './Pages/Main/AboutPage'
import MainPage from './Pages/Main/MainPage'
import BrandPage from './Pages/Admin/Brands/Index'


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
          <Route path="/admin/brands" element={<BrandPage />} />
        </Route>

        {/* صفحه بدون layout */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
