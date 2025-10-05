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
import HistorySaleIndex from "../pages/Sales/Index";
import SaleDetail from "../pages/Sales/Detail";
import PhysicalProductEdit from "../pages/PhysicalProduct/Catalog/Edit";
import PhysicalProductPurchaseDetail from "../pages/PhysicalProduct/Purchase/Detail";
import ServiceProductEdit from "../pages/ServicePorduct/Catalog/Edit";
import SupplierEdit from "../pages/Supplier/Edit";
import ProcessedProductDetail from "../pages/ProcessedProduct/Catalog/Detail";
import ProcessedProductEdit from "../pages/ProcessedProduct/Catalog/Edit";
import IngredientEdit from "../pages/Ingredient/Edit";
import PurchaseIngredientDetail from "../pages/Ingredient/Purchase/Detail";
import EmployeeEdit from "../pages/Employee/Edit";
import StoreIndex from "../pages/Store/Index";
import StoreEdit from "../pages/Store/Edit";
import ProtectedRoute from "../components/ProtectedRoute";


export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      // Physical Product
      {
        path: 'physical-product',
        element: <PhysicalProductIndex />
      },
      {
        path: 'physical-product/add',
        element: (
          <ProtectedRoute allowedRoles={['owner']}>
            <PhysicalProductAdd />
          </ProtectedRoute>
        )
      },
      {
        path: 'physical-product/edit/:id',
        element: (
          <ProtectedRoute allowedRoles={['owner']}>
            <PhysicalProductEdit />
          </ProtectedRoute>
        )
      },

      // Purchase Physical Product (owner + admin)
      {
        path: 'purchase-physical-product',
        element: (
          <ProtectedRoute allowedRoles={['owner','admin']}>
            <PurchasePhysicalProductIndex />
          </ProtectedRoute>
        )
      },
      {
        path: 'purchase-physical-product/add',
        element: (
          <ProtectedRoute allowedRoles={['owner','admin']}>
            <PurchasePhysicalProductAdd />
          </ProtectedRoute>
        )
      },
      {
        path: 'purchase-physical-product/:id',
        element: (
          <ProtectedRoute allowedRoles={['owner','admin']}>
            <PhysicalProductPurchaseDetail />
          </ProtectedRoute>
        )
      },

      // Processed Product
      {
        path: 'processed-product',
        element: <ProcessedProductIndex />
      },
      {
        path: 'processed-product/add',
        element: (
          <ProtectedRoute allowedRoles={['owner']}>
            <ProcessedProductAdd />
          </ProtectedRoute>
        )
      },
      {
        path: 'processed-product/:id',
        element: <ProcessedProductDetail />
      },
      {
        path: 'processed-product/edit/:id',
        element: (
          <ProtectedRoute allowedRoles={['owner']}>
            <ProcessedProductEdit />
          </ProtectedRoute>
        )
      },

      // Service Product
      {
        path: 'service-product',
        element: <ServiceProductIndex />
      },
      {
        path: 'service-product/add',
        element: (
          <ProtectedRoute allowedRoles={['owner']}>
            <ServiceProductAdd />
          </ProtectedRoute>
        )
      },
      {
        path: 'service-product/:id',
        element: (
          <ProtectedRoute allowedRoles={['owner']}>
            <ServiceProductEdit />
          </ProtectedRoute>
        )
      },

      // Supplier
      {
        path: 'supplier',
        element: <SupplierIndex />
      },
      {
        path: 'supplier/add',
        element: (
          <ProtectedRoute allowedRoles={['owner']}>
            <SupplierAdd />
          </ProtectedRoute>
        )
      },
      {
        path: 'supplier/:id',
        element: (
          <ProtectedRoute allowedRoles={['owner']}>
            <SupplierEdit />
          </ProtectedRoute>
        )
      },

      // Employee (full CRUD hanya owner)
      {
        path: 'employee',
        element: (
          <ProtectedRoute allowedRoles={['owner']}>
            <EmployeeIndex />
          </ProtectedRoute>
        )
      },
      {
        path: 'employee/add',
        element: (
          <ProtectedRoute allowedRoles={['owner']}>
            <EmployeeAdd />
          </ProtectedRoute>
        )
      },
      {
        path: 'employee/:id',
        element: (
          <ProtectedRoute allowedRoles={['owner']}>
            <EmployeeEdit />
          </ProtectedRoute>
        )
      },

      // Ingredient
      {
        path: 'ingredient',
        element: <IndgredientIndex />
      },
      {
        path: 'ingredient/add',
        element: (
          <ProtectedRoute allowedRoles={['owner']}>
            <IngredientAdd />
          </ProtectedRoute>
        )
      },
      {
        path: 'ingredient/edit/:id',
        element: (
          <ProtectedRoute allowedRoles={['owner']}>
            <IngredientEdit />
          </ProtectedRoute>
        )
      },

      // Purchase Ingredient (owner + admin)
      {
        path: 'purchase-ingredient',
        element: (
          <ProtectedRoute allowedRoles={['owner','admin']}>
            <PurchaseIngredientIndex />
          </ProtectedRoute>
        )
      },
      {
        path: 'purchase-ingredient/add',
        element: (
          <ProtectedRoute allowedRoles={['owner','admin']}>
            <PurchaseIngredientAdd />
          </ProtectedRoute>
        )
      },
      {
        path: 'purchase-ingredient/:id',
        element: (
          <ProtectedRoute allowedRoles={['owner','admin']}>
            <PurchaseIngredientDetail />
          </ProtectedRoute>
        )
      },

      // Sales (bisa diakses kasir juga)
      {
        path: 'sales',
        element: <SaleAdd />
      },
      {
        path: 'history-sales',
        element: <HistorySaleIndex />
      },
      {
        path: 'history-sales/:id',
        element: <SaleDetail />
      },

      // Store (hanya owner)
      {
        path: 'store',
        element: (
          <ProtectedRoute allowedRoles={['owner']}>
            <StoreIndex />
          </ProtectedRoute>
        )
      },
      {
        path: 'store/edit',
        element: (
          <ProtectedRoute allowedRoles={['owner']}>
            <StoreEdit />
          </ProtectedRoute>
        )
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