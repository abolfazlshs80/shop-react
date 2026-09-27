import { useRoutes } from "react-router-dom";

import LoginPage from "../Pages/Account/LoginPage";
import MainRoutes from "./Main/MainRoutes";
import AdminRoutes from "./Admin/AdminRoutes";

export default function AppRoutes() {
  return useRoutes([
    {
      path: "/login",
      element: <LoginPage />,
    },

    {
      path: "/*",
      element: <MainRoutes />,
    },

    {
      path: "/admin/*",
      element: <AdminRoutes />,
    },
  ]);
}
