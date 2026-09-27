import { useRoutes } from "react-router-dom";

import MainLayout from "../../Layout/MainLayout";
import AboutPage from "../../Pages/Main/AboutPage";
import MainPage from "../../Pages/Main/MainPage";

export default function MainRoutes() {
  return useRoutes([
    {
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <AboutPage />,
        },
        {
          path: "/about",
          element: <MainPage />,
        },
      ],
    },
  ]);
}
