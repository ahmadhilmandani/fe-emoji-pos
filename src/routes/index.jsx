import { createBrowserRouter } from "react-router";
import LoginIndex from "../pages/Login/Index";
import RegisterStoreIndex from "../pages/Register/Store/Index";
import MainLayout from "../layouts/MainLayout";
import ProcessedProductIndex from "../pages/ProcessedProduct/Catalog/Index";
import ProcessedProductAdd from "../pages/ProcessedProduct/Catalog/Add";
import SupplierIndex from "../pages/Supplier/Index";
import SupplierAdd from "../pages/Supplier/Add";
import EmployeeIndex from "../pages/Employee/Index";
import EmployeeAdd from "../pages/Employee/Add";
import IndgredientIndex from "../pages/Ingredient/Index";
import IngredientAdd from "../pages/Ingredient/Add";
import PhysicalProductIndex from "../pages/PhysicalProduct/Catalog/Index";
import PhysicalProductAdd from "../pages/PhysicalProduct/Catalog/Add";
import ServiceProductIndex from "../pages/ServicePorduct/Catalog/Index";
import ServiceProductAdd from "../pages/ServicePorduct/Catalog/Add";
import PurchasePhysicalProductIndex from "../pages/PhysicalProduct/Purchase/Index";
import PurchasePhysicalProductAdd from "../pages/PhysicalProduct/Purchase/Add";
import PurchaseIngredientIndex from "../pages/Ingredient/Purchase/Index";
import PurchaseIngredientAdd from "../pages/Ingredient/Purchase/Add";
import SaleAdd from "../pages/Sales/Add";

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      // {
      //   index: true,
      //   element: <ProductIndex />
      // },
      {
        path: 'physical-product',
        element: <PhysicalProductIndex />
      },
      {
        path: 'physical-product/add',
        element: <PhysicalProductAdd />
      },
      {
        path: 'purchase-physical-product',
        element: <PurchasePhysicalProductIndex />
      },
      {
        path: 'purchase-physical-product/add',
        element: <PurchasePhysicalProductAdd />
      },
      {
        path: 'processed-product',
        element: <ProcessedProductIndex />
      },
      {
        path: 'processed-product/add',
        element: <ProcessedProductAdd />
      },
      {
        path: 'service-product',
        element: <ServiceProductIndex />
      },
      {
        path: 'service-product/add',
        element: <ServiceProductAdd />
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
      {
        path: '/ingredient',
        element: <IndgredientIndex />
      },
      {
        path: 'purchase-ingredient',
        element: <PurchaseIngredientIndex />
      },
      {
        path: 'purchase-ingredient/add',
        element: <PurchaseIngredientAdd />
      },
      {
        path: 'sales',
        element: <SaleAdd />
      },
      {
        path: 'sales/add',
        element: <SaleAdd />
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
