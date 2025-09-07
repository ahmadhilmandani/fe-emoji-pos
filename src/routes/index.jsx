import { createBrowserRouter } from "react-router";
import LoginIndex from "../pages/Login/Index";
import RegisterStoreIndex from "../pages/Register/Store/Index";
import MainLayout from "../layouts/MainLayout";
import ProductIndex from "../pages/Product/Index";
import ProductAdd from "../pages/Product/Add";
import SupplierIndex from "../pages/Supplier/Index";
import SupplierAdd from "../pages/Supplier/Add";
import EmployeeIndex from "../pages/Employee/Index";
import EmployeeAdd from "../pages/Employee/Add";

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
      {
        path: 'supplier',
        element: <SupplierIndex />
      },
      {
        path: 'supplier/add',
        element: <SupplierAdd />
      },
      {
        path: 'employee',
        element: <EmployeeIndex />
      },
      {
        path: 'employee/add',
        element: <EmployeeAdd />
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
