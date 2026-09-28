import { useRoutes } from "react-router-dom";

import AdminRoute from "./AdminRoute";
import AdminLayout from "../../Layout/AdminLayout";
import Admin_Home from "../../Pages/Admin/Home";

import ListBrandPage from "../../Pages/Admin/Brands";
import CreateBrandPage from "../../Pages/Admin/Brands/create";
import EditBrandPage from "../../Pages/Admin/Brands/edit";

import ListCategoriesPage from "../../Pages/Admin/Categories/Index";
import CreateCategoryPage from "../../Pages/Admin/Categories/create";
import EditCategoryPage from "../../Pages/Admin/Categories/edit";

import ListColorsPage from "../../Pages/Admin/Colors/Index";
import CreateColorPage from "../../Pages/Admin/Colors/create";
import EditColorPage from "../../Pages/Admin/Colors/edit";

import BannerIndexPage from "../../Pages/Admin/Banner/Index";
import CreateBannerPage from "../../Pages/Admin/Banner/create";
import EditBannerPage from "../../Pages/Admin/Banner/edit";

import ListProductFeaturesPage from "../../Pages/Admin/ProductFeatures/Index";
import CreateProductFeaturePage from "../../Pages/Admin/ProductFeatures/create";
import EditProductFeaturePage from "../../Pages/Admin/ProductFeatures/edit";
import ListFeaturesCategoriesPage from "../../Pages/Admin/features-category/Index";
import EditFeaturesCategoryPage from "../../Pages/Admin/features-category/edit";
import CreateFeaturesCategoryPage from "../../Pages/Admin/features-category/create";
import EditProductPage from "../../Pages/Admin/Products/edit";
import CreateProductPage from "../../Pages/Admin/Products/create";
import ProductIndexPage from "../../Pages/Admin/Products";

export default function AdminRoutes() {
  return useRoutes([
    {
      element: <AdminRoute />,
      children: [
        {
          element: <AdminLayout />,
          children: [
            {
              index: true,
              element: <Admin_Home />,
            },

            // Brands
            {
              path: "brands",
              children: [
                {
                  index: true,
                  element: <ListBrandPage />,
                },
                {
                  path: "create",
                  element: <CreateBrandPage />,
                },
                {
                  path: "edit/:id",
                  element: <EditBrandPage />,
                },
              ],
            },

            // Categories
            {
              path: "category",
              children: [
                {
                  index: true,
                  element: <ListCategoriesPage />,
                },
                {
                  path: "create",
                  element: <CreateCategoryPage />,
                },
                {
                  path: "edit/:id",
                  element: <EditCategoryPage />,
                },
              ],
            },

            // Colors
            {
              path: "color",
              children: [
                {
                  index: true,
                  element: <ListColorsPage />,
                },
                {
                  path: "create",
                  element: <CreateColorPage />,
                },
                {
                  path: "edit/:id",
                  element: <EditColorPage />,
                },
              ],
            },

            // Banners
            {
              path: "banners",
              children: [
                {
                  index: true,
                  element: <BannerIndexPage />,
                },
                {
                  path: "create",
                  element: <CreateBannerPage />,
                },
                {
                  path: "edit/:id",
                  element: <EditBannerPage />,
                },
              ],
            },

            // Product Features
            {
              path: "features-categories",
              children: [
                {
                  index: true,
                  element: <ListFeaturesCategoriesPage />,
                },
                {
                  path: "create",
                  element: <CreateFeaturesCategoryPage />,
                },
                {
                  path: "edit/:id",
                  element: <EditFeaturesCategoryPage />,
                },
              ],
            },

            // Product Features
            {
              path: "product-features",
              children: [
                {
                  index: true,
                  element: <ListProductFeaturesPage />,
                },
                {
                  path: "create",
                  element: <CreateProductFeaturePage />,
                },
                {
                  path: "edit/:id",
                  element: <EditProductFeaturePage />,
                },
              ],
            },

            {
              path: "products",
              children: [
                {
                  index: true,
                  element: <ProductIndexPage />,
                },
                {
                  path: "create",
                  element: <CreateProductPage />,
                },
                {
                  path: "edit/:id",
                  element: <EditProductPage />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);
}
