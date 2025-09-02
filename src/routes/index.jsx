import { createBrowserRouter } from "react-router";
import LoginIndex from "../pages/Login/Index";
import RegisterStoreIndex from "../pages/Register/Store/Index";
import MainLayout from "../layouts/MainLayout";
import ProductIndex from "../pages/Product/Index";
import ProductAdd from "../pages/Product/Add";

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        index: true,
        element: <ProductIndex />
      },
      {
        path: 'product',
        element: <ProductIndex />
      },
      {
        path: 'product/add',
        element: <ProductAdd />
      },
    ]
  },
  {
    path: "/login",
    Component: LoginIndex,
  },
  {
    path: "/register-store",
    Component: RegisterStoreIndex,
  },
]);
